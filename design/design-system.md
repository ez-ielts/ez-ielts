# Design System: Modernist

## Direction

Flat, architectural and evidence-led. Archivo for all type, a light ground with near-black ink, one red accent, zero corner radius and strong 2px rules. Alignment and dividers organise the page; nothing floats and nothing is decorated. Labels are flush left, including inside wide buttons.

## Tokens

Defined as a Tailwind v4 `@theme` in `src/index.css`. Use the utilities, never raw hex values.

| Role | Token | Utility examples |
| --- | --- | --- |
| Ground (page) | `--color-ground` #f3f2f2 | `bg-ground`, `text-ground` |
| Surface (inputs, prompt boxes) | `--color-surface` #eae9e9 | `bg-surface` |
| Ink (text, rules) | `--color-ink` #201e1d | `text-ink`, `border-ink`, `bg-ink` |
| Accent | `--color-accent` #ec3013 + ramp `accent-100…900` | `bg-accent`, `border-accent`, `text-accent-700` |
| Neutral ramp | `neutral-100…900` | `text-neutral-800` for secondary text |
| Divider (hairline) | ink at 40% | `border-ink/40` |

- Accent text under 18px uses `accent-700` or deeper (4.5:1 contrast floor). The base accent is for fills, rules and large type.
- Tinted fills use step 100; text on them uses 800–900.
- Spacing uses Tailwind's 4px scale: 1, 2, 3, 4, 6, 8 (4–32px).
- No radius anywhere. No shadows except `shadow-lg` on dialogs.
- Focus: `outline: 2px solid accent; outline-offset: 2px` (global, in `@layer base`).
- Motion: `animate-pulse-soft` (opacity 1 → .35 → 1, 1.2s) for typing and recording; always pair with `motion-reduce:animate-none`.

## Typography

- Archivo for everything. Headings weight 800. Body 15px / 1.55.
- Kicker: 11px / 700 / tracking .15em (or .12em in dense grids) / uppercase / neutral-800 or accent-700 (`Kicker`).
- Page H1: `clamp(28–30px, 4–4.2vw, 44–46px)` / 800 / leading 1.02 / tracking −.025em. Result H1s may go to `clamp(32px, 5vw, 60px)`.
- Section H2: 17px / 800 / −.01em.
- Score numerals: 66–80px / 800 / leading .85–.9 / −.04em; tabular numbers on timers.
- Row title 15px / 600–700; row meta 12.5px neutral-800.

## Layout

- Content max-width 1240px, centred, side padding `clamp(16px, 4vw, 40px)`.
- Everything wraps: flex rows with `flex-[grow_shrink_basis]` columns, or `repeat(auto-fit, minmax(…))` grids. No fixed widths on text boxes.
- Navigation breakpoint 760px (top tabs above, bottom tab bar below).
- Focus mode (sign-up, placement, interview, mock, speaking) uses `FocusHeader`: brand, uppercase context label and an optional "Save and exit".
- Touch targets are at least 44px; primary actions 48px.

## Components

Reusable primitives live in `src/components/ui`:

- `Button`: `variant` primary / secondary / ghost, `size` sm (40) / md (44) / lg (48) / xl (52), `arrow` adds a trailing → and spreads the label to the edges.
- `ChoiceButton`: answers, filters and questionnaire options. 2px ink border; selected = ink fill and ground text; `aria-pressed`.
- `Kicker`: uppercase label.
- `AlertBand`: 2px accent border, accent-100 fill, `role="alert"`, optional action (e.g. retry).
- `StageStrip`: stage progress (done = ink, current = accent, todo = neutral-300).
- `TextInput`: surface-filled input with a hairline border and accent focus.

Recurring patterns:

- **Ruled grid**: container `border-2 border-ink bg-ink gap-[2px]`, cells on `bg-ground`. Used for stat and fact grids.
- **Ruled list**: same technique for rows; the current row gets a 4px left accent rule.
- **Checkpoint rule**: list items with a 4px top rule, accent for checkpoint items, ink otherwise. Always paired with a text label.

## Accessibility

- Use semantic headings, labels, buttons and form controls. `aria-pressed` on choice buttons, `role="radio"`/`aria-checked` on radio cards, `role="switch"` on toggles, `role="timer"` on countdowns, `role="alert"` on errors, `role="log"` for chat threads.
- Never rely on colour alone for score or status (✓/✗, text labels).
- Visible focus on every interactive element; meaningful accessible names for icon-only actions.
- Support keyboard navigation and reduced-motion preferences.
