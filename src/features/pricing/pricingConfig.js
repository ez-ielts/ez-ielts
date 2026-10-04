import { courseTarget } from '../intake/intakeConfig'
import { examLabels } from '../session/sessionSlice'

// Mock pricing until the billing API exists. Each course is one half-band step on the exam's scale; prices are USD for the 8-week course.
export const pricingTiers = {
  ielts: [
    { id: 'foundation', name: 'Foundation', range: '4.5 → 5.0', price: 99 },
    { id: 'bridge', name: 'Bridge', range: '5.0 → 5.5', price: 129 },
    { id: 'core', name: 'Core', range: '5.5 → 6.0', price: 149 },
    { id: 'advanced', name: 'Advanced', range: '6.0 → 6.5', price: 179 },
    { id: 'mastery', name: 'Mastery', range: '6.5 → 7.0', price: 199 },
  ],
  toefl: [
    { id: 'foundation', name: 'Foundation', range: '2.5 → 3.0', price: 99 },
    { id: 'bridge', name: 'Bridge', range: '3.0 → 3.5', price: 129 },
    { id: 'core', name: 'Core', range: '3.5 → 4.0', price: 149 },
    { id: 'advanced', name: 'Advanced', range: '4.0 → 4.5', price: 179 },
    { id: 'mastery', name: 'Mastery', range: '4.5 → 5.0', price: 199 },
  ],
}

// The pricing level whose half-band step begins at the learner's start estimate, if there is one.
export const courseTier = (exam, start) => pricingTiers[exam].find((tier) => tier.range.startsWith(`${start} `)) ?? null

// The starts the course levels cover (the start of each half-band step). Placement estimates are limited to these.
export const supportedStarts = (exam) => pricingTiers[exam].map((tier) => tier.range.split(' ')[0])

// The supported start nearest to a band (ties go up).
export const nearestStart = (exam, band) => supportedStarts(exam).reduce((best, start) => (Math.abs(Number(start) - band) < Math.abs(Number(best) - band) || (Math.abs(Number(start) - band) === Math.abs(Number(best) - band) && Number(start) > Number(best)) ? start : best))

export const courseName = (exam, start) => `${courseTier(exam, start)?.name ?? 'Course'} ${start} → ${courseTarget(start)}`

export const includedInEveryCourse = [
  { label: 'Daily session', value: 'Lesson, practice, drill' },
  { label: 'Checkpoints', value: 'Two full timed mocks' },
  { label: 'Marking', value: 'Writing and speaking feedback' },
  { label: 'Tutor', value: 'Chat scoped to your exam' },
  { label: 'Reminders', value: 'Study tasks and exam date' },
]

export const planLabel = (tier, exam) => {
  if (!tier) return 'None'
  if (tier === 'trial') return 'Free trial'
  return `${pricingTiers[exam].find((entry) => entry.id === tier)?.name ?? tier} course (${examLabels[exam]})`
}
