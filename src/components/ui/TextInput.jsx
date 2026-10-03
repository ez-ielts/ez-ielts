export function TextInput({ className = 'min-h-11 border border-ink/40 px-[10px] py-1.5 hover:border-ink/60 focus-visible:border-accent', ...props }) {
  return <input className={`w-full bg-surface text-sm text-ink caret-accent focus-visible:outline-offset-0 ${className}`} {...props} />
}
