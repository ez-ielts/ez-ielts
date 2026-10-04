import { Button } from '../ui/Button'
import { Kicker } from '../ui/Kicker'
import { Tag } from '../ui/Tag'
import { EstimateTrend } from './EstimateTrend'

export function TodayAside({ content, measuredWeeks, onSpeaking, onTutor }) {
  return (
    <aside className="flex min-w-0 flex-[1_1_260px] flex-col gap-6 px-[clamp(16px,3vw,24px)] py-8">
      <EstimateTrend label={content.scoreLabel} score={content.score} target={content.target} mockIn={content.mockIn} trend={content.trend} measuredWeeks={measuredWeeks} />

      <section className="border-t-2 border-ink pt-4">
        <Kicker>By skill</Kicker>
        <table className="mt-3 w-full border-collapse text-sm">
          <tbody>
            {content.skills.map((skill) => (
              <tr key={skill.name}>
                <th scope="row" className="border-b border-ink/40 p-2 text-left font-normal">{skill.name}</th>
                <td className={`border-b border-ink/40 p-2 text-right font-bold ${skill.weak ? 'text-accent-700' : ''}`}>
                  {skill.score}{skill.weak && <span className="sr-only"> (focus skill)</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="flex flex-col gap-3 border-t-2 border-ink pt-4">
        <Kicker>Drill queue · {content.drillsDue} due</Kicker>
        <div className="flex flex-wrap gap-2">
          {content.drills.map((drill) => <Tag key={drill}>{drill}</Tag>)}
        </div>
        <p className="m-0 text-[11.5px] text-neutral-800">Items enter the queue from your own marked work and leave it once you use them correctly in an essay.</p>
        <Button block onClick={onSpeaking} className="mt-2">Speaking practice · 6 min</Button>
      </section>

      <section className="flex flex-col gap-2 border-2 border-ink p-4">
        <Kicker tone="accent">Tutor</Kicker>
        <p className="m-0 text-[13.5px] leading-normal">{content.tutorNote}</p>
        <Button variant="ghost" block onClick={onTutor} className="mt-2">Ask about your marked work</Button>
      </section>
    </aside>
  )
}
