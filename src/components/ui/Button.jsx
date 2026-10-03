const variants = {
  primary: 'px-[14px] bg-accent text-ground hover:bg-accent-600 active:bg-accent-700',
  secondary: 'px-[14px] border border-ink/40 text-ink hover:bg-ink/7 active:bg-ink/14',
  ghost: 'px-1 text-accent-700 hover:bg-accent/10 active:bg-accent/18',
}

const sizes = { sm: 'min-h-10', md: 'min-h-11', lg: 'min-h-12', xl: 'min-h-[52px]' }

// Labels sit flush left; a button wider than its label pushes the trailing arrow to the right edge.
export function Button({ variant = 'secondary', size = 'md', arrow = false, type = 'button', className = '', children, ...props }) {
  const layout = arrow ? 'justify-between' : 'justify-center'
  return (
    <button
      type={type}
      className={`inline-flex items-center gap-1.5 py-2 text-left text-sm leading-[1.2] font-extrabold disabled:cursor-not-allowed disabled:opacity-45 ${layout} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
      {arrow && <span aria-hidden="true">→</span>}
    </button>
  )
}
