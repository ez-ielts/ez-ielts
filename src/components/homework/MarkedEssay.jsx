import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { selectHomeworkItem } from '../../features/homework/homeworkSlice'
import { useHomework } from '../../features/homework/useHomework'
import { examLabels } from '../../features/session/sessionSlice'
import { AlertBand } from '../ui/AlertBand'
import { Button } from '../ui/Button'
import { Kicker } from '../ui/Kicker'
import { AnnotatedEssay } from './AnnotatedEssay'
import { AssignmentPage } from './AssignmentPage'
import { CriteriaGrid } from './CriteriaGrid'

const backLink = <Link to="/homework" className="inline-flex min-h-11 items-center self-start text-sm font-bold text-accent-700 underline underline-offset-[3px]">← Homework</Link>

function Message({ children }) {
  return <main className="flex flex-col gap-4 px-[clamp(16px,4vw,40px)] py-8">{backLink}{children}</main>
}

export function MarkedEssay() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { status, retry } = useHomework()
  const item = useSelector(selectHomeworkItem(id))
  const exam = useSelector((state) => state.session.exam)

  if (status === 'failed') return <Message><AlertBand kicker="Couldn't load homework" action={<Button variant="primary" onClick={retry}>Try again</Button>}>Check your connection and try again.</AlertBand></Message>
  if (status !== 'ready') return <Message><p role="status" className="m-0 text-sm text-neutral-800">Loading…</p></Message>
  if (!item) return <Message><p className="m-0 max-w-[52ch] text-neutral-800">We could not find that assignment.</p></Message>
  if (!item.feedback) return <Message><AssignmentPage item={item} /></Message>

  const { feedback } = item
  return (
    <main className="flex flex-col gap-8 px-[clamp(16px,4vw,40px)] py-8">
      {backLink}
      <header className="flex flex-wrap items-end justify-between gap-6 border-b-2 border-ink pb-4">
        <div className="min-w-0 flex-[1_1_360px]">
          <Kicker tone="accent">{item.skill} · {item.task} · marked</Kicker>
          <h1 className="mt-2 mb-0 text-[clamp(30px,4.2vw,46px)] leading-[1.02] font-extrabold tracking-[-.025em]">{item.title}</h1>
        </div>
        <div>
          <div className="text-[66px] leading-[.85] font-extrabold tracking-[-.04em]">{feedback.score}</div>
          <div className="mt-2 text-[12.5px] text-neutral-800">Estimated score · {examLabels[exam]} · not an official result</div>
        </div>
      </header>

      <p className="m-0 bg-surface p-4 text-[13.5px]"><strong>Prompt.</strong> {feedback.prompt}</p>

      <CriteriaGrid criteria={feedback.criteria} />

      <div className="flex flex-wrap gap-x-8 gap-y-8">
        <section aria-labelledby="essay-text" className="flex min-w-0 flex-[1.6_1_380px] flex-col gap-4">
          <h2 id="essay-text" className="m-0 border-t-2 border-ink pt-6 text-[17px] font-extrabold tracking-[-.01em]">Your response</h2>
          <AnnotatedEssay paragraphs={feedback.paragraphs} />
        </section>
        <section aria-labelledby="essay-feedback" className="flex min-w-0 flex-[1_1_280px] flex-col gap-4">
          <h2 id="essay-feedback" className="m-0 border-t-2 border-ink pt-6 text-[17px] font-extrabold tracking-[-.01em]">Feedback</h2>
          <ol className="m-0 flex list-none flex-col gap-[2px] border-2 border-ink bg-ink p-0">
            {feedback.notes.map((note, index) => (
              <li key={note.text} className="bg-ground p-4">
                <Kicker spacing="normal" tone="accent">{index + 1} · {note.criterion}</Kicker>
                <p className="mt-1 mb-0 text-[13.5px]">{note.text}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <div className="flex flex-wrap items-center gap-4 border-2 border-ink p-4">
        <div className="min-w-0 flex-[1_1_260px]">
          <Kicker tone="accent">Next action</Kicker>
          <p className="mt-1 mb-0 text-[15px] font-semibold">{feedback.next.label}</p>
        </div>
        <Button variant="primary" size="lg" arrow onClick={() => navigate(feedback.next.to)}>Start</Button>
      </div>
    </main>
  )
}
