import { examLabels } from '../session/sessionSlice'

// Course-intake data per exam. `start` is the initial placement estimate; `intake.start` holds the live value.
export const intakeExams = {
  ielts: {
    label: examLabels.ielts,
    start: '5.5',
    weeks: [
      ['Diagnose and rebuild', 'Task 2 structure, articles'],
      ['Task 1 data language', 'Trend verbs, overview sentence'],
      ['Reading speed', 'Skimming, matching headings'],
      ['Checkpoint mock 1', 'Full test, timed'],
      ['Listening sections 3–4', 'Distractors, map labelling'],
      ['Speaking Part 2–3', 'Long turn, extending answers'],
      ['Writing coherence', 'Paragraph claims, cohesion'],
      ['Final mock and review', 'Full test, re-plan'],
    ],
  },
  toefl: {
    label: examLabels.toefl,
    start: '3.5',
    weeks: [
      ['Diagnose and rebuild', 'Build a Sentence, grammar'],
      ['Write an Email', 'Register, task coverage'],
      ['Reading in daily life', 'Complete the Words'],
      ['Checkpoint mock 1', 'Full test, timed'],
      ['Academic talks', 'Note-taking, inference'],
      ['Take an Interview', 'Extended answers, pace'],
      ['Academic Discussion', 'Position, support'],
      ['Final mock and review', 'Full test, re-plan'],
    ],
  },
}

export const checkpointWeeks = [4, 8]

export const courseWeeks = (exam) => intakeExams[exam].weeks.map(([title, focus], index) => ({ title, focus, checkpoint: checkpointWeeks.includes(index + 1) }))

export const intakeStages = ['Questionnaire', 'Tutor interview', 'Your course']

// Every onboarding screen shows the same strip; each marks its own step as current.
export const onboardingStages = ['Create account', 'Placement', ...intakeStages]

export const skills = ['Listening', 'Reading', 'Writing', 'Speaking']

// `options` of null means the list depends on the exam (goals).
export const intakeQuestions = [
  { key: 'goal', label: 'Your goal score', options: null },
  { key: 'date', label: 'When is your exam?', options: ['Not booked', 'In 8–10 weeks', 'In 4–8 weeks', 'Under 4 weeks'], hint: 'Under 4 weeks compresses the course and lowers the guaranteed target.' },
  { key: 'mins', label: 'Minutes per day', options: ['30 min', '45 min', '60 min', '90 min'], hint: '45 minutes is the course default.' },
  { key: 'days', label: 'Days per week', options: ['3 days', '5 days', '6 days'] },
  { key: 'weak', label: 'Which skill worries you most?', options: skills, hint: 'This weights the drill queue, not the schedule.' },
]

// A course takes the learner up exactly one half-band. A bigger goal is a chain of courses (5.5 → 6.0 → 6.5 → 7.0).
const BAND_STEP = 0.5
const formatBand = (value) => value.toFixed(1)

export const courseTarget = (start) => formatBand(Number(start) + BAND_STEP)

export const goalOptions = (start) => [1, 2, 3].map((steps) => formatBand(Number(start) + steps * BAND_STEP))

export const goalHint = (start, target) => `Each course takes you up one half-band, so a bigger goal is reached in stages: ${start} → ${target} first. Your next course starts from your result.`

// The chain of courses from the start estimate to the goal: [{ from, to }].
export function courseStages(start, goal) {
  const stages = []
  for (let from = Number(start); from < Number(goal); from += BAND_STEP) stages.push({ from: formatBand(from), to: formatBand(from + BAND_STEP) })
  return stages
}

export function studyHours({ mins, days }) {
  return Math.round(parseInt(mins, 10) * parseInt(days, 10) * 8 / 60)
}
