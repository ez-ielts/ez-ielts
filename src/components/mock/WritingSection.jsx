import { wordCount } from '../../features/mock/mockExamService'

export function WritingSection({ content, text, onChange }) {
  const words = wordCount(text)

  return (
    <div className="flex flex-col gap-4">
      <p className="m-0 bg-surface p-4 text-[14.5px]"><strong>{content.task}.</strong> {content.prompt}</p>
      <label htmlFor="mock-writing" className="text-[13px] font-bold">Your response. Write at least {content.targetWords} words (the full exam asks for {content.fullWords}).</label>
      <textarea id="mock-writing" value={text} onChange={(event) => onChange(event.target.value)} rows={12} className="w-full resize-y border-2 border-ink bg-surface p-3 text-[15px] leading-[1.6] focus-visible:border-accent focus-visible:outline-offset-0" />
      <div aria-live="polite" className="text-[12.5px] font-bold">{words} of {content.targetWords} words</div>
    </div>
  )
}
