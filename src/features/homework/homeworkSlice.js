import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { fetchHomework } from './homeworkService'

const initialState = {
  items: [],
  status: 'idle', // 'idle' | 'loading' | 'failed' | 'ready'
  loadedExam: null,
}

export const loadHomework = createAsyncThunk(
  'homework/load',
  async (_, { getState }) => ({ exam: getState().session.exam, items: await fetchHomework(getState().session.exam) }),
  {
    condition: (_, { getState }) => {
      const { homework, session } = getState()
      return homework.status === 'failed' || (homework.status !== 'loading' && homework.loadedExam !== session.exam)
    },
  },
)

const homeworkSlice = createSlice({
  name: 'homework',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadHomework.pending, (state) => { state.status = 'loading' })
      .addCase(loadHomework.fulfilled, (state, action) => {
        state.status = 'ready'
        state.items = action.payload.items
        state.loadedExam = action.payload.exam
      })
      .addCase(loadHomework.rejected, (state) => { state.status = 'failed' })
  },
})

export const groupOrder = [
  { status: 'overdue', title: 'Overdue' },
  { status: 'todo', title: 'To do' },
  { status: 'marked', title: 'Marked' },
]

const selectItems = (state) => state.homework.items

export const selectHomeworkGroups = createSelector([selectItems], (items) =>
  groupOrder.map((group) => ({ ...group, items: items.filter((item) => item.status === group.status) })).filter((group) => group.items.length),
)

export const selectHomeworkItem = (id) => (state) => state.homework.items.find((item) => item.id === id)

export const selectOverdueItem = (state) => state.homework.items.find((item) => item.status === 'overdue')

export default homeworkSlice.reducer
