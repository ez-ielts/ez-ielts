import { useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { selectPlan } from '../../features/plan/planSlice'
import { examLabels } from '../../features/session/sessionSlice'
import { activeTabFor } from '../../lib/navigation'
import { AppHeader } from './AppHeader'
import { MobileTabBar } from './MobileTabBar'

// Shell for the four study tabs. Content gets 64px bottom padding on mobile to clear the tab bar.
export function AppLayout() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { exam, tier } = useSelector((state) => state.session)
  const { currentWeek, totalWeeks } = useSelector(selectPlan)
  const activeTab = activeTabFor(pathname)

  return (
    <div className="flex min-h-screen flex-col bg-ground text-ink">
      <AppHeader
        activeTab={activeTab}
        examLabel={examLabels[exam]}
        weekLabel={`Week ${currentWeek} of ${totalWeeks}`}
        showUpgrade={tier === 'trial'}
        onExamTag={() => navigate('/plan')}
        onUpgrade={() => navigate('/pricing')}
        onProfile={() => navigate('/settings')}
      />
      <div className="mx-auto w-full max-w-[1240px] flex-1 pb-16 min-[760px]:pb-0">
        <Outlet />
      </div>
      <MobileTabBar activeTab={activeTab} />
    </div>
  )
}
