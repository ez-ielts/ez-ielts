import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadHomework } from './homeworkSlice'

// Loads the learner's homework once per exam and returns the load status.
export function useHomework() {
  const dispatch = useDispatch()
  const exam = useSelector((state) => state.session.exam)
  const status = useSelector((state) => state.homework.status)

  useEffect(() => { dispatch(loadHomework()) }, [dispatch, exam])

  return { status, retry: () => dispatch(loadHomework()) }
}
