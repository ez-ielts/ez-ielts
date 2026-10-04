import { createSlice } from '@reduxjs/toolkit'
import { selectOverdueItem } from '../homework/homeworkSlice'
import { planAdjustments } from '../plan/adjustmentRules'
import { checkpointCompleted, selectPlan } from '../plan/planSlice'
import { checkpointIds, mockSections } from './mockConfig'
import { scoreMock } from './mockExamService'

// stage: 'intro' | 'section' | 'scoring' | 'result' | 'failed'
const initialState = {
  mockId: null,
  stage: 'intro',
  sectionIndex: 0,
  answers: { listening: {}, reading: {}, writing: '', speaking: { text: '', seconds: 0 } },
  result: null,
}

const mockSlice = createSlice({
  name: 'mock',
  initialState,
  reducers: {
    mockStarted: (state, action) => ({ ...initialState, mockId: action.payload, stage: 'section' }),
    choiceMade: (state, action) => { state.answers[action.payload.section][action.payload.id] = action.payload.value },
    writingChanged: (state, action) => { state.answers.writing = action.payload },
    speakingAnswered: (state, action) => { state.answers.speaking = action.payload },
    sectionAdvanced: (state) => { state.sectionIndex += 1 },
    scoringStarted: (state) => { state.stage = 'scoring' },
    scoringFailed: (state) => { state.stage = 'failed' },
    mockScored: (state, action) => { state.stage = 'result'; state.result = action.payload },
    mockReset: () => initialState,
  },
})

export const { mockStarted, choiceMade, writingChanged, speakingAnswered, mockReset } = mockSlice.actions
const { sectionAdvanced, scoringStarted, scoringFailed, mockScored } = mockSlice.actions

// Scores the mock, derives plan adjustments from the result and any overdue homework, and records the checkpoint in the plan.
export const submitMock = () => async (dispatch, getState) => {
  dispatch(scoringStarted())
  const state = getState()
  const plan = selectPlan(state)
  const week = checkpointIds[state.mock.mockId]
  try {
    const result = await scoreMock({ exam: plan.exam, answers: state.mock.answers })
    const overdue = selectOverdueItem(state)
    const { pace, adjustments } = planAdjustments({ skills: result.skills, start: plan.start, target: plan.target, week, totalWeeks: plan.totalWeeks, overdue: overdue ? `${overdue.task} ${overdue.title.toLowerCase()}` : null })
    dispatch(mockScored({ ...result, week, pace, adjustments }))
    dispatch(checkpointCompleted({ week, overall: result.overall, adjustments }))
  } catch {
    dispatch(scoringFailed())
  }
}

export const finishSection = () => (dispatch, getState) => {
  const { sectionIndex } = getState().mock
  if (sectionIndex + 1 >= mockSections.length) dispatch(submitMock())
  else dispatch(sectionAdvanced())
}

export const finishSpeaking = ({ text, seconds }) => (dispatch) => {
  dispatch(speakingAnswered({ text, seconds }))
  dispatch(finishSection())
}

export default mockSlice.reducer
