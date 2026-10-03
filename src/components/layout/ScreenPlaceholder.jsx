import { Link } from 'react-router-dom'
import { Kicker } from '../ui/Kicker'

// Stand-in for routes the handoff defines but that are not built yet (Today, Pricing, ...).
export function ScreenPlaceholder({ title }) {
  return (
    <main className="mx-auto flex max-w-[1240px] flex-col gap-3 px-[clamp(16px,4vw,40px)] py-6">
      <Kicker>Not built yet</Kicker>
      <h1 className="m-0 text-[clamp(30px,4.2vw,46px)] leading-[1.02] font-extrabold tracking-[-.025em]">{title}</h1>
      <p className="m-0 text-neutral-800">This screen is next in the design handoff.</p>
      <Link to="/interview" className="self-start font-bold text-accent-700 underline underline-offset-[3px]">Back to your course</Link>
    </main>
  )
}
