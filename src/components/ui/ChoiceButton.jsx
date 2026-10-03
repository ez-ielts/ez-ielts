export function ChoiceButton({ selected, onSelect, children }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`min-h-11 border-2 border-ink px-4 text-[13.5px] font-bold ${selected ? 'bg-ink text-ground' : 'bg-ground text-ink hover:bg-ink/7'}`}
    >
      {children}
    </button>
  )
}
