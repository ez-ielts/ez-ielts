import { configureStore } from '@reduxjs/toolkit'
import intakeReducer from '../features/intake/intakeSlice'
import sessionReducer from '../features/session/sessionSlice'
import todayReducer from '../features/today/todaySlice'

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    intake: intakeReducer,
    today: todayReducer,
  },
})
