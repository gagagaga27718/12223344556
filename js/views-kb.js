/* StudyLoop — Knowledge base: every subject › unit › topic with key points, personal notes, and recall review */
(function () {
  'use strict';
  var SL = window.SL;
  var esc = SL.esc, L = SL.L, t = SL.t, I = SL.ICON, ui = SL.ui;
  var DAY = SL.DAY;

  function kb() {
    var st = SL.store;
    if (!st.kb || typeof st.kb !== 'object') st.kb = {};
    if (!st.kb.notes) st.kb.notes = {};
    if (!st.kb.srs) st.kb.srs = {};
    return st.kb;
  }
  function points(unitId, tp) {
    var u = (window.KB || {})[unitId];
    var row = u && u[tp];
    if (!row) return [];
    return String(SL.lang === 'zh' ? row[1] : row[0]).split('\n').filter(Boolean);
  }
  function shortUnit(u) { return t(u.name).replace(/^(Unit \d+ · |第.{1,3}单元 ?· ?)/, ''); }
  function allTopics(sid) {
    var out = [];
    SL.SUBJECTS.forEach(function (s) {
      if (sid && s.id !== sid) return;
      s.units.forEach(function (u, ui2) { u.topics.forEach(function (tp, i) { out.push({ s: s, u: u, ui: ui2, i: i, key: SL.topicKey(u.id, i), name: t(tp) }); }); });
    });
    return out;
  }
  SL.kbDue = function (sid) {
    var srs = kb().srs, end = SL.startOfDay() + DAY;
    return allTopics(sid).filter(function (x) { var r = srs[x.key]; return r && r.due < end; });
  };
  function statusChip(key) {
    var r = kb().srs[key];
    if (!r) return '<span class="chip">' + esc(L('未复习', 'Not reviewed')) + '</span>';
    var days = Math.round((r.due - SL.startOfDay()) / DAY);
    if (days <= 0) return '<span class="chip bad">' + esc(L('今天该复习', 'Due today')) + '</span>';
    return '<span class="chip good">' + esc(L(days + ' 天后复习', 'Review in ' + days + 'd')) + '</span>';
  }
  function grade(key, g) {
    // g: 0 forgot, 1 fuzzy, 2 remembered
    var srs = kb().srs, now = Date.now();
    var r = srs[key] || (srs[key] = { reps: 0, interval: 0, ease: 2.3 });
    r.reps++; r.last = now; r.lastGrade = g;
    if (g === 0) { r.interval = 1; r.ease = Math.max(1.3, r.ease - 0.2); r.lapses = (r.lapses || 0) + 1; }
    else if (g === 1) { r.interval = Math.max(1, Math.round((r.interval || 1) * 1.2)); r.ease = Math.max(1.3, r.ease - 0.05); }
    else { r.interval = r.interval ? Math.min(120, Math.round(r.interval * r.ease)) : 2; r.ease = Math.min(2.8, r.ease + 0.05); }
    r.due = SL.startOfDay(now) + r.interval * DAY;
    if (g === 2 && SL.petEarn) SL.petEarn(1, 'recall');
    SL.save();
    return r;
  }

  /* ---------- browse ---------- */
  var KS = { s: null, q: '', open: {} };
  function renderKB(m, query) {
    if (query.s && SL.subject(query.s)) KS.s = query.s;
    if (query.u && SL.unit(query.u)) { KS.s = SL.subjectOfUnit(query.u).id; KS.open[query.u] = true; }
    if (query.s || query.u) history.replaceState(null, '', '#/kb');
    if (!KS.s) KS.s = SL.store.settings.lastSubject || 'geo';
    var s = SL.subject(KS.s), K = kb();
    var topics = allTopics(KS.s);
    var reviewed = topics.filter(function (x) { return K.srs[x.key]; }).length;
    var noted = topics.filter(function (x) { return (K.notes[x.key] || '').trim(); }).length;
    var due = SL.kbDue(KS.s).length;
    var q = KS.q.trim().toLowerCase();
    var html = '<div class="row between"><div class="seg">' + SL.SUBJECTS.map(function (x) { return '<button class="' + (x.id === KS.s ? 'on' : '') + '" data-act="kbS" data-v="' + x.id + '">' + esc(t(x.name)) + '</button>'; }).join('') + '</div>' +
      '<input class="input" type="search" id="kbSearch" placeholder="' + esc(L('搜索知识点、要点或笔记…', 'Search topics, key points or notes…')) + '" value="' + esc(KS.q) + '" data-input="kbSearch" style="max-width:320px"></div>' +
      '<div class="grid g4 mt16">' +
      '<div class="card stat"><span class="label">' + esc(L('知识点', 'Topics')) + '</span><span class="value">' + topics.length + '</span><span class="sub">' + s.units.length + esc(L(' 个单元', ' units')) + '</span></div>' +
      '<div class="card stat"><span class="label">' + esc(L('已复习过', 'Reviewed')) + '</span><span class="value">' + reviewed + '</span><span class="sub">' + Math.round(reviewed / topics.length * 100) + '%</span></div>' +
      '<div class="card stat"><span class="label">' + esc(L('今天到期', 'Due today')) + '</span><span class="value" style="color:' + (due ? 'var(--bad)' : 'inherit') + '">' + due + '</span></div>' +
      '<div class="card stat"><span class="label">' + esc(L('写了笔记', 'With notes')) + '</span><span class="value">' + noted + '</span></div></div>' +
      '<div class="row mt16"><a class="btn primary" href="#/kb/review?s=' + KS.s + '&mode=due"' + (due ? '' : ' aria-disabled="true" style="pointer-events:none;opacity:.5"') + '>' + esc(L('复习到期知识点', 'Review due topics')) + ' (' + due + ')</a>' +
      '<a class="btn" href="#/kb/review?s=' + KS.s + '&mode=new">' + esc(L('学习新知识点', 'Learn new topics')) + ' (' + (topics.length - reviewed) + ')</a>' +
      '<a class="btn ghost" href="#/kb/review?s=' + KS.s + '&mode=random">' + esc(L('随机抽查', 'Random check')) + '</a>' +
      '<button class="btn ghost" data-act="kbExpand">' + esc(L('全部展开/收起', 'Expand / collapse all')) + '</button></div>' +
      '<p class="xs faint mt8">' + esc(L('复习方式：先自己回忆要点，再翻开对照，按「忘了 / 模糊 / 记得」自评，系统据此安排下次复习时间（记得越牢，间隔越长）。', 'How review works: recall the key points first, then reveal and rate yourself Forgot / Fuzzy / Remembered — the next review is scheduled from that (the better you know it, the longer the gap).')) + '</p>';

    var shown = 0;
    html += '<div class="stack mt16">' + s.units.map(function (u, ui2) {
      var list = u.topics.map(function (tp, i) { return { i: i, key: SL.topicKey(u.id, i), name: t(tp) }; }).filter(function (x) {
        if (!q) return true;
        var hay = (x.name + ' ' + u.topics[x.i].en + ' ' + points(u.id, x.i).join(' ') + ' ' + (K.notes[x.key] || '')).toLowerCase();
        return hay.indexOf(q) !== -1;
      });
      if (!list.length) return '';
      shown += list.length;
      var um = SL.unitMastery(u.id);
      var unitDue = list.filter(function (x) { var r = K.srs[x.key]; return r && r.due < SL.startOfDay() + DAY; }).length;
      var open = q || KS.open[u.id];
      return '<details class="card" data-accent="' + s.id + '"' + (open ? ' open' : '') + ' data-unit="' + u.id + '"><summary style="cursor:pointer;list-style:none" data-act="kbToggle" data-u="' + u.id + '">' +
        '<div class="row between"><div class="row"><span class="subj-icon" style="width:34px;height:34px;font-size:13px" data-accent="' + s.id + '">U' + (ui2 + 1) + '</span><div><h3 style="font-size:15px">' + esc(shortUnit(u)) + '</h3><div class="xs faint">' + list.length + esc(L(' 个知识点 · 练习掌握度 ', ' topics · practice mastery ')) + um.avg + '%' + (unitDue ? ' · <span style="color:var(--bad)">' + unitDue + esc(L(' 个到期', ' due')) + '</span>' : '') + '</div></div></div>' +
        '<span class="row" style="gap:6px"><a class="btn sm ghost" href="#/kb/review?u=' + u.id + '&mode=unit">' + esc(L('复习本单元', 'Review unit')) + '</a></span></div></summary>' +
        '<div class="stack mt12">' + list.map(function (x) {
          var pts = points(u.id, x.i), mm = SL.topicMastery(x.key);
          return '<div class="card pad-sm" style="background:var(--surface-2)" id="kb-' + esc(x.key.replace(':', '-')) + '">' +
            '<div class="row between" style="align-items:flex-start"><div class="grow"><div class="bold">' + (x.i + 1) + '. ' + esc(x.name) + '</div>' +
            (SL.lang === 'zh' ? '<div class="xs faint">' + esc(u.topics[x.i].en) + '</div>' : '') + '</div>' +
            '<div class="row" style="gap:6px">' + statusChip(x.key) + ui.lvlChip(mm) + '</div></div>' +
            (pts.length ? '<ul class="small mt8" style="margin-bottom:0;padding-left:20px;line-height:1.65">' + pts.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ul>' : '<p class="small muted mt8">' + esc(L('暂无要点', 'No key points yet')) + '</p>') +
            '<div class="field mt12"><label class="xs bold" for="kbn-' + esc(x.key) + '">' + esc(L('我的笔记', 'My notes')) + ' <span class="faint" id="kbs-' + esc(x.key.replace(':', '-')) + '"></span></label>' +
            '<textarea class="input" id="kbn-' + esc(x.key) + '" rows="2" data-input="kbNote" data-k="' + esc(x.key) + '" placeholder="' + esc(L('用自己的话总结、写例子、记易错点…（自动保存）', 'Summarise in your own words, add examples, common traps… (auto-saved)')) + '" style="min-height:64px">' + esc(K.notes[x.key] || '') + '</textarea></div>' +
            '<div class="row mt8">' +
            '<span class="xs bold muted">' + esc(L('复习自评：', 'Rate recall:')) + '</span>' +
            '<button class="btn sm" data-act="kbGrade" data-k="' + esc(x.key) + '" data-g="0">' + esc(L('忘了', 'Forgot')) + '</button>' +
            '<button class="btn sm" data-act="kbGrade" data-k="' + esc(x.key) + '" data-g="1">' + esc(L('模糊', 'Fuzzy')) + '</button>' +
            '<button class="btn sm" data-act="kbGrade" data-k="' + esc(x.key) + '" data-g="2">' + esc(L('记得', 'Remembered')) + '</button>' +
            '<span class="grow"></span>' +
            '<a class="btn sm ghost" href="#/practice?topic=' + encodeURIComponent(x.key) + '&adaptive=1&go=1">' + esc(L('练这个知识点', 'Practise')) + '</a>' +
            '<a class="btn sm ghost" href="#/tutor?topic=' + encodeURIComponent(x.key) + '&task=explain">' + I.bot + esc(L('AI 讲解', 'AI explain')) + '</a></div></div>';
        }).join('') + '</div></details>';
    }).join('') + '</div>';
    if (q && !shown) html += '<div class="card mt16">' + ui.empty('🔎', L('没有找到相关知识点', 'No matching topics'), L('换个关键词试试，或切换科目。', 'Try another keyword or switch course.')) + '</div>';
    return {
      title: L('知识库', 'Knowledge base'), accent: KS.s, html: html, keepScroll: true,
      after: function (root) { var se = root.querySelector('#kbSearch'); if (se && KS.q) { se.focus(); se.setSelectionRange(se.value.length, se.value.length); } }
    };
  }
  var searchTimer = null, noteTimer = {};
  SL.act('kbS', function (el) { KS.s = el.getAttribute('data-v'); KS.q = ''; SL.store.settings.lastSubject = KS.s; SL.save(); SL.render(); });
  SL.act('kbSearch', function (el) { KS.q = el.value; clearTimeout(searchTimer); searchTimer = setTimeout(function () { SL.rerender(); }, 250); });
  SL.act('kbToggle', function (el, e) {
    if (e.target.closest('a')) { SL.go(e.target.closest('a').getAttribute('href')); return; }
    var u = el.getAttribute('data-u'), d = el.parentNode;
    d.open = !d.open; KS.open[u] = d.open;
  });
  SL.act('kbExpand', function () {
    var ds = SL.qsa('details[data-unit]'); var anyClosed = ds.some(function (d) { return !d.open; });
    ds.forEach(function (d) { d.open = anyClosed; KS.open[d.getAttribute('data-unit')] = anyClosed; });
  });
  SL.act('kbNote', function (el) {
    var k = el.getAttribute('data-k');
    kb().notes[k] = el.value.slice(0, 5000);
    var lab = document.getElementById('kbs-' + k.replace(':', '-')); if (lab) lab.textContent = L('保存中…', 'Saving…');
    clearTimeout(noteTimer[k]);
    noteTimer[k] = setTimeout(function () { SL.save(true); if (lab) lab.textContent = L('· 已保存', '· saved'); }, 500);
  });
  SL.act('kbGrade', function (el) {
    var k = el.getAttribute('data-k'), g = parseInt(el.getAttribute('data-g'), 10);
    var r = grade(k, g);
    SL.toast(L(['忘了', '模糊', '记得'][g] + ' · ' + r.interval + ' 天后再复习', ['Forgot', 'Fuzzy', 'Remembered'][g] + ' · next review in ' + r.interval + 'd'));
    SL.rerender();
  });

  /* ---------- recall review ---------- */
  var RV = null;
  function buildQueue(query) {
    var K = kb(), now = Date.now(), end = SL.startOfDay() + DAY;
    var pool = query.u ? allTopics(null).filter(function (x) { return x.u.id === query.u; }) : allTopics(query.s || null);
    var mode = query.mode || 'due';
    if (mode === 'due') pool = pool.filter(function (x) { var r = K.srs[x.key]; return r && r.due < end; }).sort(function (a, b) { return K.srs[a.key].due - K.srs[b.key].due; });
    else if (mode === 'new') pool = pool.filter(function (x) { return !K.srs[x.key]; }).slice(0, 10);
    else if (mode === 'unit') pool = pool.slice().sort(function (a, b) { var ra = K.srs[a.key], rb = K.srs[b.key]; return (ra ? ra.due : 0) - (rb ? rb.due : 0); });
    else pool = SL.shuffle(pool).slice(0, 10);
    return pool.slice(0, 30);
  }
  function renderReview(m, query) {
    var key = JSON.stringify(query);
    if (!RV || RV.key !== key) RV = { key: key, items: buildQueue(query), i: 0, shown: false, recall: '', res: [0, 0, 0] };
    var back = '#/kb';
    var title = L('知识点复习', 'Topic review');
    if (!RV.items.length) {
      return { title: title, back: back, html: '<div class="card">' + ui.empty('🌤️', L('现在没有需要复习的知识点', 'Nothing to review right now'), L('去「学习新知识点」开始，或随机抽查几个。', 'Start with "Learn new topics", or do a random check.'), '<a class="btn primary" href="' + back + '">' + esc(L('返回知识库', 'Back to knowledge base')) + '</a>') + '</div>' };
    }
    if (RV.i >= RV.items.length) {
      var r = RV.res;
      return { title: title, back: back, html: '<div class="card" style="max-width:560px;margin:0 auto;text-align:center"><div style="font-size:34px">🎉</div><h2 class="mt8">' + esc(L('本组复习完成', 'Review set complete')) + '</h2>' +
        '<p class="muted mt8">' + esc(L('记得 ' + r[2] + ' · 模糊 ' + r[1] + ' · 忘了 ' + r[0], 'Remembered ' + r[2] + ' · Fuzzy ' + r[1] + ' · Forgot ' + r[0])) + '</p>' +
        (r[0] + r[1] ? '<p class="small mt8">' + esc(L('建议：把「忘了/模糊」的知识点做一组专项练习，巩固效果更好。', 'Tip: practise the Forgot / Fuzzy topics with a short set to lock them in.')) + '</p>' : '') +
        '<div class="row mt16" style="justify-content:center">' + (r[0] + r[1] ? '<button class="btn primary" data-act="kbPracticeWeak">' + esc(L('练习没记牢的知识点', 'Practise the shaky topics')) + '</button>' : '') +
        '<a class="btn" href="' + back + '">' + esc(L('返回知识库', 'Back to knowledge base')) + '</a></div></div>' };
    }
    var x = RV.items[RV.i], pts = points(x.u.id, x.i), note = kb().notes[x.key] || '';
    var html = '<div style="max-width:720px;margin:0 auto"><div class="quiz-head"><span class="chip pri">' + esc(L('知识点复习', 'Topic review')) + '</span>' +
      '<div class="bar"><i style="width:' + Math.round(RV.i / RV.items.length * 100) + '%"></i></div><span class="small bold">' + (RV.i + 1) + ' / ' + RV.items.length + '</span></div>' +
      '<div class="q-card" data-accent="' + x.s.id + '"><div class="q-meta"><span class="chip acc">' + esc(t(x.s.name)) + '</span><span class="chip">U' + (x.ui + 1) + ' · ' + esc(shortUnit(x.u)) + '</span>' + statusChip(x.key) + '</div>' +
      '<h2 style="font-size:22px">' + esc(x.name) + '</h2>' + (SL.lang === 'zh' ? '<div class="small faint">' + esc(x.u.topics[x.i].en) + '</div>' : '') +
      (!RV.shown ? '<p class="small muted mt16">' + esc(L('先不看答案：试着说出或写下这个知识点的核心要点（定义、例子、公式、易错点）。', 'Before peeking: say or jot down the key points — definition, an example, formula, common trap.')) + '</p>' +
        '<textarea class="input mt8" id="kbRecall" rows="4" data-input="kbRecall" placeholder="' + esc(L('（可选）写下你记得的内容…', '(optional) write what you remember…')) + '">' + esc(RV.recall) + '</textarea>' +
        '<div class="row mt12"><button class="btn primary" data-act="kbReveal">' + esc(L('显示要点', 'Show key points')) + '</button></div>' :
        (RV.recall ? '<div class="feedback mt16"><span class="verdict" style="color:var(--text)">' + esc(L('你的回忆', 'Your recall')) + '</span><div class="small" style="white-space:pre-wrap">' + esc(RV.recall) + '</div></div>' : '') +
        '<div class="feedback ok mt12"><span class="verdict">' + esc(L('核心要点', 'Key points')) + '</span><ul class="small" style="margin:0;padding-left:20px;line-height:1.7">' + pts.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ul></div>' +
        (note ? '<div class="feedback mt12"><span class="verdict" style="color:var(--text)">' + esc(L('我的笔记', 'My notes')) + '</span><div class="small" style="white-space:pre-wrap">' + esc(note) + '</div></div>' : '') +
        '<div class="row mt16" style="justify-content:center">' +
        '<button class="btn" data-act="kbRate" data-g="0" style="min-width:110px">😵 ' + esc(L('忘了', 'Forgot')) + '</button>' +
        '<button class="btn" data-act="kbRate" data-g="1" style="min-width:110px">🤔 ' + esc(L('模糊', 'Fuzzy')) + '</button>' +
        '<button class="btn primary" data-act="kbRate" data-g="2" style="min-width:110px">✅ ' + esc(L('记得', 'Remembered')) + '</button></div>' +
        '<div class="row mt12" style="justify-content:center"><a class="btn sm ghost" href="#/practice?topic=' + encodeURIComponent(x.key) + '&adaptive=1&go=1">' + esc(L('马上练几道题', 'Practise now')) + '</a><a class="btn sm ghost" href="#/tutor?topic=' + encodeURIComponent(x.key) + '&task=explain">' + I.bot + esc(L('AI 讲解', 'AI explain')) + '</a></div>') +
      '</div></div>';
    return { title: title, back: back, accent: x.s.id, html: html };
  }
  SL.act('kbRecall', function (el) { if (RV) RV.recall = el.value; });
  SL.act('kbReveal', function () { if (RV) { RV.shown = true; SL.rerender(); } });
  SL.act('kbRate', function (el) {
    if (!RV) return;
    var g = parseInt(el.getAttribute('data-g'), 10), x = RV.items[RV.i];
    grade(x.key, g); RV.res[g]++;
    x.grade = g;
    RV.i++; RV.shown = false; RV.recall = '';
    SL.render();
  });
  SL.act('kbPracticeWeak', function () {
    var weak = RV.items.filter(function (x) { return x.grade != null && x.grade < 2; }).map(function (x) { return x.key; });
    if (!weak.length) return;
    var units = []; weak.forEach(function (k) { var u = SL.parseTopicKey(k).u; if (units.indexOf(u) === -1) units.push(u); });
    SL.startSession({ mode: 'adaptive', title: L('巩固练习', 'Consolidation'), s: SL.subjectOfUnit(units[0]).id, units: units, topics: weak, count: Math.min(15, weak.length * 3), types: ['mcq'] });
  });
  document.addEventListener('keydown', function (e) {
    if (SL.parseHash().path !== '/kb/review' || !RV) return;
    if (/TEXTAREA|INPUT/.test((document.activeElement || {}).tagName || '')) return;
    if (!RV.shown && (e.key === ' ' || e.key === 'Enter')) { e.preventDefault(); SL.actions.kbReveal(); }
    else if (RV.shown && /^[123]$/.test(e.key)) { var b = document.querySelector('[data-act="kbRate"][data-g="' + (parseInt(e.key, 10) - 1) + '"]'); if (b) b.click(); }
  });

  SL.route(/^\/kb$/, renderKB);
  SL.route(/^\/kb\/review$/, renderReview);
})();
