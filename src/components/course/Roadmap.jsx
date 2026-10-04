import { Kicker } from '../ui/Kicker'

// The chain of courses from the start estimate to the learner's goal. A course takes the learner up one half-band;
// the stages after the first start from the result of the one before. Hidden when the goal is the first stage only.
export function Roadmap({ goal, stages }) {
  if (stages.length < 2) return null

  return (
    <section aria-labelledby="roadmap-title" className="flex flex-col gap-3">
      <h2 id="roadmap-title" className="m-0 text-[17px] font-extrabold tracking-[-.01em]">Your path to {goal}</h2>
      <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4 p-0">
        {stages.map((stage, index) => {
          const first = index === 0
          const last = index === stages.length - 1
          return (
            <li key={stage.from} aria-current={first ? 'step' : undefined} className={`border-t-4 pt-2 ${first ? 'border-accent' : 'border-ink'}`}>
              <Kicker spacing="normal" tone={first ? 'accent' : 'muted'}>Course {index + 1}{first ? ' · this course' : ' · next'}</Kicker>
              <div className="mt-0.5 text-[22px] font-extrabold tracking-[-.02em]">{stage.from} → {stage.to}</div>
              <div className="mt-0.5 text-[12.5px] text-neutral-800">{last ? 'Reaches your goal' : first ? 'Starts from your placement estimate' : 'Starts from your result'}</div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
