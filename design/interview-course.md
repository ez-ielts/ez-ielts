# Interview → course

Route: `/interview` (focus mode, header label "Interview", no exit). Follows the placement test and generates the learner's 8-week course. Design reference: Claude Design handoff `EzInterview.dc.html`.

## Stages

Stage strip: Questionnaire · Tutor interview · Your course.

### 1. Questionnaire

Six questions, five as choice buttons:

1. Goal score: the exam's three goals, starting at the next half-band (IELTS 6.0 / 6.5 / 7.0 from a 5.5 start; TOEFL 4.0 / 4.5 / 5.0 from 3.5). The default is the first. **A course never jumps to the goal:** each course takes the learner up one half-band, so a bigger goal becomes a chain of courses (5.5 → 6.0 → 6.5 → 7.0). The hint says so.
2. Exam date: Not booked / In 8–10 weeks (default) / In 4–8 weeks / Under 4 weeks.
3. Minutes per day: 30 / 45 (default) / 60 / 90.
4. Days per week: 3 / 5 (default) / 6.
5. Weakest skill: Listening / Reading / Writing (default) / Speaking. This weights the drill queue, not the schedule.
6. Reason (optional free text).

"Continue to interview" moves to stage 2 and requests the tutor's first question.

### 2. Tutor interview

- Left: H1, explanation, summary table (estimate, target, goal when it differs, time, exam date, focus).
- Right: chat thread (`role="log"`). Tutor messages are outlined; learner messages are ink-filled and right-aligned.
- The tutor asks one question at a time. After 3 learner replies it sends a 2-sentence summary ending with `[DONE]`. The marker is stripped, the input is replaced by "Interview complete." and "Build my course".
- Loading: "Tutor is typing…" pulse; Send is disabled.
- Error: an alert band inside the thread with "Try again", which re-requests the last turn. Rate-limit (429) and network errors have their own copy.
- "Skip interview and build the course" is always available.

### 3. Your course

- Kicker "Your course · {course name}", H1 "{start} to {target} in 8 weeks", where the target is always the next half-band.
- When the goal is more than one half-band away, a **roadmap** ("Your path to {goal}") shows the chain of courses: "Course 1 · this course {start} → {target}", the next courses, and "Reaches your goal" on the last. Statuses are text.
- CTAs: Start 7-day free trial (sets `session.tier = 'trial'`, goes to `/today`) and See course price (`/pricing`).
- Fact grid: length, daily session, study total (minutes × days × 8 weeks), checkpoints.
- 8-week list. Weeks 4 and 8 are checkpoint mocks with accent top rules.
- Guarantee conditions box. The copy is final: it is always conditional.

## Exams

IELTS Academic (start 5.5, course 5.5 → 6.0, goals 6.0 / 6.5 / 7.0) and TOEFL iBT on the 1–6 scale (start 3.5, course 3.5 → 4.0, goals 4.0 / 4.5 / 5.0), each with its own week plan. Driven by `session.exam`. Data in `src/features/intake/intakeConfig.js`. The start estimate is a placeholder until the placement slice supplies it.

## Service boundary

`src/features/intake/intakeService.js` → `POST {VITE_API_BASE_URL}/intake/messages` with `{ exam, profile, instructions, messages }`, returning `{ text }`. The model key stays on the backend. With no `VITE_API_BASE_URL`, a scripted local tutor with the same turn shape runs, for development only.

## Acceptance

- Works at 375px with no horizontal scroll; choice buttons and actions are at least 44px.
- Every state is reachable: loading, error + retry, rate limit, complete, skipped.
