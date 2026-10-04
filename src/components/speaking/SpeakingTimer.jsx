import { formatClock } from '../../features/speaking/useCountdown'

export function SpeakingTimer({ seconds, label }) {
  return (
    <div className="flex items-baseline gap-3">
      <span role="timer" aria-label={label} className="text-[44px] leading-none font-extrabold tracking-[-.04em] tabular-nums">{formatClock(seconds)}</span>
      <span className="text-[12.5px] text-neutral-800">{label}</span>
    </div>
  )
}
