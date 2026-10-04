import { mockContent, skillBandCap } from './mockConfig'

// Band calculation for the exam formats (design/mock-exam.md). Pure functions, so they can be checked directly.
// Production replaces `scoreMock` with POST {VITE_API_BASE_URL}/mock/:id/submit; Writing and Speaking marking comes from the AI marker.
const ieltsListening = [[39, 9], [37, 8.5], [35, 8], [32, 7.5], [30, 7], [26, 6.5], [23, 6], [18, 5.5], [16, 5], [13, 4.5], [10, 4], [8, 3.5], [6, 3], [4, 2.5], [0, 2]]
const ieltsReading = [[39, 9], [37, 8.5], [35, 8], [33, 7.5], [30, 7], [27, 6.5], [23, 6], [19, 5.5], [15, 5], [13, 4.5], [10, 4], [8, 3.5], [6, 3], [4, 2.5], [0, 2]]

export const roundHalf = (value) => Math.round(value * 2) / 2

export function overallBand(bands) {
  return roundHalf(bands.reduce((sum, band) => sum + band, 0) / bands.length)
}

// Raw score → band for Listening or Reading. The raw score is scaled to 40, the length of the full paper.
export function bandFromRaw(exam, skill, raw, total) {
  if (exam === 'toefl') return roundHalf(1 + (5 * raw) / total)
  const scaled = Math.round((raw / total) * 40)
  const table = skill === 'listening' ? ieltsListening : ieltsReading
  return table.find(([min]) => scaled >= min)[1]
}

// Placeholder marking from length only, until the AI marker is connected. Bands step up with word count.
const lengthBands = {
  ielts: { writing: [[160, 6.5], [120, 6], [90, 5.5], [60, 5], [30, 4.5], [0, 4]], speaking: [[110, 6.5], [70, 6], [40, 5.5], [20, 5], [10, 4.5], [0, 4]] },
  toefl: { writing: [[100, 4.5], [75, 4], [55, 3.5], [35, 3], [20, 2.5], [0, 2]], speaking: [[70, 4.5], [50, 4], [35, 3.5], [20, 3], [10, 2.5], [0, 2]] },
}

export const wordCount = (text) => text.trim().split(/\s+/).filter(Boolean).length

// `scale` stretches the thresholds for shorter tasks (a task a third as long expects a third of the words).
export function bandFromLength(exam, skill, words, scale = 1) {
  return lengthBands[exam][skill].find(([min]) => words >= min * scale)[1]
}

const correctCount = (questions, chosen) => questions.filter((question) => chosen[question.id] === question.options[question.answer]).length

// `content` defaults to the checkpoint mock; the placement passes its own shorter content (and a lower `cap`).
export async function scoreMock({ exam, answers, content = mockContent[exam], cap = skillBandCap[exam] }) {
  const reference = mockContent[exam]
  const writingScale = content.writing.targetWords / reference.writing.targetWords
  const speakingScale = content.speaking.speakSeconds / reference.speaking.speakSeconds
  const listeningRaw = correctCount(content.listening.questions, answers.listening)
  const readingRaw = correctCount(content.reading.questions, answers.reading)
  const writingWords = wordCount(answers.writing)
  const speakingWords = wordCount(answers.speaking.text)

  const skills = [
    { key: 'listening', name: 'Listening', band: Math.min(cap, bandFromRaw(exam, 'listening', listeningRaw, content.listening.questions.length)), evidence: `${listeningRaw} of ${content.listening.questions.length} correct.` },
    { key: 'reading', name: 'Reading', band: Math.min(cap, bandFromRaw(exam, 'reading', readingRaw, content.reading.questions.length)), evidence: `${readingRaw} of ${content.reading.questions.length} correct.` },
    { key: 'writing', name: 'Writing', band: bandFromLength(exam, 'writing', writingWords, writingScale), evidence: `${writingWords} words (this short version asks for ${content.writing.targetWords}). Placeholder marking from length only.` },
    { key: 'speaking', name: 'Speaking', band: bandFromLength(exam, 'speaking', speakingWords, speakingScale), evidence: `${speakingWords} words in ${answers.speaking.seconds} seconds. Placeholder marking from length only.` },
  ]
  return { overall: overallBand(skills.map((skill) => skill.band)), skills, cap }
}
