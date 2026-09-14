import { Link } from 'react-router-dom'
import { Clapperboard, Github, Linkedin } from 'lucide-react'

const FOOTER_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/discover', label: 'Discover' },
  { to: '/genres', label: 'Genres' },
  { to: '/watchlist', label: 'Watchlist' },
  { to: '/favorites', label: 'Favorites' },
]

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/5 bg-surface/40">
      <div className="mx-auto max-w-[1600px] px-4 py-12 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 text-ink">
              <Clapperboard size={22} className="text-gold" />
              <span className="font-display text-xl tracking-wide">CineVerse</span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-muted">
              Discover your next favorite movie.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-ink">Explore</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-ink-muted transition-colors hover:text-gold">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-ink">Connect</h4>
            <ul className="space-y-2 text-sm text-ink-muted">
              <li><a href="#" className="inline-flex items-center gap-2 transition-colors hover:text-gold"><Github size={15} /> GitHub</a></li>
              <li><a href="#" className="inline-flex items-center gap-2 transition-colors hover:text-gold"><Linkedin size={15} /> LinkedIn</a></li>
              <li><Link to="/about" className="transition-colors hover:text-gold">About</Link></li>
              <li><Link to="/contact" className="transition-colors hover:text-gold">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/5 pt-6 text-center text-xs text-ink-muted">
          © 2026 CineVerse. Built with React.
        </div>
      </div>
    </footer>
  )
}
