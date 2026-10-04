import { createSelector, createSlice } from '@reduxjs/toolkit'
import { courseWeeks, intakeExams, studyHours } from '../intake/intakeConfig'
import { selectIntakeProfile } from '../intake/intakeSlice'

// Placeholder progress until it is derived from completed sessions and mock results.
const initialState = { currentWeek: 3, totalWeeks: 8 }

const planSlice = createSlice({
  name: 'plan',
  initialState,
  reducers: {},
})

const selectPlanState = (state) => state.plan
const selectExam = (state) => state.session.exam

// Everything the Plan screen shows. The schedule comes from the intake answers, the single source for it.
export const selectPlan = createSelector([selectExam, selectIntakeProfile, selectPlanState], (exam, profile, { currentWeek, totalWeeks }) => ({
  exam,
  course: intakeExams[exam].course,
  start: profile.start,
  target: profile.target,
  mins: profile.mins,
  days: profile.days,
  date: profile.date,
  hours: studyHours(profile),
  weeks: courseWeeks(exam),
  currentWeek,
  totalWeeks,
}))

export default planSlice.reducer
