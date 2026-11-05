/* StudyLoop views — analytics, achievements, mock exams */
(function () {
  'use strict';
  var SL = window.SL;
  var esc = SL.esc, L = SL.L, t = SL.t, ui = SL.ui;

  function weekStart(ts) { var d = new Date(SL.startOfDay(ts)); var wd = (d.getDay() + 6) % 7; return d.getTime() - wd * SL.DAY; }

  /* ---------- analytics ---------- */
  var AN = { heat: 'geo' };
  function renderAnalytics() {
    var st = SL.store, att = st.attempts;
    if (!att.length) {
      return { title: L('学习分析', 'Analytics'), html: '<div class="card">' + ui.empty('📊', L('还没有学习数据', 'No learning data yet'),
        L('这里的所有图表都直接读取你的真实答题记录，不使用示例数据。完成一组练习后就能看到分析。', 'Every chart here reads your real answer history — no sample data. Finish a set to see your analysis.'),
        '<a class="btn primary" href="#/practice">' + esc(L('开始练习', 'Start practising')) + '</a>') + '</div>' };
    }
    var all = SL.stats();
    var days = {}; att.forEach(function (x) { days[SL.dayKey(x.ts)] = 1; });
    var html = '<div class="grid g4">' +
      tile(L('累计完成题目', 'Total questions'), all.n, '') +
      tile(L('整体正确率', 'Overall accuracy'), all.acc + '%', all.right + ' / ' + all.n) +
      tile(L('选择题平均用时', 'Avg time per MCQ'), all.avgMs ? SL.fmtDuration(all.avgMs) : '—', '') +
      tile(L('学习次数 · 天数', 'Sessions · days'), st.sessions.length + ' · ' + Object.keys(days).length, L('连续 ', 'Streak ') + SL.studyStreak() + L(' 天', ' d')) + '</div>';

    // subject accuracy + difficulty
    html += '<div class="grid g2 mt16"><div class="card"><div class="card-head"><h3>' + esc(L('各科正确率', 'Accuracy by course')) + '</h3><span class="xs faint">' + esc(L('副标：平均掌握度', 'sub: avg mastery')) + '</span></div>' +
      SL.chart.hbars(SL.SUBJECTS.map(function (s) { var x = SL.stats(function (a) { return a.s === s.id; }); return { label: t(s.name), value: x.acc, color: 'var(--c-' + s.id + ')', sub: x.n + L(' 题 · 掌握 ', ' q · mastery ') + SL.subjectMastery(s.id).avg + '%' }; })) + '</div>' +
      '<div class="card"><div class="card-head"><h3>' + esc(L('不同难度的表现', 'By difficulty')) + '</h3></div>' +
      SL.chart.hbars([1, 2, 3, 4].map(function (d) { var x = SL.stats(function (a) { return a.d === d; }); return { label: t(SL.DIFF[d]), value: x.acc, color: 'var(--c-main)', sub: x.n + L(' 题', ' q') }; })) + '</div></div>';

    // weekly trend (8 weeks)
    var ws = weekStart(Date.now()), weeks = [];
    for (var i = 7; i >= 0; i--) weeks.push(ws - i * 7 * SL.DAY);
    var wkN = weeks.map(function () { return 0; }), wkR = weeks.map(function () { return 0; });
    att.forEach(function (x) { var k = weeks.indexOf(weekStart(x.ts)); if (k !== -1) { wkN[k]++; if (x.c) wkR[k]++; } });
    var wkLabels = weeks.map(function (w) { var d = new Date(w); return (d.getMonth() + 1) + '/' + d.getDate(); });
    html += '<div class="grid g2 mt16"><div class="card"><div class="card-head"><h3>' + esc(L('每周学习量', 'Questions per week')) + '</h3></div>' +
      SL.chart.bars(weeks.map(function (w, k) { return { label: wkLabels[k], value: wkN[k], tip: L(wkLabels[k] + ' 起一周 · ', 'Week of ' + wkLabels[k] + ' · ') + wkN[k] + L(' 题', ' questions') }; }), { h: 180, aria: L('每周做题数', 'Questions per week') }) + '</div>' +
      '<div class="card"><div class="card-head"><h3>' + esc(L('每周正确率趋势', 'Weekly accuracy trend')) + '</h3></div>' +
      SL.chart.line(wkLabels, [{ name: L('正确率', 'Accuracy'), color: 'var(--c-main)', values: wkN.map(function (n, k) { return n ? Math.round(wkR[k] / n * 100) : null; }) }], { yMax: 100, unit: '%', h: 180, aria: L('每周正确率', 'Weekly accuracy') }) + '</div></div>';

    // daily activity 14 days
    var d14 = SL.dailyCounts(14);
    html += '<div class="card mt16"><div class="card-head"><h3>' + esc(L('最近 14 天学习活动', 'Daily activity, last 14 days')) + '</h3></div>' +
      SL.chart.bars(d14.map(function (d) { var dt = new Date(d.ts), lb = (dt.getMonth() + 1) + '/' + dt.getDate(); return { label: lb, value: d.n, tip: lb + ' · ' + d.n + L(' 题 · 正确 ', ' q · correct ') + d.right }; }), { h: 170 }) + '</div>';

    // mistake trend
    var newM = weeks.map(function () { return 0; }), fixed = weeks.map(function () { return 0; });
    SL.mistakeList().forEach(function (m) {
      var k = weeks.indexOf(weekStart(m.first)); if (k !== -1) newM[k]++;
      if (m.masteredAt) { var k2 = weeks.indexOf(weekStart(m.masteredAt)); if (k2 !== -1) fixed[k2]++; }
    });
    html += '<div class="card mt16"><div class="card-head"><h3>' + esc(L('错题变化', 'Mistake trend')) + '</h3><a class="link" href="#/mistakes">' + esc(L('错题本', 'Notebook')) + ' →</a></div>' +
      SL.chart.line(wkLabels, [
        { name: L('新增错题', 'New mistakes'), color: 'var(--c-bad)', values: newM },
        { name: L('攻克错题', 'Mastered'), color: 'var(--c-good)', values: fixed }
      ], { h: 180 }) + '</div>';

    // mastery heatmap
    var hs = SL.subject(AN.heat);
    html += '<div class="card mt16"><div class="card-head"><h3>' + esc(L('知识点掌握度热力图', 'Topic mastery heatmap')) + '</h3><div class="seg">' +
      SL.SUBJECTS.map(function (s) { return '<button class="' + (s.id === AN.heat ? 'on' : '') + '" data-act="anHeat" data-v="' + s.id + '">' + esc(t(s.name)) + '</button>'; }).join('') + '</div></div>' +
      '<div class="heat">' + hs.units.map(function (u, ui2) {
        return '<div class="heat-row"><span class="hl" title="' + esc(t(u.name)) + '">U' + (ui2 + 1) + ' ' + esc(t(u.name).replace(/^(Unit \d+ · |第.{1,3}单元 ?· ?)/, '')) + '</span>' +
          u.topics.map(function (tp, i) {
            var key = SL.topicKey(u.id, i), m = SL.topicMastery(key), rec = SL.topicRec(key);
            return '<a class="heat-cell ' + SL.chart.heatClass(m) + '" href="#/practice?topic=' + encodeURIComponent(key) + '&adaptive=1" data-tip="' + esc(t(tp) + ' · ' + (m == null ? L('未练习', 'not practised') : L('掌握度 ', 'mastery ') + m + '% · ' + rec.right + '/' + rec.n)) + '" aria-label="' + esc(t(tp) + ' ' + (m == null ? '' : m + '%')) + '" style="text-decoration:none">' + (m == null ? '·' : m) + '</a>';
          }).join('') + '</div>';
      }).join('') + '</div>' +
      '<div class="legend"><span><i style="background:var(--heat-0)"></i>&lt;25</span><span><i style="background:var(--heat-1)"></i>25–49</span><span><i style="background:var(--heat-2)"></i>50–69</span><span><i style="background:var(--heat-3)"></i>70–84</span><span><i style="background:var(--heat-4)"></i>≥85</span><span><i style="border:1px dashed var(--border)"></i>' + esc(L('未练习', 'not practised')) + '</span></div>' +
      '<details class="mt12"><summary class="small bold" style="cursor:pointer">' + esc(L('掌握度是怎么算的？', 'How is mastery calculated?')) + '</summary><p class="small muted mt8">' +
      esc(L('掌握度 ≠ 正确率。它综合了：① 最近作答结果（越近权重越高）；② 题目难度（难题答对权重更高）；③ 练习次数（次数少时会打折，至少要多次作答才可能达到「已掌握」）；④ 时间跨度与遗忘（隔得越久未复习会逐渐下降，分多天练习的知识点下降更慢）。',
        'Mastery is not raw accuracy. It combines: (1) recent results, weighted toward the latest; (2) difficulty — hard items count more; (3) number of attempts — few attempts are discounted, so "mastered" needs repeated evidence; (4) time and forgetting — mastery decays without review, more slowly for topics practised across several days.')) + '</p></details>' +
      '<details class="mt8"><summary class="small bold" style="cursor:pointer">' + esc(L('以表格查看', 'View as table')) + '</summary><div class="scroll-x mt8"><table class="tbl"><thead><tr><th>' + esc(L('知识点', 'Topic')) + '</th><th>' + esc(L('掌握度', 'Mastery')) + '</th><th>' + esc(L('正确/次数', 'Right/attempts')) + '</th><th>' + esc(L('下次复习', 'Next review')) + '</th></tr></thead><tbody>' +
      hs.units.map(function (u) { return u.topics.map(function (tp, i) { var key = SL.topicKey(u.id, i), rec = SL.topicRec(key); if (!rec) return ''; return '<tr><td>' + esc(t(tp)) + '</td><td>' + SL.topicMastery(key) + '%</td><td>' + rec.right + '/' + rec.n + '</td><td>' + (rec.due ? esc(SL.dayKey(rec.due)) : '—') + '</td></tr>'; }).join(''); }).join('') +
      '</tbody></table></div></details></div>';

    // weakest topics
    var weak = SL.weakTopics(8);
    html += '<div class="card mt16"><div class="card-head"><h3>' + esc(L('需要加强的知识点', 'Topics to strengthen')) + '</h3></div>' +
      (weak.length ? SL.chart.hbars(weak.map(function (w) { return { label: SL.topicName(w.u, w.tp), value: w.m, color: 'var(--c-' + w.s + ')', sub: w.n + L(' 次', ' tries') }; })) : '<p class="small muted">' + esc(L('暂未发现薄弱知识点（需要至少 2 次作答）。', 'No weak topics yet (needs ≥ 2 attempts).')) + '</p>') + '</div>';

    return { title: L('学习分析', 'Learning analytics'), html: html };
  }
  function tile(label, value, sub) { return '<div class="card stat"><span class="label">' + esc(label) + '</span><span class="value">' + esc(value) + '</span>' + (sub ? '<span class="sub">' + esc(sub) + '</span>' : '') + '</div>'; }
  SL.act('anHeat', function (el) { AN.heat = el.getAttribute('data-v'); SL.rerender(); });

  /* ---------- achievements ---------- */
  function renderAchievements() {
    var got = SL.store.achievements;
    SL.checkAchievements(); SL.save();
    var n = Object.keys(got).length;
    var html = '<p class="small muted">' + esc(L('成就只奖励真实的学习行为（坚持、掌握、复习），不设排行榜。', 'Achievements reward real learning behaviour — consistency, mastery, review. No leaderboards.')) + ' <b>' + n + ' / ' + SL.ACHIEVEMENTS.length + '</b></p>' +
      '<div class="grid g3 mt16">' + SL.ACHIEVEMENTS.map(function (a) {
        var on = !!got[a.id];
        return '<div class="ach' + (on ? '' : ' locked') + '"><span class="ai" aria-hidden="true">' + a.icon + '</span><div><h4>' + esc(L(a.zh, a.en)) + '</h4><p>' + esc(L(a.dzh, a.den)) + '</p>' + (on ? '<p class="xs" style="color:var(--good)">' + esc(L('解锁于 ', 'Unlocked ')) + esc(new Date(got[a.id]).toLocaleDateString()) + '</p>' : '') + '</div></div>';
      }).join('') + '</div>';
    return { title: L('学习成就', 'Achievements'), html: html };
  }

  /* ---------- mock exams ---------- */
  var EX = null;
  function renderExamHome(m, q) {
    if (!EX || q.s) EX = { s: q.s && SL.subject(q.s) ? q.s : (SL.store.settings.lastSubject || 'geo'), units: [], n: 20, min: 30 };
    if (q.s) history.replaceState(null, '', '#/exam');
    var s = SL.subject(EX.s);
    var poolN = SL.buildPool({ subject: EX.s, units: EX.units, types: ['mcq'], genPer: 1 }).length;
    var html = '';
    if (SL.store.active && SL.store.active.mode === 'exam') html += '<div class="notice info"><b>' + esc(L('有一场考试进行中。', 'An exam is in progress. ')) + '</b> <a href="#/exam/run">' + esc(L('继续 →', 'Resume →')) + '</a></div>';
    html += '<div class="grid g2 mt16" style="align-items:start"><div class="card"><div class="card-head"><h3>' + esc(L('新建模拟考试', 'New mock exam')) + '</h3></div>' +
      '<div class="field"><span class="lbl">' + esc(L('科目', 'Course')) + '</span><div class="pill-wrap">' + SL.SUBJECTS.map(function (x) { return '<button class="pill' + (x.id === EX.s ? ' on' : '') + '" data-act="exS" data-v="' + x.id + '">' + esc(t(x.name)) + '</button>'; }).join('') + '</div></div>' +
      '<div class="field mt16"><span class="lbl">' + esc(L('考试范围（不选 = 全部单元）', 'Scope (none = all units)')) + '</span><div class="pill-wrap">' + s.units.map(function (u, i) { return '<button class="pill' + (EX.units.indexOf(u.id) !== -1 ? ' on' : '') + '" data-act="exU" data-v="' + u.id + '">U' + (i + 1) + ' ' + esc(t(u.name).replace(/^(Unit \d+ · |第.{1,3}单元 ?· ?)/, '')) + '</button>'; }).join('') + '</div></div>' +
      '<div class="field mt16"><label for="exN">' + esc(L('题目数量', 'Questions')) + '</label><div class="range-row"><input id="exN" type="range" min="5" max="60" value="' + EX.n + '" data-input="exN"><output id="exNo">' + EX.n + '</output></div></div>' +
      '<div class="field mt16"><label for="exT">' + esc(L('考试时间（分钟，0 = 不限时）', 'Time limit (minutes, 0 = untimed)')) + '</label><div class="range-row"><input id="exT" type="range" min="0" max="120" step="5" value="' + EX.min + '" data-input="exT"><output id="exTo">' + EX.min + '</output></div><span class="hint">' + esc(L('AP 选择题节奏参考：约 1–1.3 分钟/题。', 'AP MCQ pacing: about 1–1.3 min per question.')) + '</span></div>' +
      '<p class="small muted mt12">' + esc(L('考试中不显示对错和解析；交卷后自动评分并生成报告。范围内可用：' + poolN + ' 道（含生成题）。', 'No feedback during the exam; it is scored and reported on submit. Available in scope: ' + poolN + ' items (incl. generated).')) + '</p>' +
      '<button class="btn primary block mt12" data-act="exStart" data-testid="button-exam-start">' + esc(L('开始考试', 'Start exam')) + '</button></div>';
    var hist = SL.store.exams.slice().reverse();
    html += '<div class="card"><div class="card-head"><h3>' + esc(L('考试记录', 'Exam history')) + '</h3></div>' +
      (hist.length ? '<div class="list">' + hist.map(function (e) {
        return '<a class="list-row" href="#/exam/report/' + e.id + '"><span class="subj-dot" style="background:var(--c-' + e.s + ')"></span><div class="grow"><div class="title">' + esc(e.title) + '</div><div class="meta">' + esc(new Date(e.endedAt).toLocaleString()) + ' · ' + SL.fmtDuration(e.endedAt - e.startedAt) + '</div></div><span class="chip ' + (e.pct >= 80 ? 'good' : e.pct >= 60 ? 'warn' : 'bad') + '">' + e.pct + '%</span></a>';
      }).join('') + '</div>' : ui.empty('📝', L('还没有考试记录', 'No exams yet'), L('完成第一场模拟考试后，报告会保存在这里。', 'Your reports are saved here after each exam.'))) + '</div></div>';
    return { title: L('模拟考试', 'Mock exams'), accent: EX.s, html: html, keepScroll: true };
  }
  SL.act('exS', function (el) { EX.s = el.getAttribute('data-v'); EX.units = []; SL.rerender(); });
  SL.act('exU', function (el) { var v = el.getAttribute('data-v'), i = EX.units.indexOf(v); if (i === -1) EX.units.push(v); else EX.units.splice(i, 1); SL.rerender(); });
  SL.act('exN', function (el) { EX.n = parseInt(el.value, 10); document.getElementById('exNo').textContent = EX.n; });
  SL.act('exT', function (el) { EX.min = parseInt(el.value, 10); document.getElementById('exTo').textContent = EX.min; });
  SL.act('exStart', function () {
    var pool = SL.buildPool({ subject: EX.s, units: EX.units, types: ['mcq'], genPer: 2 });
    var items = SL.pickDiverse(pool, EX.n);
    if (!items.length) { SL.toast(L('范围内没有题目', 'No questions in scope'), 'bad'); return; }
    var s = SL.subject(EX.s);
    var title = t(s.name) + ' · ' + (EX.units.length ? EX.units.length + L(' 个单元', ' units') : L('全部单元', 'all units')) + ' · ' + items.length + L(' 题', ' q');
    SL.startSession({ mode: 'exam', title: title, s: EX.s, units: EX.units.slice(), items: items, count: items.length, timeLimit: EX.min * 60 });
  });

  function renderExamReport(m) {
    var e = SL.store.exams.filter(function (x) { return x.id === m[1]; })[0];
    if (!e) return null;
    var topics = {}, diffs = {};
    e.items.forEach(function (x) {
      var k = SL.topicKey(x.q.u, x.q.tp); var o = topics[k] || (topics[k] = { n: 0, r: 0 }); o.n++; if (x.c) o.r++;
      var d = diffs[x.q.d] || (diffs[x.q.d] = { n: 0, r: 0 }); d.n++; if (x.c) d.r++;
    });
    var blank = e.items.filter(function (x) { return x.chosen == null; }).length;
    var ms = 0; e.items.forEach(function (x) { ms += x.ms || 0; });
    var html = '<div class="grid g4">' + tile(L('得分', 'Score'), e.right + ' / ' + e.n, e.pct + '%') + tile(L('用时', 'Time used'), SL.fmtDuration(e.endedAt - e.startedAt), e.timeLimit ? L('限时 ', 'Limit ') + Math.round(e.timeLimit / 60) + L(' 分钟', ' min') : L('不限时', 'Untimed')) +
      tile(L('平均每题', 'Per question'), e.n ? SL.fmtDuration(ms / e.n) : '—', '') + tile(L('未作答', 'Blank'), blank, '') + '</div>';
    html += '<div class="grid g2 mt16"><div class="card"><div class="card-head"><h3>' + esc(L('知识点得分', 'By topic')) + '</h3></div>' +
      SL.chart.hbars(Object.keys(topics).map(function (k) { var p = SL.parseTopicKey(k); return { label: SL.topicName(p.u, p.tp), value: Math.round(topics[k].r / topics[k].n * 100), color: 'var(--c-' + e.s + ')', sub: topics[k].r + '/' + topics[k].n }; }).sort(function (a, b) { return a.value - b.value; })) + '</div>' +
      '<div class="card"><div class="card-head"><h3>' + esc(L('难度得分', 'By difficulty')) + '</h3></div>' + SL.chart.hbars(Object.keys(diffs).map(function (d) { return { label: t(SL.DIFF[d]), value: Math.round(diffs[d].r / diffs[d].n * 100), color: 'var(--c-main)', sub: diffs[d].r + '/' + diffs[d].n }; })) +
      '<div class="row mt16">' + (e.right < e.n ? '<button class="btn primary" data-act="exRetry" data-id="' + e.id + '">' + esc(L('重练本次错题', 'Retry wrong answers')) + '</button>' : '') + '<a class="btn" href="#/exam">' + esc(L('再考一次', 'New exam')) + '</a></div></div></div>';
    html += '<h3 class="mt24" style="font-size:16px;margin-bottom:12px">' + esc(L('逐题解析', 'Question review')) + '</h3><div class="stack">' + e.items.map(function (x, i) {
      var q = x.q, perm = x.perm || q.o.map(function (_, k) { return k; });
      return '<details class="card pad-sm"' + (x.c ? '' : ' open') + '><summary style="cursor:pointer"><span class="chip ' + (x.c ? 'good' : 'bad') + '">' + (i + 1) + ' ' + (x.c ? '✓' : x.chosen == null ? '—' : '✗') + '</span> <span class="small bold">' + esc(t(q.q).slice(0, 120)) + '</span></summary><div class="mt12">' +
        (q.svg ? '<div class="q-figure">' + q.svg + '</div>' : '') + '<div class="stack" style="gap:6px">' + perm.map(function (orig, j) {
          var r = orig === q.a, me = orig === x.chosen;
          return '<div class="small" style="padding:8px 10px;border-radius:8px;border:1px solid var(--border);' + (r ? 'background:var(--good-soft);border-color:var(--good)' : me ? 'background:var(--bad-soft);border-color:var(--bad)' : '') + '"><b>' + String.fromCharCode(65 + j) + '.</b> ' + esc(t(q.o[orig])) + (me ? ' <b class="xs">(' + esc(L('你的选择', 'your answer')) + ')</b>' : '') + '</div>';
        }).join('') + '</div>' + (q.e ? '<div class="feedback mt12 small"><b>' + esc(L('解析：', 'Explanation: ')) + '</b>' + esc(t(q.e)) + '</div>' : '') +
        '<div class="xs faint mt8">' + esc(SL.topicName(q.u, q.tp)) + ' · ' + esc(t(SL.DIFF[q.d])) + ' · ' + SL.fmtDuration(x.ms || 0) + '</div></div></details>';
    }).join('') + '</div>';
    return { title: L('考试报告', 'Exam report'), back: '#/exam', accent: e.s, html: html };
  }
  SL.act('exRetry', function (el) {
    var e = SL.store.exams.filter(function (x) { return x.id === el.getAttribute('data-id'); })[0]; if (!e) return;
    var items = e.items.filter(function (x) { return !x.c; }).map(function (x) { return SL.byId(x.q.id) || SL.normalize(x.q, { s: x.q.s, u: x.q.u, tp: x.q.tp, src: 'bank' }); }).filter(Boolean);
    SL.startSession({ mode: 'mistakes', title: L('模考错题重练', 'Exam retry'), items: items, count: items.length });
  });

  SL.route(/^\/analytics$/, renderAnalytics);
  SL.route(/^\/achievements$/, renderAchievements);
  SL.route(/^\/exam$/, renderExamHome);
  SL.route(/^\/exam\/report\/(\w+)$/, renderExamReport);
})();
