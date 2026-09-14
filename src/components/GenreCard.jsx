import { Link } from 'react-router-dom'
import { GENRE_ACCENTS } from '../utils/constants.js'

export default function GenreCard({ genre }) {
  const accent = GENRE_ACCENTS[genre.id] || 'from-zinc-800/60'
  return (
    <Link
      to={`/genre/${genre.id}`}
      state={{ name: genre.name }}
      className={`group relative flex h-32 items-end overflow-hidden rounded-2xl bg-gradient-to-br ${accent} to-surface-2 p-5 ring-1 ring-white/5 transition-all duration-300 hover:-translate-y-1 hover:ring-gold/40 sm:h-36`}
    >
      <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-white/5 blur-2xl transition-all duration-300 group-hover:bg-gold/10" />
      <span className="font-display text-xl tracking-wide text-white sm:text-2xl">
        {genre.name}
      </span>
    </Link>
  )
}
