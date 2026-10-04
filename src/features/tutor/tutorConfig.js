import { examLabels } from '../session/sessionSlice'

export const tutorIntro = (exam) => `I'm your tutor for ${examLabels[exam]}. Ask me about your plan, your marked work or any task type. I only answer questions about preparing for your exam.`

export const tutorSuggestions = {
  ielts: ['What should I work on this week?', 'Why did I lose marks on my last essay?', 'How do I stop making article errors?'],
  toefl: ['What should I work on this week?', 'Why did I lose marks on my last response?', 'How do I fix verb-form errors?'],
}

export const tutorErrorCopy = {
  network: 'The tutor could not reply. Check your connection and try again.',
  rate_limit: 'The tutor is getting a lot of requests right now. Wait a minute and try again.',
  unauthorized: 'Your session has expired. Sign in again to keep talking to the tutor.',
}
