# Backend contract (frontend expectations)

Status: **draft for the backend design.** Production API: `https://api.ez-ielts.nexisci.space`. Wired so far: `/intake/messages` and `/tutor/messages` (through the shared client below). Everything else waits for agreed shapes. This lists what the frontend already calls or will need, taken from the service boundaries in `src/features/*/*Service.js` and the slices that hold learner state. Endpoints and names are proposals; change them in the backend repo and update this file. Today every service falls back to mock data when `VITE_API_BASE_URL` is unset.

## Conventions

- Base URL `VITE_API_BASE_URL` (production `https://api.ez-ielts.nexisci.space`), including any version prefix; services use paths such as `/intake/messages` relative to it. JSON in and out. Requests use a bearer token, not cookies, so `credentials: 'include'` is not needed. The deployed app keeps using mock data until the repository variable `VITE_API_BASE_URL` is set, so the backend can go live without a frontend change.
- **Auth**: the browser signs in with Clerk. Proposal: every request carries `Authorization: Bearer <Clerk session token>`; the backend verifies it against Clerk's JWKS and keys all data by the Clerk user id. No password or secret is ever handled in the browser. Only the publishable key is public.
- **Errors**: `{ "error": { "code": "...", "message": "..." } }`. The frontend maps statuses to three kinds: **401** → sign in again; **429** → `rate_limit` (honour `Retry-After`); network failure or any other non-2xx → `network`. Every screen already has a retry state for these.
- **Idempotency**: submits (`homework`, `mock`, `placement`, `progress`) accept an `Idempotency-Key` header so a retry never double counts (late submissions and sessions are counted).
- **Exam**: `exam` is `ielts` or `toefl`. Bands are numbers in half-band steps on the exam's own scale (IELTS 0–9, TOEFL iBT 1–6). The server never returns a value outside the scale.
- **The model key and Realtime session creation stay on the server** (CLAUDE.md). The browser never receives an unrestricted persistence tool.

## CORS

The app is served from `https://ez-ielts.nexisci.space` (and `http://localhost:5173` in development) and calls the API from the browser, so the API must:

- allow those origins (not `*` once credentials or the `Authorization` header are involved);
- allow methods `GET, POST, PUT, OPTIONS` and request headers `Authorization, Content-Type, Idempotency-Key`, and answer preflight `OPTIONS` requests;
- list `Retry-After` in `Access-Control-Expose-Headers`, otherwise the browser hides it from the 429 handler.

## Frontend client (`src/lib/apiClient.js`)

All calls go through one client. It adds `Authorization: Bearer <Clerk session token>` (read from the active Clerk session; omitted when nobody is signed in), `Content-Type: application/json` when there is a body and `Idempotency-Key` when given, and times out after 30 seconds. Responses map to `ApiError` kinds: **401 → `unauthorized`**, **429 → `rate_limit`** (with `retryAfter` seconds), **everything else, a timeout, a refused connection or a malformed body → `network`**; `204` returns `null`. Each service turns the kind into its own retry or sign-in message. With no base URL configured, services use their mock data.

## Endpoints

### Existing in the frontend

| Method and path | Body | Response | Notes |
| --- | --- | --- | --- |
| `POST /intake/messages` | `{ exam, profile, instructions, messages: [{ role, content }] }` | `{ text }` | Tutor interview. The text ends with `[DONE]` when finished. `profile` has `start`, `target`, `goal`, `mins`, `days`, `date`, `weak`, `reason`. |
| `POST /tutor/messages` | `{ exam, context, instructions, messages }` | `{ text }` | `context` has `course`, `start`, `target`, `goal`, `week`, `totalWeeks`, `mins`, `days`, `skills[{ name, score, weak }]`, `focus[]`, `overdue`. The server should build its own instructions and treat the client's as a hint only. |

### To add (all currently mock data)

| Method and path | Purpose | Shape the frontend expects |
| --- | --- | --- |
| `GET /profile`, `PUT /profile` | Exam, confirmed start per exam, questionnaire answers | `{ exam, start: { ielts, toefl }, answers: { goal, date, mins, days, weak, reason } }` |
| `GET /today?exam=` | The day's session | `{ title, lede, steps: [{ title, sub, minutes }], marked: [{ kicker, title, body, cta, to }], estimate: { score, target, mockIn, trend[], skills[{ name, score, weak }] }, drills[], drillsDue, tutorNote }` |
| `GET /homework?exam=` | List with status | `[{ id, status, skill, task, title, detail, due?, lateNote?, result?, to?, feedback? }]` with `status` one of `overdue`, `todo`, `submitted`, `marked`; `feedback` (marked writing only) is `{ prompt, score, criteria: [{ name, band, comment }], paragraphs: [[{ text, note? }]], notes: [{ criterion, text }], next: { label, to } }` |
| `POST /homework/:id/submit` | Submit work | `{ text? }` → the updated item. Submitting an `overdue` item counts one late submission. |
| `GET /progress` | Source of truth for the course | `{ currentWeek, totalWeeks, weekSessions, stepsDone, sessionDate, checkpoints: { [week]: { overall } }, adjustments: [{ id, title, detail }], completed: { overall } \| null, lateSubmissions }` |
| `POST /progress/steps` | A completed session step | `{ index, date }` → `/progress`. The third step of a calendar day records one session. |
| `POST /progress/course` | Start a course | `{ start }` → `/progress` at week 1. Used by placement and "Start next course". |
| `GET /assessments/placement?exam=` and `GET /assessments/mock/:id?exam=` | Content | `{ sections: [{ key, name, minutes }], listening: { audioUrl, transcript, lang, questions[] }, reading: { title, passage, questions[] }, writing: { task, prompt, targetWords, fullWords }, speaking: { part, question, cue?, prepSeconds?, speakSeconds }, speakingLang }`. Questions are `{ id, text, options[] }` (the correct answer stays on the server). |
| `POST /assessments/placement` and `POST /assessments/mock/:id` | Submit and mark | `{ exam, answers: { listening: { [id]: option }, reading: { [id]: option }, writing, speaking: { text, seconds } } }` → `{ overall, skills: [{ key, name, band, evidence }], cap, pace?, adjustments? }` |
| `GET /speaking/practices/:id?exam=` | Practice content | `{ title, instruction, lang, turns: [{ part, question, cue?, prepSeconds?, speakSeconds }] }` |
| `POST /speaking/sessions` | Start a voice session | `{ practiceId, exam }` → `{ assessment_id, client_secret, expires_at }`: a short-lived Realtime credential. The examiner tools (`record_turn_evidence`, `record_rubric_observation`, `record_behavior_summary`, `finalize_speaking_assessment`) run on the server. |
| `POST /speaking/sessions/:id/turns` | Evidence from the typed fallback | The `record_turn_evidence` shape: `{ assessment_id, part, question, transcript_excerpt, duration_seconds, observations[] }` |
| `GET /settings`, `PUT /settings` | Reminders | `{ reminders: { tasks, examDate, weekly }, reminderTime: 'Morning' \| 'Afternoon' \| 'Evening' }`. Email sending (study tasks, exam date, weekly summary) is a server job. |
| `GET /billing`, `POST /billing/checkout` | Plan | `{ tier: null \| 'trial' \| 'foundation' \| 'bridge' \| 'core' \| 'advanced' \| 'mastery' }`; checkout returns `{ url }`. Prices and levels come from the server (the frontend has mock values). |

## Rules the server should own

The frontend implements these as reducers today so the UI works offline from the backend; the server should be the authority and the frontend should reconcile to `GET /progress`.

- **Half-band courses** (`design/progress.md`, `interview-course.md`): a course target is the start plus one half-band; a goal further away is a chain of courses. Supported starts are the pricing levels' starts (IELTS 4.5–6.5, TOEFL 2.5–4.5).
- **Sessions and weeks**: one counted session per calendar day (in the learner's time zone, which the server must know); a normal week advances after as many sessions as study days per week; checkpoint weeks (4 and 8) advance when their mock is finished; checkpoints unlock when their week is reached.
- **Late work**: one late submission is allowed; the count is returned so the Plan can state it.
- **Band calculation**: overall is the mean of the four skills rounded to the nearest half band; Listening and Reading come from the raw score (IELTS Academic tables, or the 1–6 TOEFL mapping). Writing and Speaking come from the AI marker, not from length.
- **Adjustments**: from each checkpoint, skills below pace get extra practice and overdue work shortens the next session (`planAdjustments`). The server returns them with the result.
- **Placement and mocks** never expose answer keys to the browser.

## Data and privacy

- Speaking: store consent, retention and deletion status with each assessment. Keep raw audio separate from the score record, and use a stable internal participant id in tool arguments, not an email address (`voice-examiner.md`).
- Estimates are labelled estimates everywhere; never return or store an "official" score.
- Learner data must be deletable on request.

## Open questions for the backend design

1. Is `/progress` fully server-authoritative, or does the browser send events and the server derives it (the endpoints above assume events)?
2. Time zone: send it with each event, or store it on the profile?
3. Content delivery: are Cambridge-aligned papers served by this API or by a separate content service with signed audio URLs?
4. Realtime session: does the browser connect straight to the model provider with the short-lived secret, or through a server relay?
5. Rate limits per learner for the tutor, intake and marking endpoints, and their `Retry-After` behaviour.
6. How does a failed marking job surface (poll `GET /assessments/...` or a push)? The frontend currently awaits one response and shows a retry on failure.
