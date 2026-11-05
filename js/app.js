/* StudyLoop v2 — endless questions, FRQ, drawing, wrongbook, notes, packs */
(function () {
  'use strict';

  /* ---------- i18n ---------- */
  var T = {
    tagline: { en: 'AP Human Geography · Biology · Precalculus', zh: 'AP 人文地理 · 生物 · 微积分预备' },
    subtitle: { en: 'Fresh questions every round · FRQ · drawing · wrongbook · notes', zh: '每轮新题 · FRQ · 画图题 · 错题本 · 笔记' },
    chooseSubject: { en: 'Choose a subject', zh: '选择科目' },
    units: { en: 'units', zh: '个单元' },
    start: { en: 'Start', zh: '开始刷题' },
    correct: { en: 'Correct', zh: '答对了' },
    wrong: { en: 'Wrong', zh: '答错了' },
    explain: { en: 'Explanation', zh: '解析' },
    correctRate: { en: 'correct rate', zh: '正确率' },
    result: { en: 'Round complete', zh: '本轮完成' },
    restart: { en: 'Another round', zh: '再刷一轮' },
    backHome: { en: 'Subjects', zh: '科目选择' },
    back: { en: 'Back', zh: '返回' },
    frq: { en: 'FRQ · free response', zh: 'FRQ · 简答题' },
    draw: { en: 'Draw it', zh: '画图题' },
    answerBelow: { en: 'Write your answer below, then self-check with the rubric.', zh: '在下方写下你的答案，然后对照评分标准自评。' },
    showRubric: { en: 'Show rubric', zh: '显示评分标准' },
    rubric: { en: 'Rubric', zh: '评分标准' },
    selfGrade: { en: 'Self-grading', zh: '自评' },
    markRight: { en: 'I got it right', zh: '我做对了' },
    markWrong: { en: 'I got it wrong', zh: '我做错了' },
    reference: { en: 'Reference answer', zh: '参考答案' },
    clearCanvas: { en: 'Clear', zh: '清空' },
    undoCanvas: { en: 'Undo', zh: '撤销' },
    palette: { en: 'Colors', zh: '颜色' },
    brush: { en: 'Brush', zh: '笔刷' },
    wrongbook: { en: 'Wrongbook', zh: '错题本' },
    notes: { en: 'Notes', zh: '笔记' },
    correctAns: { en: 'Answer', zh: '正确答案' },
    myAns: { en: 'My answer', zh: '我的答案' },
    save: { en: 'Save', zh: '保存' },
    delete: { en: 'Delete', zh: '删除' },
    clearAll: { en: 'Clear all', zh: '清空' },
    exportBtn: { en: 'Export JSON', zh: '导出 JSON' },
    importBtn: { en: 'Import', zh: '导入' },
    importHint: { en: 'Paste a question-pack JSON here (exported data, or a pack made for you), then click Import.', zh: '在此粘贴题目包 JSON（导出的数据，或为你生成的题目包），然后点导入。' },
    importOk: { en: 'Imported — open any unit to see the new questions.', zh: '导入成功——打开任意单元即可看到新题。' },
    emptyWrong: { en: 'No wrong questions yet. Nice!', zh: '错题本还是空的，干得漂亮。' },
    emptyNotes: { en: 'No notes yet.', zh: '还没有笔记。' },
    saved: { en: 'Saved', zh: '已保存' },
    yourNotes: { en: 'Notes per subject — export them to ask for a custom question pack.', zh: '按科目记笔记——导出后可以让我为你定制题目包。' },
    session: { en: 'Session', zh: '本场' },
    confirm: { en: 'Check', zh: '确认' },
    next: { en: 'Next →', zh: '下一题 →' },
    streak: { en: 'Streak', zh: '连胜' },
    packFromMistakes: { en: 'Practice my mistakes ×3', zh: '错题强化练习 ×3' },
    packHint: { en: 'Each missed question comes back 3 times in a targeted round.', zh: '错题强化轮：每道错过的题会出现 3 次。' },
    endlessHint: { en: 'Endless mode — every round mixes the bank with freshly generated questions, FRQs and drawing prompts.', zh: '无限模式——每轮由题库 + 实时生成的新题、FRQ 和画图题混合而成。' }
  };
  function tr(key) { return T[key] ? (T[key][state.lang] || T[key].en) : key; }

  /* ---------- escape + storage ---------- */
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&' + 'amp;').replace(/</g, '&' + 'lt;').replace(/>/g, '&' + 'gt;').replace(/"/g, '&' + 'quot;'); }

  function lsGet(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }
  function lsSet(key, val) { try { localStorage.setItem(key, val); } catch (e) {} }

  /* ---------- data ---------- */
  var SUBJECTS = [window.SUBJECT_GEO, window.SUBJECT_BIO, window.SUBJECT_PRECALC];
  var PACKS = [];

  /* ---------- state ---------- */
  var state = {
    lang: (lsGet('studyloop_lang') === 'en') ? 'en' : 'zh',
    view: 'home',
    subject: null, unitId: null,
    queue: [], idx: 0, selected: null,
    session: { answered: 0, correct: 0, streak: 0, best: 0 },
    unitStats: {},
    wrongbook: [], notes: { geo: '', bio: '', precalc: '' }
  };
  var saved = null;
  try { saved = JSON.parse(lsGet('studyloop_v2') || 'null'); } catch (e) {}
  if (saved && typeof saved === 'object') {
    if (Array.isArray(saved.wrongbook)) state.wrongbook = saved.wrongbook;
    if (saved.notes && typeof saved.notes === 'object') {
      ['geo', 'bio', 'precalc'].forEach(function (k) { if (typeof saved.notes[k] === 'string') state.notes[k] = saved.notes[k]; });
    }
    if (saved.session && typeof saved.session === 'object') state.session = saved.session;
    if (saved.unitStats && typeof saved.unitStats === 'object') state.unitStats = saved.unitStats;
    if (Array.isArray(saved.packs)) PACKS = saved.packs;
  }
  function persist() {
    lsSet('studyloop_v2', JSON.stringify({
      wrongbook: state.wrongbook, notes: state.notes, session: state.session,
      unitStats: state.unitStats, packs: PACKS
    }));
  }

  /* ---------- elements ---------- */
  var $root = document.getElementById('view');

  function lang(v) { return v ? (v[state.lang] || v.en) : ''; }

  function updateChrome() {
    var langLabel = document.getElementById('langLabel');
    if (langLabel) langLabel.textContent = state.lang === 'zh' ? '切换 English' : '切换中文';
    var wb = document.querySelector('[data-testid="button-wrongbook"]');
    if (wb) wb.textContent = tr('wrongbook');
    var nt = document.querySelector('[data-testid="button-notes"]');
    if (nt) nt.textContent = tr('notes');
    var fn = document.getElementById('footerNote');
    if (fn) fn.textContent = state.lang === 'zh'
      ? '无限刷题 · FRQ · 画图 · 错题本 · 笔记 · 中英双语'
      : 'Endless questions · FRQ · drawing · wrongbook · notes · bilingual';
  }

  /* ---------- question pipeline ---------- */
  function genId() { return 'g' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }

  function subjectOf(unitId) {
    for (var i = 0; i < SUBJECTS.length; i++) {
      var s = SUBJECTS[i];
      for (var j = 0; j < s.units.length; j++) if (s.units[j].id === unitId) return s;
    }
    return null;
  }
  function unitOf(unitId) {
    var s = subjectOf(unitId);
    if (!s) return null;
    return s.units.filter(function (u) { return u.id === unitId; })[0] || null;
  }

  function extrasFor(unitId) {
    var sub = subjectOf(unitId);
    if (!sub) return [];
    var pool = [];
    (window.FRQ[sub.id] || []).forEach(function (q) { if (q.unit === unitId) pool.push(q); });
    (window.DRAW[sub.id] || []).forEach(function (q) { if (q.unit === unitId) pool.push(q); });
    PACKS.forEach(function (p) {
      (p.questions || []).forEach(function (q) { if (q.unit === unitId && q.q) pool.push(q); });
    });
    return pool;
  }

  function shuffleArr(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }

  function fillQueue(unitId, usePack) {
    var sub = subjectOf(unitId);
    var unit = unitOf(unitId);
    if (!sub || !unit) return [];

    var out = (unit.questions || []).slice();
    var extras = extrasFor(unitId).filter(function (q) { return q.t === 'frq' || q.t === 'draw'; });
    var packMcqs = [];
    if (usePack) {
      state.wrongbook.forEach(function (w) {
        if (w.unit === unitId && w.src && w.src.o) {
          for (var k = 0; k < 3; k++) packMcqs.push(JSON.parse(JSON.stringify(w.src)));
        }
      });
    } else {
      PACKS.forEach(function (p) {
        (p.questions || []).forEach(function (q) {
          if (q.unit === unitId && q.q && q.o && q.t !== 'frq' && q.t !== 'draw') packMcqs.push(q);
        });
      });
    }

    var gens = (window.GENERATORS[sub.id] || []);
    var usedGens = [];
    var target = Math.max(8, Math.min((unit.questions || []).length + 4, 14)) + extras.length + packMcqs.length;
    while (out.length < target && gens.length) {
      var gi = Math.floor(Math.random() * gens.length);
      var count = usedGens.filter(function (g) { return g === gi; }).length;
      if (count >= 2) {
        if (usedGens.length >= gens.length * 2) usedGens = [];
        continue;
      }
      usedGens.push(gi);
      var q = gens[gi]();
      if (!q || !q.q || !q.o || q.o.length < 2) continue;
      q.id = genId();
      out.push(q);
    }

    out = out.concat(packMcqs);
    // sprinkle FRQ / draw questions through the round instead of lumping them at the end
    extras.forEach(function (ex) {
      out.splice(Math.max(0, Math.floor(Math.random() * out.length)), 0, ex);
    });
    return shuffleArr(out.filter(function (q) { return q && q.q; }));
  }

  function startUnit(unitId, usePack) {
    state.unitId = unitId;
    state.subject = subjectOf(unitId);
    state.queue = fillQueue(unitId, usePack);
    if (!state.queue.length) return;
    state.idx = 0; state.selected = null;
    state.view = 'quiz';
    applyAccent();
    render();
  }

  function applyAccent() {
    document.body.setAttribute('data-accent', state.subject ? state.subject.id : 'none');
  }

  /* ---------- render ---------- */
  function render() {
    updateChrome();
    if (state.view === 'home') renderHome();
    else if (state.view === 'subject') renderSubject();
    else if (state.view === 'quiz') renderQuiz();
    else if (state.view === 'done') renderDone();
    else if (state.view === 'wrongbook') renderWrongbook();
    else if (state.view === 'notes') renderNotes();
  }

  function renderHome() {
    document.body.setAttribute('data-accent', 'none');
    state.subject = null;
    var html =
      '<section class="home-hero">' +
      '<h1>StudyLoop</h1>' +
      '<p class="sub">' + esc(tr('tagline')) + '</p>' +
      '<p class="sub">' + esc(tr('subtitle')) + '</p>' +
      '<p class="sub hint-line">' + esc(tr('endlessHint')) + '</p>' +
      '</section>' +
      '<h2 class="page-title" style="margin-bottom:var(--space-5)">' + esc(tr('chooseSubject')) + '</h2>' +
      '<div class="subject-grid">';
    SUBJECTS.forEach(function (s) {
      var total = s.units.reduce(function (n, u) { return n + (u.questions || []).length; }, 0);
      html +=
        '<button class="subject-card" data-testid="card-subject-' + s.id + '" data-accent="' + s.id + '">' +
        '<div class="badge-row"><span class="dot"></span><span class="units">' + s.units.length + ' ' + esc(tr('units')) + '</span></div>' +
        '<h2>' + esc(lang(s.name)) + '</h2>' +
        '<p class="tag">' + esc(lang(s.tagline)) + '</p>' +
        '<p class="desc">' + total + ' Q</p>' +
        '</button>';
    });
    html += '</div>';
    $root.innerHTML = html;
  }

  function renderSubject() {
    var s = state.subject;
    if (!s) { state.view = 'home'; renderHome(); return; }
    applyAccent();
    var html =
      '<button class="back-link" data-testid="button-home">← ' + esc(tr('backHome')) + '</button>' +
      '<h1 class="page-title">' + esc(lang(s.name)) + '</h1>' +
      '<p class="page-sub">' + esc(lang(s.tagline)) + '</p>' +
      '<div class="unit-grid">';
    s.units.forEach(function (u) {
      var stat = state.unitStats[u.id] || { seen: 0, right: 0 };
      var pct = stat.seen ? Math.round(stat.right / stat.seen * 100) : null;
      html +=
        '<div class="unit-card" data-testid="unit-' + u.id + '">' +
        '<h3>' + esc(lang(u.name)) + '</h3>' +
        '<ul class="topics">' + (u.topics || []).slice(0, 5).map(function (t) { return '<li>' + esc(lang(t)) + '</li>'; }).join('') + '</ul>' +
        '<div class="meta">' +
        (pct !== null ? '<span class="chip good" data-testid="chip-acc-' + u.id + '">' + pct + '% ' + esc(tr('correctRate')) + '</span>' : '<span>' + (u.questions || []).length + ' Q</span>') +
        '</div>' +
        '<button class="start-btn" data-testid="button-start-' + u.id + '" data-unit="' + u.id + '">' + esc(tr('start')) + '</button>' +
        '</div>';
    });
    html += '</div>';
    $root.innerHTML = html;
  }

  function qtypeLabel(t) {
    if (t === 'frq') return tr('frq');
    if (t === 'draw') return tr('draw');
    return t;
  }

  function renderQuiz() {
    var q = state.queue[state.idx];
    if (!q) { state.view = 'done'; renderDone(); return; }
    var total = state.queue.length;
    var progress = Math.round(state.idx / total * 100);
    var body = (q.t === 'frq') ? bodyFrq(q) : (q.t === 'draw') ? bodyDraw(q) : bodyMcq(q);

    $root.innerHTML =
      '<div class="quiz-top">' +
      '<div class="left"><button class="back-link" data-testid="button-home">← ' + esc(tr('backHome')) + '</button></div>' +
      '<div class="left">' +
      '<span class="chip" data-testid="chip-session">' + esc(tr('session')) + ' ' + state.session.correct + '/' + state.session.answered + '</span>' +
      '<span class="chip" data-testid="chip-streak">' + esc(tr('streak')) + ' ' + state.session.streak + '</span>' +
      '</div></div>' +
      '<div class="progress-bar"><div class="progress-track"><div class="progress-fill" style="width:' + progress + '%"></div></div>' +
      '<div class="row"><span>' + (state.idx + 1) + ' / ' + total + '</span><span>' + esc(lang((unitOf(state.unitId) || {}).name || '')) + '</span></div></div>' +
      '<div class="question-card" data-testid="question-card">' +
      '<div class="q-tag-row">' +
      (q.topic ? '<span class="tag">' + esc(lang(q.topic)) + '</span>' : '') +
      '<span class="tag">' + esc(qtypeLabel(q.t)) + '</span>' +
      '</div>' +
      (q.svg ? q.svg : '') +
      '<p class="q-text" data-testid="text-question">' + esc(lang(q.q)) + '</p>' +
      body +
      '</div>';
    if (q.t === 'draw') initCanvas();
  }

  function bodyMcq(q) {
    var html = '<div class="option-list">';
    for (var j = 0; j < q.o.length; j++) {
      var cls = 'option';
      if (state.selected !== null) {
        if (j === q.a) cls += ' correct';
        else if (j === state.selected) cls += ' wrong';
        else cls += ' dim';
      }
      html += '<button class="' + cls + '" data-testid="option-' + j + '" data-opt="' + j + '"' +
        (state.selected !== null ? ' disabled' : '') + '>' +
        '<span class="key">' + String.fromCharCode(65 + j) + '</span><span>' + esc(lang(q.o[j])) + '</span></button>';
    }
    html += '</div>';
    if (state.selected === null) {
      html += '<div class="quiz-nav"><span class="kb-hint">A–D ' + (state.lang === 'zh' ? '选择答案' : 'to answer') + ' · Enter ' + (state.lang === 'zh' ? '下一题' : 'for next') + '</span></div>';
    } else {
      html += '<div class="quiz-nav"><button class="btn primary" data-testid="button-next">' + esc(tr('next')) + '</button></div>';
    }
    if (state.selected !== null && q.e) {
      var right = state.selected === q.a;
      html += '<div class="explain ' + (right ? 'ok' : 'bad') + '" data-testid="explain">' +
        '<span class="verdict">' + (right ? '✓ ' + esc(tr('correct')) : '✗ ' + esc(tr('wrong'))) + '</span>' +
        esc(lang(q.e)) + '</div>';
    }
    return html;
  }

  function bodyFrq(q) {
    var html = '<textarea class="frq-input" data-testid="frq-input" rows="6" placeholder="' + esc(tr('answerBelow')) + '"></textarea>';
    html += '<div class="quiz-nav"><button class="btn primary" data-testid="button-rubric">' + esc(tr('showRubric')) + '</button></div>';
    html += '<div class="explain hidden" data-testid="rubric-box">' +
      '<span class="verdict">' + esc(tr('rubric')) + '</span>' +
      (q.points || []).map(function (p) {
        return '<div class="rubric-point"><span class="rubric-label">' + esc(lang(p.label)) + '</span> — ' + esc(lang(p.model)) + '</div>';
      }).join('') + '</div>';
    html += '<div class="self-grade-row">' +
      '<span class="sub" style="font-weight:700">' + esc(tr('selfGrade')) + '</span>' +
      '<button class="btn primary" data-testid="button-frq-right">' + esc(tr('markRight')) + '</button>' +
      '<button class="btn primary" data-testid="button-frq-wrong">' + esc(tr('markWrong')) + '</button>' +
      '</div>';
    return html;
  }

  function bodyDraw(q) {
    var html = '<div class="canvas-wrap">' +
      '<canvas class="draw-canvas" data-testid="draw-canvas" width="640" height="360"></canvas>' +
      '<div class="canvas-tools">' +
      '<span class="tools-label">' + esc(tr('palette')) + '</span>' +
      ['#b4552d', '#2e7d46', '#3b4bb5', '#111111'].map(function (c) {
        return '<button class="color-btn" data-color="' + c + '" style="background:' + c + '" aria-label="color"></button>';
      }).join('') +
      '<span class="tools-label" style="margin-left:var(--space-4)">' + esc(tr('brush')) + '</span>' +
      '<input type="range" class="brush-size" min="2" max="18" value="4" data-testid="brush-size">' +
      '<button class="icon-btn" data-testid="button-undo">' + esc(tr('undoCanvas')) + '</button>' +
      '<button class="icon-btn" data-testid="button-clear">' + esc(tr('clearCanvas')) + '</button>' +
      '</div></div>';
    html += '<div class="quiz-nav"><button class="btn primary" data-testid="button-ref">' + esc(tr('showRubric')) + '</button></div>';
    html += '<div class="explain hidden" data-testid="rubric-box">' +
      '<span class="verdict">' + esc(tr('reference')) + '</span>' +
      (q.refSvg ? q.refSvg : '') +
      '<div class="rubric-point" style="margin-top:var(--space-3)">' + esc(lang(q.rubric)) + '</div>' +
      '</div>';
    html += '<div class="self-grade-row">' +
      '<span class="sub" style="font-weight:700">' + esc(tr('selfGrade')) + '</span>' +
      '<button class="btn primary" data-testid="button-frq-right">' + esc(tr('markRight')) + '</button>' +
      '<button class="btn primary" data-testid="button-frq-wrong">' + esc(tr('markWrong')) + '</button>' +
      '</div>';
    return html;
  }

  /* ---------- drawing canvas ---------- */
  function initCanvas() {
    var canvas = document.querySelector('[data-testid="draw-canvas"]');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    var strokes = [], drawing = false, cur = null;
    var color = '#b4552d';
    function pos(e) {
      var r = canvas.getBoundingClientRect();
      var t = e.touches ? e.touches[0] : e;
      return { x: (t.clientX - r.left) * canvas.width / r.width, y: (t.clientY - r.top) * canvas.height / r.height };
    }
    function redraw() {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      strokes.forEach(function (s) {
        ctx.strokeStyle = s.color; ctx.lineWidth = s.size;
        ctx.beginPath();
        s.pts.forEach(function (p, i) { i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y); });
        ctx.stroke();
      });
    }
    function start(e) { drawing = true; cur = { color: color, size: parseInt((document.querySelector('.brush-size') || {}).value || '4', 10), pts: [pos(e)] }; strokes.push(cur); e.preventDefault(); }
    function move(e) { if (!drawing) return; cur.pts.push(pos(e)); redraw(); e.preventDefault(); }
    function end() { drawing = false; }
    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('mousemove', move);
    window.addEventListener('mouseup', end);
    canvas.addEventListener('touchstart', start, { passive: false });
    canvas.addEventListener('touchmove', move, { passive: false });
    canvas.addEventListener('touchend', end);
    Array.prototype.forEach.call(document.querySelectorAll('.color-btn'), function (b) {
      b.addEventListener('click', function () {
        Array.prototype.forEach.call(document.querySelectorAll('.color-btn'), function (x) { x.classList.remove('active'); });
        b.classList.add('active');
        color = b.getAttribute('data-color');
      });
    });
    var undo = document.querySelector('[data-testid="button-undo"]');
    if (undo) undo.addEventListener('click', function () { strokes.pop(); redraw(); });
    var clear = document.querySelector('[data-testid="button-clear"]');
    if (clear) clear.addEventListener('click', function () { strokes = []; redraw(); });
  }

  function renderDone() {
    var pct = state.session.answered ? Math.round(state.session.correct / state.session.answered * 100) : 0;
    $root.innerHTML =
      '<div class="done-card">' +
      '<p class="big">' + esc(tr('result')) + '</p>' +
      '<p class="pct" data-testid="text-score">' + state.session.correct + ' / ' + state.session.answered + '</p>' +
      '<p class="sub">' + pct + '% ' + esc(tr('correctRate')) + ' · ' + esc(tr('streak')) + ' ' + state.session.best + '</p>' +
      '<div class="done-actions">' +
      '<button class="btn primary" data-testid="button-again">' + esc(tr('restart')) + '</button>' +
      '<button class="btn" data-testid="button-home">' + esc(tr('backHome')) + '</button>' +
      '</div></div>';
  }

  /* ---------- wrongbook ---------- */
  function renderWrongbook() {
    document.body.setAttribute('data-accent', 'none');
    var html =
      '<button class="back-link" data-testid="button-home">← ' + esc(tr('back')) + '</button>' +
      '<h1 class="page-title">' + esc(tr('wrongbook')) + '</h1>' +
      '<p class="page-sub">' + esc(tr('packHint')) + '</p>';
    if (state.wrongbook.length) {
      html += '<div class="done-actions" style="justify-content:flex-start;margin-bottom:var(--space-6)">' +
        '<button class="btn primary" data-testid="button-pack">' + esc(tr('packFromMistakes')) + '</button>' +
        '<button class="btn" data-testid="button-export-wrong">' + esc(tr('exportBtn')) + '</button>' +
        '<button class="btn" data-testid="button-clear-wrong">' + esc(tr('clearAll')) + '</button>' +
        '</div><div class="wrong-list">';
      state.wrongbook.forEach(function (w, idx) {
        html += '<div class="wrong-item" data-testid="wrong-item-' + idx + '">' +
          '<div class="wrong-stem">' + esc((w.q || {})[state.lang] || (w.q || {}).en) + '</div>' +
          '<div class="wrong-ans"><span class="wtag">' + esc(tr('correctAns')) + '</span>' + esc(w.a) + '</div>' +
          (w.myAns ? '<div class="wrong-ans"><span class="wtag my">' + esc(tr('myAns')) + '</span>' + esc(w.myAns) + '</div>' : '') +
          '<button class="btn btn-sm" data-testid="button-del-wrong-' + idx + '">' + esc(tr('delete')) + '</button>' +
          '</div>';
      });
      html += '</div>';
    } else {
      html += '<p class="page-sub">' + esc(tr('emptyWrong')) + '</p>';
    }
    html += '<div class="pack-import-box">' +
      '<h2 class="page-title" style="font-size:var(--text-lg)">' + esc(tr('importBtn')) + '</h2>' +
      '<p class="page-sub">' + esc(tr('importHint')) + '</p>' +
      '<textarea class="frq-input" data-testid="pack-input" rows="5"></textarea>' +
      '<div class="done-actions" style="justify-content:flex-start">' +
      '<button class="btn primary" data-testid="button-import">' + esc(tr('importBtn')) + '</button>' +
      '<span class="import-msg hidden" data-testid="import-msg"></span>' +
      '</div></div>';
    $root.innerHTML = html;
  }

  function renderNotes() {
    document.body.setAttribute('data-accent', 'none');
    var html =
      '<button class="back-link" data-testid="button-home">← ' + esc(tr('back')) + '</button>' +
      '<h1 class="page-title">' + esc(tr('notes')) + '</h1>' +
      '<p class="page-sub">' + esc(tr('yourNotes')) + '</p>';
    ['geo', 'bio', 'precalc'].forEach(function (id) {
      var s = SUBJECTS.filter(function (x) { return x.id === id; })[0];
      html += '<div class="note-block" data-testid="note-block-' + id + '">' +
        '<h2 class="page-title" style="font-size:var(--text-lg)">' + esc(lang(s.name)) + '</h2>' +
        '<textarea class="frq-input" data-testid="notes-' + id + '" rows="6">' + esc(state.notes[id]) + '</textarea>' +
        '<div class="done-actions" style="justify-content:flex-start">' +
        '<button class="btn primary" data-testid="button-save-notes-' + id + '">' + esc(tr('save')) + '</button>' +
        '<span class="import-msg hidden" data-testid="saved-msg-' + id + '">' + esc(tr('saved')) + '</span>' +
        '<button class="btn" data-testid="button-export-notes-' + id + '">' + esc(tr('exportBtn')) + '</button>' +
        '</div></div>';
    });
    $root.innerHTML = html;
  }

  /* ---------- stats + wrongbook ---------- */
  function unitStatsUpdate(unitId, right) {
    var st = state.unitStats[unitId] || { seen: 0, right: 0 };
    st.seen++; if (right) st.right++;
    state.unitStats[unitId] = st;
    persist();
  }
  function sessionUpdate(right) {
    state.session.answered++;
    if (right) {
      state.session.correct++;
      state.session.streak++;
      if (state.session.streak > state.session.best) state.session.best = state.session.streak;
    } else { state.session.streak = 0; }
    persist();
  }
  function addWrong(q, myAns) {
    state.wrongbook.push({
      unit: state.unitId || q.unit,
      q: { en: q.q.en || q.q.zh, zh: q.q.zh || q.q.en },
      a: q.o ? String(lang(q.o[q.a])) : '',
      myAns: String(myAns || ''),
      src: q.o ? { t: q.t, q: q.q, o: q.o, a: q.a, e: q.e, svg: q.svg } : null
    });
    persist();
  }
  function exportJson(name, data) {
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name + '.json';
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
  }

  /* ---------- events ---------- */
  function bindEvents() {
    document.addEventListener('click', function (e) {
      var t = e.target.closest ? e.target.closest('button') : null;
      if (!t) return;
      var testid = t.getAttribute('data-testid') || '';
      var action = t.getAttribute('data-action') || '';

      if (action === 'lang') {
        state.lang = state.lang === 'zh' ? 'en' : 'zh';
        lsSet('studyloop_lang', state.lang);
        render(); return;
      }
      if (testid === 'button-wrongbook') { state.view = 'wrongbook'; state.subject = null; render(); return; }
      if (testid === 'button-notes') { state.view = 'notes'; state.subject = null; render(); return; }
      if (action === 'home' || testid === 'button-home') { state.view = 'home'; state.subject = null; render(); return; }

      var subjectBtn = t.closest('.subject-card');
      if (subjectBtn) {
        state.subject = SUBJECTS.filter(function (s) { return s.id === subjectBtn.getAttribute('data-accent'); })[0];
        state.view = 'subject'; render(); return;
      }
      var sb = t.closest('.start-btn');
      if (sb) { startUnit(sb.getAttribute('data-unit')); return; }

      if (state.view === 'quiz') {
        var q = state.queue[state.idx];
        if (testid.indexOf('option-') === 0 && q && q.t !== 'frq' && q.t !== 'draw' && state.selected === null) {
          state.selected = parseInt(testid.split('-')[1], 10);
          if (state.selected >= q.o.length) { state.selected = null; return; }
          var right = state.selected === q.a;
          sessionUpdate(right);
          unitStatsUpdate(state.unitId, right);
          if (!right) addWrong(q, lang(q.o[state.selected]));
          render(); return;
        }
        if (testid === 'button-next') {
          state.selected = null; state.idx++;
          if (state.idx >= state.queue.length) state.view = 'done';
          render(); return;
        }
        if (testid === 'button-rubric' || testid === 'button-ref') {
          var box = document.querySelector('[data-testid="rubric-box"]');
          if (box) box.classList.toggle('hidden');
          if (box && !box.classList.contains('hidden')) box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          return;
        }
        if (testid === 'button-frq-right' || testid === 'button-frq-wrong') {
          var rightF = testid === 'button-frq-right';
          sessionUpdate(rightF);
          unitStatsUpdate(state.unitId, rightF);
          if (!rightF) {
            var input = document.querySelector('[data-testid="frq-input"]');
            addWrong(q, input ? input.value.slice(0, 400) : '');
          }
          state.selected = null; state.idx++;
          if (state.idx >= state.queue.length) state.view = 'done';
          render(); return;
        }
      }

      if (state.view === 'done' && testid === 'button-again') { startUnit(state.unitId); return; }

      if (state.view === 'wrongbook') {
        if (testid === 'button-pack') {
          var unit = null;
          for (var i = 0; i < state.wrongbook.length; i++) if (state.wrongbook[i].unit) { unit = state.wrongbook[i].unit; break; }
          if (unit) startUnit(unit, true);
          return;
        }
        if (testid === 'button-export-wrong') {
          exportJson('studyloop-wrongbook', { type: 'wrongbook', items: state.wrongbook });
          return;
        }
        var delMatch = testid.match(/^button-del-wrong-(\d+)$/);
        if (delMatch) {
          state.wrongbook.splice(parseInt(delMatch[1], 10), 1);
          persist(); render(); return;
        }
        if (testid === 'button-clear-wrong') {
          if (window.confirm(tr('clearAll') + '?')) { state.wrongbook = []; persist(); render(); }
          return;
        }
        if (testid === 'button-import') {
          var ta = document.querySelector('[data-testid="pack-input"]');
          var msg = document.querySelector('[data-testid="import-msg"]');
          try {
            var pack = JSON.parse(ta.value);
            var arr = Array.isArray(pack) ? pack : (pack.questions || pack.items || []);
            if (!arr.length) throw new Error('no questions found');
            PACKS.push({
              questions: arr.map(function (q) {
                return {
                  t: q.t || 'concept', unit: q.unit || 'geo1',
                  q: q.q, o: q.o, a: q.a || 0, e: q.e, svg: q.svg,
                  points: q.points, rubric: q.rubric, refSvg: q.refSvg, topic: q.topic
                };
              })
            });
            persist();
            msg.textContent = tr('importOk');
          } catch (err) {
            msg.textContent = 'JSON error: ' + err.message;
          }
          msg.classList.remove('hidden');
          return;
        }
      }

      if (state.view === 'notes') {
        var saveMatch = testid.match(/^button-save-notes-(\w+)$/);
        if (saveMatch) {
          var id = saveMatch[1];
          var ta2 = document.querySelector('[data-testid="notes-' + id + '"]');
          state.notes[id] = ta2 ? ta2.value : '';
          persist();
          var sm = document.querySelector('[data-testid="saved-msg-' + id + '"]');
          if (sm) { sm.textContent = tr('saved'); sm.classList.remove('hidden'); setTimeout(function () { sm.classList.add('hidden'); }, 1600); }
          return;
        }
        var exMatch = testid.match(/^button-export-notes-(\w+)$/);
        if (exMatch) {
          exportJson('studyloop-notes-' + exMatch[1], { type: 'notes', subject: exMatch[1], notes: state.notes[exMatch[1]] });
          return;
        }
      }
    });

    document.addEventListener('keydown', function (e) {
      if (state.view !== 'quiz') return;
      var q = state.queue[state.idx];
      if (!q || q.t === 'frq' || q.t === 'draw') return;
      if (document.activeElement && /TEXTAREA|INPUT/.test(document.activeElement.tagName)) return;
      if (/^[a-d]$/i.test(e.key) && state.selected === null) {
        var idx = e.key.toLowerCase().charCodeAt(0) - 97;
        var btn = document.querySelector('[data-testid="option-' + idx + '"]');
        if (btn && idx < q.o.length) btn.click();
      } else if (e.key === 'Enter') {
        if (state.selected !== null) { var n = document.querySelector('[data-testid="button-next"]'); if (n) n.click(); }
      }
    });
  }

  updateChrome();
  bindEvents();
  render();
})();
