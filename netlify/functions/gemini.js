// Netlify Serverless Function for Gemini API
// API key is stored securely in Netlify environment variables

// Use named export compatible with Netlify; alternatively export default
export const handler = async (event) => {
  // Common CORS + JSON headers (ALLOW ORIGIN dynamically if env set)
  const allowedOrigin = process.env.ALLOWED_ORIGIN || '*';
  const headers = {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST,OPTIONS',
    'Content-Type': 'application/json'
  };

  // Preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  let prompt;
  try {
    const parsed = JSON.parse(event.body || '{}');
    prompt = parsed.prompt;
  } catch (e) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Malformed JSON body' }) };
  }

  if (!prompt || typeof prompt !== 'string') {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid prompt' }) };
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('Missing GEMINI_API_KEY');
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Server misconfiguration: API key missing' }) };
  }

  // Allow model override via env or query (?model=...) fallback to env GEMINI_MODEL or default stable
  // Many 400s are caused by using preview/experimental models without access
  // Switch to a broadly available model unless overridden via env/query
  const defaultModel = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
  const urlSearchParams = new URLSearchParams(event.queryStringParameters || {});
  const model = urlSearchParams.get('model') || defaultModel;
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  try {
    console.log('[gemini] request', { model, promptLength: prompt.length });
    const apiResponse = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });

    const raw = await apiResponse.text();
    let json;
    try { json = JSON.parse(raw); } catch { json = null; }

    if (!apiResponse.ok) {
      console.error('[gemini] upstream error', apiResponse.status, raw);
      return {
        statusCode: apiResponse.status,
        headers,
        body: JSON.stringify({ error: 'Gemini API error', details: json?.error || raw })
      };
    }

    const text = json?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      return { statusCode: 502, headers, body: JSON.stringify({ error: 'Unexpected Gemini response shape', response: json }) };
    }

    console.log('[gemini] success', { model, chars: text.length });
    return { statusCode: 200, headers, body: JSON.stringify({ text, model }) };
  } catch (err) {
    console.error('[gemini] unhandled error', err);
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Internal server error', details: err.message }) };
  }
};
