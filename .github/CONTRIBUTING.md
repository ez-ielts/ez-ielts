# Contributing to ezIELTS

## Delivery workflow

1. Create a GitHub issue with the user outcome, acceptance criteria, and test notes.
2. Create a branch from `develop`: `feature/<issue-number>-short-name` or `fix/<issue-number>-short-name`.
3. Assign the issue, implement the smallest reusable component or feature slice, and keep the branch focused.
4. Run `npm run lint` and `npm run build` before opening a pull request.
5. Open a pull request into `develop`, link the issue, and request review.
6. Merge reviewed work into `develop`. Release work moves from `develop` to `main` through a release pull request.

## Project conventions

- Keep shared application state in Redux Toolkit slices under `src/features`.
- Keep reusable UI in `src/components`; keep workflow-specific data and logic close to its feature.
- Prefer Tailwind utility classes and shared design tokens over page-specific global CSS.
- Make every primary workflow usable at mobile widths.
- Add or update focused tests when behavior changes.
