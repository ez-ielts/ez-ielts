# ezIELTS Design Workspace

This directory is the source of truth for product design before implementation.

## Design-first workflow

1. Create or update a design note for the user outcome and workflow.
2. Define states, empty/loading/error/success behavior, responsive behavior, and acceptance criteria.
3. Review the design with the linked GitHub issue.
4. Implement reusable components from the approved design.
5. Update the design note when implementation changes the behavior.

## Current documents

- [Product flow](product-flow.md): registration, diagnostic interview, skill analysis, plan creation, mock exams, and course adjustment.
- [Design system](design-system.md): visual language, responsive rules, accessibility, and component conventions.
- [First page: exam choice and sign-up](sign-up.md): `/`, exam choice and Clerk registration.
- [Plan](plan.md): `/plan`, the 8-week course, status, schedule and adaptation rules.
- [Homework and marked work](homework.md): `/homework`, `/homework/:id`, grouped list and annotated marked essay.
- [Tutor](tutor.md): `/tutor`, exam-scoped tutor chat with course context.
- [Pricing and Settings](pricing-settings.md): `/pricing`, `/settings`, course levels, account, exam, schedule and reminders.
- [Checkpoint mock exam](mock-exam.md): `/mock/:id`, four timed sections, band calculation and plan adjustments.
- [Progress](progress.md): sessions, weeks, late work, course completion and the next course.
- [Placement](placement.md): `/placement`, short four-skill test and the confirmed start estimate.
- [Backend contract](backend-contract.md): draft of every endpoint, shape and rule the frontend expects from the backend.
- [Interview → course](interview-course.md): post-placement questionnaire, tutor interview and generated 8-week course.
- [App shell and Today](today.md): study-tab navigation (desktop tabs, mobile bottom bar) and the daily session screen.
- [Voice examiner](voice-examiner.md): agent instructions, tool sequence, evidence policy, and finalization rules.

Design files should describe behavior and decisions, not only screenshots or visual decoration.
