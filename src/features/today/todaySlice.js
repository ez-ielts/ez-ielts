import { createSlice } from '@reduxjs/toolkit'
import { selectIntakeProfile } from '../intake/intakeSlice'
import { sessionCompleted } from '../plan/planSlice'

export const SESSION_STEPS = 3

// sessionDate is the calendar day (Date#toDateString) of the last completed session. One session counts per day.
const initialState = { stepsDone: 0, sessionDate: null }

const todaySlice = createSlice({
  name: 'today',
  initialState,
  reducers: {
    sessionAdvanced: (state) => { state.stepsDone = Math.min(SESSION_STEPS, state.stepsDone + 1) },
    stepCompleted: (state, action) => { state.stepsDone = Math.max(state.stepsDone, action.payload + 1) },
    sessionFinished: (state, action) => { state.sessionDate = action.payload },
    // On a later calendar day a finished session is replaced by a new one.
    dayStarted: (state, action) => {
      if (state.stepsDone >= SESSION_STEPS && state.sessionDate !== action.payload) state.stepsDone = 0
    },
    todayReset: () => initialState,
  },
})

export const { dayStarted, todayReset } = todaySlice.actions
const { sessionAdvanced, stepCompleted, sessionFinished } = todaySlice.actions

export const todayKey = () => new Date().toDateString()

// Runs a step action and, when it completes the third step, records the session for the day and counts it toward the week.
const withSessionCompletion = (action) => (dispatch, getState) => {
  const before = getState().today.stepsDone
  dispatch(action)
  if (before < SESSION_STEPS && getState().today.stepsDone >= SESSION_STEPS) {
    dispatch(sessionFinished(todayKey()))
    dispatch(sessionCompleted({ daysPerWeek: parseInt(selectIntakeProfile(getState()).days, 10) }))
  }
}

export const advanceSession = () => withSessionCompletion(sessionAdvanced())
export const completeStep = (index) => withSessionCompletion(stepCompleted(index))

export default todaySlice.reducer
