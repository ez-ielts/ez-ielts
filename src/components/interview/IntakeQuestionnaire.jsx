import { Button } from '../ui/Button'
import { ChoiceButton } from '../ui/ChoiceButton'
import { TextInput } from '../ui/TextInput'

// questions: [{ key, label, options, hint }]; profile holds the current answer for each key.
export function IntakeQuestionnaire({ questions, profile, reason, onChoose, onReasonChange, onSubmit }) {
  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit()
  }

  return (
    <div className="flex flex-wrap gap-8">
      <div className="max-w-[380px] flex-[1_1_280px]">
        <h1 className="m-0 text-[clamp(28px,4vw,44px)] leading-[1.02] font-extrabold tracking-[-.025em]">Six questions to set your course</h1>
        <p className="mt-3 mb-0 text-sm leading-[1.55] text-neutral-800">Your placement estimate is <strong>{profile.start}</strong>. The course is built from that, your target and your available time.</p>
      </div>
      <form onSubmit={handleSubmit} className="flex min-w-0 flex-[2_1_420px] flex-col gap-6">
        {questions.map((question, index) => (
          <fieldset key={question.key} className="m-0 flex min-w-0 flex-col gap-2 border-0 border-t-2 border-ink p-0 pt-3">
            <legend className="float-left mb-2 w-full p-0 text-[15px] font-bold"><span className="mr-2 text-accent-700">{index + 1}</span>{question.label}</legend>
            <div className="flex flex-wrap gap-2">
              {question.options.map((option) => (
                <ChoiceButton key={option} selected={profile[question.key] === option} onSelect={() => onChoose(question.key, option)}>{option}</ChoiceButton>
              ))}
            </div>
            {question.hint && <span className="text-[12.5px] text-neutral-800">{question.hint}</span>}
          </fieldset>
        ))}
        <div>
          <label htmlFor="intake-reason" className="mb-[5px] block text-xs text-ink/70"><span className="mr-2">{questions.length + 1}</span>Why do you need this score? Optional</label>
          <TextInput id="intake-reason" value={reason} onChange={(event) => onReasonChange(event.target.value)} placeholder="e.g. master's in Toronto, starts September" />
        </div>
        <Button type="submit" variant="primary" size="lg" arrow className="min-w-[220px] self-start">Continue to interview</Button>
      </form>
    </div>
  )
}
