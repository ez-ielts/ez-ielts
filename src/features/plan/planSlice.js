import { createSelector, createSlice } from '@reduxjs/toolkit'
import { checkpointWeeks, courseStages, courseWeeks, studyHours } from '../intake/intakeConfig'
import { selectIntakeProfile } from '../intake/intakeSlice'
import { courseName } from '../pricing/pricingConfig'

// Progress rules are in design/progress.md. The starting week is a placeholder (the first checkpoint week, so the mock is reachable)
// until the backend supplies real progress.
const initialState = { currentWeek: 4, totalWeeks: 8, weekSessions: 0, checkpoints: {}, adjustments: [], completed: null }
const freshCourse = { ...initialState, currentWeek: 1 }

const advanceWeek = (state) => {
  state.currentWeek += 1
  state.weekSessions = 0
}

const planSlice = createSlice({
  name: 'plan',
  initialState,
  reducers: {
    // A completed daily session. A normal week advances after as many sessions as study days; a checkpoint week waits for its mock.
    sessionCompleted: (state, action) => {
      state.weekSessions += 1
      const checkpoint = checkpointWeeks.includes(state.currentWeek)
      if (!checkpoint && state.weekSessions >= action.payload.daysPerWeek && state.currentWeek < state.totalWeeks) advanceWeek(state)
    },
    // A finished checkpoint mock keeps its result and replaces the adjustments. Finishing the current week's checkpoint moves the course on.
    checkpointCompleted: (state, action) => {
      const { week, overall, adjustments } = action.payload
      state.checkpoints[week] = { overall }
      state.adjustments = adjustments
      if (week !== state.currentWeek) return
      if (week >= state.totalWeeks) state.completed = { overall }
      else advanceWeek(state)
    },
    courseRestarted: () => freshCourse,
  },
})

const selectPlanState = (state) => state.plan
const selectExam = (state) => state.session.exam

// Everything the Plan screen shows. The schedule comes from the intake answers, the single source for it.
export const selectPlan = createSelector([selectExam, selectIntakeProfile, selectPlanState], (exam, profile, plan) => ({
  exam,
  course: courseName(exam, profile.start),
  start: profile.start,
  target: profile.target,
  goal: profile.goal,
  stages: courseStages(profile.start, profile.goal),
  mins: profile.mins,
  days: profile.days,
  date: profile.date,
  hours: studyHours(profile),
  weeks: courseWeeks(exam),
  ...plan,
}))

export const { sessionCompleted, checkpointCompleted, courseRestarted } = planSlice.actions

export default planSlice.reducer
