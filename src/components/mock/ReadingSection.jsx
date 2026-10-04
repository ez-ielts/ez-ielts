import { QuestionSet } from './QuestionSet'

export function ReadingSection({ content, chosen, onChoose }) {
  return (
    <div className="flex flex-wrap gap-x-8 gap-y-6">
      <article className="min-w-0 flex-[1.2_1_340px]">
        <h2 className="m-0 mb-3 text-[17px] font-extrabold tracking-[-.01em]">{content.title}</h2>
        <p className="m-0 text-[15px] leading-[1.7]">{content.passage}</p>
      </article>
      <div className="min-w-0 flex-[1_1_320px]"><QuestionSet questions={content.questions} chosen={chosen} onChoose={onChoose} /></div>
    </div>
  )
}
