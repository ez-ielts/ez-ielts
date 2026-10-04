import { useEffect, useState } from 'react'
import { canSpeak, speak } from '../../features/speaking/speechService'
import { Button } from '../ui/Button'
import { QuestionSet } from './QuestionSet'

// The talk is played with browser speech synthesis in this version. Without it the transcript is shown and says so.
export function ListeningSection({ content, chosen, onChoose }) {
  const [playing, setPlaying] = useState(false)
  const audio = canSpeak()

  useEffect(() => {
    if (!playing) return undefined
    return speak(content.transcript, { lang: content.lang, onEnd: () => setPlaying(false) })
  }, [playing, content])

  return (
    <div className="flex flex-col gap-6">
      {audio ? (
        <div className="flex flex-wrap items-center gap-3 border-2 border-ink p-4">
          <Button variant={playing ? 'secondary' : 'primary'} size="lg" onClick={() => setPlaying((value) => !value)} className="min-w-[160px]">{playing ? 'Stop audio' : 'Play audio'}</Button>
          <span role="status" className="text-[13px] text-neutral-800">{playing ? 'Playing…' : 'Play the talk, then answer the questions. You can play it again.'}</span>
        </div>
      ) : (
        <div className="flex flex-col gap-2 bg-surface p-4 text-[14.5px] leading-[1.6]">
          <strong>Audio is not available in this browser, so the transcript is shown instead.</strong>
          <p className="m-0">{content.transcript}</p>
        </div>
      )}
      <QuestionSet questions={content.questions} chosen={chosen} onChoose={onChoose} />
    </div>
  )
}
