import { useDispatch, useSelector } from 'react-redux'
import { intakeQuestions } from '../../features/intake/intakeConfig'
import { answerChosen, selectIntakeProfile } from '../../features/intake/intakeSlice'
import { ChoiceQuestion } from '../ui/ChoiceQuestion'

const scheduleKeys = ['mins', 'days', 'date']
const scheduleQuestions = intakeQuestions.filter((question) => scheduleKeys.includes(question.key))

// Reschedule: edits the intake answers the plan is derived from.
export function ScheduleEditor() {
  const dispatch = useDispatch()
  const profile = useSelector(selectIntakeProfile)

  return (
    <div className="flex flex-col gap-6">
      {scheduleQuestions.map((question, index) => (
        <ChoiceQuestion
          key={question.key}
          ruled={index > 0}
          label={question.label}
          options={question.options}
          value={profile[question.key]}
          hint={question.hint}
          onChoose={(value) => dispatch(answerChosen({ key: question.key, value }))}
        />
      ))}
    </div>
  )
}
