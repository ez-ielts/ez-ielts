import { ListeningSection } from './ListeningSection'
import { ReadingSection } from './ReadingSection'
import { SpeakingSection } from './SpeakingSection'
import { WritingSection } from './WritingSection'

// Renders the content of one section of a timed assessment (the checkpoint mock or the placement). `content` has the shape of
// `mockContent[exam]`; `handlers` are { onChoose(sectionKey)(questionId, value), onWriting(text), onSpeaking({ text, seconds }) }.
export function AssessmentSection({ sectionKey, content, answers, handlers }) {
  if (sectionKey === 'listening') return <ListeningSection content={content.listening} chosen={answers.listening} onChoose={handlers.onChoose('listening')} />
  if (sectionKey === 'reading') return <ReadingSection content={content.reading} chosen={answers.reading} onChoose={handlers.onChoose('reading')} />
  if (sectionKey === 'writing') return <WritingSection content={content.writing} text={answers.writing} onChange={handlers.onWriting} />
  return <SpeakingSection turn={content.speaking} lang={content.speakingLang} onFinish={handlers.onSpeaking} />
}
