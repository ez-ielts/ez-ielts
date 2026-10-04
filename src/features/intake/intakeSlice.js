import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { courseTarget, goalOptions, intakeExams } from './intakeConfig'
import { requestIntakeReply } from './intakeService'

const initialState = {
  stage: 'questionnaire', // 'questionnaire' | 'interview' | 'course'
  answers: { goal: null, date: 'In 8–10 weeks', mins: '45 min', days: '5 days', weak: 'Writing' },
  reason: '',
  messages: [], // { role: 'user' | 'assistant', content }
  status: 'idle', // 'idle' | 'loading' | 'failed'
  errorKind: null, // 'rate_limit' | 'network'
  done: false,
}

// The course target is always the next half-band. A null or out-of-scale goal follows the target, so switching exam never leaves a goal from the other scale.
export const selectIntakeProfile = (state) => {
  const { exam } = state.session
  const { answers, reason } = state.intake
  const { start } = intakeExams[exam]
  const target = courseTarget(start)
  const goal = goalOptions(start).includes(answers.goal) ? answers.goal : target
  return { ...answers, goal, target, start, reason }
}

export const requestTutorReply = createAsyncThunk(
  'intake/requestTutorReply',
  async (_, { getState, rejectWithValue }) => {
    const state = getState()
    try {
      return await requestIntakeReply({ exam: state.session.exam, profile: selectIntakeProfile(state), messages: state.intake.messages })
    } catch (error) {
      return rejectWithValue(error.kind ?? 'network')
    }
  },
  { condition: (_, { getState }) => getState().intake.status !== 'loading' },
)

const intakeSlice = createSlice({
  name: 'intake',
  initialState,
  reducers: {
    answerChosen: (state, action) => { state.answers[action.payload.key] = action.payload.value },
    reasonChanged: (state, action) => { state.reason = action.payload },
    stageChanged: (state, action) => { state.stage = action.payload },
    learnerReplied: (state, action) => { state.messages.push({ role: 'user', content: action.payload }) },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestTutorReply.pending, (state) => { state.status = 'loading'; state.errorKind = null })
      .addCase(requestTutorReply.fulfilled, (state, action) => {
        state.status = 'idle'
        state.messages.push({ role: 'assistant', content: action.payload.text })
        state.done = action.payload.done
      })
      .addCase(requestTutorReply.rejected, (state, action) => { state.status = 'failed'; state.errorKind = action.payload ?? 'network' })
  },
})

export const { answerChosen, reasonChanged, stageChanged } = intakeSlice.actions
const { learnerReplied } = intakeSlice.actions

export const sendLearnerReply = (text) => (dispatch, getState) => {
  if (getState().intake.status === 'loading') return
  dispatch(learnerReplied(text))
  dispatch(requestTutorReply())
}

export const beginInterview = () => (dispatch) => {
  dispatch(stageChanged('interview'))
  dispatch(requestTutorReply())
}

export default intakeSlice.reducer
