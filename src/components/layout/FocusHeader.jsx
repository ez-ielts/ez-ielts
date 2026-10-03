import { Button } from '../ui/Button'

// Slim header for focus-mode screens (onboarding, mock, speaking): no tabs, optional exit.
export function FocusHeader({ label, onExit }) {
  return (
    <header className="sticky top-0 z-20 flex items-center gap-4 border-b-2 border-ink bg-ground px-4 py-3">
      <span className="flex items-center gap-3 text-lg font-extrabold">
        <span aria-hidden="true" className="block size-[18px] bg-accent" />
        ezIELTS
      </span>
      <span className="text-[11px] font-semibold tracking-[.15em] text-neutral-800 uppercase">{label}</span>
      {onExit && <Button size="sm" onClick={onExit} className="ml-auto">Save and exit</Button>}
    </header>
  )
}
