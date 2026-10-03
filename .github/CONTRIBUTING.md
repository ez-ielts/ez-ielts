# Contributing to ezIELTS

## Delivery workflow

### Pre-v1 (now, until the first working release is approved)

`develop` is not used. `main` is the integration branch, and every merge to it deploys to GitHub Pages.

1. Create a GitHub issue with the user outcome, acceptance criteria, and test notes.
2. Create a branch from `main`: `feature/<issue-number>-short-name` or `fix/<issue-number>-short-name`.
3. Implement the smallest reusable component or feature slice, and keep the branch focused.
4. Run `npm run lint` and `npm run build` before opening a pull request.
5. Open a pull request into `main`, link the issue, and request review.

### After the first release

Switch to Gitflow: branch from `develop`, open pull requests into `develop`, and release from `develop` to `main` through a release pull request. Recreate `develop` from `main` at that point.

## Project conventions

- Keep shared application state in Redux Toolkit slices under `src/features`.
- Keep reusable UI in `src/components`; keep workflow-specific data and logic close to its feature.
- Prefer Tailwind utility classes and shared design tokens over page-specific global CSS.
- Make every primary workflow usable at mobile widths.
- Add or update focused tests when behavior changes.
