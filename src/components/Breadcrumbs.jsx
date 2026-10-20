import { Link } from 'react-router-dom'

export default function Breadcrumbs({ items, light = false }) {
  const muted = light ? 'text-white/70' : 'text-ink/55'
  const current = light ? 'text-white' : 'text-ink'

  return (
    <nav aria-label="Breadcrumb" className={`text-[11px] uppercase tracking-[0.22em] ${muted}`}>
      <ol className="flex flex-wrap items-center gap-x-0">
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={item.path || item.name} className="flex items-center">
              {i > 0 && <span className="mx-3">/</span>}
              {last || !item.path ? (
                <span className={last ? current : undefined}>{item.name}</span>
              ) : (
                <Link to={item.path} className="hover:opacity-100" style={{ opacity: 0.85 }}>
                  {item.name}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
