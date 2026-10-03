export function AlertBand({ children, action }) {
  return (
    <div role="alert" className="flex flex-wrap items-center gap-3 border-2 border-accent bg-accent-100 p-3 text-[13px] text-accent-900">
      <span className="min-w-0 flex-[1_1_220px]">{children}</span>
      {action}
    </div>
  )
}
