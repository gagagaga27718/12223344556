/* StudyLoop views — dashboard, course pages, practice setup, more */
(function () {
  'use strict';
  var SL = window.SL;
  var esc = SL.esc, L = SL.L, t = SL.t, I = SL.ICON, ui = SL.ui;

  var INTRO = {
    geo: { zh: '理解人口、文化、政治、农业、城市与经济发展的空间格局。AP 考试包含选择题与 FRQ，重点考查概念应用与地图/数据分析。', en: 'Spatial patterns of population, culture, politics, agriculture, cities and development. The AP exam mixes MCQ and FRQ, stressing applied concepts and map/data analysis.' },
    bio: { zh: '从细胞结构、膜运输、生物大分子到遗传、能量代谢、进化与生态。重点是理解结构与功能、读懂图示和实验数据。', en: 'From cells, membranes and macromolecules to genetics, energy, evolution and ecology — with an emphasis on structure–function, diagrams and experimental data.' },
    precalc: { zh: '函数及其图像、多项式与有理函数、指数与对数、三角、矩阵、数列与圆锥曲线。重点是分步推理和读图。', en: 'Functions and graphs, polynomial & rational, exponential & log, trigonometry, matrices, sequences and conics — built on step-by-step reasoning and graph reading.' }
  };

  function subjColor(id) { return 'var(--c-' + id + ')'; }

  /* ---------- dashboard ---------- */
  function renderDashboard() {
    var st = SL.store;
    var hour = new Date().getHours();
    var greet = hour < 12 ? L('早上好', 'Good morning') : hour < 18 ? L('下午好', 'Good afternoon') : L('晚上好', 'Good evening');
    var today = SL.todayCount(), goal = st.planner.dailyGoal || 20;
    var streak = SL.studyStreak();
    var dueT = SL.dueTopics(), dueM = SL.dueMistakes();
    var active = st.active;
    var first = !st.attempts.length;

    var html = '<div class="card welcome"><div class="row between" style="align-items:flex-start"><div class="grow">' +
      '<h2>' + esc(greet) + (first ? esc(L('，欢迎来到 StudyLoop', ', welcome to StudyLoop')) : '') + '</h2>' +
      '<p>' + esc(first ? L('先做一组自适应练习，系统会根据你的表现建立每个知识点的掌握度。', 'Start with an adaptive set — StudyLoop will build a mastery profile from how you answer.') :
        L('今天已完成 ' + today + ' / ' + goal + ' 题 · 连续学习 ' + streak + ' 天' + (dueT.length + dueM.length ? ' · ' + (dueT.length + dueM.length) + ' 项待复习' : ''), 'Today ' + today + ' / ' + goal + ' questions · ' + streak + '-day streak' + (dueT.length + dueM.length ? ' · ' + (dueT.length + dueM.length) + ' items due' : ''))) + '</p>' +
      '<div class="row mt16">' +
      (active ? '<a class="btn solid" href="' + (active.mode === 'exam' ? '#/exam/run' : '#/quiz') + '">' + esc(L('继续上次的', 'Resume ')) + esc(SL.modeLabel(active.mode)) + ' →</a>' :
        '<button class="btn solid" data-act="quickAdaptive">' + esc(L('开始今日智能练习', 'Start today\'s smart practice')) + ' →</button>') +
      (dueT.length + dueM.length ? '<a class="btn" href="#/review">' + esc(L('今日复习', 'Review')) + ' (' + (dueT.length + dueM.length) + ')</a>' : '') +
      '</div></div>' +
      '<div class="hide-mobile">' + SL.chart.ring(Math.min(100, Math.round(today / goal * 100)), 96, '#fff', L('今日目标', 'Daily goal')).replace('stroke="var(--surface-3)"', 'stroke="rgba(255,255,255,.25)"') + '</div>' +
      '</div></div>';

    // courses
    html += '<div class="grid g3 mt16">' + SL.SUBJECTS.map(function (s) {
      var sm = SL.subjectMastery(s.id);
      var sst = SL.stats(function (x) { return x.s === s.id; });
      return '<a class="card subj-card" data-accent="' + s.id + '" href="#/course/' + s.id + '" data-testid="card-subject-' + s.id + '">' +
        '<div class="top">' + ui.subjIcon(s) + '<div class="grow"><h3>' + esc(t(s.name)) + '</h3><div class="tag">' + esc(s.units.length + L(' 个单元', ' units')) + ' · ' + esc(sm.started + '/' + sm.total + L(' 知识点已开始', ' topics started')) + '</div></div></div>' +
        '<div class="row between small"><span class="muted">' + esc(L('平均掌握度', 'Avg mastery')) + '</span><b>' + sm.avg + '%</b></div>' +
        '<div class="bar mt8"><i style="width:' + sm.avg + '%"></i></div>' +
        '<div class="row between xs faint mt8"><span>' + esc(L('已做 ', 'Answered ')) + sst.n + '</span><span>' + esc(L('正确率 ', 'Accuracy ')) + (sst.acc == null ? '—' : sst.acc + '%') + '</span></div></a>';
    }).join('') + '</div>';

    html += '<div class="dash-grid mt16"><div class="stack">';

    // weekly stats
    var days = SL.dailyCounts(7);
    var wk = SL.stats(function (x) { return x.ts >= SL.startOfDay() - 6 * SL.DAY; });
    var wkMs = 0; st.attempts.forEach(function (x) { if (x.ts >= SL.startOfDay() - 6 * SL.DAY) wkMs += x.ms || 0; });
    html += '<div class="card"><div class="card-head"><h3>' + esc(L('本周学习统计', 'This week')) + '</h3><a class="link" href="#/analytics">' + esc(L('详细分析', 'Full analytics')) + ' →</a></div>' +
      '<div class="grid g3" style="gap:12px;margin-bottom:12px">' +
      '<div class="stat"><span class="label">' + esc(L('完成题目', 'Questions')) + '</span><span class="value">' + wk.n + '</span></div>' +
      '<div class="stat"><span class="label">' + esc(L('正确率', 'Accuracy')) + '</span><span class="value">' + (wk.acc == null ? '—' : wk.acc + '%') + '</span></div>' +
      '<div class="stat"><span class="label">' + esc(L('答题用时', 'Time on task')) + '</span><span class="value">' + (wkMs ? SL.fmtDuration(wkMs) : '—') + '</span></div></div>' +
      (wk.n ? SL.chart.bars(days.map(function (d) {
        var dt = new Date(d.ts); var lbl = (dt.getMonth() + 1) + '/' + dt.getDate();
        return { label: lbl, value: d.n, tip: lbl + ' · ' + d.n + L(' 题', ' questions') + (d.n ? ' · ' + L('正确 ', 'correct ') + d.right : '') };
      }), { h: 170, aria: L('最近 7 天每日做题数', 'Questions per day, last 7 days') }) : ui.empty('📈', L('本周还没有学习记录', 'No activity this week yet'), L('做几道题后，这里会显示你每天的学习量。', 'Answer a few questions and your daily activity appears here.'))) +
      '</div>';

    // weak areas
    var weak = SL.weakTopics(5);
    html += '<div class="card"><div class="card-head"><h3>' + esc(L('薄弱知识点', 'Weak areas')) + '</h3><span class="xs faint">' + esc(L('至少练过 2 次且掌握度 < 70%', '≥ 2 attempts and mastery < 70%')) + '</span></div>' +
      (weak.length ? '<div class="list">' + weak.map(function (w) {
        return '<div class="list-row"><span class="subj-dot" style="background:' + subjColor(w.s) + '"></span><div class="grow"><div class="title">' + esc(SL.topicName(w.u, w.tp)) + '</div><div class="meta">' + esc(t(SL.unit(w.u).name)) + ' · ' + w.n + L(' 次练习', ' attempts') + '</div></div>' +
          ui.lvlChip(w.m) + '<a class="btn sm" href="#/practice?topic=' + encodeURIComponent(w.key) + '&adaptive=1">' + esc(L('专项练', 'Drill')) + '</a></div>';
      }).join('') + '</div>' : ui.empty('🧭', L('还没有发现薄弱点', 'No weak areas found yet'), L('系统需要每个知识点至少 2 次作答才会判断，不会只凭一道题下结论。', 'StudyLoop needs at least two attempts per topic before judging — never just one question.'))) + '</div>';

    // recent activity
    var acts = st.sessions.slice(-4).reverse().map(function (s) { return { ts: s.end, title: SL.modeLabel(s.mode) + (s.s ? ' · ' + t(SL.subject(s.s).name) : ''), meta: s.right + '/' + s.n + ' · ' + SL.fmtDuration(s.end - s.start) }; });
    html += '<div class="card"><div class="card-head"><h3>' + esc(L('最近学习记录', 'Recent activity')) + '</h3></div>' +
      (acts.length ? '<div class="list">' + acts.map(function (a) { return '<div class="list-row"><div class="grow"><div class="title">' + esc(a.title) + '</div><div class="meta">' + esc(a.meta) + '</div></div><span class="xs faint">' + esc(ui.relTime(a.ts)) + '</span></div>'; }).join('') + '</div>' :
        ui.empty('🕘', L('暂无记录', 'Nothing yet'), L('完成一次练习后会出现在这里。', 'Finished sessions show up here.'))) + '</div>';

    html += '</div><div class="stack">';

    // today's tasks
    var plan = SL.plannerToday();
    html += '<div class="card"><div class="card-head"><h3>' + esc(L('今日任务', "Today's tasks")) + '</h3><a class="link" href="#/planner">' + esc(L('学习计划', 'Planner')) + ' →</a></div>' + SL.renderTaskList(plan, 5) + '</div>';

    // quick actions
    var qa = [
      ['#/practice', 'target', L('自定义练习', 'Custom practice')], ['#/exam', 'clock', L('模拟考试', 'Mock exam')],
      ['#/flashcards', 'cards', L('闪卡', 'Flashcards')], ['#/tutor', 'bot', 'AI Tutor'],
      ['#/kb', 'book', L('知识库', 'Knowledge base')], ['#/capture', 'camera', L('录入错题', 'Add a mistake')]
    ];
    html += '<div class="card"><div class="card-head"><h3>' + esc(L('快速操作', 'Quick actions')) + '</h3></div><div class="grid g2" style="gap:8px">' +
      qa.map(function (x) { return '<a class="btn" href="' + x[0] + '" style="justify-content:flex-start">' + I[x[1]] + esc(x[2]) + '</a>'; }).join('') + '</div></div>';

    // achievements teaser
    var got = Object.keys(st.achievements).length;
    html += '<a class="card" href="#/achievements"><div class="row between"><div><div class="bold">' + esc(L('学习成就', 'Achievements')) + '</div><div class="small muted">' + got + ' / ' + SL.ACHIEVEMENTS.length + esc(L(' 已解锁', ' unlocked')) + '</div></div><span style="font-size:24px">🏅</span></div>' +
      '<div class="bar thin mt12"><i style="width:' + Math.round(got / SL.ACHIEVEMENTS.length * 100) + '%"></i></div></a>';

    html += '</div></div>';
    return { title: L('学习概览', 'Overview'), html: html };
  }

  SL.renderTaskList = function (plan, limit) {
    var rows = plan.auto.concat(plan.custom);
    if (!rows.length) return ui.empty('✅', L('今天没有任务', 'Nothing planned'), '');
    return '<div>' + rows.slice(0, limit || 99).map(function (tk) {
      var isAuto = tk.auto;
      var check = isAuto ? '<span class="check' + (tk.done ? ' on' : '') + '" aria-hidden="true">' + (tk.done ? I.check : '') + '</span>' :
        '<button class="check' + (tk.done ? ' on' : '') + '" data-act="toggleTask" data-id="' + esc(tk.id) + '" aria-label="' + esc(L('标记完成', 'Toggle done')) + '">' + (tk.done ? I.check : '') + '</button>';
      return '<div class="task' + (tk.done ? ' done' : '') + '">' + check + '<div class="grow"><div class="ttl small bold">' + esc(tk.text) + '</div>' +
        (tk.total ? '<div class="bar thin mt8"><i class="good" style="width:' + Math.round(tk.progress / tk.total * 100) + '%"></i></div>' : '') +
        (tk.rolled ? '<div class="xs faint">' + esc(L('已顺延 ' + tk.rolled + ' 天', 'Rolled over ' + tk.rolled + ' day(s)')) + '</div>' : '') + '</div>' +
        (tk.href && !tk.done ? '<a class="btn sm ghost" href="' + tk.href + '">' + esc(L('去完成', 'Go')) + '</a>' : '') + '</div>';
    }).join('') + '</div>';
  };
  SL.act('toggleTask', function (el) {
    var id = el.getAttribute('data-id');
    var tk = SL.store.planner.tasks.filter(function (x) { return x.id === id; })[0];
    if (tk) { tk.done = !tk.done; tk.doneAt = tk.done ? Date.now() : null; SL.save(); SL.rerender(); if (tk.done) SL.toast(L('任务完成 ✓', 'Task done ✓')); }
  });
  SL.act('quickAdaptive', function () {
    // whole-platform adaptive set focused on weak/due topics
    SL.startDaily();
  });

  // daily smart practice: focus topics from entered mistakes first, otherwise weakest/due topics
  SL.startDaily = function () {
    var foc = SL.activeFocus().map(function (f) { return f.key; });
    if (foc.length) {
      var units = []; foc.forEach(function (k) { var u = SL.parseTopicKey(k).u; if (units.indexOf(u) === -1) units.push(u); });
      var subs = []; units.forEach(function (u) { var s = SL.subjectOfUnit(u).id; if (subs.indexOf(s) === -1) subs.push(s); });
      return SL.startSession({ mode: 'adaptive', title: L('今日智能练习 · 错题专练', 'Smart practice · mistake drill'), s: subs.length === 1 ? subs[0] : null, units: units, topics: foc, count: 12, types: ['mcq'] });
    }
    var weak = SL.weakTopics(1)[0];
    return SL.startSession({ mode: 'adaptive', title: L('今日智能练习', 'Smart practice'), s: weak ? weak.s : null, count: 12, types: ['mcq'] });
  };

  /* ---------- course page ---------- */
  var MODULES = {
    geo: [
      { icon: '🔤', zh: '核心词汇 Vocabulary', en: 'Vocabulary', dzh: '术语与定义辨析', den: 'Key terms & definitions', q: 'tags=vocab' },
      { icon: '🗺️', zh: '地图与空间分析', en: 'Maps & spatial analysis', dzh: '人口金字塔、图表与地图读图题', den: 'Pyramids, charts and map reading', q: 'tags=map,data' },
      { icon: '💡', zh: '概念辨析', en: 'Concept distinctions', dzh: '易混概念对比', den: 'Commonly confused ideas', q: 'tags=concept' },
      { icon: '🌍', zh: '案例分析', en: 'Case application', dzh: '把模型用到真实案例', den: 'Apply models to real cases', q: 'tags=application' },
      { icon: '✍️', zh: 'FRQ 训练', en: 'FRQ training', dzh: '分步作答 + 评分标准反馈', den: 'Step-by-step answers + rubric feedback', q: 'types=frq' },
      { icon: '📊', zh: '数据计算', en: 'Data & calculation', dzh: 'NIR、倍增时间等计算', den: 'NIR, doubling time and more', q: 'tags=calculation,data' }
    ],
    bio: [
      { icon: '🔬', zh: '图示识别 Diagram ID', en: 'Diagram identification', dzh: '细胞器、结构识图与标注', den: 'Identify & label structures', q: 'tags=diagram' },
      { icon: '📈', zh: '数据分析', en: 'Data analysis', dzh: '读懂实验曲线与数据表', den: 'Read graphs and data tables', q: 'tags=data' },
      { icon: '🧪', zh: '实验题', en: 'Experimental questions', dzh: '变量、对照与结论', den: 'Variables, controls, conclusions', q: 'tags=experiment' },
      { icon: '🧬', zh: '遗传计算', en: 'Genetics problems', dzh: '概率、杂交与系谱', den: 'Crosses, probability, pedigrees', q: 'unit=bio8' },
      { icon: '💡', zh: '概念应用', en: 'Concept application', dzh: '把原理用到新情境', den: 'Apply principles to new cases', q: 'tags=application' },
      { icon: '✏️', zh: 'FRQ 与画图', en: 'FRQ & drawing', dzh: '简答与作图训练', den: 'Free response and diagrams', q: 'types=frq,draw' }
    ],
    precalc: [
      { icon: '📉', zh: '交互式函数图像', en: 'Interactive graphing', dzh: '拖动参数，实时看图像变化', den: 'Move parameters, watch the graph', href: '#/graph' },
      { icon: '📐', zh: '公式速查', en: 'Formula reference', dzh: '按单元整理的核心公式', den: 'Key formulas by unit', href: '#/graph?tab=formulas' },
      { icon: '🧮', zh: '分步计算', en: 'Step-by-step practice', dzh: '计算题 + 详细解析', den: 'Calculation items with worked steps', q: 'tags=calculation' },
      { icon: '👀', zh: '读图题', en: 'Graph reading', dzh: '根据图像判断函数', den: 'Identify functions from graphs', q: 'tags=application,diagram' },
      { icon: '🌉', zh: '应用题', en: 'Application problems', dzh: '真实情境建模', den: 'Model real situations', q: 'tags=application' },
      { icon: '🩺', zh: '错误分析', en: 'Error analysis', dzh: '回顾你的数学错题', den: 'Review your math mistakes', href: '#/mistakes?s=precalc' }
    ]
  };

  function renderCourse(m) {
    var s = SL.subject(m[1]);
    if (!s) return null;
    var sm = SL.subjectMastery(s.id);
    var sst = SL.stats(function (x) { return x.s === s.id; });
    var mastered = 0;
    s.units.forEach(function (u) { u.topics.forEach(function (_, i) { if (SL.topicMastery(SL.topicKey(u.id, i)) >= 85) mastered++; }); });
    var bs = SL.bankStats(s.id);
    var mistakesN = SL.mistakeList().filter(function (x) { return x.q.s === s.id && !x.mastered; }).length;
    var exam = SL.store.planner.exams[s.id];
    var html = '<div class="card accent-top"><div class="row" style="align-items:flex-start;gap:20px"><div class="grow" style="min-width:240px">' +
      '<div class="row">' + ui.subjIcon(s) + '<div><h2 style="font-size:22px;font-weight:800">' + esc(t(s.name)) + '</h2><div class="small muted">' + esc(t(s.tagline)) + '</div></div></div>' +
      '<p class="mt12 small">' + esc(t(INTRO[s.id])) + '</p>' +
      '<div class="row mt16">' +
      '<a class="btn accent" href="#/practice?s=' + s.id + '&adaptive=1">' + esc(L('自适应练习', 'Adaptive practice')) + '</a>' +
      '<a class="btn" href="#/practice?s=' + s.id + '">' + esc(L('自定义练习', 'Custom practice')) + '</a>' +
      '<a class="btn" href="#/mistakes?s=' + s.id + '">' + esc(L('错题', 'Mistakes')) + (mistakesN ? ' (' + mistakesN + ')' : '') + '</a>' +
      '<a class="btn" href="#/exam?s=' + s.id + '">' + esc(L('模拟考试', 'Mock exam')) + '</a>' +
      '<a class="btn" href="#/tutor?s=' + s.id + '">' + I.bot + 'AI Tutor</a>' +
      '<a class="btn" href="#/flashcards?s=' + s.id + '">' + esc(L('闪卡', 'Flashcards')) + '</a>' +
      '<a class="btn" href="#/kb?s=' + s.id + '">' + I.book + esc(L('知识点与笔记', 'Key points & notes')) + '</a></div></div>' +
      '<div class="row" style="gap:20px">' + SL.chart.ring(sm.avg, 104, subjColor(s.id), L('课程掌握度', 'Course mastery')) +
      '<div class="stack" style="gap:8px"><div class="stat"><span class="label">' + esc(L('已掌握知识点', 'Topics mastered')) + '</span><span class="value" style="font-size:20px">' + mastered + ' / ' + sm.total + '</span></div>' +
      '<div class="stat"><span class="label">' + esc(L('已做题 · 正确率', 'Answered · accuracy')) + '</span><span class="value" style="font-size:20px">' + sst.n + ' · ' + (sst.acc == null ? '—' : sst.acc + '%') + '</span></div>' +
      (exam ? '<div class="xs faint">' + esc(L('考试日期 ', 'Exam ')) + esc(exam) + '</div>' : '<a class="xs" href="#/planner">' + esc(L('设置考试日期', 'Set exam date')) + '</a>') + '</div></div></div>' +
      '<p class="xs faint mt12">' + esc(L('题库：' + bs.n + ' 道固定题（含 FRQ ' + bs.frq + '、画图 ' + bs.draw + '）+ ' + bs.gens + ' 个随机出题生成器', 'Bank: ' + bs.n + ' fixed items (FRQ ' + bs.frq + ', drawing ' + bs.draw + ') + ' + bs.gens + ' randomized generators')) + '</p></div>';

    html += '<h3 class="mt24" style="font-size:16px;margin-bottom:12px">' + esc(L('专项模块', 'Focused modules')) + '</h3><div class="grid g3">' +
      MODULES[s.id].map(function (md) {
        var href = md.href || ('#/practice?s=' + s.id + '&' + md.q);
        return '<a class="card pad-sm module-card" href="' + href + '"><span class="mi" aria-hidden="true">' + md.icon + '</span><div><h4>' + esc(L(md.zh, md.en)) + '</h4><p>' + esc(L(md.dzh, md.den)) + '</p></div></a>';
      }).join('') + '</div>';

    html += '<h3 class="mt24" style="font-size:16px;margin-bottom:12px">' + esc(L('单元与知识点', 'Units & topics')) + '</h3><div class="grid g2">' +
      s.units.map(function (u) {
        var um = SL.unitMastery(u.id);
        return '<div class="card unit-card" data-testid="unit-' + u.id + '"><div class="row between"><h3 style="margin:0">' + esc(t(u.name)) + '</h3><span class="chip acc">' + um.avg + '%</span></div>' +
          '<div class="xs faint mt8">' + um.started + '/' + um.total + esc(L(' 个知识点已练习', ' topics practised')) + '</div><div class="mt8">' +
          u.topics.map(function (tp, i) {
            var key = SL.topicKey(u.id, i), mm = SL.topicMastery(key);
            return '<a class="topic-row" style="color:inherit;text-decoration:none" href="#/practice?topic=' + encodeURIComponent(key) + '&adaptive=1" title="' + esc(L('专项练习：', 'Drill: ') + t(tp)) + '"><span class="nm">' + esc(t(tp)) + '</span>' +
              '<span class="bar thin"><i class="' + ui.masteryBarCls(mm) + '" style="width:' + (mm || 0) + '%"></i></span><span class="pct lvl-' + SL.masteryLevel(mm).key + '">' + (mm == null ? '—' : mm + '%') + '</span></a>';
          }).join('') + '</div>' +
          '<div class="row mt12"><a class="btn sm accent" href="#/practice?s=' + s.id + '&unit=' + u.id + '&go=1" data-testid="button-start-' + u.id + '">' + esc(L('练习本单元', 'Practise unit')) + '</a>' +
          '<a class="btn sm" href="#/practice?s=' + s.id + '&unit=' + u.id + '&adaptive=1&go=1">' + esc(L('自适应', 'Adaptive')) + '</a>' +
          '<a class="btn sm ghost" href="#/flashcards?unit=' + u.id + '">' + esc(L('闪卡', 'Cards')) + '</a>' +
          '<a class="btn sm ghost" href="#/kb?u=' + u.id + '">' + esc(L('知识点', 'Key points')) + '</a></div></div>';
      }).join('') + '</div>';

    var recent = SL.store.attempts.filter(function (x) { return x.s === s.id; }).slice(-6).reverse();
    html += '<div class="card mt16"><div class="card-head"><h3>' + esc(L('最近学习记录', 'Recent activity')) + '</h3></div>' +
      (recent.length ? '<div class="list">' + recent.map(function (x) {
        var q = SL.byId(x.q);
        return '<div class="list-row"><span class="chip ' + (x.c ? 'good' : 'bad') + '">' + (x.c ? '✓' : '✗') + '</span><div class="grow"><div class="title" style="font-weight:500">' + esc(q ? t(q.q).slice(0, 90) : SL.topicName(x.u, x.tp)) + '</div><div class="meta">' + esc(SL.topicName(x.u, x.tp)) + '</div></div><span class="xs faint">' + esc(ui.relTime(x.ts)) + '</span></div>';
      }).join('') + '</div>' : ui.empty('📘', L('还没有这门课的记录', 'No activity for this course yet'), '', '<a class="btn accent" href="#/practice?s=' + s.id + '&adaptive=1&go=1">' + esc(L('开始第一组练习', 'Start your first set')) + '</a>')) + '</div>';

    return { title: t(s.name), accent: s.id, html: html };
  }

  /* ---------- practice setup ---------- */
  var PR = null;
  function defaultPR(q) {
    var p = { s: q.s || (SL.store.settings.lastSubject) || 'geo', units: [], topics: [], diffs: [], types: ['mcq'], tags: [], count: 10, adaptive: q.adaptive === '1' };
    if (q.topic) { var tk = SL.parseTopicKey(q.topic); var su = SL.subjectOfUnit(tk.u); if (su) { p.s = su.id; p.units = [tk.u]; p.topics = [q.topic]; } }
    if (q.unit && SL.unit(q.unit)) { p.s = SL.subjectOfUnit(q.unit).id; p.units = [q.unit]; }
    if (q.types) p.types = q.types.split(',');
    if (q.tags) p.tags = q.tags.split(',');
    return p;
  }
  function poolCount(p) {
    // fixed items exact; generators counted once (each yields endless variants)
    var opts = { subject: p.s === 'all' ? null : p.s, units: p.units, topics: p.topics, diffs: p.diffs, types: p.types, tags: p.tags, genPer: 1 };
    var pool = SL.buildPool(opts);
    return { fixed: pool.filter(function (q) { return q.src !== 'gen'; }).length, gens: pool.filter(function (q) { return q.src === 'gen'; }).length };
  }
  function renderPractice(m, q) {
    if (q.focus === '1') { history.replaceState(null, '', '#/practice'); setTimeout(function () { SL.startDaily(); }, 0); }
    if (!PR || q.s || q.topic || q.unit || q.tags || q.types || q.adaptive) PR = defaultPR(q);
    if (q.go === '1') {
      // drop ?go=1 from history so "back" returns to the setup page instead of auto-starting again
      history.replaceState(null, '', '#/practice');
      setTimeout(function () { SL.actions.startPractice(); }, 0);
    }
    var p = PR;
    var subj = p.s === 'all' ? null : SL.subject(p.s);
    var pc = poolCount(p);
    function pill(act, val, on, label) { return '<button class="pill' + (on ? ' on' : '') + '" data-act="' + act + '" data-v="' + esc(val) + '" aria-pressed="' + on + '">' + esc(label) + '</button>'; }
    var html = '';
    if (SL.store.active) {
      html += '<div class="notice info"><b>' + esc(L('有一组练习进行中。', 'A session is in progress. ')) + '</b> <a href="' + (SL.store.active.mode === 'exam' ? '#/exam/run' : '#/quiz') + '">' + esc(L('继续作答 →', 'Resume →')) + '</a> ' + esc(L('（开始新练习会替换它）', '(starting a new one replaces it)')) + '</div>';
    }
    html += '<div class="grid g2 mt16" style="align-items:start"><div class="stack">' +
      '<div class="card"><div class="field"><span class="lbl">' + esc(L('课程', 'Course')) + '</span><div class="pill-wrap">' +
      pill('prSubject', 'all', p.s === 'all', L('综合（全部课程）', 'Mixed (all courses)')) +
      SL.SUBJECTS.map(function (s) { return pill('prSubject', s.id, p.s === s.id, t(s.name)); }).join('') + '</div></div>';
    if (subj) {
      html += '<div class="field mt16"><span class="lbl">' + esc(L('单元（不选 = 全部单元）', 'Units (none = all)')) + '</span><div class="pill-wrap">' +
        subj.units.map(function (u, i) { return pill('prUnit', u.id, p.units.indexOf(u.id) !== -1, 'U' + (i + 1) + ' ' + t(u.name).replace(/^(Unit \d+ · |第.{1,3}单元 ?· ?)/, '')); }).join('') + '</div></div>';
      if (p.units.length) {
        html += '<div class="field mt16"><span class="lbl">' + esc(L('知识点（不选 = 所选单元全部）', 'Topics (none = all in selected units)')) + '</span><div class="pill-wrap">';
        p.units.forEach(function (uid) { SL.unit(uid).topics.forEach(function (tp, i) { var k = SL.topicKey(uid, i); html += pill('prTopic', k, p.topics.indexOf(k) !== -1, t(tp)); }); });
        html += '</div></div>';
      }
    }
    html += '</div></div><div class="stack"><div class="card">' +
      '<div class="field"><span class="lbl">' + esc(L('模式', 'Mode')) + '</span><div class="seg">' +
      '<button class="' + (!p.adaptive ? 'on' : '') + '" data-act="prMode" data-v="0">' + esc(L('随机 / 专项', 'Random / focused')) + '</button>' +
      '<button class="' + (p.adaptive ? 'on' : '') + '" data-act="prMode" data-v="1">' + esc(L('自适应', 'Adaptive')) + '</button></div>' +
      '<span class="hint">' + esc(p.adaptive ? L('根据你的实时表现调整难度：连续答错会降难度并给出概念回顾，连续答对会升难度；优先薄弱和到期知识点。', 'Difficulty follows your answers: misses lower it and add a concept refresher, streaks raise it; weak and due topics come first.') :
        L('在筛选范围内随机抽题，并尽量覆盖更多知识点。', 'Random draw within your filters, spread across as many topics as possible.')) + '</span></div>' +
      '<div class="field mt16"><span class="lbl">' + esc(L('难度（不选 = 全部）', 'Difficulty (none = all)')) + '</span><div class="pill-wrap">' +
      [1, 2, 3, 4].map(function (d) { return pill('prDiff', d, p.diffs.indexOf(d) !== -1, t(SL.DIFF[d])); }).join('') + '</div>' +
      '<span class="hint">' + esc(L('题库原题没有标难度，系统按题型和题目长度估计（标 * 的为估计值）；AP 难度 = FRQ / 画图题。', 'Original items carry no difficulty, so it is estimated from type and length (* marks estimates); AP level = FRQ/drawing.')) + '</span></div>' +
      '<div class="field mt16"><span class="lbl">' + esc(L('题目类型', 'Question format')) + '</span><div class="pill-wrap">' +
      pill('prType', 'mcq', p.types.indexOf('mcq') !== -1, L('选择题', 'Multiple choice')) + pill('prType', 'frq', p.types.indexOf('frq') !== -1, 'FRQ') + pill('prType', 'draw', p.types.indexOf('draw') !== -1, L('画图题', 'Drawing')) + '</div></div>' +
      '<div class="field mt16"><span class="lbl">' + esc(L('题型风格（选择题，不选 = 全部）', 'Item style (MCQ, none = all)')) + '</span><div class="pill-wrap">' +
      ['vocab', 'concept', 'application', 'calculation', 'diagram', 'data', 'experiment', 'map'].map(function (tg) { return pill('prTag', tg, p.tags.indexOf(tg) !== -1, t(SL.TAGS[tg])); }).join('') + '</div></div>' +
      '<div class="field mt16"><label for="prCount">' + esc(L('题目数量', 'Number of questions')) + '</label><div class="range-row"><input id="prCount" type="range" min="5" max="50" step="1" value="' + p.count + '" data-input="prCount"><output id="prCountOut">' + p.count + '</output></div></div>' +
      '<div class="divider"></div><div class="small muted" data-testid="pool-count">' + esc(L('可用题目：' + pc.fixed + ' 道固定题' + (pc.gens ? ' + ' + pc.gens + ' 个生成器（可无限出新题）' : ''), 'Available: ' + pc.fixed + ' fixed items' + (pc.gens ? ' + ' + pc.gens + ' generators (endless variants)' : ''))) + '</div>' +
      '<button class="btn primary block mt12" data-act="startPractice" data-testid="button-start"' + (pc.fixed + pc.gens ? '' : ' disabled') + '>' + esc(L('开始练习', 'Start')) + ' →</button>' +
      '</div></div></div>';
    return { title: L('练习', 'Practice'), html: html, accent: subj ? subj.id : 'none', keepScroll: true };
  }
  function toggle(arr, v) { var i = arr.indexOf(v); if (i === -1) arr.push(v); else arr.splice(i, 1); }
  function prRefresh() { var y = window.scrollY; if (location.hash.indexOf('?') !== -1) { history.replaceState(null, '', '#/practice'); } SL.render(); window.scrollTo(0, y); }
  SL.act('prSubject', function (el) { PR.s = el.getAttribute('data-v'); PR.units = []; PR.topics = []; if (PR.s !== 'all') { SL.store.settings.lastSubject = PR.s; SL.save(); } prRefresh(); });
  SL.act('prUnit', function (el) { toggle(PR.units, el.getAttribute('data-v')); PR.topics = PR.topics.filter(function (k) { return PR.units.indexOf(SL.parseTopicKey(k).u) !== -1; }); prRefresh(); });
  SL.act('prTopic', function (el) { toggle(PR.topics, el.getAttribute('data-v')); prRefresh(); });
  SL.act('prDiff', function (el) { toggle(PR.diffs, parseInt(el.getAttribute('data-v'), 10)); prRefresh(); });
  SL.act('prType', function (el) { toggle(PR.types, el.getAttribute('data-v')); if (!PR.types.length) PR.types = ['mcq']; prRefresh(); });
  SL.act('prTag', function (el) { toggle(PR.tags, el.getAttribute('data-v')); prRefresh(); });
  SL.act('prMode', function (el) { PR.adaptive = el.getAttribute('data-v') === '1'; prRefresh(); });
  SL.act('prCount', function (el) { PR.count = parseInt(el.value, 10); var o = document.getElementById('prCountOut'); if (o) o.textContent = PR.count; });
  SL.act('startPractice', function () {
    var p = PR || defaultPR({});
    var subj = p.s === 'all' ? null : p.s;
    var title = p.topics.length === 1 ? SL.topicName(SL.parseTopicKey(p.topics[0]).u, SL.parseTopicKey(p.topics[0]).tp) :
      p.units.length === 1 ? t(SL.unit(p.units[0]).name) : subj ? t(SL.subject(subj).name) : L('综合练习', 'Mixed practice');
    SL.startSession({ mode: p.adaptive ? 'adaptive' : 'practice', title: title, s: subj, units: p.units.slice(), topics: p.topics.slice(), diffs: p.diffs.slice(), types: p.types.slice(), tags: p.tags.slice(), count: p.count });
  });

  /* ---------- more (mobile) ---------- */
  function renderMore() {
    var items = SL.navItems().filter(function (x) { return !x.group; });
    return {
      title: L('更多', 'More'),
      html: '<div class="grid g2">' + items.map(function (it) {
        var label = it.label ? t(it.label) : L(it.zh, it.en);
        return '<a class="card pad-sm row" href="' + it.href + '" style="gap:12px">' + (it.dot ? '<span class="subj-dot" style="background:var(--' + it.dot + ')"></span>' : '<span style="width:22px;height:22px;display:inline-grid">' + I[it.icon] + '</span>') + '<b>' + esc(label) + '</b>' + (it.badge ? '<span class="chip bad" style="margin-left:auto">' + it.badge + '</span>' : '') + '</a>';
      }).join('') + '</div>'
    };
  }

  SL.route(/^\/dashboard$/, renderDashboard);
  SL.route(/^\/course\/(\w+)$/, renderCourse);
  SL.route(/^\/practice$/, renderPractice);
  SL.route(/^\/more$/, renderMore);
})();
