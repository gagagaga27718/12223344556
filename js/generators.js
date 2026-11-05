/* Infinite question generators — procedurally create bilingual questions with random parameters */
window.GENERATORS = {

  /* ================= PRECALCULUS ================= */
  precalc: [
    // 1. Solve b^x = N
    function () {
      var bases = [2, 3, 5], b = pick(bases), n = 2 + rnd(5), N = Math.pow(b, n);
      return mk('calculation',
        { en: 'Solve for x: ' + b + '^x = ' + N, zh: '解方程：' + b + '^x = ' + N },
        numOpts(n),
        { en: b + '^' + n + ' = ' + N + ', so x = ' + n + '.', zh: b + '^' + n + ' = ' + N + '，所以 x = ' + n + '。' });
    },
    // 2. Domain of sqrt(x - a)
    function () {
      var a = 1 + rnd(9);
      return mk('concept',
        { en: 'Find the domain of f(x) = √(x − ' + a + ').', zh: '求 f(x) = √(x − ' + a + ') 的定义域。' },
        opts(txt('x ≥ ' + a), [txt('x > ' + a), txt('x ≤ ' + a), txt('x ≥ ' + (-a)), txt('All real numbers', '全体实数')]),
        { en: 'The inside of the square root must be ≥ 0: x − ' + a + ' ≥ 0 → x ≥ ' + a + '.', zh: '根号内必须 ≥ 0：x − ' + a + ' ≥ 0 → x ≥ ' + a + '。' });
    },
    // 3. Inverse of f(x) = ax + b
    function () {
      var a = 2 + rnd(4), b = rnd(9) + 1;
      return mk('calculation',
        { en: 'Find the inverse of f(x) = ' + a + 'x + ' + b + '.', zh: '求 f(x) = ' + a + 'x + ' + b + ' 的反函数。' },
        opts(txt('f⁻¹(x) = (x − ' + b + ')/' + a), [txt('f⁻¹(x) = (x + ' + b + ')/' + a), txt('f⁻¹(x) = ' + a + 'x − ' + b), txt('f⁻¹(x) = 1/(' + a + 'x + ' + b + ')'), txt('f⁻¹(x) = (x − ' + a + ')/' + b)]),
        { en: 'Swap x and y: x = ' + a + 'y + ' + b + ' → y = (x − ' + b + ')/' + a + '.', zh: '交换 x 和 y：x = ' + a + 'y + ' + b + ' → y = (x − ' + b + ')/' + a + '。' });
    },
    // 4. Vector magnitude (pythagorean triples)
    function () {
      var triples = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [7, 24, 25]];
      var t = pick(triples);
      return mk('calculation',
        { en: 'What is the magnitude of the vector ⟨' + t[0] + ', ' + t[1] + '⟩?', zh: '向量 ⟨' + t[0] + ', ' + t[1] + '⟩ 的模是多少？' },
        numOpts(t[2]),
        { en: '|v| = √(' + t[0] + '² + ' + t[1] + '²) = ' + t[2] + '.', zh: '|v| = √(' + t[0] + '² + ' + t[1] + '²) = ' + t[2] + '。' });
    },
    // 5. Geometric nth term
    function () {
      var a1 = 1 + rnd(4), r = 2 + rnd(2), n = 3 + rnd(5);
      var val = a1 * Math.pow(r, n - 1);
      return mk('calculation',
        { en: 'A geometric sequence starts at ' + a1 + ' with ratio ' + r + '. Find term #' + n + '.', zh: '等比数列首项为 ' + a1 + '，公比为 ' + r + '。求第 ' + n + ' 项。' },
        numOpts(val),
        { en: 'aₙ = a₁·r⁽ⁿ⁻¹⁾ = ' + a1 + '·' + r + '^' + (n - 1) + ' = ' + val + '.', zh: 'aₙ = a₁·r⁽ⁿ⁻¹⁾ = ' + a1 + '·' + r + '^' + (n - 1) + ' = ' + val + '。' });
    },
    // 6. Unit circle values
    function () {
      var table = [
        ['π/6', '1/2', '√3/2'], ['π/3', '√3/2', '1/2'], ['π/4', '√2/2', '√2/2'],
        ['5π/6', '1/2', '−√3/2'], ['4π/3', '−√3/2', '−1/2'], ['11π/6', '−1/2', '√3/2'], ['7π/6', '−1/2', '−√3/2'], ['2π/3', '√3/2', '−1/2']
      ];
      var row = pick(table), useSin = rnd(2) === 0;
      var fn = useSin ? 'sin' : 'cos', val = useSin ? row[1] : row[2];
      var pool = [txt('1/2'), txt('√3/2'), txt('√2/2'), txt('−1/2'), txt('−√3/2'), txt('−√2/2')];
      return mk('calculation',
        { en: fn + '(' + row[0] + ') = ?', zh: fn + '(' + row[0] + ') = ?' },
        opts(txt(val), pool),
        { en: 'From the unit circle: ' + fn + '(' + row[0] + ') = ' + val + '. Signs follow ASTC.', zh: '查单位圆：' + fn + '(' + row[0] + ') = ' + val + '。符号按 ASTC 判断。' });
    },
    // 7. Arithmetic nth term
    function () {
      var a1 = 2 + rnd(8), d = 2 + rnd(6), n = 5 + rnd(10);
      var val = a1 + (n - 1) * d;
      return mk('calculation',
        { en: 'An arithmetic sequence starts at ' + a1 + ' with common difference ' + d + '. Find term #' + n + '.', zh: '等差数列首项为 ' + a1 + '，公差为 ' + d + '。求第 ' + n + ' 项。' },
        numOpts(val),
        { en: 'aₙ = a₁ + (n−1)d = ' + a1 + ' + ' + (n - 1) + '·' + d + ' = ' + val + '.', zh: 'aₙ = a₁ + (n−1)d = ' + a1 + ' + ' + (n - 1) + '·' + d + ' = ' + val + '。' });
    },
    // 8. 2x2 determinant
    function () {
      var a = 1 + rnd(5), b = 1 + rnd(5), c = 1 + rnd(5), d = 1 + rnd(5);
      var det = a * d - b * c;
      return mk('calculation',
        { en: 'Find the determinant of [[' + a + ', ' + b + '], [' + c + ', ' + d + ']].', zh: '求矩阵 [[' + a + ', ' + b + '], [' + c + ', ' + d + ']] 的行列式。' },
        numOpts(det),
        { en: 'det = ad − bc = (' + a + ')(' + d + ') − (' + b + ')(' + c + ') = ' + det + '.', zh: 'det = ad − bc = (' + a + ')(' + d + ') − (' + b + ')(' + c + ') = ' + det + '。' });
    },
    // 9. Infinite geometric sum
    function () {
      var r = pick([0.5, 0.25, 0.2, 0.1]), a1 = pick([8, 16, 40, 100]);
      var S = Math.round(a1 / (1 - r) * 100) / 100;
      return mk('calculation',
        { en: 'Evaluate the infinite geometric series with a₁ = ' + a1 + ' and r = ' + r + '.', zh: '求无穷等比级数的和：a₁ = ' + a1 + '，r = ' + r + '。' },
        numOpts(S),
        { en: '|r| < 1 so it converges: S = a₁/(1−r) = ' + a1 + '/' + (1 - r) + ' = ' + S + '.', zh: '|r| < 1 收敛：S = a₁/(1−r) = ' + a1 + '/' + (1 - r) + ' = ' + S + '。' });
    },
    // 10. Log solve
    function () {
      var b = pick([2, 3, 5, 10]), c = 2 + rnd(4), x = Math.pow(b, c);
      return mk('calculation',
        { en: 'Solve log_' + b + '(x) = ' + c + '.', zh: '解方程 log_' + b + '(x) = ' + c + '。' },
        numOpts(x),
        { en: 'Exponential form: x = ' + b + '^' + c + ' = ' + x + '.', zh: '指数式：x = ' + b + '^' + c + ' = ' + x + '。' });
    },
    // 11. Period of a sin(bx)
    function () {
      var A = 2 + rnd(5), B = pick([2, 3, 4]);
      var period = B === 2 ? 'π' : (B === 4 ? 'π/2' : '2π/' + B);
      return mk('concept',
        { en: 'What is the period of y = ' + A + 'sin(' + B + 'x)?', zh: 'y = ' + A + 'sin(' + B + 'x) 的周期是？' },
        opts(txt(period), [txt('2π'), txt('2π'), txt('π'), txt('2π/' + (B + 2)), txt('2π/' + (B - 1)), txt(String(A))]),
        { en: 'Period = 2π/B = 2π/' + B + ' = ' + period + '. The amplitude ' + A + ' affects only height.', zh: '周期 = 2π/B = 2π/' + B + ' = ' + period + '。振幅 ' + A + ' 只影响高度。' });
    },
    // 12. Identify function from SVG graph
    function () {
      var kinds = [
        { svg: parabolaSvg(), en: 'y = x² (parabola)', zh: 'y = x²（抛物线）', why: { en: 'A U-shaped curve opening upward with vertex at the origin is y = x².', zh: '开口向上、顶点在原点的 U 形曲线是 y = x²。' } },
        { svg: cubicSvg(), en: 'y = x³ (cubic)', zh: 'y = x³（三次函数）', why: { en: 'An S-shaped curve with odd symmetry through the origin is y = x³.', zh: '过原点、奇对称的 S 形曲线是 y = x³。' } },
        { svg: reciprocalSvg(), en: 'y = 1/x (rational)', zh: 'y = 1/x（有理函数）', why: { en: 'Two branches in opposite quadrants with vertical and horizontal asymptotes is y = 1/x.', zh: '两支曲线位于对角象限、带垂直和水平渐近线的是 y = 1/x。' } },
        { svg: sineSvg(), en: 'y = sin(x)', zh: 'y = sin(x)', why: { en: 'A smooth wave oscillating between −1 and 1 is y = sin(x).', zh: '在 −1 和 1 之间平滑振荡的波形是 y = sin(x)。' } }
      ];
      var k = pick(kinds);
      return mk('application',
        { en: 'Which function matches this graph?', zh: '下面图像对应哪个函数？' },
        opts(txt(k.en, k.zh), kinds.filter(function (x) { return x !== k; }).map(function (x) { return txt(x.en, x.zh); })),
        k.why, k.svg);
    }
  ],

  /* ================= BIOLOGY ================= */
  bio: [
    // 1. Punnett Aa x Aa recessive probability
    function () {
      return mk('calculation',
        { en: 'In a cross Aa × Aa (A dominant), what fraction shows the recessive phenotype?', zh: '杂交 Aa × Aa（A 为显性），隐性表型占多少？' },
        opts(txt('1/4'), [txt('3/4'), txt('1/2'), txt('1/16'), txt('2/3')]),
        { en: 'Punnett square: AA, Aa, Aa, aa → 1/4 recessive (aa), 3/4 dominant.', zh: '棋盘：AA、Aa、Aa、aa → 1/4 隐性（aa），3/4 显性。' });
    },
    // 2. Hardy-Weinberg
    function () {
      var q2 = pick([0.04, 0.09, 0.16, 0.25, 0.36, 0.49]);
      var q = Math.round(Math.sqrt(q2) * 100) / 100;
      var p = Math.round((1 - q) * 100) / 100;
      return mk('calculation',
        { en: q2 * 100 + '% of a population shows the recessive phenotype (aa). What is the frequency of allele a (q)?', zh: '某种群 ' + q2 * 100 + '% 表现为隐性性状（aa）。等位基因 a 的频率 q 是多少？' },
        numOpts(q),
        { en: 'q² = ' + q2 + ' → q = ' + q + ' (then p = ' + p + ').', zh: 'q² = ' + q2 + ' → q = ' + q + '（p = ' + p + '）。' });
    },
    // 3. Dihybrid double recessive
    function () {
      return mk('concept',
        { en: 'AaBb × AaBb: what fraction shows BOTH recessive phenotypes (aabb)?', zh: 'AaBb × AaBb：双重隐性表型（aabb）占多少？' },
        opts(txt('1/16'), [txt('3/16'), txt('9/16'), txt('1/4'), txt('1/8')]),
        { en: '1/4 × 1/4 = 1/16. The full dihybrid ratio is 9:3:3:1.', zh: '1/4 × 1/4 = 1/16。双因子比例 9:3:3:1。' });
    },
    // 4. 10% rule
    function () {
      var e = pick([20000, 50000, 100000]);
      var second = e / 100;
      return mk('calculation',
        { en: 'An ecosystem has ' + e + ' kJ of energy in producers. About how much reaches SECONDARY consumers?', zh: '某生态系统生产者含 ' + e + ' kJ 能量。次级消费者约能获得多少？' },
        numOpts(second),
        { en: 'Two transfers at ~10% each: ' + e + ' → ' + e / 10 + ' → ' + second + ' kJ.', zh: '两次 ~10% 传递：' + e + ' → ' + e / 10 + ' → ' + second + ' kJ。' });
    },
    // 5. Meiosis chromosome count
    function () {
      var n = pick([16, 20, 24, 32, 46]);
      return mk('concept',
        { en: 'An organism has 2n = ' + n + ' chromosomes. How many are in each gamete?', zh: '某生物 2n = ' + n + ' 条染色体。每个配子有多少条？' },
        numOpts(n / 2),
        { en: 'Meiosis halves the number: n = ' + n / 2 + '. Fertilization restores ' + n + '.', zh: '减数分裂减半：n = ' + n / 2 + '。受精恢复为 ' + n + '。' });
    },
    // 6. Blood type cross
    function () {
      var crosses = [
        { c: 'IAi × IAi', ans: 'A or O' },
        { c: 'IAi × ii', ans: 'A or O' },
        { c: 'IAIB × ii', ans: 'A or B' },
        { c: 'IAi × IBi', ans: 'A, B, AB, or O' },
        { c: 'ii × ii', ans: 'O only' }
      ];
      var x = pick(crosses);
      var pool = ['A or O', 'A, B, AB, or O', 'A or B', 'AB only', 'O only', 'B only'];
      return mk('application',
        { en: 'Parents with blood types ' + x.c + ': which blood type(s) can their child have?', zh: '父母血型 ' + x.c + '：孩子可能是什么血型？' },
        opts(txt(x.ans), pool.map(function (s) { return txt(s); })),
        { en: x.c + ' → children can be: ' + x.ans + '.', zh: x.c + ' → 孩子可能：' + x.ans + '。' });
    },
    // 7. Codon translation
    function () {
      var codons = [['AUG', 'Methionine', '甲硫氨酸'], ['UUU', 'Phenylalanine', '苯丙氨酸'], ['AAA', 'Lysine', '赖氨酸'], ['GGU', 'Glycine', '甘氨酸'], ['CAU', 'Histidine', '组氨酸'], ['UUG', 'Leucine', '亮氨酸'], ['GCU', 'Alanine', '丙氨酸']];
      var c = pick(codons);
      var pool = codons.filter(function (x) { return x !== c; }).map(function (x) { return txt(x[1], x[2]); });
      return mk('vocab',
        { en: 'The mRNA codon ' + c[0] + ' codes for which amino acid?', zh: 'mRNA 密码子 ' + c[0] + ' 编码哪种氨基酸？' },
        opts(txt(c[1], c[2]), pool),
        { en: c[0] + ' → ' + c[1] + ' (from the codon table).', zh: c[0] + ' → ' + c[1] + '（查密码子表）。' });
    },
    // 8. X-linked inheritance
    function () {
      return mk('calculation',
        { en: 'A carrier mother (XᴬXᵃ) and unaffected father (XᴬY) for an X-linked recessive trait: what fraction of ALL children is affected?', zh: 'X连锁隐性：携带者母亲 (XᴬXᵃ) 与正常父亲 (XᴬY)，所有孩子中患病比例？' },
        opts(txt('1/4'), [txt('1/2'), txt('3/4'), txt('0'), txt('1/8')]),
        { en: 'Sons: 1/2 get Xᵃ → affected; daughters: none affected. 1/2 × 1/2 = 1/4 of all children.', zh: '儿子：1/2 获得 Xᵃ → 患病；女儿无人患病。1/2 × 1/2 = 1/4。' });
    },
    // 9. Cell transport identification
    function () {
      var items = [
        { q: { en: 'A cell ships a protein out via a vesicle that fuses with the membrane. This is:', zh: '细胞通过囊泡与膜融合把蛋白质运出。这是：' }, a: 'Exocytosis', az: '胞吐', why: { en: 'Exocytosis = vesicle fuses with membrane to release contents; endocytosis is the reverse.', zh: '胞吐 = 囊泡与膜融合释放内容物；胞吞相反。' } },
        { q: { en: 'Water moves across a membrane toward a sugary solution. This is:', zh: '水分子穿过膜流向糖溶液。这是：' }, a: 'Osmosis', az: '渗透', why: { en: 'Osmosis = passive water movement toward higher solute concentration.', zh: '渗透 = 水分子被动流向溶质更高的一侧。' } },
        { q: { en: 'A cell pumps Ca²⁺ out against its gradient using ATP. This is:', zh: '细胞消耗 ATP 逆浓度梯度泵出 Ca²⁺。这是：' }, a: 'Active transport', az: '主动运输', why: { en: 'Moving against a gradient requires ATP = active transport.', zh: '逆梯度运输需要 ATP = 主动运输。' } }
      ];
      var it = pick(items);
      return mk('concept', it.q,
        opts(txt(it.a, it.az), [txt('Facilitated diffusion', '协助扩散'), txt('Simple diffusion', '简单扩散'), txt('Phagocytosis', '吞噬作用'), txt('Osmosis', '渗透')]),
        it.why);
    },
    // 10. Product rule genetics
    function () {
      return mk('calculation',
        { en: 'Parents are both carriers (Cc) of a recessive disease. What is the probability their first TWO children are both unaffected?', zh: '父母均为隐性遗传病携带者 (Cc)。前两个孩子都不患病的概率是多少？' },
        opts(txt('9/16'), [txt('3/4'), txt('1/16'), txt('1/2'), txt('3/16')]),
        { en: 'P(unaffected) = 3/4 each; product rule: 3/4 × 3/4 = 9/16.', zh: '每个孩子不患病概率 3/4；乘法定律：3/4 × 3/4 = 9/16。' });
    }
  ],

  /* ================= GEOGRAPHY ================= */
  geo: [
    // 1. NIR calculation
    function () {
      var cbr = pick([15, 18, 20, 22, 25]), cdr = pick([5, 6, 8, 10]);
      var nir = Math.round((cbr - cdr) / 10 * 100) / 100;
      return mk('calculation',
        { en: 'Country X: CBR = ' + cbr + '‰, CDR = ' + cdr + '‰. What is its natural increase rate (%)?', zh: 'X 国：出生率 ' + cbr + '‰，死亡率 ' + cdr + '‰。自然增长率是多少（%）？' },
        numOpts(nir),
        { en: 'NIR = (CBR − CDR)/10 = ' + (cbr - cdr) + '/10 = ' + nir + '%.', zh: 'NIR = (CBR − CDR)/10 = ' + (cbr - cdr) + '/10 = ' + nir + '%。' });
    },
    // 2. DTM stage identification
    function () {
      var stages = [
        { d: { en: 'high birth AND death rates, no sustained growth', zh: '出生率和死亡率都高，无持续增长' }, a: 'Stage 1', azh: '第一阶段' },
        { d: { en: 'death rate falling fast while birth rate stays high — explosive growth', zh: '死亡率快速下降而出生率仍高——人口激增' }, a: 'Stage 2', azh: '第二阶段' },
        { d: { en: 'birth rate falling toward the death rate; growth slowing', zh: '出生率向死亡率靠拢，增长放缓' }, a: 'Stage 3', azh: '第三阶段' },
        { d: { en: 'low birth and death rates; near-zero growth', zh: '低出生率和死亡率，接近零增长' }, a: 'Stage 4', azh: '第四阶段' },
        { d: { en: 'birth rate below death rate; population shrinking', zh: '出生率低于死亡率，人口负增长' }, a: 'Stage 5', azh: '第五阶段' }
      ];
      var s = pick(stages);
      var pool = stages.filter(function (x) { return x !== s; });
      return mk('concept',
        { en: 'A country has ' + s.d.en + '. Which DTM stage is it in?', zh: '某国：' + s.d.zh + '。处于第几阶段？' },
        opts(txt(s.a, s.azh), pool.map(function (x) { return txt(x.a, x.azh); })),
        { en: s.d.en + ' = ' + s.a + '.', zh: s.d.zh + ' = ' + s.a + '。' });
    },
    // 3. Population pyramid SVG → growth pattern
    function () {
      var type = rnd(2); // 0 = expanding, 1 = declining
      return mk('application',
        { en: 'What does this population pyramid show?', zh: '这个人口金字塔显示了什么？' },
        opts(
          txt(type === 0 ? 'Rapid growth — wide base, young population' : 'Population decline — narrow base, aging', type === 0 ? '快速增长——底宽、人口年轻' : '人口负增长——底窄、老龄化'),
          [txt('Rapid growth — wide base, young population', '快速增长——底宽、人口年轻'), txt('Population decline — narrow base, aging', '人口负增长——底窄、老龄化'), txt('Stationary — zero growth', '静止型——零增长')]
        ),
        {
          en: type === 0 ? 'A wide base = high birth rate and young population → rapid growth (Stage 2 pattern).' : 'A narrow base with a wider top = low birth rate, aging → decline (Stage 5 pattern).',
          zh: type === 0 ? '底宽 = 高出生率、年轻型人口 → 快速增长（第二阶段）。' : '底窄顶宽 = 低出生率、老龄化 → 负增长（第五阶段）。'
        },
        pyramidSvg(type));
    },
    // 4. Von Thünen rings
    function () {
      var rings = [
        { a: 'Dairy and intensive farming', azh: '乳业和集约农业', pos: 'innermost ring', poszh: '最内圈' },
        { a: 'Forestry', azh: '林业', pos: 'second ring', poszh: '第二圈' },
        { a: 'Commercial grain farming', azh: '商业谷物种植', pos: 'third ring', poszh: '第三圈' },
        { a: 'Livestock ranching', azh: '放牧畜牧业', pos: 'outermost ring', poszh: '最外圈' }
      ];
      var correct = pick(rings);
      var pool = rings.filter(function (r) { return r !== correct; });
      return mk('application',
        { en: 'In von Thünen\'s model, what belongs in the ' + correct.pos + ' (counting from the market)?', zh: '在冯·杜能模型中，' + correct.poszh + '（从市场数起）是什么活动？' },
        opts(txt(correct.a, correct.azh), pool.map(function (r) { return txt(r.a, r.azh); })),
        { en: 'Rings from the market outward: dairy/intensive → forestry → grain → ranching. Perishable, high-value products stay closest.', zh: '从市场向外：乳业/集约 → 林业 → 谷物 → 放牧。易腐高价值产品离市场最近。' });
    },
    // 5. Agricultural hearths
    function () {
      var hearths = [
        { c: 'wheat and barley', czh: '小麦和大麦', h: 'the Fertile Crescent', hzh: '新月沃地' },
        { c: 'rice', czh: '水稻', h: 'Southeast Asia', hzh: '东南亚' },
        { c: 'maize (corn)', czh: '玉米', h: 'Mesoamerica', hzh: '中美洲' },
        { c: 'potatoes', czh: '马铃薯', h: 'the Andes', hzh: '安第斯山区' },
        { c: 'coffee', czh: '咖啡', h: 'Ethiopia', hzh: '埃塞俄比亚' }
      ];
      var it = pick(hearths);
      var pool = hearths.filter(function (x) { return x !== it; });
      return mk('vocab',
        { en: 'Where was ' + it.c + ' first domesticated?', zh: it.czh + '最早在哪里被驯化？' },
        opts(txt(it.h, it.hzh), pool.map(function (x) { return txt(x.h, x.hzh); })),
        { en: 'Hearths: Fertile Crescent (wheat), SE Asia (rice), Mesoamerica (maize), Andes (potato), Ethiopia (coffee).', zh: '起源地：新月沃地（麦）、东南亚（稻）、中美洲（玉米）、安第斯（马铃薯）、埃塞俄比亚（咖啡）。' });
    },
    // 6. State shapes
    function () {
      var shapes = [
        { s: 'Chile', szh: '智利', a: 'Elongated', azh: '长条形' },
        { s: 'Indonesia', szh: '印度尼西亚', a: 'Fragmented', azh: '破碎形' },
        { s: 'Uruguay', szh: '乌拉圭', a: 'Compact', azh: '紧凑形' },
        { s: 'Namibia (with the Caprivi Strip)', szh: '纳米比亚（含卡普里维地带）', a: 'Prorupted', azh: '凸出形' }
      ];
      var it = pick(shapes);
      var pool = shapes.filter(function (x) { return x !== it; });
      return mk('vocab',
        { en: 'What state shape is ' + it.s + '?', zh: it.szh + '是什么形状的国家？' },
        opts(txt(it.a, it.azh), pool.map(function (x) { return txt(x.a, x.azh); })),
        { en: 'Compact (Uruguay), Elongated (Chile), Fragmented (Indonesia), Prorupted (Namibia).', zh: '紧凑形（乌拉圭）、长条形（智利）、破碎形（印尼）、凸出形（纳米比亚）。' });
    },
    // 7. Diffusion type from scenario
    function () {
      var cases = [
        { s: 'A viral video spreads person to person online', szh: '病毒视频在网上人传人', a: 'Contagious diffusion', azh: '传染扩散' },
        { s: 'Hip-hop spreads from big cities to smaller towns', szh: '嘻哈音乐从大城市传到小城镇', a: 'Hierarchical diffusion', azh: '等级扩散' },
        { s: 'Sikh migrants bring their religion to Canada', szh: '锡克教移民把信仰带到加拿大', a: 'Relocation diffusion', azh: '迁移扩散' },
        { s: 'The drive-through concept adapts from cars to scooters in Asia', szh: '得来速概念在亚洲从汽车版改造为摩托车版', a: 'Stimulus diffusion', azh: '刺激扩散' }
      ];
      var c = pick(cases);
      var pool = cases.filter(function (x) { return x !== c; });
      return mk('application',
        { en: c.s + '. Which diffusion type is this?', zh: c.szh + '。属于哪种扩散？' },
        opts(txt(c.a, c.azh), pool.map(function (x) { return txt(x.a, x.azh); })),
        { en: 'Contagious = person-to-person; Hierarchical = through nodes; Relocation = spreads with people; Stimulus = idea adapted to a new form.', zh: '传染 = 人传人；等级 = 通过节点；迁移 = 随人群传播；刺激 = 理念以新形式传播。' });
    },
    // 8. Rostow stage
    function () {
      var stages = [
        { d: 'subsistence farming and little trade', a: 'Stage 1 (traditional society)', azh: '第一阶段（传统社会）' },
        { d: 'rapid urbanization and take-off of key industries', a: 'Stage 3 (take-off)', azh: '第三阶段（起飞）' },
        { d: 'mass consumption of consumer goods by most households', a: 'Stage 5 (mass consumption)', azh: '第五阶段（大众消费）' },
        { d: 'a few manufacturing industries appear but most people still farm', a: 'Stage 2 (preconditions)', azh: '第二阶段（起飞前提）' }
      ];
      var s = pick(stages);
      var pool = stages.filter(function (x) { return x !== s; });
      return mk('concept',
        { en: 'A country with ' + s.d + ' is in which Rostow stage?', zh: '某国：' + s.d + '。处于罗斯托哪一阶段？' },
        opts(txt(s.a, s.azh), pool.map(function (x) { return txt(x.a, x.azh); })),
        { en: 'Rostow: traditional → preconditions → take-off → maturity → mass consumption.', zh: '罗斯托：传统社会 → 起飞前提 → 起飞 → 成熟 → 大众消费。' });
    },
    // 9. Religion classification
    function () {
      var items = [
        { r: 'Christianity', rz: '基督教', a: 'Universalizing', azh: '普世型' },
        { r: 'Islam', rz: '伊斯兰教', a: 'Universalizing', azh: '普世型' },
        { r: 'Buddhism', rz: '佛教', a: 'Universalizing', azh: '普世型' },
        { r: 'Hinduism', rz: '印度教', a: 'Ethnic', azh: '民族型' },
        { r: 'Judaism', rz: '犹太教', a: 'Ethnic', azh: '民族型' }
      ];
      var it = pick(items);
      return mk('vocab',
        { en: 'Is ' + it.r + ' a universalizing or ethnic religion?', zh: it.rz + '是普世型还是民族型宗教？' },
        opts(txt(it.a, it.azh), [txt('Universalizing', '普世型'), txt('Ethnic', '民族型'), txt('Both', '两者都是')]),
        { en: 'Universalizing (Christianity, Islam, Buddhism) seek converts; ethnic religions (Judaism, Hinduism) are tied to a people and place.', zh: '普世型（基督教、伊斯兰教、佛教）积极传教；民族型（犹太教、印度教）与民族和地域绑定。' });
    },
    // 10. Doubling time
    function () {
      var nir = pick([0.5, 1, 1.4, 2, 3.5]);
      var dt = Math.round(70 / nir);
      return mk('calculation',
        { en: 'A country grows at ' + nir + '% per year. Approximately what is its doubling time?', zh: '某国年增长率为 ' + nir + '%。倍增时间约为多久？' },
        numOpts(dt),
        { en: 'Doubling time ≈ 70/NIR = 70/' + nir + ' ≈ ' + dt + ' years.', zh: '倍增时间 ≈ 70/NIR = 70/' + nir + ' ≈ ' + dt + ' 年。' });
    }
  ]
};

/* ---------- helpers (global) ---------- */
function rnd(n) { return Math.floor(Math.random() * n); }
function pick(arr) { return arr[rnd(arr.length)]; }
function txt(en, zh) { return zh ? { en: en, zh: zh } : { en: en, zh: en }; }
/* options with correct FIRST + pool of distractors; dedupes against the correct answer */
function opts(correct, pool) {
  var out = [correct], seen = [String(correct.en)];
  for (var i = 0; i < pool.length && out.length < 4; i++) {
    if (seen.indexOf(String(pool[i].en)) === -1) { out.push(pool[i]); seen.push(String(pool[i].en)); }
  }
  return out;
}
/* numeric options with plausible distractors */
function numOpts(val) {
  var v = typeof val === 'number' ? Math.round(val * 100) / 100 : val;
  var set = [v];
  var deltas = typeof v === 'number' ? [v + 1, v - 1, v * 2, v + 2, Math.max(1, v - 2), v + 10] : [];
  for (var i = 0; i < deltas.length && set.length < 4; i++) {
    var d = Math.round(deltas[i] * 100) / 100;
    if (set.indexOf(d) === -1 && String(d) !== String(v)) set.push(d);
  }
  while (set.length < 4) set.push((set.length + 3) * 7 + set[0]);
  return set.map(function (s) { return { en: String(s), zh: String(s) }; });
}
/* build a question object; correct answer is index 0 (engine shuffles display order) */
function mk(t, q, o, e, svg) {
  var obj = { t: t, q: q, o: o, a: 0, e: e };
  if (svg) obj.svg = svg;
  return obj;
}

/* ---------- SVG diagram builders ---------- */
function pyramidSvg(type) {
  var ageGroups = ['0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70+'];
  var left = [], right = [];
  for (var i = 0; i < 8; i++) {
    if (type === 0) {
      var pct = 16 - i * 1.4 - rnd(15) / 10;
      left.push(Math.max(2, pct)); right.push(Math.max(2, pct * (0.92 - rnd(6) / 100)));
    } else {
      var pct2 = 5 + i * 1.6 + rnd(15) / 10;
      left.push(Math.min(15, pct2)); right.push(Math.min(15, pct2 * (0.95 - rnd(6) / 100)));
    }
  }
  var max = Math.max.apply(null, left.concat(right));
  var cx = 160, barMax = 130, h = 30, y0 = 40;
  var svg = '<svg viewBox="0 0 320 300" xmlns="http://www.w3.org/2000/svg" role="img" style="max-width:420px;margin:0 auto 16px">';
  svg += '<text x="80" y="20" text-anchor="middle" font-size="12" fill="#6f6d66">M ' + (type === 0 ? '男' : 'M') + '</text>';
  svg += '<text x="240" y="20" text-anchor="middle" font-size="12" fill="#6f6d66">F ' + (type === 0 ? '女' : 'F') + '</text>';
  for (var j = 0; j < 8; j++) {
    var y = y0 + j * h;
    var wl = left[j] / max * barMax, wr = right[j] / max * barMax;
    var color = j < 3 ? (type === 0 ? '#c9704a' : '#7a8fae') : (j < 6 ? (type === 0 ? '#b4552d' : '#5d7699') : '#9aa3ad');
    svg += '<rect x="' + (cx - wl) + '" y="' + y + '" width="' + wl + '" height="' + (h - 4) + '" fill="' + color + '" rx="2"/>';
    svg += '<rect x="' + cx + '" y="' + y + '" width="' + wr + '" height="' + (h - 4) + '" fill="' + color + '" opacity="0.7" rx="2"/>';
    svg += '<text x="' + (cx + 4) + '" y="' + (y + h - 12) + '" font-size="10" fill="#6f6d66">' + ageGroups[j] + '</text>';
  }
  svg += '</svg>';
  return svg;
}
function parabolaSvg() {
  var pts = [];
  for (var x = -4; x <= 4; x += 0.25) pts.push((160 + x * 30) + ',' + (200 - x * x * 12));
  return graphShell('<polyline points="' + pts.join(' ') + '" fill="none" stroke="#3b4bb5" stroke-width="2.5"/>');
}
function cubicSvg() {
  var pts = [];
  for (var x = -3; x <= 3; x += 0.15) pts.push((160 + x * 40) + ',' + (130 - x * x * x * 10));
  return graphShell('<polyline points="' + pts.join(' ') + '" fill="none" stroke="#3b4bb5" stroke-width="2.5"/>', 130);
}
function reciprocalSvg() {
  var pts1 = [], pts2 = [];
  for (var x = 0.5; x <= 6; x += 0.2) pts1.push((160 + x * 40) + ',' + (130 - 110 / x));
  for (var x2 = -0.5; x2 >= -6; x2 -= 0.2) pts2.push((160 + x2 * 40) + ',' + (130 + 110 / x2));
  return graphShell('<polyline points="' + pts1.join(' ') + '" fill="none" stroke="#3b4bb5" stroke-width="2.5"/>' +
    '<polyline points="' + pts2.join(' ') + '" fill="none" stroke="#3b4bb5" stroke-width="2.5"/>', 130, true);
}
function sineSvg() {
  var pts = [];
  for (var x = -6.2; x <= 6.2; x += 0.2) pts.push((160 + x * 25) + ',' + (130 - Math.sin(x) * 80));
  return graphShell('<polyline points="' + pts.join(' ') + '" fill="none" stroke="#3b4bb5" stroke-width="2.5"/>', 130, true);
}
function graphShell(curve, midY, dashed) {
  midY = midY || 200;
  return '<svg viewBox="0 0 320 260" xmlns="http://www.w3.org/2000/svg" role="img" style="max-width:380px;margin:0 auto 16px">' +
    '<line x1="20" y1="' + midY + '" x2="300" y2="' + midY + '" stroke="#a5a29a" stroke-width="1"' + (dashed ? ' stroke-dasharray="4 3"' : '') + '/>' +
    '<line x1="160" y1="10" x2="160" y2="250" stroke="#a5a29a" stroke-width="1"' + (dashed ? ' stroke-dasharray="4 3"' : '') + '/>' +
    curve + '</svg>';
}
