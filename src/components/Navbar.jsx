import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Clapperboard, Menu, Moon, Search, Sun, UserRound, X } from 'lucide-react'
import { useTheme } from '../context/ThemeContext.jsx'
import { classNames } from '../utils/helpers.js'

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/discover', label: 'Discover' },
  { to: '/genres', label: 'Genres' },
  { to: '/watchlist', label: 'Watchlist' },
  { to: '/favorites', label: 'Favorites' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [navigate])

  const linkClass = ({ isActive }) =>
    classNames(
      'text-sm font-medium transition-colors',
      isActive ? 'text-gold' : 'text-ink-muted hover:text-ink'
    )

  return (
    <header
      className={classNames(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'border-b border-white/5 bg-base/85 backdrop-blur-md'
          : 'bg-gradient-to-b from-base/80 to-transparent'
      )}
    >
      <nav className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 sm:px-8">
        <Link to="/" className="flex items-center gap-2 text-ink">
          <Clapperboard size={24} className="text-gold" />
          <span className="font-display text-2xl tracking-wide">CineVerse</span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <Link
            to="/search"
            aria-label="Search"
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-surface-2 hover:text-gold"
          >
            <Search size={19} />
          </Link>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-surface-2 hover:text-gold"
          >
            {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
          </button>
          <Link
            to="/profile"
            aria-label="Profile"
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-surface-2 hover:text-gold"
          >
            <UserRound size={19} />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-surface-2 hover:text-gold md:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="animate-fadeIn border-t border-white/5 bg-base px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  classNames(
                    'rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive ? 'bg-surface-2 text-gold' : 'text-ink-muted hover:bg-surface-2 hover:text-ink'
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
