export function InterviewRubric() {
  return <div className="grid gap-2 rounded bg-[#f8f6ef] p-3.5 sm:grid-cols-4"><span className="text-[9px] font-bold tracking-[1px] text-[#8d885f] sm:col-span-4">WHAT THE EXAMINER LISTENS FOR</span>{['Fluency', 'Vocabulary', 'Grammar', 'Pronunciation'].map((criterion) => <div key={criterion} className="flex items-center gap-1.5 text-[9px] text-[#7d867e]"><span className="h-1.5 w-1.5 rounded-full bg-[#91b397]" />{criterion}</div>)}</div>
}
