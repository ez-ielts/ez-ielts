import { useEffect, useRef, useState } from 'react'
import { AlertBand } from '../ui/AlertBand'
import { Button } from '../ui/Button'
import { TextInput } from '../ui/TextInput'

// Shared chat thread (interview and tutor). `intro` is a tutor bubble that is not part of `messages`.
// `footer` replaces the input row, e.g. when a conversation is complete.
export function ChatThread({ messages, intro, loading, errorKind, errorCopy, label, placeholder = 'Type your answer', onSend, onRetry, footer }) {
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

  const bubble = (key, learner, content) => (
    <div key={key} className={`max-w-[85%] border-2 border-ink p-3 text-[14.5px] leading-[1.55] whitespace-pre-wrap ${learner ? 'self-end bg-ink text-ground' : 'self-start bg-ground text-ink'}`}>
      <span className="sr-only">{learner ? 'You: ' : 'Tutor: '}</span>{content}
    </div>
  )

  return (
    <div className="flex min-h-[460px] min-w-0 flex-col border-2 border-ink">
      <div ref={logRef} role="log" aria-live="polite" aria-label={label} className="flex max-h-[520px] flex-1 flex-col gap-3 overflow-auto p-4">
        {intro && bubble('intro', false, intro)}
        {messages.map((message, index) => bubble(index, message.role === 'user', message.content))}
        {loading && <div className="animate-pulse-soft text-[12.5px] text-neutral-800 motion-reduce:animate-none">Tutor is typing…</div>}
        {errorKind && (
          <AlertBand action={<Button size="sm" onClick={onRetry} className="bg-ground">Try again</Button>}>{errorCopy[errorKind]}</AlertBand>
        )}
      </div>
      {footer ?? (
        <form onSubmit={handleSend} className="flex border-t-2 border-ink">
          <TextInput value={draft} onChange={(event) => setDraft(event.target.value)} placeholder={placeholder} aria-label="Your message" className="min-h-[52px] min-w-0 flex-1 border-0 px-4" />
          <Button type="submit" variant="primary" size="xl" disabled={loading || !draft.trim()} className="min-w-24">Send</Button>
        </form>
      )}
    </div>
  )
}
