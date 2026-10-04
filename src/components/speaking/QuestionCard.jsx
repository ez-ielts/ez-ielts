import { Button } from '../ui/Button'
import { Kicker } from '../ui/Kicker'

// The examiner's question (and the Part 2 cue card). `speaking` shows the voice indicator and a skip control.
export function QuestionCard({ turn, index, total, speaking, onSkipAudio }) {
  return (
    <div className="flex flex-col gap-4 border-2 border-ink p-4">
      <Kicker tone="accent">Question {index + 1} of {total}</Kicker>
      <h2 className="m-0 text-[clamp(22px,3vw,30px)] leading-[1.15] font-extrabold tracking-[-.02em]">{turn.question}</h2>
      {turn.cue && (
        <div className="bg-surface p-4">
          <div className="mb-2 text-[13px] font-bold">You should say:</div>
          <ul className="m-0 flex list-disc flex-col gap-1 pl-5 text-[14px]">
            {turn.cue.map((prompt) => <li key={prompt}>{prompt}</li>)}
          </ul>
        </div>
      )}
      {speaking && (
        <div className="flex flex-wrap items-center gap-3">
          <span role="status" className="animate-pulse-soft text-[13px] font-bold text-accent-700 motion-reduce:animate-none"><span aria-hidden="true">● </span>Examiner speaking…</span>
          <Button variant="ghost" onClick={onSkipAudio}>Skip audio</Button>
        </div>
      )}
    </div>
  )
}
