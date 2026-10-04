import { Kicker } from '../ui/Kicker'

// criteria: [{ name, band, comment }]. Ruled grid, one cell per marking criterion.
export function CriteriaGrid({ criteria }) {
  return (
    <dl className="m-0 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-[2px] border-2 border-ink bg-ink">
      {criteria.map((criterion) => (
        <div key={criterion.name} className="bg-ground p-4">
          <dt><Kicker spacing="normal">{criterion.name}</Kicker></dt>
          <dd className="m-0 mt-2 text-[34px] leading-none font-extrabold tracking-[-.03em]">{criterion.band}</dd>
          <dd className="m-0 mt-2 text-[12.5px] text-neutral-800">{criterion.comment}</dd>
        </div>
      ))}
    </dl>
  )
}
