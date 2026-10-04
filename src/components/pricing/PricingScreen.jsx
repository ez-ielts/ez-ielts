import { useDispatch, useSelector } from 'react-redux'
import { selectPlan } from '../../features/plan/planSlice'
import { selectIntakeProfile } from '../../features/intake/intakeSlice'
import { courseTier, includedInEveryCourse, planLabel, pricingTiers } from '../../features/pricing/pricingConfig'
import { chooseTier, startTrial } from '../../features/session/sessionSlice'
import { GuaranteeConditions } from '../course/GuaranteeConditions'
import { Button } from '../ui/Button'
import { Kicker } from '../ui/Kicker'
import { TierRow } from './TierRow'

function Section({ id, title, children }) {
  return (
    <section aria-labelledby={id} className="flex flex-col gap-4">
      <h2 id={id} className="m-0 border-t-2 border-ink pt-6 text-[17px] font-extrabold tracking-[-.01em]">{title}</h2>
      {children}
    </section>
  )
}

export function PricingScreen() {
  const dispatch = useDispatch()
  const { exam, tier } = useSelector((state) => state.session)
  const plan = useSelector(selectPlan)
  const profile = useSelector(selectIntakeProfile)
  const myTier = courseTier(exam, profile.start)?.id
  const paid = tier && tier !== 'trial'

  return (
    <main className="flex flex-col gap-8 px-[clamp(16px,4vw,40px)] py-8">
      <header className="border-b-2 border-ink pb-4">
        <Kicker tone="accent">Pricing</Kicker>
        <h1 className="mt-2 mb-0 max-w-[22ch] text-[clamp(30px,4.2vw,46px)] leading-[1.02] font-extrabold tracking-[-.025em] text-pretty">One course, built for your target</h1>
        <p className="mt-3 mb-0 max-w-[56ch] text-sm text-neutral-800">Eight weeks, two checkpoint mocks. The guarantee depends on completing the assigned work.</p>
      </header>

      <div className="flex flex-wrap items-center gap-4 border-2 border-ink p-4" aria-live="polite">
        <div className="min-w-0 flex-[1_1_280px]">
          <Kicker spacing="normal" tone="accent">Your status</Kicker>
          <p className="mt-1 mb-0 text-[15px] font-semibold">
            {!tier && 'Start your 7-day free trial'}
            {tier === 'trial' && 'Your free trial is active'}
            {paid && `You are on ${planLabel(tier, exam)}`}
          </p>
          {paid && <p className="mt-1 mb-0 text-[12.5px] text-neutral-800">Course selected. Checkout opens here once payments are connected.</p>}
        </div>
        {!tier && <Button variant="primary" size="lg" arrow onClick={() => dispatch(startTrial())} className="min-w-[220px]">Start 7-day free trial</Button>}
      </div>

      <Section id="pricing-courses" title="Courses">
        <ul className="m-0 flex list-none flex-col gap-[2px] border-2 border-ink bg-ink p-0">
          {pricingTiers[exam].map((entry) => (
            <TierRow key={entry.id} tier={entry} mine={entry.id === myTier} current={tier === entry.id} onChoose={() => dispatch(chooseTier(entry.id))} />
          ))}
        </ul>
      </Section>

      <Section id="pricing-included" title="Included in every course">
        <dl className="m-0 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-[2px] border-2 border-ink bg-ink">
          {includedInEveryCourse.map((item) => (
            <div key={item.label} className="bg-ground p-4">
              <dt><Kicker spacing="normal">{item.label}</Kicker></dt>
              <dd className="m-0 mt-1 text-[15px] font-bold">{item.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <GuaranteeConditions target={plan.target} />
    </main>
  )
}
