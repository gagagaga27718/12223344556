/* StudyLoop views — mistake notebook, spaced review, flashcards, planner, notes */
(function () {
  'use strict';
  var SL = window.SL;
  var esc = SL.esc, L = SL.L, t = SL.t, I = SL.ICON, ui = SL.ui;

  /* ---------- mistakes ---------- */
  var MF = { s: 'all', u: '', tp: '', status: 'open', sort: 'recent' };
  function filteredMistakes() {
    return SL.mistakeList().filter(function (m) {
      var q = m.q;
      if (MF.s !== 'all' && q.s !== MF.s) return false;
      if (MF.u && q.u !== MF.u) return false;
      if (MF.tp !== '' && String(q.tp) !== MF.tp) return false;
      if (MF.status === 'open' && m.mastered) return false;
      if (MF.status === 'done' && !m.mastered) return false;
      return true;
    }).sort(function (a, b) { return MF.sort === 'count' ? b.count - a.count || b.last - a.last : b.last - a.last; });
  }
  function renderMistakes(m, query) {
    if (query.s && (query.s === 'all' || SL.subject(query.s))) { MF.s = query.s; MF.u = ''; MF.tp = ''; history.replaceState(null, '', '#/mistakes'); }
    var all = SL.mistakeList();
    var open = all.filter(function (x) { return !x.mastered; }).length;
    var list = filteredMistakes();
    var subj = MF.s === 'all' ? null : SL.subject(MF.s);
    var html = '<div class="grid g3">' +
      '<div class="card stat"><span class="label">' + esc(L('错题总数', 'Total mistakes')) + '</span><span class="value">' + all.length + '</span></div>' +
      '<div class="card stat"><span class="label">' + esc(L('待攻克', 'Still open')) + '</span><span class="value" style="color:var(--bad)">' + open + '</span></div>' +
      '<div class="card stat"><span class="label">' + esc(L('已掌握', 'Mastered')) + '</span><span class="value" style="color:var(--good)">' + (all.length - open) + '</span><span class="sub">' + esc(L('连续答对 3 次自动标记', 'Auto after 3 correct in a row')) + '</span></div></div>';
    html += '<div class="card mt16"><div class="row">' +
      '<select class="input" style="width:auto" data-change="mfS" aria-label="subject"><option value="all">' + esc(L('全部课程', 'All courses')) + '</option>' + SL.SUBJECTS.map(function (s) { return '<option value="' + s.id + '"' + (MF.s === s.id ? ' selected' : '') + '>' + esc(t(s.name)) + '</option>'; }).join('') + '</select>' +
      (subj ? '<select class="input" style="width:auto;max-width:260px" data-change="mfU" aria-label="unit"><option value="">' + esc(L('全部单元', 'All units')) + '</option>' + subj.units.map(function (u) { return '<option value="' + u.id + '"' + (MF.u === u.id ? ' selected' : '') + '>' + esc(t(u.name)) + '</option>'; }).join('') + '</select>' : '') +
      (MF.u ? '<select class="input" style="width:auto;max-width:240px" data-change="mfT" aria-label="topic"><option value="">' + esc(L('全部知识点', 'All topics')) + '</option>' + SL.unit(MF.u).topics.map(function (tp, i) { return '<option value="' + i + '"' + (MF.tp === String(i) ? ' selected' : '') + '>' + esc(t(tp)) + '</option>'; }).join('') + '</select>' : '') +
      '<div class="seg">' + [['open', L('待攻克', 'Open')], ['done', L('已掌握', 'Mastered')], ['all', L('全部', 'All')]].map(function (x) { return '<button class="' + (MF.status === x[0] ? 'on' : '') + '" data-act="mfStatus" data-v="' + x[0] + '">' + esc(x[1]) + '</button>'; }).join('') + '</div>' +
      '<div class="seg">' + [['recent', L('最近出错', 'Recent')], ['count', L('出错次数', 'Most missed')]].map(function (x) { return '<button class="' + (MF.sort === x[0] ? 'on' : '') + '" data-act="mfSort" data-v="' + x[0] + '">' + esc(x[1]) + '</button>'; }).join('') + '</div>' +
      '</div><div class="row mt12">' +
      '<button class="btn primary" data-act="mistakeRetry"' + (list.filter(function (x) { return !x.mastered; }).length ? '' : ' disabled') + '>' + esc(L('重练筛选出的错题', 'Retry filtered mistakes')) + ' (' + list.filter(function (x) { return !x.mastered; }).length + ')</button>' +
      '<button class="btn" data-act="mistakeRetry" data-x3="1"' + (list.filter(function (x) { return !x.mastered; }).length ? '' : ' disabled') + '>' + esc(L('强化练习 ×3', 'Intensive ×3')) + '</button>' +
      '<a class="btn" href="#/capture?new=1">' + I.camera + esc(L('录入错题（拍照/输入）', 'Add a mistake (photo / text)')) + '</a>' +
      '<button class="btn ghost" data-act="mistakeExport"' + (all.length ? '' : ' disabled') + '>' + esc(L('导出 JSON', 'Export JSON')) + '</button></div></div>';

    if (!list.length) {
      html += '<div class="card mt16">' + (all.length ? ui.empty('🔎', L('没有符合筛选条件的错题', 'No mistakes match these filters'), '') :
        ui.empty('🎉', L('错题本还是空的', 'No mistakes yet'), L('答错的题会自动收录到这里，包括你的错误答案和详细解析。', 'Wrong answers land here automatically, with your answer and the explanation.'), '<a class="btn primary" href="#/practice">' + esc(L('去练习', 'Practise')) + '</a>')) + '</div>';
    } else {
      html += '<div class="stack mt16">' + list.slice(0, 200).map(function (mk) {
        var q = mk.q, s = SL.subject(q.s);
        var lastWrong = mk.wrongAnswers[mk.wrongAnswers.length - 1];
        return '<details class="card pad-sm"><summary style="cursor:pointer;list-style:none"><div class="row" style="align-items:flex-start"><div class="grow">' +
          '<div class="row" style="gap:6px;margin-bottom:6px"><span class="chip" style="color:var(--' + q.s + ')">' + esc(t(s && s.name)) + '</span><span class="chip pri">' + esc(SL.topicName(q.u, q.tp)) + '</span>' +
          '<span class="chip bad">' + esc(L('错 ' + mk.count + ' 次', 'Missed ×' + mk.count)) + '</span>' + (mk.mastered ? '<span class="chip good">' + esc(L('已掌握', 'Mastered')) + '</span>' : mk.rightStreak ? '<span class="chip warn">' + esc(L('已连对 ' + mk.rightStreak + '/3', mk.rightStreak + '/3 right')) + '</span>' : '') +
          '<span class="xs faint">' + esc(L('最近出错 ', 'Last missed ')) + esc(ui.relTime(mk.last)) + '</span></div>' +
          '<div class="small bold">' + esc(t(q.q)) + '</div></div></div></summary>' +
          '<div class="mt12">' + (q.svg ? '<div class="q-figure">' + q.svg + '</div>' : '') + (q.img ? SL.photoHtml(q.img) : '') +
          (q.o ? '<div class="stack" style="gap:6px">' + q.o.map(function (o, i) {
            var isRight = i === q.a;
            var picked = mk.wrongAnswers.some(function (w) { return w.a === t(o) || w.a === o.en || w.a === o.zh; });
            return '<div class="small" style="padding:8px 10px;border-radius:8px;border:1px solid var(--border);' + (isRight ? 'background:var(--good-soft);border-color:var(--good)' : picked ? 'background:var(--bad-soft);border-color:var(--bad)' : '') + '">' +
              (isRight ? '✓ ' : picked ? '✗ ' : '') + esc(t(o)) + (isRight ? ' <b class="xs">(' + esc(L('正确答案', 'correct')) + ')</b>' : picked ? ' <b class="xs">(' + esc(L('你选过', 'you chose')) + ')</b>' : '') + '</div>';
          }).join('') + '</div>' : (lastWrong ? '<div class="wrong-ans"><span class="lab">' + esc(L('你的作答', 'Your answer')) + '</span>' + esc(lastWrong.a) + '</div>' : '')) +
          (q.e ? '<div class="feedback mt12 small"><b>' + esc(L('解析：', 'Explanation: ')) + '</b>' + esc(t(q.e)) + '</div>' : '') +
          (q.points ? '<div class="feedback mt12 small"><b>' + esc(L('评分标准：', 'Rubric: ')) + '</b>' + q.points.map(function (p) { return esc(t(p.label)) + ' — ' + esc(t(p.model)); }).join('<br>') + '</div>' : '') +
          '<div class="xs faint mt8">' + esc(L('错误历史：', 'History: ')) + mk.wrongAnswers.slice(-5).map(function (w) { return esc(new Date(w.ts).toLocaleDateString()); }).join(' · ') + '</div>' +
          '<div class="row mt12">' +
          '<button class="btn sm" data-act="mistakeOne" data-id="' + esc(mk.id) + '">' + esc(L('重练这题', 'Retry this')) + '</button>' +
          (q.o ? '<a class="btn sm" href="#/tutor?q=' + encodeURIComponent(mk.id) + '&task=mistake' + (mk.wrongAnswers.length ? '&chosenText=' + encodeURIComponent(lastWrong.a) : '') + '">' + I.bot + esc(L('AI 分析', 'AI analysis')) + '</a>' : '') +
          '<button class="btn sm ghost" data-act="mistakeMaster" data-id="' + esc(mk.id) + '">' + esc(mk.mastered ? L('取消已掌握', 'Mark as open') : L('标记已掌握', 'Mark mastered')) + '</button>' +
          '<button class="btn sm ghost danger" data-act="mistakeDel" data-id="' + esc(mk.id) + '">' + esc(L('删除', 'Delete')) + '</button></div></div></details>';
      }).join('') + '</div>';
    }
    return { title: L('错题本', 'Mistake notebook'), html: html, keepScroll: true };
  }
  SL.act('mfS', function (el) { MF.s = el.value; MF.u = ''; MF.tp = ''; SL.rerender(); });
  SL.act('mfU', function (el) { MF.u = el.value; MF.tp = ''; SL.rerender(); });
  SL.act('mfT', function (el) { MF.tp = el.value; SL.rerender(); });
  SL.act('mfStatus', function (el) { MF.status = el.getAttribute('data-v'); SL.rerender(); });
  SL.act('mfSort', function (el) { MF.sort = el.getAttribute('data-v'); SL.rerender(); });
  function mistakeQ(mk) { return SL.byId(mk.id) || mk.q; }
  SL.act('mistakeRetry', function (el) {
    var list = filteredMistakes().filter(function (x) { return !x.mastered; }).slice(0, 30);
    var items = [];
    var reps = el.getAttribute('data-x3') ? 3 : 1;
    for (var r = 0; r < reps; r++) items = items.concat(SL.shuffle(list).map(mistakeQ));
    SL.startSession({ mode: 'mistakes', title: L('错题重练', 'Mistake retry'), items: items, count: items.length });
  });
  SL.act('mistakeOne', function (el) { var mk = SL.store.mistakes[el.getAttribute('data-id')]; if (mk) SL.startSession({ mode: 'mistakes', title: L('错题重练', 'Mistake retry'), items: [mistakeQ(mk)], count: 1 }); });
  SL.act('mistakeMaster', function (el) { var id = el.getAttribute('data-id'); var mk = SL.store.mistakes[id]; SL.setMistakeMastered(id, !mk.mastered); SL.toast(mk.mastered ? L('已标记为掌握', 'Marked mastered') : L('已重新加入待攻克', 'Back to open')); SL.rerender(); });
  SL.act('mistakeDel', function (el) { var id = el.getAttribute('data-id'); SL.confirm(L('删除这道错题？', 'Delete this mistake?'), function () { SL.deleteMistake(id); SL.toast(L('已删除', 'Deleted')); SL.rerender(); }, L('删除', 'Delete')); });
  SL.act('mistakeExport', function () { SL.download('studyloop-mistakes.json', { type: 'mistakes', exportedAt: new Date().toISOString(), items: SL.mistakeList() }); SL.toast(L('已导出', 'Exported')); });

  /* ---------- review ---------- */
  function renderReview() {
    var dueT = SL.dueTopics(), dueM = SL.dueMistakes();
    var cardsDue = 0;
    SL.SUBJECTS.forEach(function (s) { s.units.forEach(function (u) { SL.deckCards(u.id).forEach(function (c) { var st = SL.cardState(c.id); if (st && st.due <= Date.now()) cardsDue++; }); }); });
    var html = '<div class="card welcome"><h2>' + esc(L('今日复习', "Today's review")) + '</h2><p>' +
      esc(L('间隔复习会根据你的历史表现安排：刚学的知识点很快复习，熟练的间隔逐渐拉长，反复出错的会更频繁出现。', 'Spaced repetition schedules from your history: new topics come back soon, solid ones space out, repeated misses return more often.')) + '</p>' +
      '<div class="row mt16">' + (dueT.length || dueM.length ? '<button class="btn solid" data-act="startReview">' + esc(L('开始复习', 'Start review')) + ' (' + (dueT.length + dueM.length) + ')</button>' : '') +
      (cardsDue ? '<a class="btn" href="#/flashcards/study?mode=due">' + esc(L('复习到期闪卡 ', 'Due flashcards ')) + '(' + cardsDue + ')</a>' : '') + '</div></div>';
    var kbDue = SL.kbDue ? SL.kbDue().length : 0;
    html += '<a class="card mt16 row between" href="#/kb/review?mode=due" style="display:flex"><div><div class="bold">📖 ' + esc(L('知识库：要点回忆复习', 'Knowledge base: recall review')) + '</div><div class="small muted">' + esc(kbDue ? L(kbDue + ' 个知识点的要点今天该回忆了', kbDue + ' topics are due for recall today') : L('今天没有到期的知识点要点，可以去知识库学新内容', 'No key points due — learn new ones in the knowledge base')) + '</div></div><span class="chip ' + (kbDue ? 'bad' : 'good') + '">' + kbDue + '</span></a>';
    html += '<div class="grid g2 mt16" style="align-items:start"><div class="card"><div class="card-head"><h3>' + esc(L('到期的知识点', 'Topics due')) + ' · ' + dueT.length + '</h3></div>' +
      (dueT.length ? '<div class="list">' + dueT.slice(0, 30).map(function (d) {
        var p = SL.parseTopicKey(d.key), s = SL.subjectOfUnit(p.u);
        return '<div class="list-row"><span class="subj-dot" style="background:var(--c-' + s.id + ')"></span><div class="grow"><div class="title">' + esc(SL.topicName(p.u, p.tp)) + '</div><div class="meta">' + esc(L('上次练习 ', 'Last ')) + esc(ui.relTime(d.rec.last)) + ' · ' + esc(L('间隔 ', 'interval ')) + (d.rec.interval || 0) + esc(L(' 天', 'd')) + (d.rec.lapses ? ' · ' + esc(L('出错 ' + d.rec.lapses + ' 次', d.rec.lapses + ' lapses')) : '') + '</div></div>' + ui.lvlChip(d.m) + '</div>';
      }).join('') + '</div>' : ui.empty('🌤️', L('今天没有到期的知识点', 'Nothing due today'), L('继续做新题吧，系统会自动安排复习时间。', 'Keep practising — reviews are scheduled automatically.'))) + '</div>';
    html += '<div class="stack"><div class="card"><div class="card-head"><h3>' + esc(L('到期的错题', 'Mistakes due')) + ' · ' + dueM.length + '</h3><a class="link" href="#/mistakes">' + esc(L('错题本', 'Notebook')) + ' →</a></div>' +
      (dueM.length ? '<div class="list">' + dueM.slice(0, 8).map(function (mk) { return '<div class="list-row"><div class="grow"><div class="title" style="font-weight:500">' + esc(t(mk.q.q).slice(0, 80)) + '</div><div class="meta">' + esc(SL.topicName(mk.q.u, mk.q.tp)) + ' · ×' + mk.count + '</div></div></div>'; }).join('') + '</div>' : ui.empty('✅', L('没有到期的错题', 'No mistakes due'), '')) + '</div>';
    // upcoming 7 days
    var up = [];
    for (var i = 1; i <= 7; i++) {
      var start = SL.startOfDay() + i * SL.DAY, end = start + SL.DAY, n = 0;
      Object.keys(SL.store.topics).forEach(function (k) { var r = SL.store.topics[k]; if (r.due >= start && r.due < end) n++; });
      SL.mistakeList().forEach(function (mk) { if (!mk.mastered && mk.next >= start && mk.next < end) n++; });
      var dt = new Date(start);
      up.push({ label: (dt.getMonth() + 1) + '/' + dt.getDate(), value: n, tip: (dt.getMonth() + 1) + '/' + dt.getDate() + ' · ' + n + L(' 项', ' items') });
    }
    html += '<div class="card"><div class="card-head"><h3>' + esc(L('未来 7 天复习量', 'Next 7 days')) + '</h3></div>' + (up.some(function (x) { return x.value; }) ? SL.chart.bars(up, { h: 150, aria: L('未来 7 天每天到期的复习项', 'Review items due per day') }) : '<p class="small muted">' + esc(L('暂无排期。', 'Nothing scheduled yet.')) + '</p>') + '</div></div></div>';
    return { title: L('今日复习', 'Review'), html: html };
  }
  SL.act('startReview', function () {
    var items = [], used = {};
    SL.dueMistakes().slice(0, 10).forEach(function (mk) { var q = SL.byId(mk.id) || mk.q; if (!used[q.id]) { used[q.id] = 1; items.push(q); } });
    SL.dueTopics().slice(0, 12).forEach(function (d) {
      var p = SL.parseTopicKey(d.key);
      var pool = SL.buildPool({ units: [p.u], topics: [d.key], types: ['mcq'], genPer: 2 }).filter(function (q) { return !used[q.id]; });
      // prefer medium items; harder if the topic is going well
      var target = (d.m || 0) >= 70 ? 3 : 2;
      pool.sort(function (a, b) { return Math.abs(a.d - target) - Math.abs(b.d - target) || Math.random() - 0.5; });
      pool.slice(0, 2).forEach(function (q) { used[q.id] = 1; items.push(q); });
    });
    if (!items.length) { SL.toast(L('没有可复习的题目', 'Nothing to review'), 'bad'); return; }
    SL.startSession({ mode: 'review', title: L('间隔复习', 'Spaced review'), items: SL.shuffle(items), count: items.length });
  });

  /* ---------- flashcards ---------- */
  var FC = null; // {cards, i, flipped, unit, mode, known, unknown}
  function renderFlashHome(m, q) {
    var sid = q.s && SL.subject(q.s) ? q.s : (SL.store.settings.lastSubject || 'geo');
    if (q.unit && SL.unit(q.unit)) sid = SL.subjectOfUnit(q.unit).id;
    var s = SL.subject(sid);
    var html = '<div class="row"><div class="seg">' + SL.SUBJECTS.map(function (x) { return '<button class="' + (x.id === sid ? 'on' : '') + '" data-act="nav" data-href="#/flashcards?s=' + x.id + '">' + esc(t(x.name)) + '</button>'; }).join('') + '</div>' +
      '<button class="btn sm" data-act="cardNew" data-s="' + sid + '">' + I.plus + esc(L('自定义闪卡', 'New card')) + '</button></div>' +
      '<p class="small muted mt12">' + esc(L('闪卡由题库中的词汇和概念题生成（正面：问题，背面：答案 + 解释），也可以添加自己的卡片。标记「认识」后复习间隔会逐渐拉长。', 'Cards come from vocab & concept items in the bank (front: prompt, back: answer + explanation), plus your own. Marking "Know it" spaces them further apart.')) + '</p>' +
      '<div class="grid g3 mt16">' + s.units.map(function (u) {
        var cards = SL.deckCards(u.id), now = Date.now();
        var due = 0, fam = 0, seen = 0;
        cards.forEach(function (c) { var st = SL.cardState(c.id); if (st) { seen++; if (st.fam) fam++; if (st.due <= now) due++; } });
        return '<div class="card pad-sm' + (q.unit === u.id ? ' accent-top' : '') + '" data-accent="' + sid + '"><h3 style="font-size:14px">' + esc(t(u.name)) + '</h3><div class="xs faint mt8">' + cards.length + esc(L(' 张 · 熟悉 ', ' cards · known ')) + fam + esc(L(' · 到期 ', ' · due ')) + due + '</div>' +
          '<div class="bar thin mt8"><i class="good" style="width:' + (cards.length ? Math.round(fam / cards.length * 100) : 0) + '%"></i></div>' +
          '<div class="row mt12"><a class="btn sm accent" href="#/flashcards/study?unit=' + u.id + '&mode=smart"' + (cards.length ? '' : ' aria-disabled="true"') + '>' + esc(L('学习', 'Study')) + '</a>' +
          '<a class="btn sm" href="#/flashcards/study?unit=' + u.id + '&mode=random">' + esc(L('随机', 'Shuffle')) + '</a>' +
          (seen - fam > 0 ? '<a class="btn sm ghost" href="#/flashcards/study?unit=' + u.id + '&mode=unfamiliar">' + esc(L('不熟悉 ', 'Unknown ')) + (seen - fam) + '</a>' : '') + '</div></div>';
      }).join('') + '</div>';
    var mine = SL.store.cards.custom.filter(function (c) { return SL.subjectOfUnit(c.u) && SL.subjectOfUnit(c.u).id === sid; });
    if (mine.length) {
      html += '<div class="card mt16"><div class="card-head"><h3>' + esc(L('我的自定义闪卡', 'My cards')) + '</h3></div><div class="list">' + mine.map(function (c) {
        return '<div class="list-row"><div class="grow"><div class="title">' + esc(t(c.front)) + '</div><div class="meta">' + esc(t(c.back)) + ' · ' + esc(t(SL.unit(c.u).name)) + '</div></div><button class="btn sm ghost danger" data-act="cardDel" data-id="' + esc(c.id) + '">' + esc(L('删除', 'Delete')) + '</button></div>';
      }).join('') + '</div></div>';
    }
    return { title: L('闪卡', 'Flashcards'), accent: sid, html: html };
  }
  function buildDeck(q) {
    var cards = [];
    if (q.unit) cards = SL.deckCards(q.unit);
    else SL.SUBJECTS.forEach(function (s) { s.units.forEach(function (u) { cards = cards.concat(SL.deckCards(u.id)); }); });
    var now = Date.now();
    if (q.mode === 'due') cards = cards.filter(function (c) { var st = SL.cardState(c.id); return st && st.due <= now; });
    else if (q.mode === 'unfamiliar') cards = cards.filter(function (c) { var st = SL.cardState(c.id); return st && !st.fam; });
    else if (q.mode === 'smart') {
      // due first, then new, then the rest by due date
      cards = cards.map(function (c) { var st = SL.cardState(c.id); return { c: c, k: !st ? 1 : st.due <= now ? 0 : 2, due: st ? st.due : 0 }; })
        .sort(function (a, b) { return a.k - b.k || a.due - b.due || Math.random() - 0.5; }).map(function (x) { return x.c; }).slice(0, 20);
      return cards;
    }
    return SL.shuffle(cards).slice(0, 30);
  }
  function renderFlashStudy(m, q) {
    var key = JSON.stringify(q);
    if (!FC || FC.key !== key) FC = { key: key, cards: buildDeck(q), i: 0, flipped: false, known: 0, unknown: 0, unit: q.unit };
    var back = '#/flashcards' + (q.unit ? '?unit=' + q.unit : '');
    var sid = q.unit ? SL.subjectOfUnit(q.unit).id : 'none';
    if (!FC.cards.length) return { title: L('闪卡', 'Flashcards'), back: back, html: '<div class="card">' + ui.empty('🃏', L('这组没有卡片', 'No cards in this set'), L('试试「学习」或「随机」模式。', 'Try Study or Shuffle mode.'), '<a class="btn primary" href="' + back + '">' + esc(L('返回', 'Back')) + '</a>') + '</div>' };
    if (FC.i >= FC.cards.length) {
      return { title: L('闪卡', 'Flashcards'), back: back, accent: sid, html: '<div class="card" style="max-width:520px;margin:0 auto;text-align:center"><div style="font-size:36px">🎉</div><h2 class="mt8">' + esc(L('本组完成', 'Set complete')) + '</h2>' +
        '<p class="muted mt8">' + esc(L('认识 ' + FC.known + ' · 不认识 ' + FC.unknown, 'Knew ' + FC.known + ' · Didn\'t know ' + FC.unknown)) + '</p><div class="row mt16" style="justify-content:center"><button class="btn primary" data-act="cardAgain">' + esc(L('再来一组', 'Another set')) + '</button><a class="btn" href="' + back + '">' + esc(L('返回卡组', 'Back to decks')) + '</a></div></div>' };
    }
    var c = FC.cards[FC.i];
    var st = SL.cardState(c.id);
    var html = '<div class="row between" style="max-width:640px;margin:0 auto 12px"><span class="small bold">' + (FC.i + 1) + ' / ' + FC.cards.length + '</span><span class="chip">' + esc(SL.topicName(c.u, c.tp)) + '</span>' +
      (st ? '<span class="xs faint">' + esc(st.fam ? L('熟悉', 'Known') : L('不熟悉', 'Learning')) + '</span>' : '<span class="chip pri">' + esc(L('新卡', 'New')) + '</span>') + '</div>' +
      '<div class="flash' + (FC.flipped ? ' flipped' : '') + '"><button class="flash-btn" data-act="cardFlip" aria-label="' + esc(L('翻面', 'Flip card')) + '"><div class="flash-inner">' +
      '<div class="flash-face"><div class="xs faint" style="margin-bottom:10px">' + esc(L('问题 · 点击翻面（空格键）', 'Prompt · tap to flip (Space)')) + '</div><div class="big">' + esc(t(c.front)) + '</div></div>' +
      '<div class="flash-face back"><div class="xs faint" style="margin-bottom:10px">' + esc(L('答案', 'Answer')) + '</div><div class="big">' + esc(t(c.back)) + '</div>' + (c.note ? '<div class="note">' + esc(t(c.note)) + '</div>' : '') + '</div>' +
      '</div></button></div>' +
      '<div class="row mt16" style="justify-content:center">' + (FC.flipped ?
        '<button class="btn" data-act="cardGrade" data-v="0" style="min-width:140px">✗ ' + esc(L('不认识', "Didn't know")) + '</button><button class="btn primary" data-act="cardGrade" data-v="1" style="min-width:140px">✓ ' + esc(L('认识', 'Know it')) + '</button>' :
        '<button class="btn primary" data-act="cardFlip" style="min-width:200px">' + esc(L('显示答案', 'Show answer')) + '</button>') + '</div>';
    return { title: L('闪卡', 'Flashcards'), back: back, accent: sid, html: html };
  }
  SL.act('cardFlip', function () { if (FC) { FC.flipped = !FC.flipped; SL.rerender(); } });
  SL.act('cardGrade', function (el) {
    if (!FC) return;
    var c = FC.cards[FC.i], known = el.getAttribute('data-v') === '1';
    SL.gradeCard(c.id, known).forEach(function (ev) { SL.toast('🏅 ' + L('解锁成就：', 'Achievement: ') + L(ev.a.zh, ev.a.en)); });
    if (known) FC.known++; else FC.unknown++;
    FC.i++; FC.flipped = false; SL.rerender();
  });
  SL.act('cardAgain', function () { FC = null; SL.render(); });
  document.addEventListener('keydown', function (e) {
    if (SL.parseHash().path !== '/flashcards/study' || !FC) return;
    if (/TEXTAREA|INPUT/.test((document.activeElement || {}).tagName || '')) return;
    if (e.key === ' ') { e.preventDefault(); SL.actions.cardFlip(); }
    else if (FC.flipped && (e.key === '1' || e.key === 'ArrowLeft')) SL.actions.cardGrade({ getAttribute: function () { return '0'; } });
    else if (FC.flipped && (e.key === '2' || e.key === 'ArrowRight')) SL.actions.cardGrade({ getAttribute: function () { return '1'; } });
  });
  SL.act('cardNew', function (el) {
    var s = SL.subject(el.getAttribute('data-s'));
    SL.modal('<h3>' + esc(L('新建闪卡', 'New flashcard')) + '</h3><div class="stack">' +
      '<div class="field"><label for="cu">' + esc(L('单元', 'Unit')) + '</label><select id="cu" class="input">' + s.units.map(function (u) { return '<option value="' + u.id + '">' + esc(t(u.name)) + '</option>'; }).join('') + '</select></div>' +
      '<div class="field"><label for="cf">' + esc(L('正面（问题/概念）', 'Front (prompt / concept)')) + '</label><textarea id="cf" class="input" rows="2" maxlength="300"></textarea></div>' +
      '<div class="field"><label for="cb">' + esc(L('背面（答案/解释）', 'Back (answer / explanation)')) + '</label><textarea id="cb" class="input" rows="3" maxlength="600"></textarea></div>' +
      '<div class="row" style="justify-content:flex-end"><button class="btn" data-act="closeModal">' + esc(L('取消', 'Cancel')) + '</button><button class="btn primary" id="cSave">' + esc(L('保存', 'Save')) + '</button></div></div>', function (m) {
      m.querySelector('#cSave').addEventListener('click', function () {
        var f = m.querySelector('#cf').value.trim(), b = m.querySelector('#cb').value.trim(), u = m.querySelector('#cu').value;
        if (!f || !b) { SL.toast(L('正面和背面都要填写', 'Fill in both sides'), 'bad'); return; }
        var uu = SL.unit(u);
        SL.store.cards.custom.push({ id: SL.uid('cc'), u: u, tp: SL.classifyTopic(u, { q: { en: f + ' ' + b } }), front: { en: f, zh: f }, back: { en: b, zh: b }, createdAt: Date.now() });
        SL.save(); SL.closeModal(); SL.toast(L('已添加到 ', 'Added to ') + t(uu.name)); SL.rerender();
      });
    });
  });
  SL.act('cardDel', function (el) { var id = el.getAttribute('data-id'); SL.store.cards.custom = SL.store.cards.custom.filter(function (c) { return c.id !== id; }); delete SL.store.cards.srs[id]; SL.save(); SL.rerender(); });

  /* ---------- planner ---------- */
  function renderPlanner() {
    var pl = SL.store.planner;
    var plan = SL.plannerToday();
    SL.save();
    var today = SL.dayKey();
    var html = '<div class="grid g2" style="align-items:start"><div class="stack">' +
      '<div class="card"><div class="card-head"><h3>' + esc(L('今日任务', "Today's tasks")) + '</h3><span class="xs faint">' + esc(today) + '</span></div>' + SL.renderTaskList(plan) +
      '<div class="divider"></div><div class="row"><input class="input grow" id="taskText" maxlength="140" placeholder="' + esc(L('添加自己的任务，例如：复习 Unit 3 笔记', 'Add a task, e.g. review Unit 3 notes')) + '" style="min-width:180px">' +
      '<input class="input" type="date" id="taskDate" value="' + today + '" min="' + today + '" style="width:auto"><button class="btn primary" data-act="taskAdd">' + I.plus + esc(L('添加', 'Add')) + '</button></div>' +
      '<p class="xs faint mt8">' + esc(L('系统任务根据你的目标、到期复习和薄弱知识点每天自动生成；未完成的自定义任务会自动顺延到第二天。', 'System tasks are generated daily from your goal, due reviews and weak topics; unfinished custom tasks roll over automatically.')) + '</p></div>';
    var upcoming = pl.tasks.filter(function (x) { return x.date > today && !x.done; }).sort(function (a, b) { return a.date < b.date ? -1 : 1; });
    if (upcoming.length) html += '<div class="card"><div class="card-head"><h3>' + esc(L('之后的任务', 'Upcoming')) + '</h3></div><div class="list">' + upcoming.map(function (x) { return '<div class="list-row"><div class="grow"><div class="title">' + esc(x.text) + '</div><div class="meta">' + esc(x.date) + '</div></div><button class="btn sm ghost danger" data-act="taskDel" data-id="' + esc(x.id) + '">' + esc(L('删除', 'Delete')) + '</button></div>'; }).join('') + '</div></div>';
    // last 7 days goal completion
    var days = SL.dailyCounts(7), goal = pl.dailyGoal || 20;
    html += '<div class="card"><div class="card-head"><h3>' + esc(L('最近 7 天目标完成', 'Goal completion, last 7 days')) + '</h3></div><div class="row" style="gap:6px;justify-content:space-between">' +
      days.map(function (d) { var dt = new Date(d.ts); var ok = d.n >= goal; return '<div style="text-align:center;flex:1" data-tip="' + esc((dt.getMonth() + 1) + '/' + dt.getDate() + ' · ' + d.n + '/' + goal) + '" tabindex="0"><div class="check' + (ok ? ' on' : '') + '" style="margin:0 auto">' + (ok ? I.check : '') + '</div><div class="xs faint mt8">' + (dt.getMonth() + 1) + '/' + dt.getDate() + '</div></div>'; }).join('') + '</div></div>';
    html += '</div><div class="stack"><div class="card"><div class="card-head"><h3>' + esc(L('每日目标', 'Daily goal')) + '</h3></div>' +
      '<div class="range-row"><input type="range" min="5" max="100" step="5" value="' + goal + '" data-change="goalSet" data-input="goalShow" aria-label="daily goal"><output id="goalOut">' + goal + '</output><span class="small muted">' + esc(L('题/天', 'q/day')) + '</span></div></div>' +
      '<div class="card"><div class="card-head"><h3>' + esc(L('考试日期', 'Exam dates')) + '</h3></div><div class="stack">' +
      SL.SUBJECTS.map(function (s) {
        var d = pl.exams[s.id] || '';
        var days = d ? Math.ceil((new Date(d + 'T00:00:00').getTime() - SL.startOfDay()) / SL.DAY) : null;
        var sm = SL.subjectMastery(s.id);
        return '<div class="field"><label for="ex-' + s.id + '">' + esc(t(s.name)) + '</label><div class="row"><input class="input" type="date" id="ex-' + s.id + '" value="' + d + '" data-change="examDate" data-s="' + s.id + '" style="width:auto">' +
          (days != null ? '<span class="chip ' + (days < 0 ? '' : days <= 14 ? 'bad' : 'pri') + '">' + esc(days < 0 ? L('已结束', 'Past') : L('还有 ' + days + ' 天', days + ' days left')) + '</span>' : '') + '</div>' +
          (days != null && days >= 0 ? '<span class="hint">' + esc(L('当前平均掌握度 ' + sm.avg + '%，还有 ' + (sm.total - Math.round(sm.avg / 100 * sm.total)) + ' 个知识点的差距；今日任务会据此推荐学习量。', 'Avg mastery ' + sm.avg + '% — about ' + (sm.total - Math.round(sm.avg / 100 * sm.total)) + ' topics to close; daily tasks pace this for you.')) + '</span>' : '') + '</div>';
      }).join('') + '</div></div></div></div>';
    return { title: L('学习计划', 'Study planner'), html: html, keepScroll: true };
  }
  SL.act('taskAdd', function () {
    var el = document.getElementById('taskText'), dt = document.getElementById('taskDate');
    var text = el.value.trim();
    if (!text) { SL.toast(L('请输入任务内容', 'Type a task first'), 'bad'); el.focus(); return; }
    SL.store.planner.tasks.push({ id: SL.uid('t'), text: text, date: dt.value || SL.dayKey(), done: false, createdAt: Date.now() });
    if (SL.store.planner.tasks.length > 300) SL.store.planner.tasks = SL.store.planner.tasks.slice(-300);
    SL.save(); SL.toast(L('已添加任务', 'Task added')); SL.rerender();
  });
  SL.act('taskDel', function (el) { var id = el.getAttribute('data-id'); SL.store.planner.tasks = SL.store.planner.tasks.filter(function (x) { return x.id !== id; }); SL.save(); SL.rerender(); });
  SL.act('goalShow', function (el) { var o = document.getElementById('goalOut'); if (o) o.textContent = el.value; });
  SL.act('goalSet', function (el) { SL.store.planner.dailyGoal = parseInt(el.value, 10); SL.save(); SL.toast(L('每日目标已更新', 'Daily goal updated')); SL.rerender(); });
  SL.act('examDate', function (el) { var s = el.getAttribute('data-s'); if (el.value) SL.store.planner.exams[s] = el.value; else delete SL.store.planner.exams[s]; SL.save(); SL.toast(L('考试日期已保存', 'Exam date saved')); SL.rerender(); });

  /* ---------- notes ---------- */
  var noteTimer = null;
  function renderNotes() {
    var html = '<p class="small muted">' + esc(L('按课程记笔记，输入时自动保存在本机。', 'Notes per course — saved automatically on this device as you type.')) + '</p><div class="stack mt16">' +
      SL.SUBJECTS.map(function (s) {
        return '<div class="card" data-accent="' + s.id + '"><div class="card-head"><h3>' + esc(t(s.name)) + '</h3><span class="xs faint" id="ns-' + s.id + '"></span></div>' +
          '<textarea class="input" rows="7" data-input="noteInput" data-s="' + s.id + '" data-testid="notes-' + s.id + '">' + esc(SL.store.notes[s.id] || '') + '</textarea>' +
          '<div class="row mt12"><button class="btn sm" data-act="noteExport" data-s="' + s.id + '">' + esc(L('导出', 'Export')) + '</button><a class="btn sm ghost" href="#/tutor?s=' + s.id + '&task=notes">' + I.bot + esc(L('让 AI 根据笔记出题', 'AI: quiz me on my notes')) + '</a></div></div>';
      }).join('') + '</div>';
    return { title: L('笔记', 'Notes'), html: html };
  }
  SL.act('noteInput', function (el) {
    var s = el.getAttribute('data-s');
    SL.store.notes[s] = el.value;
    var lab = document.getElementById('ns-' + s); if (lab) lab.textContent = L('保存中…', 'Saving…');
    clearTimeout(noteTimer);
    noteTimer = setTimeout(function () { SL.save(true); if (lab) lab.textContent = L('已保存', 'Saved'); }, 500);
  });
  SL.act('noteExport', function (el) { var s = el.getAttribute('data-s'); SL.download('studyloop-notes-' + s + '.json', { type: 'notes', subject: s, notes: SL.store.notes[s] }); });

  SL.route(/^\/mistakes$/, renderMistakes);
  SL.route(/^\/review$/, renderReview);
  SL.route(/^\/flashcards$/, renderFlashHome);
  SL.route(/^\/flashcards\/study$/, renderFlashStudy);
  SL.route(/^\/planner$/, renderPlanner);
  SL.route(/^\/notes$/, renderNotes);
})();
