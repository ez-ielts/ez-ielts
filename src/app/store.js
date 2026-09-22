import { configureStore } from '@reduxjs/toolkit'
import journeyReducer from '../features/journey/journeySlice'

export const store = configureStore({
  reducer: {
    journey: journeyReducer,
  },
})
