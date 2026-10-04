// Browser speech boundary: microphone permission, speech recognition (transcript) and speech synthesis (examiner voice).
// Components never touch these APIs directly. Production replaces this with the Realtime voice session.
export class SpeechError extends Error {
  constructor(kind, message) {
    super(message)
    this.kind = kind // 'mic_denied' | 'mic_unavailable' | 'recognition'
  }
}

const recognitionApi = () => window.SpeechRecognition ?? window.webkitSpeechRecognition

export const canRecognize = () => Boolean(recognitionApi())
export const canSpeak = () => 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined'

// Requested only when the learner taps Start. The stream is released at once; recognition captures audio itself.
export async function requestMicrophone() {
  if (!navigator.mediaDevices?.getUserMedia) throw new SpeechError('mic_unavailable', 'No media devices')
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    stream.getTracks().forEach((track) => track.stop())
  } catch (error) {
    const denied = error?.name === 'NotAllowedError' || error?.name === 'SecurityError'
    throw new SpeechError(denied ? 'mic_denied' : 'mic_unavailable', error?.message ?? 'Microphone error')
  }
}

// Continuous recognition that restarts after browser-side silence timeouts. Returns { stop }.
// onText receives only newly finalised text plus the current interim text.
export function startRecognition({ lang, onText, onError }) {
  const Recognition = recognitionApi()
  let active = true
  const recognition = new Recognition()
  recognition.lang = lang
  recognition.continuous = true
  recognition.interimResults = true

  recognition.onresult = (event) => {
    let finalText = ''
    let interim = ''
    for (let index = event.resultIndex; index < event.results.length; index += 1) {
      const result = event.results[index]
      if (result.isFinal) finalText += result[0].transcript
      else interim += result[0].transcript
    }
    onText({ finalText, interim })
  }
  recognition.onerror = (event) => {
    if (event.error === 'no-speech' || event.error === 'aborted') return
    active = false
    onError(event.error === 'not-allowed' || event.error === 'service-not-allowed' ? 'mic_denied' : 'recognition')
  }
  recognition.onend = () => {
    if (!active) return
    try { recognition.start() } catch { /* already restarting */ }
  }

  try { recognition.start() } catch { onError('recognition') }
  return { stop() { active = false; recognition.onend = null; try { recognition.stop() } catch { /* already stopped */ } } }
}

// Speaks `text`, then calls onEnd once: when the voice finishes, or after an estimated duration so the session never stalls.
// Returns a cancel function.
export function speak(text, { lang, onEnd }) {
  let finished = false
  const finish = () => {
    if (finished) return
    finished = true
    clearTimeout(timer)
    onEnd()
  }
  const estimateMs = 1500 + text.split(/\s+/).length * 450
  const timer = setTimeout(finish, estimateMs)

  if (canSpeak()) {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    utterance.onend = finish
    utterance.onerror = finish
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
  }
  return () => {
    finished = true
    clearTimeout(timer)
    if (canSpeak()) window.speechSynthesis.cancel()
  }
}
