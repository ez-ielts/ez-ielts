import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/Button'
import { Kicker } from '../ui/Kicker'

const actions = { overdue: 'Open assignment', todo: 'Open assignment', marked: 'Open marked work' }

// One assignment. The status is always text: due label for open work, the result for marked work.
export function HomeworkRow({ item }) {
  const navigate = useNavigate()
  const to = item.to ?? `/homework/${item.id}`
  const statusText = item.status === 'marked' ? item.result : item.status === 'overdue' ? `Overdue · due ${item.due}` : `Due ${item.due}`
  const marked = item.status === 'marked'

  return (
    <li className={`flex flex-wrap items-center gap-x-4 gap-y-3 border-l-4 bg-ground p-4 ${item.status === 'overdue' ? 'border-accent' : 'border-ground'}`}>
      <div className="min-w-0 flex-[1_1_260px]">
        <Kicker spacing="normal" tone={item.status === 'overdue' ? 'accent' : 'muted'}>{item.skill} · {item.task}</Kicker>
        <div className="mt-0.5 text-[15px] font-semibold">{item.title}</div>
        <div className="mt-[3px] text-[12.5px] text-neutral-800">{item.detail}</div>
        {item.lateNote && item.status === 'overdue' && <div className="mt-1 text-[12.5px] font-semibold text-accent-700">{item.lateNote}</div>}
      </div>
      <span className={`text-[13px] font-bold ${marked ? 'text-ink' : item.status === 'overdue' ? 'text-accent-700' : 'text-neutral-800'}`}>{statusText}</span>
      <Button variant={item.status === 'overdue' ? 'primary' : 'secondary'} onClick={() => navigate(to)}>{actions[item.status]}</Button>
    </li>
  )
}
