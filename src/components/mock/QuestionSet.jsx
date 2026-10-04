import { ChoiceQuestion } from '../ui/ChoiceQuestion'

// questions: [{ id, text, options }]; chosen maps id → the chosen option text.
export function QuestionSet({ questions, chosen, onChoose }) {
  return (
    <div className="flex flex-col gap-6">
      {questions.map((question, index) => (
        <ChoiceQuestion key={question.id} number={index + 1} label={question.text} options={question.options} value={chosen[question.id]} onChoose={(value) => onChoose(question.id, value)} />
      ))}
    </div>
  )
}
