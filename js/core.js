/* StudyLoop core — namespace, utils, i18n, storage (with v2 migration), theme, toast */
(function () {
  'use strict';
  var SL = window.SL = window.SL || {};

  /* ---------- utils ---------- */
  SL.esc = function (s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  };
  SL.hash = function (str) {
    var h = 5381; str = String(str);
    for (var i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) | 0;
    return (h >>> 0).toString(36);
  };
  SL.uid = function (p) { return (p || 'x') + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); };
  SL.shuffle = function (arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  };
  SL.clamp = function (v, lo, hi) { return Math.max(lo, Math.min(hi, v)); };
  SL.clone = function (o) { return o == null ? o : JSON.parse(JSON.stringify(o)); };
  SL.DAY = 86400000;
  SL.dayKey = function (ts) {
    var d = new Date(ts == null ? Date.now() : ts);
    return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
  };
  SL.startOfDay = function (ts) { var d = new Date(ts == null ? Date.now() : ts); d.setHours(0, 0, 0, 0); return d.getTime(); };
  SL.fmtDuration = function (ms) {
    var s = Math.round(ms / 1000);
    if (s < 60) return s + 's';
    var m = Math.floor(s / 60); s = s % 60;
    if (m < 60) return m + 'm ' + (s ? s + 's' : '');
    return Math.floor(m / 60) + 'h ' + (m % 60) + 'm';
  };
  SL.qs = function (sel, root) { return (root || document).querySelector(sel); };
  SL.qsa = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /* ---------- storage ---------- */
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); return true; } catch (e) { return false; } }
  function lsDel(k) { try { localStorage.removeItem(k); } catch (e) {} }
  SL.lsGet = lsGet; SL.lsSet = lsSet; SL.lsDel = lsDel;
  SL.storageOk = (function () { try { localStorage.setItem('__sl', '1'); localStorage.removeItem('__sl'); return true; } catch (e) { return false; } })();

  var KEY = 'studyloop_v3';
  function blankStore() {
    return {
      version: 3,
      createdAt: Date.now(),
      attempts: [],        // {q, s, u, tp, d, c, ts, ms, m}
      topics: {},          // 'unit:topicIdx' -> {recent:[[ts,c,d]], n, right, due, interval, ease, last}
      mistakes: {},        // qid -> {...}
      notes: { geo: '', bio: '', precalc: '' },
      packs: [],           // imported / AI-approved question objects
      cards: { custom: [], srs: {} },
      kb: { notes: {}, srs: {} },
      focus: [],
      pet: null,                         // study pet (see pet.js)                         // topics to emphasise in daily practice (from entered mistakes)        // knowledge base: per-topic notes + recall review schedule
      planner: { exams: {}, dailyGoal: 20, tasks: [] },
      exams: [],
      sessions: [],
      achievements: {},
      active: null,        // in-progress quiz session (auto-resume)
      settings: { theme: 'system', sidebar: 'open' }
    };
  }

  function migrateV2(store) {
    var old = null;
    try { old = JSON.parse(lsGet('studyloop_v2') || 'null'); } catch (e) {}
    if (!old || typeof old !== 'object') return false;
    if (old.notes && typeof old.notes === 'object') {
      ['geo', 'bio', 'precalc'].forEach(function (k) { if (typeof old.notes[k] === 'string') store.notes[k] = old.notes[k]; });
    }
    if (Array.isArray(old.packs)) {
      old.packs.forEach(function (p) { (p.questions || []).forEach(function (q) { if (q && q.q) store.packs.push(q); }); });
    }
    // wrongbook items are converted after the bank loads (need question ids) — keep raw for now
    if (Array.isArray(old.wrongbook)) store._legacyWrong = old.wrongbook;
    if (old.unitStats && typeof old.unitStats === 'object') store.legacyUnitStats = old.unitStats;
    return true;
  }

  function load() {
    var s = null;
    try { s = JSON.parse(lsGet(KEY) || 'null'); } catch (e) { s = null; }
    var base = blankStore();
    if (!s || typeof s !== 'object') {
      s = base;
      s.migrated = migrateV2(s);
    } else {
      Object.keys(base).forEach(function (k) { if (s[k] == null || typeof s[k] !== typeof base[k]) s[k] = base[k]; });
      if (!Array.isArray(s.attempts)) s.attempts = [];
      if (!Array.isArray(s.packs)) s.packs = [];
      if (!Array.isArray(s.exams)) s.exams = [];
      if (!Array.isArray(s.sessions)) s.sessions = [];
      if (!s.cards.custom) s.cards.custom = [];
      if (!s.cards.srs) s.cards.srs = {};
      if (!Array.isArray(s.planner.tasks)) s.planner.tasks = [];
      if (!s.planner.exams) s.planner.exams = {};
    }
    return s;
  }
  SL.store = load();

  var saveTimer = null;
  SL.save = function (immediate) {
    function doSave() {
      saveTimer = null;
      var st = SL.store;
      if (st.attempts.length > 6000) st.attempts = st.attempts.slice(-6000);
      if (st.sessions.length > 500) st.sessions = st.sessions.slice(-500);
      if (st.exams.length > 60) st.exams = st.exams.slice(-60);
      var ok = lsSet(KEY, JSON.stringify(st));
      if (!ok && SL.storageOk && SL.toast) SL.toast(SL.L('保存失败：浏览器存储已满', 'Save failed: browser storage is full'), 'bad');
    }
    if (immediate) { if (saveTimer) clearTimeout(saveTimer); doSave(); return; }
    if (saveTimer) return;
    saveTimer = setTimeout(doSave, 250);
  };
  window.addEventListener('pagehide', function () { SL.save(true); });
  document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'hidden') SL.save(true); });

  SL.exportAll = function () {
    var copy = SL.clone(SL.store);
    copy.active = null;
    return copy;
  };
  SL.importAll = function (data) {
    if (!data || typeof data !== 'object' || data.version !== 3) throw new Error('not a StudyLoop v3 backup');
    lsSet(KEY, JSON.stringify(data));
    SL.store = load();
  };
  SL.resetAll = function () { lsDel(KEY); SL.store = blankStore(); SL.save(true); };

  /* ---------- i18n ---------- */
  SL.lang = lsGet('studyloop_lang') === 'en' ? 'en' : 'zh';
  SL.setLang = function (l) { SL.lang = l === 'en' ? 'en' : 'zh'; lsSet('studyloop_lang', SL.lang); document.documentElement.lang = SL.lang === 'zh' ? 'zh' : 'en'; };
  SL.L = function (zh, en) { return SL.lang === 'zh' ? zh : (en == null ? zh : en); };
  SL.t = function (obj) { if (obj == null) return ''; if (typeof obj === 'string') return obj; return obj[SL.lang] || obj.en || obj.zh || ''; };

  /* ---------- theme ---------- */
  SL.applyTheme = function () {
    var th = SL.store.settings.theme || 'system';
    var root = document.documentElement;
    if (th === 'system') root.removeAttribute('data-theme'); else root.setAttribute('data-theme', th);
  };
  SL.isDark = function () {
    var th = SL.store.settings.theme;
    if (th === 'dark') return true;
    if (th === 'light') return false;
    return !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  };

  /* ---------- toast ---------- */
  SL.toast = function (msg, kind) {
    var host = document.getElementById('toasts');
    if (!host) return;
    var el = document.createElement('div');
    el.className = 'toast ' + (kind || 'ok');
    el.setAttribute('role', 'status');
    el.textContent = msg;
    host.appendChild(el);
    setTimeout(function () { el.classList.add('out'); }, 2600);
    setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 3000);
  };

  SL.download = function (name, data) {
    var blob = new Blob([typeof data === 'string' ? data : JSON.stringify(data, null, 2)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 2000);
  };

  SL.subjectColor = { geo: '#b45309', bio: '#15803d', precalc: '#6d28d9' };
})();
