// paragraphs: [[{ text, note? }]]. Marked passages are underlined with a superscript number that matches the feedback list.
export function AnnotatedEssay({ paragraphs }) {
  return (
    <div className="flex flex-col gap-4 text-[15px] leading-[1.7]">
      {paragraphs.map((segments, index) => (
        <p key={index} className="m-0">
          {segments.map((segment, position) => segment.note ? (
            <mark key={position} className="bg-accent-100 text-ink underline decoration-accent decoration-2 underline-offset-[3px]">
              {segment.text}<sup className="ml-0.5 font-bold text-accent-700"><span className="sr-only">Note </span>{segment.note}</sup>
            </mark>
          ) : <span key={position}>{segment.text}</span>)}
        </p>
      ))}
    </div>
  )
}
