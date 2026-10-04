import { createSlice } from '@reduxjs/toolkit'
import { nearestStart, supportedStarts } from '../pricing/pricingConfig'
import { scoreMock } from '../mock/mockExamService'
import { beginCourseAt } from '../plan/courseProgress'
import { placementContent, placementSections } from './placementConfig'

// stage: 'intro' | 'section' | 'scoring' | 'result' | 'failed'. Design: design/placement.md.
const initialState = {
  stage: 'intro',
  sectionIndex: 0,
  answers: { listening: {}, reading: {}, writing: '', speaking: { text: '', seconds: 0 } },
  result: null,
  chosenStart: null,
}

const placementSlice = createSlice({
  name: 'placement',
  initialState,
  reducers: {
    placementStarted: () => ({ ...initialState, stage: 'section' }),
    choiceMade: (state, action) => { state.answers[action.payload.section][action.payload.id] = action.payload.value },
    writingChanged: (state, action) => { state.answers.writing = action.payload },
    speakingAnswered: (state, action) => { state.answers.speaking = action.payload },
    sectionAdvanced: (state) => { state.sectionIndex += 1 },
    scoringStarted: (state) => { state.stage = 'scoring' },
    scoringFailed: (state) => { state.stage = 'failed' },
    placementScored: (state, action) => {
      state.stage = 'result'
      state.result = action.payload
      state.chosenStart = action.payload.start
    },
    startChosen: (state, action) => { state.chosenStart = action.payload },
    placementReset: () => initialState,
  },
})

export const { placementStarted, choiceMade, writingChanged, speakingAnswered, startChosen, placementReset } = placementSlice.actions
const { sectionAdvanced, scoringStarted, scoringFailed, placementScored } = placementSlice.actions

// The top supported start is also the highest band a short test can evidence.
const topStart = (exam) => Number(supportedStarts(exam).at(-1))

// Estimated start: the overall band, limited to the starts the course levels cover. `clamped` says whether it was moved.
export const estimateStart = (exam, overall) => {
  const start = nearestStart(exam, overall)
  return { start, clamped: Number(start) !== overall }
}

export const submitPlacement = () => async (dispatch, getState) => {
  dispatch(scoringStarted())
  const state = getState()
  const { exam } = state.session
  try {
    const result = await scoreMock({ exam, answers: state.placement.answers, content: placementContent[exam], cap: topStart(exam) })
    dispatch(placementScored({ ...result, ...estimateStart(exam, result.overall), options: supportedStarts(exam) }))
  } catch {
    dispatch(scoringFailed())
  }
}

export const finishPlacementSection = () => (dispatch, getState) => {
  if (getState().placement.sectionIndex + 1 >= placementSections.length) dispatch(submitPlacement())
  else dispatch(sectionAdvanced())
}

export const finishPlacementSpeaking = ({ text, seconds }) => (dispatch) => {
  dispatch(speakingAnswered({ text, seconds }))
  dispatch(finishPlacementSection())
}

// Confirming sets the start estimate and starts the course at week 1.
export const confirmStart = () => (dispatch, getState) => {
  dispatch(beginCourseAt(getState().placement.chosenStart))
}

export default placementSlice.reducer
