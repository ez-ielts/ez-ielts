# App shell and Today

Design reference: Claude Design handoff `ezIELTS App.dc.html` (shell) and `EzToday.dc.html`.

## App shell (`AppLayout`)

- **≥760px**: sticky header with a 2px ink bottom rule. It holds the brand (links to `/today`), the tabs Today / Plan / Homework / Tutor (active = accent-700 text + 2px accent underline, `aria-current="page"`), the exam tag (`IELTS Academic · Week 3 of 8`, opens Plan), Upgrade (trial tier only, opens Pricing) and a 40×40 profile button (opens Settings).
- **<760px**: same header without tabs. The right-hand group stays on one row, and below 420px the exam tag shows only the week. A fixed bottom tab bar has 4 equal 60px cells with a 2px ink top rule. The active cell is ink-filled with ground text and a red 14×4 marker. Content gets 64px bottom padding.
- **Tab ownership**: `/speaking/*` → Today, `/mock/*` → Plan, `/homework/*` → Homework (`src/lib/navigation.js`).
- **Focus mode** (`FocusLayout`): interview, and speaking with "Save and exit" → Today.

## Today (`/today`)

Main column (flex 1.85, basis 420px) and aside (flex 1, basis 260px). The aside wraps below the main column on narrow screens.

**Main**
- Day kicker, H1 session title, lede. Start session → Continue session → Session complete (disabled). Reschedule → Plan.
- Today's session: a ruled list of 3 steps. The current step has a 4px accent left rule and an accent number chip with a Begin / Mark done action. Done steps get a ✓ chip and strike-through. A live progress line reads "n of 3 done · autosaves as you go".
- Overdue band (accent border, accent-100 fill, "Overdue" kicker) → Homework. It reads the first overdue item from the `homework` slice and is hidden when nothing is overdue. It's a notice, not `role="alert"`.
- Marked while you were away: surface cards in an auto-fit grid (min 210px). Each opens the marked essay (`/homework/:id`), a speaking retake (`/speaking/:id`) or Homework.

**Aside**
- Estimated score at 66px, the target and the days until the mock. Six-bar trend: the first measured bars in neutral-300/400, the latest measured bar in ink, forecast bars hatched accent with a 2px accent border. The chart has a text alternative.
- By skill table. Focus skills are shown in accent-700 plus a screen-reader "(focus skill)" label.
- Drill queue tags, an explanation, and Speaking practice → `/speaking/:id`.
- Tutor note box → Tutor.

## State

`today.stepsDone` (Redux). The content is placeholder data per exam in `src/features/today/todayConfig.js`, until the plan, homework and feedback slices supply it. The course week now lives in the `plan` slice (placeholder, see [plan](plan.md)).

## Not built yet

Plan, Homework, the marked essay, Tutor, Speaking, Pricing and Settings render `ScreenPlaceholder` inside the correct layout, so navigation and tab states already work.
