import { examinerInstructions } from './examinerPrompt'
import { examinerTools, validateAssessmentForFinalization } from './examinerTools'

// Replace this adapter with the authenticated Realtime API when the backend is available.
// The UI only depends on this contract, so provider changes stay out of components.
export function getExaminerSessionConfig() {
  return { instructions: examinerInstructions, tools: examinerTools }
}

export async function analyzeInterview({ transcript }) {
  if (!transcript.length) throw new Error('An interview transcript is required.')
  return { status: 'ready', transcript, estimatedSpeakingBand: null }
}

export { validateAssessmentForFinalization }
