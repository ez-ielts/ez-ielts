import { Link } from 'react-router-dom'
import { examLabels } from '../../features/session/sessionSlice'
import { Button } from '../ui/Button'
import { Kicker } from '../ui/Kicker'

// result: { overall, skills: [{ key, name, band, evidence }], pace, week, cap, adjustments }. An estimate, never a promise.
export function MockResult({ result, exam, onPlan, onToday }) {
  const compare = result.overall >= result.pace ? 'at or above' : 'below'

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-wrap items-end justify-between gap-6 border-b-2 border-ink pb-4">
        <div className="min-w-0 flex-[1_1_320px]">
          <Kicker tone="accent">Checkpoint · week {result.week} · result</Kicker>
          <h1 className="mt-2 mb-0 text-[clamp(30px,4.2vw,46px)] leading-[1.02] font-extrabold tracking-[-.025em]">Your checkpoint mock</h1>
          <p className="mt-3 mb-0 max-w-[52ch] text-sm text-neutral-800">Your overall estimate is {compare} the {result.pace} pace for week {result.week}.</p>
        </div>
        <div>
          <div className="text-[66px] leading-[.85] font-extrabold tracking-[-.04em]">{result.overall}</div>
          <div className="mt-2 text-[12.5px] text-neutral-800">Estimated score · {examLabels[exam]} · not an official result</div>
        </div>
      </header>

      <dl className="m-0 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-[2px] border-2 border-ink bg-ink">
        {result.skills.map((skill) => (
          <div key={skill.key} className="bg-ground p-4">
            <dt><Kicker spacing="normal">{skill.name}</Kicker></dt>
            <dd className="m-0 mt-2 text-[34px] leading-none font-extrabold tracking-[-.03em]">{skill.band}</dd>
            <dd className="m-0 mt-2 text-[12.5px] text-neutral-800">{skill.evidence}</dd>
          </div>
        ))}
      </dl>
      <p className="m-0 text-[12.5px] text-neutral-800">This is a short mock, so Listening and Reading bands are capped at {result.cap}.</p>

      <section aria-labelledby="mock-adjustments" className="flex flex-col gap-4">
        <h2 id="mock-adjustments" className="m-0 border-t-2 border-ink pt-6 text-[17px] font-extrabold tracking-[-.01em]">Plan adjustments</h2>
        <dl className="m-0 grid gap-[2px] border-2 border-ink bg-ink">
          {result.adjustments.map((adjustment) => (
            <div key={adjustment.id} className="bg-ground p-4">
              <dt className="text-[15px] font-bold">{adjustment.title}</dt>
              <dd className="m-0 mt-0.5 text-[12.5px] text-neutral-800">{adjustment.detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="flex flex-wrap gap-2">
        <Button variant="primary" size="lg" arrow onClick={onPlan} className="min-w-[200px]">See your plan</Button>
        <Button size="lg" onClick={onToday}>Back to Today</Button>
        <Link to="/homework" className="inline-flex min-h-12 items-center px-1 text-sm font-bold text-accent-700 underline underline-offset-[3px]">Homework</Link>
      </div>
    </div>
  )
}
