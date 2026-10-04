import { examLabels } from '../../features/session/sessionSlice'
import { Button } from '../ui/Button'
import { ChoiceQuestion } from '../ui/ChoiceQuestion'
import { Kicker } from '../ui/Kicker'

// result: { start, clamped, overall, skills: [{ key, name, band, evidence }], cap, options }. An estimate the learner can adjust by one half-band.
export function PlacementResult({ result, exam, chosenStart, onChoose, onConfirm }) {
  const near = result.options.filter((option) => Math.abs(Number(option) - Number(result.start)) <= 0.5)
  const first = result.options[0]
  const last = result.options.at(-1)

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-wrap items-end justify-between gap-6 border-b-2 border-ink pb-4">
        <div className="min-w-0 flex-[1_1_320px]">
          <Kicker tone="accent">Placement · result</Kicker>
          <h1 className="mt-2 mb-0 text-[clamp(30px,4.2vw,46px)] leading-[1.02] font-extrabold tracking-[-.025em]">Your starting estimate</h1>
          <p className="mt-3 mb-0 max-w-[52ch] text-sm text-neutral-800">Your course is built from this level, one half-band at a time.</p>
        </div>
        <div>
          <div className="text-[66px] leading-[.85] font-extrabold tracking-[-.04em]">{result.start}</div>
          <div className="mt-2 text-[12.5px] text-neutral-800">Estimate · {examLabels[exam]} · not an official result</div>
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
      <p className="m-0 text-[12.5px] text-neutral-800">
        This is a short test, so Listening and Reading bands are capped at {result.cap}.
        {result.clamped && ` Your overall result was ${result.overall}. Courses currently start between ${first} and ${last}, so your start is ${result.start}.`}
      </p>

      <ChoiceQuestion ruled label="Confirm your starting level" options={near} value={chosenStart} hint="You can change this. A full mock exam confirms your level." onChoose={onChoose} />

      <Button variant="primary" size="xl" arrow onClick={onConfirm} className="min-w-[260px] self-start">Start my course</Button>
    </div>
  )
}
