/* StudyLoop — study pet "Loopy" (小圈): earn food by studying, feed it, watch it grow.
 * Original pixel creature: egg → baby → child → teen (glasses) → scholar (graduation cap). */
(function () {
  'use strict';
  var SL = window.SL;
  var esc = SL.esc, L = SL.L, I = SL.ICON;
  var HOUR = 3600000;

  /* ---------- state ---------- */
  function pet() {
    var st = SL.store;
    if (!st.pet || typeof st.pet !== 'object') st.pet = {};
    var p = st.pet;
    if (p.name == null) p.name = SL.L('小圈', 'Loopy');
    if (p.food == null) p.food = 3;           // a few starter apples to hatch the egg
    if (p.earned == null) p.earned = 0;
    if (p.xp == null) p.xp = 0;
    if (p.full == null) p.full = 6;
    if (p.lastTick == null) p.lastTick = Date.now();
    if (p.born == null) p.born = Date.now();
    if (!p.today || p.today.day !== SL.dayKey()) p.today = { day: SL.dayKey(), earned: 0, fed: 0 };
    return p;
  }
  // fullness drops 1 point every 3 hours (0–10); the pet never dies
  function tick() {
    var p = pet(), now = Date.now(), steps = Math.floor((now - p.lastTick) / (3 * HOUR));
    if (steps > 0) { p.full = Math.max(0, p.full - steps); p.lastTick += steps * 3 * HOUR; }
    return p;
  }
  function xpFor(level) { return 30 + level * 10; }     // xp needed to go from level → level+1
  function levelInfo(xp) {
    var lv = 0, need = xpFor(0);
    while (xp >= need) { xp -= need; lv++; need = xpFor(lv); }
    return { level: lv, into: xp, need: need };
  }
  var STAGES = [
    { min: 0, key: 'egg', zh: '蛋', en: 'Egg' },
    { min: 1, key: 'baby', zh: '宝宝', en: 'Baby' },
    { min: 4, key: 'child', zh: '小时候', en: 'Kid' },
    { min: 8, key: 'teen', zh: '少年', en: 'Teen' },
    { min: 13, key: 'adult', zh: '学霸', en: 'Scholar' }
  ];
  function stageOf(level) { var s = STAGES[0]; STAGES.forEach(function (x) { if (level >= x.min) s = x; }); return s; }
  SL.petStage = function () { return stageOf(levelInfo(pet().xp).level); };

  /* earn food — called from the learning engine */
  SL.petEarn = function (n, why) {
    if (!n) return;
    var p = pet();
    p.food += n; p.earned += n; p.today.earned += n;
    SL.save();
    if (why === 'goal' || why === 'mistake') SL.toast('🍎 +' + n + ' · ' + (why === 'goal' ? L('完成今日目标', 'daily goal reached') : L('消灭一道错题', 'mistake fixed')));
  };
  SL.petFood = function () { return pet().food; };

  function feed(times) {
    var p = tick(), fed = 0, before = levelInfo(p.xp).level;
    while (fed < times && p.food > 0 && p.full < 10) { p.food--; p.full++; p.xp += 10; fed++; }
    p.today.fed += fed;
    SL.save();
    var after = levelInfo(p.xp).level;
    return { fed: fed, levelUp: after > before, evolved: stageOf(after).key !== stageOf(before).key, level: after };
  }

  /* ---------- pixel sprite ---------- */
  var PAL = {
    b: '#e9824f', d: '#b9592d', e: '#1f2937', w: '#ffffff', c: '#f6a6a0', m: '#7a2e12', a: '#f2b84b', f: '#b9592d',
    E: '#f7ead0', D: '#c9a46a', S: '#e9824f'          // egg shell, outline, spots
  };
  var GRIDS = {
    egg: [
      '....DDDD....',
      '...DEEEED...',
      '..DEEEEEED..',
      '..DEESSEED..',
      '.DEEEEEEEED.',
      '.DESEEEEEED.',
      '.DEEEEEESED.',
      '.DEEEEEEEED.',
      '.DEEESSEEED.',
      '..DEEEEEED..',
      '...DDDDDD...'
    ],
    baby: [
      '......aaa.....',
      '......a.......',
      '....bbbbbb....',
      '...bbbbbbbb...',
      '..bbbbbbbbbb..',
      '..bbewbbewbb..',
      '..bbeebbeebb..',
      '..bcbbmmbbcb..',
      '..dbbbbbbbbd..',
      '...ddbbbbdd...',
      '....ff..ff....'
    ],
    child: [
      '.......aaa......',
      '.......a........',
      '.....bbbbbb.....',
      '....bbbbbbbb....',
      '...bbbbbbbbbb...',
      '...bbewbbewbb...',
      '...bbeebbeebb...',
      '.b.bcbbmmbbcb.b.',
      '.bbbbbbbbbbbbbb.',
      '...dbbbbbbbbd...',
      '....ddbbbbdd....',
      '....ff....ff....'
    ]
  };
  GRIDS.teen = GRIDS.child; GRIDS.adult = GRIDS.child;
  function cells(grid, filter) {
    var out = '';
    grid.forEach(function (row, y) {
      for (var x = 0; x < row.length; x++) {
        var ch = row[x]; if (ch === '.' || !PAL[ch]) continue;
        if (filter && !filter(ch)) continue;
        out += '<rect x="' + x + '" y="' + y + '" width="1.02" height="1.02" fill="' + PAL[ch] + '"/>';
      }
    });
    return out;
  }
  SL.petSprite = function (stageKey, size, mood) {
    var g = GRIDS[stageKey] || GRIDS.baby, w = g[0].length, h = g.length;
    var isEye = function (ch) { return ch === 'e' || ch === 'w'; };
    var s = '<svg class="pet-svg pet-' + stageKey + (mood === 'hungry' ? ' pet-hungry' : '') + '" viewBox="-1 -3 ' + (w + 2) + ' ' + (h + 4) + '" width="' + size + '" height="' + Math.round(size * (h + 4) / (w + 2)) + '" shape-rendering="crispEdges" role="img" aria-label="pet">';
    s += '<ellipse class="pet-shadow" cx="' + (w / 2) + '" cy="' + (h + 0.4) + '" rx="' + (w * 0.32) + '" ry="0.55" fill="rgba(0,0,0,.14)"/>';
    s += '<g class="pet-body">' + cells(g, function (ch) { return !isEye(ch) && !(stageKey === 'adult' && ch === 'a'); });
    if (stageKey !== 'egg') {
      s += '<g class="pet-eyes">' + cells(g, isEye) + '</g>';
      if (stageKey === 'teen' || stageKey === 'adult') {   // round glasses
        s += '<g fill="none" stroke="#1f2937" stroke-width=".32"><rect x="4.55" y="4.55" width="2.9" height="2.9" rx=".5"/><rect x="8.55" y="4.55" width="2.9" height="2.9" rx=".5"/><path d="M7.45 5.6h1.1"/></g>';
      }
      if (stageKey === 'adult') {                           // graduation cap replaces the antenna curl
        s += '<rect x="6" y="-0.2" width="4" height="0" fill="none"/>' +
          '<path d="M3.5 1.2 L8 -1 L12.5 1.2 L8 3.4 Z" fill="#1e3a8a"/><rect x="5.6" y="1.9" width="4.8" height="1.4" fill="#1e3a8a"/>' +
          '<path d="M8 1.2 L12 1.6 L12 4" fill="none" stroke="#f2b84b" stroke-width=".35"/><rect x="11.6" y="3.8" width=".8" height="1.2" fill="#f2b84b"/>';
      }
    } else {
      s += '<path class="pet-crack" d="M4 5 l1 1 l1 -1 l1 1 l1 -1" fill="none" stroke="#c9a46a" stroke-width=".25" opacity="0"/>';
    }
    return s + '</g></svg>';
  };

  /* ---------- page ---------- */
  var LINES = {
    happy: [['今天也一起学习吧！', 'Let\'s study together today!'], ['吃饱饱，脑子转得快 ✨', 'Full tummy, fast brain ✨'], ['你答对题的样子真帅！', 'You look great when you get it right!'], ['我又长大了一点点～', 'I grew a tiny bit more~']],
    ok: [['有点想吃苹果了…', 'I could go for an apple…'], ['做几道题给我赚点吃的吧！', 'Answer a few questions to earn me some food!'], ['今天复习了吗？', 'Did you review today?']],
    hungry: [['好饿呀……去做几道题吧 🍎', 'So hungry… go answer a few questions 🍎'], ['肚子咕咕叫了', 'My tummy is rumbling'], ['答对一题就有一个苹果哦', 'One right answer = one apple']],
    egg: [['蛋里好像有什么在动……', 'Something is moving inside the egg…'], ['喂它几个苹果，看看会孵出什么！', 'Feed it a few apples and see what hatches!']]
  };
  function pick(arr) { var x = arr[Math.floor(Math.random() * arr.length)]; return L(x[0], x[1]); }

  function renderPet() {
    var p = tick();
    var li = levelInfo(p.xp), stage = stageOf(li.level);
    var mood = stage.key === 'egg' ? 'egg' : p.full >= 7 ? 'happy' : p.full >= 3 ? 'ok' : 'hungry';
    var next = STAGES.filter(function (s) { return s.min > li.level; })[0];
    var goal = SL.store.planner.dailyGoal || 20, today = SL.todayCount();
    var size = { egg: 170, baby: 190, child: 230, teen: 240, adult: 250 }[stage.key];
    var html = '<div class="pet-wrap">' +
      '<div class="card pet-stage-card">' +
      '<div class="row between"><div class="row" style="gap:8px"><h2 class="pet-name">' + esc(p.name) + '</h2><button class="btn ghost sm" data-act="petRename" aria-label="' + esc(L('改名', 'Rename')) + '">✏️</button></div>' +
      '<div class="row" style="gap:6px"><span class="chip pri">' + esc(L(stage.zh, stage.en)) + '</span><span class="chip">Lv ' + li.level + '</span></div></div>' +
      '<div class="pet-bubble" aria-live="polite">' + esc(pick(LINES[mood])) + '</div>' +
      '<button class="pet-stage" data-act="petPoke" aria-label="' + esc(L('摸摸它', 'Pet it')) + '">' + SL.petSprite(stage.key, size, mood) + '<span class="pet-fx" aria-hidden="true"></span></button>' +
      '<div class="grid g2 mt12" style="gap:12px">' +
      '<div><div class="row between xs"><b>' + esc(stage.key === 'egg' ? L('孵化进度', 'Hatching') : L('成长值', 'Growth')) + '</b><span class="faint">' + li.into + ' / ' + li.need + '</span></div><div class="bar mt8"><i style="width:' + Math.round(li.into / li.need * 100) + '%;background:var(--c-main)"></i></div></div>' +
      '<div><div class="row between xs"><b>' + esc(L('饱食度', 'Fullness')) + '</b><span class="faint">' + p.full + ' / 10</span></div><div class="bar mt8"><i class="' + (p.full < 3 ? 'bad' : p.full < 7 ? 'warn' : 'good') + '" style="width:' + p.full * 10 + '%"></i></div></div></div>' +
      '<div class="row mt16" style="justify-content:center">' +
      '<span class="pet-food" title="' + esc(L('食物', 'Food')) + '">🍎 <b>' + p.food + '</b></span>' +
      '<button class="btn primary" data-act="petFeed" data-n="1"' + (p.food && p.full < 10 ? '' : ' disabled') + '>' + esc(L('喂一个', 'Feed one')) + '</button>' +
      '<button class="btn" data-act="petFeed" data-n="99"' + (p.food > 1 && p.full < 9 ? '' : ' disabled') + '>' + esc(L('喂饱它', 'Feed until full')) + '</button></div>' +
      (p.full >= 10 ? '<p class="xs faint mt8" style="text-align:center">' + esc(L('吃饱啦，过几个小时再来喂吧。食物会一直存着。', 'Full! Come back in a few hours — your food is saved.')) + '</p>' :
        !p.food ? '<p class="xs faint mt8" style="text-align:center">' + esc(L('没有食物了：去做题赚苹果吧！', 'Out of food — go earn apples by studying!')) + '</p>' : '') +
      (next ? '<p class="xs muted mt12" style="text-align:center">' + esc(L('Lv ' + next.min + ' 时会进化成「' + next.zh + '」', 'Evolves into "' + next.en + '" at Lv ' + next.min)) + '</p>' : '<p class="xs muted mt12" style="text-align:center">' + esc(L('已经是学霸形态啦 🎓', 'Fully grown scholar 🎓')) + '</p>') +
      '</div>' +

      '<div class="stack">' +
      '<div class="card"><div class="card-head"><h3>' + esc(L('去赚食物', 'Earn food')) + '</h3><span class="xs faint">' + esc(L('今天已赚 ', 'Earned today ')) + '🍎 ' + p.today.earned + '</span></div>' +
      '<div class="stack" style="gap:8px">' +
      '<button class="btn primary block" data-act="petStudy" style="justify-content:space-between"><span>' + I.target + ' ' + esc(L('今日智能练习', 'Smart practice')) + '</span><span class="xs">' + esc(L('答对 1 题 = 🍎1', '1 correct = 🍎1')) + '</span></button>' +
      '<a class="btn block" href="#/review" style="justify-content:space-between"><span>' + I.repeat + ' ' + esc(L('今日复习 / 错题', 'Review & mistakes')) + '</span><span class="xs">' + esc(L('消灭错题 = 🍎3', 'Fix a mistake = 🍎3')) + '</span></a>' +
      '<a class="btn block" href="#/kb/review?mode=due" style="justify-content:space-between"><span>' + I.book + ' ' + esc(L('知识点回忆', 'Topic recall')) + '</span><span class="xs">' + esc(L('记得 = 🍎1', 'Remembered = 🍎1')) + '</span></a>' +
      '<a class="btn block" href="#/flashcards" style="justify-content:space-between"><span>' + I.cards + ' ' + esc(L('闪卡', 'Flashcards')) + '</span><span class="xs">' + esc(L('认识 = 🍎1', 'Known = 🍎1')) + '</span></a></div>' +
      '<div class="mt12"><div class="row between xs"><b>' + esc(L('今日目标', 'Daily goal')) + '</b><span class="faint">' + Math.min(today, goal) + ' / ' + goal + (p.goalDay === SL.dayKey() ? ' ✓' : ' · ' + L('完成奖励 🍎5', 'bonus 🍎5')) + '</span></div><div class="bar mt8"><i class="good" style="width:' + Math.min(100, Math.round(today / goal * 100)) + '%"></i></div></div></div>' +

      '<div class="card"><div class="card-head"><h3>' + esc(L('成长图鉴', 'Growth stages')) + '</h3></div><div class="pet-dex">' +
      STAGES.map(function (s) {
        var got = li.level >= s.min;
        return '<div class="pet-dex-item' + (got ? '' : ' locked') + '">' + SL.petSprite(s.key, 54) + '<div class="xs bold">' + esc(L(s.zh, s.en)) + '</div><div class="xs faint">Lv ' + s.min + '</div></div>';
      }).join('') + '</div>' +
      '<div class="row between xs faint mt12"><span>' + esc(L('累计获得 ', 'Total earned ')) + '🍎 ' + p.earned + '</span><span>' + esc(L('相伴 ', 'Together ')) + Math.max(1, Math.ceil((Date.now() - p.born) / SL.DAY)) + esc(L(' 天', ' days')) + '</span></div></div>' +
      '<a class="card row between" href="#/dashboard" style="display:flex"><div><div class="bold">' + esc(L('学习概览', 'Study overview')) + '</div><div class="small muted">' + esc(L('课程进度、今日任务、薄弱知识点', 'Course progress, tasks, weak topics')) + '</div></div><span>→</span></a>' +
      '</div></div>';
    return { title: L('我的宠物', 'My pet'), html: html };
  }

  SL.act('petFeed', function (el) {
    var r = feed(parseInt(el.getAttribute('data-n'), 10) || 1);
    if (!r.fed) return;
    if (r.evolved) {
      var st = stageOf(r.level);
      SL.toast(r.level === 1 ? '🐣 ' + L('孵化啦！', 'It hatched!') : '✨ ' + L('进化成「' + st.zh + '」了！', 'Evolved into "' + st.en + '"!'));
    } else if (r.levelUp) SL.toast('⬆️ ' + L('升到 Lv ' + r.level + ' 了！', 'Reached Lv ' + r.level + '!'));
    SL.rerender();
    var stage = document.querySelector('.pet-stage'); if (stage) { stage.classList.remove('pet-eat'); void stage.offsetWidth; stage.classList.add('pet-eat'); }
    fx('🍎');
  });
  SL.act('petPoke', function () {
    var stage = document.querySelector('.pet-stage'); if (!stage) return;
    stage.classList.remove('pet-jump'); void stage.offsetWidth; stage.classList.add('pet-jump');
    fx(SL.petStage().key === 'egg' ? '✨' : '💗');
    var b = document.querySelector('.pet-bubble'); var p = tick();
    if (b) b.textContent = pick(LINES[SL.petStage().key === 'egg' ? 'egg' : p.full >= 7 ? 'happy' : p.full >= 3 ? 'ok' : 'hungry']);
  });
  function fx(ch) {
    var host = document.querySelector('.pet-fx'); if (!host) return;
    var s = document.createElement('span'); s.textContent = ch; s.style.left = (35 + Math.random() * 30) + '%';
    host.appendChild(s); setTimeout(function () { s.remove(); }, 1000);
  }
  SL.act('petRename', function () {
    var p = pet();
    SL.modal('<h3>' + esc(L('给宠物起个名字', 'Name your pet')) + '</h3><input class="input" id="petName" maxlength="12" value="' + esc(p.name) + '">' +
      '<div class="row mt16" style="justify-content:flex-end"><button class="btn" data-act="closeModal">' + esc(L('取消', 'Cancel')) + '</button><button class="btn primary" id="petNameOk">' + esc(L('保存', 'Save')) + '</button></div>', function (m) {
      var save = function () { var v = m.querySelector('#petName').value.trim(); if (v) { p.name = v.slice(0, 12); SL.save(); } SL.closeModal(); SL.rerender(); };
      m.querySelector('#petNameOk').addEventListener('click', save);
      m.querySelector('#petName').addEventListener('keydown', function (e) { if (e.key === 'Enter') save(); });
    });
  });
  SL.act('petStudy', function () { SL.startDaily(); });

  SL.route(/^\/$/, renderPet);
})();
