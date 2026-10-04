const floorHalf = (value) => Math.floor(value * 2) / 2

// Pace for a checkpoint: a straight line from the start estimate to the half-band course target over the whole course, rounded down to a half band.
export const expectedBand = ({ start, target, week, totalWeeks }) => floorHalf(Number(start) + ((Number(target) - Number(start)) * week) / totalWeeks)

export const lateWorkAdjustment = (overdue) => ({ id: 'late-work', title: 'Late work', detail: `"${overdue}" is overdue. The next session is shortened to make room for it. A second late submission voids the guarantee.` })

// Turns a checkpoint result (and any overdue homework) into plan adjustments. Rules are in design/mock-exam.md.
export function planAdjustments({ skills, start, target, week, totalWeeks, overdue }) {
  const pace = expectedBand({ start, target, week, totalWeeks })
  const adjustments = skills
    .filter((skill) => skill.band < pace)
    .map((skill) => ({
      id: `focus-${skill.key}`,
      title: `Extra ${skill.name} practice`,
      detail: `${skill.name} ${skill.band} is below the ${pace} pace for week ${week}. Two extra ${skill.name} sessions are added to each week until the next checkpoint.`,
    }))
  if (overdue) adjustments.push(lateWorkAdjustment(overdue))
  if (!adjustments.length) adjustments.push({ id: 'unchanged', title: 'Plan unchanged', detail: `Every skill is at or above the ${pace} pace for week ${week}. The plan continues as scheduled.` })
  return { pace, adjustments }
}
