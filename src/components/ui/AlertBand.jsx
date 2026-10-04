// `alert` announces the band to screen readers (errors); turn it off for standing notices such as overdue work.
export function AlertBand({ kicker, children, action, alert = true }) {
  return (
    <div role={alert ? 'alert' : undefined} className="flex flex-wrap items-center gap-3 border-2 border-accent bg-accent-100 p-3 text-[13px] text-accent-900">
      {kicker && <span className="text-[11px] font-semibold tracking-[.15em] text-accent-800 uppercase">{kicker}</span>}
      <span className="min-w-0 flex-[1_1_200px]">{children}</span>
      {action}
    </div>
  )
}
