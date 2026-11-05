/**
 * StudyLoop AI proxy — Cloudflare Worker template (optional).
 *
 * Use this when you share StudyLoop with other people and do not want anyone to paste
 * an API key into the browser. The key lives only in the Worker as a secret.
 *
 * Deploy:
 *   1. npm create cloudflare@latest studyloop-proxy   (choose "Hello World" Worker)
 *   2. Replace src/index.js with this file
 *   3. npx wrangler secret put ANTHROPIC_API_KEY        (paste your key)
 *   4. Edit ALLOWED_ORIGIN below to your site, e.g. https://gagagaga27718.github.io
 *   5. npx wrangler deploy  → copy the https://….workers.dev URL into StudyLoop › Settings › Proxy URL
 *
 * The browser SDK calls  <proxy>/v1/messages (sending a placeholder credential); this Worker forwards only
 * that path to api.anthropic.com, drops the browser's credential, adds the secret key, and streams the response back.
 * Add rate limiting (e.g. Cloudflare's rate-limiting rules) before sharing widely: anyone who can
 * load your site can spend from this key.
 */
const ALLOWED_ORIGIN = 'https://gagagaga27718.github.io';
const ALLOWED_MODELS = ['claude-opus-5-5', 'claude-sonnet-5-5', 'claude-haiku-5-5'];
const MAX_TOKENS_CAP = 16000;

function cors(origin) {
  return {
    'Access-Control-Allow-Origin': origin === ALLOWED_ORIGIN ? origin : 'null',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'content-type, authorization, x-api-key, anthropic-version, anthropic-beta, anthropic-dangerous-direct-browser-access, x-stainless-arch, x-stainless-lang, x-stainless-os, x-stainless-package-version, x-stainless-retry-count, x-stainless-runtime, x-stainless-runtime-version, x-stainless-timeout, x-stainless-helper-method',
    'Access-Control-Max-Age': '86400'
  };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    if (request.method === 'OPTIONS') return new Response(null, { headers: cors(origin) });
    const url = new URL(request.url);
    if (origin !== ALLOWED_ORIGIN) return new Response('Forbidden origin', { status: 403, headers: cors(origin) });
    if (request.method !== 'POST' || url.pathname !== '/v1/messages') return new Response('Not found', { status: 404, headers: cors(origin) });

    let body;
    try { body = await request.json(); } catch (e) { return new Response('Bad JSON', { status: 400, headers: cors(origin) }); }
    if (!ALLOWED_MODELS.includes(body.model)) return new Response('Model not allowed', { status: 400, headers: cors(origin) });
    body.max_tokens = Math.min(Number(body.max_tokens) || 1024, MAX_TOKENS_CAP);

    const headers = {
      'content-type': 'application/json',
      'x-api-key': env.ANTHROPIC_API_KEY,
      'anthropic-version': request.headers.get('anthropic-version') || '2023-06-01'
    };
    const beta = request.headers.get('anthropic-beta');
    if (beta) headers['anthropic-beta'] = beta;

    const upstream = await fetch('https://api.anthropic.com' + url.pathname + url.search, { method: 'POST', headers, body: JSON.stringify(body) });
    const out = new Headers(cors(origin));
    out.set('content-type', upstream.headers.get('content-type') || 'application/json');
    return new Response(upstream.body, { status: upstream.status, headers: out });
  }
};
