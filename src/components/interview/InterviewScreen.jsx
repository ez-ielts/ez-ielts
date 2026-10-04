import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { courseName } from '../../features/pricing/pricingConfig'
import { courseStages, courseWeeks, goalHint, goalOptions, intakeQuestions, intakeStages, studyHours } from '../../features/intake/intakeConfig'
import { answerChosen, beginInterview, reasonChanged, requestTutorReply, selectIntakeProfile, sendLearnerReply, stageChanged } from '../../features/intake/intakeSlice'
import { startTrial } from '../../features/session/sessionSlice'
import { StageStrip } from '../ui/StageStrip'
import { CourseSummary } from './CourseSummary'
import { IntakeQuestionnaire } from './IntakeQuestionnaire'
import { TutorInterview } from './TutorInterview'

const stageIndex = { questionnaire: 0, interview: 1, course: 2 }

export function InterviewScreen() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const exam = useSelector((state) => state.session.exam)
  const intake = useSelector((state) => state.intake)
  const profile = useSelector(selectIntakeProfile)

  const buildCourse = () => dispatch(stageChanged('course'))

  return (
    <main className="flex flex-col gap-6 px-[clamp(16px,4vw,40px)] py-6">
      <StageStrip stages={intakeStages} current={stageIndex[intake.stage]} />

      {intake.stage === 'questionnaire' && (
        <IntakeQuestionnaire
          questions={intakeQuestions.map((question) => question.key === 'goal' ? { ...question, options: goalOptions(profile.start), hint: goalHint(profile.start, profile.target) } : question)}
          profile={profile}
          reason={intake.reason}
          onChoose={(key, value) => dispatch(answerChosen({ key, value }))}
          onReasonChange={(value) => dispatch(reasonChanged(value))}
          onSubmit={() => dispatch(beginInterview())}
        />
      )}

      {intake.stage === 'interview' && (
        <TutorInterview
          summary={[
            { label: 'Estimate', value: profile.start },
            { label: 'Target', value: profile.target },
            ...(profile.goal === profile.target ? [] : [{ label: 'Goal', value: profile.goal }]),
            { label: 'Time', value: `${profile.mins} × ${profile.days}` },
            { label: 'Exam', value: profile.date },
            { label: 'Focus', value: profile.weak },
          ]}
          messages={intake.messages}
          loading={intake.status === 'loading'}
          errorKind={intake.status === 'failed' ? intake.errorKind : null}
          done={intake.done}
          onSend={(text) => dispatch(sendLearnerReply(text))}
          onRetry={() => dispatch(requestTutorReply())}
          onBuildCourse={buildCourse}
          onSkip={buildCourse}
        />
      )}

      {intake.stage === 'course' && (
        <CourseSummary
          courseName={courseName(exam, profile.start)}
          start={profile.start}
          target={profile.target}
          goal={profile.goal}
          stages={courseStages(profile.start, profile.goal)}
          facts={[
            { label: 'Length', value: '8 weeks', note: `${profile.days} a week` },
            { label: 'Daily session', value: profile.mins, note: 'lesson, practice, drill' },
            { label: 'Study total', value: `${studyHours(profile)} hours`, note: 'plus homework' },
            { label: 'Checkpoints', value: 'Weeks 4 and 8', note: 'full timed mocks' },
          ]}
          weeks={courseWeeks(exam)}
          onStartTrial={() => { dispatch(startTrial()); navigate('/today') }}
          onSeePricing={() => navigate('/pricing')}
        />
      )}
    </main>
  )
}
