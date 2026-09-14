import { Link } from 'react-router-dom'
import { Film } from 'lucide-react'

export default function EmptyState({
  icon: Icon = Film,
  title,
  description,
  actionLabel,
  actionTo,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/5 bg-surface/60 px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-2 text-gold">
        <Icon size={26} />
      </div>
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      {description && (
        <p className="max-w-sm text-sm leading-relaxed text-ink-muted">{description}</p>
      )}
      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="mt-3 rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-base transition-colors hover:bg-gold-bright"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  )
}
