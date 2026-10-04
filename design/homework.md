# Homework and marked work

Routes: `/homework` (list) and `/homework/:id` (marked essay or assignment). Both live under the Homework tab (`/homework/*` is owned by it).

## Homework list

- Header: kicker "Homework", H1 "What's due and what's marked", lede with counts.
- Three ruled groups, in this order and only when non-empty:
  1. **Overdue**: accent-labelled group. Each row has a text "Overdue · due {day}" label. Includes the rule that a second late submission voids the guarantee.
  2. **To do**: rows with a due label.
  3. **Marked**: rows with the result ("Band 5.5", or "8 of 10" for objective work).
- Row: skill kicker (Writing, Reading, Speaking…), title, task type and detail, a text status, and one action. Writing rows open `/homework/:id`; speaking rows open `/speaking/:id`; reading and other rows open `/homework/:id`.
- States: loading ("Loading homework…", `role="status"`), error (`AlertBand` with Try again), empty ("Nothing assigned yet").
- Mobile: rows wrap, the action drops below the text, 44px targets.

## Marked essay (`/homework/:id`)

- Back link "Homework", kicker (skill and task type), H1 (essay title), the prompt in a surface box.
- **Result**: score numeral (66px) with "Estimated band · not an official result", then the criteria grid (ruled): the exam's four writing criteria, each with its band and a one-line comment. IELTS: Task Response, Coherence and Cohesion, Lexical Resource, Grammatical Range and Accuracy. TOEFL (1–6 scale): Task and development, Organization, Vocabulary, Grammar and mechanics.
- **Annotated essay** and **Feedback** side by side (stacked on narrow screens). Marked passages are underlined with a superscript number, never colour alone; each number matches a feedback note naming its criterion. The feedback list says how many errors of that kind exist in total when more are marked than shown.
- **Next action** box: what to practise next, linking to the relevant screen.
- Unmarked or unknown id: "This assignment has not been marked yet" with the back link. No error is raised.

## Data and state

- `homework` slice: `items`, `status` (`idle | loading | failed | ready`), `loadedExam`. `loadHomework` is a thunk that calls `homeworkService.fetchHomework(exam)`, which returns placeholder data per exam until the API exists (`src/features/homework/homeworkConfig.js`). The thunk does nothing if that exam is already loaded or loading.
- Selectors: `selectHomeworkGroups`, `selectHomeworkItem(id)`, `selectOverdueItem`.
- Today's overdue band reads `selectOverdueItem`, so it follows homework state. Marked cards on Today link to ids that exist here.
- Overdue work is also the adaptive-plan signal: the plan will read the same selector when adjustment is built.

## Acceptance

- Works at 375px with no horizontal scroll; actions at least 44px.
- Every status and annotation is conveyed in text.
- Loading, error and retry, empty and unmarked states are reachable.
