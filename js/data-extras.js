/* FRQ + Drawing questions (bilingual) — type: 'frq' has rubric self-check; type: 'draw' has canvas + reference */
window.FRQ = {

  geo: [
    {
      t: 'frq', unit: 'geo2', tp: 1, svg: pyramidSvg(0),
      q: { en: 'The diagram below shows a population pyramid of Country A. (a) Identify the shape of the pyramid and describe TWO characteristics of the population. (b) Explain ONE social and ONE economic consequence of the age structure you described.', zh: '下图为 A 国的人口金字塔。(a) 指出金字塔的形状并描述该人口的两个特征。(b) 解释这种年龄结构带来的一个社会后果和一个经济后果。' },
      points: [
        { label: { en: 'Shape', zh: '形状' }, model: { en: 'Wide base, pyramid shape → expanding/young population (Stage 2).', zh: '底宽的金字塔形 → 扩张型、年轻人口（第二阶段）。' } },
        { label: { en: 'Characteristic 1', zh: '特征 1' }, model: { en: 'High birth rate (wide base); many children relative to elderly.', zh: '高出生率（底宽）；儿童远多于老人。' } },
        { label: { en: 'Characteristic 2', zh: '特征 2' }, model: { en: 'Low life expectancy / few people reach old age (narrow top).', zh: '预期寿命较短（顶尖窄），老年人口少。' } },
        { label: { en: 'Social consequence', zh: '社会后果' }, model: { en: 'Need for more schools/teachers; rapid urbanization pressure.', zh: '需要更多学校和教师；城市化压力大。' } },
        { label: { en: 'Economic consequence', zh: '经济后果' }, model: { en: 'High dependency ratio; strain on food supply and jobs; low GDP per capita.', zh: '抚养比高；粮食和就业压力大；人均 GDP 低。' } }
      ]
    },
    {
      t: 'frq', unit: 'geo2', tp: 5,
      q: { en: 'A large number of people move from rural Mexico to the United States every year. (a) Identify the type of migration (internal vs international; voluntary vs forced). (b) Give ONE push factor from Mexico and ONE pull factor of the US. (c) Explain ONE effect of this migration on the receiving country.', zh: '每年有大量人口从墨西哥农村迁移到美国。(a) 判断迁移类型（国内/国际；自愿/被迫）。(b) 各举一个墨西哥的推力因素和美国的拉力因素。(c) 解释这种迁移对接收国的一个影响。' },
      points: [
        { label: { en: 'Type', zh: '类型' }, model: { en: 'International + voluntary migration.', zh: '国际迁移 + 自愿迁移。' } },
        { label: { en: 'Push factor', zh: '推力因素' }, model: { en: 'Push: poverty, lack of land/jobs, poor services in rural Mexico.', zh: '推力：墨西哥农村贫困、缺乏土地/就业、公共服务差。' } },
        { label: { en: 'Pull factor', zh: '拉力因素' }, model: { en: 'Pull: higher wages, jobs, family already in the US.', zh: '拉力：工资更高、就业机会多、亲友已在美国。' } },
        { label: { en: 'Effect', zh: '效果' }, model: { en: 'Receiving country: cheap labor supply; also strain on services in border states.', zh: '接收国：廉价劳动力增加；边境州公共服务承压。' } }
      ]
    }
  ],

  bio: [
    {
      t: 'frq', unit: 'bio7', tp: 4,
      q: { en: 'A cell needs to make a protein with the amino acid sequence Met–Lys–Phe. (a) Write the mRNA codons for this sequence. (b) Describe TWO differences between DNA replication and transcription. (c) Where does each process happen in a eukaryotic cell?', zh: '某细胞要合成序列为 Met–Lys–Phe 的蛋白质。(a) 写出对应的 mRNA 密码子。(b) 描述 DNA 复制与转录的两个区别。(c) 两个过程在真核细胞的哪里进行？' },
      points: [
        { label: { en: 'Codons', zh: '密码子' }, model: { en: 'AUG–AAA/K–UUU (Met=AUG, Lys=AAA/AAG, Phe=UUU/UUC).', zh: 'AUG–AAA–UUU（Met=AUG，Lys=AAA/AAG，Phe=UUU/UUC）。' } },
        { label: { en: 'Difference 1', zh: '区别 1' }, model: { en: 'Replication copies the WHOLE genome; transcription copies one gene into mRNA.', zh: '复制拷贝整个基因组；转录只把一个基因转录成 mRNA。' } },
        { label: { en: 'Difference 2', zh: '区别 2' }, model: { en: 'Replication uses DNA polymerase; transcription uses RNA polymerase.', zh: '复制用 DNA 聚合酶；转录用 RNA 聚合酶。' } },
        { label: { en: 'Location', zh: '位置' }, model: { en: 'Replication: nucleus (interphase). Transcription: nucleus; translation on ribosomes.', zh: '复制：细胞核（分裂间期）。转录：细胞核；翻译在核糖体。' } }
      ]
    },
    {
      t: 'frq', unit: 'bio8', tp: 1,
      q: { en: 'In a population of beetles, green color is dominant to brown. Birds hunt by sight and prefer green beetles. (a) Explain how natural selection changes allele frequencies here. (b) State TWO conditions of Hardy–Weinberg equilibrium that this population violates. (c) Predict the frequency trend of the brown allele.', zh: '某甲虫种群中，绿色对褐色为显性。鸟类靠视觉捕食，偏好绿色甲虫。(a) 解释自然选择如何改变基因频率。(b) 指出该种群违反的两个哈迪-温伯格平衡条件。(c) 预测褐色等位基因频率的趋势。' },
      points: [
        { label: { en: 'Selection', zh: '选择' }, model: { en: 'Green beetles are eaten more → fewer green alleles passed on; brown beetles survive and reproduce more → their allele frequency rises.', zh: '绿色甲虫被吃掉更多 → 绿色等位基因传给后代更少；褐色甲虫存活繁殖更多 → 其基因频率上升。' } },
        { label: { en: 'H–W violation 1', zh: '违反条件 1' }, model: { en: 'Natural selection is acting on the population.', zh: '自然选择正在起作用。' } },
        { label: { en: 'H–W violation 2', zh: '违反条件 2' }, model: { en: 'The population is (likely) small / not randomly mating — either counts.', zh: '种群可能很小或非随机交配——任答其一。' } },
        { label: { en: 'Trend', zh: '趋势' }, model: { en: 'The brown (recessive) allele frequency increases over generations.', zh: '褐色（隐性）等位基因频率逐代上升。' } }
      ]
    }
  ],

  precalc: [
    {
      t: 'frq', unit: 'pc1', tp: 2,
      q: { en: 'Given f(x) = x² and g(x) = 3(x + 2)² − 5: (a) Describe the sequence of transformations that turn f into g. (b) State the vertex of g. (c) Does g open up or down? How do you know from the equation?', zh: '已知 f(x) = x² 和 g(x) = 3(x + 2)² − 5：(a) 描述从 f 到 g 的变换顺序。(b) 写出 g 的顶点。(c) g 开口向上还是向下？如何从方程判断？' },
      points: [
        { label: { en: 'Transformations', zh: '变换' }, model: { en: 'Shift left 2 → vertical stretch ×3 → shift down 5.', zh: '左移 2 → 纵向拉伸 ×3 → 下移 5。' } },
        { label: { en: 'Vertex', zh: '顶点' }, model: { en: 'Vertex: (−2, −5) (from the vertex form).', zh: '顶点：(−2, −5)（由顶点式得出）。' } },
        { label: { en: 'Direction', zh: '方向' }, model: { en: 'Opens UP because the coefficient of the squared term (+3) is positive.', zh: '开口向上，因为平方项系数 +3 为正。' } }
      ]
    },
    {
      t: 'frq', unit: 'pc1', tp: 5,
      q: { en: 'A person throws a ball upward from a 5 m cliff with an initial vertical speed of 20 m/s. Its height is h(t) = 5 + 20t − 5t² (meters, seconds). (a) What type of function is h(t)? (b) Find the maximum height and when it happens. (c) After how many seconds does the ball hit the ground (h = 0)? Round to one decimal.', zh: '某人从 5 米高的悬崖向上抛球，初速 20 m/s。高度 h(t) = 5 + 20t − 5t²（米，秒）。(a) h(t) 是什么类型的函数？(b) 求最大高度及出现时间。(c) 球何时落地（h = 0）？保留一位小数。' },
      points: [
        { label: { en: 'Type', zh: '类型' }, model: { en: 'Quadratic (degree 2), opening downward.', zh: '二次函数（二阶），开口向下。' } },
        { label: { en: 'Maximum', zh: '最大值' }, model: { en: 't = −b/2a = −20/(2·−5) = 2 s; h(2) = 5 + 40 − 20 = 25 m.', zh: 't = −b/2a = −20/(2·−5) = 2 秒；h(2) = 5 + 40 − 20 = 25 米。' } },
        { label: { en: 'Ground', zh: '落地' }, model: { en: '5 + 20t − 5t² = 0 → t² − 4t − 1 = 0 → t = 2 ± √5; positive root ≈ 4.2 s.', zh: '5 + 20t − 5t² = 0 → t² − 4t − 1 = 0 → t = 2 ± √5；正根 ≈ 4.2 秒。' } }
      ]
    }
  ]
};

window.DRAW = {

  geo: [
    {
      t: 'draw', unit: 'geo2', tp: 1,
      q: { en: 'Draw a population pyramid of a country in Stage 5 of the Demographic Transition Model. Label the male and female sides.', zh: '画一个处于第五阶段（人口负增长）国家的人口金字塔，并标出男女两侧。' },
      refSvg: '<svg viewBox="0 0 320 300" xmlns="http://www.w3.org/2000/svg" role="img" style="max-width:420px;margin:0 auto 16px"><text x="80" y="20" text-anchor="middle" font-size="12" fill="#6f6d66">M 男</text><text x="240" y="20" text-anchor="middle" font-size="12" fill="#6f6d66">F 女</text>' +
        [[5.2,4.9],[6.4,6.0],[7.6,7.1],[8.6,8.1],[9.4,8.9],[9.8,9.3],[9.2,8.6],[7.4,6.8]].map(function (d, i) {
          var y = 40 + i * 30, wl = d[0] / 10 * 130, wr = d[1] / 10 * 130;
          return '<rect x="' + (160 - wl) + '" y="' + y + '" width="' + wl + '" height="26" fill="#5d7699" rx="2"/>' +
            '<rect x="160" y="' + y + '" width="' + wr + '" height="26" fill="#5d7699" opacity="0.7" rx="2"/>' +
            '<text x="164" y="' + (y + 17) + '" font-size="10" fill="#6f6d66">' + ['0-9','10-19','20-29','30-39','40-49','50-59','60-69','70+'][i] + '</text>';
        }).join('') + '</svg>',
      rubric: { en: 'Narrow base (few births), wider middle, bulge near the top; M on one side, F on the other; roughly symmetric.', zh: '底部窄（少出生）、中部较宽、顶部鼓；左右分别标 M 和 F；两侧大致对称。' }
    },
    {
      t: 'draw', unit: 'geo5', tp: 2,
      q: { en: 'Draw von Thünen\'s land-use rings around a city market. Label each ring with its activity.', zh: '围绕城市市场画出冯·杜能的土地利用圈层，并在每个圈层标注其活动。' },
      rubric: { en: 'From the market out: 1 dairy/intensive farming; 2 forestry; 3 grain crops; 4 ranching. Concentric rings.', zh: '从市场向外：1 乳业/集约农业；2 林业；3 谷物；4 放牧。同心圆圈层。' }
    }
  ],

  bio: [
    {
      t: 'draw', unit: 'bio6', tp: 0,
      q: { en: 'Draw a cell in METAPHASE of mitosis. Include and label: spindle fibers, chromosomes at the equator, and the two centrosomes.', zh: '画出有丝分裂中期细胞，包含并标注：纺锤丝、位于赤道板的染色体、两个中心体。' },
      rubric: { en: 'Chromosomes lined up single-file on the equator; spindle fibers from both centrosomes to each chromosome; two centrosomes on opposite poles; nuclear membrane already gone.', zh: '染色体单列排在赤道板；纺锤丝从两极中心体连向每条染色体；两个中心体位于两极；核膜已消失。' }
    },
    {
      t: 'draw', unit: 'bio7', tp: 0,
      q: { en: 'Draw and label a nucleotide of DNA: phosphate, sugar (deoxyribose), and the nitrogen base. Then show hydrogen bonds pairing A–T.', zh: '画一个 DNA 核苷酸并标注：磷酸、脱氧核糖、含氮碱基。再画出 A–T 配对的氢键。' },
      rubric: { en: 'Phosphate → sugar → base connected in that order; A pairs with T (2 H-bonds); if G or C shown, 3 H-bonds.', zh: '磷酸 → 五碳糖 → 碱基按顺序连接；A 与 T 配对（2 个氢键）；若画 G–C 则 3 个氢键。' }
    }
  ],

  precalc: [
    {
      t: 'draw', unit: 'pc1', tp: 2,
      q: { en: 'Draw the graph of y = |x| − 3. Show the vertex and the x-intercepts.', zh: '画出 y = |x| − 3 的图像，标出顶点和 x 轴截距。' },
      rubric: { en: 'V-shape with vertex at (0, −3); x-intercepts at x = −3 and x = 3; opens upward.', zh: 'V 字形，顶点 (0, −3)；x 轴截距 x = −3 和 x = 3；开口向上。' }
    },
    {
      t: 'draw', unit: 'pc4', tp: 3,
      q: { en: 'Draw ONE full period of y = 2sin(x) starting at x = 0. Mark the amplitude and the period on your graph.', zh: '从 x = 0 开始画 y = 2sin(x) 一个完整周期的图像，并标出振幅和周期。' },
      rubric: { en: 'Wave starts at (0,0), rises to max 2 at x = π/2, back through 0 at π, min −2 at 3π/2, returns to 0 at 2π. Amplitude 2, period 2π labeled.', zh: '从 (0,0) 出发，在 x = π/2 达最大值 2，在 π 回到 0，在 3π/2 达最小值 −2，在 2π 回到 0。标注振幅 2、周期 2π。' }
    }
  ]
};
