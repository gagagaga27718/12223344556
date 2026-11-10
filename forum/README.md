# 千禧论坛 Millennium BBS

一个 2000 年代老式 BBS 风格的论坛：蓝色渐变表格、跑马灯公告、闪烁的 NEW、访客计数器、楼主/沙发/板凳、会员等级星星、UBB 代码和表情。

**零依赖**：只需要 Node.js 22.13 以上（用内置的 `node:sqlite` 存数据），不用 `npm install`。

## 本地运行

```bash
cd forum
npm start
# 打开 http://localhost:3000
```

**第一个注册的账号自动成为管理员**（可以置顶/锁定/删帖、改公告、增删版块）。

## 功能

- 账号注册 / 登录 / 退出，修改密码（scrypt 加盐哈希，会话 Cookie 为 HttpOnly）
- 版块分区、主题列表分页、置顶 📌、锁定 🔒、热帖 🔥
- 发帖、回帖、引用回复、编辑（显示“本帖最后由…编辑”）、删除
- UBB 代码：`[b] [i] [u] [s] [color] [size] [url] [img] [quote] [code] [center] [fly]`，表情 `:) :D ;) :P orz ^_^`…
- 个人资料：头像、来自、OICQ、个性签名，发帖记录
- 会员列表、全文搜索、在线会员 / 游客、论坛统计、访客计数器
- 安全：所有输入转义、链接只允许 http/https、CSRF 令牌 + 同源检查、CSP、登录/注册/发帖限流

## 环境变量

| 变量 | 默认 | 说明 |
| --- | --- | --- |
| `PORT` | `3000` | 监听端口 |
| `DATA_DIR` | `./data` | SQLite 数据库目录（`forum.db`），**部署时请挂载持久化磁盘** |
| `SITE_NAME` | `千禧论坛` | 论坛名称 |
| `COOKIE_SECURE` | 未设置 | 通过 HTTPS 访问时设为 `1` |
| `TRUST_PROXY` | 未设置 | 在反向代理后面时设为 `1`，使用 `X-Forwarded-For` 识别 IP |

## 部署到公网

GitHub Pages 只能放静态网页，跑不了这个论坛（它需要服务器保存账号和帖子）。可以部署到任何能跑 Node 或 Docker 的地方：

- **Docker**：`docker build -t bbs forum && docker run -p 3000:3000 -v bbs-data:/data bbs`
- **Render / Railway / Fly.io / Zeabur 等**：根目录选 `forum`，启动命令 `npm start`，挂一块持久化磁盘到 `/data` 并设置 `DATA_DIR=/data`、`COOKIE_SECURE=1`、`TRUST_PROXY=1`
- **自己的 VPS**：`node --no-warnings server.js`，前面用 Nginx/Caddy 做 HTTPS 反代

数据都在一个 `forum.db` 文件里，备份时复制这个文件即可。
