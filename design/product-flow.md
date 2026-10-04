# Product Flow

## Outcome

A learner should move from an unknown starting level to a personalized, exam-focused plan with a defensible next-band target.

## States

### 1. Registration

- Methods: email, phone, Google, Apple.
- Collect only the minimum account information needed to begin assessment.
- Show privacy and consent language before account creation.
- Provider: Clerk (`@clerk/clerk-react`), configured with `VITE_CLERK_PUBLISHABLE_KEY` (public key only; the secret key never reaches this app). Without a key the app falls back to the local placeholder form for development.
- The first page (`/`, see [sign-up](sign-up.md)) embeds Clerk sign-up (hash routing, so OAuth returns to the page the form is mounted on; `/sso-callback` also completes the redirect) with a toggle to sign-in. When signed in it shows the account and continues to the questionnaire.
- Header controls: signed out → Sign in / Sign up (modal); signed in → Clerk user menu with a Settings link. Present in the study header.
- Route guard: `/interview`, `/speaking/*` and the study tabs require a signed-in user; signed-out visitors return to `/`. Loading shows a status message.
- Sign-in, phone, Google and Apple are enabled in the Clerk dashboard, not in code.

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

- Default target: the next realistic half-band. A course always targets exactly one half-band above the confirmed start; a larger goal is reached through consecutive courses (5.5 → 6.0 → 6.5 → 7.0), never in one.
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
- A course target is never more than one half-band above the confirmed starting score. Longer goals are a chain of courses, each starting from the confirmed result of the one before.
- A mock exam score uses the same band calculation rules as the relevant IELTS exam format.
