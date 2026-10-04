import { useId } from 'react'

// Switch with a text On/Off label (never colour alone). `label` is the accessible name; `note` is supporting text.
export function Toggle({ checked, onToggle, label, note }) {
  const labelId = useId()
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 bg-ground p-4">
      <div className="min-w-0 flex-[1_1_240px]">
        <div id={labelId} className="text-[15px] font-semibold">{label}</div>
        {note && <div className="mt-[3px] text-[12.5px] text-neutral-800">{note}</div>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={labelId}
        onClick={onToggle}
        className={`inline-flex min-h-11 min-w-[88px] items-center justify-center gap-2 border-2 border-ink px-3 text-[13px] font-bold ${checked ? 'bg-ink text-ground' : 'bg-ground text-ink hover:bg-ink/7'}`}
      >
        <span aria-hidden="true" className={`block size-2.5 ${checked ? 'bg-accent' : 'bg-neutral-400'}`} />
        {checked ? 'On' : 'Off'}
      </button>
    </div>
  )
}
