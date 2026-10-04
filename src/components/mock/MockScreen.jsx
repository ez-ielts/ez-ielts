import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useHomework } from '../../features/homework/useHomework'
import { selectPlan } from '../../features/plan/planSlice'
import { checkpointIds, mockContent, mockSections } from '../../features/mock/mockConfig'
import { choiceMade, finishSection, finishSpeaking, mockReset, mockStarted, submitMock, writingChanged } from '../../features/mock/mockSlice'
import { AlertBand } from '../ui/AlertBand'
import { Button } from '../ui/Button'
import { Kicker } from '../ui/Kicker'
import { AssessmentIntro } from './AssessmentIntro'
import { AssessmentSection } from './AssessmentSection'
import { MockResult } from './MockResult'
import { SectionShell } from './SectionShell'

const mockRules = [
  'Each section is timed and cannot be revisited once you move on.',
  'Timings and length are shortened in this version.',
  'The result is an estimate, not an official score.',
]

const page = 'mx-auto flex w-full max-w-[860px] flex-col gap-6 px-[clamp(16px,4vw,40px)] py-8'

function MockSession({ id, week }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const exam = useSelector((state) => state.session.exam)
  const mock = useSelector((state) => state.mock)
  const content = mockContent[exam]
  const active = mock.mockId === id
  const stage = active ? mock.stage : 'intro'
  const section = mockSections[mock.sectionIndex]
  useHomework()

  useEffect(() => { dispatch(mockReset()) }, [dispatch, id])

  const handlers = {
    onChoose: (key) => (questionId, value) => dispatch(choiceMade({ section: key, id: questionId, value })),
    onWriting: (text) => dispatch(writingChanged(text)),
    onSpeaking: (answer) => dispatch(finishSpeaking(answer)),
  }

  return (
    <main className={page}>
      {stage === 'intro' && (
        <AssessmentIntro
          kicker={`Checkpoint · week ${week}`}
          title="Checkpoint mock"
          lede="Four sections, one per skill. Your result sets how your plan adjusts."
          sections={mockSections}
          speakingSeconds={content.speaking.speakSeconds}
          rules={mockRules}
          startLabel="Start the mock"
          onStart={() => dispatch(mockStarted(id))}
        />
      )}

      {stage === 'section' && (
        <SectionShell key={mock.sectionIndex} section={section} index={mock.sectionIndex} total={mockSections.length} onFinish={() => dispatch(finishSection())}>
          <AssessmentSection sectionKey={section.key} content={content} answers={mock.answers} handlers={handlers} />
        </SectionShell>
      )}

      {stage === 'scoring' && <p role="status" className="m-0 text-sm text-neutral-800">Marking your mock…</p>}

      {stage === 'failed' && (
        <>
          <Kicker tone="accent">Checkpoint · week {week}</Kicker>
          <AlertBand kicker="Couldn't mark your mock" action={<Button variant="primary" onClick={() => dispatch(submitMock())}>Try again</Button>}>Your answers are kept. Check your connection and try again.</AlertBand>
        </>
      )}

      {stage === 'result' && <MockResult result={mock.result} exam={exam} onPlan={() => navigate('/plan')} onToday={() => navigate('/today')} />}
    </main>
  )
}

export function MockScreen() {
  const { id } = useParams()
  const week = checkpointIds[id]

  const plan = useSelector(selectPlan)

  if (week && week > plan.currentWeek) {
    return (
      <main className={page}>
        <Kicker tone="accent">Checkpoint · week {week}</Kicker>
        <h1 className="m-0 text-[clamp(26px,4vw,40px)] leading-[1.05] font-extrabold tracking-[-.025em]">This checkpoint unlocks in week {week}</h1>
        <p className="m-0 text-neutral-800">You are in week {plan.currentWeek}. Finish this week's sessions first.</p>
        <Link to="/plan" className="inline-flex min-h-11 items-center self-start font-bold text-accent-700 underline underline-offset-[3px]">Back to your plan</Link>
      </main>
    )
  }

  if (!week) {
    return (
      <main className={page}>
        <Kicker tone="accent">Checkpoint mock</Kicker>
        <h1 className="m-0 text-[clamp(26px,4vw,40px)] leading-[1.05] font-extrabold tracking-[-.025em]">Mock not found</h1>
        <p className="m-0 text-neutral-800">That is not a checkpoint of your course.</p>
        <Link to="/plan" className="inline-flex min-h-11 items-center self-start font-bold text-accent-700 underline underline-offset-[3px]">Back to your plan</Link>
      </main>
    )
  }
  return <MockSession key={id} id={id} week={week} />
}
