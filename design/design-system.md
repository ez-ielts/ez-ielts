# Design System

## Direction

Quiet, editorial, and evidence-led. Use warm paper backgrounds, green progress signals, yellow attention surfaces, and serif display type for confidence without making the product feel like a marketing page.

## Typography

- Display and score emphasis: Fraunces.
- Interface and body copy: DM Sans.
- Use short headings and clear labels. Do not use display type for dense instructions.

## Layout

- Desktop: two-column journey layout with a persistent step rail.
- Mobile: single-column flow, compact horizontal step indicator, full-width primary actions.
- Use a minimum 44px height for important touch actions.
- Keep form controls and status messages inside the reading order.

## Components

Prefer reusable components such as `ProductHeader`, `JourneySidebar`, `StepHeader`, `PrimaryButton`, `SkillCard`, `MockExamCard`, `NotificationPreference`, and `ErrorState` as the product grows. Components should accept data and callbacks rather than owning domain rules.

## Accessibility

- Use semantic headings, labels, buttons, and form controls.
- Never rely on color alone for score or status.
- Provide visible focus states and meaningful accessible names for icon-only actions.
- Support keyboard navigation and reduced-motion preferences.
