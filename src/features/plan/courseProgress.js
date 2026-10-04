import { startConfirmed } from '../intake/intakeSlice'
import { todayReset } from '../today/todaySlice'
import { courseRestarted } from './planSlice'

// Starts a course at a confirmed start estimate: the estimate is stored, progress restarts at week 1 and Today's session resets.
export const beginCourseAt = (start) => (dispatch, getState) => {
  dispatch(startConfirmed({ exam: getState().session.exam, start }))
  dispatch(courseRestarted())
  dispatch(todayReset())
}

// A finished course starts the next one from its confirmed result (design/progress.md).
export const startNextCourse = () => (dispatch, getState) => {
  dispatch(beginCourseAt(getState().plan.completed.overall.toFixed(1)))
}
