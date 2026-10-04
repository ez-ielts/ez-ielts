import { useEffect, useRef, useState } from 'react'
import { startRecognition } from './speechService'

// Live transcript for one answer. Recognition runs only while `listening`; text finalised before a pause is kept.
export function useVoiceAnswer({ listening, lang, onError }) {
  const finalRef = useRef('')
  const [text, setText] = useState('')
  const errorRef = useRef(onError)

  useEffect(() => { errorRef.current = onError })

  useEffect(() => {
    if (!listening) return undefined
    const recognition = startRecognition({
      lang,
      onText: ({ finalText, interim }) => {
        if (finalText) finalRef.current = `${finalRef.current} ${finalText}`.trim()
        setText(`${finalRef.current} ${interim}`.trim())
      },
      onError: (kind) => errorRef.current(kind),
    })
    return () => recognition.stop()
  }, [listening, lang])

  return text
}
