# StudyLoop — 三科互动刷题网站（完整源码）

线上地址：<https://studyloop.pplx.app>
本压缩包内代码与线上运行版本**逐字节一致**（已通过 MD5 校验全部 8 个文件）。

## 项目概况

- 定位：AP Human Geography / Honors Biology / Pre-Calculus 三科互动刷题网站
- 语言界面：中英双语可切换（默认中文）
- 题型：选择题（MCQ）、FRQ 简答题（自评）、画图题（Canvas 画板 + 参考图自评）
- 核心特性：
  - 无限刷题：题库 + 程序化生成的题目混合，每轮不重复
  - 错题本：自动收录答错的题，支持"错题强化练习"（每道错题在一轮中出现 3 次）
  - 笔记：按科目记录，与错题本一起持久化在浏览器 localStorage
  - 题目包导入/导出：JSON 格式，可导入外部生成的题目包

## 技术栈说明（重要）

本项目是**纯静态网站**，没有任何构建步骤、打包器或运行时依赖：

- 没有 package.json、node_modules、webpack/vite 配置——这是有意为之的设计
- 没有 React/Vue/TypeScript——使用原生 JavaScript（ES5 兼容写法）+ 原生 DOM 操作
- 没有 CSS 预处理器——单个手写 CSS 文件，使用 CSS 自定义属性（design tokens）
- 没有后端、数据库、API 调用、环境变量——所有数据（题库、错题、笔记）都在浏览器本地
- **不包含任何 API Key、密码或秘密信息**，可以放心分享

## 文件结构

```
study-quiz/
├── index.html          # 唯一页面（SPA 入口），引入字体与全部脚本
├── css/
│   └── style.css       # 全部样式（design tokens + 组件样式）
├── js/
│   ├── data-geo.js     # AP 人文地理题库（7 个单元，静态题目）
│   ├── data-bio.js     # 生物题库（10 个单元，静态题目）
│   ├── data-precalc.js # 微积分预备题库（9 个单元，静态题目）
│   ├── generators.js   # 程序化题目生成器（32 个生成器 + SVG 图表构建函数）
│   ├── data-extras.js  # FRQ 简答题 + 画图题（每科各 2+2 道）
│   └── app.js          # 应用逻辑（视图渲染、路由状态、事件、画板、持久化）
└── README.md           # 本文件
```

加载顺序（index.html 底部，顺序重要）：data-geo → data-bio → data-precalc → generators → data-extras → app。

## 本地运行

任意静态文件服务器均可，例如：

```bash
# Python
python3 -m http.server 8765
# 或 Node（如果装了 serve）
npx serve . -l 8765
```

然后访问 `http://localhost:8765`。直接双击 index.html 用 file:// 打开也可以工作（无 CORS 限制的普通脚本），但建议用本地服务器。

## 数据结构（给继续开发的 AI / 开发者）

### 1. 学科与单元（data-*.js）

全局变量：`window.SUBJECT_GEO` / `window.SUBJECT_BIO` / `window.SUBJECT_PRECALC`

```js
{
  id: "geo",                    // 学科 id，同时用于 CSS 主题色 body[data-accent]
  name: { en: "...", zh: "..." },
  tagline: { en: "...", zh: "..." },
  units: [
    {
      id: "geo1",               // 单元 id（题库、FRQ/画图题、导入包都用它关联）
      name: { en: "...", zh: "..." },
      topics: [ { en: "...", zh: "..." }, ... ],  // 知识点列表
      questions: [ /* 该单元的静态 MCQ */ ]
    }
  ]
}
```

### 2. 选择题（静态与生成器共用同一 schema）

```js
{
  t: "vocab",                  // 题目类型标签（显示用）：vocab / concept / calculation / application
  q: { en: "...", zh: "..." },  // 题干（必须双语）
  o: [ {en, zh}, {en, zh}, {en, zh}, {en, zh} ],  // 选项
  a: 0,                        // 正确选项下标
  e: { en: "...", zh: "..." },  // 解析
  svg: "<svg ...>"             // 可选：题干附图（内联 SVG 字符串）
}
```

注意：用户语言通过 `state.lang`（'zh' | 'en'）切换，所有文案对象都是 `{en, zh}` 结构。

### 3. 题目生成器（generators.js）

`window.GENERATORS = { precalc: [fn...], bio: [fn...], geo: [fn...] }`，每个函数返回一个上面的 MCQ 对象（参数随机）。辅助函数：`rnd(n)`、`pick(arr)`、`txt(en, zh)`、`opts(correct, pool)`（正确项在前 + 去重干扰项）、`numOpts(val)`（数值型选项）。SVG 构建函数：`pyramidSvg(type)` 人口金字塔、`parabolaSvg()` / `cubicSvg()` / `reciprocalSvg()` / `sineSvg()` 函数图像。

### 4. FRQ 简答题（data-extras.js，window.FRQ）

```js
{
  t: "frq", unit: "geo1",
  q: { en, zh },               // 题干（可含子问 a/b/c）
  svg: pyramidSvg(0),          // 可选附图
  points: [                    // 评分标准（self-check 用）
    { label: {en, zh}, model: {en, zh} }
  ]
}
```

### 5. 画图题（data-extras.js，window.DRAW）

```js
{
  t: "draw", unit: "bio3",
  q: { en, zh },               // 作图要求
  refSvg: "<svg ...>",        // 参考答案图（点"显示评分标准"后展示）
  rubric: { en, zh }           // 文字评分要点
}
```

### 6. localStorage（浏览器本地持久化）

- `studyloop_lang`：界面语言（'zh' | 'en'）
- `studyloop_v2`：JSON，包含：
  - `wrongbook`：错题数组，每项 `{ unit, t, q:{en,zh}, a(正确答案文本), myAns, src(原始题目对象，用于强化练习) }`
  - `notes`：`{ geo, bio, precalc }` 三个字符串
  - `session`：`{ answered, correct, streak, best }`
  - `unitStats`：`{ [unitId]: { seen, right } }` 每单元正确率
  - `packs`：导入的题目包数组

注意：所有 localStorage 读写都包了 try/catch（iframe/隐私模式下降级为内存模式）。

### 7. 题目包导入格式（JSON）

```js
{
  "questions": [
    {
      "t": "concept",            // 或 "frq" / "draw"
      "unit": "pc1",             // 关联单元 id
      "q": { "en": "...", "zh": "..." },
      "o": [...], "a": 0,        // MCQ 用
      "e": { "en": "...", "zh": "..." },
      // FRQ 用 points，画图题用 refSvg + rubric（同上 schema）
    }
  ]
}
```

## 主要代码位置（app.js）

- 状态：`state` 对象（view / subject / unitId / queue / idx / selected / session / wrongbook / notes）
- 出题流水线：`fillQueue(unitId, usePack)` —— 静态题 + 生成题 + 导入包 + FRQ/画图题穿插混合
- 视图渲染：`renderHome` / `renderSubject` / `renderQuiz` / `renderDone` / `renderWrongbook` / `renderNotes`
- 画板：`initCanvas()`（鼠标 + 触摸，多色笔刷、粗细、撤销、清空）
- 事件绑定：`bindEvents()`（事件委托，全部通过 data-testid 定位）
- 键盘快捷键：A–D 选答案，Enter 下一题

## 给继续开发者的注意事项

1. 代码风格是 ES5（var、function），保持一致即可，也可以现代化但要全局测试
2. `esc()` 函数用于所有用户内容的 HTML 转义，新增渲染处务必沿用，避免 XSS
3. 题库文件很大（data-*.js 每个约 60-80KB），修改时注意 JSON/JS 语法
4. 单元 id 必须保持稳定（geo1-geo7 / bio1-bio10 / pc1-pc9），错题本和统计都按 unit id 关联
5. 网站部署在 Perplexity 托管的静态站点上；换平台时整个目录原样上传即可（任何静态托管都行：GitHub Pages、Vercel、Netlify 等）
