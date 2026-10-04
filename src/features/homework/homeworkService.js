import { homeworkContent } from './homeworkConfig'

// Replace with `GET {VITE_API_BASE_URL}/homework?exam=` when the backend exists. Components depend only on this contract.
export async function fetchHomework(exam) {
  return homeworkContent[exam]
}
