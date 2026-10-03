import { DONE_MARKER, intakeInstructions } from './intakePrompt'
import { intakeExams } from './intakeConfig'

// Backend contract: POST {VITE_API_BASE_URL}/intake/messages
//   body:     { exam, profile, instructions, messages: [{ role: 'user' | 'assistant', content }] }
//   response: { text }  (the model reply; it ends with [DONE] when the interview is complete)
// The model API key lives on the backend only. Without VITE_API_BASE_URL a scripted local tutor runs so the flow works in development.
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

const OPENER = { role: 'user', content: 'Hi, I am ready.' }

export class IntakeServiceError extends Error {
  constructor(kind, message) {
    super(message)
    this.kind = kind // 'rate_limit' | 'network'
  }
}

export async function requestIntakeReply({ exam, profile, messages }) {
  const payload = messages.length ? messages : [OPENER]
  const text = apiBaseUrl ? await fetchReply({ exam, profile, messages: payload }) : await localReply({ exam, profile, messages })
  return { text: text.replace(DONE_MARKER, '').trim(), done: text.includes(DONE_MARKER) }
}

async function fetchReply({ exam, profile, messages }) {
  let response
  try {
    response = await fetch(`${apiBaseUrl}/intake/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ exam, profile, instructions: intakeInstructions(exam, profile), messages }),
    })
  } catch {
    throw new IntakeServiceError('network', 'Network request failed')
  }
  if (response.status === 429) throw new IntakeServiceError('rate_limit', 'Rate limited')
  if (!response.ok) throw new IntakeServiceError('network', `Intake request failed with ${response.status}`)
  const data = await response.json()
  if (typeof data?.text !== 'string') throw new IntakeServiceError('network', 'Malformed intake response')
  return data.text
}

// Development stand-in for the backend: same turn shape, fixed questions.
async function localReply({ exam, profile, messages }) {
  await new Promise((resolve) => setTimeout(resolve, 600))
  const questions = [
    `How have you prepared for ${intakeExams[exam].label} so far, and what has worked best?`,
    'Have you sat the exam before? If so, which part felt hardest on the day?',
    'What usually makes you stop studying for a few days?',
  ]
  const replies = messages.filter((message) => message.role === 'user').length
  if (replies < questions.length) return questions[replies]
  return `Thank you. I'll keep each session to ${profile.mins} with ${profile.weak.toLowerCase()} drills first, and I'll schedule your hardest task early in the week so a busy day doesn't break the streak. ${DONE_MARKER}`
}
