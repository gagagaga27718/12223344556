/* AP Human Geography — 7 units, bilingual question bank */
window.SUBJECT_GEO = {
  id: "geo",
  color: "geo",
  name: { en: "AP Human Geography", zh: "AP 人文地理" },
  tagline: { en: "Maps, people, culture, and how space shapes society", zh: "地图、人口、文化，以及空间如何塑造社会" },
  units: [
    {
      id: "geo1",
      name: { en: "Unit 1 · Thinking Geographically", zh: "第1单元 · 地理思维" },
      topics: [
        { en: "Map projections & distortion", zh: "地图投影与变形" },
        { en: "Reference & thematic maps", zh: "参考地图与专题地图" },
        { en: "Scale: large vs small", zh: "比例尺：大与小" },
        { en: "Types of regions", zh: "区域的类型" },
        { en: "Site vs situation", zh: "区位（site）与位置（situation）" },
        { en: "Distance decay & space-time compression", zh: "距离衰减与时空压缩" },
        { en: "Environmental determinism vs possibilism", zh: "环境决定论与或然论" },
        { en: "Distribution: density, concentration, pattern", zh: "分布：密度、集中度、格局" }
      ],
      questions: [
        {
          t: "vocab",
          q: { en: "Which map projection is useful for sea navigation because it preserves direction, but greatly distorts area near the poles?", zh: "哪种地图投影因保留方向而适合航海导航，但在高纬度地区面积变形严重？" },
          o: [
            { en: "Mercator projection", zh: "墨卡托投影" },
            { en: "Peters projection", zh: "彼得斯投影" },
            { en: "Robinson projection", zh: "罗宾逊投影" },
            { en: "Azimuthal equal-area projection", zh: "方位等积投影" }
          ],
          a: 0,
          e: { en: "Mercator is conformal (preserves angles/direction), so navigators can draw straight-line courses. The price: Greenland and Alaska look enormous relative to equatorial regions.", zh: "墨卡托投影是等角投影（保留角度和方向），航海者可以画直航线。代价是：格陵兰和阿拉斯加相对赤道地区显得极其巨大。" }
        },
        {
          t: "vocab",
          q: { en: "A map that shades each country by its population density is best described as a(n):", zh: "用颜色深浅表示各国人口密度的地图属于：" },
          o: [
            { en: "Choropleth map", zh: "等值区域图（分级统计图）" },
            { en: "Isoline map", zh: "等值线图" },
            { en: "Dot-density map", zh: "点状分布图" },
            { en: "Proportional symbol map", zh: "比例符号图" }
          ],
          a: 0,
          e: { en: "Choropleth maps shade administrative areas by a data value — the classic choice for density, income, or election results.", zh: "等值区域图按数据值给行政区着色——是表现密度、收入或选举结果的首选。" }
        },
        {
          t: "concept",
          q: { en: "Which statement about map scale is correct?", zh: "关于地图比例尺，哪句话是正确的？" },
          o: [
            { en: "1:24,000 is a larger scale than 1:1,000,000 and shows more detail", zh: "1:24,000 比 1:1,000,000 比例尺更大，显示更多细节" },
            { en: "1:24,000 is a smaller scale than 1:1,000,000", zh: "1:24,000 比 1:1,000,000 比例尺更小" },
            { en: "Large-scale maps cover much larger areas", zh: "大比例尺地图覆盖的面积更大" },
            { en: "Scale refers to the size of the map sheet", zh: "比例尺指的是地图纸张的大小" }
          ],
          a: 0,
          e: { en: "Scale is a ratio. 1:24,000 has a larger fraction, shows a smaller area in greater detail — used for topographic maps. Small-scale maps (1:1,000,000) cover whole countries.", zh: "比例尺是比值。1:24,000 分数更大，范围更小、细节更多——地形图常用。小比例尺（1:1,000,000）覆盖整个国家。" }
        },
        {
          t: "application",
          q: { en: "\"The Midwest\", defined by how people in the U.S. perceive it rather than by an official boundary, is an example of a:", zh: "美国“中西部”由人们的感知而非官方边界界定，属于：" },
          o: [
            { en: "Vernacular (perceptual) region", zh: "感知区域（vernacular region）" },
            { en: "Formal region", zh: "形式区域" },
            { en: "Functional region", zh: "功能区域" },
            { en: "Homogeneous region", zh: "均质区域" }
          ],
          a: 0,
          e: { en: "Vernacular regions exist in people's mental maps — where does \"the South\" begin? Different people draw different lines.", zh: "感知区域存在于人们的心智地图中——“南方”从哪里开始？不同人会画出不同的界线。" }
        },
        {
          t: "vocab",
          q: { en: "A region organized around a central node, such as the area served by a newspaper or a subway system, is a:", zh: "围绕中心节点组织起来的区域（如报纸发行区或地铁服务区）属于：" },
          o: [
            { en: "Functional region", zh: "功能区域" },
            { en: "Formal region", zh: "形式区域" },
            { en: "Vernacular region", zh: "感知区域" },
            { en: "Uniform region", zh: "均质区域" }
          ],
          a: 0,
          e: { en: "Functional regions are defined by an activity or flow (commuting, broadcasting) focused on a central node; their borders are fuzzy.", zh: "功能区域由围绕中心节点的活动或流（通勤、广播信号）界定，边界是模糊的。" }
        },
        {
          t: "concept",
          q: { en: "A geographer who argues that technology and culture determine what a society can do with its environment — rather than climate dictating the society — believes in:", zh: "认为技术和文化决定社会如何利用环境（而非气候决定社会）的地理学家信奉：" },
          o: [
            { en: "Possibilism", zh: "或然论（ possibilism ）" },
            { en: "Environmental determinism", zh: "环境决定论" },
            { en: "Ecotopianism", zh: "生态乌托邦主义" },
            { en: "Cultural ecology", zh: "文化生态学" }
          ],
          a: 0,
          e: { en: "Environmental determinism (climate decides culture) is rejected by modern geographers, who hold possibilism: the environment sets constraints, but people make choices.", zh: "现代地理学家否定环境决定论（气候决定文化），持或然论：环境设定限制，但人做出选择。" }
        },
        {
          t: "application",
          q: { en: "A factory city's ability to attract workers improves dramatically after a new highway opens. This best illustrates:", zh: "新高速公路开通后，工业城市吸引劳动力的能力大幅提升。这最能说明：" },
          o: [
            { en: "Space-time compression", zh: "时空压缩" },
            { en: "Distance decay", zh: "距离衰减" },
            { en: "Environmental determinism", zh: "环境决定论" },
            { en: "Sequent occupance", zh: "文化层积（sequent occupance）" }
          ],
          a: 0,
          e: { en: "Space-time compression: transportation and communication technology shrink the effective distance between places. Distance decay is the opposite idea — interaction fades with distance.", zh: "时空压缩：交通和通信技术缩短了地点之间的有效距离。距离衰减正好相反——随距离增加，交互减弱。" }
        },
        {
          t: "application",
          q: { en: "A new settlement is founded on a river terrace (safe from floods) with a good harbor nearby. Which pair of concepts applies?", zh: "一个新聚落建在河流阶地上（免受洪水）且附近有优良港口。应使用哪对概念来分析？" },
          o: [
            { en: "Site = river terrace; situation = access to harbor", zh: "site（区位）= 河流阶地；situation（位置）= 临近港口" },
            { en: "Site = access to harbor; situation = river terrace", zh: "site = 临近港口；situation = 河流阶地" },
            { en: "Site = climate; situation = soil", zh: "site = 气候；situation = 土壤" },
            { en: "Site = latitude; situation = longitude", zh: "site = 纬度；situation = 经度" }
          ],
          a: 0,
          e: { en: "Site is the physical character of the place itself (landform, soil, climate). Situation is the place's location relative to other places (harbor, trade routes).", zh: "Site 指地点本身的物理特征（地形、土壤、气候）；situation 指该地相对于其他地点的位置（港口、商路）。" }
        }
      ]
    },
    {
      id: "geo2",
      name: { en: "Unit 2 · Population & Migration", zh: "第2单元 · 人口与迁移" },
      topics: [
        { en: "Demographic Transition Model (DTM)", zh: "人口转型模型（DTM）" },
        { en: "Population pyramids", zh: "人口金字塔" },
        { en: "CBR, CDR, NIR, doubling time", zh: "出生率、死亡率、自然增长率、倍增时间" },
        { en: "Malthus, Boserup & neo-Malthusians", zh: "马尔萨斯、博塞拉普与新马尔萨斯主义" },
        { en: "Epidemiological transition", zh: "流行病学转变" },
        { en: "Ravenstein's laws, push & pull factors", zh: "雷文斯坦迁移法则、推拉因素" },
        { en: "Types of migration & refugees", zh: "迁移类型与难民" },
        { en: "Carrying capacity & population policy", zh: "环境承载力与人口政策" }
      ],
      questions: [
        {
          t: "concept",
          q: { en: "In Stage 2 of the Demographic Transition Model, population grows rapidly because:", zh: "在人口转型模型第二阶段，人口快速增长的原因是：" },
          o: [
            { en: "Death rates fall quickly while birth rates stay high", zh: "死亡率迅速下降，而出生率仍然很高" },
            { en: "Birth rates fall quickly while death rates stay high", zh: "出生率迅速下降，而死亡率仍然很高" },
            { en: "Both birth and death rates fall equally", zh: "出生率和死亡率同速下降" },
            { en: "Both birth and death rates rise", zh: "出生率和死亡率都上升" }
          ],
          a: 0,
          e: { en: "Stage 2 (e.g., Sub-Saharan Africa in the 1950s): modern medicine cuts mortality fast, but birth rates remain tradition-high, so NIR spikes.", zh: "第二阶段（如1950年代的撒哈拉以南非洲）：现代医学快速降低死亡率，但出生率仍维持高位，自然增长率飙升。" }
        },
        {
          t: "application",
          q: { en: "A population pyramid with a very wide base and narrow top indicates a country that is likely:", zh: "底部很宽、顶部很窄的人口金字塔表明该国很可能：" },
          o: [
            { en: "In Stage 2 with high growth and a young population", zh: "处于第二阶段，高增长、人口年轻" },
            { en: "In Stage 5 with population decline", zh: "处于第五阶段，人口负增长" },
            { en: "Facing a high dependency ratio from retirees", zh: "面临退休人口带来的高抚养比" },
            { en: "Growing only through immigration", zh: "仅靠移民实现增长" }
          ],
          a: 0,
          e: { en: "A wide base = many children = high CBR, typical of Stage 2. Future implication: huge cohorts entering school and then the workforce.", zh: "宽底 = 儿童多 = 高出生率，第二阶段典型特征。未来影响：大量人口将陆续进入学龄和劳动年龄。" }
        },
        {
          t: "calculation",
          q: { en: "Country X has CBR = 20 per 1,000 and CDR = 5 per 1,000. What is its natural increase rate (as a percentage)?", zh: "X 国出生率为 20‰，死亡率为 5‰。其自然增长率是多少（百分比）？" },
          o: [
            { en: "1.5%", zh: "1.5%" },
            { en: "15%", zh: "15%" },
            { en: "0.25%", zh: "0.25%" },
            { en: "2.5%", zh: "2.5%" }
          ],
          a: 0,
          e: { en: "NIR = (CBR − CDR)/10 = (20 − 5)/10 = 1.5%. At 1.5%, doubling time ≈ 70/1.5 ≈ 47 years.", zh: "自然增长率 = (出生率 − 死亡率)/10 = (20−5)/10 = 1.5%。按 1.5% 计算，倍增时间 ≈ 70/1.5 ≈ 47 年。" }
        },
        {
          t: "concept",
          q: { en: "Which statement would a neo-Malthusian agree with, against Boserup's view?", zh: "新马尔萨斯主义者会同意下面哪种观点（与博塞拉普相反）？" },
          o: [
            { en: "Population may outgrow food supply and resources, causing crises", zh: "人口可能超过粮食和资源的供给，引发危机" },
            { en: "More people always means more innovation and more food", zh: "人口越多，创新和粮食就越多" },
            { en: "Food production always grows faster than population", zh: "粮食生产总是比人口增长快" },
            { en: "Population growth has no environmental impact", zh: "人口增长对环境没有影响" }
          ],
          a: 0,
          e: { en: "Malthus predicted population (geometric) would outrun food (arithmetic). Boserup countered that population pressure drives agricultural innovation. Neo-Malthusians (e.g., Ehrlich) stress resource limits and environmental degradation.", zh: "马尔萨斯预言人口（几何级）将超过粮食（算术级）。博塞拉普反驳说人口压力会推动农业创新。新马尔萨斯主义者强调资源极限和环境退化。" }
        },
        {
          t: "application",
          q: { en: "Japan's population pyramid is top-heavy with few children. Which policy challenge does this create?", zh: "日本人口金字塔头重脚轻、儿童少。这带来什么政策挑战？" },
          o: [
            { en: "A rising old-age dependency ratio straining pension and healthcare systems", zh: "老年抚养比上升，养老金和医疗体系承压" },
            { en: "Overcrowded elementary schools", zh: "小学学位紧张" },
            { en: "Mass unemployment among young workers", zh: "年轻劳动者大量失业" },
            { en: "Rapid overall population growth", zh: "总人口快速增长" }
          ],
          a: 0,
          e: { en: "Fewer workers per retiree = high dependency ratio. Stage 5/low-growth countries face labor shortages and pension pressure.", zh: "每个退休者对应的劳动者减少 = 抚养比升高。第五阶段低增长国家面临劳动力短缺和养老金压力。" }
        },
        {
          t: "application",
          q: { en: "A family leaves a war zone and crosses an international border to a refugee camp. A worker moves to Germany under a guest-worker program. Which pairing is correct?", zh: "一个家庭因战乱跨越国界进入难民营；一名工人通过客工计划前往德国。哪组对应正确？" },
          o: [
            { en: "War family = forced migration; guest worker = voluntary economic migration", zh: "战乱家庭 = 强迫迁移；客工 = 自愿经济迁移" },
            { en: "War family = voluntary; guest worker = forced", zh: "战乱家庭 = 自愿；客工 = 强迫" },
            { en: "Both are examples of internal migration", zh: "两者都属于国内迁移" },
            { en: "Both are examples of step migration", zh: "两者都属于阶梯式迁移" }
          ],
          a: 0,
          e: { en: "Forced migration (refugees, asylum seekers) is driven by persecution or conflict; voluntary migration is usually economic (pull factor: wages).", zh: "强迫迁移（难民、寻求庇护者）由迫害或冲突驱动；自愿迁移通常是经济性的（拉力因素：工资）。" }
        },
        {
          t: "concept",
          q: { en: "According to Ravenstein's laws, most long-distance international migrants today are:", zh: "根据雷文斯坦迁移法则，如今大多数长距离国际移民是：" },
          o: [
            { en: "Young adults seeking work, often moving in family networks", zh: "寻找工作的年轻成年人，常通过亲属网络迁移" },
            { en: "Elderly retirees seeking warm climates", zh: "寻找温暖气候的退休老人" },
            { en: "Children traveling alone", zh: "独自迁移的儿童" },
            { en: "Farmers moving to other rural areas", zh: "迁往其他农村地区的农民" }
          ],
          a: 0,
          e: { en: "Ravenstein: most migrants are young adults; they move short distances; each migration flow produces a counterflow; and families/networks matter. Chain migration via relatives is central.", zh: "雷文斯坦法则：移民多为年轻成年人；迁移距离通常较短；每个迁移流都会产生反向流；亲属网络（连锁迁移）至关重要。" }
        },
        {
          t: "concept",
          q: { en: "Physiological density differs from arithmetic density because it measures:", zh: "生理密度与算术密度的区别在于它衡量的是：" },
          o: [
            { en: "People per unit of arable (farmable) land", zh: "每单位可耕地面积上的人口" },
            { en: "People per unit of total land area", zh: "每单位土地总面积上的人口" },
            { en: "Farmers per unit of farmland", zh: "每单位农田上的农民数" },
            { en: "Urban residents per city", zh: "每个城市的城市居民数" }
          ],
          a: 0,
          e: { en: "Physiological density (population ÷ arable land) signals pressure on farmland: Egypt looks very crowded this way because its people crowd the Nile valley.", zh: "生理密度（人口 ÷ 可耕地）反映土地压力：用这个指标看埃及会显得极拥挤，因为人口集中在尼罗河谷。" }
        }
      ]
    },
    {
      id: "geo3",
      name: { en: "Unit 3 · Cultural Patterns & Processes", zh: "第3单元 · 文化模式与过程" },
      topics: [
        { en: "Folk vs popular culture", zh: "民间文化 vs 流行文化" },
        { en: "Diffusion types: contagious, hierarchical, stimulus, relocation", zh: "扩散类型：传染、等级、刺激、迁移" },
        { en: "Language families & Indo-European", zh: "语系与印欧语系" },
        { en: "Religion: universalizing vs ethnic", zh: "宗教：普世型 vs 民族型" },
        { en: "Sacred spaces & cultural landscapes", zh: "神圣空间与文化景观" },
        { en: "Ethnicity, race & identity", zh: "族群、种族与认同" },
        { en: "Acculturation, assimilation, syncretism", zh: "文化适应、同化、文化融合" },
        { en: "Cultural appropriation & globalization", zh: "文化挪用与全球化" }
      ],
      questions: [
        {
          t: "concept",
          q: { en: "Hip-hop spreading from a few big cities outward to smaller ones, then globally, is an example of:", zh: "嘻哈音乐从少数大城市传到小城市再到全球，属于哪种扩散？" },
          o: [
            { en: "Hierarchical diffusion", zh: "等级扩散" },
            { en: "Contagious diffusion", zh: "传染扩散" },
            { en: "Relocation diffusion", zh: "迁移扩散" },
            { en: "Stimulus diffusion", zh: "刺激扩散" }
          ],
          a: 0,
          e: { en: "Hierarchical diffusion spreads through nodes/authorities: big cities → medium towns → villages. Contagious spreads person-to-person like a wave; stimulus spreads an underlying idea in new forms.", zh: "等级扩散通过节点/权威传播：大城市 → 中小城镇 → 乡村。传染扩散像波浪一样人传人；刺激扩散传播的是理念的新形式。" }
        },
        {
          t: "concept",
          q: { en: "Which is a typical trait of folk culture rather than popular culture?", zh: "以下哪项是民间文化（而非流行文化）的典型特征？" },
          o: [
            { en: "Transmission by word of mouth within a small community", zh: "在小型社群中口耳相传" },
            { en: "Rapid global spread through mass media", zh: "通过大众媒体快速全球传播" },
            { en: "Originating in a large commercial city", zh: "起源于大型商业城市" },
            { en: "Standardized identical products worldwide", zh: "全球统一化的产品" }
          ],
          a: 0,
          e: { en: "Folk culture: anonymous origins, oral transmission, local materials, small scale. Popular culture: mass production, media, wide distribution, rapidly changing fashion.", zh: "民间文化：起源不明、口口相传、就地取材、规模小。流行文化：大批量生产、大众媒体、广泛分销、时尚快速更迭。" }
        },
        {
          t: "vocab",
          q: { en: "Which language family has the most speakers worldwide?", zh: "世界上使用者最多的语系是？" },
          o: [
            { en: "Indo-European", zh: "印欧语系" },
            { en: "Sino-Tibetan", zh: "汉藏语系" },
            { en: "Afro-Asiatic", zh: "亚非语系" },
            { en: "Dravidian", zh: "达罗毗荼语系" }
          ],
          a: 0,
          e: { en: "Indo-European (English, Spanish, Hindi, Russian...) has the most speakers; Sino-Tibetan (Mandarin!) has the most native speakers of a single language but fewer total languages.", zh: "印欧语系（英语、西班牙语、印地语、俄语等）使用人数最多；汉藏语系中单一语言（普通话）母语者最多，但语言总数较少。" }
        },
        {
          t: "application",
          q: { en: "Which trio contains ONLY universalizing religions?", zh: "哪一组全部属于普世型宗教？" },
          o: [
            { en: "Christianity, Islam, Buddhism", zh: "基督教、伊斯兰教、佛教" },
            { en: "Judaism, Hinduism, Islam", zh: "犹太教、印度教、伊斯兰教" },
            { en: "Hinduism, Buddhism, Christianity", zh: "印度教、佛教、基督教" },
            { en: "Judaism, Hinduism, Shintoism", zh: "犹太教、印度教、神道教" }
          ],
          a: 0,
          e: { en: "Universalizing religions seek converts and have main origin points (Christianity: Jerusalem; Islam: Mecca; Buddhism: northern India). Judaism and Hinduism are ethnic religions tied to a people/place.", zh: "普世型宗教积极传教并有明确起源地（基督教：耶路撒冷；伊斯兰教：麦加；佛教：印度北部）。犹太教和印度教是与民族/地域绑定的民族型宗教。" }
        },
        {
          t: "vocab",
          q: { en: "When a taco becomes a mainstream U.S. fast-food item, adapted to local tastes, the process is best called:", zh: "塔可成为美国主流快餐并按当地口味改良，这一过程最好称为：" },
          o: [
            { en: "Syncretism (cultural blending)", zh: "文化融合（syncretism）" },
            { en: "Assimilation of immigrants", zh: "移民同化" },
            { en: "Cultural imperialism", zh: "文化帝国主义" },
            { en: "Sequent occupance", zh: "文化层积" }
          ],
          a: 0,
          e: { en: "Syncretism = blending of cultural features into a new hybrid. Assimilation refers to people merging into a dominant culture; syncretism refers to the cultural products themselves blending.", zh: "文化融合指文化特征混合成新的杂交体。同化指人群融入主流文化；文化融合强调文化产品本身的混合。" }
        },
        {
          t: "concept",
          q: { en: "Geographer Carl Sauer is associated with the idea that:", zh: "地理学家卡尔·索尔与以下哪个观点相关？" },
          o: [
            { en: "Culture is the agent, the natural area the medium, the cultural landscape the result", zh: "文化是动因，自然区域是媒介，文化景观是结果" },
            { en: "Climate determines culture", zh: "气候决定文化" },
            { en: "Cities grow in sectors around transport", zh: "城市沿交通线呈扇形扩张" },
            { en: "States should be nation-states", zh: "国家应成为民族国家" }
          ],
          a: 0,
          e: { en: "Sauer's \"cultural landscape\" idea: humans transform the natural landscape into a cultural landscape — visible in architecture, fields, and place names.", zh: "索尔的“文化景观”思想：人类将自然景观改造为文化景观——体现在建筑、田地和地名中。" }
        },
        {
          t: "application",
          q: { en: "U.S. \"Chinatowns\" maintaining festivals, food, and language while residents also work in mainstream jobs illustrate:", zh: "美国“唐人街”保留节庆、饮食和语言，同时居民也在主流社会工作。这体现了：" },
          o: [
            { en: "Acculturation without full assimilation", zh: "文化适应但未完全同化" },
            { en: "Complete assimilation", zh: "完全同化" },
            { en: "Cultural extinction", zh: "文化消亡" },
            { en: "Reverse relocation diffusion", zh: "逆向迁移扩散" }
          ],
          a: 0,
          e: { en: "Acculturation = adopting the host culture's practices while keeping one's own (e.g., bilingual). Assimilation = the original culture fades away.", zh: "文化适应 = 采纳东道主文化的实践同时保留自身文化（如双语）。同化 = 原有文化逐渐消失。" }
        },
        {
          t: "concept",
          q: { en: "Which is an example of stimulus diffusion?", zh: "以下哪项是刺激扩散的例子？" },
          o: [
            { en: "The drive-through concept adapting from cars to bikes/scooters in Asian cities", zh: "“得来速”概念在亚洲城市从汽车改造为适合摩托车/电动车" },
            { en: "A viral dance spreading person to person online", zh: "病毒式舞蹈在网上人传人" },
            { en: "Sikh migrants bringing their faith to Canada", zh: "锡克教移民把信仰带到加拿大" },
            { en: "Starbucks opening identical stores worldwide", zh: "星巴克在全球开一模一样的店" }
          ],
          a: 0,
          e: { en: "Stimulus diffusion: the underlying idea spreads but changes form to fit local conditions — like drive-throughs redesigned for two-wheelers.", zh: "刺激扩散：底层理念得以传播，但形式根据当地条件改变——比如为两轮车重新设计的得来速。" }
        }
      ]
    },
    {
      id: "geo4",
      name: { en: "Unit 4 · Political Patterns & Processes", zh: "第4单元 · 政治模式与过程" },
      topics: [
        { en: "State, nation, nation-state", zh: "国家、民族、民族国家" },
        { en: "State shapes & their problems", zh: "国家形状及其问题" },
        { en: "Boundary types & formation", zh: "边界类型与形成" },
        { en: "Federal vs unitary states", zh: "联邦制 vs 单一制" },
        { en: "Supranational organizations", zh: "超国家组织" },
        { en: "Devolution & separatism", zh: "权力下放与分离主义" },
        { en: "Electoral geography & gerrymandering", zh: "选举地理与不公正划分选区" },
        { en: "Colonialism & imperialism", zh: "殖民主义与帝国主义" }
      ],
      questions: [
        {
          t: "vocab",
          q: { en: "Chile is an example of which state shape, and what is a typical problem it causes?", zh: "智利属于哪种国家形状？其典型问题是什么？" },
          o: [
            { en: "Elongated — difficulty communicating and governing end to end", zh: "长条形 —— 东西（南北）两端沟通治理困难" },
            { en: "Compact — easy to defend", zh: "紧凑形 —— 易于防守" },
            { en: "Fragmented — separated by water", zh: "破碎形 —— 被水域分隔" },
            { en: "Prorupted —has a large protrusion", zh: "凸出形 —— 有大块凸出部分" }
          ],
          a: 0,
          e: { en: "Elongated states (Chile, Vietnam) stretch far, making transport and communication between ends slow. Fragmented: Indonesia/Philippines; Prorupted: Namibia's Caprivi Strip; Compact: Uruguay.", zh: "长条形国家（智利、越南）延伸太长，两端交通通信缓慢。破碎形：印尼/菲律宾；凸出形：纳米比亚卡普里维地带；紧凑形：乌拉圭。" }
        },
        {
          t: "vocab",
          q: { en: "The Kurds are an example of a(n):", zh: "库尔德人是以下哪个概念的例子？" },
          o: [
            { en: "Stateless nation", zh: "无国家的民族" },
            { en: "Multinational state", zh: "多民族国家" },
            { en: "Autonomous region", zh: "自治区域" },
            { en: "City-state", zh: "城邦国家" }
          ],
          a: 0,
          e: { en: "The Kurds (25–35 million people) are a nation without a state, spread across Turkey, Iraq, Iran, and Syria. Other examples: Basques, Palestinians, Rohingya.", zh: "库尔德人（约2500–3500万）是一个没有国家的民族，分布在土耳其、伊拉克、伊朗和叙利亚。其他例子：巴斯克人、巴勒斯坦人、罗兴亚人。" }
        },
        {
          t: "application",
          q: { en: "The straight borders drawn by European powers at the 1884–85 Berlin Conference, splitting African ethnic groups, are best classified as:", zh: "1884–85 年柏林会议上欧洲列强划定的直线边界，割裂了非洲族群。这些边界属于：" },
          o: [
            { en: "Superimposed boundaries", zh: "强加边界" },
            { en: "Antecedent boundaries", zh: "先于定居的边界" },
            { en: "Subsequent boundaries", zh: "后续边界" },
            { en: "Relic boundaries", zh: "遗迹边界" }
          ],
          a: 0,
          e: { en: "Superimposed = drawn by outsiders after settlement, ignoring existing cultures — the root of many African and South Asian conflicts. Antecedent = drawn before settlement (US–Canada 49th parallel).", zh: "强加边界 = 定居之后由外来者划定、无视既有文化——非洲和南亚许多冲突的根源。先于定居边界在定居前划定（美加49度线）。" }
        },
        {
          t: "concept",
          q: { en: "Which factor is most associated with devolutionary pressure in a state?", zh: "以下哪个因素最可能导致国家的权力下放/分裂压力？" },
          o: [
            { en: "Strong regional cultural or economic identity (e.g., Catalonia, Scotland)", zh: "强大的区域文化或经济认同（如加泰罗尼亚、苏格兰）" },
            { en: "A very compact state shape", zh: "非常紧凑的国家形状" },
            { en: "A unitary government with no regions", zh: "没有区域划分的单一制政府" },
            { en: "Membership in a military alliance", zh: "加入军事同盟" }
          ],
          a: 0,
          e: { en: "Devolution — central power flowing to regions — is fueled by regional identity, economic disparity, and supranational organizations weakening national sovereignty.", zh: "权力下放（中央权力流向地区）的动因包括区域认同、经济差异，以及超国家组织对国家主权的削弱。" }
        },
        {
          t: "concept",
          q: { en: "The European Union is an example of:", zh: "欧盟是以下哪个概念的例子？" },
          o: [
            { en: "A supranational organization where members cede some sovereignty", zh: "成员国让渡部分主权的超国家组织" },
            { en: "A federal state", zh: "联邦制国家" },
            { en: "A military alliance only", zh: "单纯的军事同盟" },
            { en: "A custom self-governing colony", zh: "自治殖民地" }
          ],
          a: 0,
          e: { en: "Supranational organizations (EU, UN, WTO) coordinate members who give up some sovereignty — e.g., the euro and EU law overriding national law.", zh: "超国家组织（欧盟、联合国、世贸组织）协调成员国，成员国需让渡部分主权——如欧元和欧盟法凌驾于国家法之上。" }
        },
        {
          t: "application",
          q: { en: "In gerrymandering, \"cracking\" refers to:", zh: "选区不公正划分中的“分裂法（cracking）”指：" },
          o: [
            { en: "Spreading an opposing party's voters across many districts to dilute them", zh: "把对方政党的选民分散到多个选区以稀释其力量" },
            { en: "Concentrating the opposition into one district to waste their votes", zh: "把对方选民集中到一个选区浪费其选票" },
            { en: "Drawing districts along natural boundaries", zh: "沿自然边界划分选区" },
            { en: "Using courts to redraw maps", zh: "通过法院重划选区" }
          ],
          a: 0,
          e: { en: "Cracking dilutes; packing concentrates. Both waste the targeted group's votes. The efficiency gap measures wasted votes to detect gerrymandering.", zh: "分裂法稀释对方力量；集中法把对方选票“浪费”在一个选区。两者都浪费目标群体的选票。效率差距指标可检测不公正划分。" }
        },
        {
          t: "concept",
          q: { en: "Which is generally TRUE about federal states?", zh: "关于联邦制国家，以下哪项正确？" },
          o: [
            { en: "Power is shared between central and regional governments; suits large or diverse countries", zh: "中央与地方政府分享权力；适合大型或多元国家" },
            { en: "All decisions are made centrally", zh: "所有决策由中央做出" },
            { en: "They are always small and homogeneous", zh: "它们总是小而单一" },
            { en: "Regional governments have no legal authority", zh: "地方政府没有法律权力" }
          ],
          a: 0,
          e: { en: "Federal (U.S., Germany, India) suits large/diverse countries; unitary (France, Japan) suits smaller, homogeneous ones with centralized power.", zh: "联邦制（美国、德国、印度）适合大型多元国家；单一制（法国、日本）适合较小且单一、权力集中的国家。" }
        },
        {
          t: "vocab",
          q: { en: "A boundary that existed before the cultural landscape developed (like the U.S.–Canada 49th parallel) is called:", zh: "在文化景观形成之前就已存在的边界（如美加49度线）称为：" },
          o: [
            { en: "Antecedent boundary", zh: "先于定居的边界" },
            { en: "Subsequent boundary", zh: "后续边界" },
            { en: "Superimposed boundary", zh: "强加边界" },
            { en: "Relict boundary", zh: "遗迹边界" }
          ],
          a: 0,
          e: { en: "Antecedent: drawn before settlement. Subsequent: drawn after, evolving with the landscape (Ireland/Northern Ireland). Relict: former boundary no longer used (East/West Germany).", zh: "先于定居边界在定居前划定；后续边界在定居后随景观演变（爱尔兰/北爱尔兰）；遗迹边界是已废弃的旧边界（东西德）。" }
        }
      ]
    },
    {
      id: "geo5",
      name: { en: "Unit 5 · Agriculture & Rural Land-Use", zh: "第5单元 · 农业与乡村土地利用" },
      topics: [
        { en: "Agricultural hearths & diffusion", zh: "农业起源地与扩散" },
        { en: "Subsistence vs commercial farming", zh: "自给农业 vs 商业农业" },
        { en: "Von Thünen model", zh: "冯·杜能模型" },
        { en: "Green Revolution", zh: "绿色革命" },
        { en: "Plantation agriculture & cash crops", zh: "种植园农业与经济作物" },
        { en: "Land survey systems", zh: "土地测量系统" },
        { en: "Food security & famine", zh: "粮食安全与饥荒" },
        { en: "Sustainable & local food movements", zh: "可持续与本地食物运动" }
      ],
      questions: [
        {
          t: "application",
          q: { en: "In von Thünen's model, which activity occupies the innermost ring around the market city?", zh: "在冯·杜能模型中，哪个农业活动占据市场城市最内圈？" },
          o: [
            { en: "Dairy and intensive farming (perishable, high value per acre)", zh: "乳业和集约农业（易腐、单位面积产值高）" },
            { en: "Livestock ranching (extensive land use)", zh: "畜牧业放牧（粗放用地）" },
            { en: "Commercial grain farming", zh: "商业谷物种植" },
            { en: "Forestry for lumber", zh: "用材林业" }
          ],
          a: 0,
          e: { en: "Von Thünen rings from center: dairy/intensive → forestry → grain → ranching. Perishable, expensive-to-transport products stay close; land rent decides it.", zh: "冯·杜能圈层由内到外：乳业/集约 → 林业 → 谷物 → 放牧。易腐和运输成本高的产品靠近市场，地租决定布局。" }
        },
        {
          t: "concept",
          q: { en: "Which statement about the Green Revolution is accurate?", zh: "关于绿色革命，以下哪项准确？" },
          o: [
            { en: "It raised wheat and rice yields using HYV seeds, fertilizers and irrigation, but increased dependence on inputs", zh: "它通过高产种子、化肥和灌溉提高了小麦水稻产量，但也加大了对投入品的依赖" },
            { en: "It reduced worldwide use of irrigation", zh: "它减少了全球灌溉的使用" },
            { en: "It applied mainly to Africa's subsistence farms", zh: "它主要应用于非洲的自给农场" },
            { en: "It had no environmental costs", zh: "它没有环境代价" }
          ],
          a: 0,
          e: { en: "Borlaug's HYV wheat/rice spread from the 1960s, especially in India and Mexico: yields soared, but water, fertilizer, and energy dependence grew, and regions that missed out (Sub-Saharan Africa) benefited least.", zh: "博洛格的高产小麦/水稻从1960年代开始推广，尤其在印度和墨西哥：产量飙升，但对水、化肥和能源的依赖增加；错过的地区（撒哈拉以南非洲）受益最少。" }
        },
        {
          t: "vocab",
          q: { en: "Shifting cultivation is most commonly practiced in:", zh: "迁移农业（刀耕火种）最常见于：" },
          o: [
            { en: "Tropical rainforest regions of Latin America, Africa, Southeast Asia", zh: "拉美、非洲、东南亚的热带雨林地区" },
            { en: "The U.S. Corn Belt", zh: "美国玉米带" },
            { en: "Central Asian steppes", zh: "中亚草原" },
            { en: "Mediterranean Europe", zh: "地中海欧洲" }
          ],
          a: 0,
          e: { en: "Tropical soils lose nutrients fast once cleared, so farmers burn a plot, farm it 2–3 years, then move on — sustainable only at low population density.", zh: "热带土壤一旦清林，养分流失很快，所以农民烧荒一块地、耕种2–3年后迁移——只有在低人口密度下才可持续。" }
        },
        {
          t: "concept",
          q: { en: "Why does famine persist in a world with surplus food production?", zh: "为什么全球粮食过剩，饥荒仍然存在？" },
          o: [
            { en: "Because famine is usually caused by political failure, poverty, and distribution problems, not total supply", zh: "因为饥荒通常由政治失灵、贫困和分配问题造成，而非总供给不足" },
            { en: "Because world food production is falling", zh: "因为全球粮食产量在下降" },
            { en: "Because no country produces surplus grain", zh: "因为没有国家生产过剩粮食" },
            { en: "Because climate prevents growing food anywhere", zh: "因为气候导致任何地方都无法种粮" }
          ],
          a: 0,
          e: { en: "Amartya Sen's insight: famines occur when people lose entitlement to food (war, price spikes, failed governance) — e.g., the 1984 Ethiopian famine during civil war.", zh: "阿马蒂亚·森的洞见：饥荒发生在人们失去获取粮食的权利时（战争、价格飙升、治理失败）——如1984年埃塞俄比亚内战期间的饥荒。" }
        },
        {
          t: "application",
          q: { en: "The rectangular grid of roads in Iowa and Kansas reflects which land survey system?", zh: "爱荷华和堪萨斯矩形路网反映的是哪种土地测量系统？" },
          o: [
            { en: "Township and range system", zh: "镇区-测距系统（township and range）" },
            { en: "Metes and bounds system", zh: "界石界标系统（metes and bounds）" },
            { en: "Longlot system", zh: "长条地块系统（longlot）" },
            { en: "Cadastral grid of China", zh: "中国地籍网格" }
          ],
          a: 0,
          e: { en: "The 1785 Land Ordinance divided land into square townships and sections — visible today in the Midwest's 1-mile road grid. Metes and bounds (colonial East Coast) uses natural landmarks; longlot (French Canada/Louisiana) gives everyone river frontage.", zh: "1785年土地法令把土地划成方形镇区和区块——今天中西部一英里见方的路网就是证据。界石界标（殖民地东海岸）用自然地标；长条地块（法属加拿大/路易斯安那）让每户都临河。" }
        },
        {
          t: "concept",
          q: { en: "A plantation growing only coffee for export is best described as:", zh: "只种植咖啡用于出口的种植园属于：" },
          o: [
            { en: "Commercial agriculture in the periphery, often single-crop", zh: "外围地区的商业农业，常为单一作物" },
            { en: "Subsistence mixed farming", zh: "自给型混合农业" },
            { en: "Intensive subsistence wet-rice farming", zh: "集约自给型水稻农业" },
            { en: "Pastoral nomadism", zh: "游牧" }
          ],
          a: 0,
          e: { en: "Plantations in the tropical periphery grow one cash crop (coffee, bananas, sugar) for export — a colonial legacy with boom-bust price risk.", zh: "热带外围地区的种植园种植单一经济作物（咖啡、香蕉、甘蔗）供出口——殖民时代的遗产，面临价格大起大落的风险。" }
        },
        {
          t: "application",
          q: { en: "The first agricultural hearth for wheat and barley was:", zh: "小麦和大麦最早的农业起源地是：" },
          o: [
            { en: "The Fertile Crescent (Southwest Asia)", zh: "新月沃地（西南亚）" },
            { en: "Southeast Asia", zh: "东南亚" },
            { en: "Mesoamerica", zh: "中美洲" },
            { en: "The Andes", zh: "安第斯山区" }
          ],
          a: 0,
          e: { en: "Hearths: Fertile Crescent (wheat, barley), Southeast Asia (rice, taro), Mesoamerica (maize, beans), Andes (potato), Ethiopia (coffee, teff).", zh: "起源地：新月沃地（小麦、大麦）、东南亚（水稻、芋头）、中美洲（玉米、豆类）、安第斯（马铃薯）、埃塞俄比亚（咖啡、画眉草）。" }
        },
        {
          t: "concept",
          q: { en: "Which is a goal of the local food / farm-to-table movement?", zh: "本地食物/从农场到餐桌运动的目标是什么？" },
          o: [
            { en: "Shortening the food chain to reduce transport emissions and support local farmers", zh: "缩短食物链，降低运输排放并支持本地农民" },
            { en: "Increasing food miles", zh: "增加食物里程" },
            { en: "Replacing all small farms with agribusiness", zh: "用农业综合企业取代所有小农场" },
            { en: "Ending all agricultural trade", zh: "终止一切农业贸易" }
          ],
          a: 0,
          e: { en: "The movement criticizes the global commodity chain (CSA boxes, farmers markets, organic certification) and pushes for foodshed resilience.", zh: "该运动批评全球化商品链（社区支持农业、农夫市集、有机认证），倡导食物系统韧性。" }
        }
      ]
    },
    {
      id: "geo6",
      name: { en: "Unit 6 · Cities & Urban Land-Use", zh: "第6单元 · 城市与城市土地利用" },
      topics: [
        { en: "Urban models: Burgess, Hoyt, Harris-Ullman", zh: "城市模型：伯吉斯、霍伊特、哈里斯-厄尔曼" },
        { en: "Latin America & African city models", zh: "拉美与非洲城市模型" },
        { en: "CBD characteristics", zh: "中央商务区（CBD）特征" },
        { en: "Central place theory", zh: "中心地理论" },
        { en: "Megacities, metacities, primate cities", zh: "巨型城市、超大城市、首位城市" },
        { en: "Sprawl, smart growth & zoning", zh: "蔓延、智慧增长与分区" },
        { en: "Gentrification & urban renewal", zh: "绅士化与城市更新" },
        { en: "Global cities hierarchy", zh: "全球城市等级体系" }
      ],
      questions: [
        {
          t: "vocab",
          q: { en: "Which urban model explains city growth as zones expanding outward from the CBD, like tree rings?", zh: "哪个城市模型把城市增长解释为从 CBD 向外逐圈扩张，像树的年轮？" },
          o: [
            { en: "Burgess concentric zone model", zh: "伯吉斯同心圆模型" },
            { en: "Hoyt sector model", zh: "霍伊特扇形模型" },
            { en: "Harris-Ullman multiple nuclei model", zh: "哈里斯-厄尔曼多核心模型" },
            { en: "Griffin-Ford Latin America model", zh: "格里芬-福特拉美模型" }
          ],
          a: 0,
          e: { en: "Burgess (1925): zones — CBD, transition zone, workers' homes, middle-class, commuter. Hoyt added transport corridors (sectors); Harris-Ullman added multiple nodes (airport, university).", zh: "伯吉斯（1925）：圈层——CBD、过渡区、工人住宅区、中产区、通勤区。霍伊特加入交通走廊（扇形）；哈里斯-厄尔曼加入多核心（机场、大学）。" }
        },
        {
          t: "concept",
          q: { en: "Which is characteristic of the CBD?", zh: "以下哪项是中央商务区的特征？" },
          o: [
            { en: "Highest land values, tall buildings, daytime population peak", zh: "地价最高、高楼林立、白天人口达峰" },
            { en: "Most single-family housing", zh: "以独栋住宅为主" },
            { en: "Peak land value at the edge of the city", zh: "地价峰值在城市边缘" },
            { en: "Dominated by heavy industry", zh: "以重工业为主导" }
          ],
          a: 0,
          e: { en: "Accessibility = rent. The most accessible point commands the highest land value, so only activities needing massive customer contact (offices, retail) pay for it.", zh: "可达性 = 地租。可达性最高的地点地价最高，只有需要大量客流的活动（办公、零售）付得起。" }
        },
        {
          t: "application",
          q: { en: "In central place theory, why do people travel farther to buy a car than to buy milk?", zh: "在中心地理论中，为什么人们买汽车愿意走的距离比买牛奶远得多？" },
          o: [
            { en: "Cars have a larger range (people travel farther) and higher threshold (need more customers)", zh: "汽车的范围（range）更大、门槛（threshold）更高" },
            { en: "Cars are cheaper than milk", zh: "汽车比牛奶便宜" },
            { en: "Milk is bought less often than cars", zh: "牛奶购买频率低于汽车" },
            { en: "Car dealers need less space", zh: "汽车经销商需要的空间更小" }
          ],
          a: 0,
          e: { en: "Threshold = minimum market size to stay profitable; range = max distance a customer will travel. Nails/low-order goods → many small towns; luxury/high-order goods → few big cities. Hence hexagonal hierarchies.", zh: "门槛 = 维持盈利所需的最小市场规模；范围 = 顾客愿意走的最远距离。低级商品（日用品）→ 多个小城镇；高级商品（奢侈品）→ 少数大城市。因此形成六边形等级体系。" }
        },
        {
          t: "application",
          q: { en: "A country's largest city is 10× the second city and dominates finance, media, and government. This is a:", zh: "某国最大城市是第二大城市的10倍，主导金融、媒体和政府。这是：" },
          o: [
            { en: "Primate city pattern", zh: "首位城市格局" },
            { en: "Rank-size rule pattern", zh: "位序-规模法则格局" },
            { en: "Metacity", zh: "超大城市" },
            { en: "Galactic city model", zh: "星系城市模型" }
          ],
          a: 0,
          e: { en: "Rank-size rule: 2nd city ≈ ½ the 1st, 3rd ≈ ⅓ (U.S., China-ish). Primate pattern: one dominant city (Paris, London, Mexico City) — common in developing economies.", zh: "位序-规模法则：第二城≈第一城的1/2，第三≈1/3（美国等）。首位格局：一城独大（巴黎、伦敦、墨西哥城）——常见于发展中经济体。" }
        },
        {
          t: "concept",
          q: { en: "Gentrification typically results in:", zh: "绅士化（士绅化）通常导致：" },
          o: [
            { en: "Rising rents that can displace lower-income original residents", zh: "租金上涨，可能迫使低收入原住民搬离" },
            { en: "Lower property values in the neighborhood", zh: "社区房价下跌" },
            { en: "Loss of all city services", zh: "所有城市服务消失" },
            { en: "Decline of the tax base", zh: "税基萎缩" }
          ],
          a: 0,
          e: { en: "Gentrification = middle-class reinvestment in old neighborhoods. It brings investment and services but raises housing costs — an equity vs. renewal tension central to APHG FRQs.", zh: "绅士化 = 中产阶级对旧社区的再投资。它带来投资和服务，但推高住房成本——这一“公平 vs 更新”的矛盾是 APHG 简答题重点。" }
        },
        {
          t: "concept",
          q: { en: "In the Latin American city model, what is the disamenity zone?", zh: "在拉美城市模型中，\"disamenity zone\"（不宜居地带）是什么？" },
          o: [
            { en: "Marginal squatter settlements on the urban periphery, lacking services", zh: "城市外围缺乏服务的边缘棚户区" },
            { en: "The wealthy residential spine", zh: "富人住宅区主干" },
            { en: "The central business district", zh: "中央商务区" },
            { en: "An industrial park", zh: "工业园区" }
          ],
          a: 0,
          e: { en: "The Griffin-Ford model: a elite spine runs from CBD outward, gated communities at the edge of the spine, and disamenity zones (favelas) ring the periphery.", zh: "格里芬-福特模型：精英主轴从 CBD 向外延伸，门禁社区位于主轴末端，不宜居地带（贫民窟）环绕城市外围。" }
        },
        {
          t: "vocab",
          q: { en: "Which is the best definition of urban sprawl?", zh: "城市蔓延的最佳定义是？" },
          o: [
            { en: "Low-density, automobile-dependent outward growth beyond the city's core", zh: "低密度、依赖汽车、超出城市核心的外向扩张" },
            { en: "Building taller skyscrapers downtown", zh: "在市中心建更高的摩天楼" },
            { en: "Population decline in the suburbs", zh: "郊区人口下降" },
            { en: "Converting farmland to forests", zh: "农田转为森林" }
          ],
          a: 0,
          e: { en: "Sprawl = leapfrog development, strip malls, cul-de-sacs. Countermeasures: smart growth (mixed-use, transit-oriented development, urban growth boundaries).", zh: "蔓延 = 跳跃式开发、沿路商业带、尽端路。应对：智慧增长（混合用途、公交导向开发、城市增长边界）。" }
        },
        {
          t: "concept",
          q: { en: "Which trio lists cities at the top of the global cities hierarchy?", zh: "哪一组城市位于全球城市等级体系的顶端？" },
          o: [
            { en: "London, New York, Tokyo", zh: "伦敦、纽约、东京" },
            { en: "Mumbai, Lagos, São Paulo", zh: "孟买、拉各斯、圣保罗" },
            { en: "Detroit, Manchester, Ruhr cities", zh: "底特律、曼彻斯特、鲁尔区城市" },
            { en: "Denver, Austin, Calgary", zh: "丹佛、奥斯汀、卡尔加里" }
          ],
          a: 0,
          e: { en: "Global cities are command points of the world economy (finance HQs, stock exchanges, international organizations). Second tier: Hong Kong, Paris, Singapore.", zh: "全球城市是世界经济的指挥中心（金融总部、证券交易所、国际组织）。第二梯队：香港、巴黎、新加坡。" }
        }
      ]
    },
    {
      id: "geo7",
      name: { en: "Unit 7 · Industrial & Economic Development", zh: "第7单元 · 工业与经济发展" },
      topics: [
        { en: "Industrial Revolution & hearths", zh: "工业革命与发源地" },
        { en: "Weber least-cost theory", zh: "韦伯最低成本理论" },
        { en: "Rostow's development ladder", zh: "罗斯托发展阶段论" },
        { en: "HDI, GII, GDP/GNI & measures", zh: "HDI、GII、GDP/GNI 等发展指标" },
        { en: "Core-periphery & Wallerstein", zh: "核心-边缘与沃勒斯坦体系" },
        { en: "Outsourcing, offshoring, maquiladoras", zh: "外包、离岸、保税工厂" },
        { en: "Women & development, microloans", zh: "女性与发展、小额信贷" },
        { en: "Sustainable development & energy", zh: "可持续发展与能源" }
      ],
      questions: [
        {
          t: "application",
          q: { en: "In Weber's least-cost theory, bulk-reducing industries (like copper smelting) locate near:", zh: "在韦伯最低成本理论中，失重型产业（如铜冶炼）应靠近：" },
          o: [
            { en: "The raw material source, to avoid shipping heavy inputs", zh: "原材料产地，避免运输沉重的原料" },
            { en: "The market, close to customers", zh: "市场，靠近顾客" },
            { en: "Wherever labor is cheapest", zh: "劳动力最便宜的地方" },
            { en: "The national capital", zh: "国家首都" }
          ],
          a: 0,
          e: { en: "Bulk-reducing: input heavier than output → locate near inputs (steel near coal/iron historically). Bulk-gaining (bread, soda) → locate near market.", zh: "失重产业：原料比成品重 → 靠近原料（历史上钢铁靠近煤/铁）。增重产业（面包、汽水）→ 靠近市场。" }
        },
        {
          t: "concept",
          q: { en: "A country in Rostow's \"take-off\" stage is most likely characterized by:", zh: "处于罗斯托“起飞”阶段的国家最可能的表现是：" },
          o: [
            { en: "Rapid urbanization and growth of a few key manufacturing industries", zh: "快速城市化，少数关键制造业迅速兴起" },
            { en: "A purely subsistence agricultural economy", zh: "纯粹自给的农业经济" },
            { en: "Mass consumption of durable consumer goods by most households", zh: "多数家庭大量消费耐用品" },
            { en: "A post-industrial service economy", zh: "后工业服务经济" }
          ],
          a: 0,
          e: { en: "Rostow's ladder: traditional society → preconditions → take-off (industrialization takes hold) → drive to maturity → mass consumption.", zh: "罗斯托阶梯：传统社会 → 起飞前提 → 起飞（工业化启动）→ 走向成熟 → 大众消费。" }
        },
        {
          t: "vocab",
          q: { en: "Which components make up the Human Development Index (HDI)?", zh: "人类发展指数（HDI）由哪几部分构成？" },
          o: [
            { en: "Health, education, income", zh: "健康、教育、收入" },
            { en: "GDP, military spending, trade balance", zh: "GDP、军费、贸易差额" },
            { en: "Birth rate, death rate, migration rate", zh: "出生率、死亡率、迁移率" },
            { en: "Industry, agriculture, services shares", zh: "工业、农业、服务业占比" }
          ],
          a: 0,
          e: { en: "HDI = life expectancy + schooling years + GNI per capita (PPP). GII (gender inequality) and GDP per capita are related but distinct measures.", zh: "HDI = 预期寿命 + 受教育年限 + 人均GNI（购买力平价）。GII（性别不平等指数）和人均GDP是相关但不同的指标。" }
        },
        {
          t: "concept",
          q: { en: "Wallerstein's world-systems theory divides the world into:", zh: "沃勒斯坦世界体系论把世界划分为：" },
          o: [
            { en: "Core, semi-periphery, and periphery", zh: "核心、半边缘、边缘" },
            { en: "Stages 1 through 5", zh: "第一到第五阶段" },
            { en: "Primary, secondary, tertiary sectors", zh: "第一、第二、第三产业" },
            { en: "North and South hemispheres only", zh: "仅有南北半球" }
          ],
          a: 0,
          e: { en: "Core (high-value design/finance) exploits the periphery (raw materials, cheap labor), with semi-periphery countries (Brazil, India) both exploiting and being exploited.", zh: "核心（高附加值设计/金融）剥削边缘（原材料、廉价劳动力），半边缘国家（巴西、印度）既剥削也被剥削。" }
        },
        {
          t: "application",
          q: { en: "A U.S. phone company contracts a factory in Guadalajara to assemble devices. This is best described as:", zh: "美国手机公司委托瓜达拉哈拉的工厂组装设备。这最恰当的描述是：" },
          o: [
            { en: "Outsourcing/offshoring of manufacturing", zh: "制造业外包/离岸外包" },
            { en: "Insourcing of services", zh: "服务业内包" },
            { en: "A maquiladora in the United States", zh: "美国的保税工厂" },
            { en: "Foreign direct divestment", zh: "外资撤资" }
          ],
          a: 0,
          e: { en: "Offshore outsourcing = contracting foreign firms (maquiladoras on the Mexican border are the classic case). Motivation: lower labor costs, trade agreements (USMCA).", zh: "离岸外包 = 委托外国企业（墨西哥边境的保税工厂是经典案例）。动机：更低劳动力成本、贸易协定（USMCA）。" }
        },
        {
          t: "concept",
          q: { en: "Which is a critique of using GDP alone to measure development?", zh: "仅用GDP衡量发展水平的一个批评是？" },
          o: [
            { en: "GDP ignores inequality, unpaid work, and environmental damage", zh: "GDP 忽视不平等、无偿劳动和环境破坏" },
            { en: "GDP measures education directly", zh: "GDP 直接衡量教育" },
            { en: "GDP only counts agriculture", zh: "GDP 只统计农业" },
            { en: "GDP cannot be measured at all", zh: "GDP 根本无法衡量" }
          ],
          a: 0,
          e: { en: "Two countries with identical GDP per capita can differ hugely in distribution and well-being — hence HDI, Gini coefficient, GII, and Gross National Happiness (Bhutan).", zh: "人均GDP相同的两个国家，分配和福祉可能天差地别——因此有了HDI、基尼系数、GII 以及“国民幸福总值”（不丹）。" }
        },
        {
          t: "application",
          q: { en: "A rural woman gets a $100 loan to buy a sewing machine and starts a tailoring business. This illustrates:", zh: "一位农村妇女获得100美元贷款购买缝纫机并开办裁缝生意。这体现了：" },
          o: [
            { en: "Microcredit / microfinance empowering women's development", zh: "小额信贷帮助女性发展" },
            { en: "Foreign direct investment", zh: "外国直接投资" },
            { en: "Structural adjustment lending", zh: "结构性调整贷款" },
            { en: "Fordist production", zh: "福特主义生产" }
          ],
          a: 0,
          e: { en: "Microloans (Grameen Bank model) target people excluded from formal banking, often women, whose repayment rates are high — a bottom-up development strategy.", zh: "小额贷款（格莱珉银行模式）面向被正规银行排斥的人群（多为妇女，还款率很高）——自下而上的发展策略。" }
        },
        {
          t: "concept",
          q: { en: "Why did traditional Fordist auto plants use assembly lines, and what replaced that system?", zh: "传统福特主义汽车厂为什么用流水线？后来被什么取代？" },
          o: [
            { en: "Uniform mass production for economies of scale; replaced by flexible/lean production attuned to niche demand", zh: "统一大批量生产实现规模经济；后被灵活/精益生产取代" },
            { en: "Custom handmade cars; replaced by robots only", zh: "手工定制车；只被机器人取代" },
            { en: "Small workshops; never replaced", zh: "小作坊；从未被取代" },
            { en: "Just-in-time farming; replaced by fisheries", zh: "准时制农业；被渔业取代" }
          ],
          a: 0,
          e: { en: "Fordism = standardized mass production (Model T). Post-Fordism = flexible production, global supply chains, just-in-time delivery, outsourcing to new industrial regions (China's SEZs).", zh: "福特主义 = 标准化大批量生产（T型车）。后福特主义 = 灵活生产、全球供应链、准时制交付、外包到新兴工业区（中国特区）。" }
        }
      ]
    }
  ]
};
