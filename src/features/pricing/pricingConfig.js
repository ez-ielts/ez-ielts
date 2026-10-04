import { examLabels } from '../session/sessionSlice'

// Mock pricing until the billing API exists. Band ranges are per exam scale; prices are USD for the 8-week course.
export const pricingTiers = {
  ielts: [
    { id: 'foundation', name: 'Foundation', range: '4.0 → 5.0', price: 99 },
    { id: 'bridge', name: 'Bridge', range: '4.5 → 5.5', price: 129 },
    { id: 'core', name: 'Core', range: '5.5 → 6.5', price: 149 },
    { id: 'advanced', name: 'Advanced', range: '6.5 → 7.5', price: 179 },
    { id: 'mastery', name: 'Mastery', range: '7.0 → 8.0', price: 199 },
  ],
  toefl: [
    { id: 'foundation', name: 'Foundation', range: '2.0 → 3.0', price: 99 },
    { id: 'bridge', name: 'Bridge', range: '2.5 → 3.5', price: 129 },
    { id: 'core', name: 'Core', range: '3.5 → 4.5', price: 149 },
    { id: 'advanced', name: 'Advanced', range: '4.5 → 5.5', price: 179 },
    { id: 'mastery', name: 'Mastery', range: '5.0 → 6.0', price: 199 },
  ],
}

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
