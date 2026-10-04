import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { selectOverdueItem } from '../homework/homeworkSlice'
import { selectPlan } from '../plan/planSlice'
import { todayContent } from '../today/todayConfig'
import { requestTutorReply as fetchTutorReply } from './tutorService'

const initialState = {
  messages: [], // { role: 'user' | 'assistant', content }
  status: 'idle', // 'idle' | 'loading' | 'failed'
  errorKind: null, // 'rate_limit' | 'network'
}

// What the tutor knows about the learner, built from plan, scores and homework.
export const selectTutorContext = createSelector([selectPlan, selectOverdueItem], (plan, overdue) => {
  const { skills } = todayContent[plan.exam]
  return {
    course: plan.course,
    start: plan.start,
    target: plan.target,
    goal: plan.goal,
    week: plan.currentWeek,
    totalWeeks: plan.totalWeeks,
    mins: plan.mins,
    days: plan.days,
    skills,
    focus: skills.filter((skill) => skill.weak).map((skill) => skill.name),
    overdue: overdue ? `${overdue.task} ${overdue.title.toLowerCase()}` : null,
  }
})

export const requestTutorReply = createAsyncThunk(
  'tutor/requestReply',
  async (_, { getState, rejectWithValue }) => {
    const state = getState()
    try {
      return await fetchTutorReply({ exam: state.session.exam, context: selectTutorContext(state), messages: state.tutor.messages })
    } catch (error) {
      return rejectWithValue(error.kind ?? 'network')
    }
  },
  { condition: (_, { getState }) => getState().tutor.status !== 'loading' },
)

const tutorSlice = createSlice({
  name: 'tutor',
  initialState,
  reducers: {
    learnerAsked: (state, action) => { state.messages.push({ role: 'user', content: action.payload }) },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestTutorReply.pending, (state) => { state.status = 'loading'; state.errorKind = null })
      .addCase(requestTutorReply.fulfilled, (state, action) => {
        state.status = 'idle'
        state.messages.push({ role: 'assistant', content: action.payload.text })
      })
      .addCase(requestTutorReply.rejected, (state, action) => { state.status = 'failed'; state.errorKind = action.payload ?? 'network' })
  },
})

const { learnerAsked } = tutorSlice.actions

export const askTutor = (text) => (dispatch, getState) => {
  if (getState().tutor.status === 'loading') return
  dispatch(learnerAsked(text))
  dispatch(requestTutorReply())
}

export default tutorSlice.reducer
