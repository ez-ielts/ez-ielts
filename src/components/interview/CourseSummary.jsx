import { Button } from '../ui/Button'
import { Kicker } from '../ui/Kicker'

// facts: [{ label, value, note }]; weeks: [{ title, focus, checkpoint }]
export function CourseSummary({ courseName, start, target, facts, weeks, onStartTrial, onSeePricing }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end gap-6 border-b-2 border-ink pb-4">
        <div className="min-w-0 flex-[1_1_360px]">
          <Kicker tone="accent">Your course · {courseName}</Kicker>
          <h1 className="mt-2 mb-0 text-[clamp(32px,5vw,60px)] leading-[.98] font-extrabold tracking-[-.03em]">{start} to {target} in 8 weeks</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="primary" size="lg" arrow onClick={onStartTrial} className="min-w-[200px]">Start 7-day free trial</Button>
          <Button size="lg" onClick={onSeePricing}>See course price</Button>
        </div>
      </div>

      <dl className="m-0 grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-[2px] border-2 border-ink bg-ink">
        {facts.map((fact) => (
          <div key={fact.label} className="bg-ground p-4">
            <dt><Kicker spacing="normal">{fact.label}</Kicker></dt>
            <dd className="m-0 mt-2 text-2xl font-extrabold">{fact.value}</dd>
            <dd className="m-0 mt-0.5 text-[12.5px] text-neutral-800">{fact.note}</dd>
          </div>
        ))}
      </dl>

      <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4 p-0">
        {weeks.map((week, index) => (
          <li key={week.title} className={`border-t-4 pt-2 ${week.checkpoint ? 'border-accent' : 'border-ink'}`}>
            <Kicker spacing="normal">Week {index + 1}</Kicker>
            <div className="mt-0.5 text-[15px] font-bold">{week.title}</div>
            <div className="mt-0.5 text-[12.5px] text-neutral-800">{week.focus}</div>
          </li>
        ))}
      </ol>

      <div className="flex flex-col gap-2 border-2 border-ink p-4 text-[13.5px] leading-[1.55]">
        <Kicker tone="accent">Band guarantee · conditions</Kicker>
        <p className="m-0">Complete every assigned session and homework, with no more than one late submission, and sit both checkpoint mocks. If your final mock is below {target}, we extend the course free until it isn't.</p>
      </div>
    </div>
  )
}
