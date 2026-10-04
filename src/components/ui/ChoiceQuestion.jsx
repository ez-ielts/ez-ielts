import { ChoiceButton } from './ChoiceButton'

// A question with a ruled top edge and a row of choices. `number` prefixes the legend (questionnaire only).
export function ChoiceQuestion({ label, options, value, hint, number, onChoose }) {
  return (
    <fieldset className="m-0 flex min-w-0 flex-col gap-2 border-0 border-t-2 border-ink p-0 pt-3">
      <legend className="float-left mb-2 w-full p-0 text-[15px] font-bold">{number && <span className="mr-2 text-accent-700">{number}</span>}{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <ChoiceButton key={option} selected={value === option} onSelect={() => onChoose(option)}>{option}</ChoiceButton>
        ))}
      </div>
      {hint && <span className="text-[12.5px] text-neutral-800">{hint}</span>}
    </fieldset>
  )
}
