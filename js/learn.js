/* StudyLoop learning engine — attempts, mastery, spaced repetition, adaptive selection, mistakes, achievements, planner */
(function () {
  'use strict';
  var SL = window.SL;
  var DAY = SL.DAY;

  /* ---------- legacy wrongbook import (v2 format: same-origin storage or an exported wrongbook JSON) ---------- */
  SL.importLegacyWrong = function (items) {
    var n = 0;
    (items || []).forEach(function (w) {
      if (!w || !w.src || !w.src.q) return;
      var s = SL.subjectOfUnit(w.unit);
      if (!s) return;
      var q = SL.normalize(w.src, { s: s.id, u: w.unit, src: 'bank' });
      if (!q) return;
      var existing = SL.BANK.filter(function (b) { return b.q.en === q.q.en; })[0];
      if (existing) q = existing;
      addMistakeRaw(q, w.myAns || '', Date.now());
      n++;
    });
    return n;
  };
  if (SL.store._legacyWrong) {
    SL.importLegacyWrong(SL.store._legacyWrong);
    delete SL.store._legacyWrong;
    SL.save();
  }

  /* ---------- mastery ---------- */
  var DW = { 1: 0.7, 2: 1, 3: 1.3, 4: 1.5 };
  SL.mastery = function (rec, now) {
    if (!rec || !rec.n) return null;
    now = now || Date.now();
    var num = 0, den = 0, hardRight = false;
    var r = rec.recent || [];
    for (var i = r.length - 1, k = 0; i >= 0; i--, k++) {
      var w = Math.pow(0.85, k) * (DW[r[i][2]] || 1);
      num += w * r[i][1]; den += w;
      if (r[i][1] && r[i][2] >= 3) hardRight = true;
    }
    var acc = den ? num / den : 0;
    var evidence = 1 - Math.exp(-rec.n / 5);
    var days = (rec.days || []).length || 1;
    var since = Math.max(0, (now - (rec.last || now)) / DAY);
    var retention = Math.exp(-since / (4 * (1 + days * 0.8)));
    var m = 100 * acc * (0.35 + 0.65 * evidence) * (0.75 + 0.25 * retention) + (hardRight ? 4 : 0);
    return Math.round(SL.clamp(m, 0, 100));
  };
  SL.masteryLevel = function (m) {
    if (m == null) return { key: 'new', label: SL.L('未开始', 'Not started') };
    if (m < 40) return { key: 'weak', label: SL.L('薄弱', 'Weak') };
    if (m < 70) return { key: 'learning', label: SL.L('学习中', 'Learning') };
    if (m < 85) return { key: 'good', label: SL.L('良好', 'Good') };
    return { key: 'mastered', label: SL.L('已掌握', 'Mastered') };
  };
  SL.topicRec = function (key) { return SL.store.topics[key] || null; };
  SL.topicMastery = function (key) { return SL.mastery(SL.store.topics[key]); };

  SL.unitMastery = function (unitId) {
    var u = SL.unit(unitId); if (!u) return null;
    var sum = 0, cnt = 0, started = 0;
    u.topics.forEach(function (_, i) {
      var m = SL.topicMastery(SL.topicKey(unitId, i));
      cnt++; if (m != null) { started++; sum += m; }
    });
    return { avg: cnt ? Math.round(sum / cnt) : 0, started: started, total: cnt };
  };
  SL.subjectMastery = function (sid) {
    var s = SL.subject(sid); if (!s) return null;
    var sum = 0, cnt = 0, started = 0;
    s.units.forEach(function (u) { var um = SL.unitMastery(u.id); sum += um.avg * um.total; cnt += um.total; started += um.started; });
    return { avg: cnt ? Math.round(sum / cnt) : 0, started: started, total: cnt };
  };

  /* ---------- spaced repetition for topics ---------- */
  function updateTopicSrs(rec, correct, now) {
    var today = SL.dayKey(now);
    if (rec.ease == null) rec.ease = 2.3;
    if (correct) {
      if (rec.grownOn !== today && (rec.interval == null || now >= (rec.due || 0) - DAY / 2)) {
        rec.interval = rec.interval ? Math.min(120, Math.round(rec.interval * rec.ease)) : 1;
        rec.ease = Math.min(2.8, rec.ease + 0.05);
        rec.grownOn = today;
        rec.due = SL.startOfDay(now) + rec.interval * DAY;
      } else if (rec.due == null) {
        rec.interval = 1; rec.due = SL.startOfDay(now) + DAY;
      }
    } else {
      rec.lapses = (rec.lapses || 0) + 1;
      rec.ease = Math.max(1.3, rec.ease - 0.2);
      rec.interval = 0;
      rec.due = SL.startOfDay(now) + DAY; // review again tomorrow
      rec.grownOn = today;
    }
  }

  /* ---------- mistakes ---------- */
  function snapshot(q) {
    return { id: q.id, s: q.s, u: q.u, tp: q.tp, type: q.type, tag: q.tag, d: q.d, q: q.q, o: q.o, a: q.a, e: q.e, svg: q.svg, points: q.points, rubric: q.rubric, refSvg: q.refSvg, src: q.src };
  }
  function addMistakeRaw(q, myAns, now) {
    var m = SL.store.mistakes[q.id];
    if (!m) {
      m = SL.store.mistakes[q.id] = { id: q.id, q: snapshot(q), count: 0, first: now, wrongAnswers: [], mastered: false, rightStreak: 0, next: now, interval: 0 };
    }
    m.count++;
    m.last = now;
    m.mastered = false;
    m.rightStreak = 0;
    m.interval = 0;
    m.next = now;
    if (myAns != null && myAns !== '') {
      m.wrongAnswers.push({ a: String(myAns).slice(0, 400), ts: now });
      if (m.wrongAnswers.length > 10) m.wrongAnswers = m.wrongAnswers.slice(-10);
    }
    return m;
  }
  var M_STEPS = [1, 3, 7, 14, 30];
  function mistakeRight(m, now) {
    m.rightStreak = (m.rightStreak || 0) + 1;
    m.interval = M_STEPS[Math.min(M_STEPS.length - 1, m.rightStreak - 1)];
    m.next = SL.startOfDay(now) + m.interval * DAY;
    if (m.rightStreak >= 3 && !m.mastered) { m.mastered = true; m.masteredAt = now; return true; }
    return false;
  }
  SL.mistakeList = function () {
    return Object.keys(SL.store.mistakes).map(function (k) { return SL.store.mistakes[k]; });
  };
  SL.setMistakeMastered = function (id, val) {
    var m = SL.store.mistakes[id]; if (!m) return;
    m.mastered = !!val; if (val) m.masteredAt = Date.now(); else { m.rightStreak = 0; m.next = Date.now(); }
    SL.save();
  };
  SL.deleteMistake = function (id) { delete SL.store.mistakes[id]; SL.save(); };
  SL.dueMistakes = function (now) {
    now = now || Date.now();
    var end = SL.startOfDay(now) + DAY;
    return SL.mistakeList().filter(function (m) { return !m.mastered && (m.next || 0) < end; });
  };
  SL.dueTopics = function (now) {
    now = now || Date.now();
    var end = SL.startOfDay(now) + DAY;
    var out = [];
    Object.keys(SL.store.topics).forEach(function (k) {
      var r = SL.store.topics[k];
      if (r.due != null && r.due < end) out.push({ key: k, rec: r, m: SL.mastery(r, now) });
    });
    out.sort(function (a, b) { return (a.m || 0) - (b.m || 0); });
    return out;
  };

  /* ---------- record an attempt ---------- */
  /**
   * q: normalized question; correct: bool; info: {ms, mode, answer (text), noMistake}
   * returns {events: [...]} (achievements unlocked, mistake mastered, etc.)
   */
  SL.record = function (q, correct, info) {
    info = info || {};
    var st = SL.store, now = Date.now();
    var key = SL.topicKey(q.u, q.tp);
    st.attempts.push({ q: q.id, s: q.s, u: q.u, tp: q.tp, d: q.d, c: correct ? 1 : 0, ts: now, ms: Math.min(info.ms || 0, 30 * 60000), m: info.mode || 'practice', ty: q.type });
    var rec = st.topics[key] || (st.topics[key] = { n: 0, right: 0, recent: [], days: [], first: now });
    rec.n++; if (correct) rec.right++;
    rec.recent.push([now, correct ? 1 : 0, q.d]);
    if (rec.recent.length > 20) rec.recent = rec.recent.slice(-20);
    var dk = SL.dayKey(now);
    if (rec.days.indexOf(dk) === -1) { rec.days.push(dk); if (rec.days.length > 30) rec.days = rec.days.slice(-30); }
    var before = SL.mastery(rec, now);
    rec.last = now;
    updateTopicSrs(rec, correct, now);
    var events = [];
    var m = st.mistakes[q.id];
    if (!correct && !info.noMistake) addMistakeRaw(q, info.answer, now);
    else if (correct && m && !m.mastered) { if (mistakeRight(m, now)) events.push({ type: 'mistakeMastered', id: q.id }); }
    var after = SL.mastery(rec, now);
    if ((before == null || before < 85) && after >= 85) events.push({ type: 'topicMastered', key: key });
    events = events.concat(SL.checkAchievements());
    SL.save();
    return { events: events, mastery: after, key: key };
  };

  /* ---------- sessions log ---------- */
  SL.logSession = function (sess) {
    var n = 0, right = 0, ms = 0;
    (sess.answers || []).forEach(function (a) { if (a && a.graded) { n++; if (a.c) right++; ms += a.ms || 0; } });
    if (!n) return;
    SL.store.sessions.push({ id: sess.id, mode: sess.mode, s: sess.s, start: sess.startedAt, end: Date.now(), n: n, right: right, ms: ms });
    SL.save();
  };

  /* ---------- analytics helpers ---------- */
  SL.stats = function (filter) {
    var a = SL.store.attempts.filter(function (x) { return !filter || filter(x); });
    var n = a.length, right = 0, ms = 0, msN = 0;
    a.forEach(function (x) { if (x.c) right++; if (x.ms > 0 && x.ty === 'mcq') { ms += x.ms; msN++; } });
    return { n: n, right: right, acc: n ? Math.round(right / n * 100) : null, avgMs: msN ? Math.round(ms / msN) : null };
  };
  SL.dailyCounts = function (days) {
    var out = [], today = SL.startOfDay();
    var map = {};
    SL.store.attempts.forEach(function (x) { var k = SL.dayKey(x.ts); var r = map[k] || (map[k] = { n: 0, right: 0, wrong: 0 }); r.n++; if (x.c) r.right++; else r.wrong++; });
    for (var i = days - 1; i >= 0; i--) {
      var ts = today - i * DAY, k = SL.dayKey(ts);
      out.push({ day: k, ts: ts, n: (map[k] || {}).n || 0, right: (map[k] || {}).right || 0, wrong: (map[k] || {}).wrong || 0 });
    }
    return out;
  };
  SL.studyStreak = function () {
    var set = {};
    SL.store.attempts.forEach(function (x) { set[SL.dayKey(x.ts)] = 1; });
    var streak = 0, d = SL.startOfDay();
    if (!set[SL.dayKey(d)]) d -= DAY; // today not yet studied: count up to yesterday
    while (set[SL.dayKey(d)]) { streak++; d -= DAY; }
    return streak;
  };
  SL.todayCount = function () {
    var start = SL.startOfDay();
    return SL.store.attempts.filter(function (x) { return x.ts >= start; }).length;
  };
  SL.weakTopics = function (limit, sid) {
    var out = [];
    Object.keys(SL.store.topics).forEach(function (k) {
      var p = SL.parseTopicKey(k);
      var s = SL.subjectOfUnit(p.u);
      if (!s || (sid && s.id !== sid)) return;
      var rec = SL.store.topics[k];
      if (rec.n < 2) return;
      var m = SL.mastery(rec);
      if (m < 70) out.push({ key: k, u: p.u, tp: p.tp, s: s.id, m: m, n: rec.n });
    });
    out.sort(function (a, b) { return a.m - b.m; });
    return out.slice(0, limit || 5);
  };

  /* ---------- adaptive selection ---------- */
  SL.Adaptive = {
    // session.adapt: {level: {topicKey: 1..4}, wrongRun: {key:n}, rightRun: {key:n}, help: null|{key}}
    init: function (sess) {
      sess.adapt = { level: {}, wrongRun: {}, rightRun: {} };
    },
    levelFor: function (sess, key) {
      var lv = sess.adapt.level[key];
      if (lv) return lv;
      var m = SL.topicMastery(key);
      lv = m == null ? 2 : m < 40 ? 1 : m < 75 ? 2 : 3;
      sess.adapt.level[key] = lv;
      return lv;
    },
    pick: function (sess, pool) {
      var used = {};
      sess.items.forEach(function (q) { used[q.id] = 1; });
      var recentKeys = sess.items.slice(-2).map(function (q) { return SL.topicKey(q.u, q.tp); });
      var focus = sess.adapt.focus; // topic needing remediation
      var best = null, bestScore = -1e9;
      var dueSet = {}; SL.dueTopics().forEach(function (d) { dueSet[d.key] = 1; });
      pool.forEach(function (q) {
        if (used[q.id]) return;
        var key = SL.topicKey(q.u, q.tp);
        var m = SL.topicMastery(key);
        var need = m == null ? 0.65 : 1 - m / 100;
        var target = SL.Adaptive.levelFor(sess, key);
        var score = need * 2.2 - Math.abs(q.d - target) * 1.3 + Math.random() * 0.6;
        if (dueSet[key]) score += 0.4;
        if (focus && key === focus) score += 2.5;
        if (sess.focusTopics && sess.focusTopics.indexOf(key) !== -1) score += 2;
        if (recentKeys.indexOf(key) !== -1 && key !== focus) score -= 0.5;
        if (m != null && m >= 85 && q.d <= 2) score -= 1.5;     // skip easy items on mastered topics
        if (q.type !== 'mcq' && target < 4) score -= 1.2;      // FRQ/drawing only once the student is ready
        if (score > bestScore) { bestScore = score; best = q; }
      });
      return best;
    },
    // returns an optional coaching message {kind, key, text}
    after: function (sess, q, correct) {
      var A = sess.adapt, key = SL.topicKey(q.u, q.tp);
      var lv = SL.Adaptive.levelFor(sess, key);
      if (correct) {
        A.rightRun[key] = (A.rightRun[key] || 0) + 1; A.wrongRun[key] = 0;
        if (A.focus === key && A.rightRun[key] >= 2) { A.focus = null; }
        if (A.rightRun[key] >= 2 && lv < 4) {
          A.level[key] = lv + 1; A.rightRun[key] = 0;
          return { kind: 'up', key: key, level: lv + 1 };
        }
      } else {
        A.wrongRun[key] = (A.wrongRun[key] || 0) + 1; A.rightRun[key] = 0;
        if (A.wrongRun[key] >= 2) {
          A.level[key] = Math.max(1, lv - 1); A.wrongRun[key] = 0; A.focus = key;
          return { kind: 'down', key: key, level: A.level[key] };
        }
      }
      return null;
    }
  };

  /* ---------- achievements ---------- */
  var ACH = [
    { id: 'first', icon: '🎯', zh: '第一步', en: 'First step', dzh: '完成第一道题', den: 'Answer your first question' },
    { id: 'q100', icon: '📚', zh: '百题达成', en: '100 questions', dzh: '累计完成 100 道题', den: 'Answer 100 questions in total' },
    { id: 'q500', icon: '🏔️', zh: '五百题', en: '500 questions', dzh: '累计完成 500 道题', den: 'Answer 500 questions in total' },
    { id: 'run10', icon: '🔥', zh: '十连对', en: 'Ten in a row', dzh: '连续答对 10 道题', den: 'Get 10 correct in a row' },
    { id: 'days3', icon: '📅', zh: '三天坚持', en: '3-day streak', dzh: '连续 3 天学习', den: 'Study 3 days in a row' },
    { id: 'days7', icon: '🗓️', zh: '一周坚持', en: '7-day streak', dzh: '连续 7 天学习', den: 'Study 7 days in a row' },
    { id: 'unit', icon: '🧭', zh: '单元通关', en: 'Unit explorer', dzh: '一个单元的每个知识点都练习过至少 2 次', den: 'Practise every topic in a unit at least twice' },
    { id: 'master1', icon: '⭐', zh: '初次掌握', en: 'First mastery', dzh: '掌握一个知识点（掌握度 ≥ 85%）', den: 'Master a topic (mastery ≥ 85%)' },
    { id: 'master10', icon: '🌟', zh: '十个掌握', en: 'Ten mastered', dzh: '掌握 10 个知识点', den: 'Master 10 topics' },
    { id: 'exam1', icon: '📝', zh: '模考初体验', en: 'Mock exam', dzh: '完成一次模拟考试', den: 'Finish a mock exam' },
    { id: 'exam90', icon: '🏆', zh: '模考高分', en: 'Top score', dzh: '模拟考试得分 ≥ 90%', den: 'Score ≥ 90% on a mock exam' },
    { id: 'fix10', icon: '🛠️', zh: '错题清理', en: 'Mistake fixer', dzh: '把 10 道错题练到已掌握', den: 'Turn 10 mistakes into mastered items' },
    { id: 'frq1', icon: '✍️', zh: '动笔作答', en: 'Free responder', dzh: '完成第一道 FRQ 或画图题', den: 'Complete your first FRQ or drawing task' },
    { id: 'cards50', icon: '🃏', zh: '闪卡达人', en: 'Card shark', dzh: '复习 50 次闪卡', den: 'Review 50 flashcards' }
  ];
  SL.ACHIEVEMENTS = ACH;
  SL.checkAchievements = function () {
    var st = SL.store, got = st.achievements, out = [];
    var att = st.attempts;
    function unlock(id) { if (!got[id]) { got[id] = Date.now(); var a = ACH.filter(function (x) { return x.id === id; })[0]; out.push({ type: 'achievement', a: a }); } }
    if (att.length >= 1) unlock('first');
    if (att.length >= 100) unlock('q100');
    if (att.length >= 500) unlock('q500');
    var run = 0, bestRun = 0;
    for (var i = Math.max(0, att.length - 60); i < att.length; i++) { if (att[i].c) { run++; if (run > bestRun) bestRun = run; } else run = 0; }
    if (bestRun >= 10) unlock('run10');
    var sk = SL.studyStreak();
    if (sk >= 3) unlock('days3');
    if (sk >= 7) unlock('days7');
    if (!got.unit) {
      SL.SUBJECTS.forEach(function (s) { s.units.forEach(function (u) {
        if (u.topics.every(function (_, i) { var r = st.topics[SL.topicKey(u.id, i)]; return r && r.n >= 2; })) unlock('unit');
      }); });
    }
    var mastered = 0;
    Object.keys(st.topics).forEach(function (k) { if (SL.mastery(st.topics[k]) >= 85) mastered++; });
    if (mastered >= 1) unlock('master1');
    if (mastered >= 10) unlock('master10');
    if (st.exams.length) unlock('exam1');
    if (st.exams.some(function (e) { return e.pct >= 90; })) unlock('exam90');
    if (SL.mistakeList().filter(function (m) { return m.mastered; }).length >= 10) unlock('fix10');
    if (att.some(function (x) { return x.ty === 'frq' || x.ty === 'draw'; })) unlock('frq1');
    var cardReviews = 0; Object.keys(st.cards.srs).forEach(function (k) { cardReviews += st.cards.srs[k].reps || 0; });
    if (cardReviews >= 50) unlock('cards50');
    return out;
  };

  /* ---------- flashcards ---------- */
  SL.deckCards = function (unitId) {
    var cards = [];
    SL.BANK.forEach(function (q) {
      if (q.u !== unitId || q.type !== 'mcq' || (q.tag !== 'vocab' && q.tag !== 'concept')) return;
      cards.push({ id: 'c' + q.id, u: q.u, tp: q.tp, front: q.q, back: q.o[q.a], note: q.e, auto: true });
    });
    SL.store.cards.custom.forEach(function (c) { if (c.u === unitId) cards.push(c); });
    return cards;
  };
  SL.cardState = function (id) { return SL.store.cards.srs[id] || null; };
  SL.gradeCard = function (id, known) {
    var st = SL.store.cards.srs[id] || (SL.store.cards.srs[id] = { reps: 0, interval: 0, ease: 2.3, due: 0 });
    var now = Date.now();
    st.reps++;
    st.last = now;
    if (known) {
      st.interval = st.interval ? Math.min(90, Math.round(st.interval * st.ease)) : 1;
      st.ease = Math.min(2.8, st.ease + 0.05);
      st.fam = true;
    } else {
      st.interval = 0; st.ease = Math.max(1.3, st.ease - 0.2); st.fam = false;
    }
    st.due = known ? SL.startOfDay(now) + st.interval * DAY : now;
    SL.save();
    return SL.checkAchievements();
  };

  /* ---------- planner ---------- */
  SL.plannerToday = function () {
    var pl = SL.store.planner, today = SL.dayKey(), now = Date.now();
    // roll unfinished custom tasks forward (auto-adjust)
    pl.tasks.forEach(function (t) {
      if (!t.done && t.date < today) { t.rolled = (t.rolled || 0) + 1; t.date = today; }
    });
    var auto = [];
    var goal = pl.dailyGoal || 20, done = SL.todayCount();
    auto.push({ id: 'auto-goal', auto: true, text: SL.L('完成 ' + goal + ' 道练习题', 'Answer ' + goal + ' practice questions'), progress: Math.min(done, goal), total: goal, done: done >= goal, href: '#/practice' });
    var dueT = SL.dueTopics(now), dueM = SL.dueMistakes(now);
    if (dueT.length) auto.push({ id: 'auto-review', auto: true, text: SL.L('复习到期的 ' + dueT.length + ' 个知识点', 'Review ' + dueT.length + ' due topics'), done: false, href: '#/review' });
    if (dueM.length) auto.push({ id: 'auto-mistakes', auto: true, text: SL.L('重练 ' + dueM.length + ' 道到期错题', 'Retry ' + dueM.length + ' due mistakes'), done: false, href: '#/review' });
    var kbD = SL.kbDue ? SL.kbDue().length : 0;
    if (kbD) auto.push({ id: 'auto-kb', auto: true, text: SL.L('回忆复习 ' + kbD + ' 个知识点要点', 'Recall-review ' + kbD + ' topics'), done: false, href: '#/kb/review?mode=due' });
    var weak = SL.weakTopics(1)[0];
    if (weak) auto.push({ id: 'auto-weak', auto: true, text: SL.L('专项练习薄弱点：', 'Targeted practice: ') + SL.topicName(weak.u, weak.tp), done: false, href: '#/practice?topic=' + encodeURIComponent(weak.key) + '&adaptive=1' });
    // exam countdowns
    Object.keys(pl.exams).forEach(function (sid) {
      var d = pl.exams[sid]; if (!d) return;
      var days = Math.ceil((new Date(d + 'T00:00:00').getTime() - SL.startOfDay()) / DAY);
      if (days < 0) return;
      var sm = SL.subjectMastery(sid);
      var left = sm.total - Math.round(sm.avg / 100 * sm.total);
      var perDay = days > 0 ? Math.max(1, Math.ceil(left / days)) : left;
      auto.push({ id: 'auto-exam-' + sid, auto: true, exam: true, text: SL.L(SL.t(SL.subject(sid).name) + ' 考试还有 ' + days + ' 天 · 建议今天推进 ' + perDay + ' 个知识点', SL.t(SL.subject(sid).name) + ' exam in ' + days + ' days · aim for ' + perDay + ' topics today'), done: false, href: '#/course/' + sid });
    });
    var custom = pl.tasks.filter(function (t) { return t.date === today; });
    return { auto: auto, custom: custom };
  };
})();
