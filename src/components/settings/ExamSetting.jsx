import { useDispatch, useSelector } from 'react-redux'
import { examLabels, setExam } from '../../features/session/sessionSlice'
import { ChoiceQuestion } from '../ui/ChoiceQuestion'

const labelToKey = Object.fromEntries(Object.entries(examLabels).map(([key, label]) => [label, key]))

export function ExamSetting() {
  const dispatch = useDispatch()
  const exam = useSelector((state) => state.session.exam)

  return (
    <ChoiceQuestion
      ruled={false}
      label="Your exam"
      options={Object.values(examLabels)}
      value={examLabels[exam]}
      hint="Switching changes every screen. Your course follows the other exam's scale and task types."
      onChoose={(label) => dispatch(setExam(labelToKey[label]))}
    />
  )
}
