const tones = { accent: 'text-accent-700', muted: 'text-neutral-800' }
const spacings = { wide: 'tracking-[.15em]', normal: 'tracking-[.12em]' }

export function Kicker({ tone = 'muted', spacing = 'wide', className = '', children }) {
  return <div className={`text-[11px] font-bold uppercase ${spacings[spacing]} ${tones[tone]} ${className}`}>{children}</div>
}
