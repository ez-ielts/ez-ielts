# Pricing and Settings

Routes: `/pricing` (opened by Upgrade in the header and "See course price" in the course summary) and `/settings` (opened from the user menu and the profile button). Both live in the study shell.

## Pricing

- Header: kicker "Pricing", H1 "One course, built for your target", lede that the guarantee is conditional.
- **Your status** (ruled box): no tier → "Start your 7-day free trial" (primary); trial → "Your free trial is active" and the trial counts as the current plan; paid → "You are on {course}".
- **Courses**: ruled list of the five course levels (Foundation, Bridge, Core, Advanced, Mastery), each one half-band step on the learner's exam scale (IELTS 4.5 → 5.0, 5.0 → 5.5, 5.5 → 6.0, 6.0 → 6.5, 6.5 → 7.0; TOEFL 2.5 → 3.0 … 4.5 → 5.0), "8 weeks" and the price. The learner's own course (from the intake, e.g. Core) is marked "Your course" in text and carries the primary action "Choose this course"; others have a secondary "Choose".
- **Included in every course** (ruled grid): daily session, two checkpoint mocks, marked writing and speaking, tutor chat, reminders.
- Guarantee conditions: the shared, always-conditional copy.
- Payments are not connected. Choosing a course sets the tier and shows "Course selected. Checkout opens here once payments are connected."
- Prices are mock data in `src/features/pricing/pricingConfig.js` until the billing API exists.

## Settings

Sections, each with an H2 and a ruled top edge:

1. **Account**: name and email, Manage account, Sign out. Without a Clerk key: "Sign-in is not configured".
2. **Plan**: current plan in text (None, Free trial, or the course) with a link to Pricing.
3. **Exam**: IELTS Academic / TOEFL iBT. Hint: switching changes every screen and the course follows the other exam's scale.
4. **Study schedule**: minutes per day, days per week, exam date (the same editor as Plan; one source: the intake answers).
5. **Email reminders**: switches for study task reminders, exam date reminders and a weekly progress summary, plus the reminder time (Morning / Afternoon / Evening). Switches use `role="switch"`, `aria-checked` and a text On/Off label.

## State

- `session.tier` gains `chooseTier`.
- `settings` slice: `reminders` (`tasks`, `examDate`, `weekly`) and `reminderTime`. Persistence and sending are backend work; the slice is the contract for the UI.

## Acceptance

- Works at 375px with no horizontal scroll; switches, choices and actions are at least 44px.
- Every state (plan, switch on/off, selected course) is conveyed in text, not colour alone.
