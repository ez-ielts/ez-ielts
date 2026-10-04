# First page: exam choice and sign-up

Route: `/` (focus mode, header label "Create account", no exit). Stage strip: Create account · Placement · Questionnaire · Tutor interview · Your course. Replaces the old four-step journey (account, AI assessment, diagnosis, plan), which the interview → course flow and the Today screen supersede.

## Layout

Two wrapping columns inside the standard content width (`px-[clamp(16px,4vw,40px)]`).

**Left (flex 1 1 320px)**
- Kicker "Start here" (accent), H1 "From unsure to exam-ready.", lede "We start with where you are, then build the shortest honest path to your target band."
- Exam choice: "Which exam are you preparing for?" with two `ChoiceButton`s (IELTS Academic / TOEFL iBT, `aria-pressed`). Sets `session.exam`; every later screen follows it.
- Ruled list of three honest facts: the estimate is not a certified result and a full mock confirms it; practice is for the chosen exam only; the plan adjusts when work is completed or missed (always conditional, never a guaranteed score).

**Right (flex 1 1 360px)**
- Signed out: Clerk sign-up themed with design tokens (accent primary, 0 radius, Archivo, ink 2px border). Below it a ghost button switches between "Already have an account? Sign in" and "New here? Create an account". Email, phone, Google and Apple are enabled in the Clerk dashboard.
- Signed in: bordered panel "Signed in as {email}", primary "Continue to placement" (→ `/placement`, 52px) and a secondary link "Go to Today".
- Auth loading (Clerk script not ready): a "Loading…" status line.
- No `VITE_CLERK_PUBLISHABLE_KEY` (development only): `AlertBand` "Sign-in is not configured", with a Continue link to `/interview`.

## Clerk theme

`src/features/auth/authAppearance.js` maps the tokens onto Clerk's `variables` and per-element classes. Clerk's styles are put in a `clerk` CSS layer (`@layer theme, base, clerk, components, utilities` in `index.css`, `cssLayerName: 'clerk'`), so Tailwind utilities override them without `!important`.

- Card: 2px ink border, ground fill, no radius, no shadow.
- Title 17px / 800; subtitle 12.5px neutral-800.
- Social and alternative-method buttons: 44px, 2px ink border, ground fill, bold label.
- Inputs: surface fill, hairline ink/40 border, accent border on focus, 44px; OTP boxes 2px ink.
- Primary button: accent fill, ground text, 48px, 800 weight.
- Links: accent-700, bold. Clerk's own "have an account?" footer link is hidden; our toggle below the card switches sign-up and sign-in.
- "Secured by Clerk" branding stays (it cannot be removed on the free plan).

## Behaviour

- Google/Apple return to `/` (hash routing) or `/sso-callback`, then the signed-in panel appears.
- Study and focus routes redirect signed-out visitors back here (`RequireAuth`).
- No sign-up state is stored in Redux; Clerk owns identity. Only `session.exam` is shared state.

## Acceptance

- Works at 375px with no horizontal scroll; choices and actions are at least 44px.
- No hard-coded colours; tokens only.
