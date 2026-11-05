/* StudyLoop — capture a mistake (photo and/or text) → classify to a topic → bank + mistake notebook
 * → generate similar questions → daily practice focus. */
(function () {
  'use strict';
  var SL = window.SL;
  var esc = SL.esc, L = SL.L, t = SL.t, I = SL.ICON, ui = SL.ui;

  SL.photoHtml = function (src) {
    if (!/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(String(src || ''))) return '';
    return '<div class="q-figure"><img src="' + src + '" alt="' + esc(L('题目照片', 'Question photo')) + '" style="max-width:100%;max-height:420px;border-radius:8px;display:block"></div>';
  };

  var CP = null;
  function reset(sid) {
    CP = { step: 'input', s: sid || SL.store.settings.lastSubject || 'geo', thumb: '', aiB64: '', text: '', busy: false, err: '', note: '',
      f: null, saved: null, gen: { n: 3, d: 2, running: false, items: null, err: '' } };
  }
  function blankForm() {
    return { s: CP.s, u: SL.subject(CP.s).units[0].id, tp: 0, kind: 'mcq', qEn: '', qZh: '', o: [{ en: '', zh: '' }, { en: '', zh: '' }, { en: '', zh: '' }, { en: '', zh: '' }], a: 0,
      ansEn: '', ansZh: '', my: '', eEn: '', eZh: '', d: 2, auto: false };
  }

  /* ---------- image processing (resize on device; keeps storage small) ---------- */
  function loadImage(file) {
    return new Promise(function (res, rej) {
      var url = URL.createObjectURL(file), img = new Image();
      img.onload = function () { URL.revokeObjectURL(url); res(img); };
      img.onerror = function () { URL.revokeObjectURL(url); rej(new Error(L('无法读取这张图片', 'Could not read this image'))); };
      img.src = url;
    });
  }
  function resized(img, maxSide, quality) {
    var w = img.naturalWidth, h = img.naturalHeight, k = Math.min(1, maxSide / Math.max(w, h));
    var c = document.createElement('canvas'); c.width = Math.round(w * k); c.height = Math.round(h * k);
    var ctx = c.getContext('2d'); ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, c.width, c.height); ctx.drawImage(img, 0, 0, c.width, c.height);
    return c.toDataURL('image/jpeg', quality);
  }

  /* ---------- views ---------- */
  function langPair(f, en, zh) { return (f[en] || f[zh] || '').trim(); }
  function renderCapture(m, q) {
    if (!CP || q.new === '1') { reset(q.s); if (q.new) history.replaceState(null, '', '#/capture'); }
    var aiOn = SL.AI.configured();
    var html = '';
    if (CP.step === 'input') html += inputStep(aiOn);
    else if (CP.step === 'form') html += formStep();
    else html += savedStep(aiOn);
    html += recentList();
    return { title: L('录入错题', 'Add a mistake'), accent: CP.s, html: html, narrow: true, keepScroll: true };
  }

  function steps(i) {
    var names = [L('拍照 / 输入', 'Photo / text'), L('确认题目和知识点', 'Check question & topic'), L('出新题 · 加入每日练习', 'New questions · daily practice')];
    return '<div class="row" style="gap:6px;margin-bottom:14px">' + names.map(function (n, k) { return '<span class="chip ' + (k === i ? 'pri' : k < i ? 'good' : '') + '">' + (k < i ? '✓ ' : (k + 1) + '. ') + esc(n) + '</span>'; }).join('') + '</div>';
  }

  function inputStep(aiOn) {
    var h = steps(0) + '<div class="card"><div class="field"><span class="lbl">' + esc(L('科目（帮助识别，可不选）', 'Course (helps recognition)')) + '</span><div class="seg">' +
      SL.SUBJECTS.map(function (s) { return '<button class="' + (s.id === CP.s ? 'on' : '') + '" data-act="cpS" data-v="' + s.id + '">' + esc(t(s.name)) + '</button>'; }).join('') + '</div></div>' +
      '<div class="field mt16"><span class="lbl">' + esc(L('题目照片', 'Photo of the question')) + '</span>' +
      (CP.thumb ? '<img src="' + CP.thumb + '" alt="" style="max-width:100%;max-height:320px;border-radius:10px;border:1px solid var(--border)"><div class="row mt8"><label class="btn sm" for="cpFile" style="cursor:pointer">' + esc(L('换一张', 'Replace')) + '</label><button class="btn sm ghost danger" data-act="cpNoPhoto">' + esc(L('移除照片', 'Remove photo')) + '</button></div>' :
        '<label for="cpFile" class="card" style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;min-height:150px;border-style:dashed;cursor:pointer;background:var(--surface-2)"><span style="width:34px;height:34px">' + I.camera + '</span><b>' + esc(L('拍照或选择图片', 'Take or choose a photo')) + '</b><span class="xs faint">' + esc(L('照片会在本机压缩后保存', 'Photos are compressed on this device')) + '</span></label>') +
      '<input type="file" id="cpFile" accept="image/*" capture="environment" class="sr-only" data-change="cpFile"></div>' +
      '<div class="field mt16"><label for="cpText">' + esc(L('或者输入/粘贴题目（可同时写上你的答案和正确答案）', 'Or type / paste the question (you can add your answer and the right one)')) + '</label>' +
      '<textarea class="input" id="cpText" rows="5" data-input="cpText" placeholder="' + esc(L('例：一个红细胞放进蒸馏水会怎样？ A 皱缩 B 胀破 C 不变 D 质壁分离。我选了 A，答案是 B。', 'e.g. A red blood cell is placed in distilled water. A shrinks B bursts C no change D plasmolysis. I chose A; answer B.')) + '">' + esc(CP.text) + '</textarea></div>' +
      (CP.err ? '<div class="msg err mt12">' + esc(CP.err) + '</div>' : '') +
      '<div class="row mt16">' +
      (aiOn ? '<button class="btn primary" data-act="cpAI"' + (CP.busy ? ' disabled' : '') + '>' + (CP.busy ? '<span class="spinner"></span> ' + esc(L('AI 正在识别和解题…', 'AI is reading & solving…')) : I.bot + esc(L('AI 识别并归类', 'Recognise & classify with AI'))) + '</button>' : '') +
      '<button class="btn' + (aiOn ? '' : ' primary') + '" data-act="cpManual">' + esc(L('手动填写', 'Fill in manually')) + '</button></div>' +
      (!aiOn ? '<p class="small muted mt12">' + esc(L('提示：在「设置」配置 AI 后，可以直接拍照让 AI 识别题目、解题、归类到知识点，并生成针对性新题。没有 AI 也能手动录入，系统会根据题目文字自动判断知识点。', 'Tip: with AI set up in Settings, a photo is enough — AI transcribes, solves, classifies and writes targeted new questions. Without AI you can still enter it manually and the topic is suggested from the text.')) + ' <a href="#/settings">' + esc(L('去设置', 'Settings')) + '</a></p>' : '') +
      '</div>';
    return h;
  }

  function opt(v, cur, label) { return '<option value="' + esc(v) + '"' + (String(v) === String(cur) ? ' selected' : '') + '>' + esc(label) + '</option>'; }
  function formStep() {
    var f = CP.f, s = SL.subject(f.s), u = SL.unit(f.u);
    var zh = SL.lang === 'zh';
    var qKey = zh ? 'qZh' : 'qEn', eKey = zh ? 'eZh' : 'eEn', ansKey = zh ? 'ansZh' : 'ansEn', oKey = zh ? 'zh' : 'en';
    var h = steps(1) + (CP.note ? '<div class="notice info">' + esc(CP.note) + '</div>' : '') +
      '<div class="card mt12">' + (CP.thumb ? '<img src="' + CP.thumb + '" alt="" style="max-width:100%;max-height:240px;border-radius:10px;border:1px solid var(--border);margin-bottom:12px">' : '') +
      '<div class="grid g3" style="gap:10px"><div class="field"><label for="cfS">' + esc(L('科目', 'Course')) + '</label><select id="cfS" class="input" data-change="cfS">' + SL.SUBJECTS.map(function (x) { return opt(x.id, f.s, t(x.name)); }).join('') + '</select></div>' +
      '<div class="field"><label for="cfU">' + esc(L('单元', 'Unit')) + '</label><select id="cfU" class="input" data-change="cfU">' + s.units.map(function (x) { return opt(x.id, f.u, t(x.name)); }).join('') + '</select></div>' +
      '<div class="field"><label for="cfT">' + esc(L('知识点', 'Topic')) + '</label><select id="cfT" class="input" data-change="cfT">' + u.topics.map(function (x, i) { return opt(i, f.tp, t(x)); }).join('') + '</select></div></div>' +
      '<div class="row mt8"><button class="btn sm" data-act="cfSuggest">' + esc(L('根据题目自动判断知识点', 'Suggest topic from the question')) + '</button>' + (f.auto ? '<span class="chip good">' + esc(L('已自动归类，可修改', 'Auto-classified — adjust if needed')) + '</span>' : '') + '</div>' +
      '<div class="field mt16"><label for="cfQ">' + esc(L('题目', 'Question')) + '</label><textarea id="cfQ" class="input" rows="3" data-input="cfField" data-k="' + qKey + '">' + esc(f[qKey] || f[zh ? 'qEn' : 'qZh'] || '') + '</textarea></div>' +
      '<div class="field mt12"><span class="lbl">' + esc(L('题型', 'Format')) + '</span><div class="seg"><button class="' + (f.kind === 'mcq' ? 'on' : '') + '" data-act="cfKind" data-v="mcq">' + esc(L('选择题', 'Multiple choice')) + '</button><button class="' + (f.kind === 'open' ? 'on' : '') + '" data-act="cfKind" data-v="open">' + esc(L('简答/计算题', 'Short answer')) + '</button></div></div>';
    if (f.kind === 'mcq') {
      h += '<div class="stack mt12" style="gap:8px">' + f.o.map(function (o, i) {
        return '<div class="row" style="flex-wrap:nowrap"><label class="row bold" style="gap:6px;flex:none;cursor:pointer" title="' + esc(L('正确答案', 'Correct answer')) + '"><input type="radio" name="cfA" data-change="cfA" value="' + i + '"' + (f.a === i ? ' checked' : '') + ' style="width:22px;height:22px;margin:0;accent-color:var(--good)">' + String.fromCharCode(65 + i) + '</label>' +
          '<input class="input" data-input="cfOpt" data-i="' + i + '" data-l="' + oKey + '" value="' + esc(o[oKey] || o[zh ? 'en' : 'zh'] || '') + '" placeholder="' + esc(L('选项 ', 'Option ')) + String.fromCharCode(65 + i) + '">' +
          (f.o.length > 2 ? '<button class="btn sm ghost" data-act="cfDelOpt" data-i="' + i + '" aria-label="remove">✕</button>' : '') + '</div>';
      }).join('') + '</div><div class="row mt8"><span class="xs faint">' + esc(L('圆点选中的是正确答案', 'The selected dot marks the correct answer')) + '</span>' + (f.o.length < 6 ? '<button class="btn sm ghost" data-act="cfAddOpt">+ ' + esc(L('加选项', 'Add option')) + '</button>' : '') + '</div>';
    } else {
      h += '<div class="field mt12"><label for="cfAns">' + esc(L('正确答案', 'Correct answer')) + '</label><textarea id="cfAns" class="input" rows="2" data-input="cfField" data-k="' + ansKey + '">' + esc(f[ansKey] || f[zh ? 'ansEn' : 'ansZh'] || '') + '</textarea></div>';
    }
    h += '<div class="field mt12"><label for="cfMy">' + esc(L('我当时的答案', 'My answer at the time')) + '</label><input id="cfMy" class="input" data-input="cfField" data-k="my" value="' + esc(f.my) + '"></div>' +
      '<div class="field mt12"><label for="cfE">' + esc(L('解析 / 我错在哪（可选）', 'Explanation / why I got it wrong (optional)')) + '</label><textarea id="cfE" class="input" rows="3" data-input="cfField" data-k="' + eKey + '">' + esc(f[eKey] || f[zh ? 'eEn' : 'eZh'] || '') + '</textarea></div>' +
      '<div class="field mt12"><span class="lbl">' + esc(L('难度', 'Difficulty')) + '</span><div class="seg">' + [1, 2, 3, 4].map(function (d) { return '<button class="' + (f.d === d ? 'on' : '') + '" data-act="cfD" data-v="' + d + '">' + esc(t(SL.DIFF[d])) + '</button>'; }).join('') + '</div></div>' +
      (CP.err ? '<div class="msg err mt12">' + esc(CP.err) + '</div>' : '') +
      '<div class="row mt16"><button class="btn primary" data-act="cfSave">' + esc(L('保存到题库和错题本', 'Save to bank & mistake notebook')) + '</button><button class="btn ghost" data-act="cpBack">' + esc(L('返回上一步', 'Back')) + '</button></div></div>';
    return h;
  }

  function savedStep(aiOn) {
    var sv = CP.saved, g = CP.gen, q = SL.byId(sv.id) || sv.q;
    var name = SL.topicName(q.u, q.tp);
    var h = steps(2) + '<div class="card"><div class="row"><span style="font-size:26px">✅</span><div class="grow"><div class="bold">' + esc(L('已保存', 'Saved')) + '</div>' +
      '<div class="small muted">' + esc(L('已放进题库和错题本，归到「' + t(SL.subject(q.s).name) + ' · ' + name + '」，接下来 7 天的每日智能练习会优先练这个知识点。', 'Added to the bank and mistake notebook under "' + t(SL.subject(q.s).name) + ' · ' + name + '". Daily smart practice will prioritise this topic for the next 7 days.')) + '</div></div></div>' +
      '<div class="row mt12"><a class="btn sm" href="#/mistakes?s=' + q.s + '">' + esc(L('查看错题本', 'Open mistakes')) + '</a><a class="btn sm" href="#/kb?u=' + q.u + '">' + esc(L('看这个知识点的要点', 'Key points for this topic')) + '</a></div></div>';
    h += '<div class="card mt16"><div class="card-head"><h3>🧩 ' + esc(L('根据这道错题生成新题', 'Generate new questions from this mistake')) + '</h3></div>';
    if (!aiOn) {
      h += '<p class="small muted">' + esc(L('生成新题需要 AI。请先到「设置」配置 API Key。没有 AI 时，每日练习也会用题库里同一知识点的已有题目来练。', 'Generating needs AI — set it up in Settings. Without it, daily practice still drills this topic with existing bank items.')) + '</p><a class="btn" href="#/settings">' + esc(L('去设置', 'Settings')) + '</a>';
    } else {
      h += '<p class="small muted">' + esc(L('AI 会针对你这道题背后的易错点出新题（换情境，不是照抄）。每道题都会先通过自动检查，再由你确认加入。', 'AI writes new questions aimed at the misconception behind this one (new contexts, not copies). Each passes automatic checks; you confirm what gets added.')) + '</p>' +
        '<div class="row mt8"><select class="input" style="width:auto" data-change="cgN" aria-label="count">' + [3, 5, 8].map(function (n) { return opt(n, g.n, n + L(' 道', ' questions')); }).join('') + '</select>' +
        '<select class="input" style="width:auto" data-change="cgD" aria-label="difficulty">' + [1, 2, 3, 4].map(function (d) { return opt(d, g.d, t(SL.DIFF[d])); }).join('') + '</select>' +
        '<button class="btn primary" data-act="cgRun"' + (g.running ? ' disabled' : '') + '>' + (g.running ? '<span class="spinner"></span> ' + esc(L('生成中…', 'Generating…')) : esc(L('生成新题', 'Generate'))) + '</button></div>';
      if (g.err) h += '<div class="msg err mt12">' + esc(g.err) + '</div>';
      if (g.items) {
        var okN = g.items.filter(function (it) { return it.ok && !it.added; }).length;
        h += '<div class="stack mt12">' + g.items.map(function (it, i) {
          var x = it.q;
          return '<label class="card pad-sm" style="display:block;cursor:pointer;' + (it.ok ? '' : 'border-color:var(--bad);opacity:.8') + '"><div class="row" style="gap:8px;align-items:flex-start;flex-wrap:nowrap">' +
            '<input type="checkbox" data-change="cgPick" data-i="' + i + '"' + (it.pick ? ' checked' : '') + (it.ok && !it.added ? '' : ' disabled') + ' style="width:20px;height:20px;margin-top:2px;flex:none"><div class="grow">' +
            '<div class="row" style="gap:6px;margin-bottom:4px"><span class="chip">' + esc(t(SL.DIFF[x.d])) + '</span>' + (it.added ? '<span class="chip good">' + esc(L('已加入', 'Added')) + '</span>' : it.ok ? '<span class="chip good">' + esc(L('通过检查', 'Checks passed')) + '</span>' : '<span class="chip bad">' + esc(it.problems.join('；')) + '</span>') + '</div>' +
            '<div class="small bold">' + esc(t(x.q)) + '</div>' + (x.o || []).map(function (o, j) { return '<div class="xs">' + (j === x.a ? '✓ ' : '　') + String.fromCharCode(65 + j) + '. ' + esc(t(o)) + '</div>'; }).join('') +
            '<div class="xs muted mt8">' + esc(t(x.e)) + '</div></div></div></label>';
        }).join('') + '</div>' +
          '<div class="row mt12"><button class="btn primary" data-act="cgAdd"' + (okN ? '' : ' disabled') + '>' + esc(L('把勾选的加入题库和每日练习', 'Add checked to bank & daily practice')) + '</button>' +
          '<button class="btn" data-act="cgPracticeNow">' + esc(L('现在就练这个知识点', 'Practise this topic now')) + '</button></div>';
      }
    }
    h += '</div><div class="row mt16"><button class="btn" data-act="cpAnother">' + esc(L('再录一道错题', 'Add another mistake')) + '</button><button class="btn ghost" data-act="cgDaily">' + esc(L('开始今日智能练习', 'Start today\'s smart practice')) + '</button></div>';
    return h;
  }

  function recentList() {
    var mine = (SL.store.packs || []).filter(function (p) { return p.src === 'mine'; }).slice(-8).reverse();
    var foc = SL.activeFocus();
    var h = '';
    if (foc.length) {
      h += '<div class="card mt16"><div class="card-head"><h3>' + esc(L('每日练习重点知识点', 'Daily-practice focus topics')) + '</h3><button class="link" data-act="cgDaily">' + esc(L('开始练习', 'Practise')) + ' →</button></div><div class="pill-wrap">' +
        foc.map(function (f) { var p = SL.parseTopicKey(f.key); var days = Math.max(1, Math.round((f.until - Date.now()) / SL.DAY)); return '<span class="chip pri">' + esc(SL.topicName(p.u, p.tp)) + ' · ' + esc(L(days + ' 天', days + 'd')) + '<button class="btn ghost sm" data-act="focusDel" data-k="' + esc(f.key) + '" aria-label="remove" style="min-height:0;padding:0 2px;height:18px">✕</button></span>'; }).join('') + '</div></div>';
    }
    if (mine.length) {
      h += '<div class="card mt16"><div class="card-head"><h3>' + esc(L('最近录入的错题', 'Recently added mistakes')) + '</h3><a class="link" href="#/mistakes">' + esc(L('错题本', 'Notebook')) + ' →</a></div><div class="list">' +
        mine.map(function (p) { var s = SL.subjectOfUnit(p.unit); return '<div class="list-row">' + (p.img ? '<img src="' + (SL.photoHtml(p.img) ? p.img : '') + '" alt="" style="width:56px;height:56px;object-fit:cover;border-radius:8px;flex:none;border:1px solid var(--border)">' : '<span class="subj-dot" style="background:var(--c-' + (s ? s.id : 'main') + ')"></span>') +
          '<div class="grow"><div class="title" style="font-weight:500">' + esc(t(p.q).slice(0, 80)) + '</div><div class="meta">' + esc(SL.topicName(p.unit, p.tp)) + ' · ' + esc(ui.relTime(p.createdAt)) + '</div></div></div>'; }).join('') + '</div></div>';
    }
    return h;
  }

  /* ---------- actions ---------- */
  SL.act('cpS', function (el) { CP.s = el.getAttribute('data-v'); SL.rerender(); });
  SL.act('cpText', function (el) { CP.text = el.value; });
  SL.act('cpNoPhoto', function () { CP.thumb = ''; CP.aiB64 = ''; SL.rerender(); });
  SL.act('cpFile', function (el) {
    var file = el.files && el.files[0]; if (!file) return;
    if (!/^image\//.test(file.type)) { SL.toast(L('请选择图片文件', 'Choose an image file'), 'bad'); return; }
    loadImage(file).then(function (img) {
      CP.thumb = resized(img, 900, 0.62);                       // stored with the mistake (~60–120 KB)
      CP.aiB64 = resized(img, 1568, 0.85).split(',')[1];        // sent to AI only, not stored
      CP.err = ''; SL.rerender();
    }).catch(function (e) { SL.toast(e.message, 'bad'); });
  });
  SL.act('cpManual', function () {
    CP.f = blankForm(); CP.note = '';
    if (CP.text.trim()) { CP.f.qEn = CP.f.qZh = CP.text.trim(); suggest(); }
    CP.step = 'form'; CP.err = ''; SL.render();
  });
  SL.act('cpBack', function () { CP.step = 'input'; CP.err = ''; SL.render(); });
  SL.act('cpAnother', function () { reset(CP.s); SL.render(); });
  SL.act('cpAI', function () {
    if (!CP.aiB64 && !CP.text.trim()) { CP.err = L('请先拍照或输入题目', 'Add a photo or type the question first'); SL.rerender(); return; }
    CP.busy = true; CP.err = ''; SL.rerender();
    SL.AI.extractMistake({ imageB64: CP.aiB64, mediaType: 'image/jpeg', text: CP.text.trim(), subjectHint: SL.subject(CP.s).name.en }).then(function (d) {
      if (!d.readable) throw new Error(L('AI 没能识别出题目：', 'AI could not read a question: ') + (d.note || ''));
      var sub = SL.subject(d.subject) ? d.subject : CP.s;
      var unit = SL.unit(d.unit_id) && SL.subjectOfUnit(d.unit_id).id === sub ? d.unit_id : SL.subject(sub).units[0].id;
      var f = blankForm();
      f.s = sub; f.u = unit; f.tp = SL.clamp(d.topic_index | 0, 0, SL.unit(unit).topics.length - 1);
      f.kind = d.kind === 'mcq' && d.options && d.options.length >= 2 ? 'mcq' : 'open';
      f.qEn = d.question_en; f.qZh = d.question_zh;
      if (f.kind === 'mcq') { f.o = d.options.slice(0, 6); f.a = d.correct_index >= 0 && d.correct_index < f.o.length ? d.correct_index : 0; }
      f.ansEn = d.correct_answer_en; f.ansZh = d.correct_answer_zh; f.my = d.student_answer || '';
      f.eEn = d.explanation_en; f.eZh = d.explanation_zh; f.d = SL.clamp(d.difficulty | 0 || 2, 1, 4); f.auto = true;
      CP.f = f; CP.s = sub; CP.step = 'form';
      CP.note = L('AI 已识别、解题并归类——请核对题目、答案和知识点，有误可以直接改。', 'AI transcribed, solved and classified it — check the question, answer and topic, and edit anything wrong.') + (d.note ? ' ' + d.note : '');
    }).catch(function (e) { CP.err = e.message; }).then(function () { CP.busy = false; if (SL.parseHash().path === '/capture') SL.render(); });
  });

  function suggest() {
    var f = CP.f, txt = [f.qEn, f.qZh, f.eEn, f.eZh, f.ansEn, f.ansZh].concat((f.o || []).map(function (o) { return o.en + ' ' + o.zh; })).join(' ');
    var r = SL.suggestTopic(f.s, txt);
    if (r) { f.u = r.u; f.tp = r.tp; f.auto = true; return true; }
    return false;
  }
  SL.act('cfSuggest', function () { syncText(); if (suggest()) SL.toast(L('已归到：', 'Classified as: ') + SL.topicName(CP.f.u, CP.f.tp)); else SL.toast(L('没能判断出知识点，请手动选择', 'Could not tell — pick the topic manually'), 'bad'); SL.rerender(); });
  SL.act('cfS', function (el) { CP.f.s = el.value; CP.s = el.value; CP.f.u = SL.subject(el.value).units[0].id; CP.f.tp = 0; CP.f.auto = false; SL.rerender(); });
  SL.act('cfU', function (el) { CP.f.u = el.value; CP.f.tp = 0; CP.f.auto = false; SL.rerender(); });
  SL.act('cfT', function (el) { CP.f.tp = parseInt(el.value, 10); CP.f.auto = false; });
  SL.act('cfKind', function (el) { syncText(); CP.f.kind = el.getAttribute('data-v'); SL.rerender(); });
  SL.act('cfD', function (el) { syncText(); CP.f.d = parseInt(el.getAttribute('data-v'), 10); SL.rerender(); });
  SL.act('cfA', function (el) { CP.f.a = parseInt(el.value, 10); });
  SL.act('cfField', function (el) { CP.f[el.getAttribute('data-k')] = el.value; });
  SL.act('cfOpt', function (el) { CP.f.o[parseInt(el.getAttribute('data-i'), 10)][el.getAttribute('data-l')] = el.value; });
  SL.act('cfAddOpt', function () { syncText(); CP.f.o.push({ en: '', zh: '' }); SL.rerender(); });
  SL.act('cfDelOpt', function (el) { syncText(); var i = parseInt(el.getAttribute('data-i'), 10); CP.f.o.splice(i, 1); if (CP.f.a >= CP.f.o.length) CP.f.a = 0; else if (CP.f.a > i) CP.f.a--; SL.rerender(); });
  function syncText() { /* inputs already write into CP.f on every keystroke */ }

  SL.act('cfSave', function () {
    var f = CP.f;
    // fill the other language with the same text when the student typed only one
    function both(en, zh) { var a = (f[en] || '').trim(), b = (f[zh] || '').trim(); return { en: a || b, zh: b || a }; }
    var qq = both('qEn', 'qZh');
    if (!qq.en) { CP.err = L('请填写题目', 'Enter the question'); SL.rerender(); return; }
    var raw = { id: 'm' + SL.hash(qq.en + Date.now()), unit: f.u, tp: f.tp, d: f.d, q: qq, src: 'mine', createdAt: Date.now(), myAns: f.my.trim() };
    var ex = both('eEn', 'eZh');
    if (f.kind === 'mcq') {
      var opts = f.o.map(function (o) { var a = (o.en || '').trim(), b = (o.zh || '').trim(); return { en: a || b, zh: b || a }; }).filter(function (o) { return o.en; });
      if (opts.length < 2) { CP.err = L('选择题至少需要 2 个选项', 'Multiple choice needs at least 2 options'); SL.rerender(); return; }
      var correct = (f.o[f.a] || {}); var cText = (correct.en || correct.zh || '').trim();
      var a = opts.map(function (o) { return o.en; }).indexOf((correct.en || '').trim() || cText);
      raw.t = 'concept'; raw.o = opts; raw.a = a >= 0 ? a : 0;
      raw.e = ex.en ? ex : { en: 'Correct answer: ' + opts[raw.a].en, zh: '正确答案：' + opts[raw.a].zh };
    } else {
      var ans = both('ansEn', 'ansZh');
      if (!ans.en) { CP.err = L('请填写正确答案', 'Enter the correct answer'); SL.rerender(); return; }
      raw.t = 'frq'; raw.points = [{ label: { en: 'Answer', zh: '答案' }, model: ans }];
      if (ex.en) raw.points.push({ label: { en: 'Explanation', zh: '解析' }, model: ex });
    }
    if (CP.thumb) raw.img = CP.thumb;
    SL.store.packs.push(raw);
    var q = SL.normalize(raw, { s: f.s, u: f.u, tp: f.tp, src: 'mine', createdAt: raw.createdAt });
    SL.remember(q);
    SL.record(q, false, { mode: 'capture', answer: raw.myAns || L('（录入的错题）', '(entered mistake)'), ms: 0 });
    SL.addFocus(SL.topicKey(f.u, f.tp), 7, q.id);
    SL.store.settings.lastSubject = f.s;
    SL.save(true);
    var size = (SL.lsGet('studyloop_v3') || '').length;
    if (size > 4000000) SL.toast(L('本机存储快满了：建议导出备份，或删除部分带照片的错题', 'Storage is nearly full — export a backup or remove some photo mistakes'), 'bad');
    CP.saved = { id: q.id, q: q };
    CP.gen.d = Math.max(1, Math.min(3, f.d));
    CP.step = 'saved'; CP.err = '';
    SL.toast(L('已加入题库、错题本和每日练习', 'Added to bank, mistakes and daily practice'));
    SL.render();
  });

  SL.act('cgN', function (el) { CP.gen.n = parseInt(el.value, 10); });
  SL.act('cgD', function (el) { CP.gen.d = parseInt(el.value, 10); });
  SL.act('cgRun', function () {
    var g = CP.gen, q = SL.byId(CP.saved.id) || CP.saved.q; if (g.running) return;
    g.running = true; g.err = ''; g.items = null; SL.rerender();
    var seed = 'Question: ' + (q.q.en || q.q.zh) + (q.o ? '\nOptions: ' + q.o.map(function (o, i) { return String.fromCharCode(65 + i) + '. ' + o.en; }).join(' | ') + '\nCorrect: ' + q.o[q.a].en : '\nCorrect answer: ' + ((q.points && q.points[0] && q.points[0].model.en) || '')) +
      (q.myAns ? '\nStudent answered: ' + q.myAns : '');
    SL.AI.generateQuestions(q.u, q.tp, g.n, g.d, null, seed).then(function (items) {
      items.forEach(function (it) { it.pick = it.ok; });
      g.items = items; if (!items.length) g.err = L('没有生成题目', 'No questions returned');
    }).catch(function (e) { g.err = e.message; }).then(function () { g.running = false; if (SL.parseHash().path === '/capture') SL.rerender(); });
  });
  SL.act('cgPick', function (el) { var it = CP.gen.items[parseInt(el.getAttribute('data-i'), 10)]; if (it) it.pick = el.checked; });
  SL.act('cgAdd', function () {
    var n = 0, q = SL.byId(CP.saved.id) || CP.saved.q;
    CP.gen.items.forEach(function (it) { if (it.ok && it.pick && !it.added) { it.q.fromMistake = q.id; SL.store.packs.push(it.q); it.added = true; n++; } });
    if (!n) return;
    SL.addFocus(SL.topicKey(q.u, q.tp), 7, q.id);
    SL.save(true);
    SL.toast(L('已加入 ' + n + ' 道新题，每日练习会优先出现', 'Added ' + n + ' questions — they show up first in daily practice'));
    SL.rerender();
  });
  SL.act('cgPracticeNow', function () {
    var q = SL.byId(CP.saved.id) || CP.saved.q;
    SL.startSession({ mode: 'adaptive', title: L('错题专练', 'Mistake drill'), s: q.s, units: [q.u], topics: [SL.topicKey(q.u, q.tp)], count: 10, types: ['mcq'] });
  });
  SL.act('cgDaily', function () { SL.startDaily(); });
  SL.act('focusDel', function (el) { var k = el.getAttribute('data-k'); SL.store.focus = (SL.store.focus || []).filter(function (f) { return f.key !== k; }); SL.save(); SL.rerender(); });

  SL.route(/^\/capture$/, renderCapture);
})();
