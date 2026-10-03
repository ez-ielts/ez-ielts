const requiredParts = ['part1', 'part2', 'part3']
const requiredCriteria = ['fluency_coherence', 'lexical_resource', 'grammatical_range_accuracy', 'pronunciation']

const stringProperty = (description) => ({ type: 'string', description })

export const examinerTools = [
  {
    type: 'function',
    name: 'record_turn_evidence',
    description: 'Persist observable evidence from one completed candidate turn. Do not score the turn here.',
    strict: true,
    parameters: {
      type: 'object',
      properties: {
        assessment_id: stringProperty('Server-issued assessment identifier.'),
        part: { type: 'string', enum: requiredParts },
        question: stringProperty('The exact examiner question.'),
        transcript_excerpt: stringProperty('A faithful excerpt from the candidate response.'),
        duration_seconds: { type: 'number', minimum: 0, maximum: 180 },
        observations: { type: 'array', items: stringProperty('One observable behavior, such as a hesitation or self-correction.') },
      },
      required: ['assessment_id', 'part', 'question', 'transcript_excerpt', 'duration_seconds', 'observations'],
      additionalProperties: false,
    },
  },
  {
    type: 'function',
    name: 'record_rubric_observation',
    description: 'Persist evidence-backed observation for one IELTS Speaking criterion. This is not a final band score.',
    strict: true,
    parameters: {
      type: 'object',
      properties: {
        assessment_id: stringProperty('Server-issued assessment identifier.'),
        criterion: { type: 'string', enum: requiredCriteria },
        evidence_turn_ids: { type: 'array', items: stringProperty('Recorded turn evidence identifier.') },
        observation: stringProperty('Specific evidence-backed observation.'),
        confidence: { type: 'string', enum: ['low', 'medium', 'high'] },
      },
      required: ['assessment_id', 'criterion', 'evidence_turn_ids', 'observation', 'confidence'],
      additionalProperties: false,
    },
  },
  {
    type: 'function',
    name: 'record_behavior_summary',
    description: 'Record the participant behavior summary after the interview is complete.',
    strict: true,
    parameters: {
      type: 'object',
      properties: {
        assessment_id: stringProperty('Server-issued assessment identifier.'),
        completed_parts: { type: 'array', items: { type: 'string', enum: requiredParts } },
        response_length: { type: 'string', enum: ['mostly_short', 'mixed', 'mostly_developed'] },
        hesitation: { type: 'string', enum: ['rare', 'occasional', 'frequent'] },
        self_correction: { type: 'string', enum: ['rare', 'occasional', 'frequent'] },
        turn_taking: { type: 'string', enum: ['consistent', 'some_support_needed', 'frequent_support_needed'] },
        technical_interruptions: { type: 'array', items: stringProperty('Technical interruption or empty array.') },
        summary: stringProperty('Neutral summary grounded in the interview evidence.'),
      },
      required: ['assessment_id', 'completed_parts', 'response_length', 'hesitation', 'self_correction', 'turn_taking', 'technical_interruptions', 'summary'],
      additionalProperties: false,
    },
  },
  {
    type: 'function',
    name: 'finalize_speaking_assessment',
    description: 'Validate evidence and create a placement estimate. The server rejects incomplete evidence.',
    strict: true,
    parameters: {
      type: 'object',
      properties: { assessment_id: stringProperty('Server-issued assessment identifier.') },
      required: ['assessment_id'],
      additionalProperties: false,
    },
  },
]

export function validateAssessmentForFinalization({ completedParts = [], observedCriteria = [], behaviorSummary }) {
  const missingParts = requiredParts.filter((part) => !completedParts.includes(part))
  const missingCriteria = requiredCriteria.filter((criterion) => !observedCriteria.includes(criterion))
  return { valid: missingParts.length === 0 && missingCriteria.length === 0 && Boolean(behaviorSummary), missingParts, missingCriteria, missingBehaviorSummary: !behaviorSummary }
}
