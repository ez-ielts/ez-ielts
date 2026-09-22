# Product Flow

## Outcome

A learner should move from an unknown starting level to a personalized, exam-focused plan with a defensible next-band target.

## States

### 1. Registration

- Methods: email, phone, Google, Apple.
- Collect only the minimum account information needed to begin assessment.
- Show privacy and consent language before account creation.

### 2. AI diagnostic interview

- Explain that this is an estimate, not a certified IELTS result.
- Use a voice-first AI examiner for a structured IELTS Speaking interview, not a chat transcript.
- Follow the real three-part shape: Part 1 familiar questions, Part 2 one-minute preparation plus a long turn, and Part 3 abstract follow-up discussion.
- The examiner speaks back in the learner's session and controls the next question after each answer.
- Request microphone permission only when the learner taps to speak; show listening, examiner-speaking, preparation, and network-error states.
- Support browser speech recognition where available, with a clearly labeled transcript fallback for unsupported browsers and accessibility.
- Capture transcript, pronunciation signals, fluency, grammar range/accuracy, and vocabulary evidence.
- Provide recording, pause, retry, and network-error states in the production version.

### 3. Skill diagnosis

- Assess all four skills: Listening, Reading, Speaking, and Writing.
- Show overall estimate plus evidence and focus areas for each skill.
- Keep the estimate editable until a full diagnostic mock confirms it.

### 4. Personalized plan

- Default target: the next realistic half-band.
- Plan includes weekly tasks, Cambridge-aligned material references, feedback loops, and checkpoint mocks.
- Include estimated duration, study frequency, exam date, and reminder preferences.
- Never promise a band without a completion condition and evidence policy.

### 5. Monitoring and adjustment

- Track task completion, late/missed work, skill scores, and mock exam trends.
- Send email reminders for study tasks and exam due dates.
- Re-plan when behavior or checkpoint evidence shows the current plan is not working.

## Acceptance criteria

- A learner can complete the flow on a mobile viewport.
- Every step has loading, error, back/retry, and completion states in the API-backed version.
- A target score is never more than one default half-band above the confirmed starting score without explicit evidence.
- A mock exam score uses the same band calculation rules as the relevant IELTS exam format.
