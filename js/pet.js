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
  /* ---------- time away ---------- */
  var DAY = SL.DAY;
  (function trackVisit() {
    var st = SL.store, now = Date.now();
    SL.awayMs = st.lastVisit ? now - st.lastVisit : null;       // null = first visit ever
    SL.prevGreet = st.lastGreet;
    st.lastVisit = now;
    var p = pet();
    var hatched = p.xp >= xpFor(0);
    if (SL.awayMs != null && SL.awayMs >= 30 * DAY && hatched) { p.dead = true; p.full = 0; p.revive = 0; }
    SL.save();
    function stamp() { SL.store.lastVisit = Date.now(); SL.save(true); }
    document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'hidden') stamp(); });
    window.addEventListener('pagehide', stamp);
  })();

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

  function moodOf(p, stageKey) {
    if (stageKey === 'egg') return 'egg';
    if (p.dead) return 'dead';
    if (p.full <= 0) return 'starving';
    if (p.full < 3) return 'hungry';
    if (p.full < 7) return 'ok';
    return 'happy';
  }
  SL.petMood = function () { var p = tick(); return moodOf(p, stageOf(levelInfo(p.xp).level).key); };

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
    var p = tick(), fed = 0, before = levelInfo(p.xp).level, revived = false;
    while (fed < times && p.food > 0 && p.full < 10) {
      p.food--; fed++;
      if (p.dead) { p.revive = (p.revive || 0) + 1; if (p.revive >= 3) { p.dead = false; p.revive = 0; p.full = 3; revived = true; } continue; }
      p.full++; p.xp += 10;
    }
    p.today.fed += fed;
    SL.save();
    var after = levelInfo(p.xp).level;
    return { fed: fed, revived: revived, levelUp: after > before, evolved: stageOf(after).key !== stageOf(before).key, level: after };
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
  // eye boxes (x, y of the 2×2 eye) per grid, used for happy / sleepy / dead eyes
  var EYES = { baby: [[4, 5], [8, 5]], child: [[5, 5], [9, 5]] };
  EYES.teen = EYES.child; EYES.adult = EYES.child;
  /* mood: happy | ok | hungry | starving | dead  */
  SL.petSprite = function (stageKey, size, mood) {
    var g = GRIDS[stageKey] || GRIDS.baby, w = g[0].length, h = g.length;
    var isEye = function (ch) { return ch === 'e' || ch === 'w'; };
    var eyes = EYES[stageKey] || [];
    var special = stageKey !== 'egg' && (mood === 'happy' || mood === 'starving' || mood === 'dead');
    var cls = 'pet-svg pet-' + stageKey + (mood ? ' pet-m-' + mood : '');
    var s = '<svg class="' + cls + '" viewBox="-2 -4 ' + (w + 4) + ' ' + (h + 6) + '" width="' + size + '" height="' + Math.round(size * (h + 6) / (w + 4)) + '" shape-rendering="crispEdges" role="img" aria-label="pet">';
    s += '<ellipse class="pet-shadow" cx="' + (w / 2) + '" cy="' + (h + 0.4) + '" rx="' + (w * (mood === 'starving' || mood === 'dead' ? 0.45 : 0.32)) + '" ry="0.55" fill="rgba(0,0,0,.14)"/>';
    s += '<g class="pet-body">' + cells(g, function (ch) { return !isEye(ch) && !(stageKey === 'adult' && ch === 'a'); });
    if (stageKey !== 'egg') {
      var eyeInk = '#1f2937';
      if (!special) s += '<g class="pet-eyes">' + cells(g, isEye) + '</g>';
      else if (mood === 'happy') {          // ^ ^ smiling eyes
        s += '<g class="pet-happy-eyes" fill="none" stroke="' + eyeInk + '" stroke-width=".55" stroke-linecap="square" shape-rendering="auto">' +
          eyes.map(function (e) { return '<path d="M' + (e[0] + 0.05) + ' ' + (e[1] + 1.5) + ' L' + (e[0] + 1) + ' ' + (e[1] + 0.45) + ' L' + (e[0] + 1.95) + ' ' + (e[1] + 1.5) + '"/>'; }).join('') + '</g>';
      } else if (mood === 'starving') {     // half-closed, droopy eyes + sweat drop
        s += eyes.map(function (e) { return '<rect x="' + e[0] + '" y="' + (e[1] + 1) + '" width="2" height=".55" fill="' + eyeInk + '"/>'; }).join('') +
          '<path class="pet-sweat" d="M' + (w - 2.3) + ' 2.2 q.7 1.1 0 1.7 q-.7-.6 0-1.7z" fill="#7dd3fc" shape-rendering="auto"/>';
      } else if (mood === 'dead') {         // X X eyes
        s += '<g stroke="' + eyeInk + '" stroke-width=".45" shape-rendering="auto">' + eyes.map(function (e) { return '<path d="M' + e[0] + ' ' + e[1] + ' l2 2 M' + (e[0] + 2) + ' ' + e[1] + ' l-2 2"/>'; }).join('') + '</g>';
      }
      if (stageKey === 'teen' || stageKey === 'adult') {   // round glasses
        s += '<g fill="none" stroke="#1f2937" stroke-width=".32"><rect x="4.55" y="4.55" width="2.9" height="2.9" rx=".5"/><rect x="8.55" y="4.55" width="2.9" height="2.9" rx=".5"/><path d="M7.45 5.6h1.1"/></g>';
      }
      if (stageKey === 'adult') {                           // graduation cap replaces the antenna curl
        s += '<path d="M3.5 1.2 L8 -1 L12.5 1.2 L8 3.4 Z" fill="#1e3a8a"/><rect x="5.6" y="1.9" width="4.8" height="1.4" fill="#1e3a8a"/>' +
          '<path d="M8 1.2 L12 1.6 L12 4" fill="none" stroke="#f2b84b" stroke-width=".35"/><rect x="11.6" y="3.8" width=".8" height="1.2" fill="#f2b84b"/>';
      }
    }
    s += '</g>';
    if (mood === 'dead' && stageKey !== 'egg') s += '<ellipse class="pet-halo" cx="' + (w / 2) + '" cy="-2.2" rx="2.6" ry=".7" fill="none" stroke="#f2b84b" stroke-width=".4" shape-rendering="auto"/>';
    if (mood === 'happy') s += '<g class="pet-sparkles" fill="#f2b84b"><rect x="-1" y="2" width=".8" height=".8"/><rect x="' + (w + 0.2) + '" y="4" width=".8" height=".8"/><rect x="' + (w - 1) + '" y="-1" width=".6" height=".6"/></g>';
    return s + '</svg>';
  };

  /* ---------- page ---------- */
  var LINES = {
    happy: [['今天也一起学习吧！', 'Let\'s study together today!'], ['吃饱饱，脑子转得快 ✨', 'Full tummy, fast brain ✨'], ['你答对题的样子真帅！', 'You look great when you get it right!'], ['我又长大了一点点～', 'I grew a tiny bit more~']],
    ok: [['有点想吃苹果了…', 'I could go for an apple…'], ['做几道题给我赚点吃的吧！', 'Answer a few questions to earn me some food!'], ['今天复习了吗？', 'Did you review today?']],
    hungry: [['好饿呀……去做几道题吧 🍎', 'So hungry… go answer a few questions 🍎'], ['肚子咕咕叫了', 'My tummy is rumbling'], ['答对一题就有一个苹果哦', 'One right answer = one apple']],
    starving: [['饿……饿瘪了……', 'So… flat… so… hungry…'], ['再不喂我，我就要变成纸片了', 'Feed me before I turn into paper'], ['一个苹果也行……求你了', 'Even one apple… please']],
    dead: [['……（已经饿晕了）', '…(fainted from hunger)'], ['（它一动不动。也许苹果能救它。）', '(It is not moving. Maybe apples can help.)']],
    egg: [['蛋里好像有什么在动……', 'Something is moving inside the egg…'], ['喂它几个苹果，看看会孵出什么！', 'Feed it a few apples and see what hatches!']]
  };
  function pick(arr) { var x = arr[Math.floor(Math.random() * arr.length)]; return L(x[0], x[1]); }

  function renderPet() {
    var p = tick();
    var li = levelInfo(p.xp), stage = stageOf(li.level);
    var mood = moodOf(p, stage.key);
    var next = STAGES.filter(function (s) { return s.min > li.level; })[0];
    var goal = SL.store.planner.dailyGoal || 20, today = SL.todayCount();
    var size = { egg: 170, baby: 190, child: 230, teen: 240, adult: 250 }[stage.key];
    var html = '<div class="pet-wrap">' +
      '<div class="card pet-stage-card">' +
      '<div class="row between"><div class="row" style="gap:8px"><h2 class="pet-name">' + esc(p.name) + '</h2><button class="btn ghost sm" data-act="petRename" aria-label="' + esc(L('改名', 'Rename')) + '">✏️</button></div>' +
      '<div class="row" style="gap:6px"><span class="chip pri">' + esc(L(stage.zh, stage.en)) + '</span><span class="chip">Lv ' + li.level + '</span></div></div>' +
      '<div class="pet-bubble" aria-live="polite">' + esc(pick(LINES[mood] || LINES.ok)) + '</div>' +
      (p.dead ? '<div class="notice mt12" style="text-align:center">' + esc(L('它饿晕过去了……喂 3 个苹果就能把它救回来（' + (p.revive || 0) + ' / 3），等级不会丢。', 'It fainted from hunger… feed it 3 apples to bring it back (' + (p.revive || 0) + ' / 3). Its level is kept.')) + '</div>' : '') +
      '<button class="pet-stage" data-act="petPoke" aria-label="' + esc(L('摸摸它', 'Pet it')) + '">' + SL.petSprite(stage.key, size, mood) + '<span class="pet-fx" aria-hidden="true"></span></button>' +
      '<div class="grid g2 mt12" style="gap:12px">' +
      '<div><div class="row between xs"><b>' + esc(stage.key === 'egg' ? L('孵化进度', 'Hatching') : L('成长值', 'Growth')) + '</b><span class="faint">' + li.into + ' / ' + li.need + '</span></div><div class="bar mt8"><i style="width:' + Math.round(li.into / li.need * 100) + '%;background:var(--c-main)"></i></div></div>' +
      '<div><div class="row between xs"><b>' + esc(L('饱食度', 'Fullness')) + '</b><span class="faint">' + p.full + ' / 10</span></div><div class="bar mt8"><i class="' + (p.full < 3 ? 'bad' : p.full < 7 ? 'warn' : 'good') + '" style="width:' + p.full * 10 + '%"></i></div></div></div>' +
      '<div class="row mt16" style="justify-content:center">' +
      '<span class="pet-food" title="' + esc(L('食物', 'Food')) + '">🍎 <b>' + p.food + '</b></span>' +
      '<button class="btn primary" data-act="petFeed" data-n="1"' + (p.food && p.full < 10 ? '' : ' disabled') + '>' + esc(p.dead ? L('喂一个救它', 'Feed to revive') : L('喂一个', 'Feed one')) + '</button>' +
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
    if (r.revived) SL.toast('💫 ' + L('复活啦！以后要常回来哦', 'Revived! Come back more often'));
    else if (r.evolved) {
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
    if (b) b.textContent = pick(LINES[moodOf(p, SL.petStage().key)] || LINES.ok);
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

  SL.route(/^\/pet$/, renderPet);
})();
