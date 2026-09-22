export function InterviewTimer({ seconds, label }) {
  if (!seconds) return <div className="rounded bg-[#f1eee2] px-3 py-2 text-[8px] font-bold tracking-[1px] text-[#837c54]">{label}</div>
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0')
  const remaining = (seconds % 60).toString().padStart(2, '0')
  return <div className="flex items-center gap-2 rounded bg-[#f1eee2] px-3 py-2 text-[#837c54]"><span className="text-[8px] font-bold tracking-[1px]">{label}</span><strong className="font-mono text-sm font-medium">{minutes}:{remaining}</strong></div>
}
