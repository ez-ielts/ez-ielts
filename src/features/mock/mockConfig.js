import { speakingPractices } from '../speaking/speakingConfig'

// Mock content until the backend supplies full-length papers. Timings are shortened. `answer` is the index of the correct option.
export const mockSections = [
  { key: 'listening', name: 'Listening', minutes: 5 },
  { key: 'reading', name: 'Reading', minutes: 6 },
  { key: 'writing', name: 'Writing', minutes: 15 },
  { key: 'speaking', name: 'Speaking', minutes: null },
]

export const checkpointIds = { 'week-4': 4, 'week-8': 8 }

const trueFalse = ['True', 'False', 'Not Given']

export const mockContent = {
  ielts: {
    listening: {
      transcript: 'Welcome to the library orientation. The main library is open from eight in the morning until ten at night on weekdays, and from nine until five on Saturdays. It is closed on Sundays. To borrow books you need your student card, and each student can borrow up to eight books for three weeks. Group study rooms must be booked online at least one day in advance. The quiet floor is on level three, and food is only allowed in the café on the ground floor.',
      lang: 'en-GB',
      questions: [
        { id: 'l1', text: 'When does the library close on weekdays?', options: ['8 p.m.', '10 p.m.', '5 p.m.'], answer: 1 },
        { id: 'l2', text: 'How many books can a student borrow?', options: ['Five', 'Eight', 'Ten'], answer: 1 },
        { id: 'l3', text: 'How far in advance must a group study room be booked?', options: ['One hour', 'One week', 'One day'], answer: 2 },
        { id: 'l4', text: 'Where is food allowed?', options: ['On level three', 'In the café on the ground floor', 'Anywhere in the library'], answer: 1 },
      ],
    },
    reading: {
      title: 'Urban beekeeping',
      passage: 'Urban beekeeping has grown quickly in many cities over the past decade. Supporters argue that rooftop hives help pollination in city parks and gardens. Honey produced in cities is often tested for pollution, and studies in several countries have found levels well below safety limits. However, some ecologists warn that large numbers of managed honeybees can compete with wild pollinators for scarce flowers. Cities including London and Paris now publish guidance for new beekeepers.',
      questions: [
        { id: 'r1', text: 'Urban beekeeping has become more common in the last ten years.', options: trueFalse, answer: 0 },
        { id: 'r2', text: 'City honey is never tested for pollution.', options: trueFalse, answer: 1 },
        { id: 'r3', text: 'Wild pollinators are declining faster than honeybees in cities.', options: trueFalse, answer: 2 },
        { id: 'r4', text: 'Some cities publish guidance for beekeepers.', options: trueFalse, answer: 0 },
      ],
    },
    writing: {
      task: 'Task 2',
      prompt: 'Some people think cities should ban cars from their centres. To what extent do you agree or disagree?',
      targetWords: 120,
      fullWords: 250,
    },
    speaking: speakingPractices.ielts['part-2'].turns[0],
    speakingLang: 'en-GB',
  },
  toefl: {
    listening: {
      transcript: 'Today we will look at how glaciers shape valleys. A glacier moves slowly under its own weight, and as it moves it picks up rocks. These rocks scrape the valley floor and walls, which is why glacial valleys are wide and U-shaped. When the ice melts, it often leaves behind a long lake. Next week, we will visit one of these valleys on our field trip, so please bring warm clothes and a notebook.',
      lang: 'en-US',
      questions: [
        { id: 'l1', text: 'What is the talk mainly about?', options: ['How glaciers shape valleys', 'How lakes are used for water', 'How to plan a field trip'], answer: 0 },
        { id: 'l2', text: 'Why are glacial valleys U-shaped?', options: ['Rivers cut them deeply', 'Rocks in the ice scrape the floor and walls', 'Earthquakes widen them'], answer: 1 },
        { id: 'l3', text: 'What often remains after the ice melts?', options: ['A long lake', 'A desert', 'A forest'], answer: 0 },
        { id: 'l4', text: 'What should students bring next week?', options: ['A map and lunch', 'Warm clothes and a notebook', 'A camera and a tent'], answer: 1 },
      ],
    },
    reading: {
      title: 'Notice from the campus library',
      passage: 'From Monday, the third-floor study rooms will be reserved for graduate students until 5 p.m. each weekday. Undergraduates may use the rooms after 5 p.m. or at any time at weekends. Rooms must be booked online, and bookings are cancelled if nobody arrives within ten minutes. The library asks students to keep noise low, because the third floor is also a quiet reading area.',
      questions: [
        { id: 'r1', text: 'Who may use the third-floor study rooms before 5 p.m. on weekdays?', options: ['Graduate students', 'Undergraduates', 'Library staff'], answer: 0 },
        { id: 'r2', text: 'What happens if nobody arrives within ten minutes?', options: ['The booking is cancelled', 'The room is locked', 'The student pays a fee'], answer: 0 },
        { id: 'r3', text: 'How must rooms be booked?', options: ['At the desk', 'By phone', 'Online'], answer: 2 },
        { id: 'r4', text: 'Why does the library ask students to keep noise low?', options: ['Exams are in progress', 'The floor is a quiet reading area', 'Builders are working'], answer: 1 },
      ],
    },
    writing: {
      task: 'Academic Discussion',
      prompt: 'Your professor asks: should universities replace in-person lectures with online ones? Post a response that contributes to the discussion.',
      targetWords: 80,
      fullWords: 100,
    },
    speaking: speakingPractices.toefl.interview.turns[0],
    speakingLang: 'en-US',
  },
}

// Short mock: the top bands cannot be evidenced by a few questions, so skill bands are capped.
export const skillBandCap = { ielts: 7, toefl: 5 }
