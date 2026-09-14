import { Link } from 'react-router-dom'
import { Bookmark, Heart, Info } from 'lucide-react'
import { IMG } from '../services/tmdbApi.js'
import { formatYear, classNames } from '../utils/helpers.js'
import { useWatchlist } from '../context/WatchlistContext.jsx'
import { useFavorites } from '../context/FavoritesContext.jsx'
import StarRating from './StarRating.jsx'

// The single reusable movie card used everywhere: rails, grids, search
// results, genre pages, watchlist, favorites.
export default function MovieCard({ movie, className }) {
  const { isInWatchlist, toggleWatchlist } = useWatchlist()
  const { isFavorite, toggleFavorite } = useFavorites()

  if (!movie) return null

  const inWatchlist = isInWatchlist(movie.id)
  const favorited = isFavorite(movie.id)
  const poster = IMG.poster(movie.poster_path)

  return (
    <div
      className={classNames(
        'group relative w-[150px] shrink-0 sm:w-[168px] md:w-[180px]',
        className
      )}
    >
      <Link
        to={`/movie/${movie.id}`}
        className="block overflow-hidden rounded-xl bg-surface-2 ring-1 ring-white/5 transition-all duration-300 hover:ring-gold/40"
      >
        <div className="relative aspect-[2/3] w-full overflow-hidden">
          {poster ? (
            <img
              src={poster}
              alt={`${movie.title} poster`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-surface-2 px-3 text-center text-xs text-ink-muted">
              {movie.title}
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <div className="absolute left-2 top-2">
            <StarRating value={movie.vote_average} />
          </div>

          <div className="absolute right-2 top-2 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                toggleFavorite(movie)
              }}
              aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
              aria-pressed={favorited}
              className={classNames(
                'flex h-8 w-8 items-center justify-center rounded-full backdrop-blur transition-colors',
                favorited ? 'bg-marquee text-white' : 'bg-black/60 text-white hover:bg-black/80'
              )}
            >
              <Heart size={15} fill={favorited ? 'currentColor' : 'none'} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                toggleWatchlist(movie)
              }}
              aria-label={inWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
              aria-pressed={inWatchlist}
              className={classNames(
                'flex h-8 w-8 items-center justify-center rounded-full backdrop-blur transition-colors',
                inWatchlist ? 'bg-gold text-base' : 'bg-black/60 text-white hover:bg-black/80'
              )}
            >
              <Bookmark size={15} fill={inWatchlist ? 'currentColor' : 'none'} />
            </button>
          </div>

          <span className="absolute bottom-2 left-2 right-2 flex translate-y-2 items-center gap-1 text-xs font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <Info size={13} /> View details
          </span>
        </div>
      </Link>

      <div className="mt-2 px-0.5">
        <Link to={`/movie/${movie.id}`}>
          <h3 className="line-clamp-1 text-sm font-semibold text-ink transition-colors group-hover:text-gold">
            {movie.title}
          </h3>
        </Link>
        <p className="mt-0.5 text-xs text-ink-muted">{formatYear(movie.release_date)}</p>
      </div>
    </div>
  )
}
