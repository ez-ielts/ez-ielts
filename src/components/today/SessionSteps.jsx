import { Button } from '../ui/Button'

// Ruled list of the day's steps. The current step gets the accent rule and number chip; done steps strike through with ✓.
export function SessionSteps({ steps, stepsDone, onCompleteStep }) {
  return (
    <ol className="m-0 flex list-none flex-col gap-[2px] border-2 border-ink bg-ink p-0">
      {steps.map((step, index) => {
        const done = index < stepsDone
        const current = index === stepsDone
        const chip = current ? 'border-accent bg-accent text-ground' : done ? 'border-ink bg-ink text-ground' : 'border-ink bg-ground text-ink'
        return (
          <li key={step.title} aria-current={current ? 'step' : undefined} className={`flex flex-wrap items-center gap-x-4 gap-y-3 border-l-4 bg-ground p-4 ${current ? 'border-accent' : 'border-ground'}`}>
            <span className={`grid size-[30px] place-items-center border-2 text-[13px] font-bold ${chip}`}>
              {done ? <><span aria-hidden="true">✓</span><span className="sr-only">Done:</span></> : index + 1}
            </span>
            <span className="min-w-0 flex-[1_1_240px]">
              <span className={`block text-[15px] font-semibold ${done ? 'line-through' : ''}`}>{step.title}</span>
              <span className="mt-[3px] block text-[12.5px] text-neutral-800">{step.sub}</span>
            </span>
            <span className="ml-auto flex items-center gap-3">
              <span className="text-xs text-neutral-800">{step.minutes}</span>
              {current && <Button variant="primary" onClick={() => onCompleteStep(index)}>{index === 0 ? 'Begin' : 'Mark done'}</Button>}
            </span>
          </li>
        )
      })}
    </ol>
  )
}
