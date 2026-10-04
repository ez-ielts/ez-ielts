import { Link } from 'react-router-dom'
import { Kicker } from '../ui/Kicker'

const statusLabels = { done: 'Done', current: 'This week', upcoming: 'Upcoming' }

// weeks: [{ title, focus, checkpoint }]. With `currentWeek`, every week also shows a text status;
// `checkpointTo(weekNumber)` makes checkpoint weeks link to their mock.
export function WeekList({ weeks, currentWeek, checkpointTo }) {
  const tracked = currentWeek !== undefined
  return (
    <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4 p-0">
      {weeks.map((week, index) => {
        const number = index + 1
        const status = number < currentWeek ? 'done' : number === currentWeek ? 'current' : 'upcoming'
        return (
          <li
            key={week.title}
            aria-current={tracked && status === 'current' ? 'step' : undefined}
            className={`border-t-4 pt-2 ${week.checkpoint ? 'border-accent' : 'border-ink'} ${tracked && status === 'current' ? 'bg-surface px-2 pb-2' : ''}`}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <Kicker spacing="normal">Week {number}</Kicker>
              {tracked && <span className="text-[11px] font-bold tracking-[.12em] text-neutral-800 uppercase">{status === 'done' && <span aria-hidden="true">✓ </span>}{statusLabels[status]}</span>}
            </div>
            <div className="mt-0.5 text-[15px] font-bold">{week.title}</div>
            <div className="mt-0.5 text-[12.5px] text-neutral-800">{week.focus}</div>
            {week.checkpoint && checkpointTo && (
              <Link to={checkpointTo(number)} className="mt-2 inline-flex min-h-11 items-center text-[13px] font-bold text-accent-700 underline underline-offset-[3px]">Checkpoint mock</Link>
            )}
          </li>
        )
      })}
    </ol>
  )
}
