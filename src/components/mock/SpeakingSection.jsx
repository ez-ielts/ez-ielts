import { useState } from 'react'
import { canRecognize, requestMicrophone, SpeechError } from '../../features/speaking/speechService'
import { AnswerPanel } from '../speaking/AnswerPanel'
import { QuestionCard } from '../speaking/QuestionCard'
import { AlertBand } from '../ui/AlertBand'
import { Button } from '../ui/Button'
import { speakingErrorCopy } from '../../features/speaking/speakingConfig'

// One long-turn question. Voice with a live transcript where supported, otherwise the typed fallback. Mic is requested on tap.
export function SpeakingSection({ turn, lang, onFinish }) {
  const [started, setStarted] = useState(false)
  const [typed, setTyped] = useState(!canRecognize())
  const [paused, setPaused] = useState(false)
  const [error, setError] = useState(null)

  const startVoice = async () => {
    try {
      await requestMicrophone()
      setError(null)
      setStarted(true)
    } catch (caught) {
      setError(caught instanceof SpeechError ? caught.kind : 'mic_unavailable')
    }
  }
  const startTyped = () => { setTyped(true); setError(null); setStarted(true) }

  return (
    <div className="flex flex-col gap-6">
      <QuestionCard turn={turn} index={0} total={1} speaking={false} />
      {!started ? (
        <div className="flex flex-col gap-4">
          {error && <AlertBand action={<Button size="sm" onClick={startTyped} className="bg-ground">Answer by typing instead</Button>}>{speakingErrorCopy[error]}</AlertBand>}
          <div className="flex flex-wrap gap-2">
            {typed
              ? <Button variant="primary" size="xl" arrow onClick={startTyped} className="min-w-[260px]">Start (typed answer)</Button>
              : <Button variant="primary" size="xl" arrow onClick={startVoice} className="min-w-[260px]">Start with microphone</Button>}
            {!typed && <Button size="xl" onClick={startTyped}>Answer by typing instead</Button>}
          </div>
        </div>
      ) : (
        <AnswerPanel
          turn={turn}
          lang={lang}
          voice={!typed}
          paused={paused}
          error={error}
          onPause={() => setPaused(true)}
          onResume={() => setPaused(false)}
          onFinish={(text, seconds) => onFinish({ text, seconds })}
          onError={setError}
          onRetry={() => setError(null)}
          onUseTyping={() => { setTyped(true); setError(null) }}
        />
      )}
    </div>
  )
}
