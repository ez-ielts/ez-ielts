import { useSelector } from 'react-redux'
import { selectHomeworkGroups } from '../../features/homework/homeworkSlice'
import { useHomework } from '../../features/homework/useHomework'
import { AlertBand } from '../ui/AlertBand'
import { Button } from '../ui/Button'
import { Kicker } from '../ui/Kicker'
import { HomeworkRow } from './HomeworkRow'

export function HomeworkScreen() {
  const { status, retry } = useHomework()
  const groups = useSelector(selectHomeworkGroups)
  const count = (key) => groups.find((group) => group.status === key)?.items.length ?? 0

  return (
    <main className="flex flex-col gap-8 px-[clamp(16px,4vw,40px)] py-8">
      <header className="border-b-2 border-ink pb-4">
        <Kicker tone="accent">Homework</Kicker>
        <h1 className="mt-2 mb-0 text-[clamp(30px,4.2vw,46px)] leading-[1.02] font-extrabold tracking-[-.025em]">What's due and what's marked</h1>
        {status === 'ready' && groups.length > 0 && <p className="mt-3 mb-0 text-sm text-neutral-800">{count('overdue')} overdue · {count('todo')} to do · {count('submitted')} submitted · {count('marked')} marked</p>}
      </header>

      {status === 'failed' && <AlertBand kicker="Couldn't load homework" action={<Button variant="primary" onClick={retry}>Try again</Button>}>Check your connection and try again.</AlertBand>}
      {(status === 'loading' || status === 'idle') && <p role="status" className="m-0 text-sm text-neutral-800">Loading homework…</p>}
      {status === 'ready' && groups.length === 0 && <p className="m-0 text-sm text-neutral-800">Nothing assigned yet. Your next session sets the first homework.</p>}

      {status === 'ready' && groups.map((group) => (
        <section key={group.status} aria-labelledby={`hw-${group.status}`} className="flex flex-col gap-3">
          <h2 id={`hw-${group.status}`} className="m-0 text-[17px] font-extrabold tracking-[-.01em]">{group.title}</h2>
          <ul className="m-0 flex list-none flex-col gap-[2px] border-2 border-ink bg-ink p-0">
            {group.items.map((item) => <HomeworkRow key={item.id} item={item} />)}
          </ul>
        </section>
      ))}
    </main>
  )
}
