/* StudyLoop — splash screen: one big line that depends on how long you were away, the pet below it,
 * swipe left/right (or press → / Enter) to go in. */
(function () {
  'use strict';
  var SL = window.SL;
  var esc = SL.esc, L = SL.L;
  var H = 3600000, D = SL.DAY;

  // {n} = pet name, {d} = days away, {m} = months away, {y} = years away
  var LINES = {
    first: [['嗨！我是{n}，以后一起学习吧', 'Hi! I\'m {n}. Let\'s study together'], ['欢迎来到 StudyLoop', 'Welcome to StudyLoop'], ['一颗蛋，等你来孵', 'An egg, waiting for you to hatch it']],
    soon: [['又见面啦！', 'Back already!'], ['刚才学到哪了？', 'Where were we?'], ['手感正热，继续吧', 'You\'re on a roll — keep going'], ['休息够了吗？来几道题', 'Rested? Let\'s do a few questions'], ['我刚打了个盹，你就回来了', 'I took a nap and you\'re back already']],
    morning: [['早上好！今天也一起变聪明吧', 'Good morning! Let\'s get smarter today'], ['早起的人有苹果吃 🍎', 'The early learner gets the apple 🍎'], ['新的一天，新的知识点', 'New day, new topics']],
    afternoon: [['下午好，来点脑力活动？', 'Good afternoon — a little brain workout?'], ['午后的阳光和错题更配', 'Afternoon sun pairs well with mistake review']],
    evening: [['晚上好，今天学了什么？', 'Good evening — what did you learn today?'], ['睡前复习，记得更牢', 'Review before bed, remember it longer']],
    late: [['这么晚还来学习，辛苦啦', 'Studying this late? Respect'], ['夜深了，做完这几道就去睡吧', 'It\'s late — a few questions, then sleep']],
    day: [['你回来啦，欢迎继续学习', 'You\'re back! Welcome back to studying'], ['我等你一天了！', 'I waited for you all day!'], ['昨天学的还记得吗？', 'Remember what you learned yesterday?'], ['欢迎回来，今天也加油', 'Welcome back — let\'s keep it up']],
    days: [['好几天没见了……我还以为你把我忘了', 'Haven\'t seen you in days… I thought you forgot me'], ['{d} 天没来了，知识都在悄悄溜走哦', '{d} days away — knowledge is quietly leaking out'], ['终于想起我了？', 'Finally remembered me?'], ['你不在的这 {d} 天，我数了 {d} 次手指', 'For {d} days I counted on my fingers waiting']],
    weeks: [['哟，还知道回来学习啊？', 'Oh? You still remember studying exists?'], ['{d} 天了。我都快饿瘪了。', '{d} days. I\'m practically flat from hunger.'], ['你的错题本落了一层灰', 'Your mistake notebook is gathering dust'], ['考试可不会等你这么久', 'The exam won\'t wait this long for you']],
    months: [['{m} 个月。你还知道回来学习吗？', '{m} months. Do you even remember how to study?'], ['我以为我们已经结束了', 'I thought we were over'], ['你是去环游世界了吗？', 'Were you travelling the world or something?'], ['欢迎回来……虽然我已经饿晕了', 'Welcome back… though I already fainted']],
    years: [['整整 {y} 年多了。你还记得我叫什么吗？', 'Over {y} year(s). Do you even remember my name?'], ['考试都考完了吧？', 'All your exams are over by now, right?'], ['一年了。我已经变成化石了', 'A whole year. I\'m basically a fossil now'], ['哦，是你啊。好久不见。', 'Oh. It\'s you. Long time no see.']]
  };
  function bucket(away) {
    if (away == null) return 'first';
    if (away < 2 * H) return 'soon';
    if (away < 20 * H) { var h = new Date().getHours(); return h < 5 ? 'late' : h < 12 ? 'morning' : h < 18 ? 'afternoon' : h < 23 ? 'evening' : 'late'; }
    if (away < 3 * D) return 'day';
    if (away < 14 * D) return 'days';
    if (away < 60 * D) return 'weeks';
    if (away < 365 * D) return 'months';
    return 'years';
  }
  function fill(str, away, name) {
    var d = away ? Math.floor(away / D) : 0;
    return str.replace(/\{n\}/g, name).replace(/\{d\}/g, d).replace(/\{m\}/g, Math.max(1, Math.round(d / 30))).replace(/\{y\}/g, Math.max(1, Math.floor(d / 365)));
  }
  var CHOSEN = null;   // keep the same line while this splash is showing (theme / language re-renders)
  function chooseLine() {
    var b = bucket(SL.awayMs), pool = LINES[b], prev = SL.store.lastGreet || '', idx;
    var tries = 0;
    do { idx = Math.floor(Math.random() * pool.length); tries++; } while (pool.length > 1 && prev === b + ':' + idx && tries < 10);
    SL.store.lastGreet = b + ':' + idx; SL.save();
    return { b: b, idx: idx };
  }
  function awayText(away) {
    if (away == null) return '';
    var m = Math.round(away / 60000);
    if (m < 60) return L('离开了 ' + Math.max(1, m) + ' 分钟', 'Away ' + Math.max(1, m) + ' min');
    var h = Math.round(m / 60); if (h < 24) return L('离开了 ' + h + ' 小时', 'Away ' + h + ' h');
    var d = Math.floor(h / 24); if (d < 365) return L('离开了 ' + d + ' 天', 'Away ' + d + ' days');
    return L('离开了 ' + (d / 365).toFixed(1) + ' 年', 'Away ' + (d / 365).toFixed(1) + ' years');
  }

  function renderSplash() {
    if (!CHOSEN) CHOSEN = chooseLine();
    var p = SL.store.pet || {}, name = p.name || L('小圈', 'Loopy');
    var line = LINES[CHOSEN.b][CHOSEN.idx];
    var big = fill(L(line[0], line[1]), SL.awayMs, name);
    var stage = SL.petStage().key, mood = SL.petMood();
    var due = SL.dueTopics().length + SL.dueMistakes().length + (SL.kbDue ? SL.kbDue().length : 0);
    var sub = [];
    var at = awayText(SL.awayMs); if (at) sub.push(at);
    if (mood === 'dead') sub.push(L(name + ' 已经饿晕了，进去喂 3 个苹果能救它', name + ' fainted — feed it 3 apples inside'));
    else if (mood === 'starving') sub.push(L(name + ' 饿瘪了', name + ' is starving'));
    else if (mood === 'hungry') sub.push(L(name + ' 有点饿', name + ' is a bit hungry'));
    if (due) sub.push(L(due + ' 项待复习', due + ' items to review'));
    var d = new Date();
    var html = '<div class="splash splash-' + CHOSEN.b + ' splash-mood-' + mood + '" id="splash">' +
      '<div class="splash-top"><span class="brand-mark" style="width:26px;height:26px"><svg viewBox="0 0 32 32"><path d="M8 21c4-1 8-1 16 0M8 16c4-1 8-1 16 0M8 11c4-1 8-1 16 0" stroke="#fff" stroke-width="2.4" stroke-linecap="round" fill="none"/></svg></span>' +
      '<span>StudyLoop</span><span class="faint">· ' + esc(d.toLocaleDateString(SL.lang === 'zh' ? 'zh-CN' : 'en-US', { month: 'long', day: 'numeric', weekday: 'short' })) + '</span></div>' +
      '<div class="splash-msg"><h1>' + esc(big) + '</h1>' + (sub.length ? '<p>' + esc(sub.join(' · ')) + '</p>' : '') + '</div>' +
      '<div class="splash-pet" data-act="splashPoke" aria-label="' + esc(name) + '">' + SL.petSprite(stage, Math.min(280, Math.round(window.innerWidth * 0.62)), mood) + '<span class="pet-fx" aria-hidden="true"></span></div>' +
      '<button class="splash-hint" data-act="splashEnter"><span class="chev l">‹</span>' + esc(L('左右滑动进入', 'Swipe to enter')) + '<span class="chev r">›</span></button>' +
      '</div>';
    return {
      title: 'StudyLoop', fullscreen: true, html: html,
      after: function (root) { bindSwipe(root.querySelector('#splash')); },
      cleanup: function () { document.removeEventListener('keydown', onKey); }
    };
  }

  var leaving = false;
  function enter(dir) {
    if (leaving) return;
    leaving = true;
    var el = document.getElementById('splash');
    if (el) { el.style.transition = 'transform .28s ease-in, opacity .28s ease-in'; el.style.transform = 'translateX(' + (dir < 0 ? '-' : '') + '100%)'; el.style.opacity = '0'; }
    setTimeout(function () { leaving = false; CHOSEN = null; SL.go('#/pet'); }, 260);
  }
  function onKey(e) {
    if (SL.parseHash().path !== '/') return;
    if (e.key === 'ArrowLeft') enter(-1);
    else if (e.key === 'ArrowRight' || e.key === 'Enter' || e.key === ' ') { e.preventDefault(); enter(1); }
  }
  function bindSwipe(el) {
    if (!el) return;
    document.addEventListener('keydown', onKey);
    var x0 = null, y0 = 0, dx = 0, id = null;
    el.addEventListener('pointerdown', function (e) { if (e.button && e.button !== 0) return; x0 = e.clientX; y0 = e.clientY; dx = 0; id = e.pointerId; el.style.transition = 'none'; });
    el.addEventListener('pointermove', function (e) {
      if (x0 == null || e.pointerId !== id) return;
      dx = e.clientX - x0;
      if (Math.abs(dx) > 6 && Math.abs(dx) > Math.abs(e.clientY - y0)) {
        try { el.setPointerCapture(id); } catch (err) {}
        el.style.transform = 'translateX(' + dx * 0.7 + 'px)'; el.style.opacity = String(Math.max(0.3, 1 - Math.abs(dx) / 500));
      }
    });
    function end() {
      if (x0 == null) return;
      x0 = null;
      if (Math.abs(dx) > 70) { enter(dx); return; }
      el.style.transition = 'transform .2s ease-out, opacity .2s'; el.style.transform = ''; el.style.opacity = '';
      if (Math.abs(dx) > 6) splashBlock = Date.now();   // a short drag should not count as a tap
    }
    el.addEventListener('pointerup', end); el.addEventListener('pointercancel', end);
  }
  var splashBlock = 0;
  SL.act('splashEnter', function () { enter(1); });
  SL.act('splashPoke', function () {
    if (Date.now() - splashBlock < 300) return;
    var box = document.querySelector('.splash-pet'); if (!box) return;
    box.classList.remove('pet-jump'); void box.offsetWidth; box.classList.add('pet-jump');
    var fx = box.querySelector('.pet-fx'), mood = SL.petMood();
    var s = document.createElement('span'); s.textContent = mood === 'dead' ? '💤' : mood === 'starving' || mood === 'hungry' ? '🍎?' : '💗';
    s.style.left = (35 + Math.random() * 30) + '%'; fx.appendChild(s); setTimeout(function () { s.remove(); }, 1000);
  });

  SL.route(/^\/$/, renderSplash);
})();
