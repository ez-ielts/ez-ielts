import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { analyzeInterview } from '../../features/interview/interviewService'
import { interviewParts } from '../../features/interview/interviewConfig'
import { completeInterview, moveToInterviewPart, nextStep, setInterviewAnswer, setInterviewRecording, setPrepSeconds, startInterview, submitInterviewAnswer } from '../../features/journey/journeySlice'
import { InterviewRubric } from './InterviewRubric'
import { InterviewTimer } from './InterviewTimer'

const getSpeechRecognition = () => window.SpeechRecognition || window.webkitSpeechRecognition

function VoiceWaveform({ recording }) {
  return <div className="mb-3 flex items-center gap-1.5">{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((bar) => <span key={bar} className={`w-1 rounded-full bg-[#6f9a78] ${recording ? 'animate-pulse' : ''}`} style={{ height: `${recording ? 10 + ((bar * 7) % 25) : 8}px` }} />)}</div>
}

export function AssessmentStep() {
  const dispatch = useDispatch()
  const interview = useSelector((state) => state.journey.interview)
  const recorderRef = useRef(null)
  const recognitionRef = useRef(null)
  const [prepActive, setPrepActive] = useState(false)
  const [micError, setMicError] = useState('')
  const [examinerReply, setExaminerReply] = useState('')
  const [examinerSpeaking, setExaminerSpeaking] = useState(false)
  const currentPart = interviewParts[interview.part]
  const currentQuestion = currentPart.questions[interview.questionIndex]
  const partTwoReady = interview.part !== 2 || interview.prepSeconds === 0
  const isPrepActive = prepActive && interview.prepSeconds > 0

  useEffect(() => {
    if (!prepActive || interview.prepSeconds <= 0) return undefined
    const timer = window.setInterval(() => dispatch(setPrepSeconds(interview.prepSeconds - 1)), 1000)
    return () => window.clearInterval(timer)
  }, [dispatch, interview.prepSeconds, prepActive])

  const startListening = async () => {
    setMicError('')
    if (!navigator.mediaDevices?.getUserMedia) {
      setMicError('Microphone access is unavailable. Use the text fallback below.')
      return
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      recorder.onstop = () => stream.getTracks().forEach((track) => track.stop())
      recorder.start()
      recorderRef.current = recorder
      const SpeechRecognition = getSpeechRecognition()
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition()
        recognition.continuous = true
        recognition.interimResults = true
        recognition.lang = 'en-GB'
        recognition.onresult = (event) => dispatch(setInterviewAnswer(Array.from(event.results).map((result) => result[0].transcript).join(' ')))
        recognition.start()
        recognitionRef.current = recognition
      } else {
        setMicError('Live transcription is not available in this browser. Your audio is still being recorded.')
      }
      dispatch(setInterviewRecording(true))
    } catch {
      setMicError('Microphone permission was not granted. Use the text fallback below.')
    }
  }

  const stopListening = () => {
    if (recorderRef.current?.state === 'recording') recorderRef.current.stop()
    if (recognitionRef.current) recognitionRef.current.stop()
    recorderRef.current = null
    recognitionRef.current = null
    dispatch(setInterviewRecording(false))
  }

  const speakExaminer = (text) => {
    if (!window.speechSynthesis) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-GB'
    utterance.rate = 0.94
    window.speechSynthesis.speak(utterance)
  }

  const submitAnswer = async (event) => {
    event.preventDefault()
    if (!interview.answerDraft.trim() || !partTwoReady || examinerSpeaking) return
    if (interview.recording) stopListening()
    const answer = interview.answerDraft.trim()
    const isLastQuestion = interview.part === 3 && interview.questionIndex >= currentPart.questions.length - 1
    dispatch(submitInterviewAnswer(answer))
    const reply = interview.part === 1 ? 'Thank you. Now let’s talk about a place you would recommend to a visitor.' : interview.part === 2 ? 'Thank you. Let’s discuss how places like this change when more tourists arrive.' : isLastQuestion ? 'Thank you. That completes the speaking interview.' : currentPart.questions[interview.questionIndex + 1]
    setExaminerReply(reply)
    setExaminerSpeaking(true)
    speakExaminer(reply)
    window.setTimeout(async () => {
      setExaminerReply('')
      setExaminerSpeaking(false)
      if (interview.part === 1 && interview.questionIndex >= currentPart.questions.length - 1) dispatch(moveToInterviewPart(2))
      if (interview.part === 2) dispatch(moveToInterviewPart(3))
      if (isLastQuestion) {
        await analyzeInterview({ transcript: [...interview.transcript, { speaker: 'candidate', text: answer }] })
        dispatch(completeInterview())
        dispatch(nextStep())
      }
    }, 1600)
  }

  return (
    <section className="max-w-[600px]">
      <div className="mb-[21px] text-[9px] font-bold tracking-[1.55px] text-[#a7ada6]">02 / AI ASSESSMENT</div>
      <div className="sm:flex sm:items-start sm:justify-between">
        <div>
          <h2 className="m-0 mb-[18px] font-serif text-[45px] leading-[.96] tracking-[-1.9px] sm:text-[55px]">Let’s hear<br /><em className="text-[#527b61]">how you think.</em></h2>
          <p className="max-w-[430px] text-xs leading-[1.65] text-[#7f867f]">A voice-first IELTS Speaking interview. Talk naturally to your AI examiner; your transcript is only supporting evidence.</p>
        </div>
        <InterviewTimer seconds={interview.part === 2 ? interview.prepSeconds : 0} label={interview.part === 2 && interview.prepSeconds > 0 ? 'PREP' : currentPart.time} />
      </div>
      {interview.status === 'idle' ? <Intro dispatch={dispatch} /> : <LiveInterview interview={interview} currentPart={currentPart} currentQuestion={currentQuestion} partTwoReady={partTwoReady} isPrepActive={isPrepActive} prepActive={prepActive} setPrepActive={setPrepActive} examinerReply={examinerReply} examinerSpeaking={examinerSpeaking} micError={micError} startListening={startListening} stopListening={stopListening} submitAnswer={submitAnswer} dispatch={dispatch} />}
    </section>
  )
}

function Intro({ dispatch }) {
  return <div className="mt-8"><div className="mb-5 flex items-center gap-3.5 rounded bg-[#e9f1e8] p-[18px_20px]"><div className="grid h-[43px] w-[43px] shrink-0 place-items-center rounded-full bg-[#215641] font-serif text-lg text-white">e</div><div><span className="text-[8px] font-bold tracking-[1.2px] text-[#568063]">● LIVE AI EXAMINER</span><h3 className="m-1 font-serif text-base font-medium">A face-to-face speaking assessment</h3><p className="m-0 text-[10px] text-[#758379]">12–15 minutes · Parts 1, 2, and 3 · IELTS public band criteria</p></div></div><InterviewRubric /><button type="button" onClick={() => dispatch(startInterview())} className="mt-5 flex h-[45px] w-full items-center justify-between rounded bg-[#215641] px-[18px] text-left text-[11px] font-bold text-white">Enter voice interview <span className="text-base">↗</span></button></div>
}

function LiveInterview({ interview, currentPart, currentQuestion, partTwoReady, isPrepActive, prepActive, setPrepActive, examinerReply, examinerSpeaking, micError, startListening, stopListening, submitAnswer, dispatch }) {
  return <div className="mt-8"><div className="mb-4 flex items-center justify-between"><div><span className="text-[8px] font-bold tracking-[1.2px] text-[#568063]">{currentPart.label.toUpperCase()}</span><p className="mt-1 text-[10px] text-[#758379]">{currentPart.instruction}</p></div><span className="rounded-full bg-[#e9f1e8] px-2 py-1 text-[9px] font-bold text-[#568063]">{interview.part}/3</span></div>{interview.part === 2 && <CueCard currentPart={currentPart} partTwoReady={partTwoReady} isPrepActive={isPrepActive} prepActive={prepActive} setPrepActive={setPrepActive} />}<div className="rounded border border-[#e1e5df] bg-white p-4"><div className="mb-5 flex items-start gap-2.5"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#215641] font-serif text-sm text-white">e</span><div><span className="text-[8px] font-bold tracking-[1px] text-[#568063]">{examinerSpeaking ? 'EXAMINER IS SPEAKING' : 'EXAMINER IS LISTENING'}</span><p className="mt-1 text-[13px] leading-[1.4] text-[#405548]">{examinerReply || currentQuestion}</p></div></div>{examinerSpeaking && <p className="mb-4 text-[9px] text-[#7c907f]">● The examiner is responding...</p>}{micError && <p className="mb-3 rounded bg-[#f8e9e2] p-2 text-[10px] text-[#a46c56]">{micError}</p>}<form onSubmit={submitAnswer}><div className={`mb-3 flex min-h-[110px] flex-col items-center justify-center rounded border ${interview.recording ? 'border-[#d99079] bg-[#fff5f1]' : 'border-[#e0e2dc] bg-[#fafbf8]'}`}><VoiceWaveform recording={interview.recording} /><button type="button" onClick={interview.recording ? stopListening : startListening} disabled={!partTwoReady || examinerSpeaking} className={`rounded-full px-5 py-2.5 text-[10px] font-bold ${interview.recording ? 'bg-[#d99079] text-white' : 'bg-[#215641] text-white'} disabled:opacity-50`}>{interview.recording ? '■ Stop speaking' : '◉ Tap to speak'}</button><span className="mt-2 text-[9px] text-[#9aa39b]">{interview.recording ? 'Listening to your answer...' : 'Your microphone stays off until you tap'}</span></div><label className="block text-[9px] text-[#8a958c]">Transcript fallback<textarea required value={interview.answerDraft} onChange={(event) => dispatch(setInterviewAnswer(event.target.value))} disabled={!partTwoReady || examinerSpeaking} placeholder="If voice transcription is unavailable, type what you would say..." className="mt-1 min-h-[55px] w-full resize-y rounded border border-[#e0e2dc] p-2.5 text-[10px] outline-none placeholder:text-[#a0a7a0] focus:border-[#96b59d] disabled:bg-[#f5f6f2]" /></label><div className="mt-2.5 flex justify-end"><button type="submit" disabled={!partTwoReady || examinerSpeaking} className="rounded bg-[#215641] px-3 py-2 text-[10px] font-bold text-white disabled:opacity-50">Send answer to examiner ↗</button></div></form></div>{interview.transcript.length > 0 && <p className="mt-3 text-[9px] text-[#8b958e]">{interview.transcript.length} spoken answer{interview.transcript.length === 1 ? '' : 's'} captured for scoring evidence.</p>}</div>
}

function CueCard({ currentPart, partTwoReady, isPrepActive, setPrepActive }) {
  return <div className="mb-4 rounded border border-[#e7dcae] bg-[#f8f1d9] p-4"><span className="text-[8px] font-bold tracking-[1.2px] text-[#9a854a]">CUE CARD</span><h3 className="my-2 font-serif text-lg font-medium text-[#615634]">{currentPart.cueCard}</h3><ul className="m-0 grid grid-cols-2 gap-1.5 pl-4 text-[10px] text-[#887951]">{currentPart.prompts.map((prompt) => <li key={prompt}>{prompt}</li>)}</ul>{!partTwoReady && <button type="button" onClick={() => setPrepActive(true)} disabled={isPrepActive} className="mt-4 rounded bg-[#8e7b40] px-3 py-2 text-[10px] font-bold text-white disabled:opacity-60">{isPrepActive ? 'Use your one minute to make notes...' : 'Start one-minute preparation'}</button>}</div>
}
