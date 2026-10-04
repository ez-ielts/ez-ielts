// Placeholder homework per exam until the API exists. Item ids match the Today marked-work cards.
// status: 'overdue' | 'todo' | 'marked'. `to` overrides the default `/homework/:id` target.
// feedback (marked writing only): { prompt, criteria, paragraphs, notes, next }
//   paragraphs: [[{ text, note? }]] where note is the number of an entry in notes.
export const homeworkContent = {
  ielts: [
    { id: 'task1-chart', status: 'overdue', skill: 'Writing', task: 'Task 1', title: 'Chart summary', detail: '150 words, bar chart with three series', due: 'Friday', lateNote: 'A second late submission voids the band guarantee.' },
    { id: 'listening-s3', status: 'todo', skill: 'Listening', task: 'Section 3', title: 'Multiple choice drill', detail: '10 questions, 12 minutes', due: 'Wednesday' },
    { id: 'speaking-part2', status: 'todo', skill: 'Speaking', task: 'Part 2', title: 'A skill you learned, take 2', detail: 'Aim for the full two minutes', due: 'Thursday', to: '/speaking/part-2' },
    {
      id: 'ageing-populations', status: 'marked', skill: 'Writing', task: 'Task 2', title: 'Ageing populations', detail: 'Opinion essay, 250 words', result: 'Band 5.5',
      feedback: {
        prompt: 'In many countries the proportion of older people is rising. Is this a positive or a negative development?',
        score: '5.5',
        criteria: [
          { name: 'Task Response', band: '5.5', comment: 'Both views appear, but two body paragraphs open without a claim.' },
          { name: 'Coherence and Cohesion', band: '5.5', comment: 'Clear paragraphs; linking words are repeated and mechanical.' },
          { name: 'Lexical Resource', band: '5.5', comment: 'Adequate range, but "old people" repeats six times.' },
          { name: 'Grammatical Range and Accuracy', band: '5.0', comment: 'Nine article errors and one agreement slip.' },
        ],
        paragraphs: [
          [{ text: 'Nowadays ' }, { text: 'the population in many countries are', note: 1 }, { text: ' getting older. In this essay I will discuss whether this is positive or negative.' }],
          [{ text: 'Firstly, ' }, { text: 'old people have a lot of experience', note: 2 }, { text: ' and ' }, { text: 'they can give advice to young people', note: 4 }, { text: '. Moreover, ' }, { text: 'old people', note: 4 }, { text: ' often look after grandchildren, so parents can work.' }],
          [{ text: 'However, ' }, { text: 'government must spend more money on health care', note: 3 }, { text: '. Moreover, there are fewer workers, so taxes become higher for ' }, { text: 'old people', note: 4 }, { text: ' and young people.' }],
          [{ text: 'In conclusion, I think ageing populations have both advantages and disadvantages, but ' }, { text: 'it is more negative', note: 2 }, { text: '.' }],
        ],
        notes: [
          { criterion: 'Grammatical Range and Accuracy', text: '"The population … are": the subject is singular, so use "is". Article errors total nine in this essay; three are marked.' },
          { criterion: 'Task Response', text: 'This paragraph starts with a detail, not a claim. Open with your position in one sentence, then support it.' },
          { criterion: 'Grammatical Range and Accuracy', text: '"Government" needs an article: "the government" or "governments". Check every singular countable noun.' },
          { criterion: 'Lexical Resource', text: '"Old people" repeats. Vary it: older adults, the elderly, senior citizens, retirees.' },
        ],
        next: { label: 'Practise articles in today\'s drill', to: '/today' },
      },
    },
    { id: 'reading-headings', status: 'marked', skill: 'Reading', task: 'Matching headings', title: 'Passage 2', detail: 'Both misses matched a repeated keyword', result: '8 of 10' },
  ],
  toefl: [
    { id: 'discussion-friday', status: 'overdue', skill: 'Writing', task: 'Academic Discussion', title: 'Class discussion post', detail: '100 words, reply to two classmates', due: 'Friday', lateNote: 'A second late submission voids the score guarantee.' },
    { id: 'listening-talk', status: 'todo', skill: 'Listening', task: 'Academic talk', title: 'Note-taking drill', detail: '6 questions, 10 minutes', due: 'Wednesday' },
    { id: 'speaking-interview', status: 'todo', skill: 'Speaking', task: 'Take an Interview', title: 'Study habits, take 2', detail: 'Keep each answer over 30 seconds', due: 'Thursday', to: '/speaking/interview' },
    {
      id: 'remote-lectures', status: 'marked', skill: 'Writing', task: 'Academic Discussion', title: 'Remote lectures', detail: 'Discussion post, 100 words', result: 'Score 3.5',
      feedback: {
        prompt: 'Your professor asks: should universities replace in-person lectures with online ones? Post a response that contributes to the discussion.',
        score: '3.5',
        criteria: [
          { name: 'Task and development', band: '3.5', comment: 'Position is clear, but there is only one supporting reason.' },
          { name: 'Organization', band: '3.5', comment: 'Easy to follow; no link to the classmates\' points.' },
          { name: 'Vocabulary', band: '4.0', comment: 'Appropriate and varied for the task.' },
          { name: 'Grammar and mechanics', band: '3.0', comment: 'Six verb-form errors.' },
        ],
        paragraphs: [
          [{ text: 'I think universities should not replace in-person lectures. ' }, { text: 'Students learns more when they can ask questions', note: 1 }, { text: ' straight away.' }],
          [{ text: 'Also, ' }, { text: 'online lectures is cheaper', note: 1 }, { text: ' but ' }, { text: 'many students was distracted at home', note: 1 }, { text: '. For these reasons, I disagree with the idea.' }],
        ],
        notes: [
          { criterion: 'Grammar and mechanics', text: 'Subject and verb must agree: "students learn", "lectures are", "students were". Six such errors in total; three are marked.' },
        ],
        next: { label: 'Practise verb forms in today\'s drill', to: '/today' },
      },
    },
    { id: 'reading-glaciers', status: 'marked', skill: 'Reading', task: 'Complete the Words', title: 'Passage on glaciers', detail: 'Misses cluster on word endings', result: '14 of 20' },
  ],
}
