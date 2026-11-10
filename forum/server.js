'use strict';
// 千禧论坛 Millennium BBS —— 零依赖 Node.js 论坛（需要 Node 22.13+，使用内置 node:sqlite）
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { DatabaseSync } = require('node:sqlite');

const PORT = Number(process.env.PORT) || 3000;
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
const SECURE_COOKIE = process.env.COOKIE_SECURE === '1';
const SITE_NAME = process.env.SITE_NAME || '千禧论坛';
const PER_PAGE = 20;

fs.mkdirSync(DATA_DIR, { recursive: true });
const db = new DatabaseSync(path.join(DATA_DIR, 'forum.db'));
db.exec(`
PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY,
  username TEXT NOT NULL UNIQUE COLLATE NOCASE,
  pass_hash TEXT NOT NULL,
  salt TEXT NOT NULL,
  avatar TEXT NOT NULL DEFAULT '🙂',
  signature TEXT NOT NULL DEFAULT '',
  location TEXT NOT NULL DEFAULT '',
  qq TEXT NOT NULL DEFAULT '',
  is_admin INTEGER NOT NULL DEFAULT 0,
  post_count INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL,
  last_seen INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS sessions (
  token TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  csrf TEXT NOT NULL,
  created_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS boards (
  id INTEGER PRIMARY KEY,
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  icon TEXT NOT NULL DEFAULT '📁',
  sort INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS threads (
  id INTEGER PRIMARY KEY,
  board_id INTEGER NOT NULL REFERENCES boards(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id),
  title TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  last_post_at INTEGER NOT NULL,
  last_post_user_id INTEGER NOT NULL,
  reply_count INTEGER NOT NULL DEFAULT 0,
  views INTEGER NOT NULL DEFAULT 0,
  pinned INTEGER NOT NULL DEFAULT 0,
  locked INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_threads_board ON threads(board_id, pinned DESC, last_post_at DESC);
CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY,
  thread_id INTEGER NOT NULL REFERENCES threads(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id),
  body TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  edited_at INTEGER
);
CREATE INDEX IF NOT EXISTS idx_posts_thread ON posts(thread_id, id);
CREATE TABLE IF NOT EXISTS kv (k TEXT PRIMARY KEY, v TEXT NOT NULL);
`);

if (db.prepare('SELECT COUNT(*) AS n FROM boards').get().n === 0) {
  const ins = db.prepare('INSERT INTO boards (category, name, description, icon, sort) VALUES (?, ?, ?, ?, ?)');
  [
    ['站务区', '站务公告', '论坛公告、新人报到、意见建议都在这里', '📢', 1],
    ['站务区', '新人报到', '新来的朋友请先来这里打个招呼～', '👋', 2],
    ['综合讨论区', '灌水乐园', '天南海北，想聊就聊。注意文明用语哦', '💧', 3],
    ['综合讨论区', '电脑网络', '装机、上网、软件、编程，菜鸟老鸟都欢迎', '💻', 4],
    ['综合讨论区', '影音娱乐', 'MP3、电影、游戏、动漫，分享你的最爱', '🎵', 5],
    ['综合讨论区', '心情驿站', '开心的、难过的，写下来吧', '💌', 6],
  ].forEach((b) => ins.run(...b));
}
const kvGet = (k, d) => { const r = db.prepare('SELECT v FROM kv WHERE k = ?').get(k); return r ? r.v : d; };
const kvSet = (k, v) => db.prepare('INSERT INTO kv (k, v) VALUES (?, ?) ON CONFLICT(k) DO UPDATE SET v = excluded.v').run(k, String(v));
if (kvGet('announcement', null) === null) {
  kvSet('announcement', `热烈庆祝${SITE_NAME}开张！欢迎各位网友注册灌水 ★ 请遵守论坛规则，文明发帖 ★ 第一个注册的用户自动成为管理员`);
}

// ---------- 工具函数 ----------
const now = () => Math.floor(Date.now() / 1000);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const AVATARS = ['🙂', '😎', '🤓', '😺', '🐶', '🐧', '🐼', '🦊', '🐸', '🐵', '👾', '🤖', '👻', '🎃', '🌻', '🍉', '⚽', '🎸', '🚀', '💾'];

function fmtTime(ts) {
  const d = new Date(ts * 1000 + 8 * 3600 * 1000); // 北京时间
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getUTCFullYear()}-${p(d.getUTCMonth() + 1)}-${p(d.getUTCDate())} ${p(d.getUTCHours())}:${p(d.getUTCMinutes())}`;
}

function rankOf(u) {
  if (u.is_admin) return { title: '管理员', stars: '★★★★★★' };
  const n = u.post_count;
  const ranks = [[1000, '论坛元老', '★★★★★'], [300, '资深会员', '★★★★'], [100, '高级会员', '★★★'], [30, '中级会员', '★★'], [5, '初级会员', '★'], [0, '新手上路', '☆']];
  for (const [min, title, stars] of ranks) if (n >= min) return { title, stars };
  return { title: '新手上路', stars: '☆' };
}

function hashPassword(pw, salt) {
  return crypto.scryptSync(pw, salt, 64).toString('hex');
}

// UBB 代码：先整体转义，再把白名单标签替换成 HTML
const SMILIES = { ':)': '😊', ':-)': '😊', ':(': '😞', ':D': '😄', ';)': '😉', ':P': '😛', ':o': '😮', ':\'(': '😢', '8)': '😎', ':@': '😡', '^_^': '😊', '-_-': '😑', 'orz': '🙇' };
const COLORS = new Set(['red', 'blue', 'green', 'orange', 'purple', 'gray', 'navy', 'maroon', 'teal', 'olive', 'fuchsia', 'black']);
function safeUrl(u) {
  const s = u.replace(/&amp;/g, '&').trim();
  return /^https?:\/\/[^\s"<>]+$/i.test(s) ? esc(s) : null;
}
function ubb(src) {
  let s = esc(src).replace(/\r\n?/g, '\n');
  const codes = [];
  s = s.replace(/\[code\]([\s\S]*?)\[\/code\]/gi, (_, c) => { codes.push(c); return `\u0000${codes.length - 1}\u0000`; });
  for (let i = 0; i < 3; i++) {
    s = s.replace(/\[quote(?:=([^\]\n]{1,30}))?\]\n?([\s\S]*?)\[\/quote\]\n?/gi, (_, who, body) =>
      `<div class="quote"><div class="quote-h">${who ? `引用 <b>${who}</b> 的话：` : '引用：'}</div>${body}</div>`);
  }
  s = s.replace(/\[(b|i|u|s)\]([\s\S]*?)\[\/\1\]/gi, (_, t, body) => `<${t.toLowerCase()}>${body}</${t.toLowerCase()}>`);
  s = s.replace(/\[color=(#[0-9a-f]{3,6}|[a-z]+)\]([\s\S]*?)\[\/color\]/gi, (m, c, body) =>
    (c.startsWith('#') || COLORS.has(c.toLowerCase())) ? `<span style="color:${c}">${body}</span>` : body);
  s = s.replace(/\[size=([1-5])\]([\s\S]*?)\[\/size\]/gi, (_, n, body) => `<span class="sz${n}">${body}</span>`);
  s = s.replace(/\[center\]([\s\S]*?)\[\/center\]/gi, '<div style="text-align:center">$1</div>');
  s = s.replace(/\[fly\]([\s\S]*?)\[\/fly\]/gi, '<marquee scrollamount="4">$1</marquee>');
  s = s.replace(/\[url=([^\]\s]+)\]([\s\S]*?)\[\/url\]/gi, (m, u, t) => { const h = safeUrl(u); return h ? `<a href="${h}" target="_blank" rel="nofollow noopener">${t}</a>` : t; });
  s = s.replace(/\[url\]([^\[\s]+)\[\/url\]/gi, (m, u) => { const h = safeUrl(u); return h ? `<a href="${h}" target="_blank" rel="nofollow noopener">${h}</a>` : u; });
  s = s.replace(/\[img\]([^\[\s]+)\[\/img\]/gi, (m, u) => { const h = safeUrl(u); return h ? `<img class="ubb-img" src="${h}" alt="" loading="lazy" referrerpolicy="no-referrer">` : u; });
  for (const [k, v] of Object.entries(SMILIES)) {
    const re = new RegExp(`(^|[\\s>])${esc(k).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?=$|[\\s<])`, 'g');
    s = s.replace(re, `$1<span class="smile">${v}</span>`);
  }
  s = s.replace(/\n/g, '<br>');
  s = s.replace(/\u0000(\d+)\u0000/g, (_, i) => `<pre class="code">${codes[Number(i)].replace(/^\n/, '')}</pre>`);
  return s;
}

// ---------- 会话 / 用户 ----------
function parseCookies(req) {
  const out = {};
  (req.headers.cookie || '').split(';').forEach((p) => {
    const i = p.indexOf('=');
    if (i > 0) out[p.slice(0, i).trim()] = decodeURIComponent(p.slice(i + 1).trim());
  });
  return out;
}
function cookie(name, value, maxAge) {
  return `${name}=${encodeURIComponent(value)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${SECURE_COOKIE ? '; Secure' : ''}`;
}
function loadSession(req) {
  const token = parseCookies(req).sid;
  if (!token) return null;
  const row = db.prepare(`SELECT s.csrf, s.token, u.* FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token = ?`).get(token);
  if (!row) return null;
  const t = now();
  if (t - row.last_seen > 60) db.prepare('UPDATE users SET last_seen = ? WHERE id = ?').run(t, row.id);
  return row;
}
function createSession(userId) {
  const token = crypto.randomBytes(32).toString('hex');
  db.prepare('INSERT INTO sessions (token, user_id, csrf, created_at) VALUES (?, ?, ?, ?)').run(token, userId, crypto.randomBytes(16).toString('hex'), now());
  return token;
}

// 访客统计 & 简易限流（内存）
const guests = new Map();
const hits = new Map();
function rateLimited(ip, key, max, windowSec) {
  const k = `${key}:${ip}`;
  const t = now();
  const arr = (hits.get(k) || []).filter((x) => t - x < windowSec);
  arr.push(t);
  hits.set(k, arr);
  return arr.length > max;
}
setInterval(() => {
  const t = now();
  for (const [k, v] of guests) if (t - v > 900) guests.delete(k);
  for (const [k, v] of hits) if (!v.some((x) => t - x < 3600)) hits.delete(k);
}, 60_000).unref();

// ---------- 页面框架 ----------
function layout(ctx, title, body, { crumbs = [] } = {}) {
  const u = ctx.user;
  const counter = String(kvGet('visits', '0')).padStart(7, '0');
  const userBar = u
    ? `欢迎您，<a href="/user/${u.id}"><b>${esc(u.username)}</b></a> ${u.is_admin ? '<span class="admin-tag">[管理员]</span>' : ''}
       ｜ <a href="/profile">控制面板</a> ｜ <a href="/user/${u.id}">我的帖子</a>
       ｜ <form method="post" action="/logout" class="inline"><input type="hidden" name="csrf" value="${u.csrf}"><button class="linkbtn">退出登录</button></form>`
    : `您好，<b>游客</b>！ 请 <a href="/login">登录</a> 或 <a href="/register">注册</a>`;
  const crumbHtml = [`<a href="/">${esc(SITE_NAME)}</a>`, ...crumbs].join(' &raquo; ');
  return `<!DOCTYPE html>
<html lang="zh-CN"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} - ${esc(SITE_NAME)} - Powered by MillenniumBBS</title>
<link rel="stylesheet" href="/static/style.css">
<script src="/static/site.js" defer></script>
</head><body>
<div id="wrap">
<table class="top" cellspacing="0"><tr>
  <td class="logo"><a href="/"><span class="logo-cn">${esc(SITE_NAME)}</span><span class="logo-en">MILLENNIUM BBS</span></a><div class="slogan">~ 网络让你我相聚 ~</div></td>
  <td class="banner"><div class="ad">★ 本站已开通 <b>56K</b> / <b>ISDN</b> / <b>ADSL</b> 快速通道 ★<br><span class="blink">热烈欢迎新会员注册！</span></div></td>
</tr></table>
<div class="nav">
  <a href="/">🏠 论坛首页</a><a href="/new">✏️ 发表新帖</a><a href="/search">🔍 搜索</a><a href="/members">👥 会员列表</a><a href="/help">❓ 帮助</a>
  ${u ? '' : '<a href="/register">📝 注册</a><a href="/login">🔑 登录</a>'}
</div>
<table class="userbar" cellspacing="0"><tr><td>${userBar}</td><td class="r">${fmtTime(now())}</td></tr></table>
<div class="marquee-box"><b>📢 公告：</b><marquee scrollamount="3">${esc(kvGet('announcement', ''))}</marquee></div>
<div class="crumbs">📍 ${crumbHtml}</div>
${ctx.flash ? `<div class="flash">${esc(ctx.flash)}</div>` : ''}
${body}
<div class="footer">
  <div class="counter">您是本站第 ${[...counter].map((c) => `<span>${c}</span>`).join('')} 位访客</div>
  Powered by <b>MillenniumBBS</b> v1.0 &copy; 2000-${new Date().getFullYear()} ${esc(SITE_NAME)}<br>
  建议使用 IE 5.0 以上版本、800×600 以上分辨率浏览本站 ｜ <a href="/help">论坛规则</a> ｜ <a href="#">返回顶部 ▲</a>
</div>
</div></body></html>`;
}

function box(title, inner, extraClass = '') {
  return `<table class="tbl ${extraClass}" cellspacing="1"><tr><th class="cap">${title}</th></tr><tr><td class="row1">${inner}</td></tr></table>`;
}

function pager(base, page, pages) {
  if (pages <= 1) return '';
  const sep = base.includes('?') ? '&' : '?';
  let out = `<div class="pager">共 ${pages} 页：`;
  for (let p = 1; p <= pages; p++) {
    if (pages > 12 && p > 3 && p < pages - 2 && Math.abs(p - page) > 2) { if (!out.endsWith('… ')) out += '… '; continue; }
    out += p === page ? `<b class="cur">[${p}]</b> ` : `<a href="${base}${sep}page=${p}">[${p}]</a> `;
  }
  return out + '</div>';
}

function avatarCell(u) {
  const r = rankOf(u);
  return `<td class="author">
    <a href="/user/${u.uid}" class="uname">${esc(u.username)}</a>
    <div class="avatar">${esc(u.avatar)}</div>
    <div class="rank">${r.title}<br><span class="stars">${r.stars}</span></div>
    <div class="meta">帖子：${u.post_count}<br>注册：${fmtTime(u.ucreated).slice(0, 10)}${u.location ? `<br>来自：${esc(u.location)}` : ''}<br>状态：${now() - u.last_seen < 900 ? '<span class="on">● 在线</span>' : '<span class="off">○ 离线</span>'}</div>
  </td>`;
}

// ---------- 路由 ----------
const routes = [];
const route = (method, pattern, handler) => routes.push({ method, re: new RegExp(`^${pattern}$`), handler });

function requireLogin(ctx) {
  if (!ctx.user) { ctx.redirect(`/login?next=${encodeURIComponent(ctx.url.pathname + ctx.url.search)}`); return false; }
  return true;
}
function checkCsrf(ctx) {
  if (!ctx.user || ctx.body.csrf !== ctx.user.csrf) { ctx.send(403, layout(ctx, '错误', box('出错啦', '表单已过期，请返回刷新页面后重试。'))); return false; }
  return true;
}
function notFound(ctx, what = '页面') {
  ctx.send(404, layout(ctx, '找不到', box('提示信息', `<p class="msg">对不起，您访问的${what}不存在或已被删除。</p><p class="msg"><a href="/" class="back">[ 返回上一页 ]</a> <a href="/">[ 返回首页 ]</a></p>`)));
}
function errorPage(ctx, msg, code = 400) {
  ctx.send(code, layout(ctx, '提示信息', box('提示信息', `<p class="msg">${msg}</p><p class="msg"><a href="/" class="back">[ 返回上一页 ]</a></p>`)));
}

route('GET', '/', (ctx) => {
  const boards = db.prepare(`
    SELECT b.*, (SELECT COUNT(*) FROM threads t WHERE t.board_id = b.id) AS tcount,
      (SELECT COUNT(*) FROM posts p JOIN threads t ON t.id = p.thread_id WHERE t.board_id = b.id) AS pcount,
      lt.id AS lt_id, lt.title AS lt_title, lt.last_post_at AS lt_time, lu.username AS lt_user, lu.id AS lt_uid
    FROM boards b
    LEFT JOIN threads lt ON lt.id = (SELECT id FROM threads WHERE board_id = b.id ORDER BY last_post_at DESC LIMIT 1)
    LEFT JOIN users lu ON lu.id = lt.last_post_user_id
    ORDER BY b.sort, b.id`).all();
  const t = now();
  let html = '';
  let cat = null;
  html += `<table class="tbl" cellspacing="1"><tr><th class="cap" colspan="5">论坛版块</th></tr>
    <tr class="sub"><td width="40"></td><td>版块名称</td><td width="70" align="center">主题</td><td width="70" align="center">帖子</td><td width="230">最后发表</td></tr>`;
  for (const b of boards) {
    if (b.category !== cat) { cat = b.category; html += `<tr><td class="cat" colspan="5">▼ ${esc(cat)}</td></tr>`; }
    const fresh = b.lt_time && t - b.lt_time < 86400;
    html += `<tr><td class="row2 icon">${esc(b.icon)}</td>
      <td class="row1"><a class="bname" href="/board/${b.id}">${esc(b.name)}</a>${fresh ? ' <span class="new">NEW</span>' : ''}<div class="bdesc">${esc(b.description)}</div></td>
      <td class="row2" align="center">${b.tcount}</td><td class="row1" align="center">${b.pcount}</td>
      <td class="row2 small">${b.lt_id ? `<a href="/thread/${b.lt_id}?page=last">${esc(b.lt_title.length > 18 ? b.lt_title.slice(0, 18) + '…' : b.lt_title)}</a><br>${fmtTime(b.lt_time)} by <a href="/user/${b.lt_uid}">${esc(b.lt_user)}</a>` : '<span class="gray">从未有人发帖</span>'}</td></tr>`;
  }
  html += '</table>';

  const latest = db.prepare(`SELECT t.id, t.title, t.reply_count, u.username, u.id AS uid, b.name AS bname FROM threads t JOIN users u ON u.id = t.user_id JOIN boards b ON b.id = t.board_id ORDER BY t.created_at DESC LIMIT 8`).all();
  const hot = db.prepare(`SELECT t.id, t.title, t.reply_count, t.views FROM threads t ORDER BY t.reply_count DESC, t.views DESC LIMIT 8`).all();
  html += `<table class="tbl two" cellspacing="1"><tr><th class="cap" width="50%">🆕 最新主题</th><th class="cap">🔥 热门主题</th></tr><tr>
    <td class="row1 list">${latest.map((x) => `· <a href="/thread/${x.id}">${esc(x.title)}</a> <span class="gray">[${esc(x.bname)}] by ${esc(x.username)}</span>`).join('<br>') || '<span class="gray">暂无</span>'}</td>
    <td class="row1 list">${hot.map((x) => `· <a href="/thread/${x.id}">${esc(x.title)}</a> <span class="gray">(${x.reply_count} 回复 / ${x.views} 浏览)</span>`).join('<br>') || '<span class="gray">暂无</span>'}</td></tr></table>`;

  const online = db.prepare('SELECT id, username, is_admin FROM users WHERE last_seen > ? ORDER BY username').all(t - 900);
  const stats = db.prepare(`SELECT (SELECT COUNT(*) FROM users) AS users, (SELECT COUNT(*) FROM threads) AS threads, (SELECT COUNT(*) FROM posts) AS posts,
    (SELECT COUNT(*) FROM posts WHERE created_at > ?) AS today`).get(t - ((t + 8 * 3600) % 86400));
  const newest = db.prepare('SELECT id, username FROM users ORDER BY id DESC LIMIT 1').get();
  html += `<table class="tbl" cellspacing="1"><tr><th class="cap">📊 论坛统计 &amp; 在线情况</th></tr><tr><td class="row1">
    共有会员 <b>${stats.users}</b> 人，主题 <b>${stats.threads}</b> 篇，帖子 <b>${stats.posts}</b> 篇，今日新帖 <b class="red">${stats.today}</b> 篇。
    ${newest ? `欢迎新会员 <a href="/user/${newest.id}"><b>${esc(newest.username)}</b></a>！` : ''}
    </td></tr><tr><td class="row2">
    目前在线 <b>${online.length + guests.size}</b> 人（会员 ${online.length} 人，游客 ${guests.size} 人）：
    ${online.map((o) => `<a href="/user/${o.id}" class="${o.is_admin ? 'adm' : ''}">${o.is_admin ? '👑' : '👤'}${esc(o.username)}</a>`).join('　') || '<span class="gray">暂无会员在线</span>'}
    </td></tr></table>`;
  ctx.send(200, layout(ctx, '首页', html));
});

route('GET', '/board/(\\d+)', (ctx, id) => {
  const b = db.prepare('SELECT * FROM boards WHERE id = ?').get(id);
  if (!b) return notFound(ctx, '版块');
  const total = db.prepare('SELECT COUNT(*) AS n FROM threads WHERE board_id = ?').get(id).n;
  const pages = Math.max(1, Math.ceil(total / PER_PAGE));
  const page = Math.min(pages, Math.max(1, Number(ctx.url.searchParams.get('page')) || 1));
  const rows = db.prepare(`SELECT t.*, u.username, u.id AS uid, lu.username AS luser, lu.id AS luid FROM threads t
    JOIN users u ON u.id = t.user_id JOIN users lu ON lu.id = t.last_post_user_id
    WHERE t.board_id = ? ORDER BY t.pinned DESC, t.last_post_at DESC LIMIT ? OFFSET ?`).all(id, PER_PAGE, (page - 1) * PER_PAGE);
  const tn = now();
  let html = `<div class="actions"><a class="btn" href="/new?board=${b.id}">✏️ 发表新帖</a>${pager(`/board/${b.id}`, page, pages)}</div>
  <table class="tbl" cellspacing="1"><tr><th class="cap" colspan="5">${esc(b.icon)} ${esc(b.name)} <span class="cap-desc">— ${esc(b.description)}</span></th></tr>
  <tr class="sub"><td width="30"></td><td>标题</td><td width="110" align="center">作者</td><td width="90" align="center">回复/查看</td><td width="170">最后发表</td></tr>`;
  for (const t of rows) {
    const icon = t.pinned ? '📌' : t.locked ? '🔒' : t.reply_count >= 15 ? '🔥' : tn - t.last_post_at < 86400 ? '📂' : '📁';
    const tp = Math.ceil((t.reply_count + 1) / PER_PAGE);
    html += `<tr><td class="row2 icon">${icon}</td>
      <td class="row1">${t.pinned ? '<b class="red">[置顶]</b> ' : ''}<a href="/thread/${t.id}" class="ttitle">${esc(t.title)}</a>${tn - t.created_at < 86400 ? ' <span class="new">NEW</span>' : ''}${tp > 1 ? ` <span class="gray small">[ 第 ${Array.from({ length: Math.min(tp, 5) }, (_, i) => `<a href="/thread/${t.id}?page=${i + 1}">${i + 1}</a>`).join(' ')}${tp > 5 ? ' …' : ''} 页 ]</span>` : ''}</td>
      <td class="row2" align="center"><a href="/user/${t.uid}">${esc(t.username)}</a><br><span class="small gray">${fmtTime(t.created_at).slice(0, 10)}</span></td>
      <td class="row1" align="center"><b>${t.reply_count}</b> / ${t.views}</td>
      <td class="row2 small"><a href="/thread/${t.id}?page=last">${fmtTime(t.last_post_at)}</a><br>by <a href="/user/${t.luid}">${esc(t.luser)}</a></td></tr>`;
  }
  if (!rows.length) html += `<tr><td class="row1" colspan="5" align="center"><br>本版块还没有帖子，快来<a href="/new?board=${b.id}">抢沙发</a>吧！<br><br></td></tr>`;
  html += `</table><div class="actions"><a class="btn" href="/new?board=${b.id}">✏️ 发表新帖</a>${pager(`/board/${b.id}`, page, pages)}</div>
  <div class="legend">📂 有新回复 ｜ 📁 无新回复 ｜ 🔥 热门帖子 ｜ 📌 置顶帖子 ｜ 🔒 已锁定</div>`;
  ctx.send(200, layout(ctx, b.name, html, { crumbs: [esc(b.name)] }));
});

const POST_SELECT = `SELECT p.*, u.id AS uid, u.username, u.avatar, u.signature, u.location, u.is_admin, u.post_count, u.created_at AS ucreated, u.last_seen
  FROM posts p JOIN users u ON u.id = p.user_id`;

route('GET', '/thread/(\\d+)', (ctx, id) => {
  const t = db.prepare('SELECT t.*, b.name AS bname FROM threads t JOIN boards b ON b.id = t.board_id WHERE t.id = ?').get(id);
  if (!t) return notFound(ctx, '帖子');
  db.prepare('UPDATE threads SET views = views + 1 WHERE id = ?').run(id);
  const total = t.reply_count + 1;
  const pages = Math.max(1, Math.ceil(total / PER_PAGE));
  const qp = ctx.url.searchParams.get('page');
  const page = qp === 'last' ? pages : Math.min(pages, Math.max(1, Number(qp) || 1));
  const posts = db.prepare(`${POST_SELECT} WHERE p.thread_id = ? ORDER BY p.id LIMIT ? OFFSET ?`).all(id, PER_PAGE, (page - 1) * PER_PAGE);
  const firstId = db.prepare('SELECT MIN(id) AS m FROM posts WHERE thread_id = ?').get(id).m;
  const u = ctx.user;
  const canReply = u && (!t.locked || u.is_admin);
  const csrfField = u ? `<input type="hidden" name="csrf" value="${u.csrf}">` : '';
  let html = `<div class="actions">${u ? `<a class="btn" href="/new?board=${t.board_id}">✏️ 发表新帖</a>` : ''}${canReply ? '<a class="btn" href="#reply">💬 回复帖子</a>' : ''}${pager(`/thread/${t.id}`, page, pages)}</div>
  <table class="tbl" cellspacing="1"><tr><th class="cap" colspan="2">${t.pinned ? '📌 ' : ''}${t.locked ? '🔒 ' : ''}${esc(t.title)} <span class="cap-desc">（浏览 ${t.views + 1} 次，回复 ${t.reply_count} 次）</span></th></tr>`;
  posts.forEach((p, i) => {
    const floor = (page - 1) * PER_PAGE + i + 1;
    const floorName = floor === 1 ? '楼主' : floor === 2 ? '沙发' : floor === 3 ? '板凳' : floor === 4 ? '地板' : `${floor} 楼`;
    const mine = u && (u.id === p.uid || u.is_admin);
    html += `<tr id="p${p.id}">${avatarCell(p)}
      <td class="postbody ${i % 2 ? 'row2' : 'row1'}">
        <div class="post-h"><span class="gray">📝 发表于 ${fmtTime(p.created_at)}</span><span class="floor">${floorName} <a href="#p${p.id}">#</a></span></div>
        <div class="content">${ubb(p.body)}</div>
        ${p.edited_at ? `<div class="edited">[ 本帖最后由 ${esc(p.username)} 于 ${fmtTime(p.edited_at)} 编辑 ]</div>` : ''}
        ${p.signature ? `<div class="sig">${ubb(p.signature)}</div>` : ''}
        <div class="post-f">
          ${canReply ? `<a href="/thread/${t.id}/reply?quote=${p.id}">[引用]</a>` : ''}
          ${mine ? `<a href="/post/${p.id}/edit">[编辑]</a>` : ''}
          ${mine && p.id !== firstId ? `<form method="post" action="/post/${p.id}/delete" class="inline" data-confirm="确定要删除这条回复吗？">${csrfField}<button class="linkbtn">[删除]</button></form>` : ''}
          <a href="/user/${p.uid}">[资料]</a> <a href="#">[顶部]</a>
        </div>
      </td></tr>`;
  });
  html += '</table>';
  html += `<div class="actions">${pager(`/thread/${t.id}`, page, pages)}</div>`;
  if (u && (u.is_admin || u.id === t.user_id)) {
    html += `<div class="mod">🛠 帖子管理：
      ${u.is_admin ? `<form method="post" action="/thread/${t.id}/pin" class="inline">${csrfField}<button>${t.pinned ? '取消置顶' : '置顶'}</button></form>
      <form method="post" action="/thread/${t.id}/lock" class="inline">${csrfField}<button>${t.locked ? '解除锁定' : '锁定'}</button></form>` : ''}
      <form method="post" action="/thread/${t.id}/delete" class="inline" data-confirm="确定删除整个主题（包括所有回复）吗？">${csrfField}<button>删除主题</button></form></div>`;
  }
  if (canReply) {
    html += `<a name="reply"></a>${box('💬 快速回复', `<form method="post" action="/thread/${t.id}/reply" class="postform">${csrfField}
      ${editor('body', '')}<div class="formbtns"><button type="submit" class="btn">发表回复</button> <span class="gray small">（Ctrl+Enter 也可以提交）</span></div></form>`)}`;
  } else if (!u) {
    html += box('💬 快速回复', `<p class="msg">您需要 <a href="/login?next=/thread/${t.id}">登录</a> 后才可以回帖。还没有账号？<a href="/register">立即注册</a></p>`);
  } else {
    html += box('💬 快速回复', '<p class="msg">🔒 本主题已被锁定，不能回复。</p>');
  }
  ctx.send(200, layout(ctx, t.title, html, { crumbs: [`<a href="/board/${t.board_id}">${esc(t.bname)}</a>`, esc(t.title)] }));
});

function editor(name, value) {
  return `<div class="ubb-bar" data-for="${name}">
    <button type="button" data-tag="b"><b>B</b></button><button type="button" data-tag="i"><i>I</i></button><button type="button" data-tag="u"><u>U</u></button><button type="button" data-tag="s"><s>S</s></button>
    <select data-tag="color"><option value="">颜色</option>${['red', 'blue', 'green', 'orange', 'purple', 'gray', 'navy', 'maroon'].map((c) => `<option value="${c}" style="color:${c}">${c}</option>`).join('')}</select>
    <select data-tag="size"><option value="">字号</option>${[1, 2, 3, 4, 5].map((n) => `<option value="${n}">${n}</option>`).join('')}</select>
    <button type="button" data-tag="url">链接</button><button type="button" data-tag="img">图片</button><button type="button" data-tag="quote">引用</button><button type="button" data-tag="code">代码</button><button type="button" data-tag="center">居中</button><button type="button" data-tag="fly">飞行字</button>
    <span class="smilies">${Object.entries({ ':)': '😊', ':D': '😄', ';)': '😉', ':P': '😛', ':(': '😞', ":'(": '😢', ':o': '😮', '8)': '😎', ':@': '😡', 'orz': '🙇' }).map(([k, v]) => `<a href="#" data-smile="${esc(k)}" title="${esc(k)}">${v}</a>`).join('')}</span>
  </div>
  <textarea name="${name}" id="${name}" rows="10" maxlength="20000" required>${esc(value)}</textarea>
`;
}

function boardOptions(selected) {
  return db.prepare('SELECT id, name, category FROM boards ORDER BY sort, id').all()
    .map((b) => `<option value="${b.id}" ${Number(selected) === b.id ? 'selected' : ''}>${esc(b.category)} › ${esc(b.name)}</option>`).join('');
}

route('GET', '/new', (ctx) => {
  if (!requireLogin(ctx)) return;
  const html = box('✏️ 发表新帖', `<form method="post" action="/new" class="postform"><input type="hidden" name="csrf" value="${ctx.user.csrf}">
    <table class="form"><tr><td class="lbl">所属版块：</td><td><select name="board">${boardOptions(ctx.url.searchParams.get('board'))}</select></td></tr>
    <tr><td class="lbl">帖子标题：</td><td><input name="title" size="60" maxlength="80" required></td></tr>
    <tr><td class="lbl">帖子内容：</td><td>${editor('body', '')}</td></tr>
    <tr><td></td><td><button type="submit" class="btn">发表帖子</button> <button type="reset">重新填写</button></td></tr></table></form>`);
  ctx.send(200, layout(ctx, '发表新帖', html, { crumbs: ['发表新帖'] }));
});

route('POST', '/new', (ctx) => {
  if (!requireLogin(ctx) || !checkCsrf(ctx)) return;
  const title = (ctx.body.title || '').trim();
  const body = (ctx.body.body || '').trim();
  const board = db.prepare('SELECT id FROM boards WHERE id = ?').get(Number(ctx.body.board));
  if (!board) return errorPage(ctx, '请选择一个版块。');
  if (title.length < 2 || title.length > 80) return errorPage(ctx, '标题长度需要在 2～80 个字之间。');
  if (body.length < 2 || body.length > 20000) return errorPage(ctx, '内容太短或太长啦（2～20000 字）。');
  if (rateLimited(ctx.ip, `post:${ctx.user.id}`, 6, 60)) return errorPage(ctx, '您发帖太快了，请喝杯茶休息一下再来～', 429);
  const t = now();
  const r = db.prepare('INSERT INTO threads (board_id, user_id, title, created_at, last_post_at, last_post_user_id) VALUES (?, ?, ?, ?, ?, ?)').run(board.id, ctx.user.id, title, t, t, ctx.user.id);
  db.prepare('INSERT INTO posts (thread_id, user_id, body, created_at) VALUES (?, ?, ?, ?)').run(r.lastInsertRowid, ctx.user.id, body, t);
  db.prepare('UPDATE users SET post_count = post_count + 1 WHERE id = ?').run(ctx.user.id);
  ctx.redirect(`/thread/${r.lastInsertRowid}`);
});

route('GET', '/thread/(\\d+)/reply', (ctx, id) => {
  if (!requireLogin(ctx)) return;
  const t = db.prepare('SELECT * FROM threads WHERE id = ?').get(id);
  if (!t) return notFound(ctx, '帖子');
  let initial = '';
  const q = db.prepare(`${POST_SELECT} WHERE p.id = ? AND p.thread_id = ?`).get(Number(ctx.url.searchParams.get('quote')), id);
  if (q) {
    const stripped = q.body.replace(/\[quote(?:=[^\]]*)?\][\s\S]*?\[\/quote\]/gi, '').trim();
    initial = `[quote=${q.username}]${stripped.length > 300 ? stripped.slice(0, 300) + '……' : stripped}[/quote]\n`;
  }
  const html = box(`💬 回复：${esc(t.title)}`, `<form method="post" action="/thread/${t.id}/reply" class="postform"><input type="hidden" name="csrf" value="${ctx.user.csrf}">
    ${editor('body', initial)}<div class="formbtns"><button type="submit" class="btn">发表回复</button></div></form>`);
  ctx.send(200, layout(ctx, '回复帖子', html, { crumbs: [`<a href="/thread/${t.id}">${esc(t.title)}</a>`, '回复'] }));
});

route('POST', '/thread/(\\d+)/reply', (ctx, id) => {
  if (!requireLogin(ctx) || !checkCsrf(ctx)) return;
  const t = db.prepare('SELECT * FROM threads WHERE id = ?').get(id);
  if (!t) return notFound(ctx, '帖子');
  if (t.locked && !ctx.user.is_admin) return errorPage(ctx, '本主题已被锁定，不能回复。', 403);
  const body = (ctx.body.body || '').trim();
  if (body.length < 2 || body.length > 20000) return errorPage(ctx, '回复内容太短或太长啦（2～20000 字）。灌水也要有诚意哦～');
  if (rateLimited(ctx.ip, `post:${ctx.user.id}`, 6, 60)) return errorPage(ctx, '您回帖太快了，请喝杯茶休息一下再来～', 429);
  const ts = now();
  const r = db.prepare('INSERT INTO posts (thread_id, user_id, body, created_at) VALUES (?, ?, ?, ?)').run(id, ctx.user.id, body, ts);
  db.prepare('UPDATE threads SET reply_count = reply_count + 1, last_post_at = ?, last_post_user_id = ? WHERE id = ?').run(ts, ctx.user.id, id);
  db.prepare('UPDATE users SET post_count = post_count + 1 WHERE id = ?').run(ctx.user.id);
  ctx.redirect(`/thread/${id}?page=last#p${r.lastInsertRowid}`);
});

function loadOwnPost(ctx, id) {
  const p = db.prepare('SELECT p.*, t.title, t.board_id, t.user_id AS tuid FROM posts p JOIN threads t ON t.id = p.thread_id WHERE p.id = ?').get(id);
  if (!p) { notFound(ctx, '帖子'); return null; }
  if (p.user_id !== ctx.user.id && !ctx.user.is_admin) { errorPage(ctx, '您没有权限操作这个帖子。', 403); return null; }
  p.isFirst = db.prepare('SELECT MIN(id) AS m FROM posts WHERE thread_id = ?').get(p.thread_id).m === p.id;
  return p;
}

route('GET', '/post/(\\d+)/edit', (ctx, id) => {
  if (!requireLogin(ctx)) return;
  const p = loadOwnPost(ctx, id);
  if (!p) return;
  const html = box('✏️ 编辑帖子', `<form method="post" action="/post/${p.id}/edit" class="postform"><input type="hidden" name="csrf" value="${ctx.user.csrf}">
    <table class="form">${p.isFirst ? `<tr><td class="lbl">帖子标题：</td><td><input name="title" size="60" maxlength="80" value="${esc(p.title)}" required></td></tr>` : ''}
    <tr><td class="lbl">帖子内容：</td><td>${editor('body', p.body)}</td></tr>
    <tr><td></td><td><button type="submit" class="btn">保存修改</button></td></tr></table></form>`);
  ctx.send(200, layout(ctx, '编辑帖子', html, { crumbs: [`<a href="/thread/${p.thread_id}">${esc(p.title)}</a>`, '编辑'] }));
});

route('POST', '/post/(\\d+)/edit', (ctx, id) => {
  if (!requireLogin(ctx) || !checkCsrf(ctx)) return;
  const p = loadOwnPost(ctx, id);
  if (!p) return;
  const body = (ctx.body.body || '').trim();
  if (body.length < 2 || body.length > 20000) return errorPage(ctx, '内容太短或太长啦（2～20000 字）。');
  if (p.isFirst) {
    const title = (ctx.body.title || '').trim();
    if (title.length < 2 || title.length > 80) return errorPage(ctx, '标题长度需要在 2～80 个字之间。');
    db.prepare('UPDATE threads SET title = ? WHERE id = ?').run(title, p.thread_id);
  }
  db.prepare('UPDATE posts SET body = ?, edited_at = ? WHERE id = ?').run(body, now(), id);
  const pos = db.prepare('SELECT COUNT(*) AS n FROM posts WHERE thread_id = ? AND id <= ?').get(p.thread_id, id).n;
  ctx.redirect(`/thread/${p.thread_id}?page=${Math.ceil(pos / PER_PAGE)}#p${id}`);
});

function refreshThread(threadId) {
  const last = db.prepare('SELECT user_id, created_at FROM posts WHERE thread_id = ? ORDER BY id DESC LIMIT 1').get(threadId);
  const n = db.prepare('SELECT COUNT(*) AS n FROM posts WHERE thread_id = ?').get(threadId).n;
  db.prepare('UPDATE threads SET reply_count = ?, last_post_at = ?, last_post_user_id = ? WHERE id = ?').run(n - 1, last.created_at, last.user_id, threadId);
}

route('POST', '/post/(\\d+)/delete', (ctx, id) => {
  if (!requireLogin(ctx) || !checkCsrf(ctx)) return;
  const p = loadOwnPost(ctx, id);
  if (!p) return;
  if (p.isFirst) return errorPage(ctx, '楼主帖不能单独删除，请使用“删除主题”。');
  db.prepare('DELETE FROM posts WHERE id = ?').run(id);
  db.prepare('UPDATE users SET post_count = MAX(0, post_count - 1) WHERE id = ?').run(p.user_id);
  refreshThread(p.thread_id);
  ctx.redirect(`/thread/${p.thread_id}?page=last`);
});

route('POST', '/thread/(\\d+)/(pin|lock|delete)', (ctx, id, action) => {
  if (!requireLogin(ctx) || !checkCsrf(ctx)) return;
  const t = db.prepare('SELECT * FROM threads WHERE id = ?').get(id);
  if (!t) return notFound(ctx, '帖子');
  const owner = t.user_id === ctx.user.id;
  if (!ctx.user.is_admin && !(action === 'delete' && owner)) return errorPage(ctx, '只有管理员才能进行这个操作。', 403);
  if (action === 'pin') db.prepare('UPDATE threads SET pinned = 1 - pinned WHERE id = ?').run(id);
  if (action === 'lock') db.prepare('UPDATE threads SET locked = 1 - locked WHERE id = ?').run(id);
  if (action === 'delete') {
    const counts = db.prepare('SELECT user_id, COUNT(*) AS n FROM posts WHERE thread_id = ? GROUP BY user_id').all(id);
    const dec = db.prepare('UPDATE users SET post_count = MAX(0, post_count - ?) WHERE id = ?');
    counts.forEach((c) => dec.run(c.n, c.user_id));
    db.prepare('DELETE FROM threads WHERE id = ?').run(id);
    return ctx.redirect(`/board/${t.board_id}`);
  }
  ctx.redirect(`/thread/${id}`);
});

// ---------- 注册 / 登录 ----------
function authForm(ctx, kind, err = '', vals = {}) {
  const isReg = kind === 'register';
  const next = ctx.url.searchParams.get('next') || vals.next || '';
  const html = box(isReg ? '📝 注册新用户' : '🔑 用户登录', `
    ${err ? `<div class="err">⚠️ ${esc(err)}</div>` : ''}
    <form method="post" action="/${kind}"><input type="hidden" name="next" value="${esc(next)}">
    <table class="form">
      <tr><td class="lbl">用户名：</td><td><input name="username" size="24" maxlength="16" value="${esc(vals.username || '')}" required autofocus> ${isReg ? '<span class="gray small">2～16 个字符，中文、字母、数字、下划线</span>' : ''}</td></tr>
      <tr><td class="lbl">密　码：</td><td><input type="password" name="password" size="24" maxlength="100" required> ${isReg ? '<span class="gray small">至少 6 位</span>' : ''}</td></tr>
      ${isReg ? `<tr><td class="lbl">确认密码：</td><td><input type="password" name="password2" size="24" maxlength="100" required></td></tr>
      <tr><td class="lbl">选择头像：</td><td class="avatars">${AVATARS.map((a, i) => `<label><input type="radio" name="avatar" value="${a}" ${(vals.avatar || AVATARS[0]) === a || (!vals.avatar && i === 0) ? 'checked' : ''}><span>${a}</span></label>`).join('')}</td></tr>
      <tr><td class="lbl">论坛规则：</td><td><label><input type="checkbox" name="agree" value="1" required> 我已阅读并同意 <a href="/help" target="_blank">论坛规则</a>，保证文明发帖</label></td></tr>` : ''}
      <tr><td></td><td><button type="submit" class="btn">${isReg ? '提交注册' : '登 录'}</button>
      ${isReg ? '　已有账号？<a href="/login">点此登录</a>' : '　还没有账号？<a href="/register">立即注册</a>'}</td></tr>
    </table></form>`, 'narrow');
  ctx.send(err ? 400 : 200, layout(ctx, isReg ? '注册' : '登录', html, { crumbs: [isReg ? '注册' : '登录'] }));
}
const safeNext = (n) => (typeof n === 'string' && /^\/(?!\/)/.test(n) ? n : '/');

route('GET', '/register', (ctx) => (ctx.user ? ctx.redirect('/') : authForm(ctx, 'register')));
route('GET', '/login', (ctx) => (ctx.user ? ctx.redirect('/') : authForm(ctx, 'login')));

route('POST', '/register', (ctx) => {
  const { username = '', password = '', password2 = '', avatar = '', agree } = ctx.body;
  const name = username.trim();
  const vals = { username: name, avatar, next: ctx.body.next };
  if (!/^[\p{Script=Han}A-Za-z0-9_]{2,16}$/u.test(name)) return authForm(ctx, 'register', '用户名需为 2～16 个字符，只能包含中文、字母、数字和下划线。', vals);
  if (password.length < 6) return authForm(ctx, 'register', '密码至少需要 6 位。', vals);
  if (password !== password2) return authForm(ctx, 'register', '两次输入的密码不一致。', vals);
  if (!agree) return authForm(ctx, 'register', '请先同意论坛规则。', vals);
  if (rateLimited(ctx.ip, 'register', 5, 3600)) return authForm(ctx, 'register', '注册太频繁了，请稍后再试。', vals);
  if (db.prepare('SELECT 1 FROM users WHERE username = ?').get(name)) return authForm(ctx, 'register', '这个用户名已经被别人注册了，换一个吧。', vals);
  const salt = crypto.randomBytes(16).toString('hex');
  const isFirst = db.prepare('SELECT COUNT(*) AS n FROM users').get().n === 0;
  const t = now();
  const r = db.prepare('INSERT INTO users (username, pass_hash, salt, avatar, is_admin, created_at, last_seen) VALUES (?, ?, ?, ?, ?, ?, ?)')
    .run(name, hashPassword(password, salt), salt, AVATARS.includes(avatar) ? avatar : AVATARS[0], isFirst ? 1 : 0, t, t);
  ctx.setCookie(cookie('sid', createSession(r.lastInsertRowid), 30 * 86400));
  ctx.setCookie(cookie('flash', isFirst ? '注册成功！您是第一位会员，已自动成为管理员 👑' : `注册成功！欢迎加入${SITE_NAME}，记得去“新人报到”打个招呼哦～`, 60));
  ctx.redirect(safeNext(ctx.body.next));
});

route('POST', '/login', (ctx) => {
  const { username = '', password = '' } = ctx.body;
  const vals = { username: username.trim(), next: ctx.body.next };
  if (rateLimited(ctx.ip, 'login', 10, 600)) return authForm(ctx, 'login', '登录尝试次数过多，请 10 分钟后再试。', vals);
  const u = db.prepare('SELECT * FROM users WHERE username = ?').get(username.trim());
  const ok = u && crypto.timingSafeEqual(Buffer.from(hashPassword(password, u.salt), 'hex'), Buffer.from(u.pass_hash, 'hex'));
  if (!ok) return authForm(ctx, 'login', '用户名或密码错误。', vals);
  ctx.setCookie(cookie('sid', createSession(u.id), 30 * 86400));
  ctx.setCookie(cookie('flash', `登录成功，欢迎回来，${u.username}！`, 60));
  ctx.redirect(safeNext(ctx.body.next));
});

route('POST', '/logout', (ctx) => {
  if (ctx.user && ctx.body.csrf === ctx.user.csrf) db.prepare('DELETE FROM sessions WHERE token = ?').run(ctx.user.token);
  ctx.setCookie(cookie('sid', '', 0));
  ctx.redirect('/');
});

// ---------- 用户资料 ----------
route('GET', '/user/(\\d+)', (ctx, id) => {
  const u = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
  if (!u) return notFound(ctx, '用户');
  const r = rankOf(u);
  const threads = db.prepare('SELECT t.id, t.title, t.created_at, t.reply_count FROM threads t WHERE t.user_id = ? ORDER BY t.created_at DESC LIMIT 15').all(id);
  const replies = db.prepare(`SELECT p.id, p.body, p.created_at, t.id AS tid, t.title FROM posts p JOIN threads t ON t.id = p.thread_id
    WHERE p.user_id = ? AND p.id != (SELECT MIN(id) FROM posts WHERE thread_id = t.id) ORDER BY p.id DESC LIMIT 15`).all(id);
  const html = `<table class="tbl" cellspacing="1"><tr><th class="cap" colspan="2">👤 ${esc(u.username)} 的个人资料</th></tr>
    <tr><td class="row2 profile-av" width="160" align="center"><div class="avatar big">${esc(u.avatar)}</div><b>${esc(u.username)}</b><br>${r.title}<br><span class="stars">${r.stars}</span></td>
    <td class="row1"><table class="form">
      <tr><td class="lbl">用户 ID：</td><td>${u.id}</td></tr>
      <tr><td class="lbl">注册时间：</td><td>${fmtTime(u.created_at)}</td></tr>
      <tr><td class="lbl">最后活动：</td><td>${fmtTime(u.last_seen)} ${now() - u.last_seen < 900 ? '<span class="on">● 在线</span>' : ''}</td></tr>
      <tr><td class="lbl">发帖数：</td><td>${u.post_count}</td></tr>
      <tr><td class="lbl">来自：</td><td>${esc(u.location) || '<span class="gray">保密</span>'}</td></tr>
      <tr><td class="lbl">OICQ：</td><td>${esc(u.qq) || '<span class="gray">保密</span>'}</td></tr>
      <tr><td class="lbl">个性签名：</td><td>${u.signature ? ubb(u.signature) : '<span class="gray">这家伙很懒，什么也没留下</span>'}</td></tr>
    </table></td></tr></table>
    <table class="tbl two" cellspacing="1"><tr><th class="cap" width="50%">发表的主题</th><th class="cap">最近的回复</th></tr><tr>
      <td class="row1 list">${threads.map((x) => `· <a href="/thread/${x.id}">${esc(x.title)}</a> <span class="gray">${fmtTime(x.created_at).slice(0, 10)} (${x.reply_count} 回复)</span>`).join('<br>') || '<span class="gray">暂无</span>'}</td>
      <td class="row1 list">${replies.map((x) => `· <a href="/thread/${x.tid}">${esc(x.title)}</a> <span class="gray">${fmtTime(x.created_at).slice(0, 10)}</span>`).join('<br>') || '<span class="gray">暂无</span>'}</td>
    </tr></table>`;
  ctx.send(200, layout(ctx, `${u.username} 的资料`, html, { crumbs: ['<a href="/members">会员列表</a>', esc(u.username)] }));
});

function profileForm(ctx, err = '') {
  const u = ctx.user;
  const csrf = `<input type="hidden" name="csrf" value="${u.csrf}">`;
  let html = err ? `<div class="err">⚠️ ${esc(err)}</div>` : '';
  html += box('⚙️ 控制面板 — 修改个人资料', `<form method="post" action="/profile">${csrf}<table class="form">
    <tr><td class="lbl">头像：</td><td class="avatars">${AVATARS.map((a) => `<label><input type="radio" name="avatar" value="${a}" ${u.avatar === a ? 'checked' : ''}><span>${a}</span></label>`).join('')}</td></tr>
    <tr><td class="lbl">来自：</td><td><input name="location" size="30" maxlength="30" value="${esc(u.location)}"></td></tr>
    <tr><td class="lbl">OICQ：</td><td><input name="qq" size="20" maxlength="15" value="${esc(u.qq)}"></td></tr>
    <tr><td class="lbl">个性签名：</td><td><textarea name="signature" rows="4" cols="60" maxlength="300">${esc(u.signature)}</textarea><br><span class="gray small">最多 300 字，支持 UBB 代码</span></td></tr>
    <tr><td></td><td><button type="submit" class="btn">保存资料</button></td></tr></table></form>`);
  html += box('🔐 修改密码', `<form method="post" action="/profile/password">${csrf}<table class="form">
    <tr><td class="lbl">原密码：</td><td><input type="password" name="old" required></td></tr>
    <tr><td class="lbl">新密码：</td><td><input type="password" name="password" required></td></tr>
    <tr><td class="lbl">确认新密码：</td><td><input type="password" name="password2" required></td></tr>
    <tr><td></td><td><button type="submit" class="btn">修改密码</button></td></tr></table></form>`);
  if (u.is_admin) {
    html += box('👑 管理员 — 论坛公告', `<form method="post" action="/admin/announcement">${csrf}<input name="text" size="90" maxlength="300" value="${esc(kvGet('announcement', ''))}"> <button type="submit" class="btn">更新公告</button></form>`);
    const boards = db.prepare('SELECT * FROM boards ORDER BY sort, id').all();
    html += box('👑 管理员 — 版块管理', `<table class="form">${boards.map((b) => `<tr><td>${esc(b.icon)} <b>${esc(b.name)}</b> <span class="gray">[${esc(b.category)}]</span></td>
      <td><form method="post" action="/admin/board/${b.id}/delete" class="inline" data-confirm="删除版块会同时删除其中所有帖子，确定吗？">${csrf}<button>删除</button></form></td></tr>`).join('')}</table>
      <form method="post" action="/admin/board">${csrf}<b>新增版块：</b> 分区 <input name="category" size="10" maxlength="20" required value="综合讨论区"> 图标 <input name="icon" size="3" maxlength="4" value="📁">
      名称 <input name="name" size="12" maxlength="20" required> 简介 <input name="description" size="30" maxlength="80"> <button type="submit" class="btn">添加</button></form>`);
  }
  ctx.send(err ? 400 : 200, layout(ctx, '控制面板', html, { crumbs: ['控制面板'] }));
}
route('GET', '/profile', (ctx) => { if (requireLogin(ctx)) profileForm(ctx); });
route('POST', '/profile', (ctx) => {
  if (!requireLogin(ctx) || !checkCsrf(ctx)) return;
  const { avatar = '', location = '', qq = '', signature = '' } = ctx.body;
  if (qq && !/^\d{5,12}$/.test(qq.trim())) return profileForm(ctx, 'OICQ 号码应为 5～12 位数字。');
  db.prepare('UPDATE users SET avatar = ?, location = ?, qq = ?, signature = ? WHERE id = ?')
    .run(AVATARS.includes(avatar) ? avatar : ctx.user.avatar, location.trim().slice(0, 30), qq.trim(), signature.trim().slice(0, 300), ctx.user.id);
  ctx.setCookie(cookie('flash', '个人资料已保存。', 60));
  ctx.redirect('/profile');
});
route('POST', '/profile/password', (ctx) => {
  if (!requireLogin(ctx) || !checkCsrf(ctx)) return;
  const { old = '', password = '', password2 = '' } = ctx.body;
  const u = db.prepare('SELECT * FROM users WHERE id = ?').get(ctx.user.id);
  if (!crypto.timingSafeEqual(Buffer.from(hashPassword(old, u.salt), 'hex'), Buffer.from(u.pass_hash, 'hex'))) return profileForm(ctx, '原密码不正确。');
  if (password.length < 6) return profileForm(ctx, '新密码至少需要 6 位。');
  if (password !== password2) return profileForm(ctx, '两次输入的新密码不一致。');
  const salt = crypto.randomBytes(16).toString('hex');
  db.prepare('UPDATE users SET pass_hash = ?, salt = ? WHERE id = ?').run(hashPassword(password, salt), salt, u.id);
  db.prepare('DELETE FROM sessions WHERE user_id = ? AND token != ?').run(u.id, ctx.user.token);
  ctx.setCookie(cookie('flash', '密码已修改，其他设备上的登录已失效。', 60));
  ctx.redirect('/profile');
});

function requireAdmin(ctx) {
  if (!requireLogin(ctx) || !checkCsrf(ctx)) return false;
  if (!ctx.user.is_admin) { errorPage(ctx, '只有管理员才能进行这个操作。', 403); return false; }
  return true;
}
route('POST', '/admin/announcement', (ctx) => {
  if (!requireAdmin(ctx)) return;
  kvSet('announcement', (ctx.body.text || '').trim().slice(0, 300));
  ctx.redirect('/profile');
});
route('POST', '/admin/board', (ctx) => {
  if (!requireAdmin(ctx)) return;
  const { category = '', name = '', description = '', icon = '' } = ctx.body;
  if (!name.trim() || !category.trim()) return profileForm(ctx, '版块名称和分区不能为空。');
  const max = db.prepare('SELECT COALESCE(MAX(sort), 0) AS m FROM boards').get().m;
  db.prepare('INSERT INTO boards (category, name, description, icon, sort) VALUES (?, ?, ?, ?, ?)').run(category.trim().slice(0, 20), name.trim().slice(0, 20), description.trim().slice(0, 80), icon.trim().slice(0, 4) || '📁', max + 1);
  ctx.redirect('/profile');
});
route('POST', '/admin/board/(\\d+)/delete', (ctx, id) => {
  if (!requireAdmin(ctx)) return;
  const counts = db.prepare('SELECT p.user_id, COUNT(*) AS n FROM posts p JOIN threads t ON t.id = p.thread_id WHERE t.board_id = ? GROUP BY p.user_id').all(id);
  const dec = db.prepare('UPDATE users SET post_count = MAX(0, post_count - ?) WHERE id = ?');
  counts.forEach((c) => dec.run(c.n, c.user_id));
  db.prepare('DELETE FROM boards WHERE id = ?').run(id);
  ctx.redirect('/profile');
});

// ---------- 会员列表 / 搜索 / 帮助 ----------
route('GET', '/members', (ctx) => {
  const total = db.prepare('SELECT COUNT(*) AS n FROM users').get().n;
  const pages = Math.max(1, Math.ceil(total / 30));
  const page = Math.min(pages, Math.max(1, Number(ctx.url.searchParams.get('page')) || 1));
  const rows = db.prepare('SELECT * FROM users ORDER BY id LIMIT 30 OFFSET ?').all((page - 1) * 30);
  const html = `<table class="tbl" cellspacing="1"><tr><th class="cap" colspan="6">👥 会员列表（共 ${total} 人）</th></tr>
    <tr class="sub"><td width="50" align="center">ID</td><td>用户名</td><td>等级</td><td align="center">发帖</td><td>注册时间</td><td>来自</td></tr>
    ${rows.map((u, i) => `<tr class="${i % 2 ? 'row2' : 'row1'}"><td align="center">${u.id}</td><td>${esc(u.avatar)} <a href="/user/${u.id}">${esc(u.username)}</a></td><td>${rankOf(u).title} <span class="stars">${rankOf(u).stars}</span></td><td align="center">${u.post_count}</td><td>${fmtTime(u.created_at)}</td><td>${esc(u.location)}</td></tr>`).join('')}
    </table>${pager('/members', page, pages)}`;
  ctx.send(200, layout(ctx, '会员列表', html, { crumbs: ['会员列表'] }));
});

route('GET', '/search', (ctx) => {
  const q = (ctx.url.searchParams.get('q') || '').trim().slice(0, 50);
  let html = box('🔍 论坛搜索', `<form method="get" action="/search">关键字：<input name="q" size="40" value="${esc(q)}"> <button type="submit" class="btn">搜 索</button> <span class="gray small">搜索帖子标题和内容</span></form>`);
  if (q) {
    const like = `%${q.replace(/[\\%_]/g, (c) => '\\' + c)}%`;
    const rows = db.prepare(`SELECT p.id, p.body, p.created_at, t.id AS tid, t.title, u.username, u.id AS uid FROM posts p
      JOIN threads t ON t.id = p.thread_id JOIN users u ON u.id = p.user_id
      WHERE t.title LIKE ? ESCAPE '\\' OR p.body LIKE ? ESCAPE '\\' ORDER BY p.id DESC LIMIT 50`).all(like, like);
    html += `<table class="tbl" cellspacing="1"><tr><th class="cap" colspan="3">搜索结果：找到 ${rows.length}${rows.length === 50 ? '+' : ''} 条</th></tr>
      ${rows.map((r, i) => `<tr class="${i % 2 ? 'row2' : 'row1'}"><td><a href="/thread/${r.tid}"><b>${esc(r.title)}</b></a><div class="small gray">${esc(r.body.replace(/\[[^\]]*\]/g, '').slice(0, 100))}</div></td>
        <td width="100"><a href="/user/${r.uid}">${esc(r.username)}</a></td><td width="130" class="small">${fmtTime(r.created_at)}</td></tr>`).join('') || '<tr><td class="row1">没有找到相关帖子。</td></tr>'}</table>`;
  }
  ctx.send(200, layout(ctx, '搜索', html, { crumbs: ['搜索'] }));
});

route('GET', '/help', (ctx) => {
  const html = box('❓ 论坛帮助 &amp; 规则', `<div class="help">
    <h3>📜 论坛规则</h3><ol><li>遵守国家法律法规，不发布违法、色情、暴力内容。</li><li>文明发言，不人身攻击，不恶意灌水刷屏。</li><li>不发布广告和垃圾信息，违者删帖处理。</li><li>尊重他人隐私，不随意公开他人信息。</li><li>管理员有权删除违规帖子、锁定主题。</li></ol>
    <h3>🔤 UBB 代码</h3><table class="tbl" cellspacing="1"><tr class="sub"><td>你输入</td><td>显示效果</td></tr>
    ${['[b]粗体[/b]', '[i]斜体[/i]', '[u]下划线[/u]', '[s]删除线[/s]', '[color=red]红色文字[/color]', '[size=4]大号字[/size]', '[url=https://example.com]超链接[/url]', '[quote=网友]引用内容[/quote]', '[code]print("hello")[/code]', '[center]居中[/center]', '[fly]飞来飞去的字[/fly]', ':) :D ;) :P :( :\'( :o 8) :@ orz ^_^'].map((x, i) => `<tr class="${i % 2 ? 'row2' : 'row1'}"><td><code>${esc(x)}</code></td><td>${ubb(x)}</td></tr>`).join('')}
    </table>
    <h3>⭐ 会员等级</h3><p>新手上路（0 帖）→ 初级会员（5）→ 中级会员（30）→ 高级会员（100）→ 资深会员（300）→ 论坛元老（1000）</p>
    <h3>📌 楼层称呼</h3><p>1 楼 = 楼主，2 楼 = 沙发，3 楼 = 板凳，4 楼 = 地板。抢沙发要趁早！</p></div>`);
  ctx.send(200, layout(ctx, '帮助', html, { crumbs: ['帮助'] }));
});

// ---------- 静态文件 ----------
const STATIC = { '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.png': 'image/png', '.gif': 'image/gif', '.ico': 'image/x-icon' };
function serveStatic(req, res, rel) {
  const file = path.join(__dirname, 'public', path.normalize(rel).replace(/^([/\\]|\.\.)+/, ''));
  if (!file.startsWith(path.join(__dirname, 'public') + path.sep)) { res.writeHead(404); return res.end(); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, { 'Content-Type': STATIC[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'public, max-age=3600' });
    res.end(data);
  });
}

// ---------- 服务器 ----------
const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (url.pathname.startsWith('/static/')) return serveStatic(req, res, url.pathname.slice(8));
  if (url.pathname === '/favicon.ico') { res.writeHead(204); return res.end(); }
  const ip = (process.env.TRUST_PROXY === '1' && String(req.headers['x-forwarded-for'] || '').split(',')[0].trim()) || req.socket.remoteAddress || '?';
  const setCookies = [];
  const ctx = {
    req, url, ip, body: {},
    user: null,
    flash: '',
    setCookie: (c) => setCookies.push(c),
    send(status, html) {
      res.writeHead(status, {
        'Content-Type': 'text/html; charset=utf-8',
        'Set-Cookie': setCookies,
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'Referrer-Policy': 'same-origin',
        'Content-Security-Policy': "default-src 'self'; img-src * data:; style-src 'self' 'unsafe-inline'; script-src 'self'; form-action 'self'; frame-ancestors 'self'",
      });
      res.end(html);
    },
    redirect(loc) { res.writeHead(303, { Location: loc, 'Set-Cookie': setCookies }); res.end(); },
  };
  const handle = () => {
    try {
      ctx.user = loadSession(req);
      const cookies = parseCookies(req);
      if (cookies.flash) { ctx.flash = cookies.flash; ctx.setCookie(cookie('flash', '', 0)); }
      if (req.method === 'GET' && !cookies.v) {
        kvSet('visits', Number(kvGet('visits', '0')) + 1);
        ctx.setCookie(`v=1; Path=/; Max-Age=21600; SameSite=Lax${SECURE_COOKIE ? '; Secure' : ''}`);
      }
      if (!ctx.user) guests.set(ip, now()); else guests.delete(ip);
      for (const r of routes) {
        if (r.method !== req.method) continue;
        const m = url.pathname.match(r.re);
        if (m) return r.handler(ctx, ...m.slice(1));
      }
      notFound(ctx);
    } catch (e) {
      console.error(e);
      if (!res.headersSent) { res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' }); res.end('服务器开小差了，请稍后再试。'); }
    }
  };
  if (req.method === 'POST') {
    // 同源检查：拒绝来自其他站点的表单提交
    const origin = req.headers.origin;
    if (origin && origin !== 'null') {
      try { if (new URL(origin).host !== req.headers.host) { res.writeHead(403); return res.end('Cross-site request blocked'); } } catch { res.writeHead(403); return res.end(); }
    }
    let data = '';
    let tooBig = false;
    req.setEncoding('utf8');
    req.on('data', (c) => { data += c; if (data.length > 200_000) { tooBig = true; req.destroy(); } });
    req.on('end', () => {
      if (tooBig) return;
      ctx.body = Object.fromEntries(new URLSearchParams(data));
      handle();
    });
  } else {
    handle();
  }
});

server.listen(PORT, () => console.log(`${SITE_NAME} 已启动：http://localhost:${PORT}`));
