import { createSlice, nanoid } from '@reduxjs/toolkit'
import { submitHomeworkByRoute } from '../homework/homeworkSlice'
import { requestMicrophone, SpeechError } from './speechService'
import { buildTurnEvidence } from './speakingService'

// stage: 'ready' | 'asking' | 'prep' | 'answering' | 'paused' | 'complete'
// mode: 'voice' | 'text'. error: null | 'mic_denied' | 'mic_unavailable' | 'recognition'.
const initialState = {
  practiceId: null,
  assessmentId: null,
  stage: 'ready',
  mode: 'voice',
  turnIndex: 0,
  totalTurns: 0,
  turns: [], // evidence records, one per submitted answer
  error: null,
}

const speakingSlice = createSlice({
  name: 'speaking',
  initialState,
  reducers: {
    sessionStarted: {
      reducer: (state, action) => ({ ...initialState, ...action.payload, stage: 'asking' }),
      prepare: ({ practiceId, mode, totalTurns }) => ({ payload: { practiceId, mode, totalTurns, assessmentId: nanoid() } }),
    },
    questionHeard: (state, action) => { state.stage = action.payload.prep ? 'prep' : 'answering' },
    prepFinished: (state) => { state.stage = 'answering' },
    answerPaused: (state) => { state.stage = 'paused' },
    answerResumed: (state) => { state.stage = 'answering' },
    answerRecorded: (state, action) => {
      state.turns.push(action.payload)
      state.error = null
      if (state.turnIndex + 1 >= state.totalTurns) {
        state.stage = 'complete'
      } else {
        state.turnIndex += 1
        state.stage = 'asking'
      }
    },
    errorRaised: (state, action) => { state.error = action.payload },
    errorCleared: (state) => { state.error = null },
    typedModeChosen: (state) => { state.mode = 'text'; state.error = null },
    sessionReset: () => initialState,
  },
})

export const { questionHeard, prepFinished, answerPaused, answerResumed, errorRaised, errorCleared, typedModeChosen, sessionReset } = speakingSlice.actions
const { sessionStarted, answerRecorded } = speakingSlice.actions

// Voice mode asks for the microphone now, on the learner's tap. A refusal stays on the ready screen with an error.
export const startSession = ({ practiceId, totalTurns, mode }) => async (dispatch) => {
  dispatch(errorCleared())
  if (mode === 'voice') {
    try {
      await requestMicrophone()
    } catch (error) {
      dispatch(errorRaised(error instanceof SpeechError ? error.kind : 'mic_unavailable'))
      return
    }
  }
  dispatch(sessionStarted({ practiceId, mode, totalTurns }))
}

export const submitAnswer = ({ turn, text, seconds }) => (dispatch, getState) => {
  const { assessmentId } = getState().speaking
  dispatch(answerRecorded(buildTurnEvidence({ assessmentId, turn, text, seconds })))
  // Finishing the practice submits the homework item that opens it.
  const { stage, practiceId } = getState().speaking
  if (stage === 'complete') dispatch(submitHomeworkByRoute(`/speaking/${practiceId}`))
}

export default speakingSlice.reducer
