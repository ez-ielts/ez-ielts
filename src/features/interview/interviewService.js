// Replace this adapter with the authenticated interview API when the backend is available.
// The UI only depends on this contract, so provider changes stay out of components.
export async function analyzeInterview({ transcript }) {
  if (!transcript.length) throw new Error('An interview transcript is required.')
  return { status: 'ready', transcript, estimatedSpeakingBand: null }
}
