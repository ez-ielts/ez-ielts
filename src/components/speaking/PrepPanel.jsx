import { useState } from 'react'
import { useCountdown } from '../../features/speaking/useCountdown'
import { Button } from '../ui/Button'
import { SpeakingTimer } from './SpeakingTimer'

export function PrepPanel({ turn, onDone }) {
  const [notes, setNotes] = useState('')
  const remaining = useCountdown(turn.prepSeconds, { running: true, onDone })

  return (
    <div className="flex flex-col gap-4">
      <SpeakingTimer seconds={remaining} label="Preparation time left" />
      <label htmlFor="prep-notes" className="text-[13px] font-bold">Your notes (optional, kept on this screen only)</label>
      <textarea id="prep-notes" value={notes} onChange={(event) => setNotes(event.target.value)} rows={5} className="w-full resize-y border border-ink/40 bg-surface p-3 text-sm focus-visible:border-accent focus-visible:outline-offset-0" />
      <Button variant="primary" size="lg" arrow onClick={onDone} className="min-w-[240px] self-start">I'm ready, start speaking</Button>
    </div>
  )
}
