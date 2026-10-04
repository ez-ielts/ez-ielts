import { startConfirmed } from '../intake/intakeSlice'
import { todayReset } from '../today/todaySlice'
import { courseRestarted } from './planSlice'

// A finished course starts the next one from its confirmed result (design/progress.md).
export const startNextCourse = () => (dispatch, getState) => {
  const { exam } = getState().session
  const { overall } = getState().plan.completed
  dispatch(startConfirmed({ exam, start: overall.toFixed(1) }))
  dispatch(courseRestarted())
  dispatch(todayReset())
}
