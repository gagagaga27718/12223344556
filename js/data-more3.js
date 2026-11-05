/* StudyLoop — bank expansion, batch 3: the remaining 12 units (fills every topic that had 0 items).
 * Q(unit, topicIdx, difficulty, style, stemEn, stemZh, options [[en, zh], ...] with the CORRECT ONE FIRST, explanationEn, explanationZh). */
(function () {
  'use strict';
  var B = window.EXTRA_BANK = window.EXTRA_BANK || [];
  function Q(unit, tp, d, t, qen, qzh, opts, een, ezh) {
    B.push({ unit: unit, tp: tp, d: d, t: t, q: { en: qen, zh: qzh }, o: opts.map(function (x) { return { en: x[0], zh: x[1] }; }), a: 0, e: { en: een, zh: ezh } });
  }

  /* ---------- pc8 · Sequences & series ---------- */
  Q('pc8', 4, 2, 'calculation', 'a₁ = 3 and aₙ = 2aₙ₋₁ − 1. Find a₄.', 'a₁ = 3，aₙ = 2aₙ₋₁ − 1。求 a₄。',
    [['17', '17'], ['9', '9'], ['33', '33'], ['23', '23']],
    'a₂ = 2·3 − 1 = 5, a₃ = 2·5 − 1 = 9, a₄ = 2·9 − 1 = 17.', 'a₂ = 2·3 − 1 = 5，a₃ = 2·5 − 1 = 9，a₄ = 2·9 − 1 = 17。');
  Q('pc8', 4, 2, 'concept', 'Which recursive formula describes 5, 8, 11, 14, …?', '哪个递推公式描述数列 5, 8, 11, 14, …？',
    [['a₁ = 5, aₙ = aₙ₋₁ + 3', 'a₁ = 5，aₙ = aₙ₋₁ + 3'], ['a₁ = 5, aₙ = 3aₙ₋₁', 'a₁ = 5，aₙ = 3aₙ₋₁'], ['aₙ = 5 + 3n', 'aₙ = 5 + 3n'], ['a₁ = 3, aₙ = aₙ₋₁ + 5', 'a₁ = 3，aₙ = aₙ₋₁ + 5']],
    'Each term adds 3 to the previous one, starting from 5. (The explicit formula would be aₙ = 3n + 2, not 5 + 3n.)', '每一项在前一项基础上加 3，首项为 5。（通项公式应为 aₙ = 3n + 2，而不是 5 + 3n。）');
  Q('pc8', 5, 2, 'concept', 'Which infinite geometric series converges?', '哪个无穷等比级数收敛？',
    [['6 − 3 + 1.5 − 0.75 + …', '6 − 3 + 1.5 − 0.75 + …'], ['2 + 4 + 8 + 16 + …', '2 + 4 + 8 + 16 + …'], ['1 − 1 + 1 − 1 + …', '1 − 1 + 1 − 1 + …'], ['5 + 5 + 5 + …', '5 + 5 + 5 + …']],
    'It converges only if |r| < 1. Here r = −1/2, so the sum is 6/(1 + 1/2) = 4. The others have r = 2, −1 and 1.', '只有 |r| < 1 时收敛。这里 r = −1/2，和为 6/(1 + 1/2) = 4。其他几个 r 分别为 2、−1、1。');
  Q('pc8', 5, 3, 'concept', 'For which values of x does 1 + x/2 + x²/4 + x³/8 + … converge?', 'x 取何值时 1 + x/2 + x²/4 + x³/8 + … 收敛？',
    [['−2 < x < 2', '−2 < x < 2'], ['−1 < x < 1', '−1 < x < 1'], ['x < 2', 'x < 2'], ['All real x', '全体实数']],
    'The ratio is r = x/2, and |x/2| < 1 ⇔ |x| < 2.', '公比 r = x/2，|x/2| < 1 ⇔ |x| < 2。');
  Q('pc8', 7, 2, 'application', 'A ball dropped from 10 m rebounds to 80% of its previous height each time. How high is the 3rd rebound?', '一个球从 10 m 高处落下，每次反弹到前一次高度的 80%。第 3 次反弹多高？',
    [['5.12 m', '5.12 m'], ['6.4 m', '6.4 m'], ['4.096 m', '4.096 m'], ['2.4 m', '2.4 m']],
    'Rebounds form a geometric sequence: 8, 6.4, 5.12 → 10·0.8³ = 5.12 m.', '各次反弹高度成等比数列：8, 6.4, 5.12 → 10·0.8³ = 5.12 m。');
  Q('pc8', 7, 2, 'application', 'A theater has 20 seats in row 1 and 2 more seats in each following row. How many seats are in the first 15 rows?', '剧院第 1 排有 20 个座位，以后每排比前一排多 2 个。前 15 排共有多少座位？',
    [['510', '510'], ['48', '48'], ['300', '300'], ['720', '720']],
    'Arithmetic: a₁₅ = 20 + 14·2 = 48, S₁₅ = 15(20 + 48)/2 = 510.', '等差数列：a₁₅ = 20 + 14·2 = 48，S₁₅ = 15(20 + 48)/2 = 510。');
  Q('pc8', 3, 2, 'calculation', 'Evaluate Σₖ₌₁⁴ (2k + 1).', '计算 Σₖ₌₁⁴ (2k + 1)。',
    [['24', '24'], ['20', '20'], ['16', '16'], ['9', '9']],
    '3 + 5 + 7 + 9 = 24 (or 2·(1+2+3+4) + 4 = 24).', '3 + 5 + 7 + 9 = 24（或 2·(1+2+3+4) + 4 = 24）。');
  Q('pc8', 6, 3, 'calculation', 'Write 0.272727… as a fraction.', '把 0.272727… 化为分数。',
    [['3/11', '3/11'], ['27/100', '27/100'], ['27/90', '27/90'], ['1/4', '1/4']],
    'Geometric series 0.27 + 0.0027 + … = 0.27/(1 − 0.01) = 27/99 = 3/11.', '等比级数 0.27 + 0.0027 + … = 0.27/(1 − 0.01) = 27/99 = 3/11。');

  /* ---------- geo7 · Development ---------- */
  Q('geo7', 7, 2, 'concept', 'Which is a renewable energy source?', '哪种是可再生能源？',
    [['Geothermal energy', '地热能'], ['Natural gas', '天然气'], ['Coal', '煤'], ['Uranium for nuclear power', '用于核电的铀']],
    'Renewable sources (solar, wind, hydro, geothermal, biomass) are replenished naturally; fossil fuels and uranium are finite.', '可再生能源（太阳能、风能、水能、地热、生物质能）可以自然补充；化石燃料和铀是有限的。');
  Q('geo7', 7, 3, 'concept', 'Sustainable development is best defined as:', '可持续发展的最佳定义是：',
    [['Meeting present needs without compromising future generations\' ability to meet theirs', '既满足当代需求，又不损害后代满足其需求的能力'], ['Maximizing GDP growth each year', '每年使 GDP 增长最大化'], ['Stopping all industrial activity', '停止一切工业活动'], ['Relying only on foreign aid', '完全依赖外国援助']],
    'This is the Brundtland Report (1987) definition; it balances economic, social and environmental goals (UN SDGs).', '这是《布伦特兰报告》（1987）的定义，兼顾经济、社会和环境目标（联合国可持续发展目标）。');
  Q('geo7', 0, 2, 'concept', 'Why did the Industrial Revolution begin in Great Britain?', '为什么工业革命始于英国？',
    [['Coal and iron deposits, capital from trade/colonies, and inventions like the steam engine', '煤铁资源丰富、来自贸易和殖民地的资本，以及蒸汽机等发明'], ['It had the largest population in the world', '它的人口世界最多'], ['It had no colonies', '它没有殖民地'], ['Its climate was too cold for farming', '气候太冷无法耕种']],
    'Britain combined resources (coal, iron), capital, markets from its empire, and innovations in textiles and steam power.', '英国兼具资源（煤、铁）、资本、帝国提供的市场，以及纺织和蒸汽动力方面的创新。');
  Q('geo7', 1, 3, 'application', 'A soft-drink bottling plant locates close to its customers. In Weber\'s terms, this is because bottling is:', '饮料灌装厂建在靠近顾客的地方。按韦伯理论，这是因为灌装属于：',
    [['A bulk-gaining industry (adding water makes the product heavier)', '增重工业（加水使产品更重）'], ['A bulk-reducing industry', '减重工业'], ['Footloose and unaffected by transport', '自由型工业，不受运输影响'], ['Dependent on cheap labor only', '只依赖廉价劳动力']],
    'Bulk-gaining industries locate near markets to cut the cost of shipping the heavier final product; bulk-reducing (copper smelting) locate near raw materials.', '增重工业靠近市场，以降低运输较重成品的成本；减重工业（如铜冶炼）靠近原料产地。');
  Q('geo7', 4, 2, 'application', 'In world-systems theory, a country that exports mainly raw materials, has low wages and depends on foreign investment is:', '在世界体系理论中，主要出口原材料、工资低、依赖外国投资的国家属于：',
    [['Periphery', '边缘'], ['Core', '核心'], ['Semi-periphery', '半边缘'], ['A world city', '世界城市']],
    'Periphery states supply raw materials and cheap labor to the core; semi-periphery countries (e.g., Brazil, China) show traits of both.', '边缘国家向核心国家提供原材料和廉价劳动力；半边缘国家（如巴西、中国）兼具两者特征。');
  Q('geo7', 6, 2, 'concept', 'How does microlending (e.g., Grameen Bank) promote development?', '小额贷款（如格莱珉银行）如何促进发展？',
    [['Small loans, often to women, let them start businesses and raise household income', '向女性等群体提供小额贷款，帮助她们创业并增加家庭收入'], ['It gives large loans to governments', '向政府提供大额贷款'], ['It replaces the need for schools', '取代学校教育'], ['It only funds factories owned by corporations', '只资助大公司工厂']],
    'Microcredit reaches people banks ignore; women\'s income tends to go to children\'s health and education, though high interest rates are a criticism.', '小额贷款覆盖被传统银行忽视的人群；女性的收入多用于子女健康和教育，但高利率常受批评。');

  /* ---------- bio2 · Membranes ---------- */
  Q('bio2', 0, 2, 'concept', 'In the phospholipid bilayer, the fatty-acid tails point inward because they are:', '磷脂双分子层中，脂肪酸尾部朝内是因为它们：',
    [['Hydrophobic (nonpolar)', '疏水（非极性）'], ['Hydrophilic (polar)', '亲水（极性）'], ['Positively charged', '带正电'], ['Made of protein', '由蛋白质构成']],
    'Hydrophobic tails avoid water and face each other; hydrophilic phosphate heads face the watery inside and outside of the cell.', '疏水尾部避开水而相对朝内；亲水的磷酸头部朝向细胞内外的水环境。');
  Q('bio2', 0, 3, 'concept', 'Why is the membrane called a "fluid mosaic"?', '为什么细胞膜被称为"流动镶嵌"？',
    [['Lipids and proteins move laterally, and many different proteins are embedded like tiles', '脂质和蛋白质可侧向移动，多种蛋白质像马赛克一样镶嵌其中'], ['It is a liquid with no structure', '它是没有结构的液体'], ['It is made only of carbohydrates', '它只由糖类构成'], ['Proteins are fixed in a rigid grid', '蛋白质固定在坚硬的网格中']],
    'Fluid = components drift within the layer; mosaic = a patchwork of proteins, cholesterol and glycoproteins.', '"流动"指成分可在膜内移动；"镶嵌"指蛋白质、胆固醇和糖蛋白拼嵌其中。');
  Q('bio2', 1, 2, 'concept', 'Glucose enters red blood cells down its concentration gradient through GLUT proteins, using no ATP. This is:', '葡萄糖通过 GLUT 蛋白顺浓度梯度进入红细胞，不消耗 ATP。这是：',
    [['Facilitated diffusion', '协助扩散'], ['Active transport', '主动运输'], ['Simple diffusion', '简单扩散'], ['Endocytosis', '胞吞']],
    'Moving down the gradient without energy but with a carrier protein is facilitated diffusion.', '借助载体蛋白、顺梯度且不耗能，就是协助扩散。');
  Q('bio2', 3, 3, 'concept', 'For each ATP used, the sodium–potassium pump moves:', '钠钾泵每消耗 1 个 ATP 运输：',
    [['3 Na⁺ out and 2 K⁺ in', '3 个 Na⁺ 出，2 个 K⁺ 进'], ['2 Na⁺ out and 3 K⁺ in', '2 个 Na⁺ 出，3 个 K⁺ 进'], ['3 Na⁺ in and 2 K⁺ out', '3 个 Na⁺ 进，2 个 K⁺ 出'], ['Equal Na⁺ and K⁺ in the same direction', '等量 Na⁺ 和 K⁺ 同向']],
    'Both move against their gradients; the 3:2 imbalance makes the inside of the cell negative (membrane potential).', '两种离子都逆浓度梯度运输；3:2 的不平衡使细胞内呈负电（膜电位）。');
  Q('bio2', 4, 2, 'application', 'A nerve cell releases neurotransmitters stored in vesicles. This process is:', '神经细胞释放储存在囊泡中的神经递质。这个过程是：',
    [['Exocytosis', '胞吐'], ['Endocytosis', '胞吞'], ['Osmosis', '渗透'], ['Facilitated diffusion', '协助扩散']],
    'Vesicles fuse with the plasma membrane and dump their contents outside — exocytosis.', '囊泡与细胞膜融合，把内容物释放到细胞外，即胞吐。');
  Q('bio2', 5, 3, 'calculation', 'A cube-shaped cell grows from 1 µm to 3 µm on each side. What happens to its SA:V ratio?', '一个立方体细胞的边长从 1 µm 增加到 3 µm。其表面积与体积之比如何变化？',
    [['It falls from 6:1 to 2:1', '从 6:1 降到 2:1'], ['It rises from 2:1 to 6:1', '从 2:1 升到 6:1'], ['It stays 6:1', '保持 6:1'], ['It falls from 6:1 to 3:1', '从 6:1 降到 3:1']],
    '1 µm: SA 6, V 1 → 6:1. 3 µm: SA 54, V 27 → 2:1. Exchange per unit volume drops as cells grow.', '1 µm：表面积 6，体积 1 → 6:1。3 µm：表面积 54，体积 27 → 2:1。细胞越大，单位体积的交换能力越弱。');

  /* ---------- bio10 · Ecology ---------- */
  Q('bio10', 7, 2, 'concept', 'What is currently the greatest threat to global biodiversity?', '当前对全球生物多样性威胁最大的是什么？',
    [['Habitat loss and fragmentation', '栖息地丧失与破碎化'], ['Volcanic eruptions', '火山喷发'], ['Meteor impacts', '陨石撞击'], ['Natural predators', '天敌']],
    'Clearing forests, wetlands and grasslands for farms and cities destroys and splits habitats; invasive species, pollution, overharvesting and climate change add to it.', '为农业和城市开垦森林、湿地和草原，造成栖息地破坏与分割；外来入侵、污染、过度开发和气候变化进一步加剧威胁。');
  Q('bio10', 7, 3, 'application', 'An invasive species often spreads rapidly in a new ecosystem mainly because it:', '外来入侵物种在新生态系统中常迅速扩散，主要是因为它：',
    [['Has no natural predators or diseases there', '在那里没有天敌和疾病'], ['Is always larger than native species', '总比本地物种更大'], ['Cannot reproduce', '不能繁殖'], ['Needs fewer nutrients than any other species', '比任何物种需要的营养都少']],
    'Released from the predators, parasites and competitors that kept it in check at home, it can outcompete natives (e.g., zebra mussels, kudzu).', '摆脱了原产地抑制它的天敌、寄生虫和竞争者，它能胜过本地物种（如斑马贻贝、葛藤）。');
  Q('bio10', 1, 2, 'application', 'After sea otters were hunted out, sea urchins exploded and kelp forests disappeared. Sea otters are a:', '海獭被捕杀殆尽后，海胆数量激增，海藻林消失。海獭是：',
    [['Keystone species', '关键种'], ['Producer', '生产者'], ['Decomposer', '分解者'], ['Invasive species', '入侵物种']],
    'A keystone species has an effect far larger than its numbers suggest; removing it causes a trophic cascade.', '关键种的影响远超其数量比例；移除它会引发营养级联效应。');
  Q('bio10', 2, 2, 'concept', 'Which organisms convert atmospheric N₂ into ammonia that plants can use?', '哪些生物能把大气中的 N₂ 转化为植物可利用的氨？',
    [['Nitrogen-fixing bacteria (e.g., in legume root nodules)', '固氮细菌（如豆科植物根瘤中的）'], ['Plants directly from the air', '植物直接从空气中吸收'], ['Decomposing fungi only', '只有分解真菌'], ['Animals', '动物']],
    'Nitrogen fixation by bacteria (and lightning) makes N available; nitrifying bacteria then form nitrates, and denitrifying bacteria return N₂ to the air.', '细菌固氮（及闪电）使氮可被利用；硝化细菌生成硝酸盐，反硝化细菌把 N₂ 返还大气。');
  Q('bio10', 4, 2, 'application', 'Remoras ride on sharks and eat scraps; the shark is unaffected. This relationship is:', '䲟鱼附着在鲨鱼身上吃残渣，鲨鱼不受影响。这种关系是：',
    [['Commensalism', '偏利共生'], ['Mutualism', '互利共生'], ['Parasitism', '寄生'], ['Competition', '竞争']],
    'One benefits (+) and the other is unaffected (0): commensalism.', '一方受益（+）、另一方不受影响（0）：偏利共生。');
  Q('bio10', 5, 2, 'concept', 'Which describes secondary succession?', '哪项描述的是次生演替？',
    [['Regrowth on an abandoned farm where soil remains', '在土壤仍保留的弃耕农田上重新长出植被'], ['Lichens colonizing bare lava rock', '地衣在裸露熔岩上定居'], ['Life appearing on a new volcanic island', '新火山岛上出现生命'], ['A glacier retreating from bare rock', '冰川退去后露出的裸岩']],
    'Secondary succession starts with soil already present after a disturbance (fire, farming), so it is faster than primary succession on bare rock.', '次生演替发生在扰动后土壤仍存在的地方（火灾、农耕），因此比在裸岩上的初生演替快。');
  Q('bio10', 6, 3, 'concept', 'Why do eagles have much higher DDT levels than the fish they eat?', '为什么老鹰体内的 DDT 浓度远高于它们吃的鱼？',
    [['Biomagnification: DDT builds up in fat and concentrates at each trophic level', '生物放大：DDT 积累在脂肪中，并在每个营养级浓缩'], ['Eagles drink polluted water', '老鹰喝了污染的水'], ['Eagles produce DDT', '老鹰自身产生 DDT'], ['Fish break down DDT into a stronger form', '鱼把 DDT 分解成更强的物质']],
    'DDT is fat-soluble and not excreted, so each predator eats many contaminated prey and accumulates their combined dose.', 'DDT 脂溶且不易排出，每个捕食者吃下大量受污染的猎物，积累了它们的总剂量。');

  /* ---------- pc3 · Exponential & log ---------- */
  Q('pc3', 2, 2, 'calculation', 'Use change of base to estimate log₃ 20.', '用换底公式估算 log₃ 20。',
    [['About 2.73', '约 2.73'], ['About 6.67', '约 6.67'], ['About 1.30', '约 1.30'], ['About 0.37', '约 0.37']],
    'log₃ 20 = ln 20 / ln 3 ≈ 2.996 / 1.099 ≈ 2.73. Check: 3² = 9 < 20 < 27 = 3³.', 'log₃ 20 = ln 20 / ln 3 ≈ 2.996 / 1.099 ≈ 2.73。检验：3² = 9 < 20 < 27 = 3³。');
  Q('pc3', 2, 2, 'concept', 'log₅ 8 is equal to which expression?', 'log₅ 8 等于哪个式子？',
    [['log 8 / log 5', 'log 8 / log 5'], ['log 5 / log 8', 'log 5 / log 8'], ['log (8/5)', 'log (8/5)'], ['log 8 − log 5', 'log 8 − log 5']],
    'Change of base: log_b x = log x / log b — the argument goes on top.', '换底公式：log_b x = log x / log b，真数在分子。');
  Q('pc3', 7, 2, 'concept', 'What is the inverse of f(x) = eˣ?', 'f(x) = eˣ 的反函数是什么？',
    [['f⁻¹(x) = ln x', 'f⁻¹(x) = ln x'], ['f⁻¹(x) = 1/eˣ', 'f⁻¹(x) = 1/eˣ'], ['f⁻¹(x) = e⁻ˣ', 'f⁻¹(x) = e⁻ˣ'], ['f⁻¹(x) = log₁₀ x', 'f⁻¹(x) = log₁₀ x']],
    'ln is the logarithm base e, so ln(eˣ) = x and e^(ln x) = x; the graphs reflect over y = x.', 'ln 是以 e 为底的对数，ln(eˣ) = x，e^(ln x) = x；两图像关于 y = x 对称。');
  Q('pc3', 7, 3, 'concept', 'The graph of y = 2ˣ passes through (3, 8). Which point must be on y = log₂ x?', 'y = 2ˣ 的图像经过 (3, 8)。y = log₂ x 的图像一定经过哪个点？',
    [['(8, 3)', '(8, 3)'], ['(3, 8)', '(3, 8)'], ['(−3, −8)', '(−3, −8)'], ['(1/8, 3)', '(1/8, 3)']],
    'Inverse functions swap x and y, so (3, 8) becomes (8, 3): log₂ 8 = 3.', '反函数交换 x 和 y，(3, 8) 变为 (8, 3)：log₂ 8 = 3。');
  Q('pc3', 3, 3, 'calculation', '$1000 is invested at 6% compounded continuously. About how much is there after 10 years?', '1000 美元以 6% 年利率连续复利投资。10 年后约有多少？',
    [['About $1822', '约 1822 美元'], ['About $1600', '约 1600 美元'], ['About $1791', '约 1791 美元'], ['About $6000', '约 6000 美元']],
    'A = Pe^(rt) = 1000·e^0.6 ≈ 1000·1.822 = $1822. (Annual compounding would give 1000·1.06¹⁰ ≈ $1791.)', 'A = Pe^(rt) = 1000·e^0.6 ≈ 1822 美元。（按年复利为 1000·1.06¹⁰ ≈ 1791 美元。）');
  Q('pc3', 4, 3, 'calculation', 'Carbon-14 has a half-life of about 5730 years. What fraction remains after 17,190 years?', '碳-14 的半衰期约为 5730 年。17,190 年后剩下多少比例？',
    [['1/8', '1/8'], ['1/3', '1/3'], ['1/6', '1/6'], ['1/4', '1/4']],
    '17,190 / 5730 = 3 half-lives, so (1/2)³ = 1/8 remains.', '17,190 / 5730 = 3 个半衰期，剩余 (1/2)³ = 1/8。');

  /* ---------- pc4 · Trig functions ---------- */
  Q('pc4', 0, 1, 'calculation', 'What are the coordinates of the point at 2π/3 on the unit circle?', '单位圆上角 2π/3 对应的点坐标是什么？',
    [['(−1/2, √3/2)', '(−1/2, √3/2)'], ['(1/2, √3/2)', '(1/2, √3/2)'], ['(−√3/2, 1/2)', '(−√3/2, 1/2)'], ['(−1/2, −√3/2)', '(−1/2, −√3/2)']],
    '2π/3 = 120° is in QII with reference angle π/3: (cos, sin) = (−1/2, √3/2).', '2π/3 = 120° 在第二象限，参考角 π/3：(cos, sin) = (−1/2, √3/2)。');
  Q('pc4', 0, 2, 'calculation', 'tan(π/4) = ?', 'tan(π/4) = ？',
    [['1', '1'], ['√2/2', '√2/2'], ['√3', '√3'], ['0', '0']],
    'At π/4 the point is (√2/2, √2/2), so tan = sin/cos = 1.', 'π/4 处的点为 (√2/2, √2/2)，tan = sin/cos = 1。');
  Q('pc4', 4, 2, 'concept', 'If sin θ < 0 and tan θ > 0, in which quadrant is θ?', '若 sin θ < 0 且 tan θ > 0，θ 在第几象限？',
    [['Quadrant III', '第三象限'], ['Quadrant II', '第二象限'], ['Quadrant IV', '第四象限'], ['Quadrant I', '第一象限']],
    'sin < 0 in QIII and QIV; tan > 0 in QI and QIII. Both hold only in QIII (ASTC).', 'sin < 0 在第三、四象限；tan > 0 在第一、三象限。同时成立只有第三象限（ASTC）。');
  Q('pc4', 4, 3, 'calculation', 'cos θ = −3/5 and θ is in Quadrant II. Find sin θ.', 'cos θ = −3/5，θ 在第二象限。求 sin θ。',
    [['4/5', '4/5'], ['−4/5', '−4/5'], ['3/4', '3/4'], ['−3/4', '−3/4']],
    'sin²θ = 1 − 9/25 = 16/25, sin θ = ±4/5; sine is positive in QII, so 4/5.', 'sin²θ = 1 − 9/25 = 16/25，sin θ = ±4/5；第二象限正弦为正，所以是 4/5。');
  Q('pc4', 7, 2, 'calculation', 'sec(π/3) = ?', 'sec(π/3) = ？',
    [['2', '2'], ['1/2', '1/2'], ['2√3/3', '2√3/3'], ['√3', '√3']],
    'sec = 1/cos and cos(π/3) = 1/2, so sec(π/3) = 2.', 'sec = 1/cos，cos(π/3) = 1/2，所以 sec(π/3) = 2。');
  Q('pc4', 7, 3, 'concept', 'Where does y = csc x have vertical asymptotes?', 'y = csc x 在哪里有竖直渐近线？',
    [['At x = kπ (where sin x = 0)', '在 x = kπ 处（sin x = 0 时）'], ['At x = π/2 + kπ', '在 x = π/2 + kπ 处'], ['At x = 2kπ only', '只在 x = 2kπ 处'], ['It has none', '没有渐近线']],
    'csc x = 1/sin x is undefined wherever sin x = 0, i.e., at every multiple of π.', 'csc x = 1/sin x 在 sin x = 0 的地方无定义，即 π 的每个整数倍处。');
  Q('pc4', 5, 2, 'calculation', 'A wheel of radius 0.4 m turns through 3 radians. How far does a point on the rim travel?', '半径 0.4 m 的轮子转过 3 弧度。轮缘上一点走了多远？',
    [['1.2 m', '1.2 m'], ['7.5 m', '7.5 m'], ['0.13 m', '0.13 m'], ['3.4 m', '3.4 m']],
    'Arc length s = rθ = 0.4 × 3 = 1.2 m (θ must be in radians).', '弧长 s = rθ = 0.4 × 3 = 1.2 m（θ 必须用弧度）。');

  Q('pc7', 3, 3, 'calculation', 'Find det [[1, 2, 0], [0, 3, 1], [2, 0, 1]].', '求 det [[1, 2, 0], [0, 3, 1], [2, 0, 1]]。',
    [['7', '7'], ['5', '5'], ['−1', '−1'], ['3', '3']],
    'Expand along row 1: 1·(3·1 − 1·0) − 2·(0·1 − 1·2) + 0 = 3 + 4 = 7.', '按第一行展开：1·(3·1 − 1·0) − 2·(0·1 − 1·2) + 0 = 3 + 4 = 7。');

  /* ---------- geo5 · Agriculture ---------- */
  Q('geo5', 4, 2, 'concept', 'Plantation agriculture is most common in which kind of region?', '种植园农业最常见于哪类地区？',
    [['Tropical former colonies in Latin America, Africa and South/Southeast Asia', '拉美、非洲和南亚/东南亚的热带前殖民地'], ['Cold high-latitude regions', '寒冷的高纬度地区'], ['The US Corn Belt', '美国玉米带'], ['Desert oases', '沙漠绿洲']],
    'Plantations grow cash crops (coffee, sugarcane, bananas, rubber, palm oil) for export, a pattern set up under colonialism.', '种植园种植供出口的经济作物（咖啡、甘蔗、香蕉、橡胶、棕榈油），这种格局形成于殖民时期。');
  Q('geo5', 4, 3, 'concept', 'What is a major economic risk for a country that depends on one plantation cash crop?', '依赖单一种植园经济作物的国家面临什么主要经济风险？',
    [['Income swings with volatile world prices and the crop competes with food production', '收入随国际价格剧烈波动，且经济作物挤占粮食生产'], ['It cannot export anything', '无法出口任何东西'], ['Its farmers become too wealthy', '农民变得过于富裕'], ['It must import all its labor', '必须进口所有劳动力']],
    'Monoculture exports leave economies exposed to price crashes, pests and weather, and land used for export crops is not used for local food.', '单一作物出口使经济易受价格暴跌、病虫害和天气影响，且出口作物占用的土地不能生产本地粮食。');
  Q('geo5', 0, 2, 'concept', 'Which crop was first domesticated in Mesoamerica?', '哪种作物最早在中美洲被驯化？',
    [['Maize (corn)', '玉米'], ['Wheat', '小麦'], ['Rice', '水稻'], ['Barley', '大麦']],
    'Mesoamerica domesticated maize, beans and squash; wheat and barley came from the Fertile Crescent, rice from East Asia.', '中美洲驯化了玉米、豆类和南瓜；小麦和大麦源于新月沃土，水稻源于东亚。');
  Q('geo5', 3, 3, 'concept', 'Which is a common criticism of the Green Revolution?', '对绿色革命的一个常见批评是什么？',
    [['It increased dependence on chemical fertilizers, pesticides and irrigation, favoring wealthier farmers', '增加了对化肥、农药和灌溉的依赖，有利于较富裕的农民'], ['It lowered crop yields in India', '降低了印度的粮食产量'], ['It used no new technology', '没有使用任何新技术'], ['It focused mainly on Africa', '主要集中在非洲']],
    'Yields rose dramatically in Asia and Latin America, but at environmental cost (water depletion, pollution) and with benefits concentrated among farmers who could afford inputs; Africa saw little impact.', '亚洲和拉美产量大幅提高，但付出了环境代价（水资源枯竭、污染），且收益集中于买得起投入品的农民；对非洲影响有限。');
  Q('geo5', 5, 2, 'application', 'Farmland in Ohio laid out in square-mile sections on a grid reflects which survey system?', '俄亥俄州按一平方英里方格划分的农田体现了哪种土地测量制度？',
    [['Township and range', '镇区-山脉制'], ['Metes and bounds', '界标法'], ['Long-lot', '长条地块制'], ['Open-field', '敞田制']],
    'The Land Ordinance of 1785 divided western lands into 6-mile townships of 36 one-square-mile sections.', '1785 年《土地法令》把西部土地划分为 6 英里见方的镇区，每个镇区含 36 个一平方英里的地块。');
  Q('geo5', 6, 2, 'concept', 'A low-income urban neighborhood with no grocery store but many fast-food outlets is an example of a:', '一个低收入城区没有杂货店却有很多快餐店，这是：',
    [['Food desert', '食物荒漠'], ['Food security zone', '粮食安全区'], ['Agricultural hearth', '农业发源地'], ['Plantation zone', '种植园区']],
    'Food deserts lack affordable, fresh, healthy food within reasonable distance, harming diet and health.', '食物荒漠指在合理距离内缺乏负担得起的新鲜健康食物，会损害饮食与健康。');

  /* ---------- bio8 · Genetics ---------- */
  Q('bio8', 0, 2, 'concept', 'Mendel crossed pure tall × pure short pea plants. What did the F₁ generation look like?', '孟德尔用纯种高茎 × 纯种矮茎豌豆杂交。F₁ 代表现如何？',
    [['All tall', '全部高茎'], ['All short', '全部矮茎'], ['3 tall : 1 short', '3 高 : 1 矮'], ['All medium height', '全部中等高度']],
    'TT × tt gives all Tt; tall is dominant. The 3:1 ratio only reappears in F₂ (Tt × Tt).', 'TT × tt 全为 Tt，高茎为显性。3:1 的比例要到 F₂（Tt × Tt）才出现。');
  Q('bio8', 2, 2, 'application', 'A purple-flowered plant (purple dominant) is crossed with a white-flowered plant. Half the offspring are white. The purple parent was:', '紫花植株（紫色显性）与白花植株杂交，后代一半开白花。紫花亲本的基因型是：',
    [['Pp (heterozygous)', 'Pp（杂合子）'], ['PP (homozygous dominant)', 'PP（显性纯合子）'], ['pp', 'pp'], ['Impossible to tell', '无法判断']],
    'This is a test cross. Pp × pp → 1 Pp : 1 pp. PP × pp would give only purple offspring.', '这是测交。Pp × pp → 1 Pp : 1 pp；PP × pp 只会产生紫花后代。');
  Q('bio8', 3, 2, 'application', 'Crossing red (RR) and white (WW) snapdragons gives all pink flowers. This is:', '红花（RR）与白花（WW）金鱼草杂交，后代全为粉花。这属于：',
    [['Incomplete dominance', '不完全显性'], ['Codominance', '共显性'], ['Complete dominance', '完全显性'], ['Sex linkage', '伴性遗传']],
    'The heterozygote is intermediate (pink). In codominance both colors would appear separately, like red and white patches.', '杂合子表现为中间性状（粉色）。共显性则会同时分别显现两种颜色，如红白斑块。');
  Q('bio8', 3, 3, 'calculation', 'Two pink snapdragons (RW) are crossed. What fraction of offspring are pink?', '两株粉花金鱼草（RW）杂交，后代中粉花占多少？',
    [['1/2', '1/2'], ['1/4', '1/4'], ['3/4', '3/4'], ['All of them', '全部']],
    'RW × RW → 1 RR (red) : 2 RW (pink) : 1 WW (white), so 1/2 are pink.', 'RW × RW → 1 RR（红）: 2 RW（粉）: 1 WW（白），粉花占 1/2。');
  Q('bio8', 7, 3, 'calculation', 'Two parents are both Aa. What is the probability that their first TWO children are both aa?', '父母都是 Aa。他们头两个孩子都是 aa 的概率是多少？',
    [['1/16', '1/16'], ['1/4', '1/4'], ['1/8', '1/8'], ['1/2', '1/2']],
    'Each child independently has a 1/4 chance; both = 1/4 × 1/4 = 1/16 (product rule).', '每个孩子独立地有 1/4 的概率；两个都是 = 1/4 × 1/4 = 1/16（乘法法则）。');
  Q('bio8', 4, 2, 'calculation', 'A mother with type A blood (Iᴬi) and a father with type B (Iᴮi) have a child. Which blood type is NOT possible?', '母亲 A 型（Iᴬi），父亲 B 型（Iᴮi）。孩子不可能是哪种血型？',
    [['None — A, B, AB and O are all possible', '没有，A、B、AB、O 型都可能'], ['O', 'O 型'], ['AB', 'AB 型'], ['B', 'B 型']],
    'Iᴬi × Iᴮi → IᴬIᴮ (AB), Iᴬi (A), Iᴮi (B), ii (O), each 1/4.', 'Iᴬi × Iᴮi → IᴬIᴮ（AB）、Iᴬi（A）、Iᴮi（B）、ii（O），各占 1/4。');

  /* ---------- bio7 · DNA, RNA & protein ---------- */
  Q('bio7', 3, 2, 'concept', 'During translation, what does the ribosome do?', '翻译过程中，核糖体的作用是什么？',
    [['Reads mRNA codons and joins the amino acids brought by tRNA into a polypeptide', '读取 mRNA 密码子，把 tRNA 运来的氨基酸连接成多肽'], ['Copies DNA into mRNA', '把 DNA 转录成 mRNA'], ['Unzips the DNA double helix', '解开 DNA 双螺旋'], ['Removes introns from mRNA', '从 mRNA 中剪去内含子']],
    'Translation happens at the ribosome: tRNA anticodons pair with mRNA codons and peptide bonds link the amino acids.', '翻译在核糖体上进行：tRNA 的反密码子与 mRNA 密码子配对，氨基酸之间形成肽键。');
  Q('bio7', 3, 3, 'calculation', 'An mRNA strand is AUG-GCA-UUU-UAA. How many amino acids are in the polypeptide?', '一条 mRNA 为 AUG-GCA-UUU-UAA。合成的多肽含几个氨基酸？',
    [['3', '3'], ['4', '4'], ['12', '12'], ['2', '2']],
    'AUG (Met), GCA (Ala) and UUU (Phe) are translated; UAA is a stop codon and adds no amino acid.', 'AUG（甲硫氨酸）、GCA（丙氨酸）、UUU（苯丙氨酸）被翻译；UAA 是终止密码子，不编码氨基酸。');
  Q('bio7', 1, 2, 'concept', 'Which enzyme joins Okazaki fragments on the lagging strand?', '哪种酶连接滞后链上的冈崎片段？',
    [['DNA ligase', 'DNA 连接酶'], ['Helicase', '解旋酶'], ['RNA polymerase', 'RNA 聚合酶'], ['Primase', '引物酶']],
    'DNA polymerase can only build 5′ → 3′, so the lagging strand is made in fragments that ligase seals together.', 'DNA 聚合酶只能沿 5′ → 3′ 方向合成，所以滞后链分段合成，再由连接酶连接。');
  Q('bio7', 2, 2, 'calculation', 'A DNA template strand reads 3′-TAC GGA-5′. What mRNA is transcribed?', 'DNA 模板链为 3′-TAC GGA-5′。转录出的 mRNA 是什么？',
    [['5′-AUG CCU-3′', '5′-AUG CCU-3′'], ['5′-ATG CCT-3′', '5′-ATG CCT-3′'], ['5′-UAC GGA-3′', '5′-UAC GGA-3′'], ['5′-TUG CCU-3′', '5′-TUG CCU-3′']],
    'mRNA is complementary to the template, with U instead of T: T→A, A→U, C→G, G→C.', 'mRNA 与模板链互补，并以 U 代替 T：T→A，A→U，C→G，G→C。');
  Q('bio7', 5, 3, 'application', 'Deleting ONE base near the start of a gene usually has a bigger effect than substituting one base. Why?', '在基因起始处缺失一个碱基，通常比替换一个碱基影响更大。为什么？',
    [['It shifts the reading frame, changing every codon after it', '它改变了阅读框，使其后每个密码子都改变'], ['Deletions only happen in introns', '缺失只发生在内含子中'], ['Substitutions always change the amino acid', '替换总会改变氨基酸'], ['Deletions add a stop codon at the end', '缺失会在末尾增加终止密码子']],
    'A frameshift scrambles all downstream codons (often creating an early stop). A substitution changes at most one codon and may even be silent.', '移码突变会打乱其后所有密码子（常提前出现终止密码子）；替换最多改变一个密码子，甚至可能是沉默突变。');
  Q('bio7', 6, 3, 'concept', 'In the lac operon, what happens when lactose is present?', '在乳糖操纵子中，乳糖存在时会发生什么？',
    [['Lactose binds the repressor so it leaves the operator, and the genes are transcribed', '乳糖与阻遏蛋白结合使其离开操纵基因，基因被转录'], ['Lactose binds DNA and blocks transcription', '乳糖与 DNA 结合并阻断转录'], ['The repressor binds more tightly', '阻遏蛋白结合得更紧'], ['The cell stops making all proteins', '细胞停止合成所有蛋白质']],
    'The lac operon is inducible: lactose (allolactose) inactivates the repressor, switching on the genes that digest lactose.', '乳糖操纵子是可诱导型：乳糖（异乳糖）使阻遏蛋白失活，开启分解乳糖的基因。');

  /* ---------- pc1 · Functions ---------- */
  Q('pc1', 1, 2, 'calculation', 'f(x) = x² and g(x) = x − 3. Find f(g(x)).', 'f(x) = x²，g(x) = x − 3。求 f(g(x))。',
    [['x² − 6x + 9', 'x² − 6x + 9'], ['x² − 3', 'x² − 3'], ['x² − 9', 'x² − 9'], ['x³ − 3x²', 'x³ − 3x²']],
    'f(g(x)) = (x − 3)² = x² − 6x + 9. (g(f(x)) would be x² − 3.)', 'f(g(x)) = (x − 3)² = x² − 6x + 9。（g(f(x)) 才是 x² − 3。）');
  Q('pc1', 3, 2, 'concept', 'Which function is odd?', '哪个函数是奇函数？',
    [['f(x) = x³ − x', 'f(x) = x³ − x'], ['f(x) = x² + 1', 'f(x) = x² + 1'], ['f(x) = |x|', 'f(x) = |x|'], ['f(x) = x³ + 1', 'f(x) = x³ + 1']],
    'f(−x) = −x³ + x = −(x³ − x) = −f(x). The constant +1 in x³ + 1 breaks the symmetry; x² + 1 and |x| are even.', 'f(−x) = −x³ + x = −(x³ − x) = −f(x)。x³ + 1 中的常数 +1 破坏了对称；x² + 1 和 |x| 是偶函数。');
  Q('pc1', 4, 2, 'calculation', 'Find the inverse of f(x) = (x + 5)/2.', '求 f(x) = (x + 5)/2 的反函数。',
    [['f⁻¹(x) = 2x − 5', 'f⁻¹(x) = 2x − 5'], ['f⁻¹(x) = 2x + 5', 'f⁻¹(x) = 2x + 5'], ['f⁻¹(x) = (x − 5)/2', 'f⁻¹(x) = (x − 5)/2'], ['f⁻¹(x) = 2/(x + 5)', 'f⁻¹(x) = 2/(x + 5)']],
    'Swap: x = (y + 5)/2 → 2x = y + 5 → y = 2x − 5. Check: f(f⁻¹(3)) = f(1) = 3.', '交换：x = (y + 5)/2 → 2x = y + 5 → y = 2x − 5。检验：f(f⁻¹(3)) = f(1) = 3。');
  Q('pc1', 6, 2, 'calculation', 'Find the average rate of change of f(x) = x² + 1 from x = 1 to x = 4.', '求 f(x) = x² + 1 从 x = 1 到 x = 4 的平均变化率。',
    [['5', '5'], ['15', '15'], ['17/2', '17/2'], ['3', '3']],
    '[f(4) − f(1)] / (4 − 1) = (17 − 2)/3 = 5.', '[f(4) − f(1)] / (4 − 1) = (17 − 2)/3 = 5。');
  Q('pc1', 7, 3, 'calculation', 'Simplify the difference quotient [f(x + h) − f(x)]/h for f(x) = 3x − 7.', '对 f(x) = 3x − 7，化简差商 [f(x + h) − f(x)]/h。',
    [['3', '3'], ['3h', '3h'], ['3x', '3x'], ['3 + h', '3 + h']],
    '[3(x + h) − 7 − (3x − 7)]/h = 3h/h = 3 — a linear function\'s rate of change is its slope.', '[3(x + h) − 7 − (3x − 7)]/h = 3h/h = 3，一次函数的变化率就是斜率。');

  /* ---------- geo2 · Population & migration ---------- */
  Q('geo2', 4, 2, 'concept', 'In the epidemiological transition, what are the leading causes of death in later stages?', '在流行病学转变中，后期的主要死因是什么？',
    [['Chronic, degenerative diseases such as heart disease and cancer', '心脏病、癌症等慢性退行性疾病'], ['Famine and plague', '饥荒和瘟疫'], ['Infectious diseases like cholera', '霍乱等传染病'], ['Childbirth complications', '分娩并发症']],
    'As sanitation and medicine improve, infectious deaths fall and people live long enough to die of diseases linked to aging and lifestyle.', '随着卫生与医疗改善，传染病死亡下降，人们寿命延长，更多死于与衰老和生活方式相关的疾病。');
  Q('geo2', 4, 3, 'application', 'The rise of antibiotic-resistant bacteria and new pandemics fits which proposed stage of the epidemiological transition?', '抗生素耐药细菌的出现和新的大流行属于流行病学转变的哪个设想阶段？',
    [['Stage 5: reemergence of infectious and parasitic diseases', '第 5 阶段：传染病与寄生虫病重新出现'], ['Stage 1: pestilence and famine', '第 1 阶段：瘟疫与饥荒'], ['Stage 3: degenerative diseases', '第 3 阶段：退行性疾病'], ['Stage 2: receding pandemics', '第 2 阶段：大流行减退']],
    'A possible stage 5 sees infectious diseases return through evolution of resistance, poverty and global travel.', '可能的第 5 阶段中，耐药性演化、贫困和全球流动使传染病卷土重来。');
  Q('geo2', 3, 2, 'concept', 'Ester Boserup disagreed with Malthus by arguing that:', '埃斯特·博塞拉普反对马尔萨斯，她认为：',
    [['Population growth pushes farmers to intensify and innovate, raising food output', '人口增长促使农民集约化和创新，从而提高粮食产量'], ['Famine is inevitable', '饥荒不可避免'], ['Food grows geometrically', '粮食按几何级数增长'], ['Population should be reduced by war', '应通过战争减少人口']],
    'Boserup saw population pressure as a driver of agricultural change (more labor, irrigation, new techniques).', '博塞拉普认为人口压力是推动农业变革（更多劳动、灌溉、新技术）的动力。');
  Q('geo2', 7, 2, 'application', 'Russia pays families bonuses for a second child. This is a:', '俄罗斯为生育二孩的家庭发放奖金。这是：',
    [['Pronatalist policy', '鼓励生育政策'], ['Antinatalist policy', '抑制生育政策'], ['Immigration policy', '移民政策'], ['Eugenic policy', '优生政策']],
    'Pronatalist policies encourage births in countries with low fertility and aging populations.', '鼓励生育政策用于生育率低、人口老龄化的国家。');
  Q('geo2', 6, 2, 'vocab', 'A person forced to flee their home because of conflict but who remains in their own country is a(n):', '因冲突被迫离家但仍留在本国的人是：',
    [['Internally displaced person (IDP)', '境内流离失所者'], ['Refugee', '难民'], ['Guest worker', '客籍工人'], ['Asylum seeker', '寻求庇护者']],
    'Refugees cross an international border; IDPs stay inside their country and often have fewer legal protections.', '难民跨越国界；境内流离失所者留在本国，往往获得的法律保护更少。');
  Q('geo2', 5, 2, 'concept', 'According to Ravenstein, most migrants:', '根据拉文斯坦法则，大多数移民：',
    [['Move only a short distance', '只迁移很短的距离'], ['Move to another continent', '迁往另一个大洲'], ['Are elderly', '是老年人'], ['Move from cities to rural areas', '从城市迁往农村']],
    'Distance decay applies to migration; long-distance migrants tend to head for major economic centers.', '迁移同样存在距离衰减；远距离移民倾向于前往主要经济中心。');

  /* ---------- bio1 · Cells ---------- */
  Q('bio1', 4, 1, 'vocab', 'Which is a principle of the cell theory?', '以下哪项是细胞学说的内容？',
    [['All cells come from pre-existing cells', '所有细胞都来自已存在的细胞'], ['All cells have a nucleus', '所有细胞都有细胞核'], ['Cells can arise from nonliving matter', '细胞可以由非生命物质产生'], ['Only animals are made of cells', '只有动物由细胞构成']],
    'Cell theory: all living things are made of cells, the cell is the basic unit of life, and cells come from existing cells (Virchow). Prokaryotes have no nucleus.', '细胞学说：所有生物由细胞构成，细胞是生命的基本单位，细胞来自已存在的细胞（魏尔肖）。原核细胞没有细胞核。');
  Q('bio1', 5, 2, 'concept', 'Which evidence supports the endosymbiotic theory?', '哪项证据支持内共生学说？',
    [['Mitochondria have their own circular DNA and bacteria-like ribosomes', '线粒体有自己的环状 DNA 和类似细菌的核糖体'], ['Mitochondria are found in every prokaryote', '所有原核生物都有线粒体'], ['Chloroplasts have no membranes', '叶绿体没有膜'], ['The nucleus divides by binary fission', '细胞核以二分裂方式分裂']],
    'Mitochondria and chloroplasts have circular DNA, 70S ribosomes, double membranes and divide by fission — like free-living bacteria.', '线粒体和叶绿体有环状 DNA、70S 核糖体、双层膜，并以分裂方式增殖，与自由生活的细菌相似。');
  Q('bio1', 5, 3, 'concept', 'Why do mitochondria and chloroplasts have TWO membranes, according to endosymbiotic theory?', '按照内共生学说，为什么线粒体和叶绿体有两层膜？',
    [['The inner membrane came from the engulfed prokaryote; the outer from the host cell\'s engulfing membrane', '内膜来自被吞噬的原核生物，外膜来自宿主细胞吞噬时的膜'], ['They need extra protection from light', '它们需要额外的防光保护'], ['All organelles have two membranes', '所有细胞器都有两层膜'], ['They formed from the nucleus', '它们由细胞核形成']],
    'Engulfment by endocytosis wraps the bacterium in a host membrane, leaving a double boundary.', '通过胞吞吞入细菌时，宿主膜包裹住细菌，形成双层膜。');
  Q('bio1', 7, 2, 'application', 'In Tay-Sachs disease, lipids build up in nerve cells because one hydrolytic enzyme is missing. Which organelle is affected?', '泰-萨克斯病中，由于缺少一种水解酶，脂质在神经细胞中堆积。哪种细胞器受影响？',
    [['Lysosome', '溶酶体'], ['Ribosome', '核糖体'], ['Chloroplast', '叶绿体'], ['Nucleolus', '核仁']],
    'Lysosomes contain hydrolytic enzymes that break down macromolecules; a missing enzyme causes a lysosomal storage disease.', '溶酶体含有分解大分子的水解酶；缺少某种酶会导致溶酶体贮积症。');
  Q('bio1', 3, 2, 'application', 'Muscle cells contain far more mitochondria than skin cells. This best illustrates:', '肌肉细胞含有的线粒体远多于皮肤细胞。这最好地说明了：',
    [['Structure fits function — muscles need lots of ATP', '结构与功能相适应——肌肉需要大量 ATP'], ['Cell theory', '细胞学说'], ['Endosymbiosis', '内共生'], ['Prokaryotic organization', '原核细胞结构']],
    'Cells build the structures their jobs require; contraction uses large amounts of ATP from aerobic respiration.', '细胞会形成其功能所需的结构；肌肉收缩需要大量来自有氧呼吸的 ATP。');
  Q('bio1', 2, 2, 'concept', 'Which structure is found in plant cells but NOT animal cells?', '哪种结构存在于植物细胞而不存在于动物细胞？',
    [['Cell wall', '细胞壁'], ['Mitochondria', '线粒体'], ['Ribosomes', '核糖体'], ['Plasma membrane', '细胞膜']],
    'Plants have a cellulose cell wall, chloroplasts and a large central vacuole; both cell types have mitochondria, ribosomes and a membrane.', '植物有纤维素细胞壁、叶绿体和大液泡；两类细胞都有线粒体、核糖体和细胞膜。');
})();
