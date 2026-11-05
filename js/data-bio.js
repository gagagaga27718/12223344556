/* Honors Biology — 10 units, bilingual question bank */
window.SUBJECT_BIO = {
  id: "bio",
  color: "bio",
  name: { en: "Honors Biology", zh: "荣誉生物" },
  tagline: { en: "Cells, genetics, evolution, and how life works", zh: "细胞、遗传、进化与生命的运行机制" },
  units: [
    {
      id: "bio1",
      name: { en: "Unit 1 · Cell Structure & Function", zh: "第1单元 · 细胞结构与功能" },
      topics: [
        { en: "Prokaryote vs eukaryote cells", zh: "原核细胞 vs 真核细胞" },
        { en: "Organelles & their jobs", zh: "细胞器及其功能" },
        { en: "Plant vs animal cells", zh: "植物细胞 vs 动物细胞" },
        { en: "Structure fits function", zh: "结构与功能的统一" },
        { en: "Cell theory", zh: "细胞学说" },
        { en: "Endosymbiotic theory", zh: "内共生学说" },
        { en: "Nucleus, ribosomes, ER, Golgi", zh: "细胞核、核糖体、内质网、高尔基体" },
        { en: "Lysosomes & vacuoles", zh: "溶酶体与液泡" }
      ],
      questions: [
        {
          t: "vocab",
          q: { en: "Which structure is found in prokaryotic cells?", zh: "原核细胞中存在哪种结构？" },
          o: [
            { en: "Ribosome", zh: "核糖体" },
            { en: "Nucleus", zh: "细胞核" },
            { en: "Mitochondrion", zh: "线粒体" },
            { en: "Chloroplast", zh: "叶绿体" }
          ],
          a: 0,
          e: { en: "Prokaryotes (bacteria) have ribosomes and DNA but no membrane-bound organelles — no nucleus, mitochondria, or chloroplasts.", zh: "原核生物（细菌）有核糖体和DNA，但没有膜包细胞器——没有细胞核、线粒体或叶绿体。" }
        },
        {
          t: "vocab",
          q: { en: "Which organelle modifies, sorts, and packages proteins for secretion?", zh: "哪种细胞器负责修饰、分拣并包装分泌蛋白？" },
          o: [
            { en: "Golgi apparatus", zh: "高尔基体" },
            { en: "Ribosome", zh: "核糖体" },
            { en: "Lysosome", zh: "溶酶体" },
            { en: "Nucleolus", zh: "核仁" }
          ],
          a: 0,
          e: { en: "The Golgi is the cell's shipping center: proteins from the rough ER are modified, tagged, and shipped out in vesicles.", zh: "高尔基体是细胞的物流中心：来自粗面内质网的蛋白在这里被修饰、标记并装入囊泡运出。" }
        },
        {
          t: "application",
          q: { en: "A pancreas cell that secretes large amounts of digestive enzymes would be rich in:", zh: "大量分泌消化酶的胰腺细胞会富含：" },
          o: [
            { en: "Rough ER and Golgi apparatus", zh: "粗面内质网和高尔基体" },
            { en: "Lysosomes and vacuoles", zh: "溶酶体和液泡" },
            { en: "Smooth ER only", zh: "只有滑面内质网" },
            { en: "Chloroplasts", zh: "叶绿体" }
          ],
          a: 0,
          e: { en: "Secreted proteins are made on ribosomes of the rough ER → packaged by the Golgi → released by exocytosis. High secretion = lots of rough ER + Golgi.", zh: "分泌蛋白在粗面内质网的核糖体上合成 → 高尔基体包装 → 胞吐释放。分泌旺盛 = 大量粗面内质网 + 高尔基体。" }
        },
        {
          t: "vocab",
          q: { en: "Which pair of structures is found ONLY in plant cells?", zh: "哪组结构只存在于植物细胞中？" },
          o: [
            { en: "Chloroplast and central vacuole", zh: "叶绿体和中央液泡" },
            { en: "Mitochondrion and nucleus", zh: "线粒体和细胞核" },
            { en: "Ribosome and ER", zh: "核糖体和内质网" },
            { en: "Cell membrane and cytoplasm", zh: "细胞膜和细胞质" }
          ],
          a: 0,
          e: { en: "Plant-only: chloroplasts, central vacuole, and cell wall (fungi have cell walls but no chloroplasts). Animal cells have centrioles, which most plants lack.", zh: "植物特有：叶绿体、中央液泡、细胞壁（真菌有细胞壁但无叶绿体）。动物细胞有中心体，多数植物没有。" }
        },
        {
          t: "concept",
          q: { en: "Which statement is NOT part of the cell theory?", zh: "以下哪项不属于细胞学说？" },
          o: [
            { en: "All cells must contain chloroplasts", zh: "所有细胞必须含有叶绿体" },
            { en: "All living things are made of cells", zh: "一切生物都由细胞组成" },
            { en: "The cell is the basic unit of life", zh: "细胞是生命的基本单位" },
            { en: "Cells come from pre-existing cells", zh: "细胞来自既有细胞" }
          ],
          a: 0,
          e: { en: "Cell theory: (1) all life is made of cells, (2) the cell is the basic unit, (3) cells arise from other cells (Schleiden, Schwann, Virchow).", zh: "细胞学说：(1) 一切生物由细胞组成，(2) 细胞是基本单位，(3) 细胞来自既有细胞（施莱登、施旺、魏尔肖）。" }
        },
        {
          t: "concept",
          q: { en: "What is the main evidence supporting the endosymbiotic theory for mitochondria and chloroplasts?", zh: "支持线粒体和叶绿体内共生学说的主要证据是什么？" },
          o: [
            { en: "They have their own circular DNA and ribosomes similar to bacteria", zh: "它们有自己的环状DNA和类似细菌的核糖体" },
            { en: "They are green like bacteria", zh: "它们像细菌一样是绿色的" },
            { en: "They cannot make proteins", zh: "它们不能合成蛋白质" },
            { en: "They are found only in prokaryotes", zh: "它们只存在于原核生物中" }
          ],
          a: 0,
          e: { en: "Mitochondria and chloroplasts have their own DNA (circular, like bacteria), their own ribosomes, and divide by fission — evidence they were once free-living bacteria engulfed by a host cell.", zh: "线粒体和叶绿体有自己的DNA（环状，像细菌）、自己的核糖体，并以分裂方式增殖——证明它们曾是独立生活的细菌，被宿主细胞吞噬。" }
        },
        {
          t: "vocab",
          q: { en: "Which organelle is the site of aerobic cellular respiration?", zh: "有氧呼吸发生在哪种细胞器中？" },
          o: [
            { en: "Mitochondrion", zh: "线粒体" },
            { en: "Ribosome", zh: "核糖体" },
            { en: "Chloroplast", zh: "叶绿体" },
            { en: "Golgi apparatus", zh: "高尔基体" }
          ],
          a: 0,
          e: { en: "Glycolysis happens in the cytoplasm, but the Krebs cycle and electron transport chain (most ATP) occur in mitochondria.", zh: "糖酵解在细胞质中进行，但三羧酸循环和电子传递链（产生大部分ATP）在线粒体中进行。" }
        },
        {
          t: "concept",
          q: { en: "The folds (cristae) of the inner mitochondrial membrane exist to:", zh: "线粒体内膜的褶皱（嵴）的作用是：" },
          o: [
            { en: "Increase surface area for ATP synthesis", zh: "增大表面积以合成更多ATP" },
            { en: "Store water", zh: "储存水分" },
            { en: "Protect DNA", zh: "保护DNA" },
            { en: "Make the organelle rigid", zh: "使细胞器保持坚硬" }
          ],
          a: 0,
          e: { en: "More cristae = more embedded electron transport proteins and ATP synthase = more ATP per mitochondrion — a classic structure-fits-function example.", zh: "嵴越多 = 嵌入的电子传递蛋白和ATP合酶越多 = 每个线粒体产ATP越多——结构与功能统一的经典例子。" }
        }
      ]
    },
    {
      id: "bio2",
      name: { en: "Unit 2 · Membranes & Transport", zh: "第2单元 · 细胞膜与物质运输" },
      topics: [
        { en: "Fluid mosaic model", zh: "流动镶嵌模型" },
        { en: "Simple vs facilitated diffusion", zh: "简单扩散 vs 协助扩散" },
        { en: "Osmosis & tonicity", zh: "渗透与溶液张力" },
        { en: "Active transport & pumps", zh: "主动运输与泵" },
        { en: "Endocytosis & exocytosis", zh: "胞吞与胞吐" },
        { en: "Surface-area-to-volume ratio", zh: "表面积与体积比" },
        { en: "Plant cell water balance", zh: "植物细胞的水分平衡" },
        { en: "Hypotonic / isotonic / hypertonic", zh: "低渗 / 等渗 / 高渗" }
      ],
      questions: [
        {
          t: "vocab",
          q: { en: "The movement of water across a semipermeable membrane from low solute to high solute concentration is:", zh: "水分子穿过半透膜从低溶质向高溶质浓度方向的移动称为：" },
          o: [
            { en: "Osmosis", zh: "渗透（osmosis）" },
            { en: "Active transport", zh: "主动运输" },
            { en: "Facilitated diffusion of ions", zh: "离子协助扩散" },
            { en: "Exocytosis", zh: "胞吐" }
          ],
          a: 0,
          e: { en: "Osmosis is passive — water follows solutes. It explains why cells swell in fresh water and shrink in salt water.", zh: "渗透是被动过程——水随溶质走。这解释了细胞在淡水中膨胀、在盐水中皱缩。" }
        },
        {
          t: "application",
          q: { en: "A red blood cell placed in distilled water will:", zh: "放入蒸馏水的红细胞会：" },
          o: [
            { en: "Swell and possibly burst (lyse)", zh: "膨胀并可能胀破（溶血）" },
            { en: "Shrink and crenate", zh: "皱缩" },
            { en: "Stay exactly the same", zh: "完全不变" },
            { en: "Actively pump water out", zh: "主动把水泵出" }
          ],
          a: 0,
          e: { en: "Distilled water is hypotonic: water rushes INTO the cell (osmosis), and RBCs (no cell wall) burst. Plant cells in the same situation become turgid (firm), protected by the wall.", zh: "蒸馏水是低渗液：水涌入细胞（渗透），红细胞（无细胞壁）胀破。同样情况下植物细胞因有细胞壁而保持膨胀硬挺。" }
        },
        {
          t: "concept",
          q: { en: "Which process requires ATP?", zh: "以下哪个过程需要ATP？" },
          o: [
            { en: "Sodium-potassium pump moving ions against their gradients", zh: "逆浓度梯度转运离子的钠钾泵" },
            { en: "Oxygen diffusing into a cell", zh: "氧气扩散进入细胞" },
            { en: "Water moving into a salty solution", zh: "水流向高盐溶液" },
            { en: "Glucose entering cells via transporter", zh: "葡萄糖经转运蛋白进入细胞" }
          ],
          a: 0,
          e: { en: "Diffusion, osmosis, and facilitated diffusion are all passive (down the gradient, no ATP). The Na⁺/K⁺ pump moves ions UP their gradients — active transport, ~1/3 of a cell's ATP budget.", zh: "扩散、渗透和协助扩散都是被动的（顺梯度，不耗ATP）。钠钾泵逆梯度泵送离子——主动运输，消耗细胞约1/3的ATP。" }
        },
        {
          t: "vocab",
          q: { en: "A cell engulfs a bacterium by wrapping its membrane around it. This is:", zh: "细胞用膜包裹吞入细菌。这是：" },
          o: [
            { en: "Phagocytosis (endocytosis)", zh: "吞噬作用（胞吞）" },
            { en: "Exocytosis", zh: "胞吐" },
            { en: "Pinocytosis of fluid", zh: "吞饮液体（胞饮）" },
            { en: "Active transport via pump", zh: "泵主动运输" }
          ],
          a: 0,
          e: { en: "Phagocytosis (\"cell eating\") of solids; pinocytosis (\"cell drinking\") of fluid; receptor-mediated endocytosis targets specific ligands (like LDL cholesterol uptake).", zh: "吞噬作用吞固体，胞饮吞液体，受体介导的胞吞针对特定配体（如LDL胆固醇摄取）。" }
        },
        {
          t: "concept",
          q: { en: "Which factor limits how large a cell can grow?", zh: "什么因素限制了细胞长大的上限？" },
          o: [
            { en: "Surface-area-to-volume ratio — the membrane can't supply a too-large volume", zh: "表面积与体积比——膜无法满足过大的体积需求" },
            { en: "The nucleus can duplicate indefinitely", zh: "细胞核可以无限复制" },
            { en: "Cells stop making proteins at large size", zh: "细胞变大后停止合成蛋白质" },
            { en: "Gravity", zh: "重力" }
          ],
          a: 0,
          e: { en: "As a cell grows, volume grows faster than surface area. Beyond a point, diffusion can't deliver O₂/nutrients or remove waste fast enough → the cell divides.", zh: "细胞长大时体积增长快于表面积。超过一定限度，扩散无法及时供氧供营养、排废物 → 细胞分裂。" }
        },
        {
          t: "application",
          q: { en: "A plant cell in a hypertonic salt solution will undergo:", zh: "处于高渗盐溶液中的植物细胞会发生：" },
          o: [
            { en: "Plasmolysis — membrane pulls away from the wall as water exits", zh: "质壁分离——水流出，膜离开细胞壁" },
            { en: "Turgor pressure increase", zh: "膨压升高" },
            { en: "Bursting", zh: "胀破" },
            { en: "Nothing", zh: "无变化" }
          ],
          a: 0,
          e: { en: "Hypertonic outside → water exits → protoplast shrinks and pulls from the wall (plasmolysis) → wilted plant. This is why over-fertilizing \"burns\" plants.", zh: "外界高渗 → 水外流 → 原生质收缩脱离细胞壁（质壁分离）→ 植物萎蔫。这就是施肥过多会“烧”坏植物的原因。" }
        },
        {
          t: "concept",
          q: { en: "Why do hospitals use 0.9% saline (isotonic) IV drips instead of pure water?", zh: "医院为什么用0.9%生理盐水（等渗）输液而不用纯水？" },
          o: [
            { en: "Isotonic fluid prevents blood cells from swelling or shrinking", zh: "等渗液防止血细胞膨胀或皱缩" },
            { en: "Pure water kills all bacteria", zh: "纯水杀灭所有细菌" },
            { en: "Salt water is cheaper to make", zh: "盐水更便宜" },
            { en: "Water cannot cross membranes", zh: "水不能穿过细胞膜" }
          ],
          a: 0,
          e: { en: "Tonicity matching keeps cells at stable volume. Hypotonic drip → hemolysis; hypertonic → crenation. \"Isotonic = same solute concentration as the cell.\"", zh: "渗透压匹配使细胞体积稳定。低渗输液 → 溶血；高渗 → 皱缩。等渗 = 与细胞溶质浓度相同。" }
        },
        {
          t: "concept",
          q: { en: "Glucose is too large to cross the membrane through the phospholipid bilayer directly. How does it enter most cells?", zh: "葡萄糖太大，不能直接穿过磷脂双层。它如何进入大多数细胞？" },
          o: [
            { en: "Through glucose transporter proteins (facilitated diffusion)", zh: "通过葡萄糖转运蛋白（协助扩散）" },
            { en: "Through osmosis", zh: "通过渗透" },
            { en: "By simple diffusion", zh: "通过简单扩散" },
            { en: "It cannot ever enter cells", zh: "它永远无法进入细胞" }
          ],
          a: 0,
          e: { en: "Facilitated diffusion: channel/carrier proteins give polar or large molecules a passageway — still passive (down gradient, no ATP).", zh: "协助扩散：通道/载体蛋白为极性大分子提供通道——依然是被动运输（顺梯度，不耗ATP）。" }
        }
      ]
    },
    {
      id: "bio3",
      name: { en: "Unit 3 · Biochemistry & Macromolecules", zh: "第3单元 · 生物化学与大分子" },
      topics: [
        { en: "Properties of water", zh: "水的特性" },
        { en: "Monomers & polymers", zh: "单体与聚合物" },
        { en: "Dehydration synthesis & hydrolysis", zh: "脱水合成与水解" },
        { en: "Carbohydrates, lipids, proteins, nucleic acids", zh: "糖类、脂质、蛋白质、核酸" },
        { en: "Enzymes & activation energy", zh: "酶与活化能" },
        { en: "pH, acids & bases", zh: "pH、酸与碱" },
        { en: "Protein structure levels", zh: "蛋白质的结构层次" },
        { en: "Carbon chemistry", zh: "碳化学" }
      ],
      questions: [
        {
          t: "vocab",
          q: { en: "Which correctly matches monomer to polymer?", zh: "哪组单体与聚合物对应正确？" },
          o: [
            { en: "Amino acid → protein", zh: "氨基酸 → 蛋白质" },
            { en: "Glucose → lipid", zh: "葡萄糖 → 脂质" },
            { en: "Nucleotide → starch", zh: "核苷酸 → 淀粉" },
            { en: "Fatty acid → DNA", zh: "脂肪酸 → DNA" }
          ],
          a: 0,
          e: { en: "Monomer→polymer: glucose→starch/glycogen, amino acid→polypeptide, nucleotide→DNA/RNA, fatty acid+glycerol→triglyceride.", zh: "单体→聚合物：葡萄糖→淀粉/糖原，氨基酸→多肽，核苷酸→DNA/RNA，脂肪酸+甘油→甘油三酯。" }
        },
        {
          t: "concept",
          q: { en: "Joining two monomers into a dimer requires:", zh: "把两个单体连接成二聚体需要：" },
          o: [
            { en: "A dehydration synthesis (removing H₂O)", zh: "脱水合成（去除一分子水）" },
            { en: "Adding water", zh: "加入水" },
            { en: "Breaking a peptide bond", zh: "断开肽键" },
            { en: "Boiling the monomers", zh: "煮沸单体" }
          ],
          a: 0,
          e: { en: "Dehydration synthesis builds polymers by removing H from one monomer and OH from the other (releasing water). Hydrolysis is the reverse — adding water to break bonds (digestion).", zh: "脱水合成通过从一个单体去H、另一个去OH（释放水）来构建聚合物。水解相反——加水断键（消化过程）。" }
        },
        {
          t: "concept",
          q: { en: "Enzymes speed up reactions by:", zh: "酶通过什么方式加速反应？" },
          o: [
            { en: "Lowering the activation energy", zh: "降低活化能" },
            { en: "Raising the temperature", zh: "升高温度" },
            { en: "Adding energy to the products", zh: "给产物增加能量" },
            { en: "Changing the equilibrium", zh: "改变化学平衡" }
          ],
          a: 0,
          e: { en: "Enzymes are catalysts: they lower the activation energy by stabilizing the transition state. They do NOT change ΔG or the equilibrium — they only accelerate it, and are unchanged by the reaction.", zh: "酶是催化剂：通过稳定过渡态降低活化能。它们不改变ΔG和化学平衡——只加速反应，且自身不被消耗。" }
        },
        {
          t: "application",
          q: { en: "Human enzymes in the stomach work best at pH 2, but the same enzymes stop working in the small intestine (pH 8). Why?", zh: "人的胃蛋白酶在pH 2时活性最佳，但到pH 8的小肠中就失活。为什么？" },
          o: [
            { en: "The pH change denatures the enzyme, altering its active site shape", zh: "pH变化使酶变性，改变了活性中心形状" },
            { en: "The enzyme is used up", zh: "酶被消耗完了" },
            { en: "Substrate concentration is too high", zh: "底物浓度太高" },
            { en: "Enzymes prefer cold temperatures", zh: "酶喜欢低温" }
          ],
          a: 0,
          e: { en: "Each enzyme has an optimal pH. Outside that range, charges on amino acid side chains change, the 3D shape unravels (denaturation), and the active site no longer fits the substrate.", zh: "每种酶有最适pH。超出范围后，氨基酸侧链电荷改变，三维结构解体（变性），活性中心不再匹配底物。" }
        },
        {
          t: "vocab",
          q: { en: "Water's high specific heat (resistance to temperature change) is due to:", zh: "水的比热容高（不易变温）的原因是：" },
          o: [
            { en: "Hydrogen bonding between water molecules", zh: "水分子间的氢键" },
            { en: "Covalent bonds breaking", zh: "共价键断裂" },
            { en: "Its low density as ice", zh: "冰的密度低" },
            { en: "Dissolved salts", zh: "溶解的盐分" }
          ],
          a: 0,
          e: { en: "H-bonds absorb heat before water molecules speed up → temperature is stable. This moderates climate and keeps cell/organism temperatures steady. Also: cohesion (surface tension), adhesion (capillary action), ice floating.", zh: "氢键先吸收热量，水分子才加速 → 温度稳定。这调节气候并稳定细胞/体温。水的其他特性：内聚力（表面张力）、附着力（毛细作用）、冰浮于水。" }
        },
        {
          t: "concept",
          q: { en: "Which statement about lipids is correct?", zh: "关于脂质，哪句话正确？" },
          o: [
            { en: "They store more energy per gram than carbohydrates", zh: "每克储能比糖类更多" },
            { en: "They are polymers of glucose", zh: "它们是葡萄糖的聚合物" },
            { en: "They are hydrophilic", zh: "它们是亲水的" },
            { en: "They cannot form membranes", zh: "它们不能形成膜" }
          ],
          a: 0,
          e: { en: "Lipids (fats, oils, phospholipids, steroids) are nonpolar (hydrophobic), store ~9 kcal/g vs. ~4 for carbs, and phospholipids form all biological membranes.", zh: "脂质（脂肪、油、磷脂、甾醇）是非极性（疏水）的，储能约9 kcal/g（糖类约4），磷脂构成所有生物膜。" }
        },
        {
          t: "vocab",
          q: { en: "Which level of protein structure describes the sequence of amino acids?", zh: "蛋白质的哪一级结构描述氨基酸序列？" },
          o: [
            { en: "Primary structure", zh: "一级结构" },
            { en: "Secondary structure", zh: "二级结构" },
            { en: "Tertiary structure", zh: "三级结构" },
            { en: "Quaternary structure", zh: "四级结构" }
          ],
          a: 0,
          e: { en: "Primary = amino acid sequence; secondary = α-helix/β-pleated sheet (H-bonds); tertiary = 3D fold; quaternary = multiple polypeptide chains (e.g., hemoglobin's 4 chains).", zh: "一级 = 氨基酸序列；二级 = α螺旋/β折叠（氢键）；三级 = 三维折叠；四级 = 多条肽链（如血红蛋白的4条链）。" }
        },
        {
          t: "application",
          q: { en: "A solution has an H⁺ concentration of 10⁻³ M. Its pH is:", zh: "某溶液H⁺浓度为10⁻³ M，其pH为：" },
          o: [
            { en: "3 (acidic)", zh: "3（酸性）" },
            { en: "11 (basic)", zh: "11（碱性）" },
            { en: "7 (neutral)", zh: "7（中性）" },
            { en: "0.001 (impossible)", zh: "0.001（不可能）" }
          ],
          a: 0,
          e: { en: "pH = −log[H⁺] = −log(10⁻³) = 3. pH < 7 acidic (stomach ~2), > 7 basic (blood 7.4), buffers resist pH swings.", zh: "pH = −log[H⁺] = −log(10⁻³) = 3。pH<7为酸性（胃约2），>7为碱性（血液7.4），缓冲液可抵抗pH剧变。" }
        }
      ]
    },
    {
      id: "bio4",
      name: { en: "Unit 4 · Photosynthesis", zh: "第4单元 · 光合作用" },
      topics: [
        { en: "Overall equation & chloroplast anatomy", zh: "总反应式与叶绿体结构" },
        { en: "Light-dependent reactions", zh: "光反应" },
        { en: "The Calvin cycle", zh: "卡尔文循环" },
        { en: "Pigments & absorption spectra", zh: "色素与吸收光谱" },
        { en: "Factors affecting rate", zh: "影响速率的因素" },
        { en: "C4 & CAM adaptations", zh: "C4 与 CAM 适应" },
        { en: "Chemiosmosis", zh: "化学渗透" },
        { en: "Photosystems II & I", zh: "光系统II与I" }
      ],
      questions: [
        {
          t: "vocab",
          q: { en: "The overall equation for photosynthesis is:", zh: "光合作用的总反应式是：" },
          o: [
            { en: "6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂", zh: "6CO₂ + 6H₂O + 光 → C₆H₁₂O₆ + 6O₂" },
            { en: "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + energy", zh: "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + 能量" },
            { en: "ADP + P → ATP", zh: "ADP + P → ATP" },
            { en: "6CO₂ + 6O₂ → C₆H₁₂O₆", zh: "6CO₂ + 6O₂ → C₆H₁₂O₆" }
          ],
          a: 0,
          e: { en: "CO₂ + water + light energy → glucose + oxygen. It's the reverse of cellular respiration. The O₂ released comes from SPLITTING WATER, not from CO₂.", zh: "CO₂ + 水 + 光能 → 葡萄糖 + 氧气。它是有氧呼吸的逆反应。释放的O₂来自水的分解，而不是CO₂。" }
        },
        {
          t: "concept",
          q: { en: "Where do the light-dependent reactions occur, and what do they produce?", zh: "光反应发生在哪里？产物是什么？" },
          o: [
            { en: "Thylakoid membranes; ATP, NADPH, and O₂", zh: "类囊体膜；ATP、NADPH 和 O₂" },
            { en: "Stroma; glucose", zh: "基质；葡萄糖" },
            { en: "Mitochondria; ATP", zh: "线粒体；ATP" },
            { en: "Cytoplasm; pyruvate", zh: "细胞质；丙酮酸" }
          ],
          a: 0,
          e: { en: "Light reactions (thylakoids): light splits H₂O → O₂ waste, electrons make ATP + NADPH. These power the Calvin cycle (stroma), which fixes CO₂ into sugar.", zh: "光反应（类囊体）：光解水 → 释放O₂，电子传递产生ATP + NADPH。它们为卡尔文循环（基质）提供能量，把CO₂固定成糖。" }
        },
        {
          t: "concept",
          q: { en: "In the Calvin cycle, the enzyme RuBisCO:", zh: "在卡尔文循环中，RuBisCO 酶的作用是：" },
          o: [
            { en: "Fixes CO₂ onto RuBP to begin carbon fixation", zh: "把CO₂固定到RuBP上，启动碳固定" },
            { en: "Splits water", zh: "分解水" },
            { en: "Makes ATP", zh: "合成ATP" },
            { en: "Absorbs light", zh: "吸收光" }
          ],
          a: 0,
          e: { en: "Calvin cycle (light-independent, stroma): CO₂ + RuBP (via RuBisCO) → 3-PGA → G3P using ATP + NADPH. ~18 ATP + 12 NADPH per glucose.", zh: "卡尔文循环（不直接依赖光，基质中）：CO₂ + RuBP（经RuBisCO）→ 3-PGA → G3P，消耗ATP + NADPH。每分子葡萄糖约需18 ATP + 12 NADPH。" }
        },
        {
          t: "application",
          q: { en: "Why do leaves look green?", zh: "叶子为什么是绿色的？" },
          o: [
            { en: "Chlorophyll absorbs red and blue light but reflects green", zh: "叶绿素吸收红光和蓝光，反射绿光" },
            { en: "Green light is strongest for photosynthesis", zh: "绿光对光合作用最有效" },
            { en: "Leaves make green food dye", zh: "叶子产生绿色染料" },
            { en: "Water inside leaves is green", zh: "叶内的水是绿色的" }
          ],
          a: 0,
          e: { en: "An object's color is what it REFLECTS. Chlorophyll a/b absorb violet-blue and red wavelengths; accessory pigments (carotenoids) cover orange and pass red/green/yellow on — autumn yellows show when chlorophyll fades.", zh: "物体的颜色是它反射的光。叶绿素a/b吸收蓝紫光和红光；辅助色素（类胡萝卜素）覆盖橙光。秋天叶绿素降解后现出黄色。" }
        },
        {
          t: "application",
          q: { en: "A plant is placed under green light only. Its photosynthetic rate will be:", zh: "植物只放在绿光下，其光合速率会：" },
          o: [
            { en: "Low, because green light is mostly reflected", zh: "很低，因为绿光大多被反射" },
            { en: "Highest, since plants are green", zh: "最高，因为植物是绿色的" },
            { en: "Zero, since light stops at night", zh: "为零，因为光到夜里就没了" },
            { en: "Unchanged", zh: "不变" }
          ],
          a: 0,
          e: { en: "Reflected light cannot drive photosynthesis — only absorbed light can. Blue and red light maximize the rate.", zh: "被反射的光不能驱动光合作用——只有被吸收的光才行。蓝光和红光使速率最大化。" }
        },
        {
          t: "concept",
          q: { en: "CAM plants like cacti separate CO₂ collection in time. How?", zh: "仙人掌等CAM植物在时间上错开CO₂收集。怎么做？" },
          o: [
            { en: "They open stomata at night to fix CO₂ as organic acids, closing them in daytime", zh: "夜间开气孔把CO₂固定成有机酸，白天关闭气孔" },
            { en: "They open stomata only at noon", zh: "只在中午开气孔" },
            { en: "They never open stomata", zh: "从不开气孔" },
            { en: "They fix CO₂ in the roots", zh: "在根部固定CO₂" }
          ],
          a: 0,
          e: { en: "CAM = temporal separation: stomata open at night (less water loss) storing CO₂ as malate; Calvin cycle runs in daylight behind closed stomata. C4 plants (corn) use spatial separation instead (bundle sheath cells).", zh: "CAM = 时间分离：夜间开气孔（失水少）把CO₂存为苹果酸；白天关闭气孔运行卡尔文循环。C4植物（玉米）用空间分离（维管束鞘细胞）。" }
        },
        {
          t: "concept",
          q: { en: "Which factor most directly limits photosynthesis in a dense forest understory?", zh: "茂密森林的林下，最直接限制光合作用的因素是？" },
          o: [
            { en: "Light intensity", zh: "光照强度" },
            { en: "CO₂ concentration", zh: "CO₂浓度" },
            { en: "Water availability", zh: "水分" },
            { en: "Chlorophyll count", zh: "叶绿素数量" }
          ],
          a: 0,
          e: { en: "Limiting factors: light, CO₂, water, temperature. In shade, light is the bottleneck; for greenhouse crops, CO₂ is often the bottleneck.", zh: "限制因素：光、CO₂、水、温度。荫蔽处光是瓶颈；温室作物常是CO₂瓶颈。" }
        },
        {
          t: "concept",
          q: { en: "In both chloroplasts and mitochondria, ATP is made by:", zh: "叶绿体和线粒体中，ATP的合成方式都是：" },
          o: [
            { en: "Chemiosmosis — H⁺ flowing down a gradient through ATP synthase", zh: "化学渗透——H⁺顺梯度流经ATP合酶" },
            { en: "Directly absorbing light", zh: "直接吸收光" },
            { en: "Splitting water", zh: "分解水" },
            { en: "Breaking glucose in the cytoplasm", zh: "在细胞质中分解葡萄糖" }
          ],
          a: 0,
          e: { en: "Electron transport pumps H⁺ across a membrane, storing potential energy in a gradient; H⁺ then rushes back through ATP synthase (rotary motor) — the chemiosmotic mechanism (Mitchell).", zh: "电子传递把H⁺泵过膜，能量储存在梯度中；H⁺再冲回ATP合酶（旋转马达）——化学渗透机制（米切尔提出）。" }
        }
      ]
    },
    {
      id: "bio5",
      name: { en: "Unit 5 · Cellular Respiration & Enzymes", zh: "第5单元 · 细胞呼吸与酶" },
      topics: [
        { en: "Glycolysis", zh: "糖酵解" },
        { en: "Krebs (citric acid) cycle", zh: "三羧酸循环" },
        { en: "Electron transport chain & ATP synthase", zh: "电子传递链与ATP合酶" },
        { en: "Fermentation: lactic vs alcoholic", zh: "发酵：乳酸 vs 酒精" },
        { en: "ATP structure & energy coupling", zh: "ATP结构与能量偶联" },
        { en: "Oxygen as final electron acceptor", zh: "氧气作为最终电子受体" },
        { en: "Total ATP accounting", zh: "ATP总账" },
        { en: "Enzyme kinetics & inhibition", zh: "酶动力学与抑制" }
      ],
      questions: [
        {
          t: "vocab",
          q: { en: "Glycolysis occurs in the ____ and produces ____.", zh: "糖酵解发生在____，产物是____。" },
          o: [
            { en: "Cytoplasm; 2 pyruvate, 2 ATP, 2 NADH", zh: "细胞质；2丙酮酸、2ATP、2NADH" },
            { en: "Mitochondria; 34 ATP", zh: "线粒体；34ATP" },
            { en: "Nucleus; glucose", zh: "细胞核；葡萄糖" },
            { en: "Chloroplast; oxygen", zh: "叶绿体；氧气" }
          ],
          a: 0,
          e: { en: "Glycolysis splits glucose (6C) into two pyruvates (3C each) in the cytoplasm. Net gain: 2 ATP + 2 NADH. No O₂ required — anaerobic.", zh: "糖酵解在细胞质中把葡萄糖（6C）裂解为两个丙酮酸（各3C）。净得：2 ATP + 2 NADH。不需要O₂——厌氧可进行。" }
        },
        {
          t: "concept",
          q: { en: "What happens to most of the electrons harvested from glucose?", zh: "从葡萄糖上剥下的电子最终去向是？" },
          o: [
            { en: "They pass down the ETC to O₂, which combines with H⁺ to form water", zh: "沿电子传递链传给O₂，与H⁺结合生成水" },
            { en: "They escape into the cytoplasm", zh: "逸散到细胞质中" },
            { en: "They build cell walls", zh: "用于构建细胞壁" },
            { en: "They become heat only", zh: "只变成热量" }
          ],
          a: 0,
          e: { en: "O₂ is the FINAL electron acceptor of the ETC. Without O₂, the chain backs up and the whole aerobic process halts. That's why cyanide (blocks cytochrome c oxidase) is lethal.", zh: "O₂是电子传递链的最终电子受体。没有O₂，传递链堵塞，整个有氧过程停摆。这就是氰化物（阻断细胞色素c氧化酶）致命的原因。" }
        },
        {
          t: "vocab",
          q: { en: "The Krebs cycle takes place in the:", zh: "三羧酸循环发生在：" },
          o: [
            { en: "Mitochondrial matrix", zh: "线粒体基质" },
            { en: "Thylakoid space", zh: "类囊体腔" },
            { en: "Cytoplasm", zh: "细胞质" },
            { en: "Golgi apparatus", zh: "高尔基体" }
          ],
          a: 0,
          e: { en: "Pyruvate enters mitochondria → acetyl-CoA → Krebs cycle in the matrix, releasing CO₂ and loading NADH/FADH₂ with electrons for the ETC (inner membrane).", zh: "丙酮酸进入线粒体 → 乙酰辅酶A → 基质中的三羧酸循环，释放CO₂并给NADH/FADH₂装载电子，供内膜上的电子传递链使用。" }
        },
        {
          t: "application",
          q: { en: "Your muscles burn during a sprint because:", zh: "短跑时肌肉有灼烧感，因为：" },
          o: [
            { en: "O₂ runs low and lactic acid fermentation regenerates NAD⁺ so glycolysis can continue", zh: "氧气不足，乳酸发酵再生NAD⁺以维持糖酵解" },
            { en: "ATP is being created too fast", zh: "ATP产生过快" },
            { en: "Muscles stop using glucose", zh: "肌肉停止利用葡萄糖" },
            { en: "CO₂ builds up as lactic acid", zh: "CO₂积累成乳酸" }
          ],
          a: 0,
          e: { en: "Fermentation keeps glycolysis alive by recycling NAD⁺ (2 ATP only vs ~30 aerobic). Lactate is later converted back to glucose in the liver (Cori cycle).", zh: "发酵通过再生NAD⁺维持糖酵解（只有2ATP，有氧约30ATP）。乳酸随后在肝脏转化回葡萄糖（可里氏循环）。" }
        },
        {
          t: "vocab",
          q: { en: "Yeast making bread rise uses which process?", zh: "酵母使面包蓬松靠的是什么过程？" },
          o: [
            { en: "Alcoholic fermentation releasing CO₂", zh: "释放CO₂的酒精发酵" },
            { en: "Lactic acid fermentation", zh: "乳酸发酵" },
            { en: "Photosynthesis", zh: "光合作用" },
            { en: "Direct glycolysis of starch", zh: "淀粉直接糖酵解" }
          ],
          a: 0,
          e: { en: "Yeast: pyruvate → ethanol + CO₂. The CO₂ bubbles expand the dough; ethanol evaporates during baking. Beer and wine use the same fermentation.", zh: "酵母：丙酮酸 → 乙醇 + CO₂。CO₂气泡使面团膨胀，乙醇在烘烤中挥发。啤酒和葡萄酒也用同样的发酵。" }
        },
        {
          t: "concept",
          q: { en: "Why is ATP a good energy currency for cells?", zh: "为什么ATP是细胞理想的能量货币？" },
          o: [
            { en: "Its phosphate bonds are easily and quickly broken/transferred to power work", zh: "磷酸键易断且能快速转移，驱动细胞工作" },
            { en: "It stores energy for years", zh: "它能储存能量多年" },
            { en: "It is never recycled", zh: "它从不循环" },
            { en: "It is a macromolecule like DNA", zh: "它是像DNA一样的大分子" }
          ],
          a: 0,
          e: { en: "ATP ⇌ ADP + P: hydrolysis releases energy for transport, mechanical work (motor proteins), and biosynthesis. A working cell recycles its entire ATP pool roughly every minute.", zh: "ATP ⇌ ADP + P：水解释放能量用于运输、机械做功（马达蛋白）和生物合成。工作状态下的细胞大约每分钟就把全部ATP周转一遍。" }
        },
        {
          t: "calculation",
          q: { en: "Approximately how many ATP does one glucose yield in aerobic respiration (modern estimate)?", zh: "一分子葡萄糖有氧呼吸大约产生多少ATP（现代估算值）？" },
          o: [
            { en: "About 30–32", zh: "约30–32" },
            { en: "Exactly 2", zh: "恰好2" },
            { en: "About 6", zh: "约6" },
            { en: "Over 100", zh: "超过100" }
          ],
          a: 0,
          e: { en: "Glycolysis 2 + Krebs 2 + ETC ~26–28 ≈ 30–32 (older textbooks said 36–38). Fermentation yields only 2.", zh: "糖酵解2 + 三羧酸循环2 + 电子传递链约26–28 ≈ 30–32（旧教材写36–38）。发酵只产2。" }
        },
        {
          t: "application",
          q: { en: "A competitive inhibitor blocks an enzyme by:", zh: "竞争性抑制剂通过什么方式阻断酶？" },
          o: [
            { en: "Binding the active site, competing with the substrate", zh: "占据活性中心，与底物竞争" },
            { en: "Changing the substrate", zh: "改变底物" },
            { en: "Raising pH", zh: "升高pH" },
            { en: "Denaturing DNA", zh: "使DNA变性" }
          ],
          a: 0,
          e: { en: "Competitive inhibitors mimic the substrate and block the active site (can be outcompeted by more substrate). Noncompetitive inhibitors bind elsewhere, warping the enzyme's shape. Feedback inhibition uses products to switch off pathways.", zh: "竞争性抑制剂模仿底物堵住活性中心（增加底物可逆转）。非竞争性抑制剂结合别处使酶变形。反馈抑制用产物关闭通路。" }
        }
      ]
    },
    {
      id: "bio6",
      name: { en: "Unit 6 · Cell Cycle, Mitosis & Meiosis", zh: "第6单元 · 细胞周期、有丝分裂与减数分裂" },
      topics: [
        { en: "Cell cycle phases (IPMAT)", zh: "细胞周期各期（IPMAT）" },
        { en: "Cytokinesis: animal vs plant", zh: "胞质分裂：动物 vs 植物" },
        { en: "Checkpoints, cyclins & cancer", zh: "检验点、周期蛋白与癌症" },
        { en: "Purpose of mitosis", zh: "有丝分裂的意义" },
        { en: "Meiosis I vs II", zh: "减数分裂I vs II" },
        { en: "Crossing over & independent assortment", zh: "交叉互换与自由组合" },
        { en: "Haploid vs diploid", zh: "单倍体 vs 二倍体" },
        { en: "Nondisjunction & karyotypes", zh: "染色体不分离与核型" }
      ],
      questions: [
        {
          t: "vocab",
          q: { en: "What is the correct order of mitosis phases?", zh: "有丝分裂的正确顺序是？" },
          o: [
            { en: "Prophase → Metaphase → Anaphase → Telophase", zh: "前期 → 中期 → 后期 → 末期" },
            { en: "Metaphase → Prophase → Telophase → Anaphase", zh: "中期 → 前期 → 末期 → 后期" },
            { en: "Anaphase → Prophase → Metaphase → Telophase", zh: "后期 → 前期 → 中期 → 末期" },
            { en: "Telophase → Anaphase → Metaphase → Prophase", zh: "末期 → 后期 → 中期 → 前期" }
          ],
          a: 0,
          e: { en: "PMAT: chromosomes condense (P), line up at equator (M), sister chromatids separate to poles (A), nuclei reform (T). Cytokinesis then splits the cytoplasm.", zh: "PMAT：染色体凝缩（前），排在赤道板（中），姐妹染色单体分向两极（后），核膜重建（末）。之后胞质分裂分开细胞质。" }
        },
        {
          t: "concept",
          q: { en: "The main purpose of mitosis in multicellular organisms is:", zh: "多细胞生物有丝分裂的主要目的是：" },
          o: [
            { en: "Growth and repair with genetically identical cells", zh: "生长与修复，产生遗传相同的细胞" },
            { en: "Making genetically diverse gametes", zh: "产生遗传多样的配子" },
            { en: "Reducing chromosome number", zh: "减少染色体数目" },
            { en: "Recombining homologs", zh: "重组同源染色体" }
          ],
          a: 0,
          e: { en: "Mitosis = 1 division → 2 identical diploid cells (growth, healing, cell replacement). Meiosis = 2 divisions → 4 unique haploid gametes.", zh: "有丝分裂 = 1次分裂 → 2个相同的二倍体细胞（生长、愈合、替换）。减数分裂 = 2次分裂 → 4个独特的单倍体配子。" }
        },
        {
          t: "vocab",
          q: { en: "During anaphase, what exactly separates?", zh: "后期发生分离的到底是什么？" },
          o: [
            { en: "Sister chromatids", zh: "姐妹染色单体" },
            { en: "Homologous chromosome pairs", zh: "同源染色体对" },
            { en: "Nuclei", zh: "细胞核" },
            { en: "Centriole pairs", zh: "中心体对" }
          ],
          a: 0,
          e: { en: "Key distinction: anaphase of MITOSIS separates sister chromatids; anaphase I of MEIOSIS separates homologous pairs. Anaphase II of meiosis then separates chromatids.", zh: "关键区别：有丝分裂后期分开姐妹染色单体；减数分裂I后期分开同源染色体。减数分裂II后期才分开染色单体。" }
        },
        {
          t: "concept",
          q: { en: "Plant cells divide their cytoplasm by forming a:", zh: "植物细胞的胞质分裂通过形成什么来完成？" },
          o: [
            { en: "Cell plate, which becomes a new wall", zh: "细胞板（将发育成新细胞壁）" },
            { en: "Cleavage furrow that pinches in", zh: "向内收缩的卵裂沟" },
            { en: "Contractile ring of actin", zh: "肌动蛋白收缩环" },
            { en: "They never divide", zh: "它们从不分裂" }
          ],
          a: 0,
          e: { en: "Animal cells pinch with a cleavage furrow (actin ring); plant cells build a cell plate from Golgi vesicles because rigid walls can't pinch.", zh: "动物细胞用卵裂沟（肌动蛋白环）收缩；植物细胞因细胞壁坚硬无法收缩，改由高尔基体囊泡构建细胞板。" }
        },
        {
          t: "concept",
          q: { en: "Cancer is fundamentally a disease of:", zh: "癌症本质上是哪种疾病？" },
          o: [
            { en: "Cell cycle control — checkpoints fail and division runs unchecked", zh: "细胞周期调控——检验点失效，分裂失控" },
            { en: "Meiosis making bad gametes", zh: "减数分裂产生缺陷配子" },
            { en: "Photosynthesis failure", zh: "光合作用失效" },
            { en: "Too much ATP", zh: "ATP过多" }
          ],
          a: 0,
          e: { en: "Proto-oncogenes (accelerators) and tumor-suppressor genes (brakes, like p53) mutate → checkpoints ignored → tumors. Metastasis = spread to new sites.", zh: "原癌基因（油门）和抑癌基因（刹车，如p53）突变 → 检验点被无视 → 肿瘤。转移 = 扩散到新部位。" }
        },
        {
          t: "concept",
          q: { en: "What makes meiosis produce genetically different gametes?", zh: "减数分裂产生遗传多样配子的原因是什么？" },
          o: [
            { en: "Crossing over in prophase I + independent assortment in metaphase I + random fertilization", zh: "前期I交叉互换 + 中期I自由组合 + 随机受精" },
            { en: "Only crossing over", zh: "只有交叉互换" },
            { en: "Mitosis of gametes", zh: "配子的有丝分裂" },
            { en: "It doesn't — gametes are identical", zh: "不会——配子完全相同" }
          ],
          a: 0,
          e: { en: "Humans: 2²³ = 8.4 million chromosome combinations from independent assortment alone; crossing over and random fertilization (~70 trillion zygote combos) push it higher.", zh: "人类：仅自由组合就有2²³ ≈ 840万种染色体组合；加上交叉互换和随机受精（合子组合约70万亿种）多样性更高。" }
        },
        {
          t: "vocab",
          q: { en: "A human cell with 46 chromosomes produces gametes with how many chromosomes?", zh: "46条染色体的人类细胞产生的配子有多少条染色体？" },
          o: [
            { en: "23 (haploid)", zh: "23条（单倍体）" },
            { en: "46 (diploid)", zh: "46条（二倍体）" },
            { en: "92 (tetraploid)", zh: "92条（四倍体）" },
            { en: "It varies randomly", zh: "随机不定" }
          ],
          a: 0,
          e: { en: "Meiosis halves the chromosome number: 46 → 23. Fertilization restores 46. Homologous pairs carry the same gene set, one from each parent.", zh: "减数分裂把染色体减半：46 → 23。受精恢复为46。同源染色体携带相同基因组合，各来自父母一方。" }
        },
        {
          t: "application",
          q: { en: "Trisomy 21 (Down syndrome) is caused by:", zh: "21三体（唐氏综合征）的成因是：" },
          o: [
            { en: "Nondisjunction — homologs or chromatids fail to separate in meiosis", zh: "染色体不分离——同源染色体或染色单体在减数分裂中未分开" },
            { en: "A missing chromosome", zh: "缺失一条染色体" },
            { en: "Too much mitosis", zh: "有丝分裂过多" },
            { en: "A point mutation in gene 21", zh: "第21号基因的点突变" }
          ],
          a: 0,
          e: { en: "Nondisjunction produces gametes with an extra chromosome (n+1); after fertilization the result is a trisomy. Maternal age increases nondisjunction risk.", zh: "不分离产生多一条染色体的配子（n+1）；受精后形成三体。母亲年龄增大会提高不分离风险。" }
        }
      ]
    },
    {
      id: "bio7",
      name: { en: "Unit 7 · DNA, RNA & Protein Synthesis", zh: "第7单元 · DNA、RNA与蛋白质合成" },
      topics: [
        { en: "DNA structure & base pairing", zh: "DNA结构与碱基配对" },
        { en: "Semiconservative replication", zh: "半保留复制" },
        { en: "Transcription & RNA processing", zh: "转录与RNA加工" },
        { en: "Translation & the genetic code", zh: "翻译与遗传密码" },
        { en: "Codons & tRNA", zh: "密码子与tRNA" },
        { en: "Mutations: point vs frameshift", zh: "突变：点突变 vs 移码" },
        { en: "Gene regulation & operons", zh: "基因调控与操纵子" },
        { en: "Biotechnology: PCR, gel electrophoresis", zh: "生物技术：PCR、凝胶电泳" }
      ],
      questions: [
        {
          t: "vocab",
          q: { en: "In DNA, adenine pairs with:", zh: "DNA中，腺嘌呤与什么配对？" },
          o: [
            { en: "Thymine (A–T)", zh: "胸腺嘧啶（A–T）" },
            { en: "Guanine (A–G)", zh: "鸟嘌呤（A–G）" },
            { en: "Cytosine (A–C)", zh: "胞嘧啶（A–C）" },
            { en: "Uracil (A–U)", zh: "尿嘧啶（A–U）" }
          ],
          a: 0,
          e: { en: "Chargaff's rule: A=T and G=C. Uracil replaces thymine in RNA. This pairing is what makes semiconservative replication possible.", zh: "查加夫法则：A=T、G=C。RNA中尿嘧啶取代胸腺嘧啶。这种配对是半保留复制的基础。" }
        },
        {
          t: "concept",
          q: { en: "\"Semiconservative\" replication means each new DNA molecule is:", zh: "\"半保留\"复制意味着每个新DNA分子是：" },
          o: [
            { en: "One original strand + one newly made strand", zh: "一条母链 + 一条新链" },
            { en: "Two brand-new strands", zh: "两条全新链" },
            { en: "Two original strands", zh: "两条原母链" },
            { en: "Random mixtures of RNA", zh: "RNA的随机混合" }
          ],
          a: 0,
          e: { en: "Meselson–Stahl proved it: DNA unzips, each template strand guides a new partner. DNA polymerase builds 5'→3'; the lagging strand is built in Okazaki fragments.", zh: "梅塞尔森-斯塔尔实验证实：DNA解链，每条模板链指导合成新链。DNA聚合酶按5'→3'合成；后随链以冈崎片段合成。" }
        },
        {
          t: "vocab",
          q: { en: "Transcription produces ____ using ____ in the ____.", zh: "转录在____中以____为模板产生____。" },
          o: [
            { en: "mRNA; a DNA template; nucleus", zh: "mRNA；DNA模板；细胞核" },
            { en: "protein; mRNA; ribosome", zh: "蛋白质；mRNA；核糖体" },
            { en: "DNA; RNA; cytoplasm", zh: "DNA；RNA；细胞质" },
            { en: "tRNA; ribosomes; nucleus", zh: "tRNA；核糖体；细胞核" }
          ],
          a: 0,
          e: { en: "Transcription: RNA polymerase copies DNA → pre-mRNA, then introns are spliced out (eukaryotes) and a cap/poly-A tail are added before leaving the nucleus.", zh: "转录：RNA聚合酶把DNA拷贝成前体mRNA，随后剪掉内含子（真核生物）并加帽加尾，才能离开细胞核。" }
        },
        {
          t: "concept",
          q: { en: "During translation, the codon on mRNA pairs with:", zh: "翻译过程中，mRNA上的密码子与什么配对？" },
          o: [
            { en: "The anticodon of a tRNA carrying an amino acid", zh: "携带氨基酸的tRNA的反密码子" },
            { en: "A DNA codon", zh: "DNA密码子" },
            { en: "A ribosomal protein", zh: "核糖体蛋白" },
            { en: "A lipid", zh: "脂质" }
          ],
          a: 0,
          e: { en: "mRNA codon (3 bases) + tRNA anticodon match; the ribosome joins the amino acid to the growing polypeptide. Start codon AUG (methionine); stop codons: UAA, UAG, UGA.", zh: "mRNA密码子（3个碱基）与tRNA反密码子配对；核糖体把氨基酸接到多肽链上。起始密码子AUG（甲硫氨酸）；终止密码子：UAA、UAG、UGA。" }
        },
        {
          t: "concept",
          q: { en: "The central dogma of molecular biology is:", zh: "分子生物学的中心法则是：" },
          o: [
            { en: "DNA → RNA → protein", zh: "DNA → RNA → 蛋白质" },
            { en: "RNA → DNA → protein", zh: "RNA → DNA → 蛋白质" },
            { en: "Protein → RNA → DNA", zh: "蛋白质 → RNA → DNA" },
            { en: "DNA → protein → lipid", zh: "DNA → 蛋白质 → 脂质" }
          ],
          a: 0,
          e: { en: "Replication (DNA→DNA), transcription (DNA→RNA), translation (RNA→protein). Exceptions: RNA viruses use reverse transcriptase (RNA→DNA).", zh: "复制（DNA→DNA）、转录（DNA→RNA）、翻译（RNA→蛋白质）。例外：RNA病毒用逆转录酶（RNA→DNA）。" }
        },
        {
          t: "application",
          q: { en: "A mutation deletes ONE nucleotide from the middle of a gene. The likely result is:", zh: "某基因中部缺失一个核苷酸，最可能的后果是：" },
          o: [
            { en: "A frameshift that changes all downstream amino acids", zh: "移码突变，改变下游所有氨基酸" },
            { en: "A silent mutation only", zh: "只是沉默突变" },
            { en: "The gene makes more protein", zh: "基因表达更多蛋白" },
            { en: "No effect at all", zh: "完全无影响" }
          ],
          a: 0,
          e: { en: "Codons read in triplets: deleting one base shifts the reading frame for everything after it — usually devastating. Substitutions affect at most one amino acid (or are silent).", zh: "密码子按三联体阅读：缺失一个碱基使后续读码框整体移位——通常是毁灭性的。碱基替换最多影响一个氨基酸（或完全无影响）。" }
        },
        {
          t: "concept",
          q: { en: "How does the lac operon regulate gene expression in E. coli?", zh: "大肠杆菌的乳糖操纵子如何调控基因表达？" },
          o: [
            { en: "Lactose removes the repressor, turning ON genes that digest lactose", zh: "乳糖解除阻遏物，开启消化乳糖的基因" },
            { en: "Lactose adds a repressor", zh: "乳糖加入阻遏物" },
            { en: "Glucose turns on lactose genes", zh: "葡萄糖开启乳糖基因" },
            { en: "The genes are always on", zh: "这些基因常开" }
          ],
          a: 0,
          e: { en: "Operon = promoter + operator + genes. No lactose → repressor blocks transcription. Lactose (inducer) binds the repressor → RNA polymerase transcribes the digestion genes. Elegant economy: make enzymes only when needed.", zh: "操纵子 = 启动子 + 操纵基因 + 结构基因。无乳糖 → 阻遏物阻止转录。乳糖（诱导物）结合阻遏物 → RNA聚合酶转录消化基因。精妙的节约：需要时才合成酶。" }
        },
        {
          t: "application",
          q: { en: "In gel electrophoresis of DNA fragments, which fragments move farthest?", zh: "DNA凝胶电泳中，哪种片段迁移最远？" },
          o: [
            { en: "The shortest fragments", zh: "最短的片段" },
            { en: "The longest fragments", zh: "最长的片段" },
            { en: "All move equally", zh: "所有片段一样" },
            { en: "The most charged fragments", zh: "电荷最强的片段" }
          ],
          a: 0,
          e: { en: "DNA is negative (phosphate backbone) and moves toward the + electrode; small fragments thread through the gel fastest. Basis of DNA fingerprinting (paternity, forensics).", zh: "DNA带负电（磷酸骨架），向正极迁移；小片段穿越凝胶最快。这是DNA指纹（亲子鉴定、法医）的基础。" }
        }
      ]
    },
    {
      id: "bio8",
      name: { en: "Unit 8 · Genetics & Inheritance", zh: "第8单元 · 遗传学" },
      topics: [
        { en: "Mendel's laws", zh: "孟德尔定律" },
        { en: "Monohybrid & dihybrid crosses", zh: "单因子与双因子杂交" },
        { en: "Punnett squares & test crosses", zh: "旁氏棋盘与测交" },
        { en: "Incomplete dominance & codominance", zh: "不完全显性与共显性" },
        { en: "Multiple alleles: blood types", zh: "复等位基因：血型" },
        { en: "Sex-linked traits", zh: "伴性遗传" },
        { en: "Pedigree analysis", zh: "系谱分析" },
        { en: "Probability rules", zh: "概率法则" }
      ],
      questions: [
        {
          t: "concept",
          q: { en: "Mendel's law of segregation states that:", zh: "孟德尔的分离定律指出：" },
          o: [
            { en: "The two alleles of a gene separate into different gametes", zh: "一个基因的两个等位基因分离进入不同配子" },
            { en: "Alleles of different genes always travel together", zh: "不同基因的等位基因总是一起传递" },
            { en: "Dominant alleles always win physically", zh: "显性等位基因总能生理性获胜" },
            { en: "Parents blend their traits", zh: "亲本性状相互融合" }
          ],
          a: 0,
          e: { en: "Segregation: each gamete gets ONE allele per gene (meiosis separates homologs). Independent assortment: alleles of DIFFERENT genes sort independently if on different chromosomes.", zh: "分离定律：每个配子每个基因只获得一个等位基因（减数分裂分开同源染色体）。自由组合定律：不同染色体上不同基因的等位基因独立分配。" }
        },
        {
          t: "calculation",
          q: { en: "Aa × Aa (A is dominant). What fraction shows the recessive phenotype?", zh: "Aa × Aa（A为显性）。隐性表型的比例是多少？" },
          o: [
            { en: "1/4", zh: "1/4" },
            { en: "3/4", zh: "3/4" },
            { en: "1/2", zh: "1/2" },
            { en: "0", zh: "0" }
          ],
          a: 0,
          e: { en: "Punnett square: AA, Aa, Aa, aa → 3 dominant : 1 recessive. Genotype ratio 1:2:1. A test cross with a homozygous recessive reveals whether a dominant phenotype is AA or Aa.", zh: "棋盘：AA、Aa、Aa、aa → 显性:隐性 = 3:1。基因型比例1:2:1。用纯合隐性测交可判断显性个体是AA还是Aa。" }
        },
        {
          t: "calculation",
          q: { en: "In a dihybrid cross AaBb × AaBb, what fraction is aabb?", zh: "双因子杂交 AaBb × AaBb 中，aabb 占多少比例？" },
          o: [
            { en: "1/16", zh: "1/16" },
            { en: "3/16", zh: "3/16" },
            { en: "9/16", zh: "9/16" },
            { en: "1/4", zh: "1/4" }
          ],
          a: 0,
          e: { en: "Each gene independently gives 1/4 double-recessive: 1/4 × 1/4 = 1/16. The classic 9:3:3:1 dihybrid ratio follows.", zh: "每个基因独立出现双隐性的概率为1/4：1/4 × 1/4 = 1/16。由此得到经典的9:3:3:1双因子比例。" }
        },
        {
          t: "concept",
          q: { en: "Red snapdragons crossed with white snapdragons produce PINK offspring. This is:", zh: "红花矮牵牛与白花杂交得粉色后代。这是：" },
          o: [
            { en: "Incomplete dominance", zh: "不完全显性" },
            { en: "Codominance", zh: "共显性" },
            { en: "Complete dominance", zh: "完全显性" },
            { en: "Sex-linked inheritance", zh: "伴性遗传" }
          ],
          a: 0,
          e: { en: "Incomplete dominance = blended intermediate phenotype (red + white → pink). Codominance = both traits fully expressed (AB blood, red-white spotted cow).", zh: "不完全显性 = 融合的中间表型（红+白→粉）。共显性 = 两种性状都表达（AB血型、红白花牛）。" }
        },
        {
          t: "application",
          q: { en: "A mother with blood type IAi and a father with IBi could NOT have a child with which blood type?", zh: "母亲血型 IAi、父亲 IBi，他们的孩子不可能是什么血型？" },
          o: [
            { en: "They can produce A, B, AB, and O — none is impossible", zh: "A、B、AB、O 都可能——没有不可能的" },
            { en: "Type AB", zh: "AB型" },
            { en: "Type O", zh: "O型" },
            { en: "Type A", zh: "A型" }
          ],
          a: 0,
          e: { en: "IAi × IBi → IAIB (AB), IAi (A), IBi (B), ii (O). ABO is multiple alleles (IA, IB, i) with IA and IB codominant.", zh: "IAi × IBi → IAIB（AB）、IAi（A）、IBi（B）、ii（O）。ABO是复等位基因，IA与IB共显性。" }
        },
        {
          t: "calculation",
          q: { en: "A carrier mother (XᴬXᵃ) and a normal father (XᴬY) for red-green colorblindness: what fraction of CHILDREN (not just daughters) is colorblind?", zh: "红绿色盲：携带者母亲 (XᴬXᵃ) 与正常父亲 (XᴬY)，所有孩子（不分性别）中色盲占多少？" },
          o: [
            { en: "1/4 (only the sons who get the Xᵃ)", zh: "1/4（只有获得Xᵃ的儿子）" },
            { en: "1/2", zh: "1/2" },
            { en: "All children", zh: "所有孩子" },
            { en: "0", zh: "0" }
          ],
          a: 0,
          e: { en: "X-linked recessive: sons get their X from mom → ½ of sons affected = ¼ of all children. Daughters would need TWO recessive alleles (affected dad + carrier mom).", zh: "X连锁隐性：儿子的X来自母亲 → ½的儿子患病 = 全部孩子的¼。女儿需两个隐性等位基因（患病父亲+携带者母亲）才会患病。" }
        },
        {
          t: "application",
          q: { en: "In a pedigree, a trait appears in every generation and affected parents can have unaffected children. This suggests:", zh: "系谱中，该性状每代都出现，且患病父母可有未患病子女。这提示：" },
          o: [
            { en: "Autosomal dominant inheritance", zh: "常染色体显性遗传" },
            { en: "X-linked recessive", zh: "X连锁隐性" },
            { en: "Mitochondrial inheritance", zh: "线粒体遗传" },
            { en: "It skips generations only", zh: "只会隔代遗传" }
          ],
          a: 0,
          e: { en: "Autosomal dominant: every generation affected, both sexes equally, Aa × aa gives 50% affected. Recessive traits typically skip generations; X-linked recessive shows mostly affected males.", zh: "常染色体显性：代代患病、男女均等，Aa × aa有50%患病。隐性性状通常隔代；X连锁隐性主要见于男性患者。" }
        },
        {
          t: "calculation",
          q: { en: "Parents are both heterozygous carriers of cystic fibrosis (Cc). What is the probability their FIRST TWO children both have CF?", zh: "父母均为囊性纤维化杂合携带者 (Cc)。前两个孩子都患CF的概率是多少？" },
          o: [
            { en: "1/16", zh: "1/16" },
            { en: "1/4", zh: "1/4" },
            { en: "1/8", zh: "1/8" },
            { en: "1/2", zh: "1/2" }
          ],
          a: 0,
          e: { en: "Each child independently: P(cc) = 1/4. Product rule: 1/4 × 1/4 = 1/16. Each birth is an independent event — previous outcomes don't change the odds.", zh: "每个孩子独立：P(cc) = 1/4。乘法定律：1/4 × 1/4 = 1/16。每次生育是独立事件——前面的结果不影响后续概率。" }
        }
      ]
    },
    {
      id: "bio9",
      name: { en: "Unit 9 · Evolution & Natural Selection", zh: "第9单元 · 进化与自然选择" },
      topics: [
        { en: "Darwin vs Lamarck", zh: "达尔文 vs 拉马克" },
        { en: "Requirements for natural selection", zh: "自然选择的条件" },
        { en: "Evidence: homologous, analogous, vestigial", zh: "证据：同源、同功、退化器官" },
        { en: "Hardy-Weinberg equilibrium", zh: "哈迪-温伯格平衡" },
        { en: "Types of selection", zh: "选择的类型" },
        { en: "Genetic drift, bottleneck & founder effects", zh: "遗传漂变、瓶颈与奠基者效应" },
        { en: "Speciation & reproductive isolation", zh: "物种形成与生殖隔离" },
        { en: "Fitness & sexual selection", zh: "适应度与性选择" }
      ],
      questions: [
        {
          t: "concept",
          q: { en: "Natural selection requires which three conditions?", zh: "自然选择需要哪三个条件？" },
          o: [
            { en: "Variation, heritability of traits, differential reproductive success", zh: "变异、性状可遗传、繁殖成功率有差异" },
            { en: "Mutations that organisms choose on purpose", zh: "生物有目的选择的突变" },
            { en: "Identical individuals in a stable environment", zh: "稳定环境中完全相同的个体" },
            { en: "Extinction of all competitors", zh: "所有竞争者灭绝" }
          ],
          a: 0,
          e: { en: "Selection acts on variation that is inherited; individuals with advantageous traits leave more offspring. It acts on individuals but evolves POPULATIONS.", zh: "选择作用于可遗传的变异；具优势性状的个体留下更多后代。它作用于个体，但进化发生在种群层面。" }
        },
        {
          t: "concept",
          q: { en: "The key difference between Darwin and Lamarck:", zh: "达尔文与拉马克的关键区别是：" },
          o: [
            { en: "Darwin: traits are selected by differential survival; Lamarck: acquired traits are passed on", zh: "达尔文：性状由差异存活率筛选；拉马克：后天获得的性状可遗传" },
            { en: "Darwin denied evolution", zh: "达尔文否认进化" },
            { en: "Lamarck discovered DNA", zh: "拉马克发现了DNA" },
            { en: "There is no difference", zh: "没有区别" }
          ],
          a: 0,
          e: { en: "Lamarck's giraffes stretched their necks (acquired trait) and passed it on. Darwin: long-necked giraffes were BORN (variation) and survived to reproduce more. Only inherited variation matters for evolution.", zh: "拉马克的长颈鹿伸长脖子（后天获得）并遗传。达尔文：长脖子的长颈鹿天生（变异），存活并繁殖更多。进化只在乎可遗传的变异。" }
        },
        {
          t: "vocab",
          q: { en: "The forearm bones of whales, bats, and humans have the same structure but different functions. They are:", zh: "鲸、蝙蝠和人类的前肢骨结构相同但功能不同。它们是：" },
          o: [
            { en: "Homologous structures — evidence of common ancestry", zh: "同源结构——共同祖先的证据" },
            { en: "Analogous structures — evidence of convergent evolution", zh: "同功结构——趋同进化的证据" },
            { en: "Vestigial structures", zh: "退化器官" },
            { en: "Identical mutations", zh: "完全相同的突变" }
          ],
          a: 0,
          e: { en: "Homologous = same origin, different function (common ancestry). Analogous = different origin, same function (bat wing vs butterfly wing — convergent evolution). Vestigial: appendix, whale hip bones.", zh: "同源 = 起源相同、功能不同（共同祖先）。同功 = 起源不同、功能相同（蝙蝠翅vs蝴蝶翅——趋同进化）。退化器官：阑尾、鲸的髋骨。" }
        },
        {
          t: "calculation",
          q: { en: "In a population, 16% show the recessive phenotype (aa). What is q, the frequency of allele a?", zh: "某种群中16%表现为隐性性状（aa）。等位基因a的频率q是多少？" },
          o: [
            { en: "0.4", zh: "0.4" },
            { en: "0.16", zh: "0.16" },
            { en: "0.6", zh: "0.6" },
            { en: "0.2", zh: "0.2" }
          ],
          a: 0,
          e: { en: "q² = 0.16 → q = 0.4; p = 0.6. Heterozygote frequency 2pq = 0.48. Hardy-Weinberg holds only if: no mutation, no selection, no migration, random mating, huge population.", zh: "q² = 0.16 → q = 0.4；p = 0.6。杂合子频率 2pq = 0.48。哈迪-温伯格平衡成立条件：无突变、无选择、无迁移、随机婚配、种群极大。" }
        },
        {
          t: "application",
          q: { en: "Human birth weight is stabilized around ~3.5 kg: very small and very large babies have lower survival. This is:", zh: "人类新生儿体重稳定在约3.5公斤：过小和过大婴儿存活率都低。这是：" },
          o: [
            { en: "Stabilizing selection", zh: "稳定选择" },
            { en: "Directional selection", zh: "定向选择" },
            { en: "Disruptive selection", zh: "分裂选择" },
            { en: "Sexual selection", zh: "性选择" }
          ],
          a: 0,
          e: { en: "Stabilizing favors the average (against extremes). Directional shifts the average (antibiotic resistance). Disruptive favors BOTH extremes (beak sizes where medium seeds are rare).", zh: "稳定选择偏好中间值（淘汰极端）。定向选择移动平均值（抗生素耐药）。分裂选择偏好两个极端（中等种子稀少时的鸟喙大小）。" }
        },
        {
          t: "concept",
          q: { en: "A few birds are blown by a storm to an island and start a new population with different allele frequencies than the mainland. This is:", zh: "几只鸟被风暴吹到岛上，建立了等位基因频率与大陆不同的新种群。这是：" },
          o: [
            { en: "The founder effect (genetic drift)", zh: "奠基者效应（遗传漂变）" },
            { en: "Natural selection", zh: "自然选择" },
            { en: "Gene flow", zh: "基因流动" },
            { en: "Directional selection", zh: "定向选择" }
          ],
          a: 0,
          e: { en: "Founder effect: a small random sample starts a population. Bottleneck effect: a disaster randomly shrinks a population (cheetahs' low genetic diversity). Both are drift = RANDOM, unlike selection.", zh: "奠基者效应：小随机样本建立种群。瓶颈效应：灾难随机缩减种群（猎豹的低遗传多样性）。两者都是漂变 = 随机，与选择不同。" }
        },
        {
          t: "concept",
          q: { en: "Grand Canyon squirrels on the north and south rims became separate species mainly through:", zh: "大峡谷南北缘的松鼠成为不同物种，主要经历了：" },
          o: [
            { en: "Allopatric speciation by geographic isolation", zh: "地理隔离导致的异域物种形成" },
            { en: "Sympatric speciation without isolation", zh: "无隔离的同域物种形成" },
            { en: "Convergent evolution", zh: "趋同进化" },
            { en: "Artificial selection", zh: "人工选择" }
          ],
          a: 0,
          e: { en: "Allopatric = geographic barrier stops gene flow; reproductive isolation evolves. Sympatric speciation occurs without distance (polyploidy in plants, habitat specialization).", zh: "异域 = 地理屏障阻断基因流；逐渐演化出生殖隔离。同域物种形成不需要距离（植物多倍体、栖息地特化）。" }
        },
        {
          t: "concept",
          q: { en: "In evolution, \"fitness\" is best defined as:", zh: "进化中“适应度”的最佳定义是：" },
          o: [
            { en: "An organism's contribution of viable offspring to the next generation", zh: "生物为下一代贡献可存活后代的能力" },
            { en: "Physical strength", zh: "体力强弱" },
            { en: "Lifespan only", zh: "仅指寿命" },
            { en: "Winning fights", zh: "赢得打斗" }
          ],
          a: 0,
          e: { en: "Fitness = reproductive success, not strength. Sexual selection (peacock tails) exists because traits that increase MATING success spread even if they decrease survival.", zh: "适应度 = 繁殖成功，而非力量。性选择（孔雀尾）之所以存在，是因为增加交配成功率的性状即使降低存活率也能传播。" }
        }
      ]
    },
    {
      id: "bio10",
      name: { en: "Unit 10 · Ecology & Energy Flow", zh: "第10单元 · 生态学与能量流动" },
      topics: [
        { en: "Trophic levels & the 10% rule", zh: "营养级与10%定律" },
        { en: "Food chains, webs & keystone species", zh: "食物链、食物网与关键种" },
        { en: "Biogeochemical cycles", zh: "生物地球化学循环" },
        { en: "Population growth curves", zh: "种群增长曲线" },
        { en: "Community interactions", zh: "群落种间关系" },
        { en: "Ecological succession", zh: "生态演替" },
        { en: "Ecological pyramids", zh: "生态金字塔" },
        { en: "Human impact & conservation", zh: "人类影响与保护" }
      ],
      questions: [
        {
          t: "calculation",
          q: { en: "A field has 100,000 kJ of energy in its grass. About how much energy is available to the secondary consumers (e.g., snakes eating mice)?", zh: "草地含100,000 kJ能量。次级消费者（如吃鼠的蛇）约能获得多少能量？" },
          o: [
            { en: "About 1,000 kJ", zh: "约1,000 kJ" },
            { en: "About 10,000 kJ", zh: "约10,000 kJ" },
            { en: "About 100 kJ", zh: "约100 kJ" },
            { en: "About 50,000 kJ", zh: "约50,000 kJ" }
          ],
          a: 0,
          e: { en: "10% rule: grass 100,000 → primary consumers (mice) 10,000 → secondary (snakes) 1,000 kJ. About 90% of energy is lost as heat at each transfer — which is why food chains rarely exceed 4–5 levels.", zh: "10%定律：草100,000 → 初级消费者（鼠）10,000 → 次级（蛇）1,000 kJ。每级约90%的能量以热散失——这也是食物链很少超过4-5级的原因。" }
        },
        {
          t: "vocab",
          q: { en: "Sea otters are a keystone species because:", zh: "海獭是关键种，因为：" },
          o: [
            { en: "Their removal collapses the community (urchins would destroy kelp forests)", zh: "移除它们群落崩溃（海胆会毁掉巨藻林）" },
            { en: "They are the most numerous species", zh: "它们数量最多" },
            { en: "They are producers", zh: "它们是生产者" },
            { en: "They are at the bottom of the food web", zh: "它们位于食物网底层" }
          ],
          a: 0,
          e: { en: "Keystone species have disproportionate impact relative to abundance. Indicator species (trout) signal ecosystem health; umbrella species protect habitat when protected.", zh: "关键种的影响远超其数量。指示物种（鳟鱼）反映生态系统健康；伞护种受保护时能庇护整片栖息地。" }
        },
        {
          t: "concept",
          q: { en: "Why are nitrogen-fixing bacteria essential to ecosystems?", zh: "为什么固氮细菌对生态系统必不可少？" },
          o: [
            { en: "They convert atmospheric N₂ into forms plants can use (ammonia/nitrate)", zh: "它们把大气N₂转化为植物可利用的形式（氨/硝酸盐）" },
            { en: "They make carbon dioxide", zh: "它们产生二氧化碳" },
            { en: "They photosynthesize", zh: "它们进行光合作用" },
            { en: "They decompose water", zh: "它们分解水" }
          ],
          a: 0,
          e: { en: "Plants can't use N₂ gas directly. Nitrogen cycle: fixation (bacteria in legume roots) → nitrification → assimilation → ammonification → denitrification. Carbon cycle: photosynthesis ↔ respiration, combustion.", zh: "植物不能直接利用N₂。氮循环：固氮（豆科根瘤菌）→ 硝化 → 同化 → 氨化 → 反硝化。碳循环：光合作用 ↔ 呼吸、燃烧。" }
        },
        {
          t: "concept",
          q: { en: "A population growing exponentially differs from logistic growth because exponential growth:", zh: "指数增长与逻辑斯蒂增长的区别在于指数增长：" },
          o: [
            { en: "Has no carrying capacity — unlimited until resources crash", zh: "没有环境承载力——资源耗尽前无限增长" },
            { en: "Slows near carrying capacity (K)", zh: "接近承载力（K）时减速" },
            { en: "Is always S-shaped", zh: "总是S形曲线" },
            { en: "Only happens to plants", zh: "只发生在植物身上" }
          ],
          a: 0,
          e: { en: "Exponential = J-curve, ideal conditions, no K. Logistic = S-curve, growth slows as N approaches carrying capacity (food, space, disease limits).", zh: "指数 = J曲线，理想条件，无K值。逻辑斯蒂 = S曲线，N接近承载力（食物、空间、疾病限制）时增长放缓。" }
        },
        {
          t: "vocab",
          q: { en: "Bees get nectar from flowers while pollinating them. This interaction is:", zh: "蜜蜂采蜜同时为花传粉。这种关系属于：" },
          o: [
            { en: "Mutualism (+/+)", zh: "互利共生（+/+）" },
            { en: "Parasitism (+/−)", zh: "寄生（+/−）" },
            { en: "Commensalism (+/0)", zh: "偏利共生（+/0）" },
            { en: "Competition (−/−)", zh: "竞争（−/−）" }
          ],
          a: 0,
          e: { en: "Mutualism (+/+): bees/flowers. Commensalism (+/0): barnacles on whales. Parasitism (+/−): tapeworms. Competition (−/−): two species fight for the same resource — drives niche partitioning.", zh: "互利共生（+/+）：蜜蜂与花。偏利共生（+/0）：鲸身上的藤壶。寄生（+/−）：绦虫。竞争（−/−）：两物种争夺同一资源——推动生态位分化。" }
        },
        {
          t: "concept",
          q: { en: "Primary succession differs from secondary succession because it begins:", zh: "原生演替与次生演替的区别在于它始于：" },
          o: [
            { en: "On bare rock with no soil (after lava or glacier retreat)", zh: "没有土壤的裸岩（熔岩或冰川消退后）" },
            { en: "On abandoned farmland", zh: "废弃农田" },
            { en: "After a forest fire", zh: "森林大火之后" },
            { en: "In a flooded river valley", zh: "被淹没的河谷" }
          ],
          a: 0,
          e: { en: "Primary: no soil → pioneer species (lichens, mosses) make soil over centuries → grasses → shrubs → trees. Secondary: soil already exists after disturbance (fire/farming) → recovery is much faster.", zh: "原生演替：无土壤 → 先锋物种（地衣、苔藓）历经数百年造土 → 草 → 灌木 → 乔木。次生演替：干扰（火灾/农耕）后土壤尚存 → 恢复快得多。" }
        },
        {
          t: "concept",
          q: { en: "Why is an energy pyramid ALWAYS upright, while a biomass pyramid can occasionally invert?", zh: "为什么能量金字塔总是正立，而生物量金字塔偶尔会倒置？" },
          o: [
            { en: "Energy is lost as heat at each transfer (~90%), so it must shrink upward; biomass can concentrate in fast-reproducing producers", zh: "能量每级以热流失约90%，必然向上递减；生物量可能集中在繁殖快的生产者上" },
            { en: "Energy is created at each level", zh: "每级都会产生能量" },
            { en: "Producers are always heavier", zh: "生产者总是更重" },
            { en: "Decomposers add energy", zh: "分解者补充能量" }
          ],
          a: 0,
          e: { en: "Energy is never recycled (2nd law of thermodynamics) — heat is lost forever. In the ocean, phytoplankton turnover so fast that standing biomass at any moment can be less than zooplankton, inverting the biomass pyramid.", zh: "能量不可循环（热力学第二定律）——热量永久流失。海洋中浮游植物周转极快，某一时刻的存量可能少于浮游动物，使生物量金字塔倒置。" }
        },
        {
          t: "application",
          q: { en: "DDT was sprayed at low concentrations but reached lethal levels in top predators like peregrine falcons. This is:", zh: "DDT低浓度喷洒却在游隼等顶级捕食者体内达到致死浓度。这是：" },
          o: [
            { en: "Biomagnification (biological magnification)", zh: "生物放大效应" },
            { en: "Eutrophication", zh: "富营养化" },
            { en: "Acid deposition", zh: "酸沉降" },
            { en: "The 10% rule of energy", zh: "能量10%定律" }
          ],
          a: 0,
          e: { en: "Persistent fat-soluble toxins concentrate at each trophic level — top predators suffer most (DDT → thin eggshells → falcon decline). Biomagnification is why mercury in tuna is a concern.", zh: "持久性脂溶性毒素逐级富集——顶级捕食者受害最深（DDT → 蛋壳变薄 → 隼数量下降）。这也是金枪鱼汞问题的原因。" }
        }
      ]
    }
  ]
};
