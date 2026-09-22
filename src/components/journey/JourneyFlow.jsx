import { useSelector } from 'react-redux'
import { AccountStep } from './AccountStep'
import { AssessmentStep } from './AssessmentStep'
import { DiagnosisStep } from './DiagnosisStep'
import { StudyPlanStep } from './StudyPlanStep'

export function JourneyFlow() {
  const currentStep = useSelector((state) => state.journey.currentStep)
  const steps = [
    <AccountStep key="account" />,
    <AssessmentStep key="assessment" />,
    <DiagnosisStep key="diagnosis" />,
    <StudyPlanStep key="study-plan" />,
  ]

  return <>{steps[currentStep]}</>
}
