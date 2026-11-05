/* StudyLoop — bank expansion for the thinnest units (fills topics that had 0–1 items).
 * Q(unit, topicIdx, difficulty, style, stemEn, stemZh, options [[en, zh], ...] with the CORRECT ONE FIRST,
 *   explanationEn, explanationZh). Options are shuffled at display time. */
(function () {
  'use strict';
  var B = window.EXTRA_BANK = window.EXTRA_BANK || [];
  function Q(unit, tp, d, t, qen, qzh, opts, een, ezh) {
    B.push({ unit: unit, tp: tp, d: d, t: t, q: { en: qen, zh: qzh }, o: opts.map(function (x) { return { en: x[0], zh: x[1] }; }), a: 0, e: { en: een, zh: ezh } });
  }

  /* ---------- bio5 · Cellular respiration & enzymes ---------- */
  Q('bio5', 0, 1, 'vocab', 'Where in the cell does glycolysis take place?', '糖酵解发生在细胞的哪个部位？',
    [['Cytoplasm (cytosol)', '细胞质基质'], ['Mitochondrial matrix', '线粒体基质'], ['Inner mitochondrial membrane', '线粒体内膜'], ['Nucleus', '细胞核']],
    'Glycolysis splits glucose into 2 pyruvate in the cytosol and needs no oxygen or organelle.', '糖酵解在细胞质基质中把葡萄糖分解为 2 分子丙酮酸，不需要氧气，也不需要细胞器。');
  Q('bio5', 1, 2, 'concept', 'Per glucose, what are the main products of the Krebs (citric acid) cycle?', '每分子葡萄糖经克雷布斯循环（柠檬酸循环）的主要产物是什么？',
    [['CO₂, NADH, FADH₂ and a little ATP', 'CO₂、NADH、FADH₂ 和少量 ATP'], ['Glucose and O₂', '葡萄糖和 O₂'], ['Lactic acid', '乳酸'], ['Water and most of the ATP', '水和大部分 ATP']],
    'The cycle fully oxidizes the carbons to CO₂ and loads electrons onto NADH and FADH₂; most ATP is made later by the electron transport chain.', '该循环把碳彻底氧化为 CO₂，并把电子交给 NADH 和 FADH₂；大部分 ATP 要在之后的电子传递链中产生。');
  Q('bio5', 2, 3, 'concept', 'What directly powers ATP synthase in the inner mitochondrial membrane?', '直接驱动线粒体内膜上 ATP 合酶的是什么？',
    [['H⁺ flowing down its gradient from the intermembrane space into the matrix', 'H⁺ 顺浓度梯度从膜间隙流回基质'], ['Electrons passing through ATP synthase', '电子穿过 ATP 合酶'], ['Glucose binding to the enzyme', '葡萄糖与该酶结合'], ['O₂ splitting into atoms', 'O₂ 分解为氧原子']],
    'The ETC pumps protons into the intermembrane space; their flow back through ATP synthase (chemiosmosis) turns the enzyme and makes ATP.', '电子传递链把质子泵入膜间隙；质子经 ATP 合酶流回（化学渗透）带动酶转动合成 ATP。');
  Q('bio5', 6, 2, 'calculation', 'About how many ATP does aerobic respiration yield per glucose, compared with fermentation?', '有氧呼吸每分子葡萄糖约产生多少 ATP？与发酵相比如何？',
    [['About 30–32 ATP vs 2 ATP', '约 30–32 个 ATP，而发酵只有 2 个'], ['2 ATP vs 30 ATP', '2 个，而发酵 30 个'], ['About 4 ATP vs 2 ATP', '约 4 个，而发酵 2 个'], ['The same — 36 ATP each', '相同，各 36 个']],
    'Glycolysis gives 2 net ATP, the Krebs cycle 2, and oxidative phosphorylation about 26–28; fermentation keeps only glycolysis\' 2 ATP.', '糖酵解净得 2 ATP，克雷布斯循环 2 个，氧化磷酸化约 26–28 个；发酵只保留糖酵解的 2 个 ATP。');
  Q('bio5', 5, 2, 'application', 'Cyanide blocks the last protein of the electron transport chain. Why does ATP production almost stop?', '氰化物阻断电子传递链的最后一个蛋白。为什么 ATP 生成几乎停止？',
    [['Electrons can no longer pass to O₂, so the chain backs up and stops pumping H⁺', '电子无法传给 O₂，传递链堵塞、不再泵出 H⁺'], ['Glucose can no longer enter cells', '葡萄糖无法进入细胞'], ['Cyanide destroys DNA', '氰化物破坏 DNA'], ['It speeds up the Krebs cycle', '它加快了克雷布斯循环']],
    'O₂ is the final electron acceptor. Without it accepting electrons, no proton gradient forms, so ATP synthase stops.', 'O₂ 是最终电子受体。它无法接受电子时，质子梯度无法形成，ATP 合酶随之停止。');
  Q('bio5', 7, 3, 'concept', 'A competitive inhibitor is added to an enzyme reaction. How can the original maximum rate be restored?', '向酶促反应中加入竞争性抑制剂后，如何恢复原来的最大速率？',
    [['Add much more substrate to outcompete the inhibitor', '大量增加底物以胜过抑制剂'], ['Lower the temperature', '降低温度'], ['Add more inhibitor', '加入更多抑制剂'], ['It cannot be restored by any means', '无论如何都无法恢复']],
    'A competitive inhibitor competes for the active site, so excess substrate wins out; a non-competitive inhibitor (binding elsewhere) lowers Vmax no matter how much substrate is added.', '竞争性抑制剂与底物争夺活性位点，增加底物即可胜出；非竞争性抑制剂结合在别处，再多底物也无法恢复最大速率。');
  Q('bio5', 3, 2, 'concept', 'Why must fermenting cells convert pyruvate into lactate or ethanol?', '为什么进行发酵的细胞必须把丙酮酸转化为乳酸或乙醇？',
    [['To regenerate NAD⁺ so glycolysis can continue', '为了再生 NAD⁺，使糖酵解得以继续'], ['To make extra ATP from pyruvate', '为了从丙酮酸中额外产生 ATP'], ['To produce oxygen', '为了产生氧气'], ['To store energy as fat', '为了以脂肪形式储能']],
    'Glycolysis uses NAD⁺. Without O₂, fermentation passes electrons from NADH back onto pyruvate, recycling NAD⁺; it makes no extra ATP.', '糖酵解消耗 NAD⁺。无氧时，发酵把 NADH 的电子交还给丙酮酸，使 NAD⁺ 循环利用；它不额外产生 ATP。');

  /* ---------- bio4 · Photosynthesis ---------- */
  Q('bio4', 6, 3, 'concept', 'In chloroplasts, where does the H⁺ concentration become highest during the light reactions?', '光反应中，叶绿体内哪里的 H⁺ 浓度最高？',
    [['Inside the thylakoid space (lumen)', '类囊体腔内'], ['In the stroma', '叶绿体基质中'], ['Outside the chloroplast', '叶绿体外'], ['In the cell wall', '细胞壁中']],
    'The ETC pumps H⁺ into the thylakoid lumen (and water splitting adds more); H⁺ flowing back to the stroma through ATP synthase makes ATP.', '电子传递链把 H⁺ 泵入类囊体腔（水的光解也产生 H⁺）；H⁺ 经 ATP 合酶流回基质时合成 ATP。');
  Q('bio4', 7, 3, 'concept', 'What happens at photosystem II that does NOT happen at photosystem I?', '哪件事发生在光系统 II 而不发生在光系统 I？',
    [['Water is split, releasing O₂', '水被分解，释放 O₂'], ['NADP⁺ is reduced to NADPH', 'NADP⁺ 被还原为 NADPH'], ['CO₂ is fixed', 'CO₂ 被固定'], ['Glucose is made', '合成葡萄糖']],
    'PSII replaces its lost electrons by splitting water (photolysis), producing O₂. PSI\'s electrons end up reducing NADP⁺ to NADPH.', 'PSII 通过分解水（光解）补充失去的电子并释放 O₂；PSI 的电子最终把 NADP⁺ 还原为 NADPH。');
  Q('bio4', 2, 2, 'concept', 'Which enzyme fixes CO₂ onto RuBP in the Calvin cycle?', '在卡尔文循环中，把 CO₂ 固定到 RuBP 上的酶是？',
    [['Rubisco', '核酮糖二磷酸羧化酶（Rubisco）'], ['ATP synthase', 'ATP 合酶'], ['Amylase', '淀粉酶'], ['DNA polymerase', 'DNA 聚合酶']],
    'Rubisco catalyzes carbon fixation; ATP and NADPH from the light reactions then reduce the product to G3P.', 'Rubisco 催化碳固定；随后光反应产生的 ATP 和 NADPH 把产物还原为 G3P。');
  Q('bio4', 5, 3, 'application', 'A cactus opens its stomata only at night. What advantage does this CAM strategy give?', '仙人掌只在夜间打开气孔。这种 CAM 策略有什么好处？',
    [['It reduces water loss in hot, dry daytime conditions', '减少白天高温干燥时的水分散失'], ['It allows photosynthesis without light', '无需光照即可进行光合作用'], ['It increases photorespiration', '增加光呼吸'], ['It lets the plant absorb more nitrogen', '吸收更多氮']],
    'CAM plants take in CO₂ at night and store it as organic acids, then run the Calvin cycle by day with stomata closed — saving water. Light is still required.', 'CAM 植物夜间吸收 CO₂ 并以有机酸形式储存，白天关闭气孔进行卡尔文循环，从而节水；仍然需要光。');
  Q('bio4', 3, 2, 'concept', 'Why do most leaves look green?', '为什么大多数叶子看起来是绿色的？',
    [['Chlorophyll absorbs red and blue light and reflects green', '叶绿素吸收红光和蓝光，反射绿光'], ['Chlorophyll absorbs green light best', '叶绿素最能吸收绿光'], ['Leaves contain green water', '叶子含有绿色的水'], ['Carotenoids reflect only green', '类胡萝卜素只反射绿光']],
    'The absorption spectrum of chlorophyll peaks in blue and red; green is mostly reflected or transmitted, so we see it.', '叶绿素的吸收光谱峰值在蓝光和红光；绿光大多被反射或透过，所以叶子显绿色。');

  /* ---------- bio9 · Evolution ---------- */
  Q('bio9', 3, 3, 'calculation', 'In a population in Hardy–Weinberg equilibrium, q = 0.3. What fraction is heterozygous?', '一个处于哈迪-温伯格平衡的种群中 q = 0.3。杂合子占多少？',
    [['0.42', '0.42'], ['0.21', '0.21'], ['0.09', '0.09'], ['0.49', '0.49']],
    'p = 1 − q = 0.7, so heterozygotes 2pq = 2 × 0.7 × 0.3 = 0.42.', 'p = 1 − q = 0.7，杂合子 2pq = 2 × 0.7 × 0.3 = 0.42。');
  Q('bio9', 4, 2, 'application', 'Medium-weight human babies survive best; very small and very large babies have lower survival. This is:', '中等体重的婴儿存活率最高，过轻和过重的婴儿存活率较低。这属于：',
    [['Stabilizing selection', '稳定选择'], ['Directional selection', '定向选择'], ['Disruptive selection', '分裂选择'], ['Genetic drift', '遗传漂变']],
    'Stabilizing selection favors the intermediate phenotype and reduces variation; directional favors one extreme, disruptive favors both extremes.', '稳定选择有利于中间表型并减少变异；定向选择有利于一个极端，分裂选择有利于两个极端。');
  Q('bio9', 5, 2, 'application', 'A few birds reach a new island and found a population with allele frequencies different from the mainland. This is:', '少数鸟飞到新岛屿建立种群，其等位基因频率与大陆不同。这是：',
    [['The founder effect', '奠基者效应'], ['Gene flow', '基因流'], ['Stabilizing selection', '稳定选择'], ['Convergent evolution', '趋同进化']],
    'The founder effect is genetic drift that happens when a small group starts a new population, carrying only a sample of the original alleles.', '奠基者效应是一种遗传漂变：少数个体建立新种群时只带走了原种群部分等位基因。');
  Q('bio9', 6, 3, 'concept', 'Two frog species live in the same pond but breed in different months. Which isolating mechanism is this?', '两种青蛙生活在同一个池塘，但在不同月份繁殖。这是哪种隔离机制？',
    [['Temporal (prezygotic) isolation', '时间隔离（合子前隔离）'], ['Geographic isolation', '地理隔离'], ['Hybrid sterility (postzygotic)', '杂种不育（合子后隔离）'], ['Mechanical isolation', '机械隔离']],
    'Breeding at different times prevents mating before zygotes form, so it is prezygotic temporal isolation; they share a habitat, so it is not geographic.', '繁殖时间不同使它们在形成合子前就无法交配，属于合子前的时间隔离；它们生活在同一栖息地，所以不是地理隔离。');
  Q('bio9', 2, 2, 'concept', 'Bat wings and human arms have the same bones but different functions. They are:', '蝙蝠的翅膀和人的手臂骨骼相同但功能不同。它们是：',
    [['Homologous structures (common ancestry)', '同源结构（共同祖先）'], ['Analogous structures', '同功结构'], ['Vestigial structures', '退化结构'], ['Proof of Lamarck\'s theory', '拉马克学说的证据']],
    'Homologous structures share an underlying anatomy inherited from a common ancestor; analogous structures (bird vs insect wings) share function but not ancestry.', '同源结构具有从共同祖先继承的相同基本结构；同功结构（鸟翼和昆虫翅）功能相同但来源不同。');

  /* ---------- bio6 · Cell cycle, mitosis & meiosis ---------- */
  Q('bio6', 4, 2, 'concept', 'In which stage do homologous chromosomes separate?', '同源染色体在哪个时期分离？',
    [['Anaphase I of meiosis', '减数第一次分裂后期'], ['Anaphase II of meiosis', '减数第二次分裂后期'], ['Anaphase of mitosis', '有丝分裂后期'], ['Prophase I', '减数第一次分裂前期']],
    'Meiosis I separates homologous pairs (reducing 2n → n); meiosis II and mitosis separate sister chromatids.', '减数第一次分裂分离同源染色体（2n → n）；减数第二次分裂和有丝分裂分离姐妹染色单体。');
  Q('bio6', 4, 3, 'concept', 'Which statement correctly compares meiosis and mitosis?', '哪项正确比较了减数分裂与有丝分裂？',
    [['Meiosis makes 4 genetically different haploid cells; mitosis makes 2 identical diploid cells', '减数分裂产生 4 个遗传不同的单倍体细胞；有丝分裂产生 2 个相同的二倍体细胞'], ['Both make 4 identical cells', '两者都产生 4 个相同细胞'], ['Mitosis includes crossing over', '有丝分裂包括交叉互换'], ['Meiosis happens in all body cells', '减数分裂发生在所有体细胞中']],
    'Meiosis (in gamete-forming cells) has two divisions plus crossing over and independent assortment; mitosis is one division producing clones.', '减数分裂（在产生配子的细胞中）有两次分裂，并伴随交叉互换和自由组合；有丝分裂只分裂一次，产生相同细胞。');
  Q('bio6', 2, 3, 'application', 'A mutation inactivates the p53 checkpoint protein. Why can this lead to cancer?', '某突变使 p53 检查点蛋白失活。为什么可能导致癌症？',
    [['Cells with damaged DNA keep dividing instead of pausing for repair or apoptosis', '带有受损 DNA 的细胞不暂停修复或凋亡而继续分裂'], ['Cells stop dividing completely', '细胞完全停止分裂'], ['Cells lose their nucleus', '细胞失去细胞核'], ['Cyclins can no longer be made', '细胞无法合成周期蛋白']],
    'p53 is a tumor suppressor that halts the cycle at G1 when DNA is damaged; without it, mutations accumulate and division becomes uncontrolled.', 'p53 是抑癌蛋白，DNA 受损时使细胞周期停在 G1；失去它后突变不断积累，分裂失控。');
  Q('bio6', 1, 2, 'concept', 'How does cytokinesis differ in plant cells compared with animal cells?', '植物细胞与动物细胞的胞质分裂有何不同？',
    [['Plants build a cell plate; animals form a cleavage furrow', '植物形成细胞板；动物形成分裂沟'], ['Plants form a cleavage furrow; animals build a cell plate', '植物形成分裂沟；动物形成细胞板'], ['Only animal cells undergo cytokinesis', '只有动物细胞进行胞质分裂'], ['There is no difference', '没有区别']],
    'A rigid cell wall cannot pinch inward, so plant vesicles fuse into a cell plate that becomes the new wall; animal cells pinch in with an actin ring.', '坚硬的细胞壁无法向内缢缩，植物细胞由囊泡融合成细胞板形成新细胞壁；动物细胞由肌动蛋白环向内缢缩。');
  Q('bio6', 7, 3, 'application', 'A karyotype shows three copies of chromosome 21. What event most likely caused this?', '某核型显示第 21 号染色体有三条。最可能的原因是什么？',
    [['Nondisjunction during meiosis in a parent', '亲本减数分裂时发生不分离'], ['Crossing over in mitosis', '有丝分裂中的交叉互换'], ['A point mutation', '点突变'], ['Independent assortment', '自由组合']],
    'If chromosomes fail to separate in meiosis, a gamete gets an extra copy; fertilization then gives trisomy 21 (Down syndrome).', '减数分裂中染色体未分离会使配子多一条；受精后形成 21 三体（唐氏综合征）。');

  /* ---------- bio3 · Biochemistry ---------- */
  Q('bio3', 2, 2, 'concept', 'Joining two glucose molecules into maltose releases which molecule?', '两分子葡萄糖结合成麦芽糖时释放出什么分子？',
    [['Water (dehydration synthesis)', '水（脱水缩合）'], ['Carbon dioxide', '二氧化碳'], ['Oxygen', '氧气'], ['ATP', 'ATP']],
    'Dehydration synthesis removes H₂O to form a bond between monomers; hydrolysis adds water to break it.', '脱水缩合脱去一分子 H₂O 使单体连接；水解则加入水使键断裂。');
  Q('bio3', 7, 2, 'concept', 'Why is carbon the backbone of biological molecules?', '为什么碳是生物分子的骨架？',
    [['It forms 4 stable covalent bonds, building chains, rings and branches', '它能形成 4 个稳定共价键，构成链、环和分支'], ['It is the most common element in air', '它是空气中最多的元素'], ['It is a metal that conducts electricity', '它是能导电的金属'], ['It forms only ionic bonds', '它只形成离子键']],
    'With four valence electrons, carbon bonds to up to four atoms, allowing huge structural diversity.', '碳有 4 个价电子，可与最多 4 个原子成键，使结构极其多样。');
  Q('bio3', 0, 2, 'concept', 'Water moves up a narrow tube and up plant xylem partly because water molecules stick to each other and to the walls. These properties are:', '水能沿细管和植物木质部上升，部分原因是水分子彼此黏附并黏附于管壁。这些性质是：',
    [['Cohesion and adhesion, caused by hydrogen bonding', '内聚力和附着力，由氢键引起'], ['High pH and buffering', '高 pH 和缓冲作用'], ['Hydrophobic interactions', '疏水作用'], ['Ionic bonding between molecules', '分子间的离子键']],
    'Polar water molecules hydrogen-bond to each other (cohesion) and to charged/polar surfaces (adhesion), producing capillary action.', '极性的水分子彼此形成氢键（内聚力），并与带电或极性表面结合（附着力），产生毛细作用。');
  Q('bio3', 6, 3, 'concept', 'An α-helix in a protein is held together mainly by:', '蛋白质中的 α 螺旋主要由什么维持？',
    [['Hydrogen bonds along the backbone (secondary structure)', '主链上的氢键（二级结构）'], ['Peptide bonds between R groups', 'R 基之间的肽键'], ['Disulfide bridges between subunits', '亚基之间的二硫键'], ['The order of amino acids only', '仅氨基酸顺序']],
    'Secondary structure (α-helix, β-sheet) comes from H-bonds between backbone C=O and N–H groups; primary = sequence; tertiary = R-group interactions; quaternary = multiple chains.', '二级结构（α 螺旋、β 折叠）来自主链 C=O 与 N–H 之间的氢键；一级=序列，三级=R 基相互作用，四级=多条肽链。');
  Q('bio3', 5, 2, 'calculation', 'Solution A has pH 4 and solution B has pH 6. Compared with B, A has:', '溶液 A 的 pH 为 4，溶液 B 为 6。与 B 相比，A：',
    [['100 times more H⁺', 'H⁺ 多 100 倍'], ['2 times more H⁺', 'H⁺ 多 2 倍'], ['100 times less H⁺', 'H⁺ 少 100 倍'], ['The same H⁺, but more OH⁻', 'H⁺ 相同，但 OH⁻ 更多']],
    'pH is logarithmic: each unit is ×10, so 2 units = 10² = 100 times the hydrogen-ion concentration.', 'pH 是对数刻度：每差 1 单位相差 10 倍，差 2 单位即 10² = 100 倍。');

  /* ---------- pc5 · Trig identities & equations ---------- */
  Q('pc5', 3, 2, 'calculation', 'In triangle ABC, A = 30°, a = 5, B = 45°. Find b.', '在三角形 ABC 中，A = 30°，a = 5，B = 45°。求 b。',
    [['5√2 ≈ 7.07', '5√2 ≈ 7.07'], ['5√3 ≈ 8.66', '5√3 ≈ 8.66'], ['2.5', '2.5'], ['10', '10']],
    'Law of Sines: b = a·sin B / sin A = 5·(√2/2)/(1/2) = 5√2.', '正弦定理：b = a·sin B / sin A = 5·(√2/2)/(1/2) = 5√2。');
  Q('pc5', 6, 2, 'calculation', 'Find the exact value of sin 75°.', '求 sin 75° 的精确值。',
    [['(√6 + √2)/4', '(√6 + √2)/4'], ['(√6 − √2)/4', '(√6 − √2)/4'], ['√3/2 + √2/2', '√3/2 + √2/2'], ['1/2', '1/2']],
    'sin(45° + 30°) = sin45 cos30 + cos45 sin30 = (√2/2)(√3/2) + (√2/2)(1/2) = (√6 + √2)/4.', 'sin(45° + 30°) = sin45 cos30 + cos45 sin30 = (√2/2)(√3/2) + (√2/2)(1/2) = (√6 + √2)/4。');
  Q('pc5', 6, 3, 'calculation', 'cos(A − B) equals:', 'cos(A − B) 等于：',
    [['cos A cos B + sin A sin B', 'cos A cos B + sin A sin B'], ['cos A cos B − sin A sin B', 'cos A cos B − sin A sin B'], ['sin A cos B − cos A sin B', 'sin A cos B − cos A sin B'], ['cos A − cos B', 'cos A − cos B']],
    'The cosine difference formula flips the sign: cos(A − B) = cos A cos B + sin A sin B. (cos(A + B) has the minus.)', '余弦差角公式符号相反：cos(A − B) = cos A cos B + sin A sin B（cos(A + B) 才是减号）。');
  Q('pc5', 1, 2, 'calculation', 'Solve 2 sin x − 1 = 0 on [0, 2π).', '在 [0, 2π) 上解 2 sin x − 1 = 0。',
    [['x = π/6 and 5π/6', 'x = π/6 和 5π/6'], ['x = π/3 and 2π/3', 'x = π/3 和 2π/3'], ['x = π/6 only', '只有 x = π/6'], ['x = π/6 and 7π/6', 'x = π/6 和 7π/6']],
    'sin x = 1/2 is positive in quadrants I and II: x = π/6 and π − π/6 = 5π/6.', 'sin x = 1/2 在第一、二象限为正：x = π/6 和 π − π/6 = 5π/6。');
  Q('pc5', 5, 3, 'concept', 'Given A = 30°, a = 6, b = 10 (SSA). How many triangles are possible?', '已知 A = 30°，a = 6，b = 10（SSA）。可以构成几个三角形？',
    [['Two', '两个'], ['One', '一个'], ['None', '零个'], ['Infinitely many', '无数个']],
    'Height h = b·sin A = 10·0.5 = 5. Since h < a < b (5 < 6 < 10), there are two triangles (ambiguous case).', '高 h = b·sin A = 10 × 0.5 = 5。因为 h < a < b（5 < 6 < 10），可构成两个三角形（歧义情形）。');
  Q('pc5', 4, 2, 'calculation', 'Two sides of a triangle are 5 and 8 with included angle 60°. Find the third side.', '三角形两边为 5 和 8，夹角 60°。求第三边。',
    [['7', '7'], ['√89', '√89'], ['13', '13'], ['√39', '√39']],
    'Law of Cosines: c² = 25 + 64 − 2·5·8·cos60° = 89 − 40 = 49, so c = 7.', '余弦定理：c² = 25 + 64 − 2·5·8·cos60° = 89 − 40 = 49，c = 7。');

  /* ---------- pc9 · Conic sections ---------- */
  Q('pc9', 4, 2, 'concept', 'Classify 4x² + 9y² − 16x + 18y − 11 = 0.', '判断 4x² + 9y² − 16x + 18y − 11 = 0 的类型。',
    [['Ellipse', '椭圆'], ['Hyperbola', '双曲线'], ['Parabola', '抛物线'], ['Circle', '圆']],
    'Both squared terms are positive with different coefficients (A = 4, C = 9, AC > 0, A ≠ C) → ellipse. Equal coefficients would be a circle; opposite signs a hyperbola; one squared term a parabola.', '两个平方项系数同号且不相等（A = 4，C = 9）→ 椭圆。系数相等为圆，异号为双曲线，只有一个平方项为抛物线。');
  Q('pc9', 4, 2, 'concept', 'Classify y² − 4x + 2y + 5 = 0.', '判断 y² − 4x + 2y + 5 = 0 的类型。',
    [['Parabola', '抛物线'], ['Ellipse', '椭圆'], ['Hyperbola', '双曲线'], ['Circle', '圆']],
    'Only y is squared (no x² term), so the graph is a parabola opening horizontally.', '只有 y 被平方（没有 x² 项），所以是开口向左右的抛物线。');
  Q('pc9', 7, 3, 'application', 'A satellite dish is a paraboloid. Where should the receiver be placed?', '卫星天线是抛物面。接收器应放在哪里？',
    [['At the focus', '焦点处'], ['At the vertex', '顶点处'], ['On the directrix', '准线上'], ['At the edge of the dish', '天线边缘']],
    'Rays parallel to the axis reflect off a parabola through its focus, so signals concentrate there.', '平行于对称轴的光线经抛物面反射后都汇聚到焦点，所以信号在焦点处最集中。');
  Q('pc9', 0, 2, 'calculation', 'Find the center and radius of x² + y² − 6x + 4y − 3 = 0.', '求 x² + y² − 6x + 4y − 3 = 0 的圆心和半径。',
    [['Center (3, −2), radius 4', '圆心 (3, −2)，半径 4'], ['Center (−3, 2), radius 4', '圆心 (−3, 2)，半径 4'], ['Center (3, −2), radius 16', '圆心 (3, −2)，半径 16'], ['Center (3, 2), radius √3', '圆心 (3, 2)，半径 √3']],
    'Complete the square: (x − 3)² − 9 + (y + 2)² − 4 − 3 = 0 → (x − 3)² + (y + 2)² = 16, so r = 4.', '配方：(x − 3)² − 9 + (y + 2)² − 4 − 3 = 0 → (x − 3)² + (y + 2)² = 16，r = 4。');
  Q('pc9', 3, 3, 'calculation', 'What are the asymptotes of x²/16 − y²/9 = 1?', 'x²/16 − y²/9 = 1 的渐近线是什么？',
    [['y = ±(3/4)x', 'y = ±(3/4)x'], ['y = ±(4/3)x', 'y = ±(4/3)x'], ['y = ±(9/16)x', 'y = ±(9/16)x'], ['x = ±4', 'x = ±4']],
    'For x²/a² − y²/b² = 1, the asymptotes are y = ±(b/a)x = ±(3/4)x.', '对于 x²/a² − y²/b² = 1，渐近线为 y = ±(b/a)x = ±(3/4)x。');
  Q('pc9', 2, 3, 'calculation', 'An ellipse has a = 5 and b = 3. What is its eccentricity?', '某椭圆 a = 5，b = 3。离心率是多少？',
    [['0.8', '0.8'], ['0.6', '0.6'], ['1.25', '1.25'], ['0.36', '0.36']],
    'c² = a² − b² = 25 − 9 = 16, c = 4, e = c/a = 4/5 = 0.8 (always between 0 and 1 for an ellipse).', 'c² = a² − b² = 25 − 9 = 16，c = 4，e = c/a = 0.8（椭圆的离心率在 0 和 1 之间）。');

  /* ---------- pc2 · Polynomial & rational ---------- */
  Q('pc2', 7, 2, 'concept', 'f(x) = (x − 2)(x + 1) / (x − 2). What happens at x = 2?', 'f(x) = (x − 2)(x + 1) / (x − 2)。在 x = 2 处发生什么？',
    [['A hole at (2, 3)', '在 (2, 3) 处有一个洞（可去间断点）'], ['A vertical asymptote x = 2', '竖直渐近线 x = 2'], ['A zero at x = 2', '在 x = 2 处有零点'], ['Nothing — f is defined there', '没有特别之处，函数在此有定义']],
    'The factor (x − 2) cancels, leaving y = x + 1 with x ≠ 2; the missing point is (2, 2 + 1) = (2, 3).', '因式 (x − 2) 约去，剩 y = x + 1（x ≠ 2）；缺失的点为 (2, 3)。');
  Q('pc2', 4, 3, 'concept', 'For f(x) = (2x² − 8)/(x² − x − 6), which list is correct?', '对于 f(x) = (2x² − 8)/(x² − x − 6)，哪项正确？',
    [['Hole at x = −2, VA x = 3, HA y = 2', 'x = −2 处有洞，竖直渐近线 x = 3，水平渐近线 y = 2'], ['VAs x = −2 and x = 3, HA y = 0', '竖直渐近线 x = −2 和 x = 3，水平渐近线 y = 0'], ['Hole at x = 3, VA x = −2, HA y = 2', 'x = 3 处有洞，竖直渐近线 x = −2，水平渐近线 y = 2'], ['No asymptotes', '没有渐近线']],
    'Factor: 2(x − 2)(x + 2) / ((x − 3)(x + 2)). (x + 2) cancels → hole at x = −2; x = 3 remains → VA; equal degrees → HA y = 2/1 = 2.', '因式分解：2(x − 2)(x + 2) / ((x − 3)(x + 2))。约去 (x + 2) → x = −2 处有洞；剩 x = 3 → 竖直渐近线；分子分母次数相等 → 水平渐近线 y = 2。');
  Q('pc2', 3, 3, 'calculation', 'Find the slant asymptote of f(x) = (x² + 3x + 1)/(x + 1).', '求 f(x) = (x² + 3x + 1)/(x + 1) 的斜渐近线。',
    [['y = x + 2', 'y = x + 2'], ['y = x + 3', 'y = x + 3'], ['y = x', 'y = x'], ['y = 1', 'y = 1']],
    'Divide: x² + 3x + 1 = (x + 1)(x + 2) − 1, so f(x) = x + 2 − 1/(x + 1) and the slant asymptote is y = x + 2.', '做除法：x² + 3x + 1 = (x + 1)(x + 2) − 1，所以 f(x) = x + 2 − 1/(x + 1)，斜渐近线 y = x + 2。');
  Q('pc2', 0, 2, 'concept', 'Describe the end behavior of f(x) = −2x⁵ + x² − 7.', '描述 f(x) = −2x⁵ + x² − 7 的端行为。',
    [['x → ∞: f → −∞; x → −∞: f → ∞', 'x → ∞ 时 f → −∞；x → −∞ 时 f → ∞'], ['Both ends → ∞', '两端都 → ∞'], ['Both ends → −∞', '两端都 → −∞'], ['x → ∞: f → ∞; x → −∞: f → −∞', 'x → ∞ 时 f → ∞；x → −∞ 时 f → −∞']],
    'The leading term −2x⁵ decides: odd degree, negative leading coefficient → falls to the right, rises to the left.', '首项 −2x⁵ 决定端行为：奇次、首项系数为负 → 右端下降、左端上升。');
  Q('pc2', 5, 3, 'calculation', 'Solve √(x + 6) = x. Which solution(s) are valid?', '解 √(x + 6) = x。哪些解有效？',
    [['x = 3 only', '只有 x = 3'], ['x = 3 and x = −2', 'x = 3 和 x = −2'], ['x = −2 only', '只有 x = −2'], ['No solution', '无解']],
    'Squaring gives x² − x − 6 = 0 → x = 3 or −2. Check: √9 = 3 ✓, but √4 = 2 ≠ −2, so −2 is extraneous.', '平方得 x² − x − 6 = 0 → x = 3 或 −2。检验：√9 = 3 ✓；√4 = 2 ≠ −2，所以 −2 是增根。');

  /* ---------- pc6 · Vectors, polar & parametric ---------- */
  Q('pc6', 6, 3, 'application', 'A plane flies 300 km/h due north; wind blows 40 km/h due east. What is its ground speed?', '飞机以 300 km/h 正北飞行，风速 40 km/h 正东。地速是多少？',
    [['About 302.7 km/h', '约 302.7 km/h'], ['340 km/h', '340 km/h'], ['260 km/h', '260 km/h'], ['About 296 km/h', '约 296 km/h']],
    'The resultant is ⟨40, 300⟩ with magnitude √(40² + 300²) = √91600 ≈ 302.7 km/h.', '合速度为 ⟨40, 300⟩，大小 √(40² + 300²) = √91600 ≈ 302.7 km/h。');
  Q('pc6', 2, 2, 'calculation', 'Are u = ⟨2, −3⟩ and v = ⟨6, 4⟩ orthogonal?', 'u = ⟨2, −3⟩ 与 v = ⟨6, 4⟩ 是否垂直？',
    [['Yes — u·v = 0', '是，u·v = 0'], ['No — u·v = 24', '否，u·v = 24'], ['No — they are parallel', '否，它们平行'], ['Cannot tell without angles', '不知道角度无法判断']],
    'u·v = 2·6 + (−3)·4 = 12 − 12 = 0, so the vectors are perpendicular.', 'u·v = 2·6 + (−3)·4 = 0，所以两向量垂直。');
  Q('pc6', 3, 2, 'calculation', 'Convert the polar point (4, π/3) to rectangular form.', '把极坐标点 (4, π/3) 化为直角坐标。',
    [['(2, 2√3)', '(2, 2√3)'], ['(2√3, 2)', '(2√3, 2)'], ['(4, 3)', '(4, 3)'], ['(−2, 2√3)', '(−2, 2√3)']],
    'x = r cos θ = 4·(1/2) = 2, y = r sin θ = 4·(√3/2) = 2√3.', 'x = r cos θ = 4 × 1/2 = 2，y = r sin θ = 4 × √3/2 = 2√3。');
  Q('pc6', 4, 3, 'calculation', 'Use De Moivre\'s theorem: [2(cos 30° + i sin 30°)]³ = ?', '用棣莫弗定理：[2(cos 30° + i sin 30°)]³ = ？',
    [['8i', '8i'], ['8', '8'], ['6i', '6i'], ['−8', '−8']],
    'rⁿ = 8 and nθ = 90°: 8(cos 90° + i sin 90°) = 8(0 + i) = 8i.', 'rⁿ = 8，nθ = 90°：8(cos 90° + i sin 90°) = 8i。');
  Q('pc6', 5, 2, 'concept', 'The curve x = 3 cos t, y = 3 sin t (0 ≤ t < 2π) is:', '曲线 x = 3 cos t，y = 3 sin t（0 ≤ t < 2π）是：',
    [['A circle of radius 3 centered at the origin', '以原点为圆心、半径为 3 的圆'], ['A line through the origin', '过原点的直线'], ['An ellipse with a = 3, b = 1', 'a = 3、b = 1 的椭圆'], ['A parabola', '抛物线']],
    'x² + y² = 9(cos²t + sin²t) = 9, a circle of radius 3, traced counterclockwise once.', 'x² + y² = 9(cos²t + sin²t) = 9，是半径为 3 的圆，逆时针绕一圈。');

  /* ---------- pc7 · Systems & matrices ---------- */
  Q('pc7', 6, 3, 'concept', 'A row-reduced augmented matrix has the row [0 0 0 | 5]. What does this mean?', '行简化后的增广矩阵出现一行 [0 0 0 | 5]。这意味着什么？',
    [['The system has no solution (inconsistent)', '方程组无解（不相容）'], ['There are infinitely many solutions', '有无穷多解'], ['x = 5', 'x = 5'], ['The solution is (0, 0, 0)', '解为 (0, 0, 0)']],
    'The row says 0 = 5, which is impossible, so the system is inconsistent. A row of all zeros (0 = 0) would instead suggest infinitely many solutions.', '该行表示 0 = 5，不可能成立，所以方程组不相容。全零行（0 = 0）才提示有无穷多解。');
  Q('pc7', 2, 3, 'calculation', 'Find the inverse of [[2, 1], [5, 3]].', '求 [[2, 1], [5, 3]] 的逆矩阵。',
    [['[[3, −1], [−5, 2]]', '[[3, −1], [−5, 2]]'], ['[[−3, 1], [5, −2]]', '[[−3, 1], [5, −2]]'], ['[[3, 1], [5, 2]]', '[[3, 1], [5, 2]]'], ['It has no inverse', '没有逆矩阵']],
    'det = 2·3 − 1·5 = 1. Inverse = (1/det)·[[d, −b], [−c, a]] = [[3, −1], [−5, 2]].', '行列式 = 2·3 − 1·5 = 1。逆矩阵 = (1/det)·[[d, −b], [−c, a]] = [[3, −1], [−5, 2]]。');
  Q('pc7', 4, 3, 'calculation', 'Using Cramer\'s rule for 3x + 2y = 7 and x − y = −1, what is x?', '用克莱姆法则解 3x + 2y = 7 和 x − y = −1，x 等于多少？',
    [['1', '1'], ['2', '2'], ['−1', '−1'], ['7/5', '7/5']],
    'D = 3(−1) − 2(1) = −5; Dₓ = 7(−1) − 2(−1) = −5; x = Dₓ/D = 1 (then y = 2).', 'D = 3(−1) − 2(1) = −5；Dₓ = 7(−1) − 2(−1) = −5；x = Dₓ/D = 1（y = 2）。');
  Q('pc7', 5, 2, 'concept', 'The system 2x + 4y = 6 and x + 2y = 3 has:', '方程组 2x + 4y = 6 与 x + 2y = 3：',
    [['Infinitely many solutions (dependent)', '有无穷多解（相依）'], ['Exactly one solution', '恰有一个解'], ['No solution', '无解'], ['Two solutions', '两个解']],
    'The first equation is exactly 2 × the second — the same line — so every point on it is a solution.', '第一个方程正好是第二个的 2 倍，表示同一条直线，所以线上每一点都是解。');
  Q('pc7', 1, 2, 'concept', 'A is 2×3 and B is 3×4. What are the dimensions of AB, and is BA defined?', 'A 是 2×3，B 是 3×4。AB 的维度是多少？BA 是否有定义？',
    [['AB is 2×4; BA is not defined', 'AB 为 2×4；BA 没有定义'], ['AB is 3×3; BA is 4×2', 'AB 为 3×3；BA 为 4×2'], ['AB is 2×4; BA is 4×2', 'AB 为 2×4；BA 为 4×2'], ['Neither is defined', '两者都没有定义']],
    'Inner dimensions must match: (2×3)(3×4) → 2×4. For BA, (3×4)(2×3) has 4 ≠ 2, so it is undefined.', '内侧维度必须相同：(2×3)(3×4) → 2×4。BA 为 (3×4)(2×3)，4 ≠ 2，无定义。');

  /* ---------- geo1 · Thinking geographically ---------- */
  Q('geo1', 0, 2, 'concept', 'Why does Greenland look as large as Africa on a Mercator map?', '为什么在墨卡托地图上格陵兰看起来和非洲一样大？',
    [['Mercator keeps shape and direction but greatly enlarges areas near the poles', '墨卡托投影保持形状和方向，但会极大放大高纬度地区面积'], ['Greenland is actually that large', '格陵兰实际上就有那么大'], ['Mercator is an equal-area projection', '墨卡托是等积投影'], ['It distorts only longitude', '它只扭曲经度']],
    'Africa is about 14 times larger. Mercator is conformal (good for navigation) but area distortion grows with latitude; equal-area maps like Gall-Peters fix size but distort shape.', '非洲面积约为格陵兰的 14 倍。墨卡托投影是等角投影（适合航海），但面积变形随纬度增大；高尔-彼得斯等等积投影保持面积而变形形状。');
  Q('geo1', 2, 2, 'concept', 'Which map has the LARGEST scale?', '哪张地图的比例尺最大？',
    [['1:10,000 map of a neighborhood', '1:10,000 的社区地图'], ['1:1,000,000 map of a state', '1:1,000,000 的州地图'], ['1:50,000,000 world map', '1:50,000,000 的世界地图'], ['They are all the same scale', '比例尺都相同']],
    'A large-scale map shows a small area in great detail (the fraction 1/10,000 is the biggest). Small-scale maps cover large areas with little detail.', '大比例尺地图显示小区域、细节多（1/10,000 这个分数最大）；小比例尺地图覆盖大范围、细节少。');
  Q('geo1', 3, 2, 'application', 'The area served by one airline hub or one newspaper\'s delivery routes is an example of a:', '某航空枢纽或某报纸配送范围所覆盖的区域属于：',
    [['Functional (nodal) region', '功能区（节点区）'], ['Formal region', '形式区（均质区）'], ['Perceptual (vernacular) region', '感知区（乡土区）'], ['Absolute location', '绝对位置']],
    'A functional region is organized around a node and its connections; formal regions share a measurable trait; perceptual regions exist in people\'s minds (e.g., "the South").', '功能区以一个节点及其联系为中心组织；形式区具有可测量的共同特征；感知区存在于人们的观念中（如"美国南方"）。');
  Q('geo1', 1, 2, 'vocab', 'A map that shows population density with darker shading for higher values in each county is a:', '按县用颜色深浅表示人口密度（越高越深）的地图是：',
    [['Choropleth map', '分级统计图'], ['Reference map', '参考地图'], ['Isoline map', '等值线图'], ['Topographic map', '地形图']],
    'Choropleth maps shade predefined areas by a statistic; isoline maps connect points of equal value (e.g., elevation); reference maps show locations, not data.', '分级统计图按统计值给预定区域着色；等值线图连接数值相等的点（如海拔）；参考地图显示位置而非数据。');
  Q('geo1', 6, 3, 'concept', 'The idea that people adapt to and modify their environment in different ways, rather than being controlled by it, is:', '"人们以不同方式适应和改造环境，而不是被环境决定"的观点是：',
    [['Possibilism', '可能论'], ['Environmental determinism', '环境决定论'], ['Distance decay', '距离衰减'], ['Space–time compression', '时空压缩']],
    'Possibilism replaced environmental determinism, which wrongly claimed climate and landforms determine culture and development.', '可能论取代了环境决定论；后者错误地认为气候和地形决定文化与发展。');
  Q('geo1', 5, 2, 'application', 'Video calls and cheap flights make faraway places feel closer. This is:', '视频通话和廉价航班让遥远的地方感觉更近。这是：',
    [['Space–time compression', '时空压缩'], ['Distance decay', '距离衰减'], ['Friction of distance increasing', '距离摩擦增大'], ['Environmental determinism', '环境决定论']],
    'Space–time compression is the shrinking "relative distance" between places due to faster transport and communication; it weakens distance decay.', '时空压缩指交通和通信加快使地点间的"相对距离"缩短，它削弱了距离衰减效应。');

  /* ---------- geo4 · Political ---------- */
  Q('geo4', 5, 2, 'application', 'Scotland\'s parliament gaining powers over health and education from the UK government is an example of:', '苏格兰议会从英国政府获得卫生和教育权力，属于：',
    [['Devolution', '权力下放'], ['Supranationalism', '超国家主义'], ['Irredentism', '民族统一主义'], ['Gerrymandering', '选区划分不公']],
    'Devolution transfers power from a central government to regional governments, often in response to ethnic or regional identity.', '权力下放是把权力从中央政府转移给地区政府，常是对民族或地区认同的回应。');
  Q('geo4', 5, 3, 'concept', 'Which force most often encourages devolution within a state?', '哪种力量最常推动国家内部的权力下放？',
    [['A distinct ethnic or linguistic group concentrated in one region', '某一地区集中分布的独特民族或语言群体'], ['A strong national education system', '强大的全国教育系统'], ['A shared national religion', '共同的国家宗教'], ['Well-connected national transport', '完善的全国交通网']],
    'Regional concentration of a distinct ethnicity or language (e.g., Catalonia, Quebec, Flanders) is a centrifugal force; shared institutions are centripetal.', '独特民族或语言在某地区集中（如加泰罗尼亚、魁北克、佛兰德）是离心力；共同的制度是向心力。');
  Q('geo4', 7, 2, 'concept', 'How did the Berlin Conference (1884–85) shape modern African boundaries?', '柏林会议（1884–85）如何影响了现代非洲的边界？',
    [['European powers drew superimposed boundaries that ignored ethnic groups', '欧洲列强划定了忽视民族分布的强加边界'], ['African leaders negotiated their own borders', '非洲领导人自行谈判划定边界'], ['It created the African Union', '它成立了非洲联盟'], ['It followed natural rivers only', '它只沿自然河流划界']],
    'Colonial powers divided Africa among themselves; many borders split or combined ethnic groups, a source of later conflict.', '殖民列强瓜分非洲，许多边界分割或合并了不同民族，成为日后冲突的根源。');
  Q('geo4', 2, 2, 'vocab', 'A boundary drawn along a line of latitude, like much of the US–Canada border, is a:', '沿纬线划定的边界（如美加边界的大部分）是：',
    [['Geometric boundary', '几何边界'], ['Relic boundary', '遗迹边界'], ['Subsequent boundary', '后成边界'], ['Physical boundary', '自然边界']],
    'Geometric boundaries are straight lines (often latitude/longitude) unrelated to physical or cultural features.', '几何边界是与自然或文化特征无关的直线（常沿经纬线）。');
  Q('geo4', 4, 2, 'concept', 'What do the EU, NATO and ASEAN have in common?', '欧盟、北约和东盟有什么共同点？',
    [['They are supranational organizations of three or more states', '它们都是由三个或以上国家组成的超国家组织'], ['They are all military alliances', '它们都是军事同盟'], ['They all share one currency', '它们都使用同一种货币'], ['They are all in Europe', '它们都在欧洲']],
    'Supranational organizations link states for shared economic, political or military goals, and members give up some sovereignty.', '超国家组织为共同的经济、政治或军事目标联结各国，成员国让渡部分主权。');

  /* ---------- geo6 · Cities ---------- */
  Q('geo6', 3, 3, 'concept', 'In central place theory, what is the "threshold" of a good or service?', '在中心地理论中，商品或服务的"门槛"是什么？',
    [['The minimum number of customers needed to stay in business', '维持经营所需的最少顾客数'], ['The maximum distance people will travel for it', '人们愿意为它出行的最远距离'], ['The price of the good', '商品的价格'], ['The size of the store', '商店的面积']],
    'Threshold = minimum market size; range = the maximum distance people will travel. High-order services (stadiums) need large thresholds and have large ranges.', '门槛 = 最小市场规模；服务范围 = 人们愿意出行的最远距离。高级服务（如体育场）门槛大、范围广。');
  Q('geo6', 5, 2, 'concept', 'Which is a smart-growth policy?', '以下哪项属于精明增长政策？',
    [['Mixed-use, walkable development near public transit', '靠近公共交通的混合用途、步行友好开发'], ['Building large-lot housing far from jobs', '在远离就业的地方建大地块住宅'], ['Widening highways to more suburbs', '修宽通往更多郊区的高速公路'], ['Zoning that separates every land use', '把每种用地完全分隔的分区规划']],
    'Smart growth counters sprawl with compact, mixed-use, transit-oriented development and preserved open space.', '精明增长通过紧凑、混合用途、以公共交通为导向的开发并保护开放空间来对抗城市蔓延。');
  Q('geo6', 6, 2, 'application', 'Young professionals renovate old homes in a low-income neighborhood, rents rise, and long-time residents move out. This is:', '年轻专业人士翻新低收入社区的旧房，房租上涨，老住户被迫搬走。这是：',
    [['Gentrification', '绅士化'], ['Redlining', '红线政策'], ['Suburbanization', '郊区化'], ['Blockbusting', '房地产恐慌兜售']],
    'Gentrification brings investment but often displaces lower-income residents; redlining was the discriminatory denial of loans to certain neighborhoods.', '绅士化带来投资，但常使低收入居民被迫迁出；红线政策是对特定社区拒绝贷款的歧视性做法。');
  Q('geo6', 1, 3, 'concept', 'In the Griffin–Ford Latin American city model, where do the wealthiest residents mainly live?', '在格里芬-福特拉美城市模型中，最富裕的居民主要住在哪里？',
    [['Along a commercial "spine" extending from the CBD', '沿着从中心商务区延伸出的商业"脊"'], ['In the outer squatter settlements', '在外围的棚户区'], ['Only in distant suburbs, as in the US', '像美国那样只住在远郊'], ['In the zone of transition', '在过渡带']],
    'The elite live near the CBD and along the spine with its amenities; the poorest live in peripheral squatter settlements (favelas) — the reverse of the US pattern.', '精英住在中心商务区附近和沿"脊"一带享受设施；最贫困者住在外围棚户区（贫民窟），与美国模式相反。');
  Q('geo6', 7, 2, 'concept', 'What makes a city such as London or New York a "world city" at the top of the global hierarchy?', '是什么让伦敦或纽约这样的城市位于全球城市等级顶端，成为"世界城市"？',
    [['Concentration of finance, corporate headquarters and global connections', '集中了金融、企业总部和全球联系'], ['The largest population in the world', '世界最多的人口'], ['Being a national capital', '是国家首都'], ['The most manufacturing jobs', '制造业岗位最多']],
    'World-city status depends on economic and cultural influence (finance, HQs, media, airports), not population size — Lagos is huge but less globally central.', '世界城市地位取决于经济与文化影响力（金融、总部、媒体、机场），而不是人口——拉各斯人口很多但全球中心性较低。');

  /* ---------- geo3 · Culture ---------- */
  Q('geo3', 5, 2, 'concept', 'What is the difference between ethnicity and race?', '民族（ethnicity）和种族（race）有什么区别？',
    [['Ethnicity is identity based on shared culture and homeland; race is a social category based on perceived physical traits', '民族是基于共同文化与故土的认同；种族是基于外在身体特征的社会分类'], ['They mean exactly the same thing', '两者完全相同'], ['Race is chosen; ethnicity is genetic', '种族可以选择，民族由基因决定'], ['Ethnicity refers only to religion', '民族只指宗教']],
    'Ethnicity is tied to culture, language, traditions and place of origin; race is socially constructed from skin color and other traits, not a biological division.', '民族与文化、语言、传统和起源地相关；种族是依据肤色等特征建构的社会分类，并非生物学划分。');
  Q('geo3', 5, 3, 'application', 'A Chinatown in San Francisco is best described as an example of:', '旧金山的唐人街最适合被描述为：',
    [['An ethnic enclave shaped by chain migration', '由链式迁移形成的族裔聚居区'], ['A primate city', '首位城市'], ['Stimulus diffusion', '刺激扩散'], ['A formal language region', '正式语言区']],
    'Ethnic enclaves form when migrants cluster for support, jobs and familiar culture, often through chain migration; they create distinctive cultural landscapes.', '移民为获得支持、工作和熟悉文化而聚居，往往通过链式迁移形成族裔聚居区，并塑造独特的文化景观。');
  Q('geo3', 7, 2, 'concept', 'The worldwide spread of fast-food chains and Hollywood films is most often linked to:', '快餐连锁和好莱坞电影在全球扩散最常与什么相关？',
    [['Globalization and the spread of popular culture', '全球化与流行文化的扩散'], ['Folk culture diffusion', '民俗文化扩散'], ['Ethnic religion', '民族宗教'], ['Environmental determinism', '环境决定论']],
    'Popular culture diffuses rapidly through global media and trade, sometimes causing placelessness and threatening local folk cultures.', '流行文化借助全球媒体与贸易快速扩散，有时造成"无地方性"并威胁本地民俗文化。');
  Q('geo3', 7, 3, 'application', 'A fashion brand sells clothing using sacred Indigenous designs without permission. Critics call this:', '某时装品牌未经许可使用原住民的神圣图案销售服装。批评者称之为：',
    [['Cultural appropriation', '文化挪用'], ['Acculturation', '文化适应'], ['Syncretism', '文化融合'], ['Assimilation', '同化']],
    'Cultural appropriation is adopting elements of a (usually marginalized) culture out of context, often for profit and without respect for their meaning.', '文化挪用指脱离原有语境使用（通常是弱势群体）文化元素，常为牟利且不尊重其意义。');
  Q('geo3', 2, 2, 'concept', 'English is used by pilots and scientists worldwide regardless of native language. In this role English is a:', '飞行员和科学家无论母语都在全球使用英语。此时英语是：',
    [['Lingua franca', '通用语'], ['Pidgin', '洋泾浜语'], ['Dialect', '方言'], ['Isolated language', '孤立语言']],
    'A lingua franca is a common language used between speakers of different native languages; a pidgin is a simplified mix of languages.', '通用语是不同母语者之间共同使用的语言；洋泾浜语是多种语言简化混合而成的语言。');
})();
