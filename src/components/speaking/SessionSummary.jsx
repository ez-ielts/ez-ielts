import { Button } from '../ui/Button'
import { Kicker } from '../ui/Kicker'

// turns: evidence records. No score or band is shown: practice only records evidence.
export function SessionSummary({ practice, turns, onBack, onRetry }) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Kicker tone="accent">Practice complete</Kicker>
        <h1 className="mt-2 mb-3 text-[clamp(30px,4.2vw,46px)] leading-[1.02] font-extrabold tracking-[-.025em]">{practice.title}</h1>
        <p className="m-0 max-w-[56ch] text-sm text-neutral-800">{turns.length} {turns.length === 1 ? 'answer' : 'answers'} recorded as evidence. No score is shown during practice; your next marked work builds on it.</p>
      </div>
      <ol className="m-0 flex list-none flex-col gap-[2px] border-2 border-ink bg-ink p-0">
        {turns.map((turn, index) => (
          <li key={turn.question} className="flex flex-col gap-1 bg-ground p-4">
            <Kicker spacing="normal">Question {index + 1} · {turn.duration_seconds} seconds · {turn.words} {turn.words === 1 ? 'word' : 'words'}</Kicker>
            <div className="text-[15px] font-semibold">{turn.question}</div>
            <p className="m-0 text-[13.5px] text-neutral-800">{turn.transcript_excerpt || '(No speech was captured for this answer.)'}</p>
          </li>
        ))}
      </ol>
      <div className="flex flex-wrap gap-2">
        <Button variant="primary" size="lg" arrow onClick={onBack} className="min-w-[200px]">Back to Today</Button>
        <Button size="lg" onClick={onRetry}>Practise again</Button>
      </div>
    </div>
  )
}
