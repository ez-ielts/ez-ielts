import { speakingPractices } from '../speaking/speakingConfig'

// Short placement content until the backend supplies it. Same shape as the checkpoint mock (`mockContent`) so the same
// section components and scoring are used. `answer` is the index of the correct option.
export const placementSections = [
  { key: 'listening', name: 'Listening', minutes: 3 },
  { key: 'reading', name: 'Reading', minutes: 4 },
  { key: 'writing', name: 'Writing', minutes: 8 },
  { key: 'speaking', name: 'Speaking', minutes: null },
]

const trueFalse = ['True', 'False', 'Not Given']

export const placementContent = {
  ielts: {
    listening: {
      transcript: 'Hello, I would like to book a table for Friday evening. There will be five of us, and we would like to eat at half past seven. One of my friends does not eat meat, so we will need a vegetarian option. Could you also tell me if there is parking nearby? Thank you.',
      lang: 'en-GB',
      questions: [
        { id: 'l1', text: 'What day is the booking for?', options: ['Thursday', 'Friday', 'Saturday'], answer: 1 },
        { id: 'l2', text: 'How many people will come?', options: ['Four', 'Five', 'Six'], answer: 1 },
        { id: 'l3', text: 'What does the caller ask about at the end?', options: ['Parking', 'The price of the menu', 'Opening hours'], answer: 0 },
      ],
    },
    reading: {
      title: 'Working from home',
      passage: 'Many people now work from home for at least part of the week. Research suggests that this can improve focus on individual tasks, but it may reduce the informal conversations that lead to new ideas. Some companies therefore ask staff to meet in the office on one fixed day each week.',
      questions: [
        { id: 'r1', text: 'Working from home can improve focus on individual tasks.', options: trueFalse, answer: 0 },
        { id: 'r2', text: 'Every company requires staff to work in the office five days a week.', options: trueFalse, answer: 1 },
        { id: 'r3', text: 'People who work from home earn higher salaries.', options: trueFalse, answer: 2 },
      ],
    },
    writing: {
      task: 'Short response',
      prompt: 'Do you think children should learn a foreign language at primary school? Give reasons for your answer.',
      targetWords: 60,
      fullWords: 250,
    },
    speaking: speakingPractices.ielts['part-1'].turns[0],
    speakingLang: 'en-GB',
  },
  toefl: {
    listening: {
      transcript: 'Attention students. The campus bookstore will close early on Wednesday for inventory. It will reopen at nine on Thursday morning. If you need textbooks for Thursday classes, please buy them before four on Wednesday. Online orders will still be accepted.',
      lang: 'en-US',
      questions: [
        { id: 'l1', text: 'Why will the bookstore close early?', options: ['Inventory', 'A holiday', 'Repairs'], answer: 0 },
        { id: 'l2', text: 'When will it reopen?', options: ['Wednesday at four', 'Thursday at nine', 'Friday at nine'], answer: 1 },
        { id: 'l3', text: 'What can students still do on Wednesday evening?', options: ['Return books', 'Place online orders', 'Pick up parcels'], answer: 1 },
      ],
    },
    reading: {
      title: 'Notice from the city museum',
      passage: 'The city museum has introduced a free evening each month. On that evening visitors can see all exhibitions without paying, and guided tours are offered every hour. The museum hopes that the change will attract people who rarely visit.',
      questions: [
        { id: 'r1', text: 'What is new at the museum?', options: ['A free evening each month', 'A new building', 'Lower daily prices'], answer: 0 },
        { id: 'r2', text: 'How often are guided tours offered on that evening?', options: ['Every hour', 'Every day', 'Only once'], answer: 0 },
        { id: 'r3', text: 'Who does the museum hope to attract?', options: ['Frequent visitors', 'People who rarely visit', 'Only students'], answer: 1 },
      ],
    },
    writing: {
      task: 'Short response',
      prompt: 'Do you prefer studying in the morning or in the evening? Give reasons for your answer.',
      targetWords: 50,
      fullWords: 100,
    },
    speaking: speakingPractices.toefl.interview.turns[1],
    speakingLang: 'en-US',
  },
}
