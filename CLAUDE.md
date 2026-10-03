# ezIELTS Project Contract

## Product purpose

ezIELTS is an exam-preparation platform. Its only product goal is helping learners prepare for and pass IELTS Academic or TOEFL iBT; the learner picks one exam and every screen follows it. It is not a general English improvement app.

The core journey is:

1. Register with email, phone, Google, or Apple.
2. Complete an AI-led CEFR/IELTS diagnostic interview.
3. Estimate an initial overall band and diagnose Listening, Reading, Speaking, and Writing.
4. Set a realistic next half-band target, such as 5.5 to 6.0 or 6.0 to 6.5.
5. Generate a personalized Cambridge IELTS-aligned course.
6. Use checkpoint mock exams, reminders, due dates, and behavior signals to adjust the course.

## Product principles

- **Exam-first:** Every task must map to a skill, criterion, task type, or exam simulation of the learner's exam (IELTS Academic or TOEFL iBT, scored on its own scale).
- **Voice-first speaking:** Speaking assessment is a live, turn-based voice interaction with an examiner. Text is a fallback and evidence layer, not the main experience.
- **Tool-mediated assessment:** The voice model records evidence through server-side tools; it must not invent, directly persist, or prematurely reveal scores.
- **Evidence over optimism:** Scores and recommendations must be supported by diagnostic evidence and checkpoint performance.
- **Realistic progression:** Default to the next achievable half-band, not an inflated promise.
- **Conditional guarantee:** We may promise course adjustment and readiness support when learners complete assigned work; never claim an unconditional exam result.
- **Adaptive by behavior:** Missed tasks, weak mock scores, or repeated errors should trigger plan adjustment.
- **Cambridge-aligned:** Course content should reference licensed official Cambridge IELTS material through approved integrations or content processes.
- **Mobile usable:** All primary actions and study tasks must work at mobile widths and touch sizes.

## Engineering principles

- Design first, implementation second. Update the relevant file in `design/` before building a new product surface.
- Use reusable React components. Do not duplicate page-level markup for repeated patterns.
- Use Redux Toolkit for shared workflow, user, assessment, plan, notification, and progress state. Keep local state only for ephemeral UI state.
- Keep `src/app` for application wiring, `src/features` for domain state and logic, `src/components` for reusable UI, and `src/lib` for shared configuration/utilities.
- Use Tailwind CSS utilities and shared tokens for styling. Avoid new page-specific global CSS.
- Keep API clients and side effects behind feature/service boundaries; do not call external APIs directly from presentational components.
- Keep Realtime session creation and examiner tools server-side. Never expose an OpenAI API key or unrestricted persistence tool to the browser.
- Keep components small enough to test independently and name event handlers by intent.
- Validate every change with `npm run lint` and `npm run build`.

## Delivery workflow

**Until the first working release (pre-v1):** do not use `develop`. Create a GitHub issue, create a focused `feature/<issue>-name` or `fix/<issue>-name` branch from `main`, implement against the approved design, and open a PR into `main`. Every merge to `main` deploys to GitHub Pages.

**After the first release is approved:** switch to Gitflow. Branch from `develop`, open PRs into `develop`, and release from `develop` to `main`.

See [design/README.md](design/README.md) and [.github/CONTRIBUTING.md](.github/CONTRIBUTING.md) for the working agreements.
