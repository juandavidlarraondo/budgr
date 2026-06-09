# budgr Worker — Setup Guide
## Deploy your secure Anthropic API proxy in ~15 minutes

---

## What this does

Instead of your app calling Anthropic directly (which would expose your API key to anyone
who inspects network traffic), the app calls YOUR Cloudflare Worker. The Worker holds your
API key securely as an encrypted secret and forwards the request to Anthropic on the app's
behalf. The app never sees the key. Neither does the user.

```
App  →  https://budgr-api.yourname.workers.dev  →  Anthropic API
                    (your key lives here)
```

Cloudflare Workers free tier: 100,000 requests/day — more than enough for budgr.

---

## Step 1 — Create a free Cloudflare account

Go to https://cloudflare.com and sign up for a free account.
No credit card required for the free Workers tier.

---

## Step 2 — Install Wrangler (Cloudflare's CLI tool)

Open your terminal and run:

```bash
npm install -g wrangler
```

Verify it installed:
```bash
wrangler --version
```

---

## Step 3 — Log in to Cloudflare via the CLI

```bash
wrangler login
```

This opens a browser window. Click "Allow" to authorize Wrangler.

---

## Step 4 — Set up the worker files

You already have two files from this package:
- worker.js       ← the worker code
- wrangler.toml   ← the configuration

Place them together in a folder called `budgr-worker`:

```
budgr-worker/
  worker.js
  wrangler.toml
```

Open your terminal in that folder.

---

## Step 5 — Add your Anthropic API key as a secret

This is the key step. Your API key is stored encrypted in Cloudflare's system —
it is NEVER written into any file or visible in code.

```bash
wrangler secret put ANTHROPIC_API_KEY
```

Wrangler will prompt:
```
Enter a secret value: ›
```

Paste your Anthropic API key (from console.anthropic.com → API Keys) and press Enter.
You'll see: "✅ Successfully created secret ANTHROPIC_API_KEY"

---

## Step 6 — Deploy the worker

```bash
wrangler deploy
```

You'll see output like:
```
✅ Deployed budgr-api
   https://budgr-api.YOUR-SUBDOMAIN.workers.dev
```

Copy that URL — you'll need it in the next step.

---

## Step 7 — Update budgr_app.html

Open budgr_app.html and find this line (around line 756):

```javascript
const res = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'anthropic-version': '2023-06-01',
    'anthropic-dangerous-direct-browser-access': 'true'
  },
```

Replace it with:

```javascript
const res = await fetch('https://budgr-api.YOUR-SUBDOMAIN.workers.dev', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
```

Note: Remove the 'anthropic-version' and 'anthropic-dangerous-direct-browser-access'
headers — the Worker handles those on the server side now.

---

## Step 8 — Test it

Open budgr_app.html in a browser, enter some income and expenses, and go to results.
The personalized advice section should load as before — but now routing through your Worker.

To confirm traffic is flowing through Cloudflare:
1. Go to cloudflare.com → Workers & Pages → budgr-api
2. Click "Analytics" — you'll see request counts ticking up as you test.

---

## Step 9 — Tighten security before App Store submission (recommended)

Once your app is live and you know your exact domain or Capacitor app ID,
open worker.js and replace the ALLOWED_ORIGINS line:

```javascript
// Change this:
const ALLOWED_ORIGINS = ['*'];

// To this (use your actual domain or Capacitor scheme):
const ALLOWED_ORIGINS = [
  'capacitor://localhost',       // iOS Capacitor app
  'https://localhost',           // Android Capacitor app
  'https://yourdomain.com'       // If you also host a web version
];
```

Then redeploy:
```bash
wrangler deploy
```

---

## Ongoing costs

| Resource          | Free tier limit        | budgr usage estimate |
|-------------------|------------------------|----------------------|
| Worker requests   | 100,000 / day          | ~1 per user session  |
| CPU time          | 10ms per request       | Well within limit    |
| Cloudflare cost   | $0                     | Free                 |
| Anthropic API     | Pay per token          | ~$0.003 per session  |

At 1,000 daily active users: Cloudflare = free, Anthropic ≈ $3/day ($90/month).
At 100 daily active users: Anthropic ≈ $0.30/day ($9/month).

---

## Rotating your API key (if ever needed)

If your key is ever compromised:
1. Go to console.anthropic.com → API Keys → revoke the old key → create a new one
2. Run: `wrangler secret put ANTHROPIC_API_KEY` with the new key
3. Run: `wrangler deploy`

The app itself never needs to change — the key only lives in Cloudflare.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| "wrangler: command not found" | Run `npm install -g wrangler` again |
| 401 from Anthropic | API key was entered wrong — re-run `wrangler secret put ANTHROPIC_API_KEY` |
| CORS error in browser | Make sure ALLOWED_ORIGINS includes your origin or is set to '*' for testing |
| Worker not found | Check your wrangler.toml — the `name` field must match what you deployed |
