import { createSlice } from '@reduxjs/toolkit'

export const reminderOptions = [
  { key: 'tasks', label: 'Study task reminders', note: 'On the days you study, before your session.' },
  { key: 'examDate', label: 'Exam date reminders', note: 'Two weeks, one week and the day before.' },
  { key: 'weekly', label: 'Weekly progress summary', note: 'Scores, completed work and plan changes.' },
]

export const reminderTimes = ['Morning', 'Afternoon', 'Evening']

const initialState = {
  reminders: { tasks: true, examDate: true, weekly: false },
  reminderTime: 'Morning',
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    reminderToggled: (state, action) => { state.reminders[action.payload] = !state.reminders[action.payload] },
    reminderTimeChosen: (state, action) => { state.reminderTime = action.payload },
  },
})

export const { reminderToggled, reminderTimeChosen } = settingsSlice.actions
export default settingsSlice.reducer
