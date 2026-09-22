import { useDispatch, useSelector } from 'react-redux'
import { goToStep } from '../../features/journey/journeySlice'
import { journeySteps } from '../../lib/journeyConfig'

export function JourneySidebar() {
  const dispatch = useDispatch()
  const currentStep = useSelector((state) => state.journey.currentStep)

  return (
    <aside className="flex min-h-0 flex-col lg:min-h-[650px]">
      <div><span className="text-[9px] font-bold tracking-[1.55px] text-[#91a097]">YOUR IELTS JOURNEY</span><h1 className="mt-[18px] mb-4 max-w-[260px] font-serif text-[40px] leading-[.98] tracking-[-1.3px] sm:text-[38px]">From unsure<br /><em className="text-[#527b61]">to exam-ready.</em></h1><p className="max-w-[270px] text-[11px] leading-[1.65] text-[#858c85]">We start with where you are, then build the shortest honest path to your target band.</p></div>
      <div className="mt-8 flex gap-1 sm:mt-[69px] sm:block">{journeySteps.map((label, index) => <button type="button" key={label} onClick={() => index <= currentStep && dispatch(goToStep(index))} className={`flex flex-1 items-center gap-3 border-0 bg-transparent py-3 text-center text-[8px] text-[#a0a8a0] sm:w-full sm:text-left sm:text-[11px] ${currentStep === index ? 'font-bold text-[#215641]' : ''} ${currentStep > index ? 'text-[#5c8668]' : ''}`}><span className={`mx-auto grid h-6 w-6 shrink-0 place-items-center rounded-full border text-[9px] sm:mx-0 ${currentStep === index ? 'border-[#215641] bg-[#215641] text-white' : currentStep > index ? 'border-[#dcecdf] bg-[#dcecdf] text-[#528362]' : 'border-[#dce2dc]'}`}>{currentStep > index ? '✓' : `0${index + 1}`}</span><span>{label}</span></button>)}</div>
      <div className="mt-auto hidden gap-2 rounded bg-[#f1eee2] p-3 text-[#8a835e] sm:flex"><span className="text-[17px]">✦</span><p className="m-0 text-[10px] leading-[1.45]"><strong className="text-[11px] text-[#6e694a]">No guessing.</strong><br />Your plan changes when your evidence changes.</p></div>
    </aside>
  )
}
