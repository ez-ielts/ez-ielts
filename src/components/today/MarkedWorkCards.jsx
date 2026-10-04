import { Link } from 'react-router-dom'

// items: [{ kicker, title, body, cta, to }]
export function MarkedWorkCards({ items }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-4">
      {items.map((item) => (
        <Link key={item.title} to={item.to} className="flex flex-col gap-2 bg-surface p-4 text-ink no-underline hover:bg-neutral-200">
          <span className="text-[10px] tracking-[.1em] text-accent-700 uppercase">{item.kicker}</span>
          <span className="text-[17px] leading-[1.2] font-extrabold">{item.title}</span>
          <span className="flex-1 text-[13.5px] leading-normal opacity-80">{item.body}</span>
          <span className="text-[13px] font-bold text-accent-700">{item.cta} <span aria-hidden="true">→</span></span>
        </Link>
      ))}
    </div>
  )
}
