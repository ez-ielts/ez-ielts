import { useCountdown } from '../../lib/useCountdown'
import { Button } from '../ui/Button'
import { Kicker } from '../ui/Kicker'
import { SpeakingTimer } from '../speaking/SpeakingTimer'

// Frame for a timed section. Mount with key={sectionIndex} so each section gets its own clock. `minutes: null` has no section timer.
export function SectionShell({ section, index, total, onFinish, children }) {
  const remaining = useCountdown(section.minutes ? section.minutes * 60 : 0, { running: Boolean(section.minutes), onDone: onFinish })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-ink pb-4">
        <div>
          <Kicker tone="accent">Section {index + 1} of {total}</Kicker>
          <h1 className="mt-2 mb-0 text-[clamp(30px,4.2vw,46px)] leading-[1.02] font-extrabold tracking-[-.025em]">{section.name}</h1>
        </div>
        {section.minutes && <SpeakingTimer seconds={remaining} label="Section time left" />}
      </div>
      {children}
      {section.minutes && <Button variant="primary" size="lg" arrow onClick={onFinish} className="min-w-[220px] self-start">Finish section</Button>}
    </div>
  )
}
