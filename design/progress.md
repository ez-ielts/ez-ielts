# Progress: how doing the work moves the course

Progress is state, not decoration. These rules decide when a day counts, when a week advances, what late work does, and how one course hands off to the next. Content stays mock data until the backend supplies it; the rules live in the slices.

## Sessions and days

- Completing all three steps on Today records **one completed session for that calendar day** (`today.sessionDate`). Further steps that day do nothing.
- On a later calendar day the Today screen starts a new session (`stepsDone` resets). This runs when Today opens, so it also works once progress is persisted.
- The day label reads "Week {n} · session {k} of {days}" (days per week from the schedule).

## Weeks

- `plan.weekSessions` counts completed sessions in the current week.
- **Normal week**: advances when `weekSessions` reaches the study days per week.
- **Checkpoint week** (4 and 8): sessions are counted, but the week advances only when its checkpoint mock is finished.
- Checkpoint mocks **unlock when their week is reached**. A locked checkpoint shows "Unlocks in week N" on the Plan, and `/mock/week-N` explains the same with a link back. A retake of an earlier checkpoint is allowed and never moves the week.
- The week label in the header and Plan reads the plan slice. Until progress is stored by the backend, the placeholder starting week is 4 (the first checkpoint) so the mock can be reached.

## Homework

- Statuses: Overdue, To do, **Submitted** (awaiting marking), Marked. Group order: Overdue, To do, Submitted, Marked.
- Completing a speaking practice marks the homework item whose route is that practice as Submitted. Speaking practice is not one of the three Today session steps.
- Open assignments can be submitted from `/homework/:id`: Writing has a textarea with a word count; other skills have a "Mark as submitted" action until their in-app task exists.
- Submitting an **overdue** item counts one late submission. The guarantee allows one; the Plan states the count in text and says when the guarantee no longer applies.
- The Today overdue band and the Plan's "Late work" adjustment read the live overdue item, so they disappear when it is submitted.

## Course completion and the next course

- Finishing the week-8 checkpoint mock completes the course (`plan.completed`).
- **Reached the target**: "Course complete". Text: "You reached {overall}[, past the {target} target]. Your next course ({new start} → {new target}) starts from this result." Primary **Start next course**.
- **Below the target**: "Your final mock is {overall}, below the {target} target. If you completed the assigned work, the guarantee extends your course free until it is reached." Primary **Retake the final mock**. Extension length is a backend rule; nothing is invented here.
- **Start next course** sets the start estimate to the confirmed result (`intake.start[exam]`), restarts the plan at week 1 with no checkpoints, adjustments or completion, and resets Today's session. The course name, target, pricing level and roadmap all derive from the new start. The goal is kept when it is still ahead, otherwise it follows the new target.
- The start estimate is state (`intake.start`) rather than a config constant; the placement test will set it the first time.

## Acceptance

- Each rule is covered by a pure reducer or selector that can be run without the UI.
- Works at 375px; every status is text.
