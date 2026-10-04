import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { homeworkSubmitted } from '../../features/homework/homeworkSlice'
import { wordCount } from '../../features/mock/mockExamService'
import { Button } from '../ui/Button'
import { Kicker } from '../ui/Kicker'

// An assignment that has no marking yet. Open work can be submitted here (Writing with a textarea, other skills with one action).
export function AssignmentPage({ item }) {
  const dispatch = useDispatch()
  const [draft, setDraft] = useState('')
  const writing = item.skill === 'Writing'
  const open = item.status === 'todo' || item.status === 'overdue'
  const words = wordCount(draft)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Kicker tone={item.status === 'overdue' ? 'accent' : 'muted'}>{item.skill} · {item.task}{item.status === 'overdue' ? ` · overdue, due ${item.due}` : ''}</Kicker>
        <h1 className="mt-2 mb-0 text-[clamp(26px,4vw,40px)] leading-[1.05] font-extrabold tracking-[-.025em]">{item.title}</h1>
        <p className="mt-3 mb-0 text-sm text-neutral-800">{item.detail}</p>
        {item.status === 'overdue' && item.lateNote && <p className="mt-2 mb-0 text-[13px] font-semibold text-accent-700">{item.lateNote}</p>}
      </div>

      {open && writing && (
        <div className="flex flex-col gap-3">
          <label htmlFor="assignment-text" className="text-[13px] font-bold">Your response</label>
          <textarea id="assignment-text" value={draft} onChange={(event) => setDraft(event.target.value)} rows={10} className="w-full resize-y border-2 border-ink bg-surface p-3 text-[15px] leading-[1.6] focus-visible:border-accent focus-visible:outline-offset-0" />
          <div aria-live="polite" className="text-[12.5px] font-bold">{words} {words === 1 ? 'word' : 'words'}</div>
        </div>
      )}

      {open && (
        <Button variant="primary" size="lg" arrow disabled={writing && words === 0} onClick={() => dispatch(homeworkSubmitted(item.id))} className="min-w-[220px] self-start">
          {writing ? 'Submit for marking' : 'Mark as submitted'}
        </Button>
      )}

      {item.status === 'submitted' && <p role="status" className="m-0 border-2 border-ink p-4 text-[15px] font-semibold">Submitted. Marking appears here.</p>}
    </div>
  )
}
