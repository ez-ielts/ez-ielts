import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getPractice } from '../../features/speaking/speakingConfig'
import { speak } from '../../features/speaking/speechService'
import { answerPaused, answerResumed, errorCleared, errorRaised, prepFinished, questionHeard, sessionReset, startSession, submitAnswer, typedModeChosen } from '../../features/speaking/speakingSlice'
import { Kicker } from '../ui/Kicker'
import { AnswerPanel } from './AnswerPanel'
import { PrepPanel } from './PrepPanel'
import { QuestionCard } from './QuestionCard'
import { ReadyPanel } from './ReadyPanel'
import { SessionSummary } from './SessionSummary'

function PracticeSession({ id, practice }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const session = useSelector((state) => state.speaking)
  const active = session.practiceId === id
  const stage = active ? session.stage : 'ready'
  const turn = practice.turns[session.turnIndex] ?? practice.turns[0]
  const voice = session.mode === 'voice'

  useEffect(() => { dispatch(sessionReset()) }, [dispatch, id])

  // The examiner reads each question; speak() always finishes, so the session cannot stall on audio.
  useEffect(() => {
    if (stage !== 'asking') return undefined
    const advance = () => dispatch(questionHeard({ prep: Boolean(turn.prepSeconds) }))
    if (!voice) {
      advance()
      return undefined
    }
    return speak(turn.question, { lang: practice.lang, onEnd: advance })
  }, [dispatch, stage, voice, turn, practice.lang])

  const start = (mode) => dispatch(startSession({ practiceId: id, totalTurns: practice.turns.length, mode }))

  return (
    <main className="mx-auto flex w-full max-w-[760px] flex-col gap-6 px-[clamp(16px,4vw,40px)] py-8">
      {stage === 'ready' && <ReadyPanel practice={practice} error={session.error} onStartVoice={() => start('voice')} onStartTyped={() => start('text')} />}

      {(stage === 'asking' || stage === 'prep' || stage === 'answering' || stage === 'paused') && (
        <>
          <Kicker>{practice.title}</Kicker>
          <QuestionCard turn={turn} index={session.turnIndex} total={session.totalTurns} speaking={stage === 'asking' && voice} onSkipAudio={() => dispatch(questionHeard({ prep: Boolean(turn.prepSeconds) }))} />
          {stage === 'prep' && <PrepPanel turn={turn} onDone={() => dispatch(prepFinished())} />}
          {(stage === 'answering' || stage === 'paused') && (
            <AnswerPanel
              key={session.turnIndex}
              turn={turn}
              lang={practice.lang}
              voice={voice}
              paused={stage === 'paused'}
              error={session.error}
              onPause={() => dispatch(answerPaused())}
              onResume={() => dispatch(answerResumed())}
              onFinish={(text, seconds) => dispatch(submitAnswer({ turn, text, seconds }))}
              onError={(kind) => dispatch(errorRaised(kind))}
              onRetry={() => dispatch(errorCleared())}
              onUseTyping={() => dispatch(typedModeChosen())}
            />
          )}
        </>
      )}

      {stage === 'complete' && <SessionSummary practice={practice} turns={session.turns} onBack={() => navigate('/today')} onRetry={() => dispatch(sessionReset())} />}
    </main>
  )
}

export function SpeakingScreen() {
  const { id } = useParams()
  const exam = useSelector((state) => state.session.exam)
  const practice = getPractice(exam, id)

  if (!practice) {
    return (
      <main className="mx-auto flex w-full max-w-[760px] flex-col gap-3 px-[clamp(16px,4vw,40px)] py-8">
        <Kicker tone="accent">Speaking practice</Kicker>
        <h1 className="m-0 text-[clamp(26px,4vw,40px)] leading-[1.05] font-extrabold tracking-[-.025em]">Practice not found</h1>
        <p className="m-0 text-neutral-800">That practice is not part of your exam course.</p>
        <Link to="/today" className="inline-flex min-h-11 items-center self-start font-bold text-accent-700 underline underline-offset-[3px]">Back to Today</Link>
      </main>
    )
  }
  return <PracticeSession key={`${exam}-${id}`} id={id} practice={practice} />
}
