import { createSlice } from '@reduxjs/toolkit'

export const examLabels = { ielts: 'IELTS Academic', toefl: 'TOEFL iBT' }

const initialState = {
  exam: 'ielts', // 'ielts' | 'toefl'
  tier: null, // null until the learner starts a trial or buys a course: 'trial' | 'foundation' | 'bridge' | 'core' | 'advanced' | 'mastery'
}

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setExam: (state, action) => { state.exam = action.payload },
    startTrial: (state) => { state.tier = 'trial' },
    chooseTier: (state, action) => { state.tier = action.payload },
  },
})

export const { setExam, startTrial, chooseTier } = sessionSlice.actions
export default sessionSlice.reducer
