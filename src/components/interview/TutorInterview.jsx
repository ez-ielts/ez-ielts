import { ChatThread } from '../chat/ChatThread'
import { Button } from '../ui/Button'
import { SummaryTable } from '../ui/SummaryTable'

const errorCopy = {
  network: 'The tutor could not reply. Check your connection and try again, or skip the interview.',
  rate_limit: 'The tutor is getting a lot of requests right now. Wait a minute and try again, or skip the interview.',
}

export function TutorInterview({ summary, messages, loading, errorKind, done, onSend, onRetry, onBuildCourse, onSkip }) {
  return (
    <>
      <div className="flex flex-wrap gap-8">
        <div className="flex max-w-[340px] flex-[1_1_260px] flex-col gap-3">
          <h1 className="m-0 text-[clamp(28px,4vw,44px)] leading-[1.02] font-extrabold tracking-[-.025em]">A short talk with your tutor</h1>
          <p className="m-0 text-sm leading-[1.55] text-neutral-800">Three or four questions about how you study. Answer in English; this also feeds your speaking estimate.</p>
          <SummaryTable rows={summary} />
        </div>
        <div className="min-w-0 flex-[2_1_420px]">
          <ChatThread
            messages={messages}
            loading={loading}
            errorKind={errorKind}
            errorCopy={errorCopy}
            label="Interview with your tutor"
            onSend={onSend}
            onRetry={onRetry}
            footer={done ? (
              <div className="flex flex-wrap items-center gap-3 border-t-2 border-ink px-4 py-3">
                <span className="flex-1 text-[13.5px]">Interview complete.</span>
                <Button variant="primary" size="lg" arrow onClick={onBuildCourse} className="min-w-[200px]">Build my course</Button>
              </div>
            ) : undefined}
          />
        </div>
      </div>
      <Button variant="ghost" onClick={onSkip} className="self-start">Skip interview and build the course</Button>
    </>
  )
}
