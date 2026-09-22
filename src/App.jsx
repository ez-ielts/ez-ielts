import { ProductHeader } from './components/layout/ProductHeader'
import { JourneyFlow } from './components/journey/JourneyFlow'
import { JourneySidebar } from './components/journey/JourneySidebar'

function App() {
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

export default App
