import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { placementContent, placementSections } from '../../features/placement/placementConfig'
import { choiceMade, confirmStart, finishPlacementSection, finishPlacementSpeaking, placementReset, placementStarted, startChosen, submitPlacement, writingChanged } from '../../features/placement/placementSlice'
import { onboardingStages } from '../../features/intake/intakeConfig'
import { AssessmentIntro } from '../mock/AssessmentIntro'
import { AssessmentSection } from '../mock/AssessmentSection'
import { SectionShell } from '../mock/SectionShell'
import { AlertBand } from '../ui/AlertBand'
import { Button } from '../ui/Button'
import { StageStrip } from '../ui/StageStrip'
import { PlacementResult } from './PlacementResult'

const rules = [
  'Each section is timed and cannot be revisited once you move on.',
  'This is a short version of the real thing.',
  'The result is an estimate, not an official score. A full mock exam confirms it.',
]

// Placement (`/placement`): a short four-skill test that sets the start estimate. See design/placement.md.
export function PlacementScreen() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const exam = useSelector((state) => state.session.exam)
  const placement = useSelector((state) => state.placement)
  const content = placementContent[exam]
  const section = placementSections[placement.sectionIndex]

  useEffect(() => { dispatch(placementReset()) }, [dispatch])

  const handlers = {
    onChoose: (key) => (questionId, value) => dispatch(choiceMade({ section: key, id: questionId, value })),
    onWriting: (text) => dispatch(writingChanged(text)),
    onSpeaking: (answer) => dispatch(finishPlacementSpeaking(answer)),
  }

  return (
    <main className="mx-auto flex w-full max-w-[860px] flex-col gap-6 px-[clamp(16px,4vw,40px)] py-6">
      <StageStrip stages={onboardingStages} current={1} />

      {placement.stage === 'intro' && (
        <AssessmentIntro
          kicker="Placement"
          title="Find your starting level"
          lede="Four short sections, one per skill. Your result sets where your course begins."
          sections={placementSections}
          speakingSeconds={content.speaking.speakSeconds}
          rules={rules}
          startLabel="Start placement"
          onStart={() => dispatch(placementStarted())}
        />
      )}

      {placement.stage === 'section' && (
        <SectionShell key={placement.sectionIndex} section={section} index={placement.sectionIndex} total={placementSections.length} onFinish={() => dispatch(finishPlacementSection())}>
          <AssessmentSection sectionKey={section.key} content={content} answers={placement.answers} handlers={handlers} />
        </SectionShell>
      )}

      {placement.stage === 'scoring' && <p role="status" className="m-0 text-sm text-neutral-800">Working out your level…</p>}

      {placement.stage === 'failed' && (
        <AlertBand kicker="Couldn't work out your level" action={<Button variant="primary" onClick={() => dispatch(submitPlacement())}>Try again</Button>}>Your answers are kept. Check your connection and try again.</AlertBand>
      )}

      {placement.stage === 'result' && (
        <PlacementResult
          result={placement.result}
          exam={exam}
          chosenStart={placement.chosenStart}
          onChoose={(start) => dispatch(startChosen(start))}
          onConfirm={() => { dispatch(confirmStart()); navigate('/interview') }}
        />
      )}
    </main>
  )
}
