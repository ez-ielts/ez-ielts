// Mock practice content until the backend supplies it. Ids match the routes on Today and Homework.
export const speakingPractices = {
  ielts: {
    'part-1': {
      title: 'Part 1 · Interview',
      instruction: 'Answer naturally in two or three sentences. The examiner asks about familiar topics.',
      lang: 'en-GB',
      turns: [
        { part: 'part1', question: 'Let\'s talk about your work or studies. What do you enjoy most about it?', speakSeconds: 40 },
        { part: 'part1', question: 'How do you usually spend your weekends?', speakSeconds: 40 },
        { part: 'part1', question: 'Do you prefer making plans or being spontaneous? Why?', speakSeconds: 40 },
      ],
    },
    'part-2': {
      title: 'Part 2 · Long turn',
      instruction: 'You have one minute to prepare, then speak for up to two minutes. Use the notes as prompts, not a script.',
      lang: 'en-GB',
      turns: [
        {
          part: 'part2',
          question: 'Describe a place in your town that you would recommend to a visitor.',
          cue: ['where it is', 'what you can do there', 'when you first visited', 'why you recommend it'],
          prepSeconds: 60,
          speakSeconds: 120,
        },
      ],
    },
    'part-3': {
      title: 'Part 3 · Discussion',
      instruction: 'Develop your ideas. Give reasons, examples and comparisons instead of short answers.',
      lang: 'en-GB',
      turns: [
        { part: 'part3', question: 'Why do some places become more popular with visitors than others?', speakSeconds: 60 },
        { part: 'part3', question: 'How can tourism affect the people who live in a popular destination?', speakSeconds: 60 },
        { part: 'part3', question: 'Do you think governments should limit tourism in some places?', speakSeconds: 60 },
      ],
    },
  },
  toefl: {
    interview: {
      title: 'Take an Interview',
      instruction: 'Four questions, 45 seconds each. Keep talking until the time is up.',
      lang: 'en-US',
      turns: [
        { part: 'interview', question: 'Thanks for talking with me today. What time of day do you study best, and why?', speakSeconds: 45 },
        { part: 'interview', question: 'Do you prefer to study alone or with other students? Explain your choice.', speakSeconds: 45 },
        { part: 'interview', question: 'What is the hardest part of studying in a second language for you?', speakSeconds: 45 },
        { part: 'interview', question: 'If a friend wanted to improve their English quickly, what advice would you give?', speakSeconds: 45 },
      ],
    },
  },
}

export const getPractice = (exam, id) => speakingPractices[exam][id] ?? null

export const speakingErrorCopy = {
  mic_denied: 'Microphone access is blocked. Allow it in your browser settings, then try again.',
  mic_unavailable: 'No microphone was found on this device.',
  recognition: 'Voice transcription stopped working in this browser.',
}
