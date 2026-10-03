// Done stages are ink, the current stage is accent, upcoming stages are neutral.
export function StageStrip({ stages, current }) {
  return (
    <ol className="m-0 flex list-none flex-wrap gap-x-6 gap-y-2 border-b-2 border-ink p-0 pb-3">
      {stages.map((label, index) => {
        const state = index < current ? 'done' : index === current ? 'current' : 'todo'
        const dot = { done: 'bg-ink', current: 'bg-accent', todo: 'bg-neutral-300' }[state]
        return (
          <li key={label} aria-current={state === 'current' ? 'step' : undefined} className={`flex items-center gap-2 text-xs font-bold tracking-[.12em] uppercase ${state === 'todo' ? 'text-neutral-700' : 'text-ink'}`}>
            <span aria-hidden="true" className={`block size-2.5 ${dot}`} />
            {label}
          </li>
        )
      })}
    </ol>
  )
}
