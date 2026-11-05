/* StudyLoop bank — unified question schema, topic classification, difficulty, pools, quality checks */
(function () {
  'use strict';
  var SL = window.SL;

  var SUBJECTS = [window.SUBJECT_GEO, window.SUBJECT_BIO, window.SUBJECT_PRECALC].filter(Boolean);
  SL.SUBJECTS = SUBJECTS;
  SL.subject = function (id) { return SUBJECTS.filter(function (s) { return s.id === id; })[0] || null; };
  var UNIT_INDEX = {};
  SUBJECTS.forEach(function (s) { s.units.forEach(function (u, i) { UNIT_INDEX[u.id] = { s: s, u: u, i: i }; }); });
  SL.unit = function (id) { return UNIT_INDEX[id] ? UNIT_INDEX[id].u : null; };
  SL.subjectOfUnit = function (id) { return UNIT_INDEX[id] ? UNIT_INDEX[id].s : null; };
  SL.topicName = function (unitId, tp) {
    var u = SL.unit(unitId);
    if (!u || tp == null || tp < 0 || !u.topics[tp]) return SL.L('综合', 'General');
    return SL.t(u.topics[tp]);
  };
  SL.topicNameEn = function (unitId, tp) { var u = SL.unit(unitId); return u && tp >= 0 && u.topics[tp] ? u.topics[tp].en : 'General'; };
  SL.topicKey = function (unitId, tp) { return unitId + ':' + (tp == null ? -1 : tp); };
  SL.parseTopicKey = function (k) { var p = String(k).split(':'); return { u: p[0], tp: parseInt(p[1], 10) }; };

  SL.DIFF = {
    1: { zh: '简单', en: 'Easy' },
    2: { zh: '中等', en: 'Medium' },
    3: { zh: '困难', en: 'Hard' },
    4: { zh: 'AP 难度', en: 'AP Level' }
  };
  SL.TAGS = {
    vocab: { zh: '概念词汇', en: 'Vocabulary' },
    concept: { zh: '概念理解', en: 'Concept' },
    application: { zh: '应用', en: 'Application' },
    calculation: { zh: '计算', en: 'Calculation' },
    diagram: { zh: '图示识别', en: 'Diagram' },
    data: { zh: '数据分析', en: 'Data analysis' },
    experiment: { zh: '实验题', en: 'Experimental' },
    map: { zh: '地图/图表分析', en: 'Map & chart' },
    frq: { zh: 'FRQ 简答', en: 'FRQ' },
    draw: { zh: '画图题', en: 'Drawing' }
  };

  /* ---------- topic classifier (keyword overlap within a unit) ---------- */
  var STOP = ('a an the of and or vs to in on for by with is are be as at from that this which what how why its it their than into your you do does ' +
    'between about most best following true false not no each per one two three after before during when where who all any can will would ' +
    'type types models model theory example factors rate & , . ? ! ( ) : / - ↔ — · unit').split(' ');
  var STOPSET = {}; STOP.forEach(function (w) { STOPSET[w] = 1; });
  function stem(w) {
    if (w.length > 5 && /ies$/.test(w)) return w.slice(0, -3) + 'y';
    if (w.length > 5 && /(sses|shes|ches|xes)$/.test(w)) return w.slice(0, -2);
    if (w.length > 3 && /s$/.test(w) && !/ss$/.test(w) && !/is$/.test(w) && !/us$/.test(w)) return w.slice(0, -1);
    if (w.length > 6 && /ing$/.test(w)) return w.slice(0, -3);
    if (w.length > 6 && /ed$/.test(w)) return w.slice(0, -2);
    return w;
  }
  function tokens(text) {
    var out = [];
    String(text || '').toLowerCase().replace(/[^a-z0-9αβγθπ²³⁻⁺ᴬᵃ]+/g, ' ').split(' ').forEach(function (w) {
      if (!w || STOPSET[w] || w.length < 2) return;
      out.push(stem(w));
    });
    return out;
  }
  // extra hint words per topic (helps short topic names); keyed by unitId -> topicIdx -> words
  var HINTS = {
    geo1: { 0: 'mercator robinson projection distort', 1: 'thematic choropleth isoline dot reference', 2: 'scale large small', 3: 'formal functional perceptual vernacular region', 4: 'site situation', 5: 'decay compression friction', 6: 'determinism possibilism', 7: 'density concentration pattern clustered dispersed arithmetic physiological agricultural' },
    geo2: { 0: 'dtm stage transition', 1: 'pyramid', 2: 'cbr cdr nir doubling birth death natural increase', 3: 'malthus boserup', 4: 'epidemiological disease', 5: 'ravenstein push pull', 6: 'refugee forced voluntary chain step guest', 7: 'carrying capacity policy antinatalist pronatalist' },
    geo3: { 0: 'folk popular', 1: 'contagious hierarchical stimulus relocation diffusion expansion', 2: 'language family indo european dialect lingua franca', 3: 'religion universalizing ethnic christianity islam buddhism hinduism judaism', 4: 'sacred landscape', 5: 'ethnicity race identity', 6: 'acculturation assimilation syncretism', 7: 'appropriation globalization' },
    geo4: { 0: 'nation state stateless', 1: 'compact elongated fragmented perforated prorupted landlocked shape', 2: 'boundary antecedent subsequent superimposed relic geometric', 3: 'federal unitary', 4: 'supranational eu un nato', 5: 'devolution separatism balkanization', 6: 'gerrymandering electoral redistricting', 7: 'colonialism imperialism' },
    geo5: { 0: 'hearth domesticated fertile crescent', 1: 'subsistence commercial intensive extensive shifting pastoral', 2: 'thünen thunen ring', 3: 'green revolution hybrid', 4: 'plantation cash crop', 5: 'survey metes bounds township range long lot', 6: 'food security famine desert', 7: 'organic local sustainable' },
    geo6: { 0: 'burgess hoyt harris ullman concentric sector multiple nuclei', 1: 'latin american african griffin ford', 2: 'cbd bid rent', 3: 'central place christaller threshold range', 4: 'megacity primate rank size', 5: 'sprawl smart zoning', 6: 'gentrification renewal', 7: 'global city world' },
    geo7: { 0: 'industrial revolution', 1: 'weber least cost', 2: 'rostow take off ladder', 3: 'hdi gii gdp gni', 4: 'core periphery wallerstein semi', 5: 'outsourcing offshoring maquiladora', 6: 'women microloan microcredit', 7: 'sustainable energy renewable' },
    bio1: { 0: 'prokaryote prokaryotic eukaryote eukaryotic bacteria', 1: 'organelle mitochondria chloroplast', 2: 'plant animal wall', 4: 'cell theory', 5: 'endosymbiotic', 6: 'nucleus ribosome er golgi', 7: 'lysosome vacuole' },
    bio2: { 0: 'fluid mosaic phospholipid bilayer', 1: 'facilitated channel simple diffusion', 2: 'osmosis tonicity semipermeable solute', 3: 'active pump atp gradient', 4: 'endocytosis exocytosis phagocytosis', 5: 'surface area volume', 6: 'turgor plasmolysis', 7: 'hypotonic isotonic hypertonic distilled saline swell burst' },
    bio3: { 0: 'water hydrogen cohesion adhesion polar', 1: 'monomer polymer', 2: 'dehydration hydrolysis', 3: 'carbohydrate lipid protein nucleic', 4: 'enzyme activation', 5: 'ph acid base buffer', 6: 'primary secondary tertiary quaternary', 7: 'carbon' },
    bio4: { 0: 'equation chloroplast stroma thylakoid', 1: 'light dependent', 2: 'calvin rubisco', 3: 'pigment chlorophyll absorption spectrum', 4: 'rate intensity', 5: 'c4 cam', 6: 'chemiosmosis', 7: 'photosystem' },
    bio5: { 0: 'glycolysis', 1: 'krebs citric', 2: 'electron transport synthase', 3: 'fermentation lactic alcoholic', 4: 'atp coupling', 5: 'oxygen acceptor', 6: 'total atp', 7: 'inhibition inhibitor kinetics competitive' },
    bio6: { 0: 'interphase prophase metaphase anaphase telophase', 1: 'cytokinesis cell plate furrow', 2: 'checkpoint cyclin cancer', 3: 'mitosis', 4: 'meiosis', 5: 'crossing independent assortment', 6: 'haploid diploid gamete', 7: 'nondisjunction karyotype' },
    bio7: { 0: 'double helix base pair', 1: 'replication semiconservative', 2: 'transcription intron exon', 3: 'translation', 4: 'codon trna anticodon', 5: 'mutation frameshift point', 6: 'operon regulation', 7: 'pcr gel electrophoresis' },
    bio8: { 0: 'mendel segregation', 1: 'monohybrid dihybrid', 2: 'punnett test cross', 3: 'incomplete codominance', 4: 'blood ia ib', 5: 'sex linked x', 6: 'pedigree', 7: 'probability' },
    bio9: { 0: 'darwin lamarck', 1: 'variation heritable', 2: 'homologous analogous vestigial', 3: 'hardy weinberg', 4: 'directional stabilizing disruptive', 5: 'drift bottleneck founder', 6: 'speciation isolation', 7: 'fitness sexual' },
    bio10: { 0: 'trophic 10', 1: 'food web keystone', 2: 'nitrogen carbon cycle', 3: 'exponential logistic growth', 4: 'mutualism commensalism parasitism predation competition', 5: 'succession', 6: 'pyramid', 7: 'human conservation' },
    pc1: { 0: 'domain range', 1: 'composition', 2: 'transformation shift reflect stretch', 3: 'even odd', 4: 'inverse', 5: 'vertex quadratic', 6: 'average rate', 7: 'difference quotient' },
    pc2: { 0: 'end behavior leading', 1: 'zero multiplicity factor', 2: 'vertical horizontal asymptote', 3: 'slant oblique', 4: 'rational graph', 5: 'extraneous', 6: 'build polynomial', 7: 'hole' },
    pc3: { 0: 'growth decay', 1: 'log solve', 2: 'change base', 3: 'compound interest continuous', 4: 'half life', 5: 'ln natural', 6: 'ph richter scale', 7: 'inverse' },
    pc4: { 0: 'unit circle', 1: 'radian degree', 2: 'period graph', 3: 'amplitude midline', 4: 'quadrant astc sign', 5: 'arc length', 6: 'evaluate sin cos tan', 7: 'csc sec cot reciprocal' },
    pc5: { 0: 'pythagorean identity', 1: 'solve equation', 2: 'double angle', 3: 'law sines', 4: 'law cosines', 5: 'ambiguous ssa', 6: 'sum difference', 7: 'verify identity' },
    pc6: { 0: 'magnitude direction', 1: 'component', 2: 'dot product orthogonal', 3: 'polar rectangular', 4: 'moivre', 5: 'parametric', 6: 'resultant navigation', 7: 'polar graph rose cardioid' },
    pc7: { 0: 'system linear', 1: 'matrix dimension multiply', 2: 'inverse', 3: 'determinant', 4: 'cramer', 5: 'consistent inconsistent', 6: 'row reduction gaussian', 7: 'word problem' },
    pc8: { 0: 'arithmetic', 1: 'geometric', 2: 'infinite', 3: 'sigma', 4: 'recursive', 5: 'converge', 6: 'repeating decimal', 7: 'model' },
    pc9: { 0: 'circle complete square', 1: 'parabola focus directrix', 2: 'ellipse foci eccentricity', 3: 'hyperbola', 4: 'classify general form', 5: 'discriminant', 6: 'orbit', 7: 'physics' }
  };
  var TOPIC_TOKENS = {};
  function topicTokens(unitId) {
    if (TOPIC_TOKENS[unitId]) return TOPIC_TOKENS[unitId];
    var u = SL.unit(unitId);
    var list = (u ? u.topics : []).map(function (t, i) {
      var words = tokens(t.en + ' ' + ((HINTS[unitId] || {})[i] || ''));
      var set = {}; words.forEach(function (w) { set[w] = 1; });
      return set;
    });
    TOPIC_TOKENS[unitId] = list;
    return list;
  }
  // manual topic assignments for items the keyword matcher cannot place (matched by English stem prefix)
  var OVERRIDES = [
    ['Physiological density differs', 7], ['Why did traditional Fordist', 0], ['A carrier mother (X', 5],
    ['If f(x) = 2x + 1 and g(x)', 1], ['A ball is thrown with height', 5], ['Simplify (1 − cos²θ)', 0],
    ['If sin θ = 3/5 and cos θ = 4/5', 2], ['Eliminate the parameter', 5], ['Solve: 2x + y = 7', 0],
    ['Movie tickets:', 7], ['Evaluate Σ', 3]
  ];
  function classifyTopic(unitId, q) {
    var stemEn = (q.q && q.q.en) || '';
    for (var oi = 0; oi < OVERRIDES.length; oi++) if (stemEn.indexOf(OVERRIDES[oi][0]) === 0) return OVERRIDES[oi][1];
    var list = topicTokens(unitId);
    if (!list.length) return -1;
    var qt = tokens(q.q && q.q.en);
    var et = tokens(q.e && q.e.en);
    var ot = []; (q.o || []).forEach(function (o) { ot = ot.concat(tokens(o && o.en)); });
    var best = -1, bestScore = 0;
    list.forEach(function (set, i) {
      var sc = 0;
      qt.forEach(function (w) { if (set[w]) sc += 3; });
      ot.forEach(function (w) { if (set[w]) sc += 1.5; });
      et.forEach(function (w) { if (set[w]) sc += 1; });
      if (sc > bestScore) { bestScore = sc; best = i; }
    });
    return bestScore >= 2 ? best : -1;
  }
  SL.classifyTopic = classifyTopic;

  /* suggest the best unit + topic in a course for free text (English keywords + Chinese topic-name bigrams) */
  SL.suggestTopic = function (sid, text) {
    var s = SL.subject(sid); if (!s || !text) return null;
    var raw = String(text), tk = {}; tokens(text).forEach(function (w) { tk[w] = 1; });
    var docs = [];
    s.units.forEach(function (u) {
      topicTokens(u.id).forEach(function (set, i) {
        var zh = (u.topics[i].zh || '').replace(/[^\u4e00-\u9fff]/g, ''), bg = {};
        for (var k = 0; k + 2 <= zh.length; k++) bg[zh.slice(k, k + 2)] = 1;
        docs.push({ u: u.id, tp: i, en: set, zh: bg });
      });
    });
    // inverse document frequency: words shared by many topics (cell, function, 细胞) count little
    var df = {};
    docs.forEach(function (d) { Object.keys(d.en).forEach(function (w) { df['e' + w] = (df['e' + w] || 0) + 1; }); Object.keys(d.zh).forEach(function (w) { df['z' + w] = (df['z' + w] || 0) + 1; }); });
    var best = null;
    docs.forEach(function (d) {
      var sc = 0;
      Object.keys(tk).forEach(function (w) { if (d.en[w]) sc += 3 / df['e' + w]; });
      Object.keys(d.zh).forEach(function (w) { if (raw.indexOf(w) !== -1) sc += 3 / df['z' + w]; });
      if (!best || sc > best.score) best = { u: d.u, tp: d.tp, score: Math.round(sc * 100) / 100 };
    });
    return best && best.score >= 1 ? best : null;
  };


  /* ---------- difficulty estimate ---------- */
  function estimateDifficulty(q) {
    if (q.t === 'frq' || q.t === 'draw') return 4;
    var len = ((q.q && q.q.en) || '').length;
    var d = 2;
    if (q.t === 'vocab') d = 1;
    else if (q.t === 'concept') d = len > 110 ? 3 : 2;
    else if (q.t === 'application') d = len > 120 || q.svg ? 3 : 2;
    else if (q.t === 'calculation') d = len > 90 ? 3 : 2;
    else if (q.t === 'data' || q.t === 'experiment') d = 3;
    else if (q.t === 'diagram' || q.t === 'map') d = 2;
    return d;
  }
  SL.estimateDifficulty = estimateDifficulty;

  /* ---------- generator → unit/topic map (index order of window.GENERATORS[subject]) ---------- */
  var GEN_MAP = {
    geo: [['geo2', 2], ['geo2', 0], ['geo2', 1], ['geo5', 2], ['geo5', 0], ['geo4', 1], ['geo3', 1], ['geo7', 2], ['geo3', 3], ['geo2', 2]],
    bio: [['bio8', 1], ['bio9', 3], ['bio8', 1], ['bio10', 0], ['bio6', 6], ['bio8', 4], ['bio7', 4], ['bio8', 5], ['bio2', -1], ['bio8', 7]],
    precalc: [['pc3', 1], ['pc1', 0], ['pc1', 4], ['pc6', 0], ['pc8', 1], ['pc4', 6], ['pc8', 0], ['pc7', 3], ['pc8', 2], ['pc3', 1], ['pc4', 2], ['pc1', 2]]
  };
  SL.GEN_MAP = GEN_MAP;

  /* ---------- normalize ---------- */
  function normalize(raw, meta) {
    if (!raw || !raw.q) return null;
    var q = {
      s: meta.s, u: meta.u,
      tag: raw.t || 'concept',
      type: raw.t === 'frq' ? 'frq' : raw.t === 'draw' ? 'draw' : 'mcq',
      q: raw.q, o: raw.o, a: raw.a == null ? 0 : raw.a, e: raw.e, svg: raw.svg,
      points: raw.points, rubric: raw.rubric, refSvg: raw.refSvg, img: raw.img, myAns: raw.myAns,
      src: meta.src || 'bank', createdAt: raw.createdAt || meta.createdAt || 0,
      gen: meta.gen
    };
    if (typeof q.q === 'string') q.q = { en: q.q, zh: q.q };
    if (q.e && typeof q.e === 'string') q.e = { en: q.e, zh: q.e };
    if (q.o) q.o = q.o.map(function (o) { return typeof o === 'string' ? { en: o, zh: o } : o; });
    q.tp = meta.tp != null && meta.tp >= 0 ? meta.tp : (raw.tp != null ? raw.tp : classifyTopic(q.u, q));
    var dRaw = raw.d || raw.difficulty;
    var dMap = { easy: 1, medium: 2, hard: 3, ap: 4 };
    q.d = typeof dRaw === 'number' ? SL.clamp(dRaw, 1, 4) : (dMap[String(dRaw || '').toLowerCase()] || estimateDifficulty(raw));
    q.dEst = !dRaw;
    q.id = raw.id || ((meta.src === 'gen' ? 'g' : meta.src === 'bank' ? 'b' : 'p') + SL.hash(q.s + '|' + q.u + '|' + (q.q.en || q.q.zh)));
    return q;
  }
  SL.normalize = normalize;

  /* ---------- static index ---------- */
  var BANK = [];   // static + extras
  var BYID = {};
  function addToIndex(q) { if (q && !BYID[q.id]) { BANK.push(q); BYID[q.id] = q; } }
  SUBJECTS.forEach(function (s) {
    s.units.forEach(function (u) {
      (u.questions || []).forEach(function (raw) { addToIndex(normalize(raw, { s: s.id, u: u.id, src: 'bank' })); });
    });
    (window.FRQ && window.FRQ[s.id] || []).forEach(function (raw) { addToIndex(normalize(raw, { s: s.id, u: raw.unit, src: 'bank' })); });
    (window.DRAW && window.DRAW[s.id] || []).forEach(function (raw) { addToIndex(normalize(raw, { s: s.id, u: raw.unit, src: 'bank' })); });
  });
  (window.EXTRA_BANK || []).forEach(function (raw) {
    var s = SL.subjectOfUnit(raw.unit);
    if (s) addToIndex(normalize(raw, { s: s.id, u: raw.unit, src: 'bank' }));
  });
  SL.BANK = BANK;

  function packQuestions() {
    return (SL.store.packs || []).map(function (raw) {
      var s = SL.subjectOfUnit(raw.unit || raw.u);
      if (!s) return null;
      var n = normalize(raw, { s: s.id, u: raw.unit || raw.u, src: raw.src === 'ai' || raw.src === 'mine' ? raw.src : 'pack', createdAt: raw.createdAt });
      if (n) BYID[n.id] = BYID[n.id] || n;
      return n;
    }).filter(Boolean);
  }
  SL.packQuestions = packQuestions;

  SL.generate = function (subjectId, gi, extraUnitFilter) {
    var gens = (window.GENERATORS && window.GENERATORS[subjectId]) || [];
    var g = gens[gi]; if (!g) return null;
    var raw; try { raw = g(); } catch (e) { return null; }
    if (!raw || !raw.q || !raw.o || raw.o.length < 2) return null;
    var map = (GEN_MAP[subjectId] || [])[gi] || [null, -1];
    var u = map[0] || (SL.subject(subjectId).units[0].id);
    var q = normalize(raw, { s: subjectId, u: u, tp: map[1], src: 'gen', gen: gi });
    if (q) BYID[q.id] = q;
    return q;
  };
  SL.generatorsFor = function (subjectId, unitIds) {
    var out = [];
    (GEN_MAP[subjectId] || []).forEach(function (m, i) { if (!unitIds || unitIds.indexOf(m[0]) !== -1) out.push(i); });
    // include any generators added beyond the map (unknown unit) only for whole-subject pools
    var gens = (window.GENERATORS && window.GENERATORS[subjectId]) || [];
    for (var i = (GEN_MAP[subjectId] || []).length; i < gens.length; i++) if (!unitIds) out.push(i);
    return out;
  };

  SL.byId = function (id) { return BYID[id] || null; };
  SL.remember = function (q) { if (q && q.id) BYID[q.id] = q; };

  /**
   * Build a candidate pool.
   * opts: {subject, units[], topics[] (keys), diffs[], types[] ('mcq','frq','draw'), tags[], genPer (variants per generator), includeGen}
   */
  SL.buildPool = function (opts) {
    opts = opts || {};
    var units = opts.units && opts.units.length ? opts.units : null;
    var subj = opts.subject || null;
    var all = BANK.concat(packQuestions());
    if (opts.includeGen !== false) {
      var subs = subj ? [subj] : SUBJECTS.map(function (s) { return s.id; });
      subs.forEach(function (sid) {
        SL.generatorsFor(sid, units).forEach(function (gi) {
          var per = opts.genPer == null ? 3 : opts.genPer, tries = 0, seen = {};
          for (var k = 0; k < per && tries < per * 4; tries++) {
            var q = SL.generate(sid, gi);
            if (q && !seen[q.id]) { seen[q.id] = 1; all.push(q); k++; }
          }
        });
      });
    }
    var seenIds = {};
    return all.filter(function (q) {
      if (!q || seenIds[q.id]) return false; seenIds[q.id] = 1;
      if (subj && q.s !== subj) return false;
      if (units && units.indexOf(q.u) === -1) return false;
      if (opts.topics && opts.topics.length && opts.topics.indexOf(SL.topicKey(q.u, q.tp)) === -1) return false;
      if (opts.diffs && opts.diffs.length && opts.diffs.indexOf(q.d) === -1) return false;
      if (opts.types && opts.types.length && opts.types.indexOf(q.type) === -1) return false;
      if (opts.tags && opts.tags.length && q.type === 'mcq' && opts.tags.indexOf(q.tag) === -1) return false;
      return true;
    });
  };

  /* ---------- option shuffling (fixes original bug: correct answer was always A) ---------- */
  SL.makePerm = function (q) {
    if (!q || !q.o) return null;
    var idx = q.o.map(function (_, i) { return i; });
    // keep "all/none of the above" style options last
    var tail = idx.filter(function (i) { return /\b(all|none|both) of the above\b|以上都/i.test((q.o[i].en || '') + (q.o[i].zh || '')); });
    var body = SL.shuffle(idx.filter(function (i) { return tail.indexOf(i) === -1; }));
    return body.concat(tail);
  };

  /* ---------- quality checks ---------- */
  SL.qualityReport = function () {
    var issues = [];
    var texts = {};
    var all = BANK.concat(packQuestions());
    all.forEach(function (q) {
      var where = q.u + ' · ' + ((q.q.en || q.q.zh || '').slice(0, 60));
      function add(kind, msg) { issues.push({ kind: kind, id: q.id, where: where, msg: msg, src: q.src }); }
      var key = (q.q.en || q.q.zh || '').trim().toLowerCase().replace(/\s+/g, ' ');
      if (texts[key]) add('dup', SL.L('重复题目（与 ' + texts[key] + ' 相同）', 'Duplicate of ' + texts[key])); else texts[key] = q.id;
      if (!q.q.en || !q.q.zh) add('lang', SL.L('题干缺少中文或英文', 'Stem missing a language'));
      if (q.type === 'mcq') {
        if (!q.o || q.o.length < 2) add('answer', SL.L('选项少于 2 个', 'Fewer than 2 options'));
        else {
          if (!(q.a >= 0 && q.a < q.o.length)) add('answer', SL.L('正确答案下标无效', 'Correct-answer index invalid'));
          var os = {}; q.o.forEach(function (o) { var k = (o.en || '').trim().toLowerCase(); if (os[k]) add('answer', SL.L('存在重复选项', 'Duplicate options')); os[k] = 1; });
          if (q.o.some(function (o) { return !o || !o.en || !o.zh; })) add('lang', SL.L('有选项缺少中文或英文', 'An option is missing a language'));
        }
        if (!q.e || !(q.e.en || q.e.zh)) add('explain', SL.L('缺少解析', 'Missing explanation'));
        else if (q.o && q.o[q.a] && q.e.en && /^\d/.test(q.o[q.a].en || '') && q.e.en.indexOf(String(q.o[q.a].en).replace(/\s/g, '').slice(0, 6)) === -1 && q.tag === 'calculation') {
          add('explain', SL.L('解析中未出现正确答案数值，请人工核对', 'Explanation never states the answer value — review manually'));
        }
      }
      if (q.type === 'frq' && (!q.points || !q.points.length)) add('answer', SL.L('FRQ 缺少评分标准', 'FRQ has no rubric'));
      if (q.tp < 0) add('topic', SL.L('无法自动归入知识点（记为「综合」）', 'Could not auto-assign a topic (counted as General)'));
      if (q.type === 'mcq' && q.tag === 'vocab' && q.d >= 3) add('diff', SL.L('词汇题被标为困难，难度可能不合理', 'Vocab item marked hard — check difficulty'));
    });
    return { total: all.length, issues: issues };
  };

  SL.bankStats = function (subjectId) {
    var n = 0, frq = 0, draw = 0;
    BANK.forEach(function (q) { if (q.s === subjectId) { n++; if (q.type === 'frq') frq++; if (q.type === 'draw') draw++; } });
    return { n: n, frq: frq, draw: draw, gens: ((window.GENERATORS || {})[subjectId] || []).length };
  };
})();
