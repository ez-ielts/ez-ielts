import { AuthControls } from '../auth/AuthControls'

export function ProductHeader() {
  return (
    <header className="flex h-[78px] items-center border-b border-[#e5e5dd] bg-[#fbfaf6] px-5 sm:px-[5.5%]">
      <div className="flex items-center gap-2.5 text-lg font-bold tracking-[-.6px]"><span className="grid h-[25px] w-[25px] place-items-center rounded-[7px_7px_7px_2px] bg-[#215641] font-serif text-lg text-white">e</span>ezIELTS</div>
      <div className="m-auto hidden items-center gap-2 text-[10px] text-[#879189] sm:flex"><span className="grid h-4 w-4 place-items-center rounded-full bg-[#dcecdf] text-[9px] text-[#4d8960]">✓</span>Built for the IELTS exam<span className="mx-2 h-3.5 w-px bg-[#d7ddd6]" />Cambridge-aligned practice</div>
      <div className="ml-auto flex items-center gap-2 sm:ml-0"><AuthControls /></div>
      <button className="hidden border-0 bg-transparent text-[10px] text-[#a0a49e] sm:block">Need help? <strong className="ml-1 text-[#4e765b]">Contact us</strong></button>
    </header>
  )
}
