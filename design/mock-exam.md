# Checkpoint mock exam

Route: `/mock/:id` (focus mode, header label "Checkpoint mock", "Save and exit" → Plan). Ids are `week-4` and `week-8`, the checkpoint weeks in the plan. An id that is not a checkpoint of the course shows "Mock not found" with a link to the plan. A checkpoint whose week has not been reached shows "This checkpoint unlocks in week N" with a link to the plan. Finishing the checkpoint of the current week advances the plan (see [progress](progress.md)).

## Flow

1. **Intro**: kicker "Checkpoint · week N", H1 "Checkpoint mock", a ruled list of the four sections with their time, the rules (timed, no going back, timings are shortened in this version) and the honest line: "The result is an estimate, not an official score." Primary "Start the mock".
2. **Four timed sections, in order**: Listening, Reading, Writing, Speaking. Each shows "Section n of 4", its name, a `role="timer"` countdown (Speaking uses the answer timer), the content and "Finish section" (auto at zero). No going back to an earlier section.
   - **Listening**: a short talk played with browser speech synthesis (Play / Stop) and four multiple-choice questions. If audio is unavailable the transcript is shown instead and says so.
   - **Reading**: a short passage and four questions (IELTS: True / False / Not Given; TOEFL: multiple choice).
   - **Writing**: a prompt, a textarea and a live word count against the target for this short version.
   - **Speaking**: one long-turn question. Voice with a live transcript where speech recognition exists, otherwise a clearly labelled typed fallback; the microphone is requested only on tap.
3. **Scoring**: "Marking your mock…" status, then the result. A failed request shows an `AlertBand` with Try again.
4. **Result**: overall band (66px) with "Estimated score · not an official result", the four skill bands in a ruled grid, an **evidence** line per skill, how the overall compares with the pace for this week, and **Plan adjustments** with a link to the plan. Never a promise of an exam result.

## Scoring rules (`mockExamService.js`)

- Overall = the mean of the four skill scores rounded to the nearest half band (x.25 up to x.5, x.75 up to the next whole), on the exam's own scale (IELTS 0–9, TOEFL iBT 1–6).
- Listening and Reading: raw score is scaled to 40 and converted with the IELTS Academic band tables, or mapped linearly onto the 1–6 TOEFL scale. This short version cannot evidence the top bands, so skill bands are capped (IELTS 7.0, TOEFL 5.0) and the result says so.
- Writing and Speaking: **placeholder marking from length only**, until the AI marker is connected through the backend. The result states this. The live marker returns criterion bands for the exam's four criteria.
- The same functions take real full-length data later: only the content and the marker change.

## Plan adjustments (feeds the plan)

`planAdjustments` compares each skill with the pace for this checkpoint: `start + (target − start) × week / total weeks`, rounded **down** to a half band, where the target is the course's half-band target (so the first checkpoint expects skills at least at the start band, and the last expects the target).
- A skill below pace adds "Extra {skill} practice": two extra sessions a week until the next checkpoint.
- Overdue homework adds "Late work": the next session is shortened to make room; a second late submission voids the guarantee.
- If every skill is on pace and nothing is overdue: "Plan unchanged".

The plan slice stores `checkpoints[week]` and `adjustments`. The Plan screen shows a "Plan adjustments" section and the mock result on the checkpoint week.

## State

`mock` slice: `stage` (`intro | section | scoring | result | failed`), `sectionIndex`, `answers` (`listening`, `reading`, `writing`, `speaking`) and `result`. The attempt resets on entering a mock id. Content is mock data in `mockConfig.js`.

## Acceptance

- Works at 375px with no horizontal scroll; choices and actions at least 44px.
- Every section is completable without a microphone or audio.
- Timers use `role="timer"`; nothing relies on colour alone.
- Bands use the same rounding and conversion as the exam format (unit-checkable pure functions).
