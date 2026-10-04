import { useDispatch, useSelector } from 'react-redux'
import { examLabels, setExam } from '../../features/session/sessionSlice'
import { ChoiceButton } from '../ui/ChoiceButton'

export function ExamChoice() {
  const dispatch = useDispatch()
  const exam = useSelector((state) => state.session.exam)

  return (
    <fieldset className="m-0 flex flex-col gap-3 border-0 p-0">
      <legend className="mb-3 p-0 text-[17px] font-extrabold tracking-[-.01em]">Which exam are you preparing for?</legend>
      <div className="flex flex-wrap gap-2">
        {Object.entries(examLabels).map(([key, label]) => (
          <ChoiceButton key={key} selected={exam === key} onSelect={() => dispatch(setExam(key))}>{label}</ChoiceButton>
        ))}
      </div>
    </fieldset>
  )
}
