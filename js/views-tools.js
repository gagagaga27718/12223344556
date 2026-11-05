/* StudyLoop views — AI Tutor, graph lab + formulas, settings */
(function () {
  'use strict';
  var SL = window.SL;
  var esc = SL.esc, L = SL.L, t = SL.t, I = SL.ICON, ui = SL.ui;

  /* =========================================================
   * AI Tutor
   * ========================================================= */
  var CHAT_KEY = 'studyloop_chat';
  function loadChats() { try { return JSON.parse(SL.lsGet(CHAT_KEY) || '{}') || {}; } catch (e) { return {}; } }
  function saveChats(c) { SL.lsSet(CHAT_KEY, JSON.stringify(c)); }
  var TU = { s: null, mode: 'simple', draft: '', gen: null, handle: null, streaming: false };

  function letter(i) { return String.fromCharCode(65 + i); }
  function qBlock(q) {
    var out = 'Question (' + (SL.unit(q.u) ? SL.unit(q.u).name.en : q.u) + ' — topic: ' + SL.topicNameEn(q.u, q.tp) + '):\n' + (q.q.en || q.q.zh);
    if (q.o) out += '\nOptions:\n' + q.o.map(function (o, i) { return letter(i) + '. ' + (o.en || o.zh); }).join('\n') + '\nCorrect answer: ' + letter(q.a) + '. ' + (q.o[q.a].en || q.o[q.a].zh);
    if (q.e) out += '\nBank explanation: ' + (q.e.en || q.e.zh);
    return out;
  }
  function presetPrompt(task, query) {
    var q = query.q ? (SL.byId(query.q) || (SL.store.mistakes[query.q] || {}).q) : null;
    if (task === 'mistake' && q) {
      var chosen = query.chosen != null && query.chosen !== '' ? parseInt(query.chosen, 10) : -1;
      if (chosen < 0 && query.chosenText && q.o) q.o.forEach(function (o, i) { if (o.en === query.chosenText || o.zh === query.chosenText) chosen = i; });
      return qBlock(q) + '\n\nI chose: ' + (chosen >= 0 && q.o ? letter(chosen) + '. ' + (q.o[chosen].en || q.o[chosen].zh) : '(unknown)') +
        '\n\nPlease: 1) explain why the correct answer is right; 2) analyse each wrong option, especially the one I picked; 3) name the concept being tested; 4) explain the misunderstanding I probably have; 5) give one concrete example; 6) suggest what I should practise next.';
    }
    if (task === 'frq' && q) {
      var sess = SL.store.active, ans = '';
      if (sess && sess.answers) sess.items.forEach(function (x, i) { if (x.id === q.id && sess.answers[i]) ans = sess.answers[i].text || ''; });
      return 'FRQ: ' + (q.q.en || q.q.zh) + '\n\nRubric:\n' + (q.points || []).map(function (p) { return '- ' + p.label.en + ': ' + p.model.en; }).join('\n') +
        '\n\nMy answer:\n' + (ans || '(paste your answer here)') + '\n\nScore my answer point by point against the rubric (earned / not earned and why), point out missing key content, and show how to improve each part.';
    }
    if (task === 'explain' && query.topic) {
      var p = SL.parseTopicKey(query.topic);
      return 'Explain the topic "' + SL.topicNameEn(p.u, p.tp) + '" (' + SL.unit(p.u).name.en + '). I have been getting questions on it wrong. Start from the basics, give an example, then give me one quick check question.';
    }
    if (task === 'notes' && query.s) {
      return 'Here are my notes for ' + SL.subject(query.s).name.en + ':\n\n' + (SL.store.notes[query.s] || '(no notes yet)').slice(0, 6000) + '\n\nQuiz me on these notes: ask me 3 questions one at a time and wait for my answer before giving feedback.';
    }
    return '';
  }
  function guidancePrompt(sid) {
    var s = SL.subject(sid), sm = SL.subjectMastery(sid), st = SL.stats(function (x) { return x.s === sid; });
    var weak = SL.weakTopics(6, sid).map(function (w) { return SL.topicNameEn(w.u, w.tp) + ' (' + w.m + '%)'; });
    var exam = SL.store.planner.exams[sid];
    return 'My data for ' + s.name.en + ': ' + st.n + ' questions answered, accuracy ' + (st.acc == null ? 'n/a' : st.acc + '%') + ', average mastery ' + sm.avg + '% across ' + sm.total + ' topics (' + sm.started + ' started).' +
      (weak.length ? ' Weakest topics: ' + weak.join(', ') + '.' : ' No weak topics identified yet.') + (exam ? ' My exam is on ' + exam + '.' : '') +
      ' Give me a concrete study plan for the next 7 days (what to practise each day, in StudyLoop terms: adaptive practice, review, flashcards, mock exam).';
  }
  function examPrompt(sid) {
    var weak = SL.weakTopics(5, sid).map(function (w) { return SL.topicNameEn(w.u, w.tp); });
    return 'Help me prepare for my ' + SL.subject(sid).name.en + ' exam. Summarise the highest-yield ideas unit by unit, list the most common traps, and explain how points are earned on the free-response section.' + (weak.length ? ' Spend extra time on: ' + weak.join(', ') + '.' : '');
  }

  function renderTutor(m, q) {
    if (q.s && SL.subject(q.s)) TU.s = q.s;
    if (q.q) { var qq = SL.byId(q.q) || (SL.store.mistakes[q.q] || {}).q; if (qq) TU.s = qq.s; }
    if (q.topic) { var su = SL.subjectOfUnit(SL.parseTopicKey(q.topic).u); if (su) TU.s = su.id; }
    if (!TU.s) TU.s = SL.store.settings.lastSubject || 'geo';
    if (q.task) {
      TU.draft = presetPrompt(q.task, q) || TU.draft;
      if (q.task === 'mistake' || q.task === 'frq') TU.mode = 'deep';
      if (SL.subject(TU.s).id === 'precalc' && q.task === 'mistake') TU.mode = 'socratic';
      history.replaceState(null, '', '#/tutor');
    }
    var chats = loadChats(), msgs = chats[TU.s] || [];
    var configured = SL.AI.configured();
    var html = '';
    if (!configured) {
      html += '<div class="notice"><b>' + esc(L('AI Tutor 还没有连接。', 'AI Tutor is not connected yet. ')) + '</b>' +
        esc(L('这是静态网站，没有自己的服务器，所以需要你在「设置」里填写自己的 Anthropic API Key（只保存在这台设备的浏览器里），或填写一个代理地址。配置前，下面的功能都不会发出请求，也不会显示假回答。', 'This is a static site with no server of its own, so add your own Anthropic API key in Settings (kept only in this browser), or a proxy URL. Until then nothing is sent and no fake answers are shown.')) +
        ' <a href="#/settings">' + esc(L('去设置 →', 'Open Settings →')) + '</a></div>';
    }
    html += '<div class="grid mt16" style="grid-template-columns:minmax(0,1fr);gap:16px"><div class="card"><div class="row between">' +
      '<div class="seg">' + SL.SUBJECTS.map(function (s) { return '<button class="' + (s.id === TU.s ? 'on' : '') + '" data-act="tuS" data-v="' + s.id + '">' + esc(t(s.name)) + '</button>'; }).join('') + '</div>' +
      '<div class="row"><label class="small bold" for="tuMode">' + esc(L('教学模式', 'Teaching mode')) + '</label><select id="tuMode" class="input" style="width:auto" data-change="tuMode">' +
      [['simple', L('简单解释', 'Simple')], ['deep', L('深度讲解', 'Deep dive')], ['exam', L('考试模式', 'Exam focus')], ['socratic', L('苏格拉底引导', 'Socratic')]].map(function (x) { return '<option value="' + x[0] + '"' + (TU.mode === x[0] ? ' selected' : '') + '>' + esc(x[1]) + '</option>'; }).join('') + '</select></div></div>' +
      '<div class="pill-wrap mt12">' +
      '<button class="pill" data-act="tuPreset" data-v="explain">💡 ' + esc(L('解释知识点', 'Explain a concept')) + '</button>' +
      '<button class="pill" data-act="tuPreset" data-v="mistakes">🩺 ' + esc(L('分析我的错题', 'Analyse my mistakes')) + '</button>' +
      '<button class="pill" data-act="tuPreset" data-v="generate">🧩 ' + esc(L('生成练习题', 'Generate questions')) + '</button>' +
      '<button class="pill" data-act="tuPreset" data-v="exam">📝 ' + esc(L('考前复习', 'Exam prep')) + '</button>' +
      '<button class="pill" data-act="tuPreset" data-v="guide">🧭 ' + esc(L('学习指导', 'Study guidance')) + '</button>' +
      '<button class="pill" data-act="tuPreset" data-v="ask">💬 ' + esc(L('自由提问', 'Ask anything')) + '</button></div></div>';

    if (TU.gen) html += genPanel();

    html += '<div class="card"><div class="card-head"><h3>' + esc(L('对话', 'Conversation')) + ' · ' + esc(t(SL.subject(TU.s).name)) + '</h3>' + (msgs.length ? '<button class="link" data-act="tuClear">' + esc(L('清空对话', 'Clear chat')) + '</button>' : '') + '</div>' +
      '<div class="chat" id="chat">' + (msgs.length ? msgs.map(function (mm) { return '<div class="msg ' + (mm.role === 'user' ? 'user' : 'ai md') + '">' + (mm.role === 'user' ? esc(mm.content) : SL.AI.md(mm.content)) + '</div>'; }).join('') :
        '<p class="small muted">' + esc(L('选择上面的功能，或直接提问。数学题会优先一步步引导你思考，而不是直接给答案。', 'Pick a tool above or just ask. For math, the tutor guides you step by step instead of handing over the answer.')) + '</p>') + '</div>' +
      '<div class="chat-input"><textarea class="input grow" id="tuInput" rows="3" placeholder="' + esc(L('输入问题…（Ctrl/⌘ + Enter 发送）', 'Ask a question… (Ctrl/⌘ + Enter to send)')) + '" data-input="tuDraft">' + esc(TU.draft) + '</textarea>' +
      (TU.streaming ? '<button class="btn" data-act="tuStop">' + esc(L('停止', 'Stop')) + '</button>' : '<button class="btn primary" data-act="tuSend" id="tuSend"' + (configured ? '' : ' disabled title="' + esc(L('请先在设置中配置 AI', 'Set up AI in Settings first')) + '"') + '>' + esc(L('发送', 'Send')) + '</button>') + '</div>' +
      '<p class="xs faint mt8">' + esc(L('模型：', 'Model: ')) + esc(SL.AI.cfg().model) + esc(L(' · AI 可能出错，重要结论请对照课本核实。', ' · AI can make mistakes — check important facts against your textbook.')) + '</p></div></div>';
    return {
      title: 'AI Tutor', accent: TU.s, html: html, keepScroll: false,
      after: function (root) {
        var chat = root.querySelector('#chat'); if (chat && msgs.length) chat.lastElementChild.scrollIntoView({ block: 'nearest' });
        var ta = root.querySelector('#tuInput');
        if (ta) ta.addEventListener('keydown', function (e) { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); SL.actions.tuSend(); } });
        if (ta && TU.draft) { ta.focus(); }
      }
    };
  }
  SL.act('tuS', function (el) { TU.s = el.getAttribute('data-v'); TU.gen = null; SL.rerender(); });
  SL.act('tuMode', function (el) { TU.mode = el.value; });
  SL.act('tuDraft', function (el) { TU.draft = el.value; });
  SL.act('tuClear', function () { var c = loadChats(); delete c[TU.s]; saveChats(c); SL.rerender(); });
  SL.act('tuPreset', function (el) {
    var v = el.getAttribute('data-v');
    if (v === 'generate') { TU.gen = { unit: SL.subject(TU.s).units[0].id, tp: -1, n: 5, d: 2, items: null, err: '' }; SL.rerender(); return; }
    if (v === 'explain') {
      var weak = SL.weakTopics(1, TU.s)[0];
      TU.draft = weak ? presetPrompt('explain', { topic: weak.key }) : L('请解释这个知识点：', 'Please explain this concept: ');
    } else if (v === 'mistakes') {
      var mk = SL.mistakeList().filter(function (x) { return x.q.s === TU.s && !x.mastered; }).sort(function (a, b) { return b.count - a.count; }).slice(0, 5);
      TU.draft = mk.length ? 'These are my most-missed questions:\n\n' + mk.map(function (x, i) { return (i + 1) + ') ' + qBlock(x.q) + (x.wrongAnswers.length ? '\nI answered: ' + x.wrongAnswers[x.wrongAnswers.length - 1].a : '') + '\nTimes missed: ' + x.count; }).join('\n\n') +
        '\n\nFind the common misconceptions behind these mistakes, explain each briefly, and tell me what to practise.' : L('我还没有这门课的错题。', 'I have no mistakes in this course yet.');
    } else if (v === 'exam') TU.draft = examPrompt(TU.s);
    else if (v === 'guide') TU.draft = guidancePrompt(TU.s);
    else TU.draft = '';
    SL.rerender();
    var ta = document.getElementById('tuInput'); if (ta) ta.focus();
  });
  SL.act('tuStop', function () { if (TU.handle) TU.handle.abort(); });
  SL.act('tuSend', function () {
    var ta = document.getElementById('tuInput');
    var text = (ta ? ta.value : TU.draft).trim();
    if (!text) { SL.toast(L('请输入问题', 'Type a question first'), 'bad'); return; }
    if (SL.AI.busy || TU.streaming) return;   // prevent duplicate requests
    var chats = loadChats(), msgs = chats[TU.s] || [];
    msgs.push({ role: 'user', content: text.slice(0, 12000) });
    chats[TU.s] = msgs.slice(-30); saveChats(chats);
    TU.draft = ''; TU.streaming = true;
    SL.rerender();
    var chat = document.getElementById('chat');
    var bubble = document.createElement('div');
    bubble.className = 'msg ai md';
    bubble.innerHTML = '<span class="spinner" aria-label="loading"></span>';
    chat.appendChild(bubble); bubble.scrollIntoView({ block: 'nearest' });
    var hist = msgs.slice(-20).map(function (x) { return { role: x.role, content: x.content }; });
    var sys = SL.AI.systemPrompt(TU.s, TU.mode, 'The student is using StudyLoop, which tracks mastery per topic. Course units: ' + SL.subject(TU.s).units.map(function (u) { return u.name.en; }).join('; ') + '.');
    SL.AI.chat({
      system: sys, messages: hist,
      onHandle: function (h) { TU.handle = h; },
      onText: function (d, full) { bubble.innerHTML = SL.AI.md(full); }
    }).then(function (r) {
      var c = loadChats(), list = c[TU.s] || [];
      list.push({ role: 'assistant', content: r.text + (r.truncated ? '\n\n' + L('（回答过长被截断）', '(response was cut off)') : '') });
      c[TU.s] = list.slice(-30); saveChats(c);
    }).catch(function (err) {
      var c = loadChats(), list = c[TU.s] || [];
      // drop the unanswered user turn so the conversation stays valid (user/assistant alternate)
      if (list.length && list[list.length - 1].role === 'user') { TU.draft = list.pop().content; }
      c[TU.s] = list; saveChats(c);
      SL.toast(err.message, 'bad');
      TU.lastError = err.message;
    }).then(function () {
      TU.streaming = false; TU.handle = null;
      if (SL.parseHash().path === '/tutor') {
        SL.rerender();
        if (TU.lastError) { var ch = document.getElementById('chat'); if (ch) { var e = document.createElement('div'); e.className = 'msg err'; e.textContent = TU.lastError; ch.appendChild(e); } TU.lastError = null; }
      }
    });
  });

  function genPanel() {
    var g = TU.gen, s = SL.subject(TU.s), u = SL.unit(g.unit) || s.units[0];
    var html = '<div class="card"><div class="card-head"><h3>🧩 ' + esc(L('AI 生成练习题', 'Generate practice questions')) + '</h3><button class="link" data-act="genClose">' + esc(L('关闭', 'Close')) + '</button></div>' +
      '<div class="row"><select class="input" style="width:auto;max-width:280px" data-change="genUnit" aria-label="unit">' + s.units.map(function (x) { return '<option value="' + x.id + '"' + (x.id === g.unit ? ' selected' : '') + '>' + esc(t(x.name)) + '</option>'; }).join('') + '</select>' +
      '<select class="input" style="width:auto;max-width:260px" data-change="genTopic" aria-label="topic"><option value="-1">' + esc(L('全部知识点', 'All topics')) + '</option>' + u.topics.map(function (tp, i) { return '<option value="' + i + '"' + (g.tp === i ? ' selected' : '') + '>' + esc(t(tp)) + '</option>'; }).join('') + '</select>' +
      '<select class="input" style="width:auto" data-change="genDiff" aria-label="difficulty">' + [1, 2, 3, 4].map(function (d) { return '<option value="' + d + '"' + (g.d === d ? ' selected' : '') + '>' + esc(t(SL.DIFF[d])) + '</option>'; }).join('') + '</select>' +
      '<select class="input" style="width:auto" data-change="genN" aria-label="count">' + [3, 5, 8, 10].map(function (n) { return '<option value="' + n + '"' + (g.n === n ? ' selected' : '') + '>' + n + L(' 题', ' q') + '</option>'; }).join('') + '</select>' +
      '<button class="btn primary" data-act="genRun"' + (g.running || !SL.AI.configured() ? ' disabled' : '') + '>' + (g.running ? '<span class="spinner"></span> ' + esc(L('生成中…', 'Generating…')) : esc(L('生成', 'Generate'))) + '</button></div>' +
      '<p class="xs faint mt8">' + esc(L('生成的题目会先经过自动检查（4 个选项、答案有效、中英文完整、不与题库重复、知识点有效），再由你逐题确认后才会加入题库。', 'Generated items pass automatic checks (4 options, valid answer, both languages, no duplicates, valid topic), then you approve each one before it joins the bank.')) + '</p>';
    if (g.err) html += '<div class="msg err mt12">' + esc(g.err) + '</div>';
    if (g.items) {
      html += '<div class="stack mt12">' + g.items.map(function (it, i) {
        var q = it.q;
        return '<div class="card pad-sm" style="' + (it.ok ? '' : 'border-color:var(--bad)') + '"><div class="row" style="gap:6px;margin-bottom:6px"><span class="chip pri">' + esc(SL.topicName(q.unit, q.tp)) + '</span><span class="chip">' + esc(t(SL.DIFF[q.d])) + '</span>' +
          (it.ok ? '<span class="chip good">' + esc(L('通过自动检查', 'Checks passed')) + '</span>' : '<span class="chip bad">' + esc(it.problems.join('；')) + '</span>') + (it.added ? '<span class="chip good">' + esc(L('已加入题库', 'Added')) + '</span>' : '') + '</div>' +
          '<div class="small bold">' + esc(t(q.q)) + '</div><div class="stack mt8" style="gap:4px">' + (q.o || []).map(function (o, j) { return '<div class="small">' + (j === q.a ? '✓ ' : '　') + letter(j) + '. ' + esc(t(o)) + '</div>'; }).join('') + '</div>' +
          '<div class="xs muted mt8">' + esc(t(q.e)) + '</div>' +
          (!it.added && !it.dropped ? '<div class="row mt8">' + (it.ok ? '<button class="btn sm primary" data-act="genApprove" data-i="' + i + '">' + esc(L('确认无误，加入题库', 'Looks right — add to bank')) + '</button>' : '') + '<button class="btn sm ghost" data-act="genDrop" data-i="' + i + '">' + esc(L('丢弃', 'Discard')) + '</button></div>' : '') + '</div>';
      }).join('') + '</div>';
    }
    return html + '</div>';
  }
  SL.act('genClose', function () { TU.gen = null; SL.rerender(); });
  SL.act('genUnit', function (el) { TU.gen.unit = el.value; TU.gen.tp = -1; SL.rerender(); });
  SL.act('genTopic', function (el) { TU.gen.tp = parseInt(el.value, 10); });
  SL.act('genDiff', function (el) { TU.gen.d = parseInt(el.value, 10); });
  SL.act('genN', function (el) { TU.gen.n = parseInt(el.value, 10); });
  SL.act('genRun', function () {
    var g = TU.gen; if (!g || g.running) return;
    g.running = true; g.err = ''; g.items = null; SL.rerender();
    SL.AI.generateQuestions(g.unit, g.tp, g.n, g.d).then(function (items) { g.items = items; if (!items.length) g.err = L('没有生成题目', 'No questions returned'); })
      .catch(function (e) { g.err = e.message; })
      .then(function () { g.running = false; if (SL.parseHash().path === '/tutor') SL.rerender(); });
  });
  SL.act('genApprove', function (el) {
    var it = TU.gen.items[parseInt(el.getAttribute('data-i'), 10)]; if (!it || !it.ok || it.added) return;
    SL.store.packs.push(it.q); SL.save(); it.added = true;
    SL.toast(L('已加入题库，练习时会出现', 'Added — it will appear in practice')); SL.rerender();
  });
  SL.act('genDrop', function (el) { var it = TU.gen.items[parseInt(el.getAttribute('data-i'), 10)]; if (it) it.dropped = true; SL.rerender(); });

  /* =========================================================
   * Graph lab + formula reference
   * ========================================================= */
  var FAM = {
    linear: { zh: '一次函数', en: 'Linear', f: function (x) { return x; }, eq: 'y = a(x − h) + k', b: false },
    quad: { zh: '二次函数', en: 'Quadratic', f: function (x) { return x * x; }, eq: 'y = a(x − h)² + k', b: false },
    cubic: { zh: '三次函数', en: 'Cubic', f: function (x) { return x * x * x; }, eq: 'y = a(x − h)³ + k', b: false },
    abs: { zh: '绝对值', en: 'Absolute value', f: Math.abs, eq: 'y = a|x − h| + k', b: false },
    sqrt: { zh: '平方根', en: 'Square root', f: function (x) { return x < 0 ? NaN : Math.sqrt(x); }, eq: 'y = a√(x − h) + k', b: false },
    recip: { zh: '反比例（有理）', en: 'Reciprocal (rational)', f: function (x) { return 1 / x; }, eq: 'y = a / (x − h) + k', b: false },
    exp: { zh: '指数函数', en: 'Exponential', f: null, eq: 'y = a · bˣ⁻ʰ + k', b: true, bDef: 2 },
    log: { zh: '对数函数', en: 'Logarithmic', f: null, eq: 'y = a · log_b(x − h) + k', b: true, bDef: 2 },
    sin: { zh: '正弦函数', en: 'Sine', f: null, eq: 'y = a · sin(b(x − h)) + k', b: true, bDef: 1 },
    cos: { zh: '余弦函数', en: 'Cosine', f: null, eq: 'y = a · cos(b(x − h)) + k', b: true, bDef: 1 }
  };
  var GL = { fam: 'quad', a: 1, b: 2, h: 0, k: 0, parent: true, range: 10, tab: 'lab' };
  function famEval(fam, p, x) {
    var u = x - p.h;
    switch (fam) {
      case 'exp': return p.a * Math.pow(p.b, u) + p.k;
      case 'log': return u <= 0 || p.b <= 0 || p.b === 1 ? NaN : p.a * Math.log(u) / Math.log(p.b) + p.k;
      case 'sin': return p.a * Math.sin(p.b * u) + p.k;
      case 'cos': return p.a * Math.cos(p.b * u) + p.k;
      default: return p.a * FAM[fam].f(u) + p.k;
    }
  }
  function fmt(n) { return Math.abs(n - Math.round(n)) < 1e-9 ? String(Math.round(n)) : (Math.round(n * 100) / 100).toString(); }
  function features(fam, p) {
    var out = [];
    var A = fmt(p.a), H = fmt(p.h), K = fmt(p.k), B = fmt(p.b);
    if (fam === 'quad') { out.push([L('顶点', 'Vertex'), '(' + H + ', ' + K + ')']); out.push([L('开口', 'Opens'), p.a > 0 ? L('向上', 'up') : L('向下', 'down')]); out.push([L('对称轴', 'Axis'), 'x = ' + H]); out.push([L('值域', 'Range'), p.a > 0 ? 'y ≥ ' + K : 'y ≤ ' + K]); }
    if (fam === 'abs') { out.push([L('顶点', 'Vertex'), '(' + H + ', ' + K + ')']); out.push([L('值域', 'Range'), p.a > 0 ? 'y ≥ ' + K : 'y ≤ ' + K]); }
    if (fam === 'linear') { out.push([L('斜率', 'Slope'), A]); out.push([L('y 截距', 'y-intercept'), fmt(-p.a * p.h + p.k)]); }
    if (fam === 'cubic') { out.push([L('拐点', 'Inflection point'), '(' + H + ', ' + K + ')']); out.push([L('端行为', 'End behaviour'), p.a > 0 ? 'x→∞: y→∞; x→−∞: y→−∞' : 'x→∞: y→−∞; x→−∞: y→∞']); }
    if (fam === 'sqrt') { out.push([L('起点', 'Start point'), '(' + H + ', ' + K + ')']); out.push([L('定义域', 'Domain'), 'x ≥ ' + H]); }
    if (fam === 'recip') { out.push([L('竖直渐近线', 'Vertical asymptote'), 'x = ' + H]); out.push([L('水平渐近线', 'Horizontal asymptote'), 'y = ' + K]); out.push([L('定义域', 'Domain'), 'x ≠ ' + H]); }
    if (fam === 'exp') { out.push([L('水平渐近线', 'Horizontal asymptote'), 'y = ' + K]); out.push([L('类型', 'Type'), (p.b > 1) === (p.a > 0) ? L('增长', 'growth') : L('衰减', 'decay')]); out.push([L('值域', 'Range'), p.a > 0 ? 'y > ' + K : 'y < ' + K]); }
    if (fam === 'log') { out.push([L('竖直渐近线', 'Vertical asymptote'), 'x = ' + H]); out.push([L('定义域', 'Domain'), 'x > ' + H]); out.push([L('过点', 'Passes through'), '(' + fmt(p.h + 1) + ', ' + K + ')']); }
    if (fam === 'sin' || fam === 'cos') { out.push([L('振幅', 'Amplitude'), fmt(Math.abs(p.a))]); out.push([L('周期', 'Period'), p.b ? fmt(2 * Math.PI / Math.abs(p.b)) + ' (= 2π/' + B + ')' : '—']); out.push([L('中线', 'Midline'), 'y = ' + K]); out.push([L('相移', 'Phase shift'), H]); }
    return out;
  }
  function plotSvg() {
    var W = 640, H = 440, R = GL.range, sx = W / (2 * R), sy = H / (2 * R * H / W);
    var yR = R * H / W;
    function X(x) { return (x + R) * sx; }
    function Y(y) { return H - (y + yR) * sy; }
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" id="glSvg" role="img" aria-label="' + esc(L('函数图像', 'Function graph')) + '">';
    for (var gx = -R; gx <= R; gx++) s += '<line class="gl-grid" x1="' + X(gx) + '" x2="' + X(gx) + '" y1="0" y2="' + H + '"/>';
    for (var gy = Math.ceil(-yR); gy <= yR; gy++) s += '<line class="gl-grid" x1="0" x2="' + W + '" y1="' + Y(gy) + '" y2="' + Y(gy) + '"/>';
    s += '<line class="gl-axis" x1="0" x2="' + W + '" y1="' + Y(0) + '" y2="' + Y(0) + '"/><line class="gl-axis" x1="' + X(0) + '" x2="' + X(0) + '" y1="0" y2="' + H + '"/>';
    for (var lx = -R; lx <= R; lx += 2) if (lx) s += '<text x="' + (X(lx) - 3) + '" y="' + (Y(0) + 13) + '">' + lx + '</text>';
    for (var ly = Math.ceil(-yR / 2) * 2; ly <= yR; ly += 2) if (ly) s += '<text x="' + (X(0) + 4) + '" y="' + (Y(ly) + 3) + '">' + ly + '</text>';
    function path(p) {
      var d = '', pen = false, prev = null, N = 900;
      for (var i = 0; i <= N; i++) {
        var x = -R + 2 * R * i / N, y = famEval(GL.fam, p, x);
        var bad = !isFinite(y) || Math.abs(y) > yR * 6;
        if (!bad && prev != null && Math.abs(y - prev) > yR * 1.5) bad = true; // jump across an asymptote
        if (bad) { pen = false; prev = isFinite(y) ? y : null; continue; }
        d += (pen ? 'L' : 'M') + X(x).toFixed(1) + ',' + Y(SL.clamp(y, -yR * 3, yR * 3)).toFixed(1); pen = true; prev = y;
      }
      return d;
    }
    if (GL.parent) s += '<path class="gl-base" d="' + path({ a: 1, b: FAM[GL.fam].bDef || 1, h: 0, k: 0 }) + '"/>';
    if (GL.fam === 'recip' || GL.fam === 'log') s += '<line class="gl-asym" x1="' + X(GL.h) + '" x2="' + X(GL.h) + '" y1="0" y2="' + H + '"/>';
    if (GL.fam === 'recip' || GL.fam === 'exp') s += '<line class="gl-asym" x1="0" x2="' + W + '" y1="' + Y(GL.k) + '" y2="' + Y(GL.k) + '"/>';
    s += '<path class="gl-curve" d="' + path(GL) + '"/>';
    s += '<circle id="glDot" r="5" fill="var(--precalc)" stroke="var(--surface)" stroke-width="2" cx="-20" cy="-20"/><text id="glDotT" x="-50" y="-50" style="fill:var(--text);font-size:12px;font-weight:700"></text>';
    return s + '</svg>';
  }
  function eqText() {
    var p = GL, f = GL.fam;
    function sh(v) { return v === 0 ? 'x' : v > 0 ? '(x − ' + fmt(v) + ')' : '(x + ' + fmt(-v) + ')'; }
    var a = fmt(p.a), k = p.k === 0 ? '' : (p.k > 0 ? ' + ' + fmt(p.k) : ' − ' + fmt(-p.k)), u = sh(p.h);
    var A = a === '1' ? '' : a === '-1' ? '−' : a;
    var body = { linear: A + u, quad: A + u + '²', cubic: A + u + '³', abs: A + '|' + u.replace(/^\(|\)$/g, '') + '|', sqrt: A + '√' + u, recip: a + ' / ' + u,
      exp: A + (A ? ' · ' : '') + fmt(p.b) + '^' + (p.h === 0 ? 'x' : u), log: A + (A ? ' · ' : '') + 'log_' + fmt(p.b) + u, sin: A + 'sin(' + fmt(p.b) + u + ')', cos: A + 'cos(' + fmt(p.b) + u + ')' }[f];
    return 'y = ' + body + k;
  }
  function slider(name, label, min, max, step) {
    return '<div class="field"><label for="gl-' + name + '">' + esc(label) + '</label><div class="range-row"><input id="gl-' + name + '" type="range" min="' + min + '" max="' + max + '" step="' + step + '" value="' + GL[name] + '" data-input="glParam" data-p="' + name + '"><output id="glo-' + name + '">' + fmt(GL[name]) + '</output></div></div>';
  }
  function renderGraph(m, q) {
    if (q.tab) { GL.tab = q.tab; history.replaceState(null, '', '#/graph'); }
    var tabs = '<div class="tabs"><button class="' + (GL.tab === 'lab' ? 'on' : '') + '" data-act="glTab" data-v="lab">' + esc(L('函数图像实验室', 'Graph lab')) + '</button><button class="' + (GL.tab === 'formulas' ? 'on' : '') + '" data-act="glTab" data-v="formulas">' + esc(L('公式速查', 'Formula reference')) + '</button></div>';
    if (GL.tab === 'formulas') return { title: L('公式速查', 'Formula reference'), accent: 'precalc', html: tabs + formulasHtml() };
    var fam = FAM[GL.fam];
    var html = tabs + '<div class="grid" style="grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);gap:16px" id="glGrid">' +
      '<div class="stack"><div class="graph-box" id="glBox">' + plotSvg() + '</div>' +
      '<div class="formula" id="glEq">' + esc(eqText()) + '</div><p class="xs faint">' + esc(L('虚线 = 母函数；红色虚线 = 渐近线。手指/鼠标在图上移动可查看坐标。', 'Dashed = parent function; red dashed = asymptotes. Move your finger/mouse over the graph to read coordinates.')) + '</p></div>' +
      '<div class="card stack"><div class="field"><label for="glFam">' + esc(L('函数类型', 'Function family')) + '</label><select id="glFam" class="input" data-change="glFam">' +
      Object.keys(FAM).map(function (k) { return '<option value="' + k + '"' + (k === GL.fam ? ' selected' : '') + '>' + esc(L(FAM[k].zh, FAM[k].en)) + '</option>'; }).join('') + '</select><span class="hint">' + esc(fam.eq) + '</span></div>' +
      slider('a', L('a：竖直伸缩 / 翻折', 'a: vertical stretch / reflection'), -5, 5, 0.1) +
      (fam.b ? slider('b', GL.fam === 'sin' || GL.fam === 'cos' ? L('b：水平压缩（周期 = 2π/b）', 'b: horizontal compression (period 2π/b)') : L('b：底数', 'b: base'), GL.fam === 'sin' || GL.fam === 'cos' ? 0.1 : 0.2, 5, 0.1) : '') +
      slider('h', L('h：水平平移', 'h: horizontal shift'), -8, 8, 0.5) + slider('k', L('k：竖直平移', 'k: vertical shift'), -8, 8, 0.5) +
      '<label class="switch"><input type="checkbox" data-change="glParent"' + (GL.parent ? ' checked' : '') + '>' + esc(L('显示母函数', 'Show parent function')) + '</label>' +
      '<div class="row"><button class="btn sm" data-act="glReset">' + esc(L('重置参数', 'Reset')) + '</button><a class="btn sm ghost" href="#/practice?s=precalc&unit=pc1">' + esc(L('练习函数变换', 'Practise transformations')) + '</a></div>' +
      '<div class="divider" style="margin:4px 0"></div><div id="glFeat">' + featHtml() + '</div></div></div>' +
      '<style>@media (max-width: 900px){#glGrid{grid-template-columns:minmax(0,1fr)!important}}</style>';
    return {
      title: L('函数图像实验室', 'Graph lab'), accent: 'precalc', html: html, keepScroll: true,
      after: function (root) { bindHover(root); }
    };
  }
  function featHtml() { return '<table class="tbl"><tbody>' + features(GL.fam, GL).map(function (r) { return '<tr><th style="width:44%">' + esc(r[0]) + '</th><td>' + esc(r[1]) + '</td></tr>'; }).join('') + '</tbody></table>'; }
  function bindHover(root) {
    var svg = root.querySelector('#glSvg'); if (!svg) return;
    svg.addEventListener('pointermove', function (e) {
      var r = svg.getBoundingClientRect(), W = 640, H = 440, R = GL.range, yR = R * H / W;
      var x = ((e.clientX - r.left) / r.width) * 2 * R - R, y = famEval(GL.fam, GL, x);
      var dot = svg.querySelector('#glDot'), tx = svg.querySelector('#glDotT');
      if (!isFinite(y) || Math.abs(y) > yR) { dot.setAttribute('cx', -20); tx.textContent = ''; return; }
      var px = (x + R) * (W / (2 * R)), py = H - (y + yR) * (H / (2 * yR));
      dot.setAttribute('cx', px); dot.setAttribute('cy', py);
      tx.setAttribute('x', Math.min(W - 110, px + 8)); tx.setAttribute('y', Math.max(14, py - 8));
      tx.textContent = '(' + fmt(x) + ', ' + fmt(y) + ')';
    });
  }
  function redrawGraph() {
    var box = document.getElementById('glBox'); if (!box) return;
    box.innerHTML = plotSvg(); bindHover(box);
    document.getElementById('glEq').textContent = eqText();
    document.getElementById('glFeat').innerHTML = featHtml();
  }
  SL.act('glTab', function (el) { GL.tab = el.getAttribute('data-v'); SL.render(); });
  SL.act('glFam', function (el) { GL.fam = el.value; GL.b = FAM[GL.fam].bDef || 2; SL.rerender(); });
  SL.act('glParam', function (el) { var p = el.getAttribute('data-p'); GL[p] = parseFloat(el.value); var o = document.getElementById('glo-' + p); if (o) o.textContent = fmt(GL[p]); redrawGraph(); });
  SL.act('glParent', function (el) { GL.parent = el.checked; redrawGraph(); });
  SL.act('glReset', function () { GL.a = 1; GL.b = FAM[GL.fam].bDef || 2; GL.h = 0; GL.k = 0; SL.rerender(); });

  var FORMULAS = [
    ['pc1', [['Average rate of change', '[f(b) − f(a)] / (b − a)'], ['Difference quotient', '[f(x + h) − f(x)] / h'], ['Vertex of ax² + bx + c', 'x = −b / (2a)'], ['Transformations', 'y = a·f(b(x − h)) + k'], ['Even / odd', 'even: f(−x) = f(x); odd: f(−x) = −f(x)']]],
    ['pc2', [['Factor Theorem', 'f(c) = 0 ⇔ (x − c) is a factor'], ['Horizontal asymptote', 'deg N < deg D: y = 0; equal: y = ratio of leading coefficients; N > D: none (N = D + 1 → slant)'], ['Vertical asymptote vs hole', 'zero of denominator only → VA; cancels with numerator → hole'], ['Quadratic formula', 'x = [−b ± √(b² − 4ac)] / (2a)']]],
    ['pc3', [['Log definition', 'log_b(x) = y ⇔ bʸ = x'], ['Log rules', 'log(MN) = log M + log N; log(M/N) = log M − log N; log(Mᵖ) = p·log M'], ['Change of base', 'log_b(x) = ln x / ln b'], ['Compound interest', 'A = P(1 + r/n)ⁿᵗ ; continuous: A = Pe^(rt)'], ['Half-life', 'A = A₀ (1/2)^(t / T)']]],
    ['pc4', [['Radians ↔ degrees', 'rad = deg · π/180'], ['Arc length', 's = rθ (θ in radians)'], ['Sinusoid', 'y = a·sin(b(x − h)) + k: amplitude |a|, period 2π/|b|, midline y = k'], ['Unit circle', '(cos θ, sin θ); tan θ = sin θ / cos θ'], ['ASTC', 'Q1 all +, Q2 sin +, Q3 tan +, Q4 cos +']]],
    ['pc5', [['Pythagorean', 'sin²θ + cos²θ = 1; 1 + tan²θ = sec²θ'], ['Double angle', 'sin 2θ = 2 sin θ cos θ; cos 2θ = cos²θ − sin²θ'], ['Sum / difference', 'sin(A ± B) = sin A cos B ± cos A sin B'], ['Law of Sines', 'a / sin A = b / sin B = c / sin C'], ['Law of Cosines', 'c² = a² + b² − 2ab·cos C']]],
    ['pc6', [['Magnitude', '|⟨a, b⟩| = √(a² + b²)'], ['Dot product', 'u·v = u₁v₁ + u₂v₂ = |u||v| cos θ'], ['Polar ↔ rectangular', 'x = r cos θ, y = r sin θ; r² = x² + y²'], ['De Moivre', '[r(cos θ + i sin θ)]ⁿ = rⁿ(cos nθ + i sin nθ)']]],
    ['pc7', [['2×2 determinant', 'det[[a, b], [c, d]] = ad − bc'], ['2×2 inverse', '(1/(ad − bc)) · [[d, −b], [−c, a]]'], ['Cramer\'s rule', 'x = Dₓ / D, y = Dᵧ / D'], ['Matrix product size', '(m×n)(n×p) → m×p']]],
    ['pc8', [['Arithmetic', 'aₙ = a₁ + (n − 1)d; Sₙ = n(a₁ + aₙ)/2'], ['Geometric', 'aₙ = a₁ rⁿ⁻¹; Sₙ = a₁(1 − rⁿ)/(1 − r)'], ['Infinite geometric', 'S = a₁ / (1 − r), only if |r| < 1']]],
    ['pc9', [['Circle', '(x − h)² + (y − k)² = r²'], ['Parabola', '(x − h)² = 4p(y − k); focus p units from vertex'], ['Ellipse', 'x²/a² + y²/b² = 1; c² = a² − b²; e = c/a'], ['Hyperbola', 'x²/a² − y²/b² = 1; c² = a² + b²; asymptotes y = ±(b/a)x'], ['Classify Ax² + Bxy + Cy²…', 'B² − 4AC < 0 ellipse, = 0 parabola, > 0 hyperbola']]]
  ];
  function formulasHtml() {
    return '<div class="grid g3">' + FORMULAS.map(function (u) {
      var unit = SL.unit(u[0]);
      return '<div class="card formula-card" data-accent="precalc"><h4>' + esc(t(unit.name)) + '</h4>' + u[1].map(function (f) { return '<div class="xs bold mt8">' + esc(f[0]) + '</div><div class="formula">' + esc(f[1]) + '</div>'; }).join('') +
        '<a class="btn sm mt12" href="#/practice?s=precalc&unit=' + u[0] + '">' + esc(L('练习本单元', 'Practise unit')) + '</a></div>';
    }).join('') + '</div>';
  }

  /* =========================================================
   * Settings
   * ========================================================= */
  function renderSettings() {
    var st = SL.store, ai = SL.AI.cfg();
    var qr = SL.qualityReport();
    var kinds = {}; qr.issues.forEach(function (i) { kinds[i.kind] = (kinds[i.kind] || 0) + 1; });
    var kindName = { dup: L('重复题目', 'Duplicates'), answer: L('答案/选项问题', 'Answer / options'), explain: L('解析问题', 'Explanation'), topic: L('知识点分类', 'Topic tagging'), diff: L('难度设置', 'Difficulty'), lang: L('中英文缺失', 'Missing language') };
    var packs = SL.packQuestions();
    var html = '<div class="grid g2" style="align-items:start"><div class="stack">' +
      '<div class="card"><div class="card-head"><h3>' + esc(L('外观与语言', 'Appearance & language')) + '</h3></div><div class="stack">' +
      '<div class="field"><span class="lbl">' + esc(L('界面语言', 'Language')) + '</span><div class="seg"><button class="' + (SL.lang === 'zh' ? 'on' : '') + '" data-act="setLang" data-v="zh">中文</button><button class="' + (SL.lang === 'en' ? 'on' : '') + '" data-act="setLang" data-v="en">English</button></div></div>' +
      '<div class="field"><span class="lbl">' + esc(L('主题', 'Theme')) + '</span><div class="seg">' + [['system', L('跟随系统', 'System')], ['light', L('浅色', 'Light')], ['dark', L('深色', 'Dark')]].map(function (x) { return '<button class="' + ((st.settings.theme || 'system') === x[0] ? 'on' : '') + '" data-act="setTheme" data-v="' + x[0] + '">' + esc(x[1]) + '</button>'; }).join('') + '</div></div></div></div>' +

      '<div class="card"><div class="card-head"><h3>' + I.bot + ' ' + esc(L('AI Tutor 连接', 'AI Tutor connection')) + '</h3><span class="chip ' + (SL.AI.configured() ? 'good' : '') + '">' + esc(SL.AI.configured() ? L('已配置', 'Configured') : L('未配置', 'Not set up')) + '</span></div><div class="stack">' +
      '<div class="notice info small">' + esc(L('本站是 GitHub Pages 上的静态网站，没有后端服务器，所以 AI 有两种接法：① 填写你自己的 Anthropic API Key——只保存在这台设备的浏览器里（不会写进代码、不会随数据导出），请求直接发往 api.anthropic.com，适合个人使用；② 填写代理地址——Key 保存在你部署的代理服务器上，浏览器完全接触不到 Key，适合分享给别人用（模板见仓库 proxy/worker.js）。',
        'This is a static GitHub Pages site with no backend, so AI connects one of two ways: (1) your own Anthropic API key — stored only in this browser (never in the code, never in exports) and sent straight to api.anthropic.com; fine for personal use. (2) A proxy URL — the key lives on a proxy you deploy and the browser never sees it; use this if you share the site (template: proxy/worker.js in the repo).')) + '</div>' +
      '<div class="field"><label for="aiKey">' + esc(L('Anthropic API Key（方式 ①）', 'Anthropic API key (option 1)')) + '</label><input class="input" id="aiKey" type="password" autocomplete="off" spellcheck="false" placeholder="sk-ant-…" value="' + esc(ai.key) + '"><span class="hint">' + esc(L('在 console.anthropic.com 创建。费用按你的账户计费。', 'Create one at console.anthropic.com. Usage is billed to your account.')) + '</span></div>' +
      '<div class="field"><label for="aiProxy">' + esc(L('代理地址（方式 ②，填写后优先使用）', 'Proxy URL (option 2, takes priority)')) + '</label><input class="input" id="aiProxy" type="url" placeholder="https://your-proxy.workers.dev" value="' + esc(ai.proxy) + '"></div>' +
      '<div class="field"><label for="aiModel">' + esc(L('模型', 'Model')) + '</label><select class="input" id="aiModel">' + SL.AI.MODELS.map(function (m) { return '<option value="' + m.id + '"' + (m.id === ai.model ? ' selected' : '') + '>' + esc(L(m.zh, m.en)) + '</option>'; }).join('') + '</select>' +
      '<span class="hint">' + esc(L('Opus / Sonnet 已开启服务端拒答回退（fallbacks: "default"）：极少数被安全策略拒绝的请求会自动交给备用模型回答。', 'Opus / Sonnet requests enable server-side refusal fallback (fallbacks: "default"): the rare request declined by a safety classifier is retried on a fallback model.')) + '</span></div>' +
      '<div class="row"><button class="btn primary" data-act="aiSave">' + esc(L('保存', 'Save')) + '</button><button class="btn" data-act="aiTest" id="aiTestBtn">' + esc(L('测试连接', 'Test connection')) + '</button><button class="btn ghost danger" data-act="aiClear">' + esc(L('清除 Key', 'Remove key')) + '</button></div>' +
      '<div id="aiTestOut" class="small"></div></div></div></div>' +

      '<div class="stack"><div class="card"><div class="card-head"><h3>' + esc(L('学习数据', 'Learning data')) + '</h3></div>' +
      '<p class="small muted">' + esc(L('所有学习记录都只保存在这台设备的浏览器里（' + st.attempts.length + ' 条答题记录）。换设备或清理浏览器前请先备份。', 'All learning data lives only in this browser (' + st.attempts.length + ' answer records). Back up before switching devices or clearing the browser.')) + '</p>' +
      '<p class="small muted mt8">' + esc(L('从旧网址（studyloop.pplx.app）迁移：在旧网址的错题本/笔记页点「导出 JSON」，再在这里点「导入备份」选择那个文件即可合并进来。', 'Moving from the old site (studyloop.pplx.app): use "Export JSON" on its wrongbook / notes pages, then choose that file with "Import backup" here to merge it in.')) + '</p>' +
      '<div class="row mt12"><button class="btn" data-act="backupExport">' + esc(L('导出备份', 'Export backup')) + '</button><label class="btn" for="backupFile" style="cursor:pointer">' + esc(L('导入备份', 'Import backup')) + '</label><input type="file" id="backupFile" accept="application/json,.json" class="sr-only" data-change="backupImport">' +
      '<button class="btn ghost danger" data-act="resetAll">' + esc(L('清空所有数据', 'Erase all data')) + '</button></div></div>' +

      '<div class="card"><div class="card-head"><h3>' + esc(L('题目包导入', 'Question packs')) + '</h3><span class="chip">' + packs.length + esc(L(' 道导入题', ' imported')) + '</span></div>' +
      '<p class="small muted">' + esc(L('粘贴题目包 JSON（兼容旧版格式：{"questions":[{"unit":"pc1","q":{en,zh},"o":[…],"a":0,"e":{en,zh}}]}）。', 'Paste a question-pack JSON (old format works: {"questions":[{"unit":"pc1","q":{en,zh},"o":[…],"a":0,"e":{en,zh}}]}).')) + '</p>' +
      '<textarea class="input mt8" id="packInput" rows="4" data-testid="pack-input"></textarea><div class="row mt8"><button class="btn primary" data-act="packImport" data-testid="button-import">' + esc(L('导入', 'Import')) + '</button>' +
      (packs.length ? '<button class="btn ghost danger" data-act="packClear">' + esc(L('删除全部导入题', 'Remove imported items')) + '</button>' : '') + '</div></div>' +

      '<div class="card"><div class="card-head"><h3>' + esc(L('题库质量检查', 'Question bank check')) + '</h3><span class="chip ' + (qr.issues.length ? 'warn' : 'good') + '">' + qr.total + esc(L(' 道题 · ', ' items · ')) + qr.issues.length + esc(L(' 条提示', ' flags')) + '</span></div>' +
      '<p class="small muted">' + esc(L('自动检测：重复题、缺少/无效正确答案、重复选项、缺少解析、解析与答案不一致（启发式）、无法归类的知识点、不合理的难度、缺少中英文。（生成器出的题每次参数不同，不在此列。）', 'Automatic checks: duplicates, missing/invalid answers, duplicate options, missing explanations, answer not stated in explanation (heuristic), unplaceable topics, odd difficulty, missing language. (Generator items vary each time and are not listed.)')) + '</p>' +
      '<div class="pill-wrap mt8">' + Object.keys(kindName).map(function (k) { return '<span class="chip ' + (kinds[k] ? 'warn' : 'good') + '">' + esc(kindName[k]) + ' ' + (kinds[k] || 0) + '</span>'; }).join('') + '</div>' +
      (qr.issues.length ? '<details class="mt12"><summary class="small bold" style="cursor:pointer">' + esc(L('查看明细', 'Show details')) + '</summary><div class="scroll-x mt8"><table class="tbl"><thead><tr><th>' + esc(L('类型', 'Type')) + '</th><th>' + esc(L('题目', 'Item')) + '</th><th>' + esc(L('说明', 'Note')) + '</th></tr></thead><tbody>' +
        qr.issues.map(function (i) { return '<tr><td>' + esc(kindName[i.kind] || i.kind) + '</td><td>' + esc(i.where) + '</td><td>' + esc(i.msg) + '</td></tr>'; }).join('') + '</tbody></table></div></details>' : '') + '</div>' +
      '</div></div>';
    return { title: L('设置', 'Settings'), html: html, keepScroll: true };
  }
  SL.act('setLang', function (el) { SL.setLang(el.getAttribute('data-v')); SL.rerender(); });
  SL.act('setTheme', function (el) { SL.store.settings.theme = el.getAttribute('data-v'); SL.applyTheme(); SL.save(); SL.rerender(); });
  function readAiForm() { return { key: (document.getElementById('aiKey').value || '').trim(), proxy: (document.getElementById('aiProxy').value || '').trim(), model: document.getElementById('aiModel').value }; }
  SL.act('aiSave', function () {
    var c = readAiForm();
    if (c.proxy && !/^https:\/\//i.test(c.proxy)) { SL.toast(L('代理地址必须以 https:// 开头', 'Proxy URL must start with https://'), 'bad'); return; }
    if (c.key && !/^sk-ant-/.test(c.key)) { SL.toast(L('这看起来不像 Anthropic API Key（应以 sk-ant- 开头）', 'That does not look like an Anthropic key (starts with sk-ant-)'), 'bad'); return; }
    SL.AI.saveCfg(c); SL.toast(L('AI 设置已保存', 'AI settings saved')); SL.rerender();
  });
  SL.act('aiClear', function () { SL.AI.clearCfg(); SL.toast(L('已清除', 'Removed')); SL.rerender(); });
  SL.act('aiTest', function (el) {
    var c = readAiForm(); SL.AI.saveCfg(c);
    var out = document.getElementById('aiTestOut');
    el.disabled = true; out.innerHTML = '<span class="spinner"></span> ' + esc(L('正在连接…', 'Connecting…'));
    SL.AI.chat({ system: 'Reply with exactly: OK', messages: [{ role: 'user', content: 'ping' }], maxTokens: 300, effort: 'low' })
      .then(function (r) { out.innerHTML = '<span style="color:var(--good)">✓ ' + esc(L('连接成功（', 'Connected (')) + esc(r.model || c.model) + ')</span>'; })
      .catch(function (e) { out.innerHTML = '<span style="color:var(--bad)">✗ ' + esc(e.message) + '</span>'; })
      .then(function () { el.disabled = false; });
  });
  SL.act('backupExport', function () { SL.download('studyloop-backup-' + SL.dayKey() + '.json', SL.exportAll()); SL.toast(L('备份已导出', 'Backup exported')); });
  SL.act('backupImport', function (el) {
    var f = el.files && el.files[0]; if (!f) return;
    var rd = new FileReader();
    rd.onload = function () {
      var data;
      try { data = JSON.parse(rd.result); } catch (e) { SL.toast(L('文件不是有效的 JSON', 'Not a valid JSON file'), 'bad'); return; }
      el.value = '';
      // old StudyLoop exports (studyloop.pplx.app): wrongbook / notes files are merged, not replaced
      if (data && data.type === 'wrongbook' && Array.isArray(data.items)) {
        var n = SL.importLegacyWrong(data.items); SL.save(true);
        SL.toast(L('已从旧版错题本导入 ' + n + ' 道错题', 'Imported ' + n + ' mistakes from the old wrongbook')); SL.rerender(); return;
      }
      if (data && data.type === 'notes' && typeof data.notes === 'string' && SL.subject(data.subject)) {
        var cur = SL.store.notes[data.subject] || '';
        SL.store.notes[data.subject] = cur ? cur + '\n\n' + data.notes : data.notes; SL.save(true);
        SL.toast(L('已导入旧版笔记', 'Imported old notes')); SL.rerender(); return;
      }
      SL.confirm(L('导入备份会覆盖当前所有学习数据，继续？', 'Importing replaces all current data. Continue?'), function () { try { SL.importAll(data); SL.toast(L('备份已导入', 'Backup imported')); SL.render(); } catch (e) { SL.toast(L('无法识别的文件：', 'Unrecognised file: ') + e.message, 'bad'); } });
    };
    rd.readAsText(f);
  });
  SL.act('resetAll', function () { SL.confirm(L('确定清空所有学习数据？此操作无法撤销（建议先导出备份）。', 'Erase all learning data? This cannot be undone (export a backup first).'), function () { SL.resetAll(); SL.toast(L('已清空', 'Erased')); SL.go('#/'); }, L('清空', 'Erase')); });
  SL.act('packImport', function () {
    var ta = document.getElementById('packInput');
    try {
      var pack = JSON.parse(ta.value);
      var arr = Array.isArray(pack) ? pack : (pack.questions || pack.items || []);
      if (!arr.length) throw new Error(L('没有找到题目', 'no questions found'));
      var ok = 0, bad = 0;
      arr.forEach(function (q) {
        var unit = q.unit || q.u;
        if (!q || !q.q || !SL.unit(unit)) { bad++; return; }
        if ((q.t !== 'frq' && q.t !== 'draw') && (!Array.isArray(q.o) || q.o.length < 2 || !(q.a >= 0 && q.a < q.o.length))) { bad++; return; }
        SL.store.packs.push({ t: q.t || 'concept', unit: unit, q: q.q, o: q.o, a: q.a || 0, e: q.e, svg: q.svg, points: q.points, rubric: q.rubric, refSvg: q.refSvg, d: q.d || q.difficulty, src: 'pack', createdAt: Date.now() });
        ok++;
      });
      SL.save();
      SL.toast(L('导入 ' + ok + ' 道' + (bad ? '，跳过 ' + bad + ' 道格式不正确的题' : ''), 'Imported ' + ok + (bad ? ', skipped ' + bad + ' invalid' : '')), bad && !ok ? 'bad' : 'ok');
      SL.rerender();
    } catch (err) { SL.toast('JSON: ' + err.message, 'bad'); }
  });
  SL.act('packClear', function () { SL.confirm(L('删除所有导入/AI 生成的题目？', 'Remove all imported / AI items?'), function () { SL.store.packs = []; SL.save(); SL.rerender(); }); });

  SL.route(/^\/tutor$/, renderTutor);
  SL.route(/^\/graph$/, renderGraph);
  SL.route(/^\/settings$/, renderSettings);
})();
