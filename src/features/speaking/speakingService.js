// Mock of the server-side examiner tool `record_turn_evidence` (design/voice-examiner.md).
// The browser only builds the record from what it measured; it never scores. The backend replaces this with the real tool.
const wordCount = (text) => text.trim().split(/\s+/).filter(Boolean).length

export function buildTurnEvidence({ assessmentId, turn, text, seconds }) {
  const words = wordCount(text)
  return {
    assessment_id: assessmentId,
    part: turn.part,
    question: turn.question,
    transcript_excerpt: text.trim(),
    duration_seconds: seconds,
    observations: [`Spoke for ${seconds} of ${turn.speakSeconds} seconds.`, `${words} ${words === 1 ? 'word' : 'words'} in the transcript.`],
    words,
  }
}
