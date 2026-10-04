import { useEffect, useRef, useState } from 'react'

// Counts down once per second while `running` and calls onDone once when it reaches zero.
export function useCountdown(seconds, { running, onDone }) {
  const [remaining, setRemaining] = useState(seconds)
  const doneRef = useRef(onDone)

  useEffect(() => { doneRef.current = onDone })

  const finished = remaining <= 0

  useEffect(() => {
    if (!running || finished) return undefined
    const id = setInterval(() => setRemaining((value) => Math.max(0, value - 1)), 1000)
    return () => clearInterval(id)
  }, [running, finished])

  useEffect(() => {
    if (remaining === 0 && seconds > 0) doneRef.current()
  }, [remaining, seconds])

  return remaining
}

export const formatClock = (seconds) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`
