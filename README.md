# StudyLoop — AP Human Geography · Honors Biology · Pre-Calculus

Live site: <https://gagagaga27718.github.io/12223344556/> (GitHub Pages, deploys automatically from `main`).

StudyLoop is a static, dependency-free learning platform (vanilla JS, no build step). Everything a student
does is stored in their own browser; there is no backend and no account system.

## Features

| Area | What it does |
| --- | --- |
| Dashboard | Daily goal ring, today's tasks, course mastery, weekly stats, weak areas, recent activity, quick actions |
| Knowledge base | Every course › unit › topic (208 topics) with bilingual key points, personal notes per topic (auto-saved), search, and recall review: recall first, reveal, rate Forgot / Fuzzy / Remembered → spaced schedule |
| Add a mistake | Photo (camera) and/or typed question → AI transcribes, solves and classifies it (or manual entry with automatic topic suggestion) → saved to the bank + mistake notebook → AI writes targeted new questions (validated, you approve) → topic becomes a 7-day daily-practice focus |
| Course pages | Intro, mastery ring, focused modules (vocabulary, maps/data, diagrams, experiments, FRQ, graph lab…), unit + topic mastery bars |
| Practice | Filter by course / unit / topic / difficulty / format (MCQ, FRQ, drawing) / item style; count 5–50; random or adaptive |
| Adaptive practice | Picks weak and due topics first; two misses in a row → easier items + concept refresher; two hits → harder items |
| Mistake notebook | Auto-records wrong answers with options, your answer(s), explanation, miss count and dates; filter, retry (×1 / ×3), mark mastered (auto after 3 correct in a row), export |
| Spaced review | Per-topic intervals that grow with success and reset on misses; mistakes on a 1-3-7-14-30 day ladder; Review page lists what is due |
| Mock exams | Course + unit scope, question count, time limit, answer sheet with flags, no feedback until submit, scored report by topic and difficulty |
| Analytics | Overall/subject accuracy, accuracy by difficulty, weekly volume and accuracy trend, 14-day activity, mistake trend, topic mastery heatmap (+ table view) — all from real attempts |
| Flashcards | Auto-built from vocab/concept items plus custom cards; flip, know / don't know, spaced scheduling |
| Planner | Exam dates with countdown and pacing, daily goal, auto tasks (goal, due reviews, weakest topic), custom tasks that roll over |
| Achievements | 14 badges tied to real behaviour (streaks, mastery, exams, fixing mistakes) |
| Graph lab | 10 function families with live a / b / h / k sliders, parent function, asymptotes, key features, coordinate read-out |
| AI Tutor | Explain / analyse mistakes / generate questions / exam prep / study guidance / free chat; simple, deep, exam and Socratic modes |
| Settings | Language, theme (system/light/dark), AI connection, backup export/import, old-site import, question packs, bank quality check |

Bilingual (中文 / English), light and dark themes, layouts for desktop, iPad landscape (sidebar), iPad portrait (icon rail) and phones (bottom tab bar).

## Mastery model

Mastery is **not** raw accuracy. For each topic: recency-weighted accuracy (newest attempts weigh most), weighted by
difficulty, discounted when there are few attempts (`1 − e^(−n/5)`), and decayed by time since last practice
(slower for topics practised on several different days). See `SL.mastery` in `js/learn.js`.

## AI Tutor (needs a key)

GitHub Pages cannot keep secrets, so the AI is wired in one of two ways (Settings › AI Tutor):

1. **Own key** — a student pastes their own Anthropic API key. It is stored only in that browser's
   `localStorage` (`studyloop_ai`), is never in the repository, is excluded from backups, and is sent only to
   `api.anthropic.com` via the official SDK (`@anthropic-ai/sdk@1.0.0`, loaded from jsDelivr).
2. **Proxy** — deploy `proxy/worker.js` (Cloudflare Worker) with the key as a secret and enter its URL. The browser
   never sees a key. Use this if the site is shared with other people.

Default model `claude-opus-5-5` (Sonnet 5.5 / Haiku 5.5 selectable), streaming, effort `medium`, server-side refusal
fallback (`fallbacks: "default"`) on Opus/Sonnet. Without a key nothing is sent and no fake answers are shown.
Generated questions use structured JSON output, pass local checks (4 options, valid answer, both languages, valid topic,
no duplicate) and must be approved one by one before they join the bank.

## Files

```
index.html            shell + script order
css/style.css         design tokens (light/dark), layout, components
js/data-*.js          question banks (data-more.js: figure items; data-more2.js: thin-unit expansion)
js/kb-*.js            knowledge base key points per topic (geo / bio / precalc)
js/generators.js      randomized question generators + SVG helpers
js/data-extras.js     FRQ + drawing tasks
js/core.js            utils, storage (v3 + v2 migration), i18n, theme, toast
js/bank.js            unified question schema, topic classifier, difficulty estimate, pools, option shuffling, quality report
js/learn.js           attempts, mastery, spaced repetition, adaptive engine, mistakes, achievements, planner, flashcards
js/charts.js          SVG charts rendered at container width + tooltips
js/ai.js              Anthropic SDK client, prompts, question generation + validation
js/main.js            icons, navigation, hash router, actions, modal
js/quiz.js            session engine, MCQ / FRQ / drawing, results, mock exam runner
js/views-*.js         pages (views-kb.js = knowledge base + recall review; views-capture.js = add a mistake)
proxy/worker.js       optional AI proxy template
```

Unified question object (`SL.normalize`): `id, s (subject), u (unit), tp (topic index), type (mcq|frq|draw),
tag (vocab|concept|application|calculation|diagram|data|experiment|map), d (1–4), q, o, a, e, svg, points, rubric,
refSvg, src (bank|gen|pack|ai), createdAt`. The bank has no chapter level: units are the chapters.

## Run locally

```bash
python3 -m http.server 8765   # then open http://localhost:8765
```

## Storage keys

`studyloop_v3` (all learning data) · `studyloop_lang` · `studyloop_ai` (AI key/proxy/model, never exported) ·
`studyloop_chat` (tutor conversations). Data from the old `studyloop.pplx.app` site lives on a different domain and
cannot be read directly: export the wrongbook / notes there and use Settings › Import backup here.
