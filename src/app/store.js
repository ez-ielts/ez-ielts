import { configureStore } from '@reduxjs/toolkit'
import intakeReducer from '../features/intake/intakeSlice'
import journeyReducer from '../features/journey/journeySlice'
import sessionReducer from '../features/session/sessionSlice'

export const store = configureStore({
  reducer: {
    journey: journeyReducer,
    session: sessionReducer,
    intake: intakeReducer,
  },
})
