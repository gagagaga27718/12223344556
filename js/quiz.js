/* StudyLoop quiz engine — sessions (practice / adaptive / review / mistakes / exam), MCQ, FRQ, drawing, results */
(function () {
  'use strict';
  var SL = window.SL;
  var esc = SL.esc, L = SL.L, t = SL.t, I = SL.ICON;

  var POOL = null; // in-memory candidate pool for adaptive sessions

  /* ---------- session lifecycle ---------- */
  function pickDiverse(pool, n) {
    // round-robin across topics so a set covers many knowledge points
    var byTopic = {};
    SL.shuffle(pool).forEach(function (q) { var k = SL.topicKey(q.u, q.tp); (byTopic[k] = byTopic[k] || []).push(q); });
    var keys = SL.shuffle(Object.keys(byTopic)), out = [];
    while (out.length < n && keys.length) {
      keys = keys.filter(function (k) { return byTopic[k].length; });
      keys.forEach(function (k) { if (out.length < n && byTopic[k].length) out.push(byTopic[k].shift()); });
    }
    return out;
  }
  SL.pickDiverse = pickDiverse;

  /**
   * cfg: {mode, title, s, units, topics, diffs, types, tags, count, adaptive, items, timeLimit (sec)}
   */
  SL.startSession = function (cfg) {
    var items = cfg.items ? cfg.items.slice() : null;
    var opts = { subject: cfg.s || null, units: cfg.units, topics: cfg.topics, diffs: cfg.diffs, types: cfg.types && cfg.types.length ? cfg.types : ['mcq'], tags: cfg.tags };
    var count = SL.clamp(cfg.count || 10, 1, 100);
    var sess = {
      id: SL.uid('s'), mode: cfg.mode || (cfg.adaptive ? 'adaptive' : 'practice'), title: cfg.title || '', s: cfg.s || null, units: cfg.units || null,
      opts: opts, startedAt: Date.now(), idx: 0, items: [], answers: [], perms: [], target: count, timeLimit: cfg.timeLimit || 0, flags: {}
    };
    if (!items) {
      // adaptive + specific topics: draw from the whole unit(s) but focus the chosen topics, so the set does not run dry
      var focusTopics = sess.mode === 'adaptive' && opts.topics && opts.topics.length ? opts.topics.slice() : null;
      if (focusTopics) {
        sess.focusTopics = focusTopics;
        opts.units = opts.units && opts.units.length ? opts.units : focusTopics.map(function (k) { return SL.parseTopicKey(k).u; });
        opts.topics = null;
        sess.opts = opts;
      }
      var pool = SL.buildPool(opts);
      if (!pool.length) { SL.toast(L('没有符合条件的题目，请放宽筛选条件', 'No questions match these filters — try widening them'), 'bad'); return false; }
      if (sess.mode === 'adaptive') {
        POOL = pool;
        SL.Adaptive.init(sess);
        var first = SL.Adaptive.pick(sess, pool);
        items = first ? [first] : [];
        if (pool.length < count) sess.target = pool.length;
      } else {
        // keep FRQ/drawing to at most ~1 in 5 so MCQ practice keeps its rhythm
        var mcq = pool.filter(function (q) { return q.type === 'mcq'; });
        var other = pool.filter(function (q) { return q.type !== 'mcq'; });
        var nOther = opts.types.length === 1 && opts.types[0] !== 'mcq' ? count : Math.min(other.length, Math.max(opts.types.indexOf('mcq') === -1 ? count : 0, Math.round(count / 5)));
        items = pickDiverse(mcq, count - Math.min(nOther, other.length)).concat(pickDiverse(other, nOther));
        items = SL.shuffle(items).slice(0, count);
        if (items.length < count) SL.toast(L('符合条件的题目只有 ' + items.length + ' 道', 'Only ' + items.length + ' questions match'), 'ok');
      }
    } else if (sess.mode !== 'exam') {
      items = items.slice(0, count);
    }
    if (!items.length) { SL.toast(L('没有可用的题目', 'No questions available'), 'bad'); return false; }
    sess.items = items;
    if (sess.mode !== 'adaptive') sess.target = items.length;
    sess.perms = items.map(function (q) { return SL.makePerm(q); });
    if (sess.timeLimit) sess.endsAt = Date.now() + sess.timeLimit * 1000;
    SL.store.active = sess;
    SL.save(true);
    SL.go(sess.mode === 'exam' ? '#/exam/run' : '#/quiz');
    return true;
  };

  SL.endSession = function (toResults) {
    var sess = SL.store.active;
    if (!sess) return;
    SL.logSession(sess);
    var graded = sess.answers.filter(function (a) { return a && a.graded; });
    SL.store.lastResult = {
      id: sess.id, mode: sess.mode, title: sess.title, s: sess.s, startedAt: sess.startedAt, endedAt: Date.now(),
      items: sess.items.map(function (q, i) { var a = sess.answers[i]; return a && a.graded ? { id: q.id, u: q.u, tp: q.tp, c: a.c, ms: a.ms, type: q.type } : null; }).filter(Boolean),
      n: graded.length, right: graded.filter(function (a) { return a.c; }).length
    };
    SL.store.active = null;
    POOL = null;
    SL.save(true);
    if (toResults !== false) SL.go('#/results');
  };

  function curQ(sess) { return sess.items[sess.idx]; }
  function ensurePerm(sess, i) { if (!sess.perms[i]) sess.perms[i] = SL.makePerm(sess.items[i]); return sess.perms[i]; }

  /* ---------- quiz view ---------- */
  function metaChips(q, sess) {
    var s = SL.subject(q.s), u = SL.unit(q.u);
    var out = '<span class="chip acc">' + esc(t(s && s.name)) + '</span>';
    if (u) out += '<span class="chip">' + esc(t(u.name).replace(/^Unit (\d+) · /, 'U$1 · ').replace(/^第 ?(\d+) ?单元 ?· ?/, 'U$1 · ')) + '</span>';
    out += '<span class="chip pri">' + esc(SL.topicName(q.u, q.tp)) + '</span>';
    out += '<span class="chip" title="' + esc(q.dEst ? L('根据题型自动估计的难度', 'Difficulty estimated from question type') : '') + '">' + esc(t(SL.DIFF[q.d])) + (q.dEst ? '*' : '') + '</span>';
    var tag = SL.TAGS[q.tag]; if (tag && q.type === 'mcq') out += '<span class="chip">' + esc(t(tag)) + '</span>';
    if (q.src === 'gen') out += '<span class="chip" title="' + esc(L('程序随机生成的新题', 'Freshly generated by a generator')) + '">' + esc(L('生成题', 'Generated')) + '</span>';
    if (q.src === 'ai') out += '<span class="chip warn">' + esc(L('AI 题（已审核）', 'AI item (reviewed)')) + '</span>';
    return out;
  }
  SL.metaChips = metaChips;

  function modeLabel(m) {
    return { practice: L('练习', 'Practice'), adaptive: L('自适应练习', 'Adaptive'), mistakes: L('错题重练', 'Mistake retry'), review: L('间隔复习', 'Spaced review'), exam: L('模拟考试', 'Mock exam') }[m] || m;
  }
  SL.modeLabel = modeLabel;

  function renderQuiz() {
    var sess = SL.store.active;
    if (!sess || sess.mode === 'exam') {
      return { title: L('练习', 'Practice'), html: '<div class="card">' + SL.ui.empty('🎯', L('当前没有进行中的练习', 'No practice in progress'), L('去练习页选择课程、单元和题量。', 'Pick a course, unit and length on the practice page.'), '<a class="btn primary" href="#/practice">' + esc(L('开始练习', 'Start practising')) + '</a>') + '</div>' };
    }
    if (sess.mode === 'adaptive' && !POOL) POOL = SL.buildPool(sess.opts);
    var q = curQ(sess);
    if (!q) { SL.endSession(); return { title: '', html: '' }; }
    SL.remember(q);
    var a = sess.answers[sess.idx];
    var total = sess.target;
    var done = sess.answers.filter(function (x) { return x && x.graded; }).length;
    var right = sess.answers.filter(function (x) { return x && x.c; }).length;
    var html = '<div class="quiz-wrap">' +
      '<div class="quiz-head"><span class="chip pri">' + esc(modeLabel(sess.mode)) + '</span>' +
      '<div class="bar" role="progressbar" aria-valuenow="' + (sess.idx + 1) + '" aria-valuemax="' + total + '"><i style="width:' + Math.round((done) / total * 100) + '%"></i></div>' +
      '<span class="small bold">' + (sess.idx + 1) + ' / ' + total + '</span>' +
      '<span class="chip ' + (right === done ? 'good' : '') + '">' + esc(L('答对', 'Correct')) + ' ' + right + '/' + done + '</span></div>' +
      '<article class="q-card" data-testid="question-card">' +
      '<div class="q-meta">' + metaChips(q, sess) + '</div>' +
      (q.svg ? '<div class="q-figure">' + q.svg + '</div>' : '') +
      '<p class="q-text" data-testid="text-question">' + esc(t(q.q)) + '</p>' +
      (q.type === 'frq' ? bodyFrq(q, a) : q.type === 'draw' ? bodyDraw(q, a) : bodyMcq(q, a, sess)) +
      '</article>';
    if (sess.coach) html += coachHtml(sess.coach);
    html += '<div class="quiz-foot"><button class="btn ghost sm" data-act="quitSession">' + esc(L('结束练习', 'End session')) + '</button>' +
      (a && a.graded ? '<button class="btn primary" data-act="nextQ" data-testid="button-next">' + esc(sess.idx + 1 >= total ? L('查看结果', 'See results') : L('下一题', 'Next')) + ' →</button>' :
        (q.type === 'mcq' ? '<span class="kbd-hint hide-mobile">' + esc(L('键盘：A–D 选择 · Enter 下一题', 'Keys: A–D to answer · Enter for next')) + '</span>' : '')) +
      '</div></div>';
    return {
      title: sess.title || modeLabel(sess.mode), accent: q.s, html: html, narrow: false,
      after: function (root) {
        if (!a) sess.qStart = Date.now();
        if (q.type === 'draw') initCanvas(root, sess);
        var nb = root.querySelector('[data-testid="button-next"]'); if (nb) nb.focus({ preventScroll: true });
      }
    };
  }

  function coachHtml(c) {
    var name = SL.topicName(SL.parseTopicKey(c.key).u, SL.parseTopicKey(c.key).tp);
    if (c.kind === 'down') {
      return '<div class="coach mt12"><b>' + esc(L('自适应调整：', 'Adaptive: ')) + '</b>' +
        esc(L('「' + name + '」连续答错，接下来先降低难度、做基础题巩固，掌握后再逐步提高。', 'Two misses in a row on "' + name + '" — dropping to easier items to rebuild the basics, then stepping back up.')) +
        (c.tip ? '<div class="mt8"><b>' + esc(L('概念回顾：', 'Concept refresher: ')) + '</b>' + esc(c.tip) + '</div>' : '') +
        '<div class="mt8"><a class="btn sm" href="#/tutor?topic=' + encodeURIComponent(c.key) + '&task=explain">' + esc(L('让 AI Tutor 讲解这个知识点', 'Ask the AI Tutor to explain this topic')) + '</a></div></div>';
    }
    if (c.kind === 'up') {
      var lv = t(SL.DIFF[c.level]);
      return '<div class="coach mt12"><b>' + esc(L('自适应调整：', 'Adaptive: ')) + '</b>' + esc(L('「' + name + '」表现稳定，难度提升到「' + lv + '」。', 'Solid on "' + name + '" — moving up to ' + lv + '.')) + '</div>';
    }
    return '';
  }

  function bodyMcq(q, a, sess) {
    var perm = ensurePerm(sess, sess.idx);
    var html = '<div class="options" role="group">';
    perm.forEach(function (orig, j) {
      var cls = 'option';
      if (a) {
        if (orig === q.a) cls += ' correct';
        else if (orig === a.chosen) cls += ' wrong';
        else cls += ' dim';
      }
      html += '<button class="' + cls + '" data-act="answer" data-opt="' + orig + '" data-testid="option-' + j + '"' + (a ? ' disabled' : '') + '>' +
        '<span class="key">' + String.fromCharCode(65 + j) + '</span><span>' + esc(t(q.o[orig])) + '</span></button>';
    });
    html += '</div>';
    if (a) html += feedbackHtml(q, a, perm);
    return html;
  }

  function feedbackHtml(q, a, perm) {
    var right = a.c;
    var letter = function (orig) { return String.fromCharCode(65 + perm.indexOf(orig)); };
    var html = '<div class="feedback ' + (right ? 'ok' : 'bad') + '" data-testid="explain">' +
      '<span class="verdict">' + (right ? '✓ ' + esc(L('回答正确', 'Correct')) : '✗ ' + esc(L('回答错误', 'Not quite'))) + '</span>';
    if (!right) {
      html += '<div class="small">' + esc(L('你选了 ', 'You chose ')) + '<b>' + letter(a.chosen) + '. ' + esc(t(q.o[a.chosen])) + '</b>' +
        esc(L('；正确答案是 ', '; the correct answer is ')) + '<b>' + letter(q.a) + '. ' + esc(t(q.o[q.a])) + '</b></div>';
    }
    if (q.e) html += '<div class="sec"><h5>' + esc(L('解析', 'Explanation')) + '</h5><div>' + esc(t(q.e)) + '</div></div>';
    html += '<div class="sec small muted">' + esc(L('考查知识点：', 'Tests: ')) + '<b>' + esc(SL.topicName(q.u, q.tp)) + '</b></div>';
    if (!right) {
      html += '<div class="row mt12">' +
        '<a class="btn sm" href="#/tutor?q=' + encodeURIComponent(q.id) + '&chosen=' + a.chosen + '&task=mistake">' + I.bot + esc(L('AI 分析我的错误', 'AI: analyse my mistake')) + '</a>' +
        '<a class="btn sm ghost" href="#/practice?topic=' + encodeURIComponent(SL.topicKey(q.u, q.tp)) + '&adaptive=1">' + esc(L('专项练这个知识点', 'Drill this topic')) + '</a></div>';
    }
    return html + '</div>';
  }

  /* ---------- FRQ ---------- */
  function splitParts(text) {
    var s = String(text || '');
    var re = /\(([a-e])\)/g, idx = [], m;
    while ((m = re.exec(s))) idx.push({ k: m[1], i: m.index });
    if (idx.length < 2) return [{ k: '', text: s }];
    var parts = [];
    idx.forEach(function (p, j) { parts.push({ k: p.k, text: s.slice(p.i, j + 1 < idx.length ? idx[j + 1].i : s.length).trim() }); });
    return parts;
  }
  SL.splitParts = splitParts;

  function bodyFrq(q, a) {
    var parts = splitParts(t(q.q));
    var saved = (SL.store.active && SL.store.active.drafts && SL.store.active.drafts[q.id]) || {};
    var html = '<p class="small muted">' + esc(L('分步骤作答：每个小问单独写。提交后系统会对照评分标准检查关键要点，你再根据评分标准自评。', 'Answer step by step — one box per part. After submitting, the rubric check highlights the key points you covered; then self-grade against the rubric.')) + '</p>';
    parts.forEach(function (p, i) {
      html += '<div class="frq-part"><label for="frq-' + i + '">' + esc(p.k ? '(' + p.k + ')' : L('你的答案', 'Your answer')) + (p.k ? ' <span class="faint small" style="font-weight:500">' + esc(p.text.replace(/^\([a-e]\)\s*/, '').slice(0, 90)) + (p.text.length > 90 ? '…' : '') + '</span>' : '') + '</label>' +
        '<textarea class="input" id="frq-' + i + '" data-part="' + i + '" data-input="frqDraft" data-q="' + esc(q.id) + '" rows="4"' + (a ? ' disabled' : '') + '>' + esc(saved[i] || (a && a.parts ? a.parts[i] : '') || '') + '</textarea></div>';
    });
    if (!a || !a.checked) {
      html += '<div class="row mt12"><button class="btn primary" data-act="frqCheck">' + esc(L('提交并对照评分标准', 'Submit & check against rubric')) + '</button></div>';
    } else {
      html += frqReport(q, a);
    }
    return html;
  }

  // keyword coverage check per rubric point (local, transparent — not AI)
  var STOPW = 'the a an and or of to in on for with is are be by as at that this it its from into than then their they them which who what when where why how can will would should could does did not no yes your you more most less very also each per any all some such may might must have has had been being were was'.split(' ');
  function keyTerms(model) {
    var en = String(model.en || '').toLowerCase().replace(/[^a-z0-9%\s-]/g, ' ').split(/\s+/).filter(function (w) { return w.length > 3 && STOPW.indexOf(w) === -1; });
    var uniq = []; en.forEach(function (w) { if (uniq.indexOf(w) === -1) uniq.push(w); });
    var zhRuns = String(model.zh || '').match(/[一-鿿]{2,}/g) || [];
    var zh = []; zhRuns.forEach(function (r) { for (var i = 0; i + 2 <= r.length; i += 2) { var bg = r.slice(i, i + 2); if (zh.indexOf(bg) === -1) zh.push(bg); } });
    return { en: uniq.slice(0, 8), zh: zh.slice(0, 10) };
  }
  SL.frqCheck = function (q, answerText) {
    var ans = String(answerText || '').toLowerCase();
    return (q.points || []).map(function (p) {
      var k = keyTerms(p.model || {});
      var hitEn = k.en.filter(function (w) { return ans.indexOf(w.replace(/s$/, '')) !== -1; });
      var hitZh = k.zh.filter(function (w) { return ans.indexOf(w) !== -1; });
      var ratio = Math.max(k.en.length ? hitEn.length / k.en.length : 0, k.zh.length ? hitZh.length / k.zh.length : 0);
      var useZh = k.zh.length && hitZh.length / k.zh.length >= (k.en.length ? hitEn.length / k.en.length : 0);
      return {
        label: p.label, model: p.model, ratio: ratio,
        status: ratio >= 0.5 ? 'hit' : ratio >= 0.25 ? 'part' : 'miss',
        hit: useZh ? hitZh : hitEn,
        miss: useZh ? k.zh.filter(function (w) { return hitZh.indexOf(w) === -1; }) : k.en.filter(function (w) { return hitEn.indexOf(w) === -1; })
      };
    });
  };
  function frqReport(q, a) {
    var res = a.check || [];
    var hit = res.filter(function (r) { return r.status === 'hit'; }).length;
    var html = '<div class="feedback mt16"><span class="verdict">' + esc(L('评分标准对照', 'Rubric check')) + ' · ' + hit + '/' + res.length + '</span>' +
      '<p class="small muted">' + esc(L('这是关键词覆盖检查，用来提示你可能遗漏的要点；它不能理解推理质量，最终请对照参考答案自评。', 'This is a keyword-coverage check that flags points you may have missed; it cannot judge reasoning, so use the model answers to self-grade.')) + '</p>';
    res.forEach(function (r) {
      html += '<div class="rubric-item"><span class="st ' + r.status + '">' + (r.status === 'hit' ? '✓' : r.status === 'part' ? '~' : '✗') + '</span><div class="grow">' +
        '<div class="bold small">' + esc(t(r.label)) + '</div><div class="small">' + esc(t(r.model)) + '</div>' +
        (r.miss.length && r.status !== 'hit' ? '<div class="xs mt8">' + esc(L('可能遗漏：', 'Possibly missing: ')) + r.miss.slice(0, 6).map(function (w) { return '<span class="kw miss">' + esc(w) + '</span>'; }).join('') + '</div>' : '') +
        '</div></div>';
    });
    var missed = res.filter(function (r) { return r.status !== 'hit'; });
    if (missed.length) html += '<div class="sec small"><h5>' + esc(L('改进建议', 'How to improve')) + '</h5>' + esc(L('补上「' + missed.map(function (r) { return t(r.label); }).join('」「') + '」部分：先用一句话直接回答，再给出一个具体例子或数据作为证据。', 'Strengthen ' + missed.map(function (r) { return '"' + t(r.label) + '"'; }).join(', ') + ': answer the prompt directly in one sentence, then support it with a specific example or data point.')) + '</div>';
    if (!a.graded) {
      html += '<div class="row mt12"><span class="small bold">' + esc(L('对照后自评：', 'Self-grade:')) + '</span>' +
        '<button class="btn sm" data-act="selfGrade" data-v="1">' + esc(L('基本答对', 'Mostly correct')) + '</button>' +
        '<button class="btn sm" data-act="selfGrade" data-v="0">' + esc(L('需要再练', 'Needs work')) + '</button>' +
        '<a class="btn sm ghost" href="#/tutor?q=' + encodeURIComponent(q.id) + '&task=frq">' + I.bot + esc(L('AI 评阅我的答案', 'AI feedback on my answer')) + '</a></div>';
    }
    return html + '</div>';
  }

  /* ---------- drawing ---------- */
  function bodyDraw(q, a) {
    var html = '<div class="canvas-wrap"><canvas class="draw-canvas" data-testid="draw-canvas" width="900" height="520" aria-label="' + esc(L('画板', 'Drawing canvas')) + '"></canvas>' +
      '<div class="canvas-tools">' +
      ['#111827', '#b91c1c', '#1d4ed8', '#15803d'].map(function (c, i) { return '<button class="color-btn' + (i === 0 ? ' active' : '') + '" data-color="' + c + '" style="background:' + c + '" aria-label="color ' + c + '"></button>'; }).join('') +
      '<input type="range" class="brush-size" min="2" max="18" value="4" aria-label="' + esc(L('笔刷粗细', 'Brush size')) + '" style="width:110px">' +
      '<button class="btn sm" data-canvas="undo">' + esc(L('撤销', 'Undo')) + '</button><button class="btn sm" data-canvas="clear">' + esc(L('清空', 'Clear')) + '</button></div></div>';
    if (!a || !a.checked) {
      html += '<div class="row mt12"><button class="btn primary" data-act="drawReveal">' + esc(L('画好了，显示参考图', 'Done — show reference')) + '</button></div>';
    } else {
      html += '<div class="feedback mt16"><span class="verdict">' + esc(L('参考答案', 'Reference')) + '</span>' + (q.refSvg ? '<div class="q-figure">' + q.refSvg + '</div>' : '') +
        '<div class="small">' + esc(t(q.rubric)) + '</div>' +
        (!a.graded ? '<div class="row mt12"><span class="small bold">' + esc(L('对照后自评：', 'Self-grade:')) + '</span><button class="btn sm" data-act="selfGrade" data-v="1">' + esc(L('基本正确', 'Mostly correct')) + '</button><button class="btn sm" data-act="selfGrade" data-v="0">' + esc(L('需要再练', 'Needs work')) + '</button></div>' : '') + '</div>';
    }
    return html;
  }
  function initCanvas(root, sess) {
    var canvas = root.querySelector('.draw-canvas'); if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var strokes = (sess.canvas && sess.canvas[sess.idx]) || [], drawing = false, cur = null, color = '#111827';
    function pos(e) { var r = canvas.getBoundingClientRect(); return { x: (e.clientX - r.left) * canvas.width / r.width, y: (e.clientY - r.top) * canvas.height / r.height }; }
    function redraw() {
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      strokes.forEach(function (s) { ctx.strokeStyle = s.color; ctx.lineWidth = s.size; ctx.beginPath(); s.pts.forEach(function (p, i) { if (i) ctx.lineTo(p.x, p.y); else ctx.moveTo(p.x, p.y); }); if (s.pts.length === 1) ctx.lineTo(s.pts[0].x + 0.1, s.pts[0].y); ctx.stroke(); });
    }
    function keep() { sess.canvas = sess.canvas || {}; sess.canvas[sess.idx] = strokes; }
    canvas.addEventListener('pointerdown', function (e) { drawing = true; canvas.setPointerCapture(e.pointerId); cur = { color: color, size: parseInt(root.querySelector('.brush-size').value, 10) * (e.pointerType === 'pen' ? Math.max(0.5, e.pressure * 1.6 || 1) : 1), pts: [pos(e)] }; strokes.push(cur); redraw(); e.preventDefault(); });
    canvas.addEventListener('pointermove', function (e) { if (!drawing) return; cur.pts.push(pos(e)); redraw(); e.preventDefault(); });
    function end() { if (drawing) { drawing = false; keep(); } }
    canvas.addEventListener('pointerup', end); canvas.addEventListener('pointercancel', end);
    root.querySelectorAll('.color-btn').forEach(function (b) { b.addEventListener('click', function () { root.querySelectorAll('.color-btn').forEach(function (x) { x.classList.remove('active'); }); b.classList.add('active'); color = b.getAttribute('data-color'); }); });
    root.querySelectorAll('[data-canvas]').forEach(function (b) { b.addEventListener('click', function () { if (b.getAttribute('data-canvas') === 'undo') strokes.pop(); else strokes = []; keep(); redraw(); }); });
    redraw();
  }

  /* ---------- actions ---------- */
  function elapsed(sess) { return sess.qStart ? Date.now() - sess.qStart : 0; }
  function grade(sess, q, correct, extra) {
    var a = sess.answers[sess.idx] = Object.assign(sess.answers[sess.idx] || {}, extra || {}, { c: !!correct, graded: true, ms: (extra && extra.ms) || elapsed(sess) });
    var res = SL.record(q, correct, { ms: a.ms, mode: sess.mode, answer: a.text });
    sess.coach = null;
    if (sess.mode === 'adaptive') {
      var c = SL.Adaptive.after(sess, q, correct);
      if (c && c.kind === 'down') {
        // concept refresher: reuse an explanation from the same topic (real bank content)
        var same = SL.BANK.filter(function (b) { return b.u === q.u && b.tp === q.tp && b.e && b.id !== q.id; })[0];
        c.tip = same ? t(same.e) : (q.e ? t(q.e) : '');
      }
      sess.coach = c;
    }
    res.events.forEach(function (ev) {
      if (ev.type === 'achievement') SL.toast('🏅 ' + L('解锁成就：', 'Achievement: ') + L(ev.a.zh, ev.a.en));
      if (ev.type === 'topicMastered') { var p = SL.parseTopicKey(ev.key); SL.toast('⭐ ' + L('已掌握：', 'Mastered: ') + SL.topicName(p.u, p.tp)); }
      if (ev.type === 'mistakeMastered') SL.toast(L('这道错题已连续答对 3 次，标记为已掌握', 'Mistake answered right 3 times — marked mastered'));
    });
    SL.save(true);
  }

  SL.act('answer', function (el) {
    var sess = SL.store.active; if (!sess) return;
    var q = curQ(sess); if (!q || sess.answers[sess.idx]) return;
    var orig = parseInt(el.getAttribute('data-opt'), 10);
    if (!(orig >= 0 && orig < q.o.length)) return;
    grade(sess, q, orig === q.a, { chosen: orig, text: t(q.o[orig]) });
    SL.rerender();
  });
  SL.act('nextQ', function () {
    var sess = SL.store.active; if (!sess) return;
    if (sess.idx + 1 >= sess.target) { SL.endSession(); return; }
    if (sess.mode === 'adaptive') {
      var nq = SL.Adaptive.pick(sess, POOL || (POOL = SL.buildPool(sess.opts)));
      if (!nq) { SL.endSession(); return; }
      sess.items.push(nq); sess.perms.push(SL.makePerm(nq));
    }
    sess.idx++;
    sess.coach = null;
    SL.save(true);
    SL.render();
  });
  SL.act('quitSession', function () {
    var sess = SL.store.active; if (!sess) return;
    var answered = sess.answers.filter(function (a) { return a && a.graded; }).length;
    if (!answered) { SL.store.active = null; SL.save(true); SL.go('#/practice'); return; }
    SL.confirm(L('结束本次练习并查看结果？', 'End this session and see results?'), function () { SL.endSession(); });
  });
  SL.act('frqDraft', function (el) {
    var sess = SL.store.active; if (!sess) return;
    sess.drafts = sess.drafts || {};
    var d = sess.drafts[el.getAttribute('data-q')] = sess.drafts[el.getAttribute('data-q')] || {};
    d[el.getAttribute('data-part')] = el.value;
    SL.save();
  });
  SL.act('frqCheck', function () {
    var sess = SL.store.active; if (!sess) return;
    var q = curQ(sess);
    var parts = SL.qsa('[data-part]').map(function (x) { return x.value; });
    var text = parts.join('\n');
    if (!text.trim()) { SL.toast(L('先写下你的答案再提交', 'Write an answer before submitting'), 'bad'); return; }
    sess.answers[sess.idx] = { parts: parts, text: text.slice(0, 2000), checked: true, check: SL.frqCheck(q, text), ms: elapsed(sess) };
    SL.save(true); SL.rerender();
  });
  SL.act('drawReveal', function () {
    var sess = SL.store.active; if (!sess) return;
    sess.answers[sess.idx] = { checked: true, ms: elapsed(sess), text: L('（画图题）', '(drawing)') };
    SL.save(true); SL.rerender();
  });
  SL.act('selfGrade', function (el) {
    var sess = SL.store.active; if (!sess) return;
    var q = curQ(sess), a = sess.answers[sess.idx] || {};
    if (a.graded) return;
    grade(sess, q, el.getAttribute('data-v') === '1', { ms: a.ms });
    SL.rerender();
  });

  document.addEventListener('keydown', function (e) {
    var r = SL.parseHash();
    if (r.path !== '/quiz') return;
    if (document.activeElement && /TEXTAREA|INPUT|SELECT/.test(document.activeElement.tagName)) return;
    if (document.getElementById('modal-root').innerHTML) return;
    var sess = SL.store.active; if (!sess) return;
    var q = curQ(sess); if (!q) return;
    if (/^[a-e]$/i.test(e.key) && q.type === 'mcq' && !sess.answers[sess.idx]) {
      var btn = document.querySelector('[data-testid="option-' + (e.key.toLowerCase().charCodeAt(0) - 97) + '"]');
      if (btn) { e.preventDefault(); btn.click(); }
    } else if (e.key === 'Enter' && sess.answers[sess.idx] && sess.answers[sess.idx].graded) {
      e.preventDefault(); SL.actions.nextQ();
    }
  });

  /* ---------- results ---------- */
  function renderResults() {
    var r = SL.store.lastResult;
    if (!r) return { title: L('练习结果', 'Results'), html: '<div class="card">' + SL.ui.empty('📊', L('还没有结果', 'No results yet'), '', '<a class="btn primary" href="#/practice">' + esc(L('开始练习', 'Start practising')) + '</a>') + '</div>' };
    var pct = r.n ? Math.round(r.right / r.n * 100) : 0;
    var ms = 0, msN = 0; r.items.forEach(function (x) { if (x.type === 'mcq' && x.ms) { ms += x.ms; msN++; } });
    var topics = {};
    r.items.forEach(function (x) { var k = SL.topicKey(x.u, x.tp); var o = topics[k] || (topics[k] = { n: 0, right: 0 }); o.n++; if (x.c) o.right++; });
    var rows = Object.keys(topics).map(function (k) { var p = SL.parseTopicKey(k); return { k: k, name: SL.topicName(p.u, p.tp), n: topics[k].n, right: topics[k].right, m: SL.topicMastery(k) }; })
      .sort(function (a, b) { return (a.right / a.n) - (b.right / b.n); });
    var wrongIds = r.items.filter(function (x) { return !x.c; }).length;
    var html = '<div class="grid g4">' +
      '<div class="card stat"><span class="label">' + esc(L('得分', 'Score')) + '</span><span class="value" data-testid="text-score">' + r.right + ' / ' + r.n + '</span><span class="sub">' + esc(SL.modeLabel(r.mode)) + '</span></div>' +
      '<div class="card stat"><span class="label">' + esc(L('正确率', 'Accuracy')) + '</span><span class="value">' + pct + '%</span></div>' +
      '<div class="card stat"><span class="label">' + esc(L('平均每题用时', 'Avg time / question')) + '</span><span class="value">' + (msN ? SL.fmtDuration(ms / msN) : '—') + '</span></div>' +
      '<div class="card stat"><span class="label">' + esc(L('总用时', 'Total time')) + '</span><span class="value">' + SL.fmtDuration(r.endedAt - r.startedAt) + '</span></div></div>' +
      '<div class="card mt16"><div class="card-head"><h3>' + esc(L('本次涉及的知识点', 'Topics in this session')) + '</h3><span class="xs faint">' + esc(L('掌握度综合了历史所有练习', 'Mastery reflects all your history')) + '</span></div><div class="list">' +
      rows.map(function (x) {
        return '<div class="list-row"><div class="grow"><div class="title">' + esc(x.name) + '</div><div class="meta">' + esc(L('本次 ', 'This session ')) + x.right + '/' + x.n + '</div></div>' + SL.ui.lvlChip(x.m) +
          (x.right < x.n ? '<a class="btn sm" href="#/practice?topic=' + encodeURIComponent(x.k) + '&adaptive=1">' + esc(L('专项练习', 'Drill')) + '</a>' : '') + '</div>';
      }).join('') + '</div></div>' +
      '<div class="row mt16">' +
      '<a class="btn primary" href="#/practice">' + esc(L('再练一组', 'Practise again')) + '</a>' +
      (wrongIds ? '<a class="btn" href="#/mistakes">' + esc(L('查看错题本', 'Open mistakes')) + '</a>' : '') +
      '<a class="btn ghost" href="#/">' + esc(L('回到首页', 'Dashboard')) + '</a></div>';
    return { title: L('练习结果', 'Session results'), html: html, accent: r.s || 'none' };
  }

  /* ---------- exam ---------- */
  var examTimer = null;
  function renderExamRun() {
    var sess = SL.store.active;
    if (!sess || sess.mode !== 'exam') { SL.go('#/exam'); return { title: '', html: '' }; }
    var q = sess.items[sess.idx];
    SL.remember(q);
    var perm = ensurePerm(sess, sess.idx);
    var a = sess.answers[sess.idx];
    var answered = sess.answers.filter(function (x) { return x && x.chosen != null; }).length;
    var html = '<div class="quiz-wrap"><div class="quiz-head"><span class="chip warn">' + esc(L('模拟考试', 'Mock exam')) + '</span>' +
      '<div class="bar"><i style="width:' + Math.round(answered / sess.items.length * 100) + '%"></i></div>' +
      '<span class="small bold">' + esc(L('已答 ', 'Answered ')) + answered + '/' + sess.items.length + '</span>' +
      (sess.endsAt ? '<span class="chip"><span class="timer" id="examTimer">--:--</span></span>' : '') + '</div>' +
      '<article class="q-card"><div class="q-meta"><span class="chip">' + esc(L('第 ', 'Q')) + (sess.idx + 1) + esc(L(' 题', '')) + '</span><span class="chip">' + esc(t(SL.DIFF[q.d])) + '</span></div>' +
      (q.svg ? '<div class="q-figure">' + q.svg + '</div>' : '') +
      '<p class="q-text">' + esc(t(q.q)) + '</p><div class="options">' +
      perm.map(function (orig, j) {
        return '<button class="option' + (a && a.chosen === orig ? ' sel' : '') + '" data-act="examPick" data-opt="' + orig + '" data-testid="option-' + j + '"><span class="key">' + String.fromCharCode(65 + j) + '</span><span>' + esc(t(q.o[orig])) + '</span></button>';
      }).join('') + '</div></article>' +
      '<div class="quiz-foot"><div class="row"><button class="btn" data-act="examMove" data-d="-1"' + (sess.idx === 0 ? ' disabled' : '') + '>← ' + esc(L('上一题', 'Prev')) + '</button>' +
      '<button class="btn ghost" data-act="examFlag">' + (sess.flags[sess.idx] ? '★ ' + esc(L('已标记', 'Flagged')) : '☆ ' + esc(L('标记', 'Flag'))) + '</button></div>' +
      '<div class="row">' + (sess.idx + 1 < sess.items.length ? '<button class="btn primary" data-act="examMove" data-d="1">' + esc(L('下一题', 'Next')) + ' →</button>' : '') +
      '<button class="btn' + (sess.idx + 1 >= sess.items.length ? ' primary' : '') + '" data-act="examSubmit">' + esc(L('交卷', 'Submit')) + '</button></div></div>' +
      '<div class="card mt16 pad-sm"><div class="xs bold muted" style="margin-bottom:8px">' + esc(L('答题卡（★ 为标记题）', 'Answer sheet (★ flagged)')) + '</div><div class="qnav">' +
      sess.items.map(function (_, i) { var x = sess.answers[i]; return '<button data-act="examJump" data-i="' + i + '" class="' + (x && x.chosen != null ? 'answered ' : '') + (i === sess.idx ? 'cur ' : '') + (sess.flags[i] ? 'flag' : '') + '" aria-label="Q' + (i + 1) + '">' + (i + 1) + '</button>'; }).join('') +
      '</div></div></div>';
    return {
      title: sess.title || L('模拟考试', 'Mock exam'), accent: sess.s, html: html,
      after: function () {
        if (!sess.qStarts) sess.qStarts = {};
        sess.qStart = Date.now();
        clearInterval(examTimer);
        if (sess.endsAt) {
          var tick = function () {
            var el = document.getElementById('examTimer'); var left = Math.max(0, sess.endsAt - Date.now());
            if (el) { var m = Math.floor(left / 60000), s = Math.floor(left / 1000) % 60; el.textContent = ('0' + m).slice(-2) + ':' + ('0' + s).slice(-2); el.classList.toggle('low', left < 60000); }
            if (left <= 0) { clearInterval(examTimer); SL.toast(L('时间到，已自动交卷', 'Time is up — submitted automatically')); submitExam(); }
          };
          tick(); examTimer = setInterval(tick, 1000);
        }
      },
      cleanup: function () { clearInterval(examTimer); }
    };
  }
  function addTime(sess) { var a = sess.answers[sess.idx]; if (a && sess.qStart) a.ms = (a.ms || 0) + (Date.now() - sess.qStart); }
  SL.act('examPick', function (el) {
    var sess = SL.store.active; if (!sess) return;
    var a = sess.answers[sess.idx] = sess.answers[sess.idx] || { ms: 0 };
    addTime(sess); a.chosen = parseInt(el.getAttribute('data-opt'), 10);
    sess.qStart = Date.now();
    SL.save(true); SL.rerender();
  });
  SL.act('examMove', function (el) {
    var sess = SL.store.active; if (!sess) return;
    addTime(sess);
    sess.idx = SL.clamp(sess.idx + parseInt(el.getAttribute('data-d'), 10), 0, sess.items.length - 1);
    SL.save(true); SL.render();
  });
  SL.act('examJump', function (el) { var sess = SL.store.active; if (!sess) return; addTime(sess); sess.idx = parseInt(el.getAttribute('data-i'), 10); SL.save(true); SL.render(); });
  SL.act('examFlag', function () { var sess = SL.store.active; if (!sess) return; sess.flags[sess.idx] = !sess.flags[sess.idx]; SL.save(true); SL.rerender(); });
  SL.act('examSubmit', function () {
    var sess = SL.store.active; if (!sess) return;
    var left = sess.items.length - sess.answers.filter(function (x) { return x && x.chosen != null; }).length;
    SL.confirm(left ? L('还有 ' + left + ' 题未作答，确定交卷？', left + ' unanswered — submit anyway?') : L('确定交卷？', 'Submit the exam?'), submitExam, L('交卷', 'Submit'));
  });
  function submitExam() {
    var sess = SL.store.active; if (!sess || sess.mode !== 'exam') return;
    clearInterval(examTimer);
    addTime(sess);
    var items = sess.items.map(function (q, i) {
      var a = sess.answers[i] || {};
      var c = a.chosen != null && a.chosen === q.a;
      if (a.chosen != null) SL.record(q, c, { ms: a.ms || 0, mode: 'exam', answer: t(q.o[a.chosen]) });
      else SL.record(q, false, { ms: 0, mode: 'exam', answer: L('（未作答）', '(blank)') });
      a.c = c; a.graded = true; sess.answers[i] = a;
      return { q: q, chosen: a.chosen, c: c, ms: a.ms || 0, perm: sess.perms[i] };
    });
    var right = items.filter(function (x) { return x.c; }).length;
    var rec = {
      id: sess.id, s: sess.s, units: sess.units, title: sess.title, startedAt: sess.startedAt, endedAt: Date.now(), timeLimit: sess.timeLimit,
      n: items.length, right: right, pct: Math.round(right / items.length * 100),
      items: items.map(function (x) { return { q: { id: x.q.id, s: x.q.s, u: x.q.u, tp: x.q.tp, d: x.q.d, q: x.q.q, o: x.q.o, a: x.q.a, e: x.q.e, svg: x.q.svg }, chosen: x.chosen, c: x.c, ms: x.ms, perm: x.perm }; })
    };
    SL.store.exams.push(rec);
    SL.logSession(sess);
    SL.store.active = null;
    SL.checkAchievements().forEach(function (ev) { SL.toast('🏅 ' + L('解锁成就：', 'Achievement: ') + L(ev.a.zh, ev.a.en)); });
    SL.save(true);
    SL.go('#/exam/report/' + rec.id);
  }

  SL.route(/^\/quiz$/, function () { return renderQuiz(); });
  SL.route(/^\/results$/, function () { return renderResults(); });
  SL.route(/^\/exam\/run$/, function () { return renderExamRun(); });
})();
