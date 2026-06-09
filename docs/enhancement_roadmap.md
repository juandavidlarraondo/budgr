# budgr — Product Evaluation & Enhancement Roadmap
**Version 1.0 · June 2026 · First Iteration Review**

---

## Overall Assessment

budgr v1.0 is a strong first iteration that occupies a genuine gap in the market.
No current free app combines zero-friction onboarding + AI-personalized advice +
CFPB/FDIC grounding + teen/young adult focus. The foundation is solid. The roadmap
below prioritizes features that will close the gaps vs. competitors and deepen
user engagement over time.

---

## What v1.0 Does Well

| Strength | Why It Matters |
|---|---|
| Zero friction — no login, no bank link | Removes #1 barrier for teens and privacy-conscious users |
| 100% free | Every competitor charges $36–$132/year |
| AI advice grounded in CFPB/FDIC standards | No competitor in this segment does this |
| Dynamic CC strategies (scored by user situation) | Smarter than any free app in the space |
| Savings goal frequency comparison | Novel feature — weekly vs biweekly vs monthly side by side |
| Proposed budget plan with keep/reduce/priority tags | No equivalent in any free app |
| Privacy-first — no data collected or stored | Major trust advantage, especially for under-18 users |
| Instant fallback tips — no loading spinner | User always sees value immediately |

---

## What Needs Work (Gap Analysis vs. Competitors)

| Gap | Impact | Priority |
|---|---|---|
| No persistent data between sessions | High — users lose their budget when they close the app | 1 |
| No spending trend / history view | High — can't track progress over time | 2 |
| No debt payoff timeline calculator | High — CC warning lacks a specific payoff date | 3 |
| No gamification or engagement hooks | Medium — nothing to bring users back daily | 4 |
| No social / sharing features | Medium — Gen Z shares financial milestones | 5 |
| No push notification reminders | Medium — nothing prompts weekly check-ins | 6 |
| No bank account integration | Medium — manual entry is a habit barrier for some | 7 |
| Single user only | Low — not relevant for core teen audience yet | 8 |

---

## v2 Enhancement Roadmap

### Priority 1 — Local Device Storage (Session Persistence)
**What:** Save the user's budget between sessions using device localStorage.
No server required — data stays 100% on the device.
**Why:** Every competitor offers this. Users currently lose all their data when
they close the app, which kills the habit-building loop.
**How to build in Claude Code:**
> "Add localStorage to budgr so the user's income, expenses, and goals
> persist between sessions. Add a 'last updated' timestamp and a clear
> button so the user can reset whenever they want."

---

### Priority 2 — Debt Payoff Timeline Calculator
**What:** A calculator inside the CC warning section that shows:
- Estimated current balance (based on monthly payment × 24)
- Months to pay off at current payment rate
- Months to pay off if they add $X extra per month
- Total interest saved by paying more
**Why:** The CC warning explains strategies but doesn't show a specific finish line.
A payoff date is far more motivating than general advice.
**How to build in Claude Code:**
> "Add a debt payoff calculator to the credit card warning section.
> It should take the monthly CC payment and APR, estimate the balance,
> and show a month-by-month payoff timeline. Let the user adjust a
> slider to see how extra payments shorten the timeline."

---

### Priority 3 — Spending Streak & Milestone Badges
**What:** A simple streak counter ("You've budgeted 3 weeks in a row 🔥")
and milestone badges for key achievements:
- First budget completed
- Emergency fund goal set
- 1 month streak
- Spending under budget
- First savings goal reached
**Why:** Greenlight and Acorns Early use this to drive retention.
Light gamification keeps teens engaged without feeling gimmicky.
**How to build in Claude Code:**
> "Add a streak counter and milestone badge system to budgr.
> Track how many consecutive weeks the user has opened and completed
> a budget. Show badges for key milestones. Store streak data in localStorage."

---

### Priority 4 — Month-Over-Month Budget History
**What:** A simple chart showing the last 3–6 months of:
- Income vs. expenses
- Savings rate trend
- Biggest spending category per month
**Why:** Trends are more powerful than snapshots. Seeing improvement over
time is one of the strongest motivators in personal finance.
**Depends on:** Priority 1 (localStorage) must be built first.
**How to build in Claude Code:**
> "Add a budget history view to budgr that shows the last 6 months of
> income, expenses, and savings rate as a simple bar chart.
> Pull data from localStorage."

---

### Priority 5 — Shareable Goal Progress Card
**What:** A beautifully designed card the user can screenshot and share,
showing their savings goal progress. Formatted for Instagram Stories (9:16).
Example: "I'm 67% of the way to my $2,000 Emergency Fund 🆘 #budgr"
**Why:** Organic word-of-mouth with zero ad spend. Gen Z shares
financial milestones — this turns users into marketers.
**How to build in Claude Code:**
> "Create a shareable goal progress card for budgr. When the user
> taps 'Share my progress' on the goal planner, generate a beautiful
> card formatted for Instagram Stories showing their goal name,
> progress percentage, and the budgr brand. Make it downloadable as a PNG."

---

### Priority 6 — Push Notification Reminders (Native Only)
**What:** Weekly push notification reminding users to check their budget.
Example: "Hey — how's your money this week? Open budgr to check in. 💚"
**Why:** Retention driver. Users who check their budget weekly build
lasting financial habits vs. one-time users.
**Depends on:** Capacitor Push Notifications plugin (free).
**How to build in Claude Code:**
> "Add weekly push notification reminders to budgr using the Capacitor
> Local Notifications plugin. Let the user pick their reminder day and time.
> Default to Sunday evenings."

---

### Priority 7 — Optional Bank Linking (Plaid)
**What:** An opt-in feature that connects a bank account via Plaid to
auto-import transactions instead of manual entry.
Privacy consent screen required — manual entry remains the default.
**Why:** Removes the manual entry habit barrier for older users (20–25).
**Important:** Keep manual entry as the default. Bank linking is an
opt-in enhancement, not the core experience.
**How to build in Claude Code:**
> "Add optional Plaid bank linking to budgr as an opt-in feature.
> Show a clear consent screen explaining what data is accessed and
> how it's used. Import transactions into the expense categories
> automatically. Keep manual entry as the default flow."

---

## Monetization Milestones (Tied to Roadmap)

| Milestone | Trigger | Action |
|---|---|---|
| App live on both stores | Now | Begin sponsor outreach to credit unions |
| 500+ downloads | ~Month 2 | Apply for NEFE or FINRA grant |
| Priority 1 & 2 built | ~Month 3 | Launch budgr Pro tier ($2.99/mo) |
| Priority 3 & 4 built | ~Month 4 | Pitch first school district license |
| Priority 5 built | ~Month 5 | Launch social sharing campaign |

---

## Pro Tier Feature Set (When Ready to Launch)

| Feature | Free | Pro ($2.99/mo) |
|---|---|---|
| Budget analysis | ✓ | ✓ |
| AI personalized advice | ✓ | ✓ |
| Savings goal planner | ✓ | ✓ |
| Proposed budget plan | ✓ | ✓ |
| Session data only | ✓ | — |
| Persistent budget history | — | ✓ |
| Month-over-month charts | — | ✓ |
| Debt payoff calculator | — | ✓ |
| Unlimited saved goals | — | ✓ |
| Export budget as PDF | — | ✓ |
| Remove "Powered by budgr" | — | ✓ (sponsor version) |

---

## How to Use This File with Claude Code

When you're ready to build any of these features, open Claude Code:

```bash
cd ~/Desktop/budgr_project
claude
```

Then paste the "How to build in Claude Code" instruction from whichever
priority you're working on. Claude Code will read CLAUDE.md for full
context and build directly into your existing files.

After each feature is built, update CLAUDE.md to move it from the
roadmap section to the "Features built" section.

---

*Last updated: June 2026 · budgr v1.0*
