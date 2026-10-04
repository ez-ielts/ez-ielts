# Plan

Route: `/plan` (study tab "Plan"). Also opened by the exam tag in the header and by Today → Reschedule. Checkpoint mocks open `/mock/:id` (see [mock exam](mock-exam.md)).

## Layout

- **Header**: kicker "Your course · {course name}", H1 "{start} to {target} in 8 weeks", lede with the current week and what the next checkpoint is.
- **Fact grid** (ruled grid): This week "n of 8", Daily session, Days per week, Exam date.
- **Course weeks**: the same week list as the course summary, plus a status on every week as text (never colour alone): "Done" (✓), "This week" (surface fill, `aria-current="step"`), "Upcoming". Checkpoint weeks (4 and 8) keep the accent top rule and link to their mock.
- **Study schedule**: the intake questions for minutes per day, days per week and exam date as `ChoiceQuestion` fieldsets. Changing an answer updates the plan at once (and the fact grid). The hint under the exam date warns that under 4 weeks compresses the course and lowers the guaranteed target.
- **How your plan adapts** (ruled list): missed or late work, a weak checkpoint mock, and repeated errors each trigger an adjustment. States the rule, not a promise.
- **Guarantee conditions**: the shared, always-conditional copy.

Layout wraps: week list and schedule sit side by side above ~860px and stack below.

## State

- `plan` slice: `currentWeek` and `totalWeeks` (placeholder `3` of `8` until progress is tracked from completed sessions). `selectPlan` derives the whole view from `session.exam`, the intake answers and the exam's week table, so there is one source for the schedule: the intake answers.
- Rescheduling dispatches `intake/answerChosen`. The target is not editable here; it comes from the intake and never exceeds the exam's allowed targets.
- `checkpoints[week]` and `adjustments` are set when a mock is completed. The Plan screen shows a "Plan adjustments" section (title and detail per adjustment, or "Plan unchanged") and the mock result on the checkpoint week.

## Acceptance

- Works at 375px with no horizontal scroll; choices and links are at least 44px.
- Every week has a text status; checkpoint weeks are labelled "Checkpoint mock".
- Switching exam in the store switches the week table and scale.
