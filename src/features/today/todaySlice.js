import { createSlice } from '@reduxjs/toolkit'

export const SESSION_STEPS = 3

const initialState = { stepsDone: 0 }

const todaySlice = createSlice({
  name: 'today',
  initialState,
  reducers: {
    sessionAdvanced: (state) => { state.stepsDone = Math.min(SESSION_STEPS, state.stepsDone + 1) },
    stepCompleted: (state, action) => { state.stepsDone = Math.max(state.stepsDone, action.payload + 1) },
  },
})

export const { sessionAdvanced, stepCompleted } = todaySlice.actions
export default todaySlice.reducer
