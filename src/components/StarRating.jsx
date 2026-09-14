import { Star } from 'lucide-react'
import { formatRating } from '../utils/helpers.js'

// Compact circular rating badge, styled like a film-reel score marker.
export default function StarRating({ value, size = 'sm' }) {
  const pct = Math.round((value || 0) * 10)
  const color =
    pct >= 70 ? '#3FBF7F' : pct >= 40 ? '#E3B23C' : '#E1444B'
  const dims = size === 'lg' ? 'h-12 w-12 text-sm' : 'h-8 w-8 text-[11px]'

  return (
    <div
      className={`relative flex ${dims} shrink-0 items-center justify-center rounded-full bg-black/70 font-bold text-white backdrop-blur-sm`}
      style={{ boxShadow: `inset 0 0 0 2px ${color}55` }}
      aria-label={`Rating ${formatRating(value)} out of 10`}
    >
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 36 36">
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeDasharray={`${pct}, 100`}
          strokeLinecap="round"
        />
      </svg>
      <span>{formatRating(value)}</span>
    </div>
  )
}

export function InlineStars({ value }) {
  return (
    <span className="flex items-center gap-1 text-gold">
      <Star size={15} fill="currentColor" strokeWidth={0} />
      <span className="text-sm font-semibold text-ink">{formatRating(value)}</span>
    </span>
  )
}
