/* StudyLoop shell — icons, navigation, router, actions, modal */
(function () {
  'use strict';
  var SL = window.SL;
  var esc = SL.esc, L = SL.L;

  /* ---------- icons (stroke icons, 24 grid) ---------- */
  function ic(d) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + '</svg>'; }
  SL.ICON = {
    home: ic('<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/>'),
    book: ic('<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>'),
    target: ic('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>'),
    repeat: ic('<path d="M17 2l4 4-4 4"/><path d="M3 11V9a3 3 0 0 1 3-3h15"/><path d="M7 22l-4-4 4-4"/><path d="M21 13v2a3 3 0 0 1-3 3H3"/>'),
    alert: ic('<path d="M12 3 2 20h20z"/><path d="M12 10v4"/><path d="M12 17h.01"/>'),
    chart: ic('<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/>'),
    cards: ic('<rect x="3" y="6" width="14" height="14" rx="2"/><path d="M7 3h12a2 2 0 0 1 2 2v12"/>'),
    calendar: ic('<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/>'),
    clock: ic('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
    bot: ic('<rect x="4" y="7" width="16" height="12" rx="3"/><path d="M12 3v4M9 12h.01M15 12h.01M9 16h6"/>'),
    settings: ic('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>'),
    graph: ic('<path d="M3 12h18M12 3v18"/><path d="M4 18c3-9 5-12 8-6s5 3 8-6"/>'),
    notes: ic('<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>'),
    trophy: ic('<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/>'),
    back: ic('<path d="M15 18l-6-6 6-6"/>'),
    menu: ic('<path d="M4 6h16M4 12h16M4 18h16"/>'),
    sun: ic('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),
    moon: ic('<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/>'),
    check: ic('<path d="M5 12l5 5L20 7"/>'),
    plus: ic('<path d="M12 5v14M5 12h14"/>'),
    x: ic('<path d="M6 6l12 12M18 6 6 18"/>'),
    flask: ic('<path d="M9 3h6M10 3v6L4 19a1.5 1.5 0 0 0 1.3 2h13.4A1.5 1.5 0 0 0 20 19l-6-10V3"/>'),
    sigma: ic('<path d="M18 4H6l6 8-6 8h12"/>'),
    paw: ic('<circle cx="7" cy="9" r="1.8"/><circle cx="12" cy="6.5" r="1.8"/><circle cx="17" cy="9" r="1.8"/><path d="M12 12c-3 0-5.5 3-5.5 5.2 0 1.6 1.4 2.3 2.8 1.8 1-.4 1.8-.6 2.7-.6s1.7.2 2.7.6c1.4.5 2.8-.2 2.8-1.8C17.5 15 15 12 12 12z"/>'),
    camera: ic('<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>'),
    more: ic('<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>')
  };
  var I = SL.ICON;

  /* ---------- navigation ---------- */
  function navItems() {
    var dueN = SL.dueTopics().length + SL.dueMistakes().length + (SL.kbDue ? SL.kbDue().length : 0);
    return [
      { group: L('学习', 'Learn') },
      { href: '#/', icon: 'paw', zh: '我的宠物', en: 'My pet', match: /^\/$/ },
      { href: '#/dashboard', icon: 'home', zh: '学习概览', en: 'Overview', match: /^\/dashboard/ },
      { href: '#/kb', icon: 'book', zh: '知识库', en: 'Knowledge base', match: /^\/kb/ },
      { href: '#/practice', icon: 'target', zh: '练习', en: 'Practice', match: /^\/(practice|quiz|results)/ },
      { href: '#/review', icon: 'repeat', zh: '今日复习', en: 'Review', match: /^\/review/, badge: dueN || '' },
      { href: '#/mistakes', icon: 'alert', zh: '错题本', en: 'Mistakes', match: /^\/mistakes/ },
      { href: '#/capture', icon: 'camera', zh: '录入错题', en: 'Add a mistake', match: /^\/capture/ },
      { href: '#/exam', icon: 'clock', zh: '模拟考试', en: 'Mock exams', match: /^\/exam/ },
      { href: '#/tutor', icon: 'bot', zh: 'AI Tutor', en: 'AI Tutor', match: /^\/tutor/ },
      { group: L('课程', 'Courses') }
    ].concat(SL.SUBJECTS.map(function (s) {
      return { href: '#/course/' + s.id, dot: s.id, zh: SL.t(s.name), en: SL.t(s.name), label: s.name, match: new RegExp('^/course/' + s.id) };
    })).concat([
      { group: L('工具', 'Tools') },
      { href: '#/flashcards', icon: 'cards', zh: '闪卡', en: 'Flashcards', match: /^\/flashcards/ },
      { href: '#/planner', icon: 'calendar', zh: '学习计划', en: 'Planner', match: /^\/planner/ },
      { href: '#/analytics', icon: 'chart', zh: '学习分析', en: 'Analytics', match: /^\/analytics/ },
      { href: '#/graph', icon: 'graph', zh: '函数图像实验室', en: 'Graph lab', match: /^\/graph/ },
      { href: '#/notes', icon: 'notes', zh: '笔记', en: 'Notes', match: /^\/notes/ },
      { href: '#/achievements', icon: 'trophy', zh: '成就', en: 'Achievements', match: /^\/achievements/ },
      { href: '#/settings', icon: 'settings', zh: '设置', en: 'Settings', match: /^\/settings/ }
    ]);
  }

  function renderNav(path) {
    var items = navItems();
    var sb = '<a class="brand" href="#/"><span class="brand-mark">' +
      '<svg viewBox="0 0 32 32"><path d="M8 21c4-1 8-1 16 0M8 16c4-1 8-1 16 0M8 11c4-1 8-1 16 0" stroke="#fff" stroke-width="2.4" stroke-linecap="round" fill="none"/></svg></span><span>StudyLoop</span></a>';
    items.forEach(function (it) {
      if (it.group) { sb += '<div class="nav-group">' + esc(it.group) + '</div>'; return; }
      var on = it.match.test(path);
      var label = it.label ? SL.t(it.label) : L(it.zh, it.en);
      sb += '<a class="nav-link' + (on ? ' active' : '') + '" href="' + it.href + '" title="' + esc(label) + '"' + (on ? ' aria-current="page"' : '') + '>' +
        (it.dot ? '<span class="ico"><span class="nav-dot" style="background:var(--' + it.dot + ')"></span></span>' : '<span class="ico">' + I[it.icon] + '</span>') +
        '<span class="txt">' + esc(label) + '</span>' + (it.badge ? '<span class="badge">' + it.badge + '</span>' : '') + '</a>';
    });
    var expanded = SL.store.settings.sidebar !== 'rail';
    sb += '<div class="sidebar-foot"><button class="nav-link collapse-btn" data-act="toggleSidebar" title="' + esc(L('收起/展开侧边栏', 'Collapse / expand sidebar')) + '" aria-label="' + esc(L('收起/展开侧边栏', 'Collapse / expand sidebar')) + '" style="border:0;background:none;width:100%">' +
      '<span class="ico">' + I.menu + '</span><span class="txt">' + esc(expanded ? L('收起侧边栏', 'Collapse') : L('展开', 'Expand')) + '</span></button></div>';
    document.getElementById('sidebar').innerHTML = sb;
    var app = document.getElementById('app');
    app.classList.toggle('rail', !expanded);
    app.classList.toggle('expanded', SL.store.settings.sidebar === 'open-force');

    var tabs = [
      { href: '#/', icon: 'paw', zh: '宠物', en: 'Pet', match: /^\/(dashboard)?$/ },
      { href: '#/practice', icon: 'target', zh: '练习', en: 'Practice', match: /^\/(practice|quiz|results|course)/ },
      { href: '#/review', icon: 'repeat', zh: '复习', en: 'Review', match: /^\/(review|mistakes|flashcards|kb)/ },
      { href: '#/analytics', icon: 'chart', zh: '分析', en: 'Stats', match: /^\/(analytics|achievements)/ },
      { href: '#/more', icon: 'more', zh: '更多', en: 'More', match: /^\/(more|tutor|exam|planner|graph|notes|settings)/ }
    ];
    document.getElementById('tabbar').innerHTML = tabs.map(function (t) {
      var on = t.match.test(path);
      return '<a href="' + t.href + '" class="' + (on ? 'active' : '') + '"' + (on ? ' aria-current="page"' : '') + '>' + I[t.icon] + '<span>' + esc(L(t.zh, t.en)) + '</span></a>';
    }).join('');
  }
  SL.navItems = navItems;

  function renderTopbar(view) {
    var html = '';
    if (view.back) html += '<a class="btn ghost icon back" href="' + view.back + '" aria-label="' + esc(L('返回', 'Back')) + '">' + I.back + '</a>';
    html += '<h1>' + esc(view.title || 'StudyLoop') + '</h1>';
    html += '<button class="btn ghost sm" data-act="lang" aria-label="Switch language">' + (SL.lang === 'zh' ? 'EN' : '中文') + '</button>';
    html += '<button class="btn ghost icon" data-act="theme" aria-label="' + esc(L('切换深色模式', 'Toggle dark mode')) + '" title="' + esc(L('切换深色模式', 'Toggle dark mode')) + '">' + (SL.isDark() ? I.sun : I.moon) + '</button>';
    document.getElementById('topbar').innerHTML = html;
  }

  /* ---------- router ---------- */
  SL.routes = [];
  SL.route = function (pattern, fn) { SL.routes.push({ re: pattern, fn: fn }); };
  SL.parseHash = function () {
    var h = location.hash.replace(/^#/, '') || '/';
    var qi = h.indexOf('?');
    var path = qi === -1 ? h : h.slice(0, qi);
    var query = {};
    if (qi !== -1) h.slice(qi + 1).split('&').forEach(function (kv) { if (!kv) return; var p = kv.split('='); query[decodeURIComponent(p[0])] = decodeURIComponent((p[1] || '').replace(/\+/g, ' ')); });
    return { path: path || '/', query: query };
  };
  SL.go = function (hash) { if (location.hash === hash) SL.render(); else location.hash = hash; };

  var currentCleanup = null;
  SL.render = function () {
    var r = SL.parseHash();
    var view = null;
    if (SL.chart && SL.chart.reset) SL.chart.reset();
    for (var i = 0; i < SL.routes.length; i++) {
      var m = r.path.match(SL.routes[i].re);
      if (m) { view = SL.routes[i].fn(m, r.query) ; break; }
    }
    if (!view) view = { title: L('页面不存在', 'Not found'), html: '<div class="card empty"><div class="em-title">' + esc(L('页面不存在', 'Page not found')) + '</div><a class="btn primary" href="#/">' + esc(L('回到首页', 'Go home')) + '</a></div>' };
    if (typeof currentCleanup === 'function') { try { currentCleanup(); } catch (e) {} }
    currentCleanup = view.cleanup || null;
    document.body.setAttribute('data-accent', view.accent || 'none');
    renderNav(r.path);
    renderTopbar(view);
    var root = document.getElementById('view');
    root.className = 'view' + (view.narrow ? ' narrow' : '');
    root.innerHTML = view.html + '<p class="footer-note">StudyLoop · ' + esc(L('数据只保存在本机浏览器', 'Data is stored only in this browser')) + '</p>';
    document.title = (view.title ? view.title + ' · ' : '') + 'StudyLoop';
    if (SL.chart && SL.chart.mount) SL.chart.mount(root);
    if (view.after) { try { view.after(root); } catch (e) { console.error(e); } }
    if (!view.keepScroll) window.scrollTo(0, 0);
  };
  SL.rerender = function () { var y = window.scrollY; SL.render(); window.scrollTo(0, y); };

  /* ---------- actions (event delegation via data-act) ---------- */
  SL.actions = {};
  SL.act = function (name, fn) { SL.actions[name] = fn; };
  document.addEventListener('click', function (e) {
    var el = e.target.closest ? e.target.closest('[data-act]') : null;
    if (!el || el.disabled) return;
    var fn = SL.actions[el.getAttribute('data-act')];
    if (!fn) return;
    e.preventDefault();
    try { fn(el, e); } catch (err) { console.error(err); SL.toast(L('操作失败：', 'Action failed: ') + err.message, 'bad'); }
  });
  document.addEventListener('change', function (e) {
    var el = e.target.closest ? e.target.closest('[data-change]') : null;
    if (!el) return;
    var fn = SL.actions[el.getAttribute('data-change')];
    if (fn) { try { fn(el, e); } catch (err) { console.error(err); } }
  });
  document.addEventListener('input', function (e) {
    var el = e.target.closest ? e.target.closest('[data-input]') : null;
    if (!el) return;
    var fn = SL.actions[el.getAttribute('data-input')];
    if (fn) { try { fn(el, e); } catch (err) { console.error(err); } }
  });

  SL.act('lang', function () { SL.setLang(SL.lang === 'zh' ? 'en' : 'zh'); SL.rerender(); });
  SL.act('theme', function () {
    SL.store.settings.theme = SL.isDark() ? 'light' : 'dark';
    SL.applyTheme(); SL.save(); SL.rerender();
  });
  SL.act('toggleSidebar', function () {
    var cur = SL.store.settings.sidebar;
    var wide = window.innerWidth > 1100;
    if (wide) SL.store.settings.sidebar = cur === 'rail' ? 'open' : 'rail';
    else SL.store.settings.sidebar = cur === 'open-force' ? 'open' : 'open-force';
    SL.save(); SL.rerender();
  });
  SL.act('nav', function (el) { SL.go(el.getAttribute('data-href')); });

  /* ---------- modal ---------- */
  SL.modal = function (html, after) {
    var root = document.getElementById('modal-root');
    root.innerHTML = '<div class="modal-back" data-act="modalBack"><div class="modal" role="dialog" aria-modal="true">' + html + '</div></div>';
    var m = root.querySelector('.modal');
    var f = m.querySelector('input, textarea, select, button');
    if (f) setTimeout(function () { f.focus(); }, 30);
    if (after) after(m);
  };
  SL.closeModal = function () { document.getElementById('modal-root').innerHTML = ''; };
  SL.act('modalBack', function (el, e) { if (e.target === el) SL.closeModal(); });
  SL.act('closeModal', function () { SL.closeModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') SL.closeModal(); });

  SL.confirm = function (msg, onYes, yesLabel) {
    SL.modal('<h3>' + esc(msg) + '</h3><div class="row" style="justify-content:flex-end;margin-top:16px">' +
      '<button class="btn" data-act="closeModal">' + esc(L('取消', 'Cancel')) + '</button>' +
      '<button class="btn primary" id="confirmYes">' + esc(yesLabel || L('确定', 'Confirm')) + '</button></div>', function (m) {
      m.querySelector('#confirmYes').addEventListener('click', function () { SL.closeModal(); onYes(); });
    });
  };

  /* ---------- shared UI snippets ---------- */
  SL.ui = {
    empty: function (icon, title, text, btnHtml) {
      return '<div class="empty"><div class="em-ico" aria-hidden="true">' + icon + '</div><div class="em-title">' + esc(title) + '</div>' + (text ? '<p class="small">' + esc(text) + '</p>' : '') + (btnHtml || '') + '</div>';
    },
    bar: function (pct, cls) { return '<div class="bar"><i class="' + (cls || '') + '" style="width:' + SL.clamp(pct || 0, 0, 100) + '%"></i></div>'; },
    lvlChip: function (m) {
      var lv = SL.masteryLevel(m);
      var cls = { new: '', weak: 'bad', learning: 'warn', good: 'pri', mastered: 'good' }[lv.key];
      return '<span class="chip ' + cls + '">' + esc(lv.label) + (m != null ? ' · ' + m + '%' : '') + '</span>';
    },
    subjIcon: function (s) {
      var ab = { geo: 'HG', bio: 'Bio', precalc: 'f(x)' }[s.id] || s.id;
      return '<span class="subj-icon" data-accent="' + s.id + '">' + ab + '</span>';
    },
    masteryBarCls: function (m) { return m == null ? '' : m < 40 ? 'bad' : m < 70 ? 'warn' : 'good'; },
    relTime: function (ts) {
      if (!ts) return '—';
      var d = Date.now() - ts, m = Math.round(d / 60000);
      if (m < 1) return L('刚刚', 'just now');
      if (m < 60) return L(m + ' 分钟前', m + ' min ago');
      var h = Math.round(m / 60); if (h < 24) return L(h + ' 小时前', h + ' h ago');
      var dd = Math.round(h / 24); return L(dd + ' 天前', dd + ' d ago');
    }
  };

  SL.boot = function () {
    SL.applyTheme();
    SL.setLang(SL.lang);
    if (window.matchMedia) {
      var mq = window.matchMedia('(prefers-color-scheme: dark)');
      var onChange = function () { if (SL.store.settings.theme === 'system') SL.rerender(); };
      if (mq.addEventListener) mq.addEventListener('change', onChange); else if (mq.addListener) mq.addListener(onChange);
    }
    window.addEventListener('hashchange', SL.render);
    window.addEventListener('online', function () { SL.toast(L('网络已恢复', 'Back online')); });
    window.addEventListener('offline', function () { SL.toast(L('网络已断开：练习可继续，AI 功能暂不可用', 'Offline: practice still works, AI features paused'), 'bad'); });
    if (!SL.storageOk) setTimeout(function () { SL.toast(L('浏览器禁止了本地存储，本次学习记录不会被保存', 'Browser storage is blocked — progress will not be saved'), 'bad'); }, 600);
    if (SL.store.migrated) {
      SL.store.migrated = false; SL.save();
      setTimeout(function () { SL.toast(L('已从旧版导入你的错题、笔记和题目包', 'Imported your mistakes, notes and packs from the old version')); }, 500);
    }
    SL.render();
  };
})();
