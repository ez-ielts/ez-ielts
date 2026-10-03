// Course-intake data per exam. `start` is the placement estimate until the placement slice supplies a real one.
export const intakeExams = {
  ielts: {
    label: 'IELTS Academic',
    start: '5.5',
    targets: ['6.0', '6.5', '7.0'],
    course: 'Core 5.5 → 6.5',
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
    label: 'TOEFL iBT',
    start: '3.5',
    targets: ['4.0', '4.5', '5.0'],
    course: 'Core 3.5 → 4.5',
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

export const intakeStages = ['Questionnaire', 'Tutor interview', 'Your course']

export const skills = ['Listening', 'Reading', 'Writing', 'Speaking']

// `options` of null means the list depends on the exam (targets).
export const intakeQuestions = [
  { key: 'target', label: 'Target score', options: null },
  { key: 'date', label: 'When is your exam?', options: ['Not booked', 'In 8–10 weeks', 'In 4–8 weeks', 'Under 4 weeks'], hint: 'Under 4 weeks compresses the course and lowers the guaranteed target.' },
  { key: 'mins', label: 'Minutes per day', options: ['30 min', '45 min', '60 min', '90 min'], hint: '45 minutes is the course default.' },
  { key: 'days', label: 'Days per week', options: ['3 days', '5 days', '6 days'] },
  { key: 'weak', label: 'Which skill worries you most?', options: skills, hint: 'This weights the drill queue, not the schedule.' },
]

export const targetHint = (target) => `${target} is the default: one full step from your estimate, reachable in 8 weeks.`

export const defaultTarget = (exam) => intakeExams[exam].targets[1]

export function studyHours({ mins, days }) {
  return Math.round(parseInt(mins, 10) * parseInt(days, 10) * 8 / 60)
}
