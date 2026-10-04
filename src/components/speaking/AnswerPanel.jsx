import { useState } from 'react'
import { speakingErrorCopy } from '../../features/speaking/speakingConfig'
import { useCountdown } from '../../features/speaking/useCountdown'
import { useVoiceAnswer } from '../../features/speaking/useVoiceAnswer'
import { AlertBand } from '../ui/AlertBand'
import { Button } from '../ui/Button'
import { SpeakingTimer } from './SpeakingTimer'

// One answer: voice with a live transcript, or the typed fallback. Mount with key={turnIndex} so each answer starts fresh.
export function AnswerPanel({ turn, lang, voice, paused, error, onPause, onResume, onFinish, onError, onRetry, onUseTyping }) {
  const [draft, setDraft] = useState('')
  const transcript = useVoiceAnswer({ listening: voice && !paused && !error, lang, onError })
  const finish = () => onFinish(voice ? transcript : draft, turn.speakSeconds - remaining)
  const remaining = useCountdown(turn.speakSeconds, { running: !paused && !error, onDone: finish })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SpeakingTimer seconds={remaining} label="Answer time left" />
        {voice && !error && (
          <span role="status" className={`text-[13px] font-bold ${paused ? 'text-neutral-800' : 'animate-pulse-soft text-accent-700 motion-reduce:animate-none'}`}>
            <span aria-hidden="true">{paused ? '❚❚ ' : '● '}</span>{paused ? 'Paused' : 'Listening'}
          </span>
        )}
      </div>

      {error && (
        <AlertBand action={<span className="flex flex-wrap gap-2"><Button size="sm" onClick={onRetry} className="bg-ground">Try again</Button><Button size="sm" onClick={onUseTyping} className="bg-ground">Answer by typing instead</Button></span>}>
          {speakingErrorCopy[error]}
        </AlertBand>
      )}

      {voice ? (
        <div aria-label="Live transcript" className="min-h-[140px] border-2 border-ink bg-surface p-4 text-[15px] leading-[1.6]">
          {transcript || <span className="text-neutral-800">Your words will appear here as you speak.</span>}
        </div>
      ) : (
        <>
          <label htmlFor="typed-answer" className="text-[13px] font-bold">Typed answer (fallback for when voice is not available)</label>
          <textarea id="typed-answer" value={draft} onChange={(event) => setDraft(event.target.value)} rows={7} className="w-full resize-y border-2 border-ink bg-surface p-3 text-[15px] focus-visible:border-accent focus-visible:outline-offset-0" />
        </>
      )}

      <div className="flex flex-wrap gap-2">
        <Button variant="primary" size="lg" arrow onClick={finish} className="min-w-[200px]">{voice ? 'Finish answer' : 'Submit answer'}</Button>
        {voice && !error && (paused ? <Button size="lg" onClick={onResume}>Resume</Button> : <Button size="lg" onClick={onPause}>Pause</Button>)}
      </div>
    </div>
  )
}
