import { useDispatch, useSelector } from 'react-redux'
import { useHomework } from '../../features/homework/useHomework'
import { examLabels } from '../../features/session/sessionSlice'
import { tutorErrorCopy, tutorIntro, tutorSuggestions } from '../../features/tutor/tutorConfig'
import { askTutor, requestTutorReply, selectTutorContext } from '../../features/tutor/tutorSlice'
import { ChatThread } from '../chat/ChatThread'
import { Button } from '../ui/Button'
import { Kicker } from '../ui/Kicker'
import { SummaryTable } from '../ui/SummaryTable'

export function TutorScreen() {
  const dispatch = useDispatch()
  useHomework()
  const exam = useSelector((state) => state.session.exam)
  const { messages, status, errorKind } = useSelector((state) => state.tutor)
  const context = useSelector(selectTutorContext)
  const started = messages.length > 0

  const rows = [
    { label: 'Exam', value: examLabels[exam] },
    { label: 'Estimate → target', value: `${context.start} → ${context.target}` },
    { label: 'This week', value: `${context.week} of ${context.totalWeeks}` },
    { label: 'Focus skills', value: context.focus.join(', ') },
    { label: 'Overdue', value: context.overdue ?? 'Nothing' },
  ]

  return (
    <main className="flex flex-col gap-6 px-[clamp(16px,4vw,40px)] py-8">
      <header className="border-b-2 border-ink pb-4">
        <Kicker tone="accent">Your tutor</Kicker>
        <h1 className="mt-2 mb-0 max-w-[24ch] text-[clamp(30px,4.2vw,46px)] leading-[1.02] font-extrabold tracking-[-.025em] text-pretty">Ask about your plan, your marked work or any task type</h1>
        <p className="mt-3 mb-0 max-w-[56ch] text-sm text-neutral-800">The tutor only answers questions about preparing for {examLabels[exam]}.</p>
      </header>
      <div className="flex flex-wrap gap-x-8 gap-y-6">
        <aside aria-label="What your tutor knows" className="flex max-w-[360px] flex-[1_1_260px] flex-col gap-4">
          <h2 className="m-0 text-[17px] font-extrabold tracking-[-.01em]">What your tutor knows</h2>
          <SummaryTable rows={rows} />
          {!started && (
            <div className="flex flex-col items-start gap-2">
              <Kicker spacing="normal">Try asking</Kicker>
              {tutorSuggestions[exam].map((question) => <Button key={question} onClick={() => dispatch(askTutor(question))}>{question}</Button>)}
            </div>
          )}
        </aside>
        <div className="min-w-0 flex-[2_1_420px]">
          <ChatThread
            messages={messages}
            intro={tutorIntro(exam)}
            loading={status === 'loading'}
            errorKind={status === 'failed' ? errorKind : null}
            errorCopy={tutorErrorCopy}
            label="Chat with your tutor"
            placeholder="Ask your tutor"
            onSend={(text) => dispatch(askTutor(text))}
            onRetry={() => dispatch(requestTutorReply())}
          />
        </div>
      </div>
    </main>
  )
}
