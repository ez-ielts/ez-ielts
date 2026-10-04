import { Link } from 'react-router-dom'
import { appTabs } from '../../lib/navigation'

// Fixed bottom tabs below 760px. Active cell is ink-filled with a red marker.
export function MobileTabBar({ activeTab }) {
  return (
    <nav aria-label="Primary" className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t-2 border-ink bg-ground min-[760px]:hidden">
      {appTabs.map((tab) => {
        const current = activeTab === tab.to
        return (
          <Link
            key={tab.to}
            to={tab.to}
            aria-current={current ? 'page' : undefined}
            className={`flex min-h-[60px] flex-col items-start justify-center gap-1 border-r-2 border-ink px-3 py-2 text-xs font-bold no-underline last:border-r-0 ${current ? 'bg-ink text-ground' : 'bg-ground text-ink'}`}
          >
            <span aria-hidden="true" className={`block h-1 w-3.5 ${current ? 'bg-accent' : 'bg-neutral-300'}`} />
            {tab.label}
          </Link>
        )
      })}
    </nav>
  )
}
