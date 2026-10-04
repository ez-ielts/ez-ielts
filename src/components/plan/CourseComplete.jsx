import { Button } from '../ui/Button'
import { Kicker } from '../ui/Kicker'

// Shown after the final checkpoint mock. Reached: the next course starts from this result. Not reached: the conditional guarantee, never a promise.
export function CourseComplete({ overall, target, nextStart, nextTarget, onNextCourse, onRetake }) {
  const reached = overall >= Number(target)

  return (
    <section aria-labelledby="course-complete" className="flex flex-wrap items-center gap-4 border-2 border-ink p-4">
      <div className="min-w-0 flex-[1_1_320px]">
        <Kicker tone="accent">Course complete</Kicker>
        <h2 id="course-complete" className="mt-1 mb-0 text-[17px] font-extrabold tracking-[-.01em]">Your final mock: {overall}</h2>
        <p className="mt-1 mb-0 max-w-[60ch] text-[13.5px] text-neutral-800">
          {reached
            ? `You reached ${overall}${overall > Number(target) ? `, past the ${target} target` : ''}. Your next course (${nextStart} → ${nextTarget}) starts from this result.`
            : `This is below the ${target} target. If you completed the assigned work, the guarantee extends your course free until it is reached.`}
        </p>
      </div>
      {reached
        ? <Button variant="primary" size="lg" arrow onClick={onNextCourse} className="min-w-[220px]">Start next course</Button>
        : <Button variant="primary" size="lg" arrow onClick={onRetake} className="min-w-[220px]">Retake the final mock</Button>}
    </section>
  )
}
