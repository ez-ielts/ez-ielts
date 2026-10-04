import { ApiError, apiEnabled, apiRequest } from '../../lib/apiClient'
import { tutorInstructions } from './tutorPrompt'

// Backend contract: POST {VITE_API_BASE_URL}/tutor/messages
//   body:     { exam, context, instructions, messages: [{ role: 'user' | 'assistant', content }] }
//   response: { text }
// The model API key lives on the backend only. The request is authenticated by the shared API client. Without VITE_API_BASE_URL a scripted local tutor runs so the screen works in development.
export class TutorServiceError extends Error {
  constructor(kind, message) {
    super(message)
    this.kind = kind // 'rate_limit' | 'unauthorized' | 'network'
  }
}

export async function requestTutorReply({ exam, context, messages }) {
  const text = apiEnabled ? await fetchReply({ exam, context, messages }) : await localReply({ context })
  return { text: text.trim() }
}

async function fetchReply({ exam, context, messages }) {
  let data
  try {
    data = await apiRequest('/tutor/messages', { method: 'POST', body: { exam, context, instructions: tutorInstructions(exam, context), messages } })
  } catch (error) {
    throw new TutorServiceError(error instanceof ApiError ? error.kind : 'network', error.message)
  }
  if (typeof data?.text !== 'string') throw new TutorServiceError('network', 'Malformed tutor response')
  return data.text
}

// Development stand-in for the backend: same turn shape, one fixed reply built from the learner's context.
async function localReply({ context }) {
  await new Promise((resolve) => setTimeout(resolve, 600))
  const overdue = context.overdue ? ` Finish "${context.overdue}" first: late work counts against your guarantee.` : ''
  return `This week, put ${context.focus.join(' and ')} first: they are your lowest estimates.${overdue} (Development reply: the live tutor answers your exact question.)`
}
