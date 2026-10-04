# Placement

Route: `/placement` (focus mode, header label "Placement", no exit). It follows sign-up (`/`) and comes before the questionnaire (`/interview`). It produces the **start estimate** that the course, the plan, the pricing level, the tutor and the mock pace are all built from.

Stage strip on every onboarding screen: Create account · **Placement** · Questionnaire · Tutor interview · Your course.

## Flow

1. **Intro**: kicker "Placement", H1 "Find your starting level", the four sections with their time, and the rules: timed, no going back, short version, "an estimate, not an official score, and a full mock exam confirms it". Primary "Start placement".
2. **Four timed sections**, the same components as the mock exam: Listening (a short spoken talk with three questions; transcript if audio is unavailable), Reading (a short passage with three questions), Writing (a short prompt with a live word count), Speaking (one question; voice with a live transcript or the labelled typed fallback; microphone only on tap). No score is shown while speaking.
3. **Scoring**: "Working out your level…", then the result. A failed request shows an `AlertBand` with Try again.
4. **Result**: "Your starting estimate" (66px) with "Estimate · not an official result", the four skill bands with a one-line evidence each, and the confirm control.
   - **Confirm your starting level**: a `ChoiceQuestion` with the estimate and the half-band either side, inside the supported range, preselected on the estimate. Text under it: "You can change this. A full mock exam confirms your level."
   - If the result was clamped to the supported range, a plain note says why ("Courses currently start between 4.5 and 6.5").
   - Primary "Start my course" → sets the start, restarts progress at week 1 and continues to the questionnaire.

## Rules (`placementConfig.js`, `mockExamService.js`, `pricingConfig.js`)

- Same band maths as the mock exam: overall = mean of the four skills rounded to the nearest half band; Listening and Reading from the raw score (scaled to 40, IELTS Academic tables, or the 1–6 TOEFL mapping).
- This is a short test, so Listening and Reading bands are capped at the top supported start (IELTS 6.5, TOEFL 4.5), and the result says so.
- Writing and Speaking are **placeholder marking from length only**, scaled to the placement lengths, until the backend's AI marker is connected. The result says so.
- **Supported starts** are the starts of the pricing levels: IELTS 4.5, 5.0, 5.5, 6.0, 6.5; TOEFL 2.5, 3.0, 3.5, 4.0, 4.5. An estimate outside is clamped to the nearest one.

## State

`placement` slice: `stage` (`intro | section | scoring | result | failed`), `sectionIndex`, `answers`, `result`, `chosenStart`. Content and scoring are mock data until the backend supplies them; the shape matches the mock exam so the same service replaces both. Confirming dispatches `intake/startConfirmed` and `beginCourseAt` (restarts the plan at week 1 and resets Today).

## Acceptance

- Works at 375px with no horizontal scroll; choices and actions at least 44px.
- Every section is completable without a microphone or audio.
- Timers use `role="timer"`; nothing relies on colour alone.
