import { configureStore } from '@reduxjs/toolkit'
import homeworkReducer from '../features/homework/homeworkSlice'
import intakeReducer from '../features/intake/intakeSlice'
import mockReducer from '../features/mock/mockSlice'
import planReducer from '../features/plan/planSlice'
import sessionReducer from '../features/session/sessionSlice'
import settingsReducer from '../features/settings/settingsSlice'
import speakingReducer from '../features/speaking/speakingSlice'
import todayReducer from '../features/today/todaySlice'
import tutorReducer from '../features/tutor/tutorSlice'

export const store = configureStore({
  reducer: {
    mock: mockReducer,
    plan: planReducer,
    session: sessionReducer,
    speaking: speakingReducer,
    settings: settingsReducer,
    homework: homeworkReducer,
    intake: intakeReducer,
    today: todayReducer,
    tutor: tutorReducer,
  },
})
