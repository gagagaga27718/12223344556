/* StudyLoop — bank expansion, batch 5 (Honors Biology + Pre-Calculus). Q(unit, topicIdx, difficulty, style, stemEn, stemZh,
 * options [[en, zh], ...] with the CORRECT ONE FIRST, explanationEn, explanationZh). Options are shuffled at display. */
(function () {
  'use strict';
  var B = window.EXTRA_BANK = window.EXTRA_BANK || [];
  function Q(unit, tp, d, t, qen, qzh, opts, een, ezh) {
    B.push({ unit: unit, tp: tp, d: d, t: t, q: { en: qen, zh: qzh }, o: opts.map(function (x) { return { en: x[0], zh: x[1] }; }), a: 0, e: { en: een, zh: ezh } });
  }

  /* =================== BIOLOGY =================== */
  /* bio1 */
  Q('bio1', 4, 2, 'concept', 'Which observation contradicted the idea of spontaneous generation and supports cell theory?', '哪项观察否定了自然发生说并支持细胞学说？',
    [['New cells only appear from the division of existing cells', '新细胞只能由已有细胞分裂产生'], ['Maggots appear on rotting meat', '腐肉上出现蛆虫'], ['Cells contain water', '细胞含有水'], ['Plants grow toward light', '植物向光生长']],
    'Virchow\'s "omnis cellula e cellula" (all cells from cells) and Pasteur\'s experiments showed life does not arise spontaneously.', '魏尔肖的"细胞来自细胞"以及巴斯德的实验表明，生命不会自然发生。');
  Q('bio1', 7, 2, 'concept', 'A wilted plant becomes firm again after watering. Which organelle is mainly responsible?', '萎蔫的植物浇水后重新挺立。主要起作用的细胞器是？',
    [['The central vacuole, which fills with water and creates turgor pressure', '中央液泡吸水后产生膨压'], ['The nucleus', '细胞核'], ['The Golgi apparatus', '高尔基体'], ['Ribosomes', '核糖体']],
    'Water enters the central vacuole by osmosis, pushing the membrane against the cell wall (turgor), which supports the plant.', '水通过渗透进入中央液泡，把细胞膜压向细胞壁（膨压），从而支撑植物。');
  Q('bio1', 0, 3, 'concept', 'Some antibiotics kill bacteria by blocking their ribosomes without harming human ribosomes. Why is this possible?', '有些抗生素能阻断细菌的核糖体，却不伤害人的核糖体。为什么能做到？',
    [['Prokaryotic (70S) ribosomes differ in structure from eukaryotic (80S) ribosomes', '原核生物（70S）核糖体与真核生物（80S）核糖体结构不同'], ['Human cells have no ribosomes', '人体细胞没有核糖体'], ['Bacteria have a nucleus that absorbs the drug', '细菌有细胞核吸收药物'], ['Bacterial ribosomes are inside mitochondria', '细菌核糖体位于线粒体内']],
    'Structural differences let drugs like streptomycin target bacterial ribosomes selectively.', '结构差异使链霉素等药物可以选择性地作用于细菌核糖体。');
  Q('bio1', 5, 3, 'concept', 'Which finding would NOT support the endosymbiotic theory?', '哪项发现不支持内共生学说？',
    [['Mitochondria were found to make all their proteins from nuclear genes only', '发现线粒体的所有蛋白质都只由核基因编码'], ['Mitochondria have circular DNA', '线粒体有环状 DNA'], ['Chloroplasts divide by binary fission', '叶绿体以二分裂方式增殖'], ['Mitochondrial ribosomes resemble bacterial ribosomes', '线粒体核糖体与细菌核糖体相似']],
    'Their own genome and protein-making machinery are key evidence; total dependence on nuclear genes would weaken the theory (in reality many genes moved to the nucleus, but some remain).', '拥有自己的基因组和蛋白质合成系统是关键证据；若完全依赖核基因则会削弱该学说（实际上许多基因已转移到核内，但仍保留一部分）。');
  Q('bio1', 3, 2, 'application', 'A sperm cell has a long flagellum and many mitochondria in its midpiece. This shows:', '精子有长鞭毛，中段含大量线粒体。这说明：',
    [['Structure fits function — movement needs a flagellum and lots of ATP', '结构与功能相适应——运动需要鞭毛和大量 ATP'], ['Sperm are prokaryotes', '精子是原核生物'], ['Mitochondria store DNA for the zygote', '线粒体为受精卵储存 DNA'], ['Cell theory is wrong', '细胞学说是错误的']],
    'The flagellum propels the cell and the packed mitochondria supply the ATP it needs to swim.', '鞭毛推动细胞前进，密集的线粒体为游动提供所需 ATP。');

  /* bio2 */
  Q('bio2', 7, 2, 'application', 'Why does spreading salt on a slug kill it?', '为什么在蛞蝓身上撒盐会使它死亡？',
    [['The salt makes the outside hypertonic, so water leaves its cells by osmosis', '盐使外部成为高渗环境，水通过渗透离开细胞'], ['Salt is an acid that burns the slug', '盐是会灼伤蛞蝓的酸'], ['Salt enters cells by active transport and makes them burst', '盐通过主动运输进入细胞使其破裂'], ['Salt blocks the slug\'s lungs', '盐堵塞了蛞蝓的肺']],
    'A hypertonic environment pulls water out of the slug\'s moist tissues, causing fatal dehydration.', '高渗环境把水从蛞蝓湿润的组织中吸出，导致致命脱水。');
  Q('bio2', 6, 2, 'concept', 'In which solution is a plant cell healthiest and firmest?', '植物细胞在哪种溶液中最健康、最坚挺？',
    [['Hypotonic', '低渗溶液'], ['Isotonic', '等渗溶液'], ['Hypertonic', '高渗溶液'], ['Any solution — plant cells do not exchange water', '任何溶液都一样，植物细胞不交换水']],
    'Water flows in, the vacuole swells and presses on the cell wall (turgid). The wall prevents bursting — unlike animal cells, which lyse.', '水流入，液泡膨胀压向细胞壁（膨胀状态）；细胞壁防止涨破——不同于会破裂的动物细胞。');
  Q('bio2', 1, 3, 'data', 'Which change would INCREASE the rate of simple diffusion of O₂ into a cell?', '哪种变化会提高 O₂ 向细胞简单扩散的速率？',
    [['A steeper concentration gradient and higher temperature', '更陡的浓度梯度和更高的温度'], ['Adding more ATP', '增加 ATP'], ['A thicker membrane', '更厚的膜'], ['A smaller surface area', '更小的表面积']],
    'Diffusion rate rises with the gradient, temperature and surface area, and falls with distance (membrane thickness). It needs no ATP.', '扩散速率随浓度梯度、温度和表面积增加而升高，随距离（膜厚度）增加而降低，不需要 ATP。');
  Q('bio2', 3, 4, 'concept', 'Intestinal cells absorb glucose against its gradient using a protein that also lets Na⁺ flow in down its gradient. This is:', '肠道细胞借助一种同时让 Na⁺ 顺梯度流入的蛋白质，逆梯度吸收葡萄糖。这是：',
    [['Secondary active transport (cotransport), powered by the Na⁺ gradient that the Na⁺/K⁺ pump makes', '继发性主动运输（协同运输），由钠钾泵形成的 Na⁺ 梯度驱动'], ['Simple diffusion of glucose', '葡萄糖的简单扩散'], ['Facilitated diffusion only', '仅仅是协助扩散'], ['Exocytosis', '胞吐']],
    'The cotransporter uses no ATP directly; it relies on the Na⁺ gradient maintained by the ATP-powered pump.', '协同转运蛋白本身不直接消耗 ATP，而是利用由耗 ATP 的钠钾泵维持的 Na⁺ 梯度。');
  Q('bio2', 4, 3, 'concept', 'Liver cells take in cholesterol-carrying LDL particles only after they bind to specific surface proteins. This is:', '肝细胞只有在 LDL 颗粒与特定表面蛋白结合后才将其摄入。这是：',
    [['Receptor-mediated endocytosis', '受体介导的胞吞'], ['Pinocytosis', '胞饮'], ['Exocytosis', '胞吐'], ['Osmosis', '渗透']],
    'Receptors concentrate specific molecules into coated pits that pinch off as vesicles; defective LDL receptors cause high blood cholesterol.', '受体把特定分子集中到被膜小窝，再内陷形成囊泡；LDL 受体缺陷会导致高胆固醇。');

  /* bio3 */
  Q('bio3', 2, 2, 'concept', 'During digestion, enzymes break starch into glucose. Which reaction is this?', '消化时，酶把淀粉分解为葡萄糖。这是哪种反应？',
    [['Hydrolysis — water is added to break bonds', '水解——加入水使化学键断裂'], ['Dehydration synthesis', '脱水缩合'], ['Photosynthesis', '光合作用'], ['Denaturation', '变性']],
    'Hydrolysis ("water-splitting") breaks polymers into monomers; dehydration synthesis builds them.', '水解把多聚体分解为单体；脱水缩合则把单体连接成多聚体。');
  Q('bio3', 3, 2, 'concept', 'Why is butter solid at room temperature while olive oil is liquid?', '为什么黄油在室温下是固体，而橄榄油是液体？',
    [['Butter has mostly saturated fatty acids (straight chains that pack tightly)', '黄油主要含饱和脂肪酸（直链，排列紧密）'], ['Olive oil has no fatty acids', '橄榄油不含脂肪酸'], ['Butter is a carbohydrate', '黄油是糖类'], ['Olive oil is saturated', '橄榄油是饱和的']],
    'Unsaturated fatty acids have C=C double bonds that kink the chains, so they cannot pack closely and stay liquid.', '不饱和脂肪酸含 C=C 双键使链弯折，无法紧密排列，因此呈液态。');
  Q('bio3', 7, 3, 'concept', 'A molecule contains a –COOH group and an –NH₂ group on the same carbon. It is most likely a(n):', '某分子同一个碳上连有 –COOH 和 –NH₂。它最可能是：',
    [['Amino acid', '氨基酸'], ['Monosaccharide', '单糖'], ['Fatty acid', '脂肪酸'], ['Nucleotide', '核苷酸']],
    'Amino acids have an amino group, a carboxyl group, an H and an R group around a central carbon.', '氨基酸的中心碳上连接氨基、羧基、一个氢原子和一个 R 基。');
  Q('bio3', 3, 3, 'concept', 'A scientist finds a polymer containing C, H, O, N and P. Which macromolecule is it?', '科学家发现一种含 C、H、O、N、P 的多聚体。它是哪类大分子？',
    [['Nucleic acid', '核酸'], ['Carbohydrate', '糖类'], ['Saturated fat', '饱和脂肪'], ['Steroid', '类固醇']],
    'Phosphorus (in the sugar–phosphate backbone) plus nitrogen (in bases) points to DNA or RNA; carbs and most lipids have only C, H, O.', '磷（糖-磷酸骨架）加上氮（碱基）指向 DNA 或 RNA；糖类和大多数脂质只含 C、H、O。');
  Q('bio3', 1, 1, 'vocab', 'Proteins are polymers made of which monomers?', '蛋白质是由哪种单体构成的多聚体？',
    [['Amino acids', '氨基酸'], ['Nucleotides', '核苷酸'], ['Monosaccharides', '单糖'], ['Glycerol', '甘油']],
    'Amino acids join by peptide bonds to form polypeptides.', '氨基酸通过肽键连接成多肽。');

  /* bio4 */
  Q('bio4', 6, 4, 'application', 'A chemical makes the thylakoid membrane leaky to H⁺. What happens in the light?', '某种化学物质使类囊体膜对 H⁺ 渗漏。在光照下会怎样？',
    [['Electron transport can continue, but ATP synthesis falls because the H⁺ gradient collapses', '电子传递仍可进行，但 H⁺ 梯度消失，ATP 合成减少'], ['More ATP is made', 'ATP 产量增加'], ['Water stops being split immediately', '水的分解立即停止'], ['The Calvin cycle speeds up', '卡尔文循环加快']],
    'ATP synthase depends on the proton gradient (chemiosmosis). An "uncoupler" separates electron flow from ATP production, so the Calvin cycle soon slows from lack of ATP.', 'ATP 合酶依赖质子梯度（化学渗透）。"解偶联剂"使电子传递与 ATP 合成脱节，卡尔文循环也会因缺少 ATP 而很快减慢。');
  Q('bio4', 7, 3, 'concept', 'What is the final electron acceptor of the light-dependent reactions?', '光反应的最终电子受体是什么？',
    [['NADP⁺', 'NADP⁺'], ['O₂', 'O₂'], ['Water', '水'], ['CO₂', 'CO₂']],
    'Electrons from PSI reduce NADP⁺ to NADPH. (O₂ is the final acceptor in cellular respiration, and it is produced — not used — in photosynthesis.)', 'PSI 的电子把 NADP⁺ 还原为 NADPH。（O₂ 是细胞呼吸的最终电子受体，在光合作用中是产物而非受体。）');
  Q('bio4', 0, 3, 'experiment', 'Plants are given water labeled with heavy oxygen (H₂¹⁸O). Where does the ¹⁸O appear?', '给植物提供用重氧标记的水（H₂¹⁸O）。¹⁸O 会出现在哪里？',
    [['In the O₂ released', '释放的 O₂ 中'], ['In the glucose made', '合成的葡萄糖中'], ['In CO₂ absorbed', '吸收的 CO₂ 中'], ['In chlorophyll', '叶绿素中']],
    'Isotope experiments (Ruben & Kamen) showed the O₂ comes from splitting water in photosystem II, not from CO₂.', '同位素实验（鲁宾和卡门）证明 O₂ 来自光系统 II 中水的分解，而不是 CO₂。');
  Q('bio4', 2, 3, 'concept', 'The Calvin cycle is called "light-independent," yet it stops soon after the lights are turned off. Why?', '卡尔文循环被称为"不依赖光"，但关灯后很快停止。为什么？',
    [['It needs the ATP and NADPH that only the light reactions supply', '它需要只有光反应才能提供的 ATP 和 NADPH'], ['Rubisco is destroyed by darkness', 'Rubisco 在黑暗中被破坏'], ['CO₂ disappears in the dark', '黑暗中 CO₂ 消失'], ['It happens in the thylakoid membrane', '它发生在类囊体膜上']],
    'The cycle does not use light directly, but it quickly runs out of ATP and NADPH without the light reactions.', '该循环不直接利用光，但没有光反应就会很快耗尽 ATP 和 NADPH。');
  Q('bio4', 5, 2, 'concept', 'Corn and sugarcane are C₄ plants. What advantage does this give in hot, sunny climates?', '玉米和甘蔗是 C₄ 植物。这在炎热晴朗的气候中有什么优势？',
    [['They concentrate CO₂ around rubisco, reducing photorespiration', '把 CO₂ 浓缩在 Rubisco 周围，减少光呼吸'], ['They do not need light', '不需要光'], ['They open stomata only at night', '只在夜间打开气孔'], ['They make no glucose', '不合成葡萄糖']],
    'PEP carboxylase fixes CO₂ in mesophyll cells and delivers it to bundle-sheath cells, so rubisco rarely grabs O₂ even with stomata partly closed.', 'PEP 羧化酶在叶肉细胞中固定 CO₂ 并运到维管束鞘细胞，即使气孔部分关闭，Rubisco 也很少结合 O₂。');

  /* bio5 */
  Q('bio5', 4, 2, 'concept', 'Where is the energy in ATP released when it is used by the cell?', '细胞利用 ATP 时，能量从哪里释放？',
    [['When the bond to the last phosphate is hydrolyzed (ATP → ADP + Pᵢ)', '水解末端磷酸键时（ATP → ADP + Pᵢ）'], ['When adenine is removed', '去掉腺嘌呤时'], ['When ribose is oxidized', '核糖被氧化时'], ['When ATP binds oxygen', 'ATP 与氧结合时']],
    'The three negatively charged phosphates repel each other; removing the terminal one releases usable energy.', '三个带负电的磷酸基团相互排斥，去掉末端那个会释放可利用的能量。');
  Q('bio5', 6, 3, 'calculation', 'If each NADH yields about 2.5 ATP and each FADH₂ about 1.5 ATP, how much ATP comes from the 2 FADH₂ made per glucose in the Krebs cycle?', '若每个 NADH 约产生 2.5 个 ATP，每个 FADH₂ 约 1.5 个，每分子葡萄糖在克雷布斯循环中产生的 2 个 FADH₂ 可得多少 ATP？',
    [['About 3 ATP', '约 3 个 ATP'], ['About 5 ATP', '约 5 个 ATP'], ['About 1.5 ATP', '约 1.5 个 ATP'], ['About 6 ATP', '约 6 个 ATP']],
    '2 × 1.5 = 3 ATP. FADH₂ enters the chain later than NADH, so fewer protons are pumped per molecule.', '2 × 1.5 = 3 个 ATP。FADH₂ 进入电子传递链的位置比 NADH 靠后，每分子泵出的质子更少。');
  Q('bio5', 0, 2, 'concept', 'What is the NET ATP yield of glycolysis per glucose?', '每分子葡萄糖经糖酵解的净 ATP 产量是多少？',
    [['2 ATP', '2 个 ATP'], ['4 ATP', '4 个 ATP'], ['36 ATP', '36 个 ATP'], ['0 ATP', '0 个 ATP']],
    'Glycolysis makes 4 ATP but uses 2 in the investment phase, so the net is 2 (plus 2 NADH).', '糖酵解产生 4 个 ATP，但投入阶段消耗 2 个，净得 2 个（外加 2 个 NADH）。');
  Q('bio5', 1, 1, 'vocab', 'In eukaryotes, the Krebs cycle takes place in the:', '在真核生物中，克雷布斯循环发生在：',
    [['Mitochondrial matrix', '线粒体基质'], ['Cytoplasm', '细胞质基质'], ['Thylakoid', '类囊体'], ['Nucleus', '细胞核']],
    'Pyruvate enters the mitochondrion; its oxidation and the Krebs cycle happen in the matrix.', '丙酮酸进入线粒体，其氧化和克雷布斯循环在基质中进行。');
  Q('bio5', 7, 3, 'data', 'Adding more substrate does NOT restore an enzyme\'s maximum rate after an inhibitor is added. The inhibitor is most likely:', '加入抑制剂后，增加底物也无法恢复酶的最大速率。该抑制剂最可能是：',
    [['Noncompetitive — it binds an allosteric site and changes the enzyme\'s shape', '非竞争性抑制剂——结合变构位点并改变酶的形状'], ['Competitive', '竞争性抑制剂'], ['A coenzyme', '辅酶'], ['More substrate', '更多底物']],
    'Noncompetitive inhibitors lower Vmax regardless of substrate concentration; competitive inhibition can be outcompeted.', '非竞争性抑制剂无论底物浓度多高都会降低 Vmax；竞争性抑制则可被更多底物克服。');

  /* bio6 */
  Q('bio6', 3, 1, 'concept', 'Which is NOT a purpose of mitosis?', '以下哪项不是有丝分裂的作用？',
    [['Making gametes for sexual reproduction', '产生用于有性生殖的配子'], ['Growth of an organism', '个体生长'], ['Repairing damaged tissue', '修复受损组织'], ['Asexual reproduction', '无性生殖']],
    'Gametes are made by meiosis; mitosis produces identical diploid cells for growth, repair and asexual reproduction.', '配子由减数分裂产生；有丝分裂产生相同的二倍体细胞，用于生长、修复和无性生殖。');
  Q('bio6', 5, 3, 'calculation', 'An organism has 2n = 8. Ignoring crossing over, how many different chromosome combinations can its gametes have from independent assortment?', '某生物 2n = 8。不考虑交叉互换，仅自由组合可产生多少种不同的配子染色体组合？',
    [['16', '16'], ['8', '8'], ['4', '4'], ['64', '64']],
    'n = 4 homologous pairs, each lining up 2 ways: 2⁴ = 16. (Humans: 2²³ ≈ 8.4 million.)', 'n = 4 对同源染色体，每对有 2 种排列方式：2⁴ = 16（人类为 2²³ ≈ 840 万）。');
  Q('bio6', 6, 2, 'calculation', 'A dog\'s skin cells have 78 chromosomes. How many are in its sperm cells?', '狗的皮肤细胞有 78 条染色体。它的精子中有多少条？',
    [['39', '39'], ['78', '78'], ['156', '156'], ['23', '23']],
    'Body cells are diploid (2n = 78); gametes are haploid (n = 39).', '体细胞为二倍体（2n = 78），配子为单倍体（n = 39）。');
  Q('bio6', 5, 2, 'concept', 'When does crossing over occur?', '交叉互换发生在什么时候？',
    [['Prophase I of meiosis, between homologous chromosomes', '减数第一次分裂前期，同源染色体之间'], ['Anaphase of mitosis', '有丝分裂后期'], ['Telophase II', '减数第二次分裂末期'], ['S phase of interphase', '间期 S 期']],
    'Homologs pair up (synapsis) in prophase I and exchange segments at chiasmata.', '减数第一次分裂前期同源染色体联会，并在交叉处交换片段。');
  Q('bio6', 7, 2, 'application', 'A karyotype of a female shows only one X chromosome (45, X). This condition is:', '某女性的核型只有一条 X 染色体（45, X）。这种情况是：',
    [['Turner syndrome', '特纳综合征'], ['Down syndrome', '唐氏综合征'], ['Klinefelter syndrome', '克氏综合征'], ['Cystic fibrosis', '囊性纤维化']],
    'Turner syndrome results from nondisjunction producing a gamete with no sex chromosome; Klinefelter is XXY; Down is trisomy 21; CF is a gene mutation.', '特纳综合征由不分离产生缺少性染色体的配子所致；克氏综合征为 XXY；唐氏为 21 三体；囊性纤维化是基因突变。');

  /* bio7 */
  Q('bio7', 1, 4, 'experiment', 'Meselson and Stahl grew bacteria in heavy ¹⁵N, then moved them to light ¹⁴N. After ONE round of replication, all DNA was intermediate density. Which model did this rule out?', '梅塞尔森和斯塔尔先在重 ¹⁵N 中培养细菌，再转到轻 ¹⁴N 中。复制一轮后，所有 DNA 都是中间密度。这排除了哪种模型？',
    [['Conservative replication', '全保留复制'], ['Semiconservative replication', '半保留复制'], ['Dispersive replication', '弥散复制'], ['None of them', '都没有排除']],
    'Conservative replication would give one heavy and one light band. After round two, a light band plus an intermediate band ruled out dispersive too, leaving semiconservative.', '全保留复制会出现一条重带和一条轻带。第二轮后出现轻带和中间带，又排除了弥散复制，只剩半保留复制。');
  Q('bio7', 2, 2, 'concept', 'During RNA processing in eukaryotes, which parts of the pre-mRNA are removed?', '真核生物 RNA 加工时，前体 mRNA 的哪些部分被剪掉？',
    [['Introns', '内含子'], ['Exons', '外显子'], ['The 5′ cap', '5′ 帽'], ['Codons', '密码子']],
    'Introns are spliced out and exons are joined; a 5′ cap and poly-A tail are added.', '内含子被剪切掉，外显子连接起来；同时加上 5′ 帽和 poly-A 尾。');
  Q('bio7', 4, 3, 'calculation', 'An mRNA codon is 5′-GCU-3′. What is the tRNA anticodon that pairs with it?', 'mRNA 密码子为 5′-GCU-3′。与之配对的 tRNA 反密码子是什么？',
    [['3′-CGA-5′', '3′-CGA-5′'], ['3′-GCU-5′', '3′-GCU-5′'], ['3′-CGT-5′', '3′-CGT-5′'], ['3′-UGC-5′', '3′-UGC-5′']],
    'Anticodons are complementary and antiparallel: G–C, C–G, U–A → 3′-CGA-5′ (RNA uses U, not T).', '反密码子与密码子互补且反向：G–C、C–G、U–A → 3′-CGA-5′（RNA 用 U 不用 T）。');
  Q('bio7', 5, 2, 'concept', 'A base substitution changes the codon GAA to GAG, but both code for glutamate. This is a:', '一个碱基替换把密码子 GAA 变成 GAG，但两者都编码谷氨酸。这是：',
    [['Silent mutation', '沉默突变'], ['Nonsense mutation', '无义突变'], ['Frameshift mutation', '移码突变'], ['Missense mutation', '错义突变']],
    'The genetic code is redundant, so some substitutions do not change the amino acid.', '遗传密码具有简并性，因此某些替换不会改变氨基酸。');
  Q('bio7', 6, 3, 'concept', 'The trp operon is called "repressible" because:', '色氨酸操纵子被称为"可阻遏型"，是因为：',
    [['When tryptophan is abundant, it activates the repressor and turns the genes OFF', '色氨酸充足时会激活阻遏蛋白，关闭基因'], ['Lactose turns the genes ON', '乳糖开启基因'], ['It is always off', '它总是关闭的'], ['It has no operator', '它没有操纵基因']],
    'The genes for making tryptophan are normally on; the end product (tryptophan) acts as a corepressor to switch them off — a form of feedback.', '合成色氨酸的基因通常是开启的；终产物色氨酸作为辅阻遏物把它们关闭——是一种反馈调节。');

  /* bio8 */
  Q('bio8', 5, 3, 'calculation', 'A colorblind man (XᵃY) and a carrier woman (XᴬXᵃ) have a daughter. What is the probability she is colorblind?', '色盲男性（XᵃY）与携带者女性（XᴬXᵃ）生了一个女儿。她是色盲的概率是多少？',
    [['1/2', '1/2'], ['1/4', '1/4'], ['0', '0'], ['1', '1']],
    'Daughters get Xᵃ from dad for sure and Xᴬ or Xᵃ from mom: XᴬXᵃ or XᵃXᵃ, each 1/2.', '女儿一定从父亲获得 Xᵃ，从母亲获得 Xᴬ 或 Xᵃ：XᴬXᵃ 或 XᵃXᵃ，各占 1/2。');
  Q('bio8', 1, 3, 'calculation', 'In an AaBb × AaBb cross, what fraction of offspring show BOTH dominant traits?', 'AaBb × AaBb 杂交，后代中两个显性性状都表现的比例是多少？',
    [['9/16', '9/16'], ['3/16', '3/16'], ['1/16', '1/16'], ['3/4', '3/4']],
    'P(dominant A) = 3/4 and P(dominant B) = 3/4; independent, so 3/4 × 3/4 = 9/16.', 'P(A 显性) = 3/4，P(B 显性) = 3/4；独立遗传，3/4 × 3/4 = 9/16。');
  Q('bio8', 6, 3, 'concept', 'In a pedigree, every affected person has at least one affected parent, and the trait appears in every generation in both sexes. The most likely pattern is:', '在系谱中，每个患者都至少有一个患病亲本，且该性状在每一代男女中都出现。最可能的遗传方式是：',
    [['Autosomal dominant', '常染色体显性'], ['Autosomal recessive', '常染色体隐性'], ['X-linked recessive', 'X 连锁隐性'], ['Y-linked', 'Y 连锁']],
    'Dominant traits do not skip generations and need only one copy; equal frequency in males and females suggests an autosome.', '显性性状不隔代，只需一个拷贝；男女比例相当说明位于常染色体。');
  Q('bio8', 4, 2, 'calculation', 'A type AB parent and a type O parent have children. Which blood types are possible?', 'AB 型和 O 型父母生育子女，子女可能是哪些血型？',
    [['A or B only', '只有 A 型或 B 型'], ['AB or O only', '只有 AB 型或 O 型'], ['A, B, AB or O', 'A、B、AB 或 O 型'], ['O only', '只有 O 型']],
    'IᴬIᴮ × ii → Iᴬi (type A) or Iᴮi (type B), each 1/2.', 'IᴬIᴮ × ii → Iᴬi（A 型）或 Iᴮi（B 型），各占 1/2。');
  Q('bio8', 7, 3, 'calculation', 'Two Aa parents have a child. What is the probability the child is NOT aa?', '两个 Aa 父母生一个孩子。孩子不是 aa 的概率是多少？',
    [['3/4', '3/4'], ['1/4', '1/4'], ['1/2', '1/2'], ['2/3', '2/3']],
    'Use the complement or the sum rule: P(AA) + P(Aa) = 1/4 + 1/2 = 3/4 = 1 − P(aa).', '用补集或加法法则：P(AA) + P(Aa) = 1/4 + 1/2 = 3/4 = 1 − P(aa)。');

  /* bio9 */
  Q('bio9', 0, 2, 'concept', 'A bodybuilder\'s large muscles are not passed to their children. This contradicts:', '健美运动员发达的肌肉不会遗传给孩子。这与哪种观点相矛盾？',
    [['Lamarck\'s inheritance of acquired characteristics', '拉马克的获得性遗传'], ['Darwin\'s natural selection', '达尔文的自然选择'], ['Mendel\'s laws', '孟德尔定律'], ['Hardy–Weinberg equilibrium', '哈迪-温伯格平衡']],
    'Traits acquired during a lifetime do not change the DNA in gametes, so they are not inherited.', '一生中获得的性状不会改变配子中的 DNA，因此不会遗传。');
  Q('bio9', 1, 2, 'concept', 'Which is NOT required for natural selection to occur?', '以下哪项不是自然选择发生的必要条件？',
    [['Organisms trying to change to fit their environment', '生物努力改变自己以适应环境'], ['Variation among individuals', '个体之间存在变异'], ['Heritable traits', '性状可以遗传'], ['More offspring than can survive', '后代数量多于能存活的数量']],
    'Natural selection acts on existing random variation; individuals do not change on purpose.', '自然选择作用于已有的随机变异，个体不会有意改变自己。');
  Q('bio9', 7, 2, 'application', 'Male peacocks with larger, brighter tails attract more mates, even though the tails make them easier for predators to catch. This is:', '尾羽更大更鲜艳的雄孔雀能吸引更多配偶，尽管尾羽使它们更容易被捕食。这是：',
    [['Sexual selection', '性选择'], ['Artificial selection', '人工选择'], ['Genetic drift', '遗传漂变'], ['Stabilizing selection', '稳定选择']],
    'Traits that increase mating success can spread even if they lower survival.', '提高交配成功率的性状即使降低存活率也可能扩散。');
  Q('bio9', 7, 3, 'concept', 'In evolutionary terms, which individual has the HIGHEST fitness?', '从进化角度看，哪个个体的适合度最高？',
    [['A small fish that leaves 30 surviving, fertile offspring', '留下 30 个存活且可育后代的小鱼'], ['The largest fish, which leaves 5 offspring', '留下 5 个后代的最大的鱼'], ['A fish that lives the longest but never reproduces', '寿命最长但从不繁殖的鱼'], ['The fastest swimmer, with 10 sterile offspring', '游得最快、但有 10 个不育后代的鱼']],
    'Fitness is reproductive success — how many genes reach the next generation through fertile offspring.', '适合度指繁殖成功率——通过可育后代传递到下一代的基因数量。');
  Q('bio9', 3, 3, 'concept', 'Which situation would cause a population to deviate from Hardy–Weinberg equilibrium?', '哪种情况会使种群偏离哈迪-温伯格平衡？',
    [['Individuals choose mates with similar traits', '个体选择性状相似的配偶'], ['The population is very large', '种群很大'], ['There is no migration', '没有迁移'], ['There is no mutation', '没有突变']],
    'Nonrandom mating violates one of the five conditions (no mutation, random mating, no selection, large size, no gene flow).', '非随机交配违反了五个条件之一（无突变、随机交配、无选择、种群大、无基因流）。');

  /* bio10 */
  Q('bio10', 0, 2, 'calculation', 'Producers in a food chain store 50,000 kJ. About how much energy reaches the secondary consumers?', '某食物链中生产者储存 50,000 kJ。到达次级消费者的能量大约是多少？',
    [['500 kJ', '500 kJ'], ['5,000 kJ', '5,000 kJ'], ['50 kJ', '50 kJ'], ['25,000 kJ', '25,000 kJ']],
    '10% rule: 50,000 → 5,000 (primary consumers) → 500 (secondary consumers).', '10% 定律：50,000 → 5,000（初级消费者）→ 500（次级消费者）。');
  Q('bio10', 6, 3, 'concept', 'One oak tree supports thousands of caterpillars. Which ecological pyramid would appear inverted?', '一棵橡树养活数千条毛虫。哪种生态金字塔会呈倒置？',
    [['The pyramid of numbers', '数量金字塔'], ['The pyramid of energy', '能量金字塔'], ['Both energy and biomass', '能量和生物量金字塔'], ['None — pyramids can never be inverted', '都不会——金字塔不可能倒置']],
    'Many herbivores on one producer flips the numbers pyramid; the energy pyramid can never be inverted.', '一个生产者上有大量植食动物，使数量金字塔倒置；能量金字塔永远不会倒置。');
  Q('bio10', 2, 2, 'concept', 'Which process removes CO₂ from the atmosphere?', '哪个过程能从大气中移除 CO₂？',
    [['Photosynthesis', '光合作用'], ['Cellular respiration', '细胞呼吸'], ['Burning fossil fuels', '燃烧化石燃料'], ['Decomposition', '分解作用']],
    'Producers fix CO₂ into sugars; respiration, decomposition and combustion release it.', '生产者把 CO₂ 固定为糖；呼吸、分解和燃烧则释放 CO₂。');
  Q('bio10', 4, 3, 'concept', 'Two species of barnacles compete for the same rock zone, and one is eliminated. This illustrates:', '两种藤壶争夺同一片岩石区域，其中一种被淘汰。这说明了：',
    [['The competitive exclusion principle', '竞争排斥原理'], ['Mutualism', '互利共生'], ['Commensalism', '偏利共生'], ['Primary succession', '初生演替']],
    'Two species cannot share exactly the same niche indefinitely; one outcompetes the other or they partition resources (Connell\'s barnacle study).', '两个物种不能长期占据完全相同的生态位，要么一方胜出，要么分化资源（康奈尔的藤壶研究）。');
  Q('bio10', 7, 2, 'application', 'Building a strip of forest that connects two separated nature reserves mainly helps by:', '在两个被分隔的自然保护区之间建一条森林带，主要好处是：',
    [['Letting animals move between them, keeping populations larger and gene flow open', '让动物可以往来，维持较大种群并保持基因流动'], ['Increasing hunting opportunities', '增加狩猎机会'], ['Stopping all predation', '阻止一切捕食'], ['Raising the carrying capacity of cities', '提高城市的承载力']],
    'Wildlife corridors reduce the effects of habitat fragmentation, such as inbreeding and genetic drift in small isolated populations.', '生态廊道可减轻栖息地破碎化的影响，例如小型隔离种群的近亲繁殖和遗传漂变。');

  /* =================== PRE-CALCULUS =================== */
  /* pc1 */
  Q('pc1', 3, 2, 'calculation', 'Is f(x) = x⁴ − 3x² + 2 even, odd, or neither?', 'f(x) = x⁴ − 3x² + 2 是偶函数、奇函数还是都不是？',
    [['Even', '偶函数'], ['Odd', '奇函数'], ['Neither', '都不是'], ['Both', '既奇又偶']],
    'f(−x) = (−x)⁴ − 3(−x)² + 2 = f(x). Only even powers (and constants) appear, so it is even.', 'f(−x) = (−x)⁴ − 3(−x)² + 2 = f(x)。只含偶次幂（和常数），所以是偶函数。');
  Q('pc1', 0, 2, 'calculation', 'What is the domain of f(x) = 1/(x² − 9)?', 'f(x) = 1/(x² − 9) 的定义域是什么？',
    [['All real numbers except x = 3 and x = −3', '除 x = 3 和 x = −3 以外的全体实数'], ['x > 3', 'x > 3'], ['All real numbers except x = 9', '除 x = 9 以外的全体实数'], ['x ≥ −3', 'x ≥ −3']],
    'The denominator x² − 9 = (x − 3)(x + 3) cannot be zero.', '分母 x² − 9 = (x − 3)(x + 3) 不能为零。');
  Q('pc1', 5, 3, 'application', 'Revenue is R(p) = −5p² + 200p dollars, where p is the price. What price maximizes revenue, and what is the maximum?', '收入 R(p) = −5p² + 200p（美元），p 为价格。什么价格使收入最大？最大收入是多少？',
    [['p = $20, R = $2000', 'p = 20 美元，R = 2000 美元'], ['p = $40, R = $0', 'p = 40 美元，R = 0'], ['p = $10, R = $1500', 'p = 10 美元，R = 1500 美元'], ['p = $20, R = $4000', 'p = 20 美元，R = 4000 美元']],
    'Vertex at p = −b/(2a) = −200/(−10) = 20; R(20) = −5(400) + 4000 = 2000.', '顶点 p = −b/(2a) = −200/(−10) = 20；R(20) = −5(400) + 4000 = 2000。');
  Q('pc1', 4, 3, 'concept', 'Why does f(x) = x² (all real x) NOT have an inverse function, and how can it be fixed?', '为什么 f(x) = x²（全体实数）没有反函数？怎样修正？',
    [['It fails the horizontal line test; restrict the domain to x ≥ 0', '它不通过水平线检验；把定义域限制为 x ≥ 0'], ['It fails the vertical line test; it is not a function', '它不通过垂直线检验，不是函数'], ['Its range is all reals', '它的值域是全体实数'], ['It has no fix', '无法修正']],
    'f(2) = f(−2) = 4, so it is not one-to-one. On x ≥ 0 its inverse is √x.', 'f(2) = f(−2) = 4，不是一一对应。限制在 x ≥ 0 时反函数为 √x。');
  Q('pc1', 1, 3, 'concept', 'h(x) = √(3x + 1). Which pair gives h(x) = f(g(x))?', 'h(x) = √(3x + 1)。哪组函数满足 h(x) = f(g(x))？',
    [['f(x) = √x, g(x) = 3x + 1', 'f(x) = √x，g(x) = 3x + 1'], ['f(x) = 3x + 1, g(x) = √x', 'f(x) = 3x + 1，g(x) = √x'], ['f(x) = 3x, g(x) = √(x + 1)', 'f(x) = 3x，g(x) = √(x + 1)'], ['f(x) = x + 1, g(x) = √(3x)', 'f(x) = x + 1，g(x) = √(3x)']],
    'The inner function g is applied first (3x + 1), then the outer f (square root).', '内层函数 g 先作用（3x + 1），再由外层 f 开平方。');

  /* pc2 */
  Q('pc2', 4, 3, 'calculation', 'What are the x-intercepts of f(x) = (x² − 4)/(x + 1)?', 'f(x) = (x² − 4)/(x + 1) 的 x 截距是什么？',
    [['x = 2 and x = −2', 'x = 2 和 x = −2'], ['x = −1', 'x = −1'], ['x = 4', 'x = 4'], ['None', '没有']],
    'x-intercepts are zeros of the numerator that are not also zeros of the denominator: x² − 4 = 0 → ±2. (x = −1 is a vertical asymptote.)', 'x 截距是分子的零点（且不是分母的零点）：x² − 4 = 0 → ±2（x = −1 为竖直渐近线）。');
  Q('pc2', 6, 4, 'calculation', 'A polynomial with real coefficients has zeros 3 and 2i. What is the lowest-degree such polynomial with leading coefficient 1?', '某实系数多项式有零点 3 和 2i。首项系数为 1 的最低次多项式是什么？',
    [['(x − 3)(x² + 4)', '(x − 3)(x² + 4)'], ['(x − 3)(x − 2i)', '(x − 3)(x − 2i)'], ['(x − 3)(x² − 4)', '(x − 3)(x² − 4)'], ['(x + 3)(x² + 4)', '(x + 3)(x² + 4)']],
    'Complex zeros come in conjugate pairs, so −2i is also a zero: (x − 2i)(x + 2i) = x² + 4. Degree 3.', '复数零点成共轭对出现，所以 −2i 也是零点：(x − 2i)(x + 2i) = x² + 4，次数为 3。');
  Q('pc2', 7, 2, 'calculation', 'Where is the hole in f(x) = (x² + x − 6)/(x − 2)?', 'f(x) = (x² + x − 6)/(x − 2) 的洞在哪里？',
    [['(2, 5)', '(2, 5)'], ['(2, 0)', '(2, 0)'], ['(−3, 0)', '(−3, 0)'], ['There is no hole', '没有洞']],
    'x² + x − 6 = (x + 3)(x − 2). Cancel (x − 2): y = x + 3, so the hole is at x = 2, y = 5.', 'x² + x − 6 = (x + 3)(x − 2)，约去 (x − 2) 得 y = x + 3，洞在 x = 2，y = 5。');
  Q('pc2', 0, 2, 'concept', 'f(x) = 3x⁴ − x³ + 5. As x → −∞, f(x) → ?', 'f(x) = 3x⁴ − x³ + 5。当 x → −∞ 时，f(x) → ？',
    [['+∞', '+∞'], ['−∞', '−∞'], ['0', '0'], ['5', '5']],
    'Leading term 3x⁴: even degree and positive coefficient, so both ends rise.', '首项 3x⁴：偶次且系数为正，两端都上升。');
  Q('pc2', 5, 3, 'calculation', 'Solve x/(x − 1) = 1/(x − 1) + 2.', '解方程 x/(x − 1) = 1/(x − 1) + 2。',
    [['No solution (x = 1 is extraneous)', '无解（x = 1 是增根）'], ['x = 1', 'x = 1'], ['x = 2', 'x = 2'], ['x = −1', 'x = −1']],
    'Multiply by (x − 1): x = 1 + 2(x − 1) → x = 2x − 1 → x = 1, which makes the denominator zero, so it is rejected.', '两边乘以 (x − 1)：x = 1 + 2(x − 1) → x = 1，但它使分母为零，应舍去。');

  /* pc3 */
  Q('pc3', 0, 2, 'application', 'A town of 12,000 grows 3% per year. Which function models the population after t years?', '一个 12,000 人的城镇每年增长 3%。哪个函数表示 t 年后的人口？',
    [['P(t) = 12000(1.03)ᵗ', 'P(t) = 12000(1.03)ᵗ'], ['P(t) = 12000(0.03)ᵗ', 'P(t) = 12000(0.03)ᵗ'], ['P(t) = 12000 + 0.03t', 'P(t) = 12000 + 0.03t'], ['P(t) = 12000(3)ᵗ', 'P(t) = 12000(3)ᵗ']],
    'Growth by r per period multiplies by (1 + r) each period: b = 1.03.', '每期增长率为 r，就是每期乘以 (1 + r)：b = 1.03。');
  Q('pc3', 5, 3, 'calculation', 'Solve e^(2x) = 7.', '解方程 e^(2x) = 7。',
    [['x = (ln 7)/2 ≈ 0.973', 'x = (ln 7)/2 ≈ 0.973'], ['x = ln 3.5', 'x = ln 3.5'], ['x = 7/(2e)', 'x = 7/(2e)'], ['x = 2 ln 7', 'x = 2 ln 7']],
    'Take ln of both sides: 2x = ln 7, so x = ln 7 / 2 ≈ 1.946/2 ≈ 0.973.', '两边取自然对数：2x = ln 7，x = ln 7 / 2 ≈ 0.973。');
  Q('pc3', 6, 2, 'calculation', 'An earthquake of magnitude 6 has about how many times the wave amplitude of a magnitude 4 earthquake?', '6 级地震的振幅大约是 4 级地震的多少倍？',
    [['100 times', '100 倍'], ['2 times', '2 倍'], ['20 times', '20 倍'], ['1.5 times', '1.5 倍']],
    'The Richter scale is base-10 logarithmic: a difference of 2 means 10² = 100 times the amplitude.', '里氏震级是以 10 为底的对数刻度：相差 2 级即振幅相差 10² = 100 倍。');
  Q('pc3', 1, 3, 'calculation', 'Write 2 log x + log 5 − log 3 as a single logarithm.', '把 2 log x + log 5 − log 3 写成一个对数。',
    [['log(5x²/3)', 'log(5x²/3)'], ['log(10x/3)', 'log(10x/3)'], ['log(5x² − 3)', 'log(5x² − 3)'], ['2 log(5x/3)', '2 log(5x/3)']],
    'Power rule: 2 log x = log x²; product: + log 5 → log 5x²; quotient: − log 3 → log(5x²/3).', '幂法则：2 log x = log x²；乘法：加 log 5 → log 5x²；除法：减 log 3 → log(5x²/3)。');
  Q('pc3', 3, 4, 'calculation', 'With continuous compounding at 5% per year, about how long does it take money to double?', '年利率 5% 连续复利，资金翻倍大约需要多久？',
    [['About 13.9 years', '约 13.9 年'], ['20 years', '20 年'], ['About 14.2 years', '约 14.2 年'], ['10 years', '10 年']],
    '2P = Pe^(0.05t) → t = ln 2 / 0.05 ≈ 0.693/0.05 ≈ 13.9 years. (Annual compounding: ln 2/ln 1.05 ≈ 14.2.)', '2P = Pe^(0.05t) → t = ln 2 / 0.05 ≈ 13.9 年（按年复利为 ln 2/ln 1.05 ≈ 14.2 年）。');

  /* pc4 */
  Q('pc4', 1, 1, 'calculation', 'Convert 135° to radians.', '把 135° 化为弧度。',
    [['3π/4', '3π/4'], ['2π/3', '2π/3'], ['5π/6', '5π/6'], ['3π/2', '3π/2']],
    '135 × π/180 = 3π/4.', '135 × π/180 = 3π/4。');
  Q('pc4', 2, 3, 'calculation', 'What is the period of y = cos(πx)?', 'y = cos(πx) 的周期是多少？',
    [['2', '2'], ['π', 'π'], ['2π', '2π'], ['1/2', '1/2']],
    'Period = 2π/|b| = 2π/π = 2.', '周期 = 2π/|b| = 2π/π = 2。');
  Q('pc4', 3, 2, 'calculation', 'A sinusoid has a maximum of 9 and a minimum of 1. What are its amplitude and midline?', '某正弦曲线最大值为 9，最小值为 1。振幅和中线是多少？',
    [['Amplitude 4, midline y = 5', '振幅 4，中线 y = 5'], ['Amplitude 8, midline y = 5', '振幅 8，中线 y = 5'], ['Amplitude 4, midline y = 4', '振幅 4，中线 y = 4'], ['Amplitude 5, midline y = 4', '振幅 5，中线 y = 4']],
    'Amplitude = (9 − 1)/2 = 4; midline y = (9 + 1)/2 = 5.', '振幅 = (9 − 1)/2 = 4；中线 y = (9 + 1)/2 = 5。');
  Q('pc4', 7, 2, 'calculation', 'cot(π/6) = ?', 'cot(π/6) = ？',
    [['√3', '√3'], ['1/√3', '1/√3'], ['2', '2'], ['1/2', '1/2']],
    'cot = cos/sin = (√3/2)/(1/2) = √3.', 'cot = cos/sin = (√3/2)/(1/2) = √3。');
  Q('pc4', 0, 2, 'calculation', 'sin(5π/4) = ?', 'sin(5π/4) = ？',
    [['−√2/2', '−√2/2'], ['√2/2', '√2/2'], ['−1/2', '−1/2'], ['−√3/2', '−√3/2']],
    '5π/4 is in QIII with reference angle π/4; sine is negative in QIII.', '5π/4 在第三象限，参考角 π/4；第三象限正弦为负。');

  /* pc5 */
  Q('pc5', 0, 2, 'calculation', 'Simplify sec²θ − tan²θ.', '化简 sec²θ − tan²θ。',
    [['1', '1'], ['0', '0'], ['sin²θ', 'sin²θ'], ['2 sec²θ', '2 sec²θ']],
    'From 1 + tan²θ = sec²θ, sec²θ − tan²θ = 1.', '由 1 + tan²θ = sec²θ 得 sec²θ − tan²θ = 1。');
  Q('pc5', 3, 3, 'calculation', 'In triangle ABC, a = 10, A = 30°, b = 12. Find sin B.', '在三角形 ABC 中，a = 10，A = 30°，b = 12。求 sin B。',
    [['0.6', '0.6'], ['0.5', '0.5'], ['0.83', '0.83'], ['1.2', '1.2']],
    'Law of Sines: sin B = b·sin A / a = 12 × 0.5 / 10 = 0.6. (Since a < b, check the ambiguous case: B ≈ 36.9° or 143.1°.)', '正弦定理：sin B = b·sin A / a = 12 × 0.5 / 10 = 0.6（因为 a < b，需检查歧义情形：B ≈ 36.9° 或 143.1°）。');
  Q('pc5', 7, 3, 'concept', 'To verify (1 − sin²x)/cos x = cos x, which first step is best?', '要证明 (1 − sin²x)/cos x = cos x，最好的第一步是什么？',
    [['Replace 1 − sin²x with cos²x', '把 1 − sin²x 换成 cos²x'], ['Multiply both sides by cos x', '两边同乘 cos x'], ['Square both sides', '两边平方'], ['Replace cos x with sin x', '把 cos x 换成 sin x']],
    'Work on one side only: cos²x / cos x = cos x. Operating on both sides (multiplying, squaring) does not prove an identity.', '只变形一边：cos²x / cos x = cos x。对两边同时运算（相乘、平方）不能证明恒等式。');
  Q('pc5', 2, 3, 'calculation', 'If sin θ = 1/3, what is cos 2θ?', '若 sin θ = 1/3，cos 2θ 等于多少？',
    [['7/9', '7/9'], ['2/3', '2/3'], ['1/9', '1/9'], ['8/9', '8/9']],
    'cos 2θ = 1 − 2sin²θ = 1 − 2/9 = 7/9 — no need to find cos θ.', 'cos 2θ = 1 − 2sin²θ = 1 − 2/9 = 7/9，不需要求 cos θ。');
  Q('pc5', 1, 3, 'calculation', 'Solve 2cos²x − 1 = 0 on [0, 2π).', '在 [0, 2π) 上解 2cos²x − 1 = 0。',
    [['x = π/4, 3π/4, 5π/4, 7π/4', 'x = π/4、3π/4、5π/4、7π/4'], ['x = π/4 only', '只有 x = π/4'], ['x = π/4, 7π/4', 'x = π/4、7π/4'], ['x = π/3, 5π/3', 'x = π/3、5π/3']],
    'cos²x = 1/2 → cos x = ±√2/2, which happens in all four quadrants at reference angle π/4.', 'cos²x = 1/2 → cos x = ±√2/2，在四个象限中参考角为 π/4 处都成立。');

  /* pc6 */
  Q('pc6', 1, 2, 'calculation', 'A vector has magnitude 10 and direction angle 30°. What is its component form?', '某向量大小为 10，方向角为 30°。其分量形式是什么？',
    [['⟨5√3, 5⟩', '⟨5√3, 5⟩'], ['⟨5, 5√3⟩', '⟨5, 5√3⟩'], ['⟨10, 30⟩', '⟨10, 30⟩'], ['⟨8.66, 8.66⟩', '⟨8.66, 8.66⟩']],
    '⟨10 cos 30°, 10 sin 30°⟩ = ⟨5√3, 5⟩ ≈ ⟨8.66, 5⟩.', '⟨10 cos 30°, 10 sin 30°⟩ = ⟨5√3, 5⟩ ≈ ⟨8.66, 5⟩。');
  Q('pc6', 6, 3, 'application', 'A boat heads due east at 12 mph across a river whose current flows due south at 5 mph. What is its actual speed?', '一艘船以 12 mph 向正东行驶横渡河流，水流以 5 mph 向正南流动。船的实际速度是多少？',
    [['13 mph', '13 mph'], ['17 mph', '17 mph'], ['7 mph', '7 mph'], ['√119 mph', '√119 mph']],
    'Resultant ⟨12, −5⟩ has magnitude √(144 + 25) = 13 mph.', '合速度 ⟨12, −5⟩ 的大小为 √(144 + 25) = 13 mph。');
  Q('pc6', 7, 3, 'concept', 'How many petals does the rose curve r = 4 sin(3θ) have?', '玫瑰线 r = 4 sin(3θ) 有几个花瓣？',
    [['3', '3'], ['6', '6'], ['4', '4'], ['12', '12']],
    'For r = a sin(nθ): n odd → n petals, n even → 2n petals. Here n = 3.', '对于 r = a sin(nθ)：n 为奇数时 n 瓣，偶数时 2n 瓣。这里 n = 3。');
  Q('pc6', 0, 2, 'calculation', 'What is the direction angle of v = ⟨−3, 3⟩?', 'v = ⟨−3, 3⟩ 的方向角是多少？',
    [['135°', '135°'], ['45°', '45°'], ['−45°', '−45°'], ['225°', '225°']],
    'tan θ = 3/(−3) = −1. The vector points into QII, so θ = 180° − 45° = 135°.', 'tan θ = 3/(−3) = −1。向量指向第二象限，所以 θ = 180° − 45° = 135°。');
  Q('pc6', 3, 3, 'calculation', 'Convert the rectangular point (−1, −√3) to polar form with r > 0 and 0 ≤ θ < 2π.', '把直角坐标点 (−1, −√3) 化为极坐标（r > 0，0 ≤ θ < 2π）。',
    [['(2, 4π/3)', '(2, 4π/3)'], ['(2, π/3)', '(2, π/3)'], ['(4, 4π/3)', '(4, 4π/3)'], ['(2, 5π/3)', '(2, 5π/3)']],
    'r = √(1 + 3) = 2. Reference angle π/3 (tan = √3), point in QIII → θ = π + π/3 = 4π/3.', 'r = √(1 + 3) = 2。参考角 π/3（tan = √3），点在第三象限 → θ = π + π/3 = 4π/3。');

  /* pc7 */
  Q('pc7', 6, 2, 'concept', 'Which is a valid elementary row operation?', '以下哪项是合法的初等行变换？',
    [['Replace R₂ with R₂ − 3R₁', '用 R₂ − 3R₁ 替换 R₂'], ['Multiply a row by 0', '把某行乘以 0'], ['Add a number to one entry only', '只给一个元素加一个数'], ['Square every entry of a row', '把某行每个元素平方']],
    'Allowed: swap rows, multiply a row by a NONZERO constant, add a multiple of one row to another.', '允许的操作：交换两行、某行乘以非零常数、某行加上另一行的倍数。');
  Q('pc7', 7, 3, 'application', 'A chemist mixes a 10% solution and a 30% solution to make 20 L of a 25% solution. How many liters of the 30% solution are needed?', '化学家把 10% 和 30% 的溶液混合成 20 L 浓度 25% 的溶液。需要多少升 30% 的溶液？',
    [['15 L', '15 L'], ['5 L', '5 L'], ['10 L', '10 L'], ['12 L', '12 L']],
    'x + y = 20 and 0.10x + 0.30y = 5. Then 0.10(20 − y) + 0.30y = 5 → 2 + 0.2y = 5 → y = 15.', 'x + y = 20，0.10x + 0.30y = 5。代入得 0.10(20 − y) + 0.30y = 5 → 2 + 0.2y = 5 → y = 15。');
  Q('pc7', 3, 2, 'concept', 'The coefficient matrix of a 2×2 system has determinant 0. What can you conclude?', '某 2×2 方程组的系数矩阵行列式为 0。可以得出什么结论？',
    [['The system has either no solution or infinitely many', '方程组要么无解，要么有无穷多解'], ['The system has exactly one solution', '方程组恰有一个解'], ['The solution is (0, 0)', '解为 (0, 0)'], ['The matrix has an inverse', '矩阵可逆']],
    'det = 0 means the lines are parallel or identical, so there is no unique solution and no inverse.', '行列式为 0 说明两直线平行或重合，没有唯一解，矩阵也不可逆。');
  Q('pc7', 0, 2, 'calculation', 'Solve y = 2x − 1 and 3x + y = 9.', '解方程组 y = 2x − 1 与 3x + y = 9。',
    [['(2, 3)', '(2, 3)'], ['(3, 5)', '(3, 5)'], ['(1, 1)', '(1, 1)'], ['(2, 5)', '(2, 5)']],
    'Substitute: 3x + 2x − 1 = 9 → 5x = 10 → x = 2, y = 3.', '代入：3x + 2x − 1 = 9 → 5x = 10 → x = 2，y = 3。');
  Q('pc7', 2, 3, 'calculation', 'Solve AX = B where A = [[1, 2], [3, 4]] and B = [[5], [6]].', '解 AX = B，其中 A = [[1, 2], [3, 4]]，B = [[5], [6]]。',
    [['X = [[−4], [4.5]]', 'X = [[−4], [4.5]]'], ['X = [[4], [−4.5]]', 'X = [[4], [−4.5]]'], ['X = [[1], [2]]', 'X = [[1], [2]]'], ['X = [[5], [1.5]]', 'X = [[5], [1.5]]']],
    'det A = 4 − 6 = −2; A⁻¹ = (1/−2)[[4, −2], [−3, 1]]. X = A⁻¹B = (1/−2)[[20 − 12], [−15 + 6]] = [[−4], [4.5]]. Check: −4 + 9 = 5 ✓, −12 + 18 = 6 ✓.', 'det A = 4 − 6 = −2；A⁻¹ = (1/−2)[[4, −2], [−3, 1]]。X = A⁻¹B = [[−4], [4.5]]。检验：−4 + 9 = 5 ✓，−12 + 18 = 6 ✓。');

  /* pc8 */
  Q('pc8', 0, 1, 'calculation', 'Find the 20th term of the arithmetic sequence 7, 11, 15, …', '求等差数列 7, 11, 15, … 的第 20 项。',
    [['83', '83'], ['87', '87'], ['80', '80'], ['76', '76']],
    'a₂₀ = 7 + 19 × 4 = 83.', 'a₂₀ = 7 + 19 × 4 = 83。');
  Q('pc8', 1, 2, 'calculation', 'Find the sum of the first 6 terms of 3, 6, 12, 24, …', '求 3, 6, 12, 24, … 前 6 项之和。',
    [['189', '189'], ['96', '96'], ['192', '192'], ['93', '93']],
    'S₆ = 3(1 − 2⁶)/(1 − 2) = 3 × 63 = 189.', 'S₆ = 3(1 − 2⁶)/(1 − 2) = 3 × 63 = 189。');
  Q('pc8', 2, 2, 'calculation', 'Find the sum of 9 − 3 + 1 − 1/3 + …', '求 9 − 3 + 1 − 1/3 + … 的和。',
    [['27/4', '27/4'], ['27/2', '27/2'], ['6', '6'], ['It diverges', '发散']],
    'r = −1/3, |r| < 1: S = 9/(1 + 1/3) = 9/(4/3) = 27/4.', 'r = −1/3，|r| < 1：S = 9/(1 + 1/3) = 27/4。');
  Q('pc8', 7, 3, 'application', 'A car worth $24,000 loses 15% of its value each year. What is it worth after 3 years?', '一辆价值 24,000 美元的车每年贬值 15%。3 年后价值多少？',
    [['About $14,739', '约 14,739 美元'], ['$13,200', '13,200 美元'], ['About $20,400', '约 20,400 美元'], ['$10,800', '10,800 美元']],
    'Geometric with r = 0.85: 24000 × 0.85³ = 24000 × 0.614125 ≈ $14,739. (Subtracting 15% of the original each year would wrongly give $13,200.)', '公比 r = 0.85 的等比数列：24000 × 0.85³ ≈ 14,739 美元（每年都减去原价的 15% 会错误地得到 13,200）。');
  Q('pc8', 3, 2, 'calculation', 'How many terms are in Σₖ₌₃¹² (k²)?', 'Σₖ₌₃¹² (k²) 共有多少项？',
    [['10', '10'], ['12', '12'], ['9', '9'], ['11', '11']],
    'Number of terms = upper − lower + 1 = 12 − 3 + 1 = 10.', '项数 = 上限 − 下限 + 1 = 12 − 3 + 1 = 10。');

  /* pc9 */
  Q('pc9', 1, 3, 'calculation', 'Find the focus of the parabola x² = 12y.', '求抛物线 x² = 12y 的焦点。',
    [['(0, 3)', '(0, 3)'], ['(3, 0)', '(3, 0)'], ['(0, 12)', '(0, 12)'], ['(0, −3)', '(0, −3)']],
    'x² = 4py with 4p = 12 → p = 3. It opens up, so the focus is (0, 3) and the directrix is y = −3.', 'x² = 4py，4p = 12 → p = 3。开口向上，焦点 (0, 3)，准线 y = −3。');
  Q('pc9', 5, 3, 'calculation', 'Classify 2x² + 3xy + y² − 5 = 0 using the discriminant.', '用判别式判断 2x² + 3xy + y² − 5 = 0 的类型。',
    [['Hyperbola', '双曲线'], ['Ellipse', '椭圆'], ['Parabola', '抛物线'], ['Circle', '圆']],
    'B² − 4AC = 9 − 8 = 1 > 0 → hyperbola.', 'B² − 4AC = 9 − 8 = 1 > 0 → 双曲线。');
  Q('pc9', 6, 3, 'application', 'A planet\'s elliptical orbit has a = 10 AU and c = 2 AU, with the Sun at a focus. What is its closest distance to the Sun?', '某行星椭圆轨道 a = 10 AU，c = 2 AU，太阳位于焦点。它离太阳最近的距离是多少？',
    [['8 AU', '8 AU'], ['12 AU', '12 AU'], ['10 AU', '10 AU'], ['2 AU', '2 AU']],
    'Perihelion = a − c = 8 AU; aphelion = a + c = 12 AU.', '近日点距离 = a − c = 8 AU；远日点距离 = a + c = 12 AU。');
  Q('pc9', 7, 2, 'application', 'In an elliptical "whispering gallery," a whisper at one point can be heard clearly across the room at one specific point. Where are these two points?', '在椭圆形"回音廊"中，在某点的低语能在房间另一侧的某个特定点清楚听到。这两个点在哪里？',
    [['At the two foci', '在两个焦点处'], ['At the two ends of the minor axis', '在短轴两端'], ['At the center and one vertex', '在中心和一个顶点'], ['Anywhere on the ellipse', '椭圆上任意位置']],
    'Sound from one focus reflects off the ellipse and converges at the other focus.', '从一个焦点发出的声音经椭圆反射后汇聚到另一个焦点。');
  Q('pc9', 2, 3, 'calculation', 'Find the foci of x²/25 + y²/9 = 1.', '求 x²/25 + y²/9 = 1 的焦点。',
    [['(±4, 0)', '(±4, 0)'], ['(0, ±4)', '(0, ±4)'], ['(±5, 0)', '(±5, 0)'], ['(±√34, 0)', '(±√34, 0)']],
    'a² = 25 (horizontal major axis), b² = 9, c² = 25 − 9 = 16 → c = 4: foci (±4, 0).', 'a² = 25（长轴水平），b² = 9，c² = 25 − 9 = 16 → c = 4：焦点 (±4, 0)。');
  Q('pc9', 3, 2, 'calculation', 'What are the vertices of y²/16 − x²/4 = 1?', 'y²/16 − x²/4 = 1 的顶点是什么？',
    [['(0, ±4)', '(0, ±4)'], ['(±4, 0)', '(±4, 0)'], ['(0, ±2)', '(0, ±2)'], ['(±2, 0)', '(±2, 0)']],
    'The y² term is positive, so it opens up/down with a = 4: vertices (0, ±4).', 'y² 项为正，开口向上下，a = 4：顶点 (0, ±4)。');
})();
