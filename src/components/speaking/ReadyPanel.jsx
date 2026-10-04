import { canRecognize } from '../../features/speaking/speechService'
import { speakingErrorCopy } from '../../features/speaking/speakingConfig'
import { AlertBand } from '../ui/AlertBand'
import { Button } from '../ui/Button'
import { Kicker } from '../ui/Kicker'

const steps = [
  'The examiner asks each question aloud.',
  'You answer by voice and your words appear as a transcript.',
  'No score is shown during practice. Your transcript is recorded as evidence.',
]

export function ReadyPanel({ practice, error, onStartVoice, onStartTyped }) {
  const voice = canRecognize()
  const longest = Math.max(...practice.turns.map((turn) => turn.speakSeconds))
  const prep = practice.turns.find((turn) => turn.prepSeconds)?.prepSeconds
  const facts = [
    { label: 'Questions', value: practice.turns.length },
    { label: 'Preparation', value: prep ? `${prep} seconds` : 'None' },
    { label: 'Answer length', value: `Up to ${longest} seconds` },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Kicker tone="accent">Speaking practice</Kicker>
        <h1 className="mt-2 mb-3 text-[clamp(30px,4.2vw,46px)] leading-[1.02] font-extrabold tracking-[-.025em]">{practice.title}</h1>
        <p className="m-0 max-w-[56ch] text-sm text-neutral-800">{practice.instruction}</p>
      </div>
      <dl className="m-0 grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-[2px] border-2 border-ink bg-ink">
        {facts.map((fact) => (
          <div key={fact.label} className="bg-ground p-4">
            <dt><Kicker spacing="normal">{fact.label}</Kicker></dt>
            <dd className="m-0 mt-2 text-xl font-extrabold">{fact.value}</dd>
          </div>
        ))}
      </dl>
      <ol className="m-0 flex list-none flex-col gap-[2px] border-2 border-ink bg-ink p-0">
        {steps.map((step, index) => <li key={step} className="bg-ground p-3 text-[13.5px]"><span className="mr-3 font-bold text-accent-700">{index + 1}</span>{step}</li>)}
      </ol>
      {error && <AlertBand action={<Button size="sm" onClick={onStartTyped} className="bg-ground">Answer by typing instead</Button>}>{speakingErrorCopy[error]}</AlertBand>}
      {!voice && <AlertBand alert={false} kicker="Voice unavailable">This browser cannot transcribe speech, so you will type your answers. Chrome or Safari support voice.</AlertBand>}
      <div className="flex flex-wrap gap-2">
        {voice
          ? <Button variant="primary" size="xl" arrow onClick={onStartVoice} className="min-w-[260px]">Start with microphone</Button>
          : <Button variant="primary" size="xl" arrow onClick={onStartTyped} className="min-w-[260px]">Start (typed answers)</Button>}
        {voice && <Button size="xl" onClick={onStartTyped}>Answer by typing instead</Button>}
      </div>
      <p className="m-0 text-[12.5px] text-neutral-800">The microphone is requested only when you tap Start.</p>
    </div>
  )
}
