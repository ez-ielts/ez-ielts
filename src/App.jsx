import { Route, Routes, useNavigate } from 'react-router-dom'
import { RequireAuth } from './components/auth/RequireAuth'
import { SsoCallback } from './components/auth/SsoCallback'
import { authEnabled } from './features/auth/authConfig'
import { InterviewScreen } from './components/interview/InterviewScreen'
import { JourneyFlow } from './components/journey/JourneyFlow'
import { JourneySidebar } from './components/journey/JourneySidebar'
import { AppLayout } from './components/layout/AppLayout'
import { FocusHeader } from './components/layout/FocusHeader'
import { ProductHeader } from './components/layout/ProductHeader'
import { ScreenPlaceholder } from './components/layout/ScreenPlaceholder'
import { TodayScreen } from './components/today/TodayScreen'

function JourneyLayout() {
  return (
    <div className="min-h-screen bg-[#fbfaf6] text-[#202521]">
      <ProductHeader />
      <div className="mx-auto grid max-w-[1150px] grid-cols-1 gap-8 px-5 py-9 sm:px-[5.5%] sm:py-[67px] lg:grid-cols-[300px_minmax(0,700px)] lg:gap-[clamp(50px,9vw,140px)] lg:py-[67px]">
        <JourneySidebar />
        <main className="min-w-0"><JourneyFlow /></main>
      </div>
    </div>
  )
}

// Focus mode: no tabs. `exitTo` adds "Save and exit" (not shown during onboarding).
function FocusLayout({ label, exitTo, children }) {
  const navigate = useNavigate()
  return (
    <div className="flex min-h-screen flex-col bg-ground text-ink">
      <FocusHeader label={label} onExit={exitTo ? () => navigate(exitTo) : undefined} />
      <div className="mx-auto w-full max-w-[1240px] flex-1">{children}</div>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<JourneyLayout />} />
      {authEnabled && <Route path="/sso-callback" element={<SsoCallback />} />}
      <Route element={<RequireAuth />}>
        <Route path="/interview" element={<FocusLayout label="Interview"><InterviewScreen /></FocusLayout>} />
        <Route path="/speaking/:id" element={<FocusLayout label="Speaking practice" exitTo="/today"><ScreenPlaceholder title="Speaking practice" /></FocusLayout>} />
        <Route element={<AppLayout />}>
          <Route path="/today" element={<TodayScreen />} />
          <Route path="/plan" element={<ScreenPlaceholder title="Plan" />} />
          <Route path="/homework" element={<ScreenPlaceholder title="Homework" />} />
          <Route path="/homework/:id" element={<ScreenPlaceholder title="Marked essay" />} />
          <Route path="/tutor" element={<ScreenPlaceholder title="Tutor" />} />
          <Route path="/pricing" element={<ScreenPlaceholder title="Pricing" />} />
          <Route path="/settings" element={<ScreenPlaceholder title="Settings" />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
