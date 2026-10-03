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
