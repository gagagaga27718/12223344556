/* StudyLoop AI — Claude via the official Anthropic SDK, called from the browser.
 * GitHub Pages has no backend, so there is no server-side secret. Two modes:
 *   1. "Own key": the student pastes their own API key; it is kept only in this browser's
 *      localStorage (separate key, never exported, never in the repo) and sent straight to api.anthropic.com.
 *   2. "Proxy": point to a proxy you deploy (see proxy/worker.js) that holds the key server-side;
 *      the browser never sees a key.
 */
(function () {
  'use strict';
  var SL = window.SL;
  var L = SL.L;
  var SDK_URL = 'https://cdn.jsdelivr.net/npm/@anthropic-ai/sdk@1.0.0/+esm';
  var CFG_KEY = 'studyloop_ai';
  var MODELS = [
    { id: 'claude-opus-5-5', zh: 'Claude Opus 5.5（默认，最强）', en: 'Claude Opus 5.5 (default, most capable)' },
    { id: 'claude-sonnet-5-5', zh: 'Claude Sonnet 5.5（更快更省）', en: 'Claude Sonnet 5.5 (faster, cheaper)' },
    { id: 'claude-haiku-5-5', zh: 'Claude Haiku 5.5（最省）', en: 'Claude Haiku 5.5 (cheapest)' }
  ];

  function readCfg() {
    var c = null; try { c = JSON.parse(SL.lsGet(CFG_KEY) || 'null'); } catch (e) {}
    c = c && typeof c === 'object' ? c : {};
    return { key: c.key || '', proxy: c.proxy || '', model: MODELS.some(function (m) { return m.id === c.model; }) ? c.model : 'claude-opus-5-5' };
  }

  var sdkPromise = null;
  function loadSdk() {
    if (!sdkPromise) {
      sdkPromise = import(SDK_URL).then(function (mod) { return mod.default || mod.Anthropic; })
        .catch(function (e) { sdkPromise = null; throw new Error(L('无法加载 AI 组件（请检查网络）', 'Could not load the AI library (check your connection)') + ': ' + e.message); });
    }
    return sdkPromise;
  }

  var AI = SL.AI = {
    MODELS: MODELS,
    cfg: readCfg,
    saveCfg: function (c) { SL.lsSet(CFG_KEY, JSON.stringify({ key: c.key || '', proxy: c.proxy || '', model: c.model || 'claude-opus-5-5' })); },
    clearCfg: function () { SL.lsDel(CFG_KEY); },
    configured: function () { var c = readCfg(); return !!(c.key || c.proxy); },
    busy: false,

    client: function () {
      var c = readCfg();
      return loadSdk().then(function (Anthropic) {
        var opts = { dangerouslyAllowBrowser: true, maxRetries: 2, timeout: 120000 };
        if (c.proxy) { opts.baseURL = c.proxy.replace(/\/+$/, ''); opts.apiKey = 'via-proxy'; }
        else opts.apiKey = c.key;
        return { sdk: Anthropic, client: new Anthropic(opts), model: c.model };
      });
    },

    /**
     * Streamed chat call. opts: {system, messages, onText(delta, full), maxTokens, format (json schema)}
     * resolves {text, stopReason, model}; rejects with a readable Error.
     * Returns a handle with .abort() via opts.onHandle.
     */
    chat: function (opts) {
      if (!navigator.onLine) return Promise.reject(new Error(L('当前离线，AI 功能需要网络连接', 'You are offline — AI needs a connection')));
      if (!AI.configured()) return Promise.reject(new Error(L('还没有配置 AI：请到「设置」填写 API Key 或代理地址', 'AI is not set up yet — add an API key or proxy in Settings')));
      if (AI.busy) return Promise.reject(new Error(L('上一个请求还在进行中', 'A request is already running')));
      AI.busy = true;
      return AI.client().then(function (h) {
        var params = {
          model: h.model,
          max_tokens: opts.maxTokens || 16000,           // cost cap: students pay for their own key
          system: opts.system,
          messages: opts.messages,
          output_config: { effort: opts.effort || 'medium' },
          // server-side refusal fallback (routes by refusal category; see Settings note)
          betas: ['server-side-fallback-2026-07-01'],
          fallbacks: 'default'
        };
        if (h.model === 'claude-haiku-5-5') { delete params.betas; delete params.fallbacks; } // no server-side fallback on Haiku
        if (opts.format) params.output_config.format = { type: 'json_schema', schema: opts.format };
        var stream = params.betas ? h.client.beta.messages.stream(params) : h.client.messages.stream(params);
        if (opts.onHandle) opts.onHandle({ abort: function () { try { stream.abort(); } catch (e) {} } });
        var full = '';
        stream.on('text', function (delta) { full += delta; if (opts.onText) opts.onText(delta, full); });
        return stream.finalMessage().then(function (msg) {
          var text = (msg.content || []).filter(function (b) { return b.type === 'text'; }).map(function (b) { return b.text; }).join('');
          if (msg.stop_reason === 'refusal') {
            var why = msg.stop_details && msg.stop_details.explanation;
            throw new Error(L('AI 拒绝回答这个请求', 'The AI declined this request') + (why ? '：' + why : ''));
          }
          return { text: text || full, stopReason: msg.stop_reason, model: msg.model, truncated: msg.stop_reason === 'max_tokens' };
        }).catch(function (err) { throw AI.friendlyError(err, h.sdk); });
      }).then(function (r) { AI.busy = false; return r; }, function (e) { AI.busy = false; throw e; });
    },

    friendlyError: function (err, A) {
      if (!err) return new Error('Unknown error');
      if (A) {
        if (err instanceof A.APIUserAbortError) return new Error(L('已停止生成', 'Stopped'));
        if (err instanceof A.AuthenticationError) return new Error(L('API Key 无效或已过期，请到设置中检查', 'API key is invalid or expired — check Settings'));
        if (err instanceof A.PermissionDeniedError) return new Error(L('这个 Key 没有权限使用所选模型', 'This key cannot use the selected model'));
        if (err instanceof A.NotFoundError) return new Error(L('找不到所选模型或代理地址有误', 'Model not found or proxy URL is wrong'));
        if (err instanceof A.RateLimitError) return new Error(L('请求太频繁或额度不足，请稍后再试', 'Rate limited or out of credit — try again shortly'));
        if (err instanceof A.BadRequestError) return new Error(L('请求被拒绝：', 'Request rejected: ') + err.message);
        if (err instanceof A.APIConnectionError) return new Error(L('无法连接到 AI 服务（网络或代理问题）', 'Could not reach the AI service (network or proxy)'));
        if (err instanceof A.InternalServerError) return new Error(L('AI 服务暂时不可用，请稍后再试', 'The AI service is temporarily unavailable'));
        if (err instanceof A.APIError) return new Error(L('AI 服务错误 ', 'AI service error ') + (err.status || '') + ': ' + err.message);
      }
      return err instanceof Error ? err : new Error(String(err));
    },

    /* ---------- prompts ---------- */
    subjectPersona: function (sid) {
      return {
        geo: 'You tutor AP Human Geography. Use the AP CED vocabulary, real-world case studies (country/city names), and connect answers to spatial concepts (scale, region, diffusion, site/situation). For FRQs, model the AP skills: define, explain, compare, apply to a scenario.',
        bio: 'You tutor Honors Biology. Be scientifically precise, link structure to function, name the specific molecules/organelles, and use experimental reasoning (variables, controls, evidence). Describe diagrams in words when helpful.',
        precalc: 'You tutor Pre-Calculus. Guide the student step by step: ask what they know, set up the next step, and let them attempt it before revealing the final answer. Show each algebra step on its own line using plain-text math (e.g. x^2, sqrt(x), pi). Never just give the final answer first.'
      }[sid] || 'You are a supportive study tutor.';
    },
    modePrompt: function (mode) {
      return {
        simple: 'Teaching mode: SIMPLE. Use plain, short sentences and an everyday analogy. Keep it under ~150 words unless asked for more.',
        deep: 'Teaching mode: DEEP. Give a thorough, academically rigorous explanation with mechanisms, edge cases and connections to other topics.',
        exam: 'Teaching mode: EXAM. Focus on what is tested: key terms, common traps, how points are awarded, and a quick exam-style check question at the end.',
        socratic: 'Teaching mode: SOCRATIC. Do not lecture or reveal the answer. Ask one guiding question at a time, wait for the student, and build understanding step by step.'
      }[mode] || '';
    },
    systemPrompt: function (sid, mode, extra) {
      var lang = SL.lang === 'zh' ? 'Reply in Simplified Chinese, keeping key English subject terms in parentheses the first time they appear (the student takes the course in English).' : 'Reply in English.';
      return [
        'You are StudyLoop\'s AI Tutor for a high-school student.',
        AI.subjectPersona(sid), AI.modePrompt(mode), lang,
        'Format with short paragraphs, simple bullet lists, and **bold** for key terms. No tables or headings larger than ####.',
        'If you are not sure about a fact, say so instead of guessing.',
        extra || ''
      ].filter(Boolean).join('\n\n');
    }
  };

  /* ---------- question generation with schema + local validation ---------- */
  var Q_SCHEMA = {
    type: 'object', additionalProperties: false, required: ['questions'],
    properties: {
      questions: {
        type: 'array',
        items: {
          type: 'object', additionalProperties: false,
          required: ['topic_index', 'difficulty', 'style', 'q_en', 'q_zh', 'options', 'answer_index', 'explain_en', 'explain_zh'],
          properties: {
            topic_index: { type: 'integer' },
            difficulty: { type: 'integer' },
            style: { type: 'string', enum: ['vocab', 'concept', 'application', 'calculation', 'data', 'experiment'] },
            q_en: { type: 'string' }, q_zh: { type: 'string' },
            options: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['en', 'zh'], properties: { en: { type: 'string' }, zh: { type: 'string' } } } },
            answer_index: { type: 'integer' },
            explain_en: { type: 'string' }, explain_zh: { type: 'string' }
          }
        }
      }
    }
  };
  AI.generateQuestions = function (unitId, topicIdx, n, difficulty, onText, seed) {
    var u = SL.unit(unitId), s = SL.subjectOfUnit(unitId);
    var topics = u.topics.map(function (tp, i) { return i + ': ' + tp.en; }).join('\n');
    var existing = SL.BANK.filter(function (q) { return q.u === unitId; }).slice(0, 25).map(function (q) { return '- ' + q.q.en; }).join('\n');
    var prompt = 'Write ' + n + ' new multiple-choice questions for ' + s.name.en + ', ' + u.name.en + '.\n' +
      (topicIdx >= 0 ? 'All about topic ' + topicIdx + ' (' + u.topics[topicIdx].en + ').\n' : 'Spread across these topics.\n') +
      'Topics (use the index as topic_index):\n' + topics + '\n\n' +
      'Difficulty (1=easy recall, 2=medium, 3=hard multi-step, 4=AP exam level): ' + difficulty + '.\n' +
      'Rules: exactly 4 options, one unambiguously correct answer (answer_index 0-3), plausible distractors based on common misconceptions, ' +
      'no "all of the above", accurate science/math, full bilingual text (natural Simplified Chinese in *_zh). The explanation must say why the answer is right and why the most tempting distractor is wrong.\n' +
      (seed ? '\nThe student got this question WRONG. Write NEW questions on the same concept that target the misconception behind their wrong answer, in fresh contexts (do not copy or lightly reword it):\n' + seed + '\n' : '') +
      'Do not repeat these existing questions:\n' + existing;
    return AI.chat({
      system: 'You are an expert ' + s.name.en + ' item writer for high-school exams. Output only the JSON requested.',
      messages: [{ role: 'user', content: prompt }], format: Q_SCHEMA, maxTokens: 12000, effort: 'high', onText: onText
    }).then(function (r) {
      var data; try { data = JSON.parse(r.text); } catch (e) { throw new Error(L('AI 返回的格式无法解析', 'Could not parse the AI output')); }
      return (data.questions || []).map(function (x) { return AI.validateQuestion(x, unitId); });
    });
  };
  // local checks before anything can enter the bank (the student still approves each one)
  AI.validateQuestion = function (x, unitId) {
    var problems = [];
    var u = SL.unit(unitId);
    if (!x.q_en || !x.q_zh) problems.push(L('题干缺少中英文', 'stem missing a language'));
    if (!Array.isArray(x.options) || x.options.length !== 4) problems.push(L('选项不是 4 个', 'not 4 options'));
    else {
      if (x.options.some(function (o) { return !o.en || !o.zh; })) problems.push(L('选项缺少中英文', 'option missing a language'));
      var seen = {}; x.options.forEach(function (o) { var k = String(o.en).trim().toLowerCase(); if (seen[k]) problems.push(L('选项重复', 'duplicate options')); seen[k] = 1; });
      if (x.options.some(function (o) { return /all of the above|none of the above/i.test(o.en); })) problems.push(L('包含"以上都对/都不对"', 'uses all/none of the above'));
    }
    if (!(x.answer_index >= 0 && x.answer_index < (x.options || []).length)) problems.push(L('正确答案下标无效', 'invalid answer index'));
    if (!x.explain_en || !x.explain_zh) problems.push(L('缺少解析', 'missing explanation'));
    if (!(x.topic_index >= 0 && x.topic_index < u.topics.length)) problems.push(L('知识点编号无效', 'invalid topic index'));
    if (!(x.difficulty >= 1 && x.difficulty <= 4)) problems.push(L('难度无效', 'invalid difficulty'));
    var dup = SL.BANK.concat(SL.packQuestions()).some(function (q) { return q.q.en && x.q_en && q.q.en.trim().toLowerCase() === x.q_en.trim().toLowerCase(); });
    if (dup) problems.push(L('与题库已有题目重复', 'duplicates an existing item'));
    var q = {
      unit: unitId, t: x.style || 'concept', tp: SL.clamp(x.topic_index | 0, 0, u.topics.length - 1), d: SL.clamp(x.difficulty | 0, 1, 4),
      q: { en: x.q_en, zh: x.q_zh }, o: x.options, a: x.answer_index, e: { en: x.explain_en, zh: x.explain_zh },
      src: 'ai', createdAt: Date.now()
    };
    return { q: q, problems: problems, ok: !problems.length };
  };

  /* ---------- read a mistake from a photo and/or pasted text ---------- */
  var X_SCHEMA = {
    type: 'object', additionalProperties: false,
    required: ['readable', 'subject', 'unit_id', 'topic_index', 'kind', 'question_en', 'question_zh', 'options', 'correct_index', 'correct_answer_en', 'correct_answer_zh', 'student_answer', 'explanation_en', 'explanation_zh', 'difficulty', 'note'],
    properties: {
      readable: { type: 'boolean' },
      subject: { type: 'string', enum: ['geo', 'bio', 'precalc'] },
      unit_id: { type: 'string' }, topic_index: { type: 'integer' },
      kind: { type: 'string', enum: ['mcq', 'open'] },
      question_en: { type: 'string' }, question_zh: { type: 'string' },
      options: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['en', 'zh'], properties: { en: { type: 'string' }, zh: { type: 'string' } } } },
      correct_index: { type: 'integer' },
      correct_answer_en: { type: 'string' }, correct_answer_zh: { type: 'string' },
      student_answer: { type: 'string' },
      explanation_en: { type: 'string' }, explanation_zh: { type: 'string' },
      difficulty: { type: 'integer' }, note: { type: 'string' }
    }
  };
  AI.extractMistake = function (opts) {
    // opts: {imageB64, mediaType, text, subjectHint}
    var catalog = SL.SUBJECTS.map(function (s) {
      return s.id + ' — ' + s.name.en + '\n' + s.units.map(function (u) { return '  ' + u.id + ': ' + u.name.en + ' | topics: ' + u.topics.map(function (tp, i) { return i + ' ' + tp.en; }).join('; '); }).join('\n');
    }).join('\n');
    var content = [];
    if (opts.imageB64) content.push({ type: 'image', source: { type: 'base64', media_type: opts.mediaType || 'image/jpeg', data: opts.imageB64 } });
    content.push({ type: 'text', text:
      'This is a question a high-school student got wrong' + (opts.imageB64 ? ' (photo above)' : '') + '.' +
      (opts.text ? '\nStudent\'s typed notes / question text:\n' + opts.text : '') +
      (opts.subjectHint ? '\nCourse hint: ' + opts.subjectHint : '') +
      '\n\nTasks: 1) transcribe the question exactly (and its answer choices if any); 2) work out the correct answer yourself — if the photo marks a different answer as correct, trust your own careful solution and say so in note; 3) read the student\'s answer if visible (circled/written), else empty string; 4) classify into ONE course, unit and topic from the catalog; 5) write a clear explanation of the correct answer and why the student\'s answer is wrong; 6) give both English and natural Simplified Chinese for every text field. ' +
      'kind = "mcq" if there are answer choices (then correct_index is 0-based), otherwise "open" with options [] and correct_index -1. difficulty 1-4 (4 = AP exam level). If the image is unreadable or not a school question, set readable false and explain in note.\n\nCatalog:\n' + catalog });
    return AI.chat({
      system: 'You are a careful teacher who transcribes and solves students\' homework and exam questions. Be exact when transcribing; never invent text you cannot read. Output only the JSON requested.',
      messages: [{ role: 'user', content: content }], format: X_SCHEMA, maxTokens: 8000, effort: 'high'
    }).then(function (r) {
      var d; try { d = JSON.parse(r.text); } catch (e) { throw new Error(L('AI 返回的格式无法解析', 'Could not parse the AI output')); }
      return d;
    });
  };

  /* minimal, safe markdown → HTML for tutor replies (escape first, then format) */
  AI.md = function (text) {
    var h = SL.esc(text || '');
    h = h.replace(/`([^`\n]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>')
      .replace(/^#{1,4} (.+)$/gm, '<h4>$1</h4>');
    var lines = h.split('\n'), out = [], inList = false;
    lines.forEach(function (ln) {
      var m = ln.match(/^\s*(?:[-*•]|\d+[.)])\s+(.*)$/);
      if (m) { if (!inList) { out.push('<ul>'); inList = true; } out.push('<li>' + m[1] + '</li>'); }
      else { if (inList) { out.push('</ul>'); inList = false; } out.push(ln ? '<p>' + ln + '</p>' : ''); }
    });
    if (inList) out.push('</ul>');
    return out.join('');
  };
})();
