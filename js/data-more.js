/* StudyLoop — additional question bank: diagram identification, data analysis, experimental design,
 * map/chart analysis and graph reading. Same schema as the unit banks plus unit/tp/d.
 * Figures are inline SVG drawn on a white figure panel. */
(function () {
  'use strict';
  var B = window.EXTRA_BANK = window.EXTRA_BANK || [];
  function o(en, zh) { return { en: en, zh: zh }; }
  function add(unit, tp, d, t, qEn, qZh, opts, a, eEn, eZh, svg) {
    B.push({ unit: unit, tp: tp, d: d, t: t, q: o(qEn, qZh), o: opts, a: a, e: o(eEn, eZh), svg: svg });
  }
  var INK = '#1f2937', MUTED = '#6b7280', GRID = '#e5e7eb';

  /* ---------- figure helpers ---------- */
  function lab(x, y, s) { return '<circle cx="' + x + '" cy="' + y + '" r="11" fill="#fff" stroke="' + INK + '" stroke-width="1.5"/><text x="' + x + '" y="' + (y + 4.5) + '" text-anchor="middle" font-size="13" font-weight="700" fill="' + INK + '">' + s + '</text>'; }
  function line(x1, y1, x2, y2) { return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + INK + '" stroke-width="1.2"/>'; }

  // axes + polyline chart; pts in data units; xs/ys = [min,max]
  function plot(opts) {
    var W = 360, H = 240, L = 46, R = 14, T = 14, Bm = 38;
    var iw = W - L - R, ih = H - T - Bm;
    function X(v) { return L + (v - opts.x[0]) / (opts.x[1] - opts.x[0]) * iw; }
    function Y(v) { return T + ih - (v - opts.y[0]) / (opts.y[1] - opts.y[0]) * ih; }
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" style="max-width:440px;width:100%" font-family="sans-serif">';
    (opts.yt || []).forEach(function (v) { s += '<line x1="' + L + '" x2="' + (W - R) + '" y1="' + Y(v) + '" y2="' + Y(v) + '" stroke="' + GRID + '"/><text x="' + (L - 6) + '" y="' + (Y(v) + 4) + '" text-anchor="end" font-size="10" fill="' + MUTED + '">' + v + '</text>'; });
    (opts.xt || []).forEach(function (v) { s += '<text x="' + X(v) + '" y="' + (T + ih + 14) + '" text-anchor="middle" font-size="10" fill="' + MUTED + '">' + v + '</text>'; });
    s += '<line x1="' + L + '" y1="' + (T + ih) + '" x2="' + (W - R) + '" y2="' + (T + ih) + '" stroke="' + INK + '"/><line x1="' + L + '" y1="' + T + '" x2="' + L + '" y2="' + (T + ih) + '" stroke="' + INK + '"/>';
    (opts.series || []).forEach(function (se) {
      var d = se.pts.map(function (p, i) { return (i ? 'L' : 'M') + X(p[0]).toFixed(1) + ',' + Y(p[1]).toFixed(1); }).join('');
      s += '<path d="' + d + '" fill="none" stroke="' + se.c + '" stroke-width="2.4"' + (se.dash ? ' stroke-dasharray="5 4"' : '') + '/>';
      if (se.label) { var lp = se.pts[se.pts.length - 1]; s += '<text x="' + (X(lp[0]) - 4) + '" y="' + (Y(lp[1]) - 7) + '" text-anchor="end" font-size="10" font-weight="700" fill="' + se.c + '">' + se.label + '</text>'; }
    });
    (opts.marks || []).forEach(function (m) { s += '<text x="' + X(m[0]) + '" y="' + (Y(m[1]) - 8) + '" text-anchor="middle" font-size="11" font-weight="700" fill="' + INK + '">' + m[2] + '</text>'; });
    s += '<text x="' + (L + iw / 2) + '" y="' + (H - 6) + '" text-anchor="middle" font-size="11" fill="' + INK + '">' + opts.xl + '</text>';
    s += '<text x="12" y="' + (T + ih / 2) + '" text-anchor="middle" font-size="11" fill="' + INK + '" transform="rotate(-90 12 ' + (T + ih / 2) + ')">' + opts.yl + '</text>';
    return s + '</svg>';
  }
  function curve(f, a, b, n) { var p = []; for (var i = 0; i <= n; i++) { var x = a + (b - a) * i / n; p.push([x, f(x)]); } return p; }
  // coordinate-plane graph for precalc items
  function graph(f, opts) {
    opts = opts || {};
    var W = 300, H = 260, R = opts.r || 6, sx = W / (2 * R), yR = R * H / W, sy = H / (2 * yR);
    function X(x) { return (x + R) * sx; } function Y(y) { return H - (y + yR) * sy; }
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" style="max-width:340px;width:100%" font-family="sans-serif">';
    for (var gx = -R; gx <= R; gx++) s += '<line x1="' + X(gx) + '" x2="' + X(gx) + '" y1="0" y2="' + H + '" stroke="' + GRID + '"/>';
    for (var gy = Math.ceil(-yR); gy <= yR; gy++) s += '<line x1="0" x2="' + W + '" y1="' + Y(gy) + '" y2="' + Y(gy) + '" stroke="' + GRID + '"/>';
    s += '<line x1="0" x2="' + W + '" y1="' + Y(0) + '" y2="' + Y(0) + '" stroke="' + INK + '"/><line x1="' + X(0) + '" x2="' + X(0) + '" y1="0" y2="' + H + '" stroke="' + INK + '"/>';
    for (var t = -R + 1; t < R; t++) if (t && t % 2 === 0) { s += '<text x="' + X(t) + '" y="' + (Y(0) + 12) + '" text-anchor="middle" font-size="9" fill="' + MUTED + '">' + t + '</text>'; }
    for (var u = Math.ceil(-yR) + 1; u < yR; u++) if (u && u % 2 === 0) { s += '<text x="' + (X(0) - 4) + '" y="' + (Y(u) + 3) + '" text-anchor="end" font-size="9" fill="' + MUTED + '">' + u + '</text>'; }
    (opts.asym || []).forEach(function (a) { s += a[0] === 'x' ? '<line x1="' + X(a[1]) + '" x2="' + X(a[1]) + '" y1="0" y2="' + H + '" stroke="#b91c1c" stroke-dasharray="4 4"/>' : '<line x1="0" x2="' + W + '" y1="' + Y(a[1]) + '" y2="' + Y(a[1]) + '" stroke="#b91c1c" stroke-dasharray="4 4"/>'; });
    var d = '', pen = false, prev = null;
    for (var i = 0; i <= 600; i++) {
      var x = -R + 2 * R * i / 600, y = f(x);
      if (!isFinite(y) || Math.abs(y) > yR * 3 || (prev != null && Math.abs(y - prev) > yR)) { pen = false; prev = isFinite(y) ? y : null; continue; }
      d += (pen ? 'L' : 'M') + X(x).toFixed(1) + ',' + Y(y).toFixed(1); pen = true; prev = y;
    }
    s += '<path d="' + d + '" fill="none" stroke="#6d28d9" stroke-width="2.4"/>';
    (opts.pts || []).forEach(function (p) { s += '<circle cx="' + X(p[0]) + '" cy="' + Y(p[1]) + '" r="3.5" fill="#6d28d9"/>'; });
    return s + '</svg>';
  }

  /* =================== BIOLOGY =================== */
  var CELL = '<svg viewBox="0 0 380 260" xmlns="http://www.w3.org/2000/svg" role="img" style="max-width:440px;width:100%" font-family="sans-serif">' +
    '<ellipse cx="170" cy="130" rx="150" ry="110" fill="#fdf2e9" stroke="' + INK + '" stroke-width="2.5"/>' +
    '<circle cx="165" cy="125" r="42" fill="#e9d5ff" stroke="' + INK + '" stroke-width="2"/><circle cx="175" cy="118" r="12" fill="#a78bfa" stroke="' + INK + '"/>' +
    '<ellipse cx="90" cy="185" rx="30" ry="14" fill="#fecaca" stroke="' + INK + '" stroke-width="1.5"/><path d="M66 185c8-8 14 8 22 0s14 8 22 0" fill="none" stroke="' + INK + '"/>' +
    '<path d="M235 70c18 0 30 6 30 6M232 80c20 0 36 8 36 8M230 90c22 0 40 9 40 9M230 100c20 0 34 7 34 7" fill="none" stroke="#2563eb" stroke-width="3" stroke-linecap="round"/>' +
    '<g fill="' + INK + '"><circle cx="230" cy="170" r="3"/><circle cx="242" cy="178" r="3"/><circle cx="222" cy="182" r="3"/><circle cx="250" cy="160" r="3"/></g>' +
    '<path d="M100 75c10-12 30-12 40 0s30 12 40 0" fill="none" stroke="#059669" stroke-width="3"/><path d="M100 88c10-12 30-12 40 0" fill="none" stroke="#059669" stroke-width="3"/>' +
    line(175, 118, 345, 40) + lab(355, 34, 'A') + line(110, 185, 345, 230) + lab(355, 236, 'B') +
    line(265, 85, 345, 100) + lab(355, 100, 'C') + line(242, 175, 345, 170) + lab(355, 168, 'D') +
    line(318, 120, 345, 135) + lab(355, 135, 'E') + line(120, 80, 30, 30) + lab(22, 24, 'F') + '</svg>';
  var cellQ = [
    ['A', o('Nucleolus', '核仁'), 6, 'Label A points to the dark body inside the nucleus — the nucleolus, where ribosomal RNA is made and ribosome subunits are assembled.', '标注 A 指向细胞核内的深色小体——核仁，负责合成 rRNA 并组装核糖体亚基。'],
    ['B', o('Mitochondrion', '线粒体'), 1, 'B is the bean-shaped organelle with folded inner membrane (cristae) — the mitochondrion, site of aerobic respiration.', 'B 是内膜折叠成嵴的豆形细胞器——线粒体，有氧呼吸的场所。'],
    ['C', o('Golgi apparatus', '高尔基体'), 6, 'C is the stack of flattened curved sacs — the Golgi apparatus, which modifies, sorts and packages proteins.', 'C 是一叠弯曲的扁平囊——高尔基体，负责修饰、分拣和包装蛋白质。'],
    ['D', o('Ribosomes', '核糖体'), 6, 'D marks the small dots — free ribosomes, which translate mRNA into protein.', 'D 指向的小点是游离核糖体，负责把 mRNA 翻译成蛋白质。'],
    ['E', o('Cell (plasma) membrane', '细胞膜'), 1, 'E points to the outer boundary of an animal cell — the plasma membrane (there is no cell wall).', 'E 指向动物细胞的外边界——细胞膜（动物细胞没有细胞壁）。'],
    ['F', o('Rough endoplasmic reticulum', '粗面内质网'), 6, 'F marks the folded membranes near the nucleus — endoplasmic reticulum (rough ER when studded with ribosomes), where secreted proteins are made.', 'F 指向细胞核附近的折叠膜系统——内质网（附着核糖体时为粗面内质网），分泌蛋白在此合成。']
  ];
  var allCell = cellQ.map(function (c) { return c[1]; });
  cellQ.forEach(function (c, i) {
    var opts = [c[1]].concat(allCell.filter(function (x) { return x !== c[1]; }).slice(i % 3, i % 3 + 3));
    add('bio1', c[2], 2, 'diagram', 'In the animal-cell diagram, which structure is labeled ' + c[0] + '?', '在这张动物细胞图中，标注 ' + c[0] + ' 的结构是什么？', opts, 0, c[3], c[4], CELL);
  });
  add('bio1', 2, 2, 'diagram', 'Which structure would you ADD to this diagram to turn it into a typical plant cell?', '要把这张图改成典型的植物细胞，需要添加哪种结构？',
    [o('A cell wall, chloroplasts and a large central vacuole', '细胞壁、叶绿体和大液泡'), o('More mitochondria', '更多线粒体'), o('A second nucleus', '第二个细胞核'), o('Centrioles', '中心粒')], 0,
    'Plant cells have a cellulose cell wall, chloroplasts and a large central vacuole; animal cells lack all three.', '植物细胞有纤维素细胞壁、叶绿体和大的中央液泡，动物细胞都没有。', CELL);

  var ENZ = plot({ x: [0, 70], y: [0, 100], xt: [0, 10, 20, 30, 40, 50, 60, 70], yt: [0, 25, 50, 75, 100], xl: 'Temperature (°C) 温度', yl: 'Rate 反应速率',
    series: [{ c: '#15803d', pts: [[0, 4], [10, 14], [20, 34], [30, 68], [37, 96], [42, 80], [47, 38], [52, 8], [60, 0], [70, 0]] }] });
  add('bio3', 4, 2, 'data', 'The graph shows the activity of a human enzyme at different temperatures. What is its optimum temperature?', '图为某种人体酶在不同温度下的活性。它的最适温度约为多少？',
    [o('About 37 °C', '约 37 °C'), o('About 20 °C', '约 20 °C'), o('About 50 °C', '约 50 °C'), o('About 60 °C', '约 60 °C')], 0,
    'Activity peaks at about 37 °C (body temperature) — that peak is the optimum.', '活性峰值出现在约 37 °C（体温），即最适温度。', ENZ);
  add('bio3', 4, 3, 'data', 'Why does the rate fall sharply between 42 °C and 55 °C on this graph?', '为什么曲线在 42 °C 到 55 °C 之间急剧下降？',
    [o('The enzyme denatures — its active site loses its shape', '酶变性——活性位点的形状被破坏'), o('Molecules move more slowly', '分子运动变慢'), o('The substrate is used up', '底物被耗尽'), o('The enzyme is used up in the reaction', '酶在反应中被消耗')], 0,
    'High temperature breaks the hydrogen and other bonds holding the protein\'s 3-D shape, so the active site no longer fits the substrate. Enzymes are not consumed, and molecules move faster, not slower, when heated.', '高温破坏维持蛋白质空间结构的氢键等化学键，活性位点不再与底物吻合。酶不会被消耗；升温时分子运动更快而不是更慢。', ENZ);
  add('bio3', 4, 2, 'data', 'Between 10 °C and 30 °C the rate rises. What best explains this?', '10 °C 到 30 °C 之间速率上升，最好的解释是？',
    [o('More kinetic energy → more enzyme–substrate collisions', '动能增加 → 酶与底物碰撞更频繁'), o('The enzyme is denaturing', '酶正在变性'), o('The activation energy increases', '活化能升高'), o('The pH drops', 'pH 下降')], 0,
    'Below the optimum, warming increases molecular motion, so collisions between enzyme and substrate become more frequent and successful.', '在最适温度以下，升温使分子运动加快，酶与底物的有效碰撞增加。', ENZ);

  var PHO = plot({ x: [0, 100], y: [0, 50], xt: [0, 20, 40, 60, 80, 100], yt: [0, 10, 20, 30, 40, 50], xl: 'Light intensity (%) 光照强度', yl: 'O₂ released 释放 O₂',
    series: [{ c: '#15803d', label: '25 °C, 0.04% CO₂', pts: curve(function (x) { return 30 * (1 - Math.exp(-x / 18)); }, 0, 100, 40) },
      { c: '#2563eb', dash: true, label: '25 °C, 0.10% CO₂', pts: curve(function (x) { return 46 * (1 - Math.exp(-x / 22)); }, 0, 100, 40) }] });
  add('bio4', 4, 3, 'data', 'For the 0.04% CO₂ line, what limits the rate of photosynthesis at light intensities above about 60%?', '对于 0.04% CO₂ 这条曲线，光照强度超过约 60% 后，限制光合速率的是什么？',
    [o('CO₂ concentration', 'CO₂ 浓度'), o('Light intensity', '光照强度'), o('The amount of water in the soil only', '仅仅是土壤含水量'), o('Nothing — the rate keeps rising', '没有限制——速率一直上升')], 0,
    'The curve plateaus, so more light no longer helps; raising CO₂ (dashed line) raises the plateau, showing CO₂ is the limiting factor there.', '曲线进入平台期，再增加光照无效；提高 CO₂（虚线）使平台升高，说明此时的限制因素是 CO₂。', PHO);
  add('bio4', 4, 2, 'data', 'At 10% light intensity, both lines give almost the same rate. What is the limiting factor there?', '在 10% 光照时，两条曲线速率几乎相同。此时的限制因素是什么？',
    [o('Light intensity', '光照强度'), o('CO₂ concentration', 'CO₂ 浓度'), o('Temperature', '温度'), o('Chlorophyll is absent', '缺少叶绿素')], 0,
    'Extra CO₂ makes no difference at low light, so light is what limits the rate.', '弱光下增加 CO₂ 没有作用，因此限制因素是光照强度。', PHO);

  add('bio2', 2, 3, 'experiment', 'Potato cores were soaked in sucrose solutions for 1 h. Percent mass change: 0.0 M +12%, 0.2 M +5%, 0.4 M −3%, 0.6 M −10%. Estimate the solute concentration of the potato cells.', '马铃薯条在不同浓度蔗糖溶液中浸泡 1 小时，质量变化：0.0 M +12%，0.2 M +5%，0.4 M −3%，0.6 M −10%。估算马铃薯细胞的溶质浓度。',
    [o('About 0.33 M', '约 0.33 M'), o('About 0.1 M', '约 0.1 M'), o('About 0.5 M', '约 0.5 M'), o('0.0 M — cells have no solutes', '0.0 M——细胞内没有溶质')], 0,
    'Mass change crosses zero between 0.2 M (+5%) and 0.4 M (−3%); interpolating gives about 0.2 + 0.2 × 5/8 ≈ 0.33 M. At that concentration the solution is isotonic and there is no net osmosis.', '质量变化在 0.2 M（+5%）与 0.4 M（−3%）之间穿过 0；内插约为 0.2 + 0.2 × 5/8 ≈ 0.33 M。此时溶液等渗，没有净渗透。');
  add('bio2', 2, 2, 'experiment', 'In the potato-core experiment, what is the independent variable?', '在马铃薯条实验中，自变量是什么？',
    [o('The sucrose concentration', '蔗糖溶液浓度'), o('The percent change in mass', '质量变化百分比'), o('The soaking time', '浸泡时间'), o('The size of the potato cores', '马铃薯条的大小')], 0,
    'The independent variable is the one the experimenter changes on purpose (sucrose concentration). Mass change is measured (dependent); time and core size are kept constant (controlled variables).', '自变量是实验者有意改变的量（蔗糖浓度）。质量变化是测量结果（因变量）；时间和大小保持不变（控制变量）。');
  add('bio4', 4, 2, 'experiment', 'A student tests whether light color affects the rate of photosynthesis in Elodea by counting bubbles. Which is the best control?', '学生通过数气泡测试光的颜色是否影响水蕴草的光合速率。最好的对照是什么？',
    [o('An identical setup under white light at the same distance and temperature', '相同装置，在同样距离和温度下用白光照射'), o('A setup with no plant', '不放植物的装置'), o('A setup with a different plant species', '换一种植物的装置'), o('Counting bubbles for a shorter time', '缩短数气泡的时间')], 0,
    'A control keeps every variable the same except the one being tested; white light at the same distance and temperature is the baseline for comparing colors.', '对照组应只改变被测变量、其余全部相同；相同距离和温度下的白光就是比较颜色的基准。');
  add('bio3', 4, 3, 'experiment', 'Catalase is tested at pH 3, 5, 7, 9 and 11 using equal volumes of H₂O₂ and the same temperature. Which change would most improve the reliability of the results?', '在 pH 3、5、7、9、11 下测定过氧化氢酶活性，H₂O₂ 体积和温度都相同。哪项改进最能提高结果的可靠性？',
    [o('Repeat each pH at least three times and average', '每个 pH 至少重复 3 次并取平均'), o('Use a different enzyme at each pH', '每个 pH 用不同的酶'), o('Test only pH 7', '只测 pH 7'), o('Let the temperature vary', '让温度自由变化')], 0,
    'Repeated trials reduce the effect of random error and let you spot anomalies. Changing the enzyme or temperature would add confounding variables.', '重复实验能降低随机误差并发现异常值；更换酶或改变温度会引入干扰变量。');

  var LOG = plot({ x: [0, 20], y: [0, 1200], xt: [0, 4, 8, 12, 16, 20], yt: [0, 300, 600, 900, 1200], xl: 'Time (weeks) 时间（周）', yl: 'Population 种群数量',
    series: [{ c: '#15803d', pts: curve(function (t) { return 1000 / (1 + 49 * Math.exp(-0.55 * t)); }, 0, 20, 40) }, { c: '#9ca3af', dash: true, pts: [[0, 1000], [20, 1000]], label: 'K' }] });
  add('bio10', 3, 2, 'data', 'This yeast population levels off at about 1000 cells. What does that value represent?', '这个酵母种群稳定在约 1000 个细胞。这个数值代表什么？',
    [o('The carrying capacity (K) of the environment', '环境容纳量（K 值）'), o('The birth rate', '出生率'), o('Exponential growth', '指数增长'), o('The founder population', '奠基种群')], 0,
    'Logistic growth slows and levels off at the carrying capacity, where limited resources make births ≈ deaths.', '逻辑斯蒂增长会减速并在容纳量处稳定，此时资源有限，出生 ≈ 死亡。', LOG);
  add('bio10', 3, 3, 'data', 'On this logistic curve, when is the population growing fastest?', '在这条逻辑斯蒂曲线上，种群什么时候增长最快？',
    [o('Around week 7, when N ≈ K/2', '约第 7 周，N ≈ K/2 时'), o('At week 0', '第 0 周'), o('After week 16', '第 16 周以后'), o('It grows at the same rate the whole time', '始终以相同速率增长')], 0,
    'The curve is steepest at its inflection point, half the carrying capacity (≈500), which this graph reaches around week 7.', '曲线在拐点处最陡，即容纳量的一半（约 500），图中约在第 7 周。', LOG);

  var PED = '<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" role="img" style="max-width:380px;width:100%" font-family="sans-serif">' +
    '<rect x="70" y="20" width="26" height="26" fill="#fff" stroke="' + INK + '" stroke-width="2"/><circle cx="223" cy="33" r="13" fill="#fff" stroke="' + INK + '" stroke-width="2"/>' + line(96, 33, 210, 33) + line(160, 33, 160, 80) + line(60, 80, 260, 80) +
    line(60, 80, 60, 100) + line(130, 80, 130, 100) + line(190, 80, 190, 100) + line(260, 80, 260, 100) +
    '<rect x="47" y="100" width="26" height="26" fill="' + INK + '" stroke="' + INK + '" stroke-width="2"/><circle cx="130" cy="113" r="13" fill="#fff" stroke="' + INK + '" stroke-width="2"/>' +
    '<rect x="177" y="100" width="26" height="26" fill="#fff" stroke="' + INK + '" stroke-width="2"/><circle cx="260" cy="113" r="13" fill="' + INK + '" stroke="' + INK + '" stroke-width="2"/>' +
    '<text x="83" y="62" text-anchor="middle" font-size="11" fill="' + MUTED + '">I-1</text><text x="223" y="62" text-anchor="middle" font-size="11" fill="' + MUTED + '">I-2</text>' +
    [['II-1', 60], ['II-2', 130], ['II-3', 190], ['II-4', 260]].map(function (x) { return '<text x="' + x[1] + '" y="142" text-anchor="middle" font-size="11" fill="' + MUTED + '">' + x[0] + '</text>'; }).join('') +
    '<text x="160" y="180" text-anchor="middle" font-size="11" fill="' + MUTED + '">■ ● = affected 患病 · □ ○ = unaffected 未患病</text></svg>';
  add('bio8', 6, 3, 'diagram', 'Two unaffected parents (I-1, I-2) have an affected son AND an affected daughter. What is the most likely mode of inheritance?', '两个未患病的父母（I-1、I-2）生了一个患病儿子和一个患病女儿。最可能的遗传方式是？',
    [o('Autosomal recessive', '常染色体隐性'), o('Autosomal dominant', '常染色体显性'), o('X-linked recessive', 'X 连锁隐性'), o('Y-linked', 'Y 连锁')], 0,
    'Unaffected parents with affected children means the trait is recessive and both parents are carriers. An affected daughter with an unaffected father rules out X-linked recessive (she would need his Xᵃ). Dominant traits need an affected parent.', '未患病父母生出患病孩子，说明是隐性且父母均为携带者。患病女儿的父亲未患病，排除 X 连锁隐性（女儿需要父亲的 Xᵃ）。显性遗传至少要有一个亲本患病。', PED);
  add('bio8', 6, 3, 'diagram', 'In this pedigree (autosomal recessive), what is the probability that the unaffected daughter II-2 is a carrier?', '在这个系谱（常染色体隐性）中，未患病的女儿 II-2 是携带者的概率是多少？',
    [o('2/3', '2/3'), o('1/2', '1/2'), o('1/4', '1/4'), o('3/4', '3/4')], 0,
    'Aa × Aa gives AA : Aa : aa = 1 : 2 : 1. She is unaffected, so she is AA or Aa — of those 3 equally likely outcomes, 2 are carriers: 2/3.', 'Aa × Aa 得 AA : Aa : aa = 1 : 2 : 1。她未患病，所以只能是 AA 或 Aa，这 3 种等可能情况中 2 种是携带者：2/3。', PED);

  var GEL = '<svg viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg" role="img" style="max-width:340px;width:100%" font-family="sans-serif">' +
    '<rect x="20" y="20" width="260" height="180" rx="6" fill="#eef2ff" stroke="' + INK + '"/>' +
    ['Ladder', 'Crime', 'S1', 'S2', 'S3'].map(function (l, i) { return '<text x="' + (55 + i * 48) + '" y="14" text-anchor="middle" font-size="10" fill="' + INK + '">' + l + '</text><rect x="' + (42 + i * 48) + '" y="26" width="26" height="6" fill="#94a3b8"/>'; }).join('') +
    [[0, [50, 80, 110, 140, 170]], [1, [70, 120, 155]], [2, [60, 100, 150]], [3, [70, 120, 155]], [4, [85, 130]]].map(function (ln) { return ln[1].map(function (y) { return '<rect x="' + (42 + ln[0] * 48) + '" y="' + y + '" width="26" height="5" rx="1" fill="#4338ca"/>'; }).join(''); }).join('') +
    '<text x="290" y="35" font-size="10" fill="' + MUTED + '" text-anchor="end">−</text><text x="290" y="196" font-size="10" fill="' + MUTED + '" text-anchor="end">+</text></svg>';
  add('bio7', 7, 2, 'diagram', 'DNA from a crime scene and three suspects was cut with the same restriction enzyme and run on this gel. Which suspect matches?', '犯罪现场 DNA 和三名嫌疑人的 DNA 用同一种限制酶切割后跑了这块凝胶。哪位嫌疑人匹配？',
    [o('Suspect 2', '嫌疑人 2'), o('Suspect 1', '嫌疑人 1'), o('Suspect 3', '嫌疑人 3'), o('None of them', '都不匹配')], 0,
    'S2 has bands at exactly the same positions as the crime-scene sample, so its fragments are the same lengths.', 'S2 的条带位置与现场样本完全一致，说明片段长度相同。', GEL);
  add('bio7', 7, 3, 'diagram', 'In gel electrophoresis, why do the smallest DNA fragments end up nearest the + end (bottom)?', '凝胶电泳中，为什么最小的 DNA 片段跑到最靠近正极（底部）的位置？',
    [o('DNA is negatively charged and small fragments move through the gel pores faster', 'DNA 带负电，小片段在凝胶孔隙中移动更快'), o('Small fragments are positively charged', '小片段带正电'), o('Large fragments are pulled by gravity', '大片段受重力影响'), o('Small fragments contain more phosphate', '小片段含磷酸更多')], 0,
    'Phosphate groups make DNA negative, so all fragments migrate toward the + electrode; the gel acts like a sieve, so shorter fragments travel farther.', '磷酸基团使 DNA 带负电，所有片段都向正极移动；凝胶像筛子，越短的片段跑得越远。', GEL);

  /* =================== HUMAN GEOGRAPHY =================== */
  var DTM = plot({ x: [0, 100], y: [0, 50], xt: [], yt: [0, 10, 20, 30, 40, 50], xl: 'Stage 1 → 2 → 3 → 4 → 5', yl: 'Rate per 1000 每千人',
    series: [{ c: '#b45309', pts: [[0, 40], [20, 41], [40, 38], [60, 22], [80, 12], [100, 8]] },
      { c: '#1e3a8a', dash: true, pts: [[0, 38], [20, 36], [40, 15], [60, 10], [80, 9], [100, 11]] }],
    marks: [[10, 44, 'I'], [30, 44, 'II'], [50, 44, 'III'], [70, 44, 'IV'], [90, 44, 'V'], [68, 27, 'CBR 出生率'], [66, 1, 'CDR 死亡率（虚线 dashed）']] });
  add('geo2', 0, 2, 'map', 'On this Demographic Transition Model graph, in which stage is natural increase greatest?', '在这张人口转变模型图中，哪个阶段的自然增长率最高？',
    [o('Stage 2', '第 2 阶段'), o('Stage 1', '第 1 阶段'), o('Stage 4', '第 4 阶段'), o('Stage 5', '第 5 阶段')], 0,
    'Natural increase = CBR − CDR. The gap is widest in Stage 2, when death rates fall quickly (better food, sanitation, medicine) but birth rates stay high.', '自然增长率 = 出生率 − 死亡率。第 2 阶段两线差距最大：死亡率因粮食、卫生、医疗改善迅速下降，出生率仍高。', DTM);
  add('geo2', 0, 3, 'map', 'What best explains the falling CBR during Stage 3 of the graph?', '图中第 3 阶段出生率下降的最佳解释是？',
    [o('Urbanization, more education for women and access to contraception', '城市化、女性受教育程度提高和避孕普及'), o('A rise in infant mortality', '婴儿死亡率上升'), o('Famine and war', '饥荒和战争'), o('More agricultural jobs that need children', '更多需要儿童劳动的农业工作')], 0,
    'In Stage 3, children become an economic cost rather than farm labor in cities, women stay in school and work, and family planning spreads — so birth rates drop.', '第 3 阶段，城市中孩子从农业劳动力变为经济成本，女性受教育与就业增加，计划生育普及，出生率因此下降。', DTM);
  add('geo2', 0, 3, 'map', 'A country\'s CDR is now slightly higher than its CBR, as at the far right of the graph. Which policy concern is most likely?', '某国的死亡率已略高于出生率，如图最右侧。最可能面临的政策问题是？',
    [o('An aging population and a shrinking workforce', '人口老龄化与劳动力减少'), o('Rapid population growth straining schools', '人口快速增长导致学校压力'), o('High infant mortality', '婴儿死亡率高'), o('Too many young dependents', '少年抚养人口过多')], 0,
    'Stage 5 (e.g., Japan, Italy) has negative natural increase; the key issues are pensions, health care for the elderly and labor shortages — often met with pronatalist or immigration policies.', '第 5 阶段（如日本、意大利）自然增长为负；主要问题是养老金、老年医疗和劳动力短缺，常用鼓励生育或移民政策应对。', DTM);

  var BURG = '<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" role="img" style="max-width:320px;width:100%" font-family="sans-serif">' +
    ['#fde68a', '#fed7aa', '#fecaca', '#ddd6fe', '#bfdbfe'].map(function (c, i) { return '<circle cx="150" cy="150" r="' + (140 - i * 27) + '" fill="' + c + '" stroke="' + INK + '"/>'; }).join('') +
    '<text x="150" y="155" text-anchor="middle" font-size="14" font-weight="700" fill="' + INK + '">1</text>' +
    [['2', 150, 108], ['3', 150, 82], ['4', 150, 55], ['5', 150, 28]].map(function (x) { return '<text x="' + x[1] + '" y="' + x[2] + '" text-anchor="middle" font-size="14" font-weight="700" fill="' + INK + '">' + x[0] + '</text>'; }).join('') + '</svg>';
  add('geo6', 0, 2, 'map', 'This diagram shows the Burgess concentric zone model. What is found in zone 2?', '图为伯吉斯同心圆模型。第 2 圈是什么？',
    [o('Zone of transition — factories and deteriorating housing', '过渡带——工厂和老旧住房'), o('Commuter zone', '通勤带'), o('Central business district', '中心商务区'), o('High-income residential suburbs', '高收入郊区住宅')], 0,
    'From the center: 1 CBD, 2 zone of transition (industry, poor-quality housing, recent immigrants), 3 working-class homes, 4 middle-class residences, 5 commuter zone.', '由内向外：1 中心商务区，2 过渡带（工业、劣质住房、新移民），3 工人住宅区，4 中产住宅区，5 通勤带。', BURG);
  add('geo6', 0, 3, 'map', 'A major criticism of the model in the diagram when applied to modern cities is that it…', '把图中的模型用于现代城市时，一个主要批评是它……',
    [o('ignores cars, highways and multiple business centers (edge cities)', '忽视了汽车、高速公路和多个商业中心（边缘城市）'), o('puts the CBD at the center', '把 CBD 放在中心'), o('was based on Chicago', '以芝加哥为基础'), o('includes a commuter zone', '包含通勤带')], 0,
    'Burgess (1920s Chicago) assumed a single center and streetcar-era growth; car-based sprawl and edge cities led to the Harris–Ullman multiple-nuclei and galactic city models.', '伯吉斯模型（1920 年代芝加哥）假设单一中心和电车时代的扩张；汽车带来的郊区化和边缘城市催生了多核心模型与银河城市模型。', BURG);

  var THU = '<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" role="img" style="max-width:320px;width:100%" font-family="sans-serif">' +
    ['#d9f99d', '#86efac', '#fde68a', '#fed7aa'].map(function (c, i) { return '<circle cx="150" cy="150" r="' + (140 - i * 30) + '" fill="' + c + '" stroke="' + INK + '"/>'; }).join('') +
    '<circle cx="150" cy="150" r="18" fill="#1f2937"/><text x="150" y="154" text-anchor="middle" font-size="10" fill="#fff">Market</text>' +
    [['A', 150, 112], ['B', 150, 82], ['C', 150, 52], ['D', 150, 22]].map(function (x) { return '<text x="' + x[1] + '" y="' + x[2] + '" text-anchor="middle" font-size="14" font-weight="700" fill="' + INK + '">' + x[0] + '</text>'; }).join('') + '</svg>';
  add('geo5', 2, 2, 'map', 'In von Thünen\'s model shown here, which activity is in ring A, nearest the market?', '图为冯·杜能模型。最靠近市场的 A 环是什么活动？',
    [o('Market gardening and dairy', '蔬菜园艺与乳业'), o('Ranching', '畜牧'), o('Grain farming', '谷物种植'), o('Forestry', '林业')], 0,
    'Perishable, high-value goods (vegetables, milk) must be close to market because transport costs and spoilage are high.', '易腐、高价值的产品（蔬菜、牛奶）运输成本高、易变质，必须靠近市场。', THU);
  add('geo5', 2, 3, 'map', 'Why is ranching (ring D) located farthest from the market?', '为什么畜牧业（D 环）位于离市场最远的地方？',
    [o('It needs lots of cheap land and animals can walk to market, so transport cost per unit is low', '需要大量廉价土地，牲畜可自行走到市场，单位运输成本低'), o('Animals spoil quickly', '牲畜很快变质'), o('Ranchers prefer isolation', '牧场主喜欢偏僻'), o('Soil is better far away', '远处土壤更好')], 0,
    'Land is cheapest far from the market (bid-rent falls with distance). Ranching is land-extensive and livestock historically walked to market, so it can bear the distance.', '离市场越远地价越低（竞租随距离下降）。畜牧业占地广，牲畜过去可自行赶到市场，能承受远距离。', THU);

  var SCAT = (function () {
    var pts = [[1, 6.2], [1.5, 5.5], [2, 4.9], [3, 4.1], [4, 3.4], [6, 2.9], [8, 2.4], [12, 2.1], [18, 1.9], [25, 1.7], [35, 1.6], [45, 1.7], [55, 1.6]];
    var W = 360, H = 240, Lm = 46, R = 14, T = 14, Bm = 38, iw = W - Lm - R, ih = H - T - Bm;
    function X(v) { return Lm + Math.log(v) / Math.log(60) * iw; } function Y(v) { return T + ih - v / 7 * ih; }
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" style="max-width:440px;width:100%" font-family="sans-serif">';
    [0, 2, 4, 6].forEach(function (v) { s += '<line x1="' + Lm + '" x2="' + (W - R) + '" y1="' + Y(v) + '" y2="' + Y(v) + '" stroke="' + GRID + '"/><text x="' + (Lm - 6) + '" y="' + (Y(v) + 4) + '" text-anchor="end" font-size="10" fill="' + MUTED + '">' + v + '</text>'; });
    [1, 5, 10, 50].forEach(function (v) { s += '<text x="' + X(v) + '" y="' + (T + ih + 14) + '" text-anchor="middle" font-size="10" fill="' + MUTED + '">$' + v + 'k</text>'; });
    s += '<line x1="' + Lm + '" y1="' + (T + ih) + '" x2="' + (W - R) + '" y2="' + (T + ih) + '" stroke="' + INK + '"/><line x1="' + Lm + '" y1="' + T + '" x2="' + Lm + '" y2="' + (T + ih) + '" stroke="' + INK + '"/>';
    pts.forEach(function (p) { s += '<circle cx="' + X(p[0]) + '" cy="' + Y(p[1]) + '" r="5" fill="#b45309" fill-opacity=".8"/>'; });
    s += '<text x="' + (Lm + iw / 2) + '" y="' + (H - 6) + '" text-anchor="middle" font-size="11" fill="' + INK + '">GDP per capita (log scale) 人均 GDP</text><text x="12" y="' + (T + ih / 2) + '" text-anchor="middle" font-size="11" fill="' + INK + '" transform="rotate(-90 12 ' + (T + ih / 2) + ')">TFR 总和生育率</text>';
    return s + '</svg>';
  })();
  add('geo7', 3, 2, 'data', 'The scatter plot shows countries\' GDP per capita and total fertility rate (TFR). Which statement describes the pattern?', '散点图显示各国人均 GDP 与总和生育率。哪项描述了图中的规律？',
    [o('As GDP per capita rises, TFR falls (negative correlation)', '人均 GDP 越高，生育率越低（负相关）'), o('Richer countries have higher TFR', '越富裕的国家生育率越高'), o('There is no relationship', '两者没有关系'), o('TFR rises, then falls sharply at high income', '生育率先升后在高收入时骤降')], 0,
    'Points fall from upper-left to lower-right: higher income is associated with lower fertility, linked to urbanization, women\'s education and lower child mortality.', '点从左上向右下分布：收入越高生育率越低，与城市化、女性教育和儿童死亡率下降有关。', SCAT);
  add('geo7', 3, 3, 'data', 'Why is the x-axis of this scatter plot on a logarithmic scale?', '为什么这张散点图的横轴使用对数刻度？',
    [o('Incomes range over a factor of ~50, so a log scale spreads out poorer countries', '收入相差约 50 倍，对数刻度能拉开低收入国家的分布'), o('To hide outliers', '为了隐藏异常值'), o('Because TFR is a percentage', '因为生育率是百分比'), o('Log scales always show correlation', '对数刻度总能显示相关性')], 0,
    'GDP per capita spans roughly $1k to $55k; on a linear axis most low-income countries would be squeezed together at the left.', '人均 GDP 跨度约 1 千到 5.5 万美元；用线性刻度，大多数低收入国家会挤在最左边。', SCAT);

  add('geo6', 4, 3, 'data', 'City populations (millions) in Country X: 1st 8.0, 2nd 4.0, 3rd 2.7, 4th 2.0. What does this show?', 'X 国城市人口（百万）：第 1 名 8.0，第 2 名 4.0，第 3 名 2.7，第 4 名 2.0。这说明什么？',
    [o('The rank-size rule (nth city ≈ 1/n of the largest)', '位序-规模法则（第 n 位城市 ≈ 最大城市的 1/n）'), o('A primate city', '首位城市'), o('Central place theory hexagons', '中心地理论六边形'), o('Gentrification', '绅士化')], 0,
    '8.0 / 2 = 4.0, 8.0 / 3 ≈ 2.7, 8.0 / 4 = 2.0 — exactly the rank-size pattern. A primate city would be more than twice the size of the second city.', '8.0/2 = 4.0，8.0/3 ≈ 2.7，8.0/4 = 2.0，正好符合位序-规模法则。首位城市应比第二大城市大两倍以上。');
  add('geo1', 7, 2, 'data', 'Country A: 50 million people, 500,000 km² total, 100,000 km² arable. What is its physiological density?', 'A 国：人口 5000 万，国土 50 万 km²，耕地 10 万 km²。其生理密度是多少？',
    [o('500 people per km² of arable land', '每平方公里耕地 500 人'), o('100 people per km²', '每平方公里 100 人'), o('0.2 km² per person', '每人 0.2 km²'), o('5,000 people per km²', '每平方公里 5000 人')], 0,
    'Physiological density = population ÷ arable land = 50,000,000 ÷ 100,000 = 500 per km². (Arithmetic density would be 50,000,000 ÷ 500,000 = 100.)', '生理密度 = 人口 ÷ 耕地 = 5000 万 ÷ 10 万 = 500 人/km²（算术密度为 5000 万 ÷ 50 万 = 100）。');

  /* =================== PRE-CALCULUS (graph reading) =================== */
  add('pc1', 2, 2, 'diagram', 'Which equation matches this parabola?', '哪个方程与这条抛物线相符？',
    [o('y = (x − 2)² − 1', 'y = (x − 2)² − 1'), o('y = (x + 2)² − 1', 'y = (x + 2)² − 1'), o('y = (x − 2)² + 1', 'y = (x − 2)² + 1'), o('y = −(x − 2)² − 1', 'y = −(x − 2)² − 1')], 0,
    'The vertex is at (2, −1) and it opens upward with the parent shape, so y = (x − h)² + k with h = 2, k = −1. Note: x − 2 shifts RIGHT.', '顶点为 (2, −1)，开口向上且形状与母函数相同，故 y = (x − h)² + k，h = 2，k = −1。注意 x − 2 表示向右平移。', graph(function (x) { return (x - 2) * (x - 2) - 1; }, { pts: [[2, -1]] }));
  add('pc2', 2, 3, 'diagram', 'Which function matches the graph (dashed lines are asymptotes)?', '哪个函数与图像相符（虚线为渐近线）？',
    [o('y = 1/(x + 1) + 2', 'y = 1/(x + 1) + 2'), o('y = 1/(x − 1) + 2', 'y = 1/(x − 1) + 2'), o('y = 1/(x + 2) + 1', 'y = 1/(x + 2) + 1'), o('y = −1/(x + 1) + 2', 'y = −1/(x + 1) + 2')], 0,
    'The vertical asymptote is x = −1 (zero of x + 1) and the horizontal asymptote is y = 2; the branches sit in the upper-right and lower-left, so the coefficient is positive.', '竖直渐近线 x = −1（x + 1 = 0），水平渐近线 y = 2；两支位于右上和左下，所以系数为正。', graph(function (x) { return 1 / (x + 1) + 2; }, { asym: [['x', -1], ['y', 2]] }));
  add('pc4', 3, 2, 'diagram', 'What are the amplitude and period of the sinusoid shown? (x-axis in radians)', '图中正弦曲线的振幅和周期是多少？（x 轴单位为弧度）',
    [o('Amplitude 2, period π', '振幅 2，周期 π'), o('Amplitude 4, period π', '振幅 4，周期 π'), o('Amplitude 2, period 2π', '振幅 2，周期 2π'), o('Amplitude 1, period π/2', '振幅 1，周期 π/2')], 0,
    'The curve goes from −2 to 2, so amplitude = 2 (half the max–min distance). One full cycle takes about 3.14 units, so the period is π, i.e. y = 2 sin(2x).', '曲线在 −2 到 2 之间，振幅 = 2（最大最小值之差的一半）。一个完整周期约 3.14，即 π，函数为 y = 2 sin(2x)。', graph(function (x) { return 2 * Math.sin(2 * x); }, { r: 5 }));
  add('pc3', 0, 2, 'diagram', 'The graph passes through (0, 4) and (1, 2) and approaches y = 0. Which model fits?', '图像经过 (0, 4) 和 (1, 2)，并趋近于 y = 0。哪个模型合适？',
    [o('y = 4(1/2)ˣ', 'y = 4(1/2)ˣ'), o('y = 4 · 2ˣ', 'y = 4 · 2ˣ'), o('y = 2(1/2)ˣ', 'y = 2(1/2)ˣ'), o('y = 4 − 2x', 'y = 4 − 2x')], 0,
    'The y-intercept gives a = 4; each step of 1 in x halves y (4 → 2), so b = 1/2: exponential decay y = 4(1/2)ˣ with asymptote y = 0.', 'y 截距给出 a = 4；x 每增加 1，y 减半（4 → 2），所以 b = 1/2：指数衰减 y = 4(1/2)ˣ，渐近线 y = 0。', graph(function (x) { return 4 * Math.pow(0.5, x); }, { pts: [[0, 4], [1, 2]], asym: [['y', 0]] }));
  add('pc2', 1, 3, 'diagram', 'The polynomial graph touches the x-axis at x = −2 and crosses it at x = 1 and x = 3. Which statement is true?', '多项式图像在 x = −2 处与 x 轴相切，在 x = 1 和 x = 3 处穿过 x 轴。哪项正确？',
    [o('x = −2 is a zero of even multiplicity', 'x = −2 是偶数重根'), o('x = −2 is a zero of multiplicity 1', 'x = −2 是单根'), o('The polynomial has degree 3', '多项式的次数为 3'), o('x = 1 is a double root', 'x = 1 是二重根')], 0,
    'A graph that touches and turns around at a zero has even multiplicity there; crossing means odd multiplicity. Zeros of multiplicity 2, 1, 1 → degree at least 4.', '图像在零点处相切并折返说明是偶数重根；穿过说明是奇数重根。重数 2、1、1 → 次数至少为 4。',
    graph(function (x) { return 0.12 * (x + 2) * (x + 2) * (x - 1) * (x - 3); }, { pts: [[-2, 0], [1, 0], [3, 0]] }));
  add('pc1', 0, 2, 'diagram', 'What are the domain and range of the function graphed (a square-root curve starting at (−3, 1))?', '图中函数（从 (−3, 1) 开始的平方根曲线）的定义域和值域是什么？',
    [o('Domain x ≥ −3, range y ≥ 1', '定义域 x ≥ −3，值域 y ≥ 1'), o('Domain x ≥ 1, range y ≥ −3', '定义域 x ≥ 1，值域 y ≥ −3'), o('All real numbers', '全体实数'), o('Domain x ≤ −3, range y ≤ 1', '定义域 x ≤ −3，值域 y ≤ 1')], 0,
    'The graph starts at x = −3 and goes right, and its lowest y-value is 1 — this is y = √(x + 3) + 1.', '图像从 x = −3 开始向右延伸，最低 y 值为 1，即 y = √(x + 3) + 1。', graph(function (x) { return x < -3 ? NaN : Math.sqrt(x + 3) + 1; }, { pts: [[-3, 1]] }));
  add('pc3', 6, 3, 'application', 'pH = −log[H⁺]. Solution A has pH 3 and solution B has pH 5. How do their hydrogen-ion concentrations compare?', 'pH = −log[H⁺]。溶液 A 的 pH 为 3，溶液 B 的 pH 为 5。二者氢离子浓度如何比较？',
    [o('A has 100 times the [H⁺] of B', 'A 的 [H⁺] 是 B 的 100 倍'), o('A has 2 times the [H⁺] of B', 'A 的 [H⁺] 是 B 的 2 倍'), o('B has 100 times the [H⁺] of A', 'B 的 [H⁺] 是 A 的 100 倍'), o('They differ by 5/3', '相差 5/3 倍')], 0,
    '[H⁺] = 10⁻ᵖᴴ: A = 10⁻³, B = 10⁻⁵, ratio 10⁻³/10⁻⁵ = 10² = 100. Each pH unit is a factor of 10 on a log scale.', '[H⁺] = 10⁻ᵖᴴ：A = 10⁻³，B = 10⁻⁵，比值 10² = 100。对数刻度上每差 1 个 pH 单位相差 10 倍。');
})();
