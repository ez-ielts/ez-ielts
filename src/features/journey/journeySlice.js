import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentStep: 0,
  authMethod: 'email',
  account: { name: '', email: '', phone: '' },
  interview: {
    status: 'idle',
    part: 1,
    questionIndex: 0,
    prepSeconds: 60,
    answerDraft: '',
    transcript: [],
    recording: false,
  },
}

const journeySlice = createSlice({
  name: 'journey',
  initialState,
  reducers: {
    goToStep: (state, action) => { state.currentStep = action.payload },
    nextStep: (state) => { state.currentStep = Math.min(state.currentStep + 1, 3) },
    setAuthMethod: (state, action) => { state.authMethod = action.payload },
    updateAccountField: (state, action) => { state.account[action.payload.field] = action.payload.value },
    startInterview: (state) => {
      state.interview.status = 'active'
      state.interview.part = 1
      state.interview.questionIndex = 0
    },
    setInterviewAnswer: (state, action) => { state.interview.answerDraft = action.payload },
    setInterviewRecording: (state, action) => { state.interview.recording = action.payload },
    setPrepSeconds: (state, action) => { state.interview.prepSeconds = action.payload },
    submitInterviewAnswer: (state, action) => {
      state.interview.transcript.push({ speaker: 'candidate', text: action.payload })
      state.interview.answerDraft = ''
      state.interview.questionIndex += 1
    },
    moveToInterviewPart: (state, action) => {
      state.interview.part = action.payload
      state.interview.questionIndex = 0
      state.interview.prepSeconds = 60
    },
    completeInterview: (state) => { state.interview.status = 'complete' },
    resetJourney: () => initialState,
  },
})

export const { goToStep, nextStep, setAuthMethod, updateAccountField, startInterview, setInterviewAnswer, setInterviewRecording, setPrepSeconds, submitInterviewAnswer, moveToInterviewPart, completeInterview, resetJourney } = journeySlice.actions
export default journeySlice.reducer
