import { Link } from 'react-router-dom'
import { Film } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <Film size={40} className="text-gold" />
      <h1 className="mt-4 font-display text-5xl tracking-wide text-ink">404</h1>
      <p className="mt-2 text-lg font-semibold text-ink">This scene doesn't exist.</p>
      <p className="mt-2 text-sm text-ink-muted">
        The page you're looking for has been cut from the final edit.
      </p>
      <Link
        to="/"
        className="mt-6 rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-base transition-colors hover:bg-gold-bright"
      >
        Back to Home
      </Link>
    </div>
  )
}
