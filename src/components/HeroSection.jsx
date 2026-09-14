import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bookmark, Info, Play } from 'lucide-react'
import { IMG } from '../services/tmdbApi.js'
import { formatYear, formatRuntime } from '../utils/helpers.js'
import { GENRES } from '../utils/constants.js'
import { InlineStars } from './StarRating.jsx'
import { useWatchlist } from '../context/WatchlistContext.jsx'
import TrailerModal from './TrailerModal.jsx'

export default function HeroSection({ movie, trailerKey }) {
  const [showTrailer, setShowTrailer] = useState(false)
  const { isInWatchlist, toggleWatchlist } = useWatchlist()

  if (!movie) return null

  const backdrop = IMG.backdrop(movie.backdrop_path)
  const genreNames = (movie.genre_ids || movie.genres?.map((g) => g.id) || [])
    .map((id) => GENRES.find((g) => g.id === id)?.name)
    .filter(Boolean)
    .slice(0, 3)
  const inWatchlist = isInWatchlist(movie.id)

  return (
    <section className="relative h-[68vh] min-h-[460px] w-full overflow-hidden sm:h-[80vh]">
      {backdrop ? (
        <img
          src={backdrop}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-surface-2" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-base via-base/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-base/90 via-base/20 to-transparent" />
      <div className="bg-film-grain absolute inset-0" />

      <div className="relative flex h-full max-w-2xl flex-col justify-end px-4 pb-14 sm:px-10 sm:pb-20">
        <span className="mb-3 w-fit rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gold">
          Featured Today
        </span>
        <h1 className="animate-riseIn font-display text-4xl leading-[0.95] tracking-wide text-white text-balance sm:text-6xl">
          {movie.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-ink-muted">
          <InlineStars value={movie.vote_average} />
          <span>{formatYear(movie.release_date)}</span>
          {movie.runtime ? <span>{formatRuntime(movie.runtime)}</span> : null}
          {genreNames.length > 0 && <span>{genreNames.join(' · ')}</span>}
        </div>

        {movie.overview && (
          <p className="mt-4 line-clamp-3 max-w-xl text-sm leading-relaxed text-ink-muted sm:text-base">
            {movie.overview}
          </p>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setShowTrailer(true)}
            className="flex items-center gap-2 rounded-lg bg-gold px-5 py-3 text-sm font-semibold text-base transition-transform hover:scale-[1.03] hover:bg-gold-bright"
          >
            <Play size={16} fill="currentColor" />
            Watch Trailer
          </button>
          <Link
            to={`/movie/${movie.id}`}
            className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/15"
          >
            <Info size={16} />
            View Details
          </Link>
          <button
            type="button"
            onClick={() => toggleWatchlist(movie)}
            aria-pressed={inWatchlist}
            className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/15"
          >
            <Bookmark size={16} fill={inWatchlist ? 'currentColor' : 'none'} />
            {inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
          </button>
        </div>
      </div>

      {showTrailer && (
        <TrailerModal trailerKey={trailerKey} onClose={() => setShowTrailer(false)} />
      )}
    </section>
  )
}
