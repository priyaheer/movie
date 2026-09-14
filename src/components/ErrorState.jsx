import { AlertTriangle, RotateCcw } from 'lucide-react'

export default function ErrorState({
  title = 'Oops! Something went wrong.',
  description = "We couldn't load this right now.",
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-marquee/20 bg-marquee/5 px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-marquee/15 text-marquee">
        <AlertTriangle size={26} />
      </div>
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      <p className="max-w-sm text-sm leading-relaxed text-ink-muted">{description}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-3 flex items-center gap-2 rounded-lg border border-white/10 bg-surface-2 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-gold/40 hover:text-gold"
        >
          <RotateCcw size={15} />
          Try Again
        </button>
      )}
    </div>
  )
}
