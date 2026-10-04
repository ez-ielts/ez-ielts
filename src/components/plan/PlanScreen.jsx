import { useSelector } from 'react-redux'
import { selectPlan } from '../../features/plan/planSlice'
import { GuaranteeConditions } from '../course/GuaranteeConditions'
import { WeekList } from '../course/WeekList'
import { Kicker } from '../ui/Kicker'
import { AdaptationRules } from './AdaptationRules'
import { ScheduleEditor } from './ScheduleEditor'

function Section({ id, title, children }) {
  return (
    <section aria-labelledby={id} className="flex flex-col gap-4">
      <h2 id={id} className="m-0 border-t-2 border-ink pt-6 text-[17px] font-extrabold tracking-[-.01em]">{title}</h2>
      {children}
    </section>
  )
}

export function PlanScreen() {
  const plan = useSelector(selectPlan)
  const nextCheckpoint = plan.weeks.findIndex((week, index) => week.checkpoint && index + 1 >= plan.currentWeek) + 1
  const facts = [
    { label: 'This week', value: `${plan.currentWeek} of ${plan.totalWeeks}`, note: nextCheckpoint ? `next checkpoint: week ${nextCheckpoint}` : 'course complete' },
    { label: 'Daily session', value: plan.mins, note: 'lesson, practice, drill' },
    { label: 'Days per week', value: plan.days, note: `about ${plan.hours} hours in total` },
    { label: 'Exam date', value: plan.date, note: 'change it below' },
  ]

  return (
    <main className="flex flex-col gap-8 px-[clamp(16px,4vw,40px)] py-8">
      <header className="border-b-2 border-ink pb-4">
        <Kicker tone="accent">Your course · {plan.course}</Kicker>
        <h1 className="mt-2 mb-0 text-[clamp(30px,4.2vw,46px)] leading-[1.02] font-extrabold tracking-[-.025em]">{plan.start} to {plan.target} in {plan.totalWeeks} weeks</h1>
      </header>

      <dl className="m-0 grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-[2px] border-2 border-ink bg-ink">
        {facts.map((fact) => (
          <div key={fact.label} className="bg-ground p-4">
            <dt><Kicker spacing="normal">{fact.label}</Kicker></dt>
            <dd className="m-0 mt-2 text-2xl font-extrabold">{fact.value}</dd>
            <dd className="m-0 mt-0.5 text-[12.5px] text-neutral-800">{fact.note}</dd>
          </div>
        ))}
      </dl>

      <Section id="plan-weeks" title="Course weeks">
        <WeekList weeks={plan.weeks} currentWeek={plan.currentWeek} checkpointTo={(week) => `/mock/week-${week}`} />
      </Section>

      <div className="flex flex-wrap gap-x-8 gap-y-8">
        <div className="min-w-0 flex-[1_1_380px]">
          <Section id="plan-schedule" title="Study schedule"><ScheduleEditor /></Section>
        </div>
        <div className="min-w-0 flex-[1_1_320px]">
          <Section id="plan-adapts" title="How your plan adapts"><AdaptationRules /></Section>
        </div>
      </div>

      <GuaranteeConditions target={plan.target} />
    </main>
  )
}
