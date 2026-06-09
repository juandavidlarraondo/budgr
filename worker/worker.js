/**
 * budgr — Cloudflare Worker
 * Secure proxy for Anthropic API calls.
 * Your API key lives here as an environment secret — never in the app.
 *
 * Deploy instructions: see WORKER_SETUP.md
 */

// Capacitor app origins — these are the only sources that should be calling this worker.
// 'capacitor://localhost' is iOS, 'http://localhost' is Android WebView.
const ALLOWED_ORIGINS = [
  'capacitor://localhost',
  'http://localhost',
  'https://localhost',
];

function getCorsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
  };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const CORS_HEADERS = getCorsHeaders(origin);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    // Only allow POST
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
      });
    }

    // Parse the incoming request body from the app
    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
        status: 400,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
      });
    }

    // Safety: only allow the fields the app needs — block any injection attempts
    const safeBody = {
      model: 'claude-sonnet-4-20250514',
      max_tokens: 700,
      messages: body.messages ?? []
    };

    // Validate messages array is not empty and is an array
    if (!Array.isArray(safeBody.messages) || safeBody.messages.length === 0) {
      return new Response(JSON.stringify({ error: 'No messages provided' }), {
        status: 400,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
      });
    }

    // Forward to Anthropic — API key comes from Cloudflare secret, never the app
    let anthropicResponse;
    try {
      anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01',
          'x-api-key': env.ANTHROPIC_API_KEY   // ← stored as Cloudflare secret
        },
        body: JSON.stringify(safeBody)
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: 'Failed to reach Anthropic API' }), {
        status: 502,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
      });
    }

    // Stream the response back to the app
    const data = await anthropicResponse.json();

    return new Response(JSON.stringify(data), {
      status: anthropicResponse.status,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
    });
  }
};
