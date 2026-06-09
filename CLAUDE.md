# budgr — Project Memory for Claude Code

## What this is
budgr is a free financial literacy mobile app for teens and young adults (ages 15–25).
It helps users budget income and expenses, get AI-personalized financial advice, plan
savings goals, and understand credit card debt — with no sign-up, no bank linking, and
no cost to the user. Built by LDJ as a first iteration, actively under development.

## Tech stack
- Frontend: Single HTML file (www/index.html) — vanilla JS + CSS, no framework
- Backend: Cloudflare Worker (worker/worker.js) — secure Anthropic API proxy
- Mobile wrapper: Capacitor (iOS + Android)
- Fonts: DM Sans + DM Serif Display (Google Fonts)
- AI: Anthropic claude-sonnet-4-20250514 via secure worker

## Folder structure
```
budgr/
├── www/
│   └── index.html              ← entire app (HTML/CSS/JS in one file)
├── worker/
│   ├── worker.js               ← Cloudflare Worker (API proxy)
│   ├── wrangler.toml           ← Cloudflare deploy config
│   └── WORKER_SETUP.md         ← step-by-step deploy guide
├── docs/
│   ├── competitive_analysis.md
│   ├── app_store_listing.md
│   ├── privacy_policy.md
│   └── capacitor_config.json
├── CLAUDE.md                   ← this file
└── package.json                ← created when Capacitor is initialized
```

## Design system
- Background:      #f5f4f0  (warm off-white)
- Surface:         #ffffff
- Surface alt:     #f0efe9
- Border:          #e2e0d8
- Text:            #1a1916
- Muted:           #8a887e
- Accent (green):  #2d6a4f  (forest green — primary action color)
- Accent light:    #d8ede4
- Secondary:       #e76f51  (terracotta)
- Red/danger:      #c0392b
- Yellow/caution:  #b45309
- Border radius:   16px (cards), 10px (inputs/buttons)
- Headings font:   DM Serif Display
- Body font:       DM Sans

## Financial education sources — always cite these
- CFPB Financial Well-Being Framework (consumer.gov)
- FDIC Money Smart for Young Adults 2025 (fdic.gov/moneysmart)
- JumpStart Coalition National Standards
- NEFE (National Endowment for Financial Education)

## Core principles — never compromise these
1. Always free to the user — no paywalled core features in v1
2. No user data collected or stored on any server
3. Advice always grounded in CFPB/FDIC/JumpStart standards
4. Plain everyday language only — no financial jargon
5. Tone is encouraging and empowering — never judgmental
6. Privacy-first — the app works entirely without an account

## App flow (4 steps)
1. Income — enter pay frequency (weekly/biweekly/monthly) + primary + side income
2. Expenses — categorized dropdown (housing, food, transport, utilities, comms, debt, lifestyle)
3. Results — verdict, CC warning, summary, donut chart, AI advice, goal planner, invest tool
4. Budget Plan — optional proposed line-by-line budget (user prompted yes/no)

## Features built (v1.0)
- Income input with frequency toggle (weekly / biweekly / monthly)
- Expense tracker with grouped category dropdown
- Credit card modal — captures APR on entry
- Verdict card — good / tight / over budget with personalized message
- Dynamic CC warning — selects top 3 payoff strategies based on user data
  (Avalanche, Snowball, Pay More, Balance Transfer, Cut Spending, Stop Charges)
- Monthly summary (income / expenses / left over)
- Budget donut chart — needs/wants/savings split, adjusts % based on situation
- AI-powered personalized advice (4 cards, scored by relevance to user's numbers)
  - Falls back instantly to static scored tips if AI unavailable
  - AI upgrades silently in background via Cloudflare Worker
- Savings goal planner — 6 goal types, frequency comparison table
  (weekly vs biweekly vs monthly — same amount, shows time difference)
- "What if I invested?" slider — compound growth to age 65 at 7% S&P average
- Proposed budget plan — line-by-line with keep/reduce/priority tags
- Progress bar (4 steps)
- Start over / reset flow

## AI advice engine — how it works
The advice pool has 9 scored cards. Each card has a relevance score based on:
- isOver (spending > income) → surfaces Cut Spending, Find the Leak
- isTight (ratio > 0.85) → surfaces tighter savings advice
- isGood → surfaces investing, automate savings, build credit
- hasCC + high APR → surfaces CC danger cards
- low income → surfaces side income card
Top 4 by score are shown instantly. AI then tries to upgrade them via the Worker.

## Cloudflare Worker
- URL placeholder in index.html: 'https://budgr-api.YOUR-SUBDOMAIN.workers.dev'
- Must be replaced with real deployed URL before App Store submission
- API key stored as Cloudflare secret (ANTHROPIC_API_KEY) — never in code
- See worker/WORKER_SETUP.md for full deployment steps (~15 min)

## Deployment targets
- iOS: App Store via Xcode + Capacitor (Apple Developer account $99/year)
- Android: Google Play via Android Studio + Capacitor ($25 one-time)
- Bundle ID: com.yourname.budgr  ← update yourname before Capacitor init
- Cloudflare Worker: free tier (100k requests/day)

## Monetization strategy (post-launch)
1. Financial institution sponsorships — credit unions/banks pay for brand association
   (fastest path to revenue, 3–6 months post-launch, $5k–$50k/sponsor)
2. School/district licensing — $3–8 per student/year
   (leverages state financial literacy mandates, 6–12 months)
3. budgr Pro tier — $2.99–$4.99/month for power features
   (persistent history, trend charts, debt payoff calculator, PDF export)
4. Grants — NEFE, FINRA Investor Education Foundation, Title I/IV federal funds

## v2 Priority Roadmap
| Priority | Feature                              | Notes                          |
|----------|--------------------------------------|--------------------------------|
| 1        | Local device storage (persist data)  | No server needed — device only |
| 2        | Debt payoff timeline calculator      | Month-by-month with APR        |
| 3        | Spending streak / milestone badges   | Light gamification             |
| 4        | Month-over-month budget history      | Needs storage first            |
| 5        | Shareable goal progress card         | Instagram Stories format       |
| 6        | Push notification reminders          | Native Capacitor only          |
| 7        | Optional Plaid bank linking          | Consent-first, opt-in only     |

## Key decisions made (don't reverse without good reason)
- No account/login required — core to the product's identity and trust
- No analytics or tracking SDKs — privacy is a differentiator
- Single HTML file architecture — keeps deployment simple for v1
- Fallback tips render instantly — user never sees a loading spinner for advice
- CC strategies are dynamic (scored), not a static list
- Goal planner pre-fills with suggested weekly savings amount

## Competitive positioning
budgr sits in a gap no current app fills:
free + no bank link + AI advice + CFPB/FDIC grounding + teen-focused
Nearest competitors: Asper (no AI), Goodbudget (no AI, manual entry only),
Greenlight ($6/mo, requires parent), YNAB ($109/yr, adult-focused)

## App Store metadata
- Name: budgr — Own Your Money
- Subtitle: Budget smarter. Live better.
- Category: Finance
- Age rating: 4+ (App Store) / Everyone (Google Play)
- Price: Free
- Full listing copy: docs/app_store_listing.md
- Privacy policy: docs/privacy_policy.md
