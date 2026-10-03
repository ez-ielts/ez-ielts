import { Route, Routes } from 'react-router-dom'
import { InterviewScreen } from './components/interview/InterviewScreen'
import { JourneyFlow } from './components/journey/JourneyFlow'
import { JourneySidebar } from './components/journey/JourneySidebar'
import { FocusHeader } from './components/layout/FocusHeader'
import { ProductHeader } from './components/layout/ProductHeader'
import { ScreenPlaceholder } from './components/layout/ScreenPlaceholder'

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

function FocusLayout({ label, children }) {
  return (
    <div className="flex min-h-screen flex-col bg-ground text-ink">
      <FocusHeader label={label} />
      <main className="mx-auto w-full max-w-[1240px] flex-1">{children}</main>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<JourneyLayout />} />
      <Route path="/interview" element={<FocusLayout label="Interview"><InterviewScreen /></FocusLayout>} />
      <Route path="/today" element={<ScreenPlaceholder title="Today" />} />
      <Route path="/pricing" element={<ScreenPlaceholder title="Pricing" />} />
    </Routes>
  )
}

export default App
