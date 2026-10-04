import { Kicker } from '../ui/Kicker'

// Final copy: the guarantee is always conditional on completing the assigned work.
export function GuaranteeConditions({ target }) {
  return (
    <div className="flex flex-col gap-2 border-2 border-ink p-4 text-[13.5px] leading-[1.55]">
      <Kicker tone="accent">Band guarantee · conditions</Kicker>
      <p className="m-0">Complete every assigned session and homework, with no more than one late submission, and sit both checkpoint mocks. If your final mock is below {target}, we extend the course free until it isn't.</p>
    </div>
  )
}
