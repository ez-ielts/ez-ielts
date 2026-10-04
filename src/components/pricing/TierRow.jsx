import { Button } from '../ui/Button'
import { Kicker } from '../ui/Kicker'

// One course level. The learner's own course is marked in text and carries the primary action.
export function TierRow({ tier, mine, current, onChoose }) {
  return (
    <li aria-current={current ? 'true' : undefined} className={`flex flex-wrap items-center gap-x-4 gap-y-3 border-l-4 bg-ground p-4 ${mine ? 'border-accent' : 'border-ground'}`}>
      <div className="min-w-0 flex-[1_1_220px]">
        {mine && <Kicker spacing="normal" tone="accent">Your course</Kicker>}
        <div className="text-[17px] font-extrabold">{tier.name}</div>
        <div className="mt-0.5 text-[12.5px] text-neutral-800">{tier.range} · one half-band · 8 weeks</div>
      </div>
      <span className="text-2xl font-extrabold tracking-[-.02em]">${tier.price}</span>
      {current
        ? <span className="inline-flex min-h-11 min-w-[150px] items-center justify-center border-2 border-ink px-3 text-[13px] font-bold">Selected</span>
        : <Button variant={mine ? 'primary' : 'secondary'} onClick={onChoose} className="min-w-[150px]">{mine ? 'Choose this course' : 'Choose'}</Button>}
    </li>
  )
}
