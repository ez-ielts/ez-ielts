import { createSelector } from '@reduxjs/toolkit'
import { selectOverdueItem } from '../homework/homeworkSlice'
import { lateWorkAdjustment } from './adjustmentRules'

// The adjustments in force now. Extra-practice entries come from the last checkpoint; "Late work" follows the live overdue item,
// so it disappears when that item is submitted. After a checkpoint with nothing to adjust, "Plan unchanged" is shown.
export const selectActiveAdjustments = createSelector(
  [(state) => state.plan.adjustments, selectOverdueItem],
  (stored, overdue) => {
    const focus = stored.filter((adjustment) => adjustment.id.startsWith('focus-'))
    const late = overdue ? [lateWorkAdjustment(`${overdue.task} ${overdue.title.toLowerCase()}`)] : []
    const active = [...focus, ...late]
    return active.length ? active : stored.filter((adjustment) => adjustment.id === 'unchanged')
  },
)
