import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { planLabel } from '../../features/pricing/pricingConfig'
import { Kicker } from '../ui/Kicker'
import { ScheduleEditor } from '../plan/ScheduleEditor'
import { AccountSection } from './AccountSection'
import { ExamSetting } from './ExamSetting'
import { ReminderSettings } from './ReminderSettings'

function Section({ id, title, children }) {
  return (
    <section aria-labelledby={id} className="flex flex-col gap-4">
      <h2 id={id} className="m-0 border-t-2 border-ink pt-6 text-[17px] font-extrabold tracking-[-.01em]">{title}</h2>
      {children}
    </section>
  )
}

export function SettingsScreen() {
  const { exam, tier } = useSelector((state) => state.session)

  return (
    <main className="flex max-w-[760px] flex-col gap-8 px-[clamp(16px,4vw,40px)] py-8">
      <header className="border-b-2 border-ink pb-4">
        <Kicker tone="accent">Settings</Kicker>
        <h1 className="mt-2 mb-0 text-[clamp(30px,4.2vw,46px)] leading-[1.02] font-extrabold tracking-[-.025em]">Your account and study settings</h1>
      </header>
      <Section id="set-account" title="Account"><AccountSection /></Section>
      <Section id="set-plan" title="Plan">
        <p className="m-0 text-[15px]"><strong>{planLabel(tier, exam)}</strong> · <Link to="/pricing" className="font-bold text-accent-700 underline underline-offset-[3px]">See pricing</Link></p>
      </Section>
      <Section id="set-exam" title="Exam"><ExamSetting /></Section>
      <Section id="set-schedule" title="Study schedule"><ScheduleEditor /></Section>
      <Section id="set-reminders" title="Email reminders"><ReminderSettings /></Section>
    </main>
  )
}
