import { User } from 'lucide-react'
import { Link } from 'react-router-dom'
import { appTabs } from '../../lib/navigation'
import { Button } from '../ui/Button'
import { BrandMark } from './Brand'

// Desktop (≥760px) shows the tabs inline; below that the MobileTabBar takes over.
export function AppHeader({ activeTab, examLabel, weekLabel, showUpgrade, onExamTag, onUpgrade, onProfile }) {
  return (
    <header className="sticky top-0 z-20 flex flex-wrap items-center gap-x-4 gap-y-3 border-b-2 border-ink bg-ground px-4 py-3">
      <Link to="/today" className="mr-auto flex items-center gap-3 text-lg font-extrabold text-ink no-underline">
        <BrandMark />
      </Link>
      <nav aria-label="Primary" className="hidden items-center gap-4 min-[760px]:flex">
        {appTabs.map((tab) => {
          const current = activeTab === tab.to
          return (
            <Link
              key={tab.to}
              to={tab.to}
              aria-current={current ? 'page' : undefined}
              className={`border-b-2 py-2 text-sm font-semibold no-underline hover:text-accent-700 ${current ? 'border-accent text-accent-700' : 'border-transparent text-ink'}`}
            >
              {tab.label}
            </Link>
          )
        })}
      </nav>
      <span className="ml-auto flex items-center gap-3">
        <button type="button" onClick={onExamTag} className="border border-accent bg-transparent px-2.5 py-[3px] text-[11px] tracking-[.02em] whitespace-nowrap text-accent-700"><span className="max-[419px]:sr-only">{examLabel} · </span>{weekLabel}</button>
        {showUpgrade && <Button variant="primary" size="xs" onClick={onUpgrade}>Upgrade</Button>}
        <button type="button" onClick={onProfile} aria-label="Profile and settings" className="grid size-10 place-items-center border border-ink/40 bg-transparent text-ink hover:bg-ink/7">
          <User size={16} aria-hidden="true" />
        </button>
      </span>
    </header>
  )
}
