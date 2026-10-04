// Today screen data per exam. Placeholder content until the plan, homework and feedback slices supply it.
// marked[].to is the route the card opens.
export const todayContent = {
  ielts: {
    dayLabel: 'Monday · day 1 of week 3',
    title: 'Task 1 data description',
    lede: 'Three parts, 45 minutes. Your writing band moved to 5.5 last week. This week is built to take it to 6.0.',
    steps: [
      { title: 'Warm-up drill · trend verbs and articles', sub: '8 items, 3 of them repeats you got wrong last week', minutes: '5 min' },
      { title: 'Lesson · describe the shape before the numbers', sub: 'Band 5 and band 7 answers to the same chart, compared line by line', minutes: '15 min' },
      { title: 'Guided practice · write the overview sentence', sub: 'Bar chart, three series. Checked as you type, then marked.', minutes: '20 min' },
    ],
    marked: [
      { kicker: 'Writing task 2', title: 'Ageing populations', body: 'Band 5.5. Two body paragraphs open without a claim; nine article errors.', cta: 'Open marked essay', to: '/homework/ageing-populations' },
      { kicker: 'Speaking part 2', title: 'A skill you learned', body: 'Band 5.0. Ran 72 seconds with four pauses over three seconds.', cta: 'Record take 2', to: '/speaking/part-2' },
      { kicker: 'Reading', title: 'Matching headings', body: '8 of 10. Both misses matched a repeated keyword instead of the unique one.', cta: 'Review errors', to: '/homework' },
    ],
    scoreLabel: 'Estimated band',
    score: '5.5',
    target: 'target 6.0',
    mockIn: 'mock exam in 19 days',
    trend: [44, 50, 58, 66, 74, 88],
    skills: [
      { name: 'Listening', score: '6.0' },
      { name: 'Reading', score: '6.0' },
      { name: 'Writing', score: '5.5', weak: true },
      { name: 'Speaking', score: '5.5', weak: true },
    ],
    drillsDue: 9,
    speakingRoute: '/speaking/part-2',
    drills: ['articles', 'uncountable nouns', 'trend collocations', 'paraphrasing', 'directions vocabulary'],
    tutorNote: '"Research" is uncountable: research shows, never "the researches". That error has cost you marks in two essays.',
  },
  toefl: {
    dayLabel: 'Monday · day 1 of week 3',
    title: 'Write an Email',
    lede: 'Three parts, 45 minutes. Writing moved to 3.5 last week. This week targets 4.0 by covering every point in the task.',
    steps: [
      { title: 'Warm-up drill · Build a Sentence', sub: '10 items, 4 repeats from last week', minutes: '5 min' },
      { title: 'Lesson · cover all three bullet points', sub: 'A 3.0 and a 5.0 email to the same prompt, compared', minutes: '15 min' },
      { title: 'Guided practice · email to a professor', sub: 'Request an extension. Checked as you type, then marked.', minutes: '20 min' },
    ],
    marked: [
      { kicker: 'Academic Discussion', title: 'Remote lectures', body: 'Score 3.5. Position stated but only one supporting reason; six verb-form errors.', cta: 'Open marked response', to: '/homework/remote-lectures' },
      { kicker: 'Take an Interview', title: 'Study habits', body: 'Score 3.0. Two answers ended before 30 seconds.', cta: 'Record take 2', to: '/speaking/interview' },
      { kicker: 'Complete the Words', title: 'Passage on glaciers', body: '14 of 20. Misses cluster on word endings: -tion, -ment.', cta: 'Review errors', to: '/homework' },
    ],
    scoreLabel: 'Estimated score · 1–6',
    score: '3.5',
    target: 'target 4.0',
    mockIn: 'mock exam in 19 days',
    trend: [40, 46, 54, 62, 72, 86],
    skills: [
      { name: 'Listening', score: '4.0' },
      { name: 'Reading', score: '4.0' },
      { name: 'Writing', score: '3.5', weak: true },
      { name: 'Speaking', score: '3.5', weak: true },
    ],
    drillsDue: 9,
    speakingRoute: '/speaking/interview',
    drills: ['verb forms', 'word endings', 'email register', 'linking reasons', 'academic vocabulary'],
    tutorNote: 'In your emails you open with "I am writing you". Use "I am writing to you" or just "I\'m writing about…".',
  },
}

// The first `measuredWeeks` trend bars are measured; the rest are forecast.
export const measuredWeeks = 4
