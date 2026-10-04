import { Route, Routes, useNavigate } from 'react-router-dom'
import { RequireAuth } from './components/auth/RequireAuth'
import { SsoCallback } from './components/auth/SsoCallback'
import { authEnabled } from './features/auth/authConfig'
import { InterviewScreen } from './components/interview/InterviewScreen'
import { AppLayout } from './components/layout/AppLayout'
import { FocusHeader } from './components/layout/FocusHeader'
import { ScreenPlaceholder } from './components/layout/ScreenPlaceholder'
import { HomeworkScreen } from './components/homework/HomeworkScreen'
import { MarkedEssay } from './components/homework/MarkedEssay'
import { PlanScreen } from './components/plan/PlanScreen'
import { WelcomeScreen } from './components/onboarding/WelcomeScreen'
import { TodayScreen } from './components/today/TodayScreen'

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
      <Route path="/" element={<FocusLayout label="Create account"><WelcomeScreen /></FocusLayout>} />
      {authEnabled && <Route path="/sso-callback" element={<SsoCallback />} />}
      <Route element={<RequireAuth />}>
        <Route path="/interview" element={<FocusLayout label="Interview"><InterviewScreen /></FocusLayout>} />
        <Route path="/speaking/:id" element={<FocusLayout label="Speaking practice" exitTo="/today"><ScreenPlaceholder title="Speaking practice" /></FocusLayout>} />
        <Route path="/mock/:id" element={<FocusLayout label="Checkpoint mock" exitTo="/plan"><ScreenPlaceholder title="Checkpoint mock" /></FocusLayout>} />
        <Route element={<AppLayout />}>
          <Route path="/today" element={<TodayScreen />} />
          <Route path="/plan" element={<PlanScreen />} />
          <Route path="/homework" element={<HomeworkScreen />} />
          <Route path="/homework/:id" element={<MarkedEssay />} />
          <Route path="/tutor" element={<ScreenPlaceholder title="Tutor" />} />
          <Route path="/pricing" element={<ScreenPlaceholder title="Pricing" />} />
          <Route path="/settings" element={<ScreenPlaceholder title="Settings" />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
