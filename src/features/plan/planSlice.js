import { createSelector, createSlice } from '@reduxjs/toolkit'
import { courseStages, courseWeeks, intakeExams, studyHours } from '../intake/intakeConfig'
import { selectIntakeProfile } from '../intake/intakeSlice'

// Placeholder progress until it is derived from completed sessions and mock results.
const initialState = { currentWeek: 3, totalWeeks: 8, checkpoints: {}, adjustments: [] }

const planSlice = createSlice({
  name: 'plan',
  initialState,
  reducers: {
    // A completed checkpoint mock: keeps the result for that week and replaces the active adjustments.
    checkpointCompleted: (state, action) => {
      state.checkpoints[action.payload.week] = { overall: action.payload.overall }
      state.adjustments = action.payload.adjustments
    },
  },
})

const selectPlanState = (state) => state.plan
const selectExam = (state) => state.session.exam

// Everything the Plan screen shows. The schedule comes from the intake answers, the single source for it.
export const selectPlan = createSelector([selectExam, selectIntakeProfile, selectPlanState], (exam, profile, { currentWeek, totalWeeks, checkpoints, adjustments }) => ({
  exam,
  course: intakeExams[exam].course,
  start: profile.start,
  target: profile.target,
  goal: profile.goal,
  stages: courseStages(profile.start, profile.goal),
  mins: profile.mins,
  days: profile.days,
  date: profile.date,
  hours: studyHours(profile),
  weeks: courseWeeks(exam),
  currentWeek,
  totalWeeks,
  checkpoints,
  adjustments,
}))

export const { checkpointCompleted } = planSlice.actions

export default planSlice.reducer
