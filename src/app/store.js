import { configureStore } from '@reduxjs/toolkit'
import homeworkReducer from '../features/homework/homeworkSlice'
import intakeReducer from '../features/intake/intakeSlice'
import planReducer from '../features/plan/planSlice'
import sessionReducer from '../features/session/sessionSlice'
import todayReducer from '../features/today/todaySlice'

export const store = configureStore({
  reducer: {
    plan: planReducer,
    session: sessionReducer,
    homework: homeworkReducer,
    intake: intakeReducer,
    today: todayReducer,
  },
})
