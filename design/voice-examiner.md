# Voice Examiner Agent Contract

## Decision

Use server-side function tools with the Realtime voice agent. Do not expose an MCP server or OpenAI API key directly to the browser. The browser connects to a short-lived voice session; the server owns assessment tools, persistence, validation, and score release.

An MCP server can be added later if the same assessment tools must be shared across internal agents. For the learner-facing Realtime session, server-side function tools are the smaller and safer boundary.

## Agent responsibilities

- Conduct a faithful IELTS Speaking-style interview in three parts.
- Ask one question at a time and wait for the participant to finish.
- Use natural short acknowledgements without coaching or correcting during the assessment.
- Ask neutral follow-ups when an answer is too short, unclear, or does not address the question.
- Respect Part 2 timing: one minute preparation, then a long turn.
- Keep the interaction voice-first. Do not ask the participant to type unless audio fails.
- Never reveal a provisional band during the interview.
- Never claim to be a human or an official IELTS examiner.
- At the end, summarize behavior and evidence before finalizing.

## Evidence policy

The model records observations, not ungrounded scores. Each observation must reference a turn or part and include a short quote or audio timestamp when available.

The final score service must reject incomplete assessments. It should require:

- Part 1, Part 2, and Part 3 turns.
- Evidence for fluency and coherence, lexical resource, grammatical range and accuracy, and pronunciation.
- A behavior summary covering response length, hesitation, repair, turn-taking, and task completion.
- A confidence level and an explicit list of missing evidence.

The score is an estimate for course placement, not an official IELTS result.

## Tool sequence

1. `record_turn_evidence` after each completed candidate turn.
2. `record_rubric_observation` after enough evidence exists for a criterion.
3. `record_behavior_summary` after Part 3.
4. `finalize_speaking_assessment` once all required evidence is present.

The finalizer owns the status transition from `in_progress` to `ready_for_diagnosis`. The model cannot call it early without the server rejecting the request.

## Safety and privacy

- Use a stable internal participant ID, not an email address, in tool arguments.
- Store consent, retention, and deletion status with the assessment.
- Keep API credentials and persistence tools server-side.
- Tell the participant the voice is AI-generated.
- Keep raw audio access separate from the score record.

## Speaking practice screen

Route: `/speaking/:id` in focus mode (header label "Speaking practice", "Save and exit" → Today). Ids: IELTS `part-1`, `part-2`, `part-3`; TOEFL `interview`. An id that does not belong to the learner's exam shows "Practice not found" with a link to Today. Practice content is mock data in `src/features/speaking/speakingConfig.js` until the backend supplies it.

### Stages

1. **Ready**: kicker with the practice name, H1, instruction, facts (questions, preparation, answer length) and how it works. Primary "Start with microphone", secondary "Answer by typing instead". The microphone is requested only when the learner taps Start. If browser speech recognition is unavailable, a notice says answers will be typed and the voice button is replaced by "Start (typed answers)".
2. **Examiner asking**: "Question n of N", the question (and the cue card with its four prompts for Part 2), "Examiner speaking…" with the soft pulse in voice mode. The question is spoken with browser speech synthesis; a timeout and "Skip audio" guarantee it never blocks. Text mode shows the question without audio.
3. **Preparation** (Part 2 only): one-minute countdown (`role="timer"`), optional notes box, "I'm ready" to start early.
4. **Answering**: status "Listening" (pulsing marker, text label), countdown to the answer limit, live transcript (`aria-label="Live transcript"`), Pause / Resume, Finish answer. At zero the answer is submitted. Text mode replaces the transcript with a textarea labelled "Typed answer (fallback)".
5. **Paused**: timer and recognition stop; "Paused" label; Resume.
6. **Error**: `AlertBand` with Try again and "Answer by typing instead". Kinds: microphone blocked, no microphone, transcription stopped. A silent pause is not an error.
7. **Complete**: "Practice complete", a table of question, seconds and words, and each transcript. No score or band is shown; the copy says the transcript is recorded as evidence. Back to Today / Practise again.

### Evidence

Each submitted answer builds a `record_turn_evidence`-shaped record (`assessment_id`, `part`, `question`, `transcript_excerpt`, `duration_seconds`, `observations`) in `speakingService.js`. Observations are measurable facts only (seconds used of the limit, word count); nothing is scored in the browser. The mock stores the records in the `speaking` slice; the backend replaces the service with the Realtime session and server-side tools described above.

### Acceptance

- Works at 375px with no horizontal scroll; buttons at least 44px; the primary action stays visible.
- Every stage is reachable without a microphone through the typed fallback.
- Timers use `role="timer"` and never rely on colour alone.
