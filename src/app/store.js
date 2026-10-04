import { configureStore } from '@reduxjs/toolkit'
import homeworkReducer from '../features/homework/homeworkSlice'
import intakeReducer from '../features/intake/intakeSlice'
import planReducer from '../features/plan/planSlice'
import sessionReducer from '../features/session/sessionSlice'
import settingsReducer from '../features/settings/settingsSlice'
import todayReducer from '../features/today/todaySlice'
import tutorReducer from '../features/tutor/tutorSlice'

export const store = configureStore({
  reducer: {
    plan: planReducer,
    session: sessionReducer,
    settings: settingsReducer,
    homework: homeworkReducer,
    intake: intakeReducer,
    today: todayReducer,
    tutor: tutorReducer,
  },
})
