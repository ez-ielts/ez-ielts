import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { courseTarget } from '../../features/intake/intakeConfig'
import { selectLateSubmissions } from '../../features/homework/homeworkSlice'
import { useHomework } from '../../features/homework/useHomework'
import { startNextCourse } from '../../features/plan/courseProgress'
import { selectPlan } from '../../features/plan/planSlice'
import { selectActiveAdjustments } from '../../features/plan/planSelectors'
import { GuaranteeConditions } from '../course/GuaranteeConditions'
import { Roadmap } from '../course/Roadmap'
import { WeekList } from '../course/WeekList'
import { Kicker } from '../ui/Kicker'
import { AdaptationRules } from './AdaptationRules'
import { CourseComplete } from './CourseComplete'
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
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useHomework()
  const plan = useSelector(selectPlan)
  const adjustments = useSelector(selectActiveAdjustments)
  const lateSubmissions = useSelector(selectLateSubmissions)
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

      {plan.completed && (
        <CourseComplete
          overall={plan.completed.overall}
          target={plan.target}
          nextStart={plan.completed.overall.toFixed(1)}
          nextTarget={courseTarget(plan.completed.overall.toFixed(1))}
          onNextCourse={() => dispatch(startNextCourse())}
          onRetake={() => navigate(`/mock/week-${plan.totalWeeks}`)}
        />
      )}

      <dl className="m-0 grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-[2px] border-2 border-ink bg-ink">
        {facts.map((fact) => (
          <div key={fact.label} className="bg-ground p-4">
            <dt><Kicker spacing="normal">{fact.label}</Kicker></dt>
            <dd className="m-0 mt-2 text-2xl font-extrabold">{fact.value}</dd>
            <dd className="m-0 mt-0.5 text-[12.5px] text-neutral-800">{fact.note}</dd>
          </div>
        ))}
      </dl>

      <Roadmap goal={plan.goal} stages={plan.stages} />

      <Section id="plan-weeks" title="Course weeks">
        <WeekList weeks={plan.weeks} currentWeek={plan.currentWeek} checkpointTo={(week) => `/mock/week-${week}`} checkpointResults={plan.checkpoints} />
      </Section>

      {adjustments.length > 0 && (
        <Section id="plan-adjustments" title="Plan adjustments">
          <dl className="m-0 grid gap-[2px] border-2 border-ink bg-ink">
            {adjustments.map((adjustment) => (
              <div key={adjustment.id} className="bg-ground p-4">
                <dt className="text-[15px] font-bold">{adjustment.title}</dt>
                <dd className="m-0 mt-0.5 text-[12.5px] text-neutral-800">{adjustment.detail}</dd>
              </div>
            ))}
          </dl>
        </Section>
      )}

      <div className="flex flex-wrap gap-x-8 gap-y-8">
        <div className="min-w-0 flex-[1_1_380px]">
          <Section id="plan-schedule" title="Study schedule"><ScheduleEditor /></Section>
        </div>
        <div className="min-w-0 flex-[1_1_320px]">
          <Section id="plan-adapts" title="How your plan adapts"><AdaptationRules /></Section>
        </div>
      </div>

      <GuaranteeConditions target={plan.target} />
      <p className="m-0 text-[13px] font-bold">Late submissions: {lateSubmissions} (one is allowed){lateSubmissions > 1 ? '. The guarantee no longer applies to this course.' : ''}</p>
    </main>
  )
}
