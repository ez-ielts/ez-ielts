import { useEffect, useRef, useState } from 'react'
import { AlertBand } from '../ui/AlertBand'
import { Button } from '../ui/Button'
import { TextInput } from '../ui/TextInput'

const errorCopy = {
  network: 'The tutor could not reply. Check your connection and try again, or skip the interview.',
  rate_limit: 'The tutor is getting a lot of requests right now. Wait a minute and try again, or skip the interview.',
}

export function TutorInterview({ summary, messages, loading, errorKind, done, onSend, onRetry, onBuildCourse, onSkip }) {
  const [draft, setDraft] = useState('')
  const logRef = useRef(null)

  useEffect(() => {
    const log = logRef.current
    if (log) log.scrollTop = log.scrollHeight
  }, [messages.length, loading, errorKind])

  const handleSend = (event) => {
    event.preventDefault()
    const text = draft.trim()
    if (!text || loading) return
    onSend(text)
    setDraft('')
  }

  return (
    <>
      <div className="flex flex-wrap gap-8">
        <div className="flex max-w-[340px] flex-[1_1_260px] flex-col gap-3">
          <h1 className="m-0 text-[clamp(28px,4vw,44px)] leading-[1.02] font-extrabold tracking-[-.025em]">A short talk with your tutor</h1>
          <p className="m-0 text-sm leading-[1.55] text-neutral-800">Three or four questions about how you study. Answer in English; this also feeds your speaking estimate.</p>
          <table className="w-full border-collapse text-[13px]">
            <tbody>
              {summary.map((row) => (
                <tr key={row.label}>
                  <th scope="row" className="border-b border-ink/40 p-2 text-left font-normal text-neutral-800">{row.label}</th>
                  <td className="border-b border-ink/40 p-2 text-right font-bold">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex min-h-[460px] min-w-0 flex-[2_1_420px] flex-col border-2 border-ink">
          <div ref={logRef} role="log" aria-live="polite" aria-label="Interview with your tutor" className="flex max-h-[520px] flex-1 flex-col gap-3 overflow-auto p-4">
            {messages.map((message, index) => {
              const learner = message.role === 'user'
              return (
                <div key={index} className={`max-w-[85%] border-2 border-ink p-3 text-[14.5px] leading-[1.55] whitespace-pre-wrap ${learner ? 'self-end bg-ink text-ground' : 'self-start bg-ground text-ink'}`}>
                  <span className="sr-only">{learner ? 'You: ' : 'Tutor: '}</span>{message.content}
                </div>
              )
            })}
            {loading && <div className="animate-pulse-soft text-[12.5px] text-neutral-800 motion-reduce:animate-none">Tutor is typing…</div>}
            {errorKind && (
              <AlertBand action={<Button size="sm" onClick={onRetry} className="bg-ground">Try again</Button>}>{errorCopy[errorKind]}</AlertBand>
            )}
          </div>
          {done ? (
            <div className="flex flex-wrap items-center gap-3 border-t-2 border-ink px-4 py-3">
              <span className="flex-1 text-[13.5px]">Interview complete.</span>
              <Button variant="primary" size="lg" arrow onClick={onBuildCourse} className="min-w-[200px]">Build my course</Button>
            </div>
          ) : (
            <form onSubmit={handleSend} className="flex border-t-2 border-ink">
              <TextInput value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Type your answer" aria-label="Your answer" className="min-h-[52px] min-w-0 flex-1 border-0 px-4" />
              <Button type="submit" variant="primary" size="xl" disabled={loading || !draft.trim()} className="min-w-24">Send</Button>
            </form>
          )}
        </div>
      </div>
      <Button variant="ghost" onClick={onSkip} className="self-start">Skip interview and build the course</Button>
    </>
  )
}
