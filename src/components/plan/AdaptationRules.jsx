const rules = [
  ['Missed or late work', 'Overdue sessions or homework shorten the next week and move the missed practice forward. A second late submission voids the guarantee.'],
  ['A weak checkpoint mock', 'A checkpoint below the pace for your target adds focused weeks on the weakest skill before the final mock.'],
  ['Repeated errors', 'The same error across several pieces of work enters your drill queue until it stops appearing.'],
]

export function AdaptationRules() {
  return (
    <dl className="m-0 grid gap-[2px] border-2 border-ink bg-ink">
      {rules.map(([title, body]) => (
        <div key={title} className="bg-ground p-4">
          <dt className="text-[15px] font-bold">{title}</dt>
          <dd className="m-0 mt-0.5 text-[12.5px] text-neutral-800">{body}</dd>
        </div>
      ))}
    </dl>
  )
}
