# Tutor

Route: `/tutor` (study tab "Tutor"). Opened by the tutor note on Today. Placeholder design reference: the interview chat (`design/interview-course.md`), which uses the same thread.

## Layout

- Header: kicker "Your tutor", H1 "Ask about your plan, your marked work or any task type", lede stating that the tutor answers only questions about preparing for the learner's exam.
- Two wrapping columns. **Left (flex 1 1 260px)**: a context table (course, estimate → target, this week, focus skills, overdue work) so the learner sees what the tutor knows, and suggested questions as buttons (they send the question). **Right (flex 2 1 420px)**: the shared `ChatThread`.
- `ChatThread` (also used by the interview): `role="log"` thread, tutor messages outlined, learner messages ink-filled and right-aligned, "Tutor is typing…" pulse, `AlertBand` with Try again, input row with Send. The thread opens with a tutor intro bubble that is not sent to the model.

## States

- Empty: intro bubble and suggested questions.
- Loading: typing pulse, Send disabled.
- Error: network and rate-limit (429) copy with Try again, which re-requests the last turn.
- Suggested questions hide once the conversation starts.

## Rules for the tutor (sent as instructions, server-side in production)

- Exam-first: answers only about preparing for the learner's chosen exam (IELTS Academic or TOEFL iBT, on its own scale); politely declines anything else.
- Uses the learner's context: course, estimate and target, week, focus skills, overdue work.
- Never promises a score. The guarantee is always conditional on completing the assigned work.
- Does not reveal or invent official scores; estimates are estimates.
- Short, direct answers; no emoji.

## Service boundary

`src/features/tutor/tutorService.js` → `POST {VITE_API_BASE_URL}/tutor/messages` with `{ exam, context, instructions, messages }`, returning `{ text }`. The model key stays on the backend. With no `VITE_API_BASE_URL`, a scripted local tutor with the same turn shape runs, for development only.

## State

`tutor` slice: `messages`, `status` (`idle | loading | failed`), `errorKind`. Context is derived from the plan, homework and Today data at send time.

## Acceptance

- Works at 375px with no horizontal scroll; actions at least 44px.
- Loading, error + retry and rate-limit states are reachable.
- The interview chat behaves exactly as before after the extraction.
