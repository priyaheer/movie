import { CheckCircle2, Info, XCircle } from 'lucide-react'

const ICONS = {
  success: CheckCircle2,
  info: Info,
  error: XCircle,
}

export default function Toast({ message, tone = 'success' }) {
  const Icon = ICONS[tone] || Info
  return (
    <div
      role="status"
      className="animate-riseIn flex items-center gap-2 rounded-full border border-white/10 bg-surface-2/95 px-4 py-2.5 text-sm font-medium text-ink shadow-lg shadow-black/40 backdrop-blur"
    >
      <Icon size={16} className={tone === 'success' ? 'text-gold' : 'text-ink-muted'} />
      {message}
    </div>
  )
}
