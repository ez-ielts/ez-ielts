import { useDispatch, useSelector } from 'react-redux'
import { reminderOptions, reminderTimeChosen, reminderTimes, reminderToggled } from '../../features/settings/settingsSlice'
import { ChoiceQuestion } from '../ui/ChoiceQuestion'
import { Toggle } from '../ui/Toggle'

export function ReminderSettings() {
  const dispatch = useDispatch()
  const { reminders, reminderTime } = useSelector((state) => state.settings)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-[2px] border-2 border-ink bg-ink">
        {reminderOptions.map((option) => (
          <Toggle key={option.key} label={option.label} note={option.note} checked={reminders[option.key]} onToggle={() => dispatch(reminderToggled(option.key))} />
        ))}
      </div>
      <ChoiceQuestion label="Reminder time" options={reminderTimes} value={reminderTime} hint="Emails arrive at this time of day in your time zone." onChoose={(value) => dispatch(reminderTimeChosen(value))} />
    </div>
  )
}
