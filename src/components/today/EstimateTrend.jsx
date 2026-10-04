import { Kicker } from '../ui/Kicker'

// Six-week bar trend. Measured weeks are solid (the latest in ink); forecast weeks are hatched accent.
export function EstimateTrend({ label, score, target, mockIn, trend, measuredWeeks }) {
  const barStyle = (index) => {
    if (index >= measuredWeeks) return 'border-2 border-accent bg-[repeating-linear-gradient(135deg,var(--color-accent)_0_4px,transparent_4px_8px)]'
    if (index === measuredWeeks - 1) return 'bg-ink'
    return index === measuredWeeks - 2 ? 'bg-neutral-400' : 'bg-neutral-300'
  }
  const description = `${measuredWeeks} measured weeks, then ${trend.length - measuredWeeks} forecast weeks, rising steadily.`

  return (
    <section>
      <Kicker>{label}</Kicker>
      <div className="mt-2 flex items-end gap-3">
        <span className="text-[66px] leading-[.88] font-extrabold tracking-[-.04em]">{score}</span>
        <span className="pb-1.5 text-[12.5px] leading-[1.45] text-neutral-800">{target}<br />{mockIn}</span>
      </div>
      <div role="img" aria-label={`Score trend: ${description}`} className="mt-4 flex h-[58px] items-end gap-1 border-b-2 border-ink">
        {trend.map((height, index) => (
          <span key={index} className={`flex-1 ${barStyle(index)}`} style={{ height: `${height}%` }} />
        ))}
      </div>
      <p className="mt-2 mb-0 text-[11.5px] text-neutral-800">Solid weeks are measured from marked work; hatched is the forecast at your current pace.</p>
    </section>
  )
}
