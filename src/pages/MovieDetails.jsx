import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Bookmark, Heart, Play } from 'lucide-react'
import { IMG } from '../services/tmdbApi.js'
import * as tmdb from '../services/tmdbApi.js'
import {
  formatDate,
  formatMoney,
  formatRating,
  formatRuntime,
  formatVoteCount,
} from '../utils/helpers.js'
import { InlineStars } from '../components/StarRating.jsx'
import CastCard from '../components/CastCard.jsx'
import MovieSection from '../components/MovieSection.jsx'
import TrailerModal from '../components/TrailerModal.jsx'
import ErrorState from '../components/ErrorState.jsx'
import { SkeletonDetails, SkeletonCastRow } from '../components/SkeletonCard.jsx'
import { useWatchlist } from '../context/WatchlistContext.jsx'
import { useFavorites } from '../context/FavoritesContext.jsx'

export default function MovieDetails() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showTrailer, setShowTrailer] = useState(false)

  const [similar, setSimilar] = useState({ movies: null, loading: true, error: null })
  const [recommended, setRecommended] = useState({ movies: null, loading: true, error: null })

  const { isInWatchlist, toggleWatchlist } = useWatchlist()
  const { isFavorite, toggleFavorite } = useFavorites()

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    setMovie(null)

    tmdb
      .getMovieDetails(id)
      .then((data) => {
        if (!cancelled) setMovie(data)
      })
      .catch((err) => {
        if (!cancelled) {
          setError(
            err.response?.status === 404
              ? "We couldn't find that movie. It may not exist or the link is broken."
              : err.message || 'Failed to load this movie.'
          )
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    setSimilar({ movies: null, loading: true, error: null })
    tmdb
      .getSimilarMovies(id)
      .then((data) => !cancelled && setSimilar({ movies: data.results || [], loading: false, error: null }))
      .catch((err) => !cancelled && setSimilar({ movies: null, loading: false, error: err.message }))

    setRecommended({ movies: null, loading: true, error: null })
    tmdb
      .getRecommendations(id)
      .then((data) => !cancelled && setRecommended({ movies: data.results || [], loading: false, error: null }))
      .catch((err) => !cancelled && setRecommended({ movies: null, loading: false, error: err.message }))

    window.scrollTo({ top: 0, behavior: 'instant' })

    return () => {
      cancelled = true
    }
  }, [id])

  if (loading) return <SkeletonDetails />

  if (error || !movie) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24">
        <ErrorState title="Oops! Something went wrong." description={error} />
      </div>
    )
  }

  const backdrop = IMG.backdrop(movie.backdrop_path)
  const poster = IMG.poster(movie.poster_path)
  const trailer = movie.videos?.results?.find((v) => v.type === 'Trailer' && v.site === 'YouTube')
  const cast = movie.credits?.cast?.slice(0, 12) || []
  const crew = (movie.credits?.crew || []).filter((c) =>
    ['Director', 'Writer', 'Screenplay', 'Producer'].includes(c.job)
  )
  const keyCrew = Array.from(new Map(crew.map((c) => [`${c.id}-${c.job}`, c])).values()).slice(0, 8)

  const inWatchlist = isInWatchlist(movie.id)
  const favorited = isFavorite(movie.id)

  return (
    <div className="animate-fadeIn pb-16">
      <div className="relative h-[42vh] min-h-[280px] w-full sm:h-[55vh]">
        {backdrop ? (
          <img src={backdrop} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full bg-surface-2" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-base via-base/70 to-base/20" />
      </div>

      <div className="mx-auto -mt-28 max-w-6xl px-4 sm:-mt-36 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
          <div className="mx-auto -mt-4 w-40 shrink-0 overflow-hidden rounded-xl shadow-2xl shadow-black/50 ring-1 ring-white/10 sm:mx-0 sm:w-56">
            {poster ? (
              <img src={poster} alt={`${movie.title} poster`} className="h-full w-full object-cover" />
            ) : (
              <div className="flex aspect-[2/3] items-center justify-center bg-surface-2 text-sm text-ink-muted">
                {movie.title}
              </div>
            )}
          </div>

          <div className="flex-1 pt-2 text-center sm:text-left">
            <h1 className="font-display text-3xl tracking-wide text-white text-balance sm:text-5xl">
              {movie.title}
            </h1>
            {movie.tagline && (
              <p className="mt-2 text-sm italic text-ink-muted">{movie.tagline}</p>
            )}

            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-ink-muted sm:justify-start">
              <InlineStars value={movie.vote_average} />
              <span>{formatVoteCount(movie.vote_count)} votes</span>
              <span>{formatDate(movie.release_date)}</span>
              <span>{formatRuntime(movie.runtime)}</span>
              <span className="uppercase">{movie.original_language}</span>
            </div>

            {movie.genres?.length > 0 && (
              <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
                {movie.genres.map((g) => (
                  <span
                    key={g.id}
                    className="rounded-full border border-white/10 bg-surface-2 px-3 py-1 text-xs font-medium text-ink-muted"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            )}

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-ink-muted sm:mx-0 sm:text-base">
              {movie.overview || 'No overview available.'}
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
              <button
                type="button"
                onClick={() => setShowTrailer(true)}
                className="flex items-center gap-2 rounded-lg bg-gold px-5 py-3 text-sm font-semibold text-base transition-transform hover:scale-[1.03] hover:bg-gold-bright"
              >
                <Play size={16} fill="currentColor" /> Watch Trailer
              </button>
              <button
                type="button"
                onClick={() => toggleFavorite(movie)}
                aria-pressed={favorited}
                className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/15"
              >
                <Heart size={16} fill={favorited ? 'currentColor' : 'none'} className={favorited ? 'text-marquee' : ''} />
                {favorited ? 'Favorited' : 'Add to Favorites'}
              </button>
              <button
                type="button"
                onClick={() => toggleWatchlist(movie)}
                aria-pressed={inWatchlist}
                className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/15"
              >
                <Bookmark size={16} fill={inWatchlist ? 'currentColor' : 'none'} className={inWatchlist ? 'text-gold' : ''} />
                {inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
              </button>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 rounded-xl border border-white/5 bg-surface/60 p-5 text-sm sm:grid-cols-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-ink-muted">Rating</p>
                <p className="mt-1 font-semibold text-ink">{formatRating(movie.vote_average)} / 10</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-ink-muted">Status</p>
                <p className="mt-1 font-semibold text-ink">{movie.status || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-ink-muted">Budget</p>
                <p className="mt-1 font-semibold text-ink">{formatMoney(movie.budget)}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-ink-muted">Revenue</p>
                <p className="mt-1 font-semibold text-ink">{formatMoney(movie.revenue)}</p>
              </div>
            </div>
          </div>
        </div>

        {keyCrew.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-4 font-display text-2xl tracking-wide text-ink">Crew</h2>
            <div className="flex flex-wrap gap-x-10 gap-y-4">
              {keyCrew.map((c) => (
                <div key={`${c.id}-${c.job}`}>
                  <p className="text-sm font-semibold text-ink">{c.name}</p>
                  <p className="text-xs text-ink-muted">{c.job}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12">
          <h2 className="mb-4 font-display text-2xl tracking-wide text-ink">Cast</h2>
          {cast.length > 0 ? (
            <div className="rail">
              {cast.map((person) => (
                <CastCard key={person.credit_id || person.id} person={person} />
              ))}
            </div>
          ) : (
            <SkeletonCastRow count={0} />
          )}
          {cast.length === 0 && (
            <p className="text-sm text-ink-muted">No cast information available.</p>
          )}
        </div>
      </div>

      <div className="mt-8">
        <MovieSection
          title="Similar Movies"
          movies={similar.movies}
          loading={similar.loading}
          error={similar.error}
          onRetry={() => {}}
        />
        <MovieSection
          title="Recommendations"
          movies={recommended.movies}
          loading={recommended.loading}
          error={recommended.error}
          onRetry={() => {}}
        />
      </div>

      {showTrailer && (
        <TrailerModal trailerKey={trailer?.key} onClose={() => setShowTrailer(false)} />
      )}
    </div>
  )
}
