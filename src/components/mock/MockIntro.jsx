import { mockSections } from '../../features/mock/mockConfig'
import { Button } from '../ui/Button'
import { Kicker } from '../ui/Kicker'

const rules = [
  'Each section is timed and cannot be revisited once you move on.',
  'Timings and length are shortened in this version.',
  'The result is an estimate, not an official score.',
]

export function MockIntro({ week, speakingSeconds, onStart }) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Kicker tone="accent">Checkpoint · week {week}</Kicker>
        <h1 className="mt-2 mb-3 text-[clamp(30px,4.2vw,46px)] leading-[1.02] font-extrabold tracking-[-.025em]">Checkpoint mock</h1>
        <p className="m-0 max-w-[56ch] text-sm text-neutral-800">Four sections, one per skill. Your result sets how your plan adjusts.</p>
      </div>
      <ol className="m-0 flex list-none flex-col gap-[2px] border-2 border-ink bg-ink p-0">
        {mockSections.map((section, index) => (
          <li key={section.key} className="flex flex-wrap items-center justify-between gap-2 bg-ground p-4">
            <span className="text-[15px] font-semibold"><span className="mr-3 font-bold text-accent-700">{index + 1}</span>{section.name}</span>
            <span className="text-[13px] text-neutral-800">{section.minutes ? `${section.minutes} minutes` : `Up to ${speakingSeconds} seconds`}</span>
          </li>
        ))}
      </ol>
      <ul className="m-0 flex list-none flex-col gap-1 p-0 text-[13.5px] text-neutral-800">
        {rules.map((rule) => <li key={rule}>{rule}</li>)}
      </ul>
      <Button variant="primary" size="xl" arrow onClick={onStart} className="min-w-[260px] self-start">Start the mock</Button>
    </div>
  )
}
