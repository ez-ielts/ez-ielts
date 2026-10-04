import { onboardingStages } from '../../features/intake/intakeConfig'
import { AccountPanel } from '../auth/AccountPanel'
import { Kicker } from '../ui/Kicker'
import { StageStrip } from '../ui/StageStrip'
import { ExamChoice } from './ExamChoice'

const facts = [
  'Your starting level is an estimate, not a certified result. A full mock exam confirms it.',
  'Every task maps to a skill of your chosen exam. Nothing else.',
  'Your plan changes when your evidence changes. If you complete the assigned work, we adjust the course until you are ready.',
]

// First page (`/`): choose the exam, then create an account or sign in. See design/sign-up.md.
export function WelcomeScreen() {
  return (
    <main className="flex flex-col gap-6 px-[clamp(16px,4vw,40px)] py-6">
      <StageStrip stages={onboardingStages} current={0} />
      <div className="flex flex-wrap gap-x-[clamp(24px,5vw,64px)] gap-y-8">
        <section className="flex min-w-0 flex-[1_1_320px] flex-col gap-6">
          <div>
            <Kicker tone="accent">Start here</Kicker>
            <h1 className="mt-2 mb-3 text-[clamp(28px,4.2vw,46px)] leading-[1.02] font-extrabold tracking-[-.025em]">From unsure to exam&#8209;ready.</h1>
            <p className="m-0 max-w-[460px] text-neutral-800">We start with where you are, then build the shortest honest path to your target band.</p>
          </div>
          <ExamChoice />
          <ul className="m-0 flex list-none flex-col gap-[2px] border-2 border-ink bg-ink p-0">
            {facts.map((fact) => <li key={fact} className="bg-ground p-3 text-[13px] text-neutral-800">{fact}</li>)}
          </ul>
        </section>
        <section aria-label="Account" className="min-w-0 flex-[1_1_360px]">
          <AccountPanel />
        </section>
      </div>
    </main>
  )
}
