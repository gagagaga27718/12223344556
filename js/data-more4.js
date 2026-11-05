/* StudyLoop — bank expansion, batch 4 (AP Human Geography). Q(unit, topicIdx, difficulty, style, stemEn, stemZh,
 * options [[en, zh], ...] with the CORRECT ONE FIRST, explanationEn, explanationZh). Options are shuffled at display. */
(function () {
  'use strict';
  var B = window.EXTRA_BANK = window.EXTRA_BANK || [];
  function Q(unit, tp, d, t, qen, qzh, opts, een, ezh) {
    B.push({ unit: unit, tp: tp, d: d, t: t, q: { en: qen, zh: qzh }, o: opts.map(function (x) { return { en: x[0], zh: x[1] }; }), a: 0, e: { en: een, zh: ezh } });
  }

  /* ---------- geo1 ---------- */
  Q('geo1', 4, 2, 'application', 'New Orleans sits below sea level on soft delta soil, but grew because it controls the mouth of the Mississippi River. Which statement is correct?', '新奥尔良位于海平面以下的松软三角洲上，却因控制密西西比河口而发展起来。哪项说法正确？',
    [['Its site is poor, but its situation is excellent', '它的地点条件差，但位置优越'], ['Its site and situation are both excellent', '地点和位置都很优越'], ['Its situation is poor, but its site is excellent', '位置差，但地点优越'], ['Site and situation mean the same thing', '地点和位置含义相同']],
    'Site = the physical land itself (low, flood-prone). Situation = location relative to other places (gateway to the Mississippi basin).', '地点 = 土地本身的自然条件（低洼易涝）；位置 = 相对于其他地方的关系（密西西比流域的门户）。');
  Q('geo1', 7, 3, 'calculation', 'Country X has 20 million people, 400,000 km² of land, 50,000 km² of arable land and 5 million farmers. What is its agricultural density?', 'X 国人口 2000 万，国土 40 万 km²，耕地 5 万 km²，农民 500 万。其农业密度是多少？',
    [['100 farmers per km² of arable land', '每平方公里耕地 100 名农民'], ['400 people per km² of arable land', '每平方公里耕地 400 人'], ['50 people per km²', '每平方公里 50 人'], ['12.5 farmers per km²', '每平方公里 12.5 名农民']],
    'Agricultural density = farmers ÷ arable land = 5,000,000 ÷ 50,000 = 100. (Physiological density = 400; arithmetic = 50.) A high value suggests less mechanized farming.', '农业密度 = 农民 ÷ 耕地 = 500 万 ÷ 5 万 = 100（生理密度为 400，算术密度为 50）。数值高说明农业机械化程度较低。');
  Q('geo1', 0, 3, 'concept', 'A map breaks the oceans into lobes so that land areas keep their correct relative size. This is:', '一种地图把海洋切成若干"瓣"，使陆地面积保持正确比例。这是：',
    [['An interrupted equal-area projection (Goode homolosine)', '分瓣等积投影（古德投影）'], ['The Mercator projection', '墨卡托投影'], ['A conformal navigation chart', '等角航海图'], ['A large-scale reference map', '大比例尺参考地图']],
    'Goode\'s homolosine sacrifices continuity of the oceans to preserve area and reduce shape distortion on land.', '古德投影牺牲海洋的连续性，以保持陆地面积并减少形状变形。');
  Q('geo1', 2, 3, 'application', 'National data show a country\'s average income rising, but county data reveal some regions getting poorer. This shows:', '全国数据显示平均收入上升，但县级数据显示部分地区越来越穷。这说明：',
    [['Patterns can change depending on the scale of analysis', '规律会随分析尺度不同而改变'], ['County data are always wrong', '县级数据总是错的'], ['Map projections distort income', '地图投影扭曲了收入'], ['Distance decay explains all inequality', '距离衰减能解释所有不平等']],
    'A national average can hide regional variation; geographers compare scales (global, national, regional, local) to see the full pattern.', '全国平均值可能掩盖区域差异；地理学者比较不同尺度（全球、国家、区域、地方）以看清完整规律。');
  Q('geo1', 6, 2, 'concept', 'The claim that "hot climates make people lazy" is an example of:', '"炎热气候使人懒惰"这种说法属于：',
    [['Environmental determinism (now rejected)', '环境决定论（已被否定）'], ['Possibilism', '可能论'], ['Cultural ecology', '文化生态学'], ['Space–time compression', '时空压缩']],
    'Environmental determinism claimed the physical environment controls human behavior; it was used to justify colonialism and has been discredited.', '环境决定论认为自然环境决定人的行为，曾被用来为殖民主义辩护，现已被否定。');
  Q('geo1', 5, 3, 'application', 'The gravity model predicts that interaction between two cities increases with their populations and:', '引力模型预测两城市之间的联系随人口增加而增加，并且：',
    [['decreases as the distance between them increases', '随两地距离增加而减少'], ['increases as the distance increases', '随距离增加而增加'], ['is unaffected by distance', '不受距离影响'], ['depends only on elevation', '只取决于海拔']],
    'Interaction ∝ (P₁ × P₂) / distance² — a formal expression of distance decay.', '联系强度 ∝ (P₁ × P₂) / 距离²，是距离衰减的定量表达。');

  /* ---------- geo2 ---------- */
  Q('geo2', 2, 3, 'calculation', 'A country has a CBR of 30 and a CDR of 10. What are its NIR and approximate doubling time?', '某国出生率 30‰，死亡率 10‰。其自然增长率和大约的倍增时间是多少？',
    [['2.0%, about 35 years', '2.0%，约 35 年'], ['20%, about 3.5 years', '20%，约 3.5 年'], ['2.0%, about 70 years', '2.0%，约 70 年'], ['0.2%, about 350 years', '0.2%，约 350 年']],
    'NIR = (30 − 10) ÷ 10 = 2.0%. Doubling time ≈ 70 ÷ 2 = 35 years.', '自然增长率 = (30 − 10) ÷ 10 = 2.0%；倍增时间 ≈ 70 ÷ 2 = 35 年。');
  Q('geo2', 3, 3, 'concept', 'How do neo-Malthusians extend Malthus\'s original argument?', '新马尔萨斯主义者如何扩展了马尔萨斯的观点？',
    [['They add concerns about resource depletion and environmental damage, not just food', '除粮食外，还关注资源枯竭和环境破坏'], ['They argue population growth always improves technology', '认为人口增长总能促进技术进步'], ['They reject any link between population and resources', '否认人口与资源之间的任何联系'], ['They focus only on migration', '只关注迁移']],
    'Neo-Malthusians (e.g., Ehrlich) warn that population growth strains energy, water and ecosystems; critics point to innovation and unequal consumption.', '新马尔萨斯主义者（如埃利希）警告人口增长会压迫能源、水和生态系统；批评者则强调技术创新和消费不均。');
  Q('geo2', 4, 2, 'concept', 'In stage 2 of the epidemiological transition, what causes the death rate to drop sharply?', '在流行病学转变第 2 阶段，死亡率急剧下降的原因是什么？',
    [['Better sanitation, nutrition and medicine reduce pandemics', '卫生、营养和医疗改善使大流行病减少'], ['An increase in heart disease', '心脏病增加'], ['Wars ending everywhere', '各地战争结束'], ['Falling birth rates', '出生率下降']],
    'Stage 2 is "receding pandemics": clean water, vaccines and the Industrial Revolution\'s improvements cut infectious deaths.', '第 2 阶段为"大流行退却期"：清洁水、疫苗和工业革命带来的改善减少了传染病死亡。');
  Q('geo2', 6, 2, 'vocab', 'A person who has fled to another country and is applying for legal protection there, but has not yet been granted refugee status, is a(n):', '逃往他国并申请法律保护、但尚未获得难民身份的人是：',
    [['Asylum seeker', '寻求庇护者'], ['Internally displaced person', '境内流离失所者'], ['Guest worker', '客籍工人'], ['Transhumant herder', '季节性游牧者']],
    'Asylum seekers request protection; if the claim is accepted they become recognized refugees.', '寻求庇护者申请保护，申请获批后才成为被认可的难民。');
  Q('geo2', 7, 4, 'application', 'Which long-term consequences are most associated with China\'s one-child policy (1980–2015)?', '中国独生子女政策（1980–2015）带来的长期后果最主要是哪些？',
    [['A skewed sex ratio, a rapidly aging population and a shrinking workforce', '性别比失衡、人口迅速老龄化和劳动力减少'], ['A sharp rise in the birth rate', '出生率急剧上升'], ['A younger population pyramid with a wide base', '底部宽阔的年轻型人口金字塔'], ['Mass emigration of the elderly', '老年人大规模移民']],
    'Strong son preference produced more males than females; low fertility now means fewer workers supporting more elderly, so China moved to two- and three-child policies.', '强烈的重男轻女导致男多女少；低生育率使劳动人口要供养更多老人，因此中国改为二孩、三孩政策。');
  Q('geo2', 7, 2, 'concept', '"Overpopulation" is best defined as:', '"人口过剩"的最佳定义是：',
    [['A population exceeding the carrying capacity of its area', '人口超过该地区的环境承载力'], ['Any country with more than 100 million people', '人口超过 1 亿的任何国家'], ['A high arithmetic density', '算术密度高'], ['A city larger than 10 million', '人口超过 1000 万的城市']],
    'Overpopulation is relative to resources and technology, not a raw number — a sparsely populated desert can be overpopulated.', '人口过剩是相对于资源和技术而言的，而非绝对数字——人口稀少的沙漠也可能人口过剩。');

  /* ---------- geo3 ---------- */
  Q('geo3', 0, 2, 'concept', 'Which is the best example of folk culture?', '哪一项最能代表民俗文化？',
    [['Handmade Amish quilts passed down within the community', '在阿米什社区内代代相传的手工被子'], ['A global smartphone brand', '全球智能手机品牌'], ['A Hollywood blockbuster', '好莱坞大片'], ['A fast-food chain menu', '快餐连锁菜单']],
    'Folk culture is traditional, handmade, practiced by small homogeneous groups and changes slowly; the others are mass-produced popular culture.', '民俗文化是传统、手工、由小型同质群体实践且变化缓慢的；其他选项都是大量生产的流行文化。');
  Q('geo3', 0, 3, 'concept', 'Critics say malls and fast-food strips make towns everywhere look the same. This loss of local distinctiveness is called:', '批评者说购物中心和快餐街使各地城镇看起来一模一样。这种地方特色的丧失叫做：',
    [['Placelessness', '无地方性'], ['Sequent occupance', '相继占用'], ['Stimulus diffusion', '刺激扩散'], ['Environmental possibilism', '环境可能论']],
    'Popular culture\'s standardized landscapes create placelessness; local folk landscapes are replaced by uniform chains.', '流行文化标准化的景观造成"无地方性"，本地民俗景观被统一的连锁店取代。');
  Q('geo3', 3, 2, 'concept', 'Buddhism began in South Asia but today has the most followers in East and Southeast Asia. Why is it a universalizing religion?', '佛教起源于南亚，今天信徒却主要在东亚和东南亚。为什么它是普世性宗教？',
    [['It seeks converts from all cultures and spread far from its hearth', '它向所有文化传教，并从发源地远播'], ['It is limited to one ethnic group', '它只限于一个民族'], ['It has no founder', '它没有创始人'], ['It is practiced only in India', '它只在印度传播']],
    'Universalizing religions (Buddhism, Christianity, Islam, Sikhism) welcome converts and often relocate far from their hearths.', '普世性宗教（佛教、基督教、伊斯兰教、锡克教）欢迎皈依者，常常远离发源地传播。');
  Q('geo3', 4, 3, 'application', 'Why is Jerusalem a source of recurring conflict?', '为什么耶路撒冷屡屡成为冲突焦点？',
    [['It contains sacred sites for Judaism, Christianity and Islam in a very small area', '在很小的范围内集中了犹太教、基督教和伊斯兰教的圣地'], ['It has no religious significance', '它没有宗教意义'], ['It is a primate city', '它是首位城市'], ['It lies on a natural boundary', '它位于自然边界上']],
    'The Western Wall, the Church of the Holy Sepulchre and the Al-Aqsa Mosque/Dome of the Rock are all in the Old City, so control of space carries deep religious meaning.', '西墙、圣墓教堂和阿克萨清真寺/圆顶清真寺都在老城内，空间控制权因而具有深刻的宗教意义。');
  Q('geo3', 1, 3, 'application', 'A fashion trend starts among teenagers in small towns and is later adopted by designers in major cities. This is:', '一种时尚潮流先在小镇青少年中流行，后来被大城市设计师采用。这是：',
    [['Reverse hierarchical diffusion', '反向等级扩散'], ['Hierarchical diffusion', '等级扩散'], ['Relocation diffusion', '迁移扩散'], ['Stimulus diffusion', '刺激扩散']],
    'Normal hierarchical diffusion goes from large, influential places downward; reverse hierarchical spreads upward from smaller places or lower-status groups (e.g., Walmart, hip-hop).', '一般的等级扩散从大的、有影响力的地方向下传播；反向等级扩散从较小地方或较低阶层向上传播（如沃尔玛、嘻哈）。');
  Q('geo3', 2, 4, 'concept', 'How do the Kurgan and Anatolian hypotheses differ about the spread of Indo-European languages?', '库尔干假说与安纳托利亚假说在印欧语扩散问题上有何不同？',
    [['Kurgan: spread by horse-riding warriors from the steppe; Anatolian: spread peacefully with agriculture from Turkey', '库尔干：由草原骑马武士征服传播；安纳托利亚：随农业从土耳其和平传播'], ['Both say it began in China', '两者都认为起源于中国'], ['Kurgan: spread by trade ships; Anatolian: by colonialism', '库尔干：通过商船；安纳托利亚：通过殖民'], ['They agree on everything except dates', '除年代外完全一致']],
    'Kurgan (Gimbutas) = conquest from the Russian/Ukrainian steppe ~4000 BCE; Anatolian (Renfrew) = diffusion with farming from Anatolia ~7000 BCE.', '库尔干假说（金布塔斯）：约公元前 4000 年从俄罗斯/乌克兰草原征服扩散；安纳托利亚假说（伦弗鲁）：约公元前 7000 年随农业从安纳托利亚扩散。');
  Q('geo3', 6, 2, 'application', 'Vodou in Haiti blends West African religious traditions with Catholic saints. This is an example of:', '海地的伏都教融合了西非宗教传统和天主教圣徒。这属于：',
    [['Syncretism', '文化融合'], ['Assimilation', '同化'], ['Ethnic cleansing', '种族清洗'], ['Universalizing diffusion only', '仅仅是普世扩散']],
    'Syncretism combines elements of two or more cultures into a new form.', '文化融合是把两种或多种文化元素结合成新的形式。');

  /* ---------- geo4 ---------- */
  Q('geo4', 0, 2, 'application', 'The Kurds share a language and culture but live across Turkey, Iraq, Iran and Syria without a state of their own. They are a:', '库尔德人拥有共同语言和文化，却分布在土耳其、伊拉克、伊朗和叙利亚，没有自己的国家。他们是：',
    [['Stateless nation', '无国家民族'], ['Nation-state', '民族国家'], ['Supranational organization', '超国家组织'], ['Microstate', '微型国家']],
    'A nation (shared identity) without its own sovereign state is a stateless nation; Palestinians are another example.', '没有自己主权国家的民族（共同认同群体）称为无国家民族，巴勒斯坦人也是例子。');
  Q('geo4', 0, 2, 'concept', 'Which country is closest to being a nation-state?', '哪个国家最接近民族国家？',
    [['Japan', '日本'], ['Russia', '俄罗斯'], ['Nigeria', '尼日利亚'], ['India', '印度']],
    'Japan is overwhelmingly ethnically Japanese with one main language; Russia, Nigeria and India are multinational states.', '日本绝大多数人口为日本民族、使用一种主要语言；俄罗斯、尼日利亚和印度都是多民族国家。');
  Q('geo4', 1, 2, 'concept', 'What is a typical challenge for an elongated state such as Chile?', '智利这样的狭长型国家通常面临什么挑战？',
    [['Difficulty connecting and governing distant regions', '难以联系和管理遥远的地区'], ['It has no coastline', '没有海岸线'], ['It surrounds another country', '它包围了另一个国家'], ['It is split into many islands', '它被分成许多岛屿']],
    'Long, narrow shapes make transportation, communication and national unity harder, and the far ends may feel isolated from the capital.', '狭长形状使交通、通讯和国家统一更困难，两端地区可能与首都疏离。');
  Q('geo4', 3, 2, 'application', 'Why is a federal system often chosen by large, culturally diverse countries such as Nigeria or India?', '为什么尼日利亚、印度等面积大、文化多元的国家常采用联邦制？',
    [['It gives regions power over local matters, easing tensions between groups', '让各地区掌管地方事务，缓和群体间的紧张关系'], ['It concentrates all power in the capital', '把所有权力集中在首都'], ['It eliminates regional governments', '取消地方政府'], ['It makes all citizens speak one language', '让所有公民说同一种语言']],
    'Federal states share power with states/provinces so diverse groups have some self-government; unitary states centralize power and suit more homogeneous countries.', '联邦制国家与州/省分享权力，使多元群体获得一定自治；单一制国家集中权力，适合同质性较强的国家。');
  Q('geo4', 6, 3, 'concept', 'In gerrymandering, "cracking" means:', '在选区划分不公中，"分散"（cracking）指的是：',
    [['Splitting a group of voters across many districts so they are a minority in each', '把某群选民拆分到多个选区，使他们在每个选区都成为少数'], ['Packing opposing voters into one district', '把对立选民塞进一个选区'], ['Redrawing districts after every election', '每次选举后重新划区'], ['Counting votes by hand', '手工计票']],
    'Cracking dilutes a group\'s voting power; packing concentrates them into a few districts they win by huge margins, wasting votes.', '"分散"稀释某群体的选票影响力；"集中"把他们塞进少数选区以大比分获胜，浪费选票。');
  Q('geo4', 7, 3, 'application', 'Many African countries\' economies still depend on exporting raw materials to former colonial powers. This is a legacy of:', '许多非洲国家的经济仍依赖向前宗主国出口原材料。这是哪种历史遗留？',
    [['Colonialism, which built export economies around cash crops and minerals', '殖民主义——围绕经济作物和矿产建立出口型经济'], ['Devolution', '权力下放'], ['The demographic transition', '人口转变'], ['Central place theory', '中心地理论']],
    'Colonial infrastructure (railways from mines to ports) and trade patterns were built to extract resources, leaving dependent economies.', '殖民时期的基础设施（从矿区通往港口的铁路）和贸易格局为掠夺资源而建，留下了依附型经济。');
  Q('geo4', 7, 4, 'concept', 'Critics describe powerful countries controlling poorer ones through debt, trade rules and corporations, rather than direct rule, as:', '批评者把强国通过债务、贸易规则和跨国公司而非直接统治来控制穷国的现象称为：',
    [['Neocolonialism', '新殖民主义'], ['Irredentism', '民族统一主义'], ['Balkanization', '巴尔干化'], ['Devolution', '权力下放']],
    'Neocolonialism is indirect economic and political influence after formal independence.', '新殖民主义指正式独立后，以经济和政治手段进行的间接控制。');

  /* ---------- geo5 ---------- */
  Q('geo5', 7, 2, 'concept', 'In community-supported agriculture (CSA), consumers:', '在社区支持农业（CSA）中，消费者：',
    [['Pay a local farm in advance for a share of its harvest', '提前向本地农场付款以获得一份收成'], ['Buy only imported food', '只购买进口食品'], ['Work for agribusiness corporations', '为农业综合企业工作'], ['Grow genetically modified crops', '种植转基因作物']],
    'CSA shares the risk between farmer and consumer and shortens supply chains (fewer food miles).', '社区支持农业让农民和消费者共同承担风险，并缩短供应链（减少食物里程）。');
  Q('geo5', 1, 2, 'concept', 'Shifting cultivation (slash-and-burn) is mainly found in:', '迁移农业（刀耕火种）主要分布在：',
    [['Tropical rainforest regions with poor soils', '土壤贫瘠的热带雨林地区'], ['The US Midwest', '美国中西部'], ['Mediterranean vineyards', '地中海葡萄园'], ['Arctic tundra', '北极苔原']],
    'Farmers clear and burn a plot, farm it for a few years until nutrients are exhausted, then move on and let it regrow — subsistence, extensive agriculture.', '农民砍烧一块地，耕种几年直到养分耗尽，再迁往别处让其恢复——属于粗放的自给农业。');
  Q('geo5', 6, 3, 'application', 'A region has enough total food, yet thousands go hungry because of civil war and blocked roads. This shows famine is often caused by:', '某地区粮食总量足够，却因内战和道路封锁导致数千人挨饿。这说明饥荒常常源于：',
    [['Problems of access and distribution, often political', '获取与分配问题，往往是政治原因'], ['A lack of arable land worldwide', '全球耕地不足'], ['Too much rainfall', '降雨过多'], ['The Green Revolution', '绿色革命']],
    'Amartya Sen showed famines usually stem from people losing access (income, transport, conflict) rather than absolute shortage.', '阿马蒂亚·森指出，饥荒多因人们失去获取粮食的能力（收入、交通、冲突），而非绝对短缺。');
  Q('geo5', 0, 2, 'concept', 'The Columbian Exchange brought which crop from the Americas to Europe, where it became a staple?', '哥伦布大交换把哪种美洲作物带到欧洲并成为主食？',
    [['Potatoes', '马铃薯'], ['Wheat', '小麦'], ['Rice', '水稻'], ['Sugarcane', '甘蔗']],
    'Potatoes (Andes), maize and tomatoes went to Afro-Eurasia; wheat, sugarcane, horses and cattle came to the Americas.', '马铃薯（安第斯）、玉米和番茄传到亚非欧；小麦、甘蔗、马和牛被带到美洲。');
  Q('geo5', 3, 3, 'concept', 'Genetically modified (GM) crops are sometimes called a "second Green Revolution." A major concern about them is:', '转基因作物有时被称为"第二次绿色革命"。人们的一个主要担忧是：',
    [['Farmers\' dependence on patented seeds from a few corporations', '农民依赖少数公司的专利种子'], ['They always lower yields', '总是降低产量'], ['They cannot be grown in Asia', '无法在亚洲种植'], ['They require no water at all', '完全不需要水']],
    'GM crops can raise yields and pest resistance, but concerns include seed patents and costs, biodiversity loss and uncertain ecological effects.', '转基因作物能提高产量和抗虫性，但存在种子专利与成本、生物多样性下降和生态影响不确定等担忧。');
  Q('geo5', 5, 2, 'application', 'Narrow strips of farmland stretching back from a river in Quebec reflect which land survey system?', '魁北克从河边向后延伸的狭长农田体现了哪种土地测量制度？',
    [['Long-lot', '长条地块制'], ['Township and range', '镇区-山脉制'], ['Metes and bounds', '界标法'], ['Central place', '中心地']],
    'French settlers gave each farm river access for transport and water, producing long, narrow lots.', '法国殖民者让每块农田都能接触河流以便运输和取水，形成狭长地块。');

  /* ---------- geo6 ---------- */
  Q('geo6', 2, 2, 'concept', 'Why are buildings tallest in the CBD?', '为什么中心商务区的建筑最高？',
    [['Land is most expensive there, so firms build upward to use it intensively', '那里地价最高，企业向高处发展以集约利用土地'], ['Building codes require it', '建筑规范要求如此'], ['Few people work there', '在那里工作的人很少'], ['Land is cheapest there', '那里地价最便宜']],
    'Bid-rent peaks at the center because accessibility is highest; vertical development maximizes return on costly land.', '中心可达性最高，竞租在此达到峰值；向上发展能使昂贵土地获得最大回报。');
  Q('geo6', 1, 2, 'concept', 'In many Latin American and African cities, the largest informal squatter settlements are located:', '在许多拉美和非洲城市，规模最大的非正规棚户区位于：',
    [['On the urban periphery', '城市外围'], ['In the CBD', '中心商务区'], ['Along the elite spine', '精英"脊"带沿线'], ['Inside gated communities', '封闭式社区内']],
    'Rural migrants build homes on unclaimed land at the edge (favelas, barriadas), the reverse of the US pattern where the poor are often in the inner city.', '农村移民在城市边缘的空地上搭建住房（贫民窟），与美国贫困人口多住内城的模式相反。');
  Q('geo6', 3, 3, 'application', 'A concert arena is found only in large cities, while convenience stores are found in every village. In central place theory this is because the arena has a:', '音乐会场馆只在大城市才有，而便利店每个村都有。按中心地理论，这是因为场馆具有：',
    [['Larger threshold and larger range', '更大的门槛和更大的服务范围'], ['Smaller threshold', '更小的门槛'], ['Smaller range', '更小的服务范围'], ['Lower bid rent', '更低的竞租']],
    'High-order services need many customers (threshold) and people will travel far for them (range), so they locate only in high-order central places.', '高级服务需要大量顾客（门槛），人们也愿意远行前往（范围），因此只分布在高级中心地。');
  Q('geo6', 4, 2, 'application', 'Bangkok has more than 5 times the population of Thailand\'s second-largest city. Bangkok is a:', '曼谷人口是泰国第二大城市的 5 倍以上。曼谷是：',
    [['Primate city', '首位城市'], ['Edge city', '边缘城市'], ['Boomburb', '激增型郊区'], ['Rank-size city', '符合位序-规模法则的城市']],
    'A primate city is more than twice as large as the next city and dominates the country\'s economy and culture.', '首位城市的人口是第二大城市的两倍以上，主导国家的经济和文化。');
  Q('geo6', 5, 3, 'concept', 'New urbanism promotes which design?', '新城市主义提倡哪种设计？',
    [['Walkable neighborhoods with mixed housing, shops and parks near transit', '公共交通附近的步行友好社区，混合住宅、商店和公园'], ['Large lots reachable only by car', '只能开车到达的大地块'], ['Strict separation of homes and businesses', '住宅与商业严格分离'], ['Highways through the city center', '穿城而过的高速公路']],
    'New urbanism counters sprawl with compact, mixed-use, pedestrian-friendly communities.', '新城市主义以紧凑、混合用途、适合步行的社区来对抗城市蔓延。');
  Q('geo6', 6, 3, 'concept', 'A common criticism of mid-20th-century US urban renewal projects is that they:', '对 20 世纪中期美国城市更新项目的一个常见批评是：',
    [['Demolished low-income and minority neighborhoods and displaced residents', '拆除了低收入和少数族裔社区，迫使居民迁离'], ['Built too many parks', '修建了太多公园'], ['Lowered property taxes everywhere', '各地降低了房产税'], ['Increased farmland', '增加了农田']],
    'Cities cleared "blighted" areas for highways and public housing towers, often destroying established communities.', '城市以"衰败"为由清理地区修建高速公路和公共住房塔楼，往往摧毁了原有社区。');

  /* ---------- geo7 ---------- */
  Q('geo7', 2, 2, 'concept', 'In Rostow\'s model, the "take-off" stage is marked by:', '在罗斯托模型中，"起飞"阶段的标志是：',
    [['Rapid growth in a few manufacturing industries', '少数制造业的快速增长'], ['Mass consumption of luxury goods', '大量消费奢侈品'], ['Subsistence farming only', '只有自给农业'], ['A shift to a service economy', '转向服务业经济']],
    'Take-off (stage 3) sees investment in a few leading industries such as textiles; high mass consumption is stage 5.', '起飞阶段（第 3 阶段）投资于纺织等少数主导产业；大众高消费是第 5 阶段。');
  Q('geo7', 2, 3, 'concept', 'Which is a major criticism of Rostow\'s stages of growth?', '对罗斯托经济成长阶段论的一个主要批评是什么？',
    [['It assumes every country can follow the path of Western Europe and the US, ignoring colonial history', '假设所有国家都能走西欧和美国的道路，忽视殖民历史'], ['It has too many stages', '阶段太多'], ['It focuses only on agriculture', '只关注农业'], ['It was written by Wallerstein', '它是沃勒斯坦提出的']],
    'Critics (including world-systems theorists) say development is shaped by global relationships; not every country can be a core consumer.', '批评者（包括世界体系论者）认为发展受全球关系影响，并非所有国家都能成为核心消费国。');
  Q('geo7', 5, 2, 'concept', 'Why did many maquiladoras locate in northern Mexico?', '为什么许多马基拉多拉工厂设在墨西哥北部？',
    [['Lower labor costs plus proximity to US markets and duty-free rules', '劳动力成本较低，靠近美国市场且享受免税政策'], ['Mexico has the world\'s highest wages', '墨西哥工资世界最高'], ['To be close to European suppliers', '为了靠近欧洲供应商'], ['Because of abundant rainforest timber', '因为热带雨林木材丰富']],
    'Foreign-owned plants import parts tax-free, assemble them with cheaper labor, and ship products back to the nearby US (NAFTA/USMCA).', '外资工厂免税进口零件，以较低成本的劳动力组装，再把产品运回邻近的美国（北美自贸协定/美墨加协定）。');
  Q('geo7', 5, 3, 'application', 'China created Special Economic Zones like Shenzhen in the 1980s mainly to:', '中国在 1980 年代设立深圳等经济特区，主要目的是：',
    [['Attract foreign investment with tax breaks and looser regulations', '以税收优惠和较宽松的监管吸引外资'], ['Protect farmland from development', '保护农田不被开发'], ['Limit international trade', '限制国际贸易'], ['Relocate the capital', '迁都']],
    'SEZs offered incentives to foreign firms, turning Shenzhen from a fishing town into a manufacturing and tech megacity.', '经济特区为外企提供优惠，使深圳从小渔村发展为制造和科技特大城市。');
  Q('geo7', 4, 3, 'application', 'Brazil and India have large industrial sectors but also widespread poverty. In world-systems theory they are:', '巴西和印度拥有庞大的工业部门，但贫困也很普遍。按世界体系理论，它们属于：',
    [['Semi-periphery', '半边缘'], ['Core', '核心'], ['Periphery', '边缘'], ['Outside the world system', '世界体系之外']],
    'Semi-periphery countries have both core-like (industry, finance) and periphery-like (low wages, raw exports) features and act as a buffer.', '半边缘国家兼具核心特征（工业、金融）和边缘特征（低工资、原料出口），起缓冲作用。');
  Q('geo7', 1, 3, 'concept', 'Many tech firms cluster in Silicon Valley even though land there is expensive. Weber would explain this with:', '许多科技公司聚集在硅谷，尽管那里地价昂贵。韦伯会用什么来解释？',
    [['Agglomeration economies — shared skilled labor, suppliers and ideas', '集聚经济——共享技术劳动力、供应商和创意'], ['Bulk-reducing raw materials', '减重原料'], ['Distance decay of customers', '顾客的距离衰减'], ['Environmental determinism', '环境决定论']],
    'Agglomeration lowers costs and boosts innovation when related firms cluster, outweighing high rents.', '相关企业集聚可降低成本、促进创新，足以抵消高昂的租金。');
})();
