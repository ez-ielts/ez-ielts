import { Button } from '../ui/Button'
import { ChoiceQuestion } from '../ui/ChoiceQuestion'
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
          <ChoiceQuestion key={question.key} number={index + 1} label={question.label} options={question.options} value={profile[question.key]} hint={question.hint} onChoose={(value) => onChoose(question.key, value)} />
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
