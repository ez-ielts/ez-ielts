import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { selectOverdueItem } from '../../features/homework/homeworkSlice'
import { useHomework } from '../../features/homework/useHomework'
import { measuredWeeks, todayContent } from '../../features/today/todayConfig'
import { selectPlan } from '../../features/plan/planSlice'
import { advanceSession, completeStep, dayStarted, SESSION_STEPS, todayKey } from '../../features/today/todaySlice'
import { AlertBand } from '../ui/AlertBand'
import { Button } from '../ui/Button'
import { Kicker } from '../ui/Kicker'
import { MarkedWorkCards } from './MarkedWorkCards'
import { SessionSteps } from './SessionSteps'
import { TodayAside } from './TodayAside'

function sessionLabels(stepsDone) {
  if (stepsDone >= SESSION_STEPS) return { start: 'Session complete', progress: 'All three parts done · homework set' }
  return { start: stepsDone ? 'Continue session' : 'Start session', progress: `${stepsDone} of ${SESSION_STEPS} done · autosaves as you go` }
}

export function TodayScreen() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const exam = useSelector((state) => state.session.exam)
  const stepsDone = useSelector((state) => state.today.stepsDone)
  useHomework()
  const overdue = useSelector(selectOverdueItem)
  const plan = useSelector(selectPlan)
  const content = todayContent[exam]
  const labels = sessionLabels(stepsDone)
  const days = parseInt(plan.days, 10)
  const dayLabel = stepsDone >= SESSION_STEPS
    ? `Session complete · up next: week ${plan.currentWeek}, session ${plan.weekSessions + 1} of ${days}`
    : `Week ${plan.currentWeek} · session ${plan.weekSessions + 1} of ${days}`

  // A new calendar day starts a new session.
  useEffect(() => { dispatch(dayStarted(todayKey())) }, [dispatch])

  return (
    <div className="flex flex-wrap items-start gap-x-8">
      <main className="flex min-w-0 flex-[1.85_1_420px] flex-col gap-8 px-[clamp(16px,3vw,24px)] py-8">
        <header className="flex flex-wrap items-end justify-between gap-6 border-b-2 border-ink pb-4">
          <div className="flex-[1_1_320px]">
            <Kicker tone="accent">{dayLabel}</Kicker>
            <h1 className="mt-3 mb-0 text-[clamp(30px,4.2vw,46px)] leading-[1.02] font-extrabold tracking-[-.025em] text-pretty">{content.title}</h1>
            <p className="mt-3 mb-0 max-w-[52ch] text-sm leading-[1.55] text-neutral-800">{content.lede}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="primary" size="lg" arrow onClick={() => dispatch(advanceSession())} disabled={stepsDone >= SESSION_STEPS} className="min-w-[170px]">{labels.start}</Button>
            <Button variant="ghost" size="lg" onClick={() => navigate('/plan')}>Reschedule</Button>
          </div>
        </header>

        <section aria-labelledby="today-session" className="flex flex-col gap-4">
          <div className="flex items-baseline justify-between gap-4">
            <h2 id="today-session" className="m-0 text-[17px] font-extrabold tracking-[-.01em]">Today's session</h2>
            <span aria-live="polite" className="text-xs text-neutral-800">{labels.progress}</span>
          </div>
          <SessionSteps steps={content.steps} stepsDone={stepsDone} onCompleteStep={(index) => dispatch(completeStep(index))} />
          {overdue && (
            <AlertBand alert={false} kicker="Overdue" action={<Button variant="primary" onClick={() => navigate('/homework')}>Open assignment</Button>}>
              {overdue.task} {overdue.title.toLowerCase()} from {overdue.due}. {overdue.lateNote}
            </AlertBand>
          )}
        </section>

        <section aria-labelledby="today-marked" className="flex flex-col gap-4">
          <div className="flex items-baseline justify-between gap-4 border-t-2 border-ink pt-6">
            <h2 id="today-marked" className="m-0 text-[17px] font-extrabold tracking-[-.01em]">Marked while you were away</h2>
            <Link to="/homework" className="text-[12.5px] font-semibold text-accent-700 no-underline hover:underline">All homework</Link>
          </div>
          <MarkedWorkCards items={content.marked} />
        </section>
      </main>

      <TodayAside content={content} measuredWeeks={measuredWeeks} onSpeaking={() => navigate(content.speakingRoute)} onTutor={() => navigate('/tutor')} />
    </div>
  )
}
