import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import MovieGrid from '../components/MovieGrid.jsx'
import { SkeletonGrid } from '../components/SkeletonCard.jsx'
import ErrorState from '../components/ErrorState.jsx'
import EmptyState from '../components/EmptyState.jsx'
import * as tmdb from '../services/tmdbApi.js'
import { GENRES, SORT_OPTIONS } from '../utils/constants.js'

export default function GenreMovies() {
  const { genreId } = useParams()
  const location = useLocation()
  const genreName =
    location.state?.name || GENRES.find((g) => String(g.id) === genreId)?.name || 'Genre'

  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [sortBy, setSortBy] = useState('popularity.desc')
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState(null)

  const fetchPage = (pageNum, replace) => {
    const setBusy = replace ? setLoading : setLoadingMore
    setBusy(true)
    setError(null)
    tmdb
      .getMoviesByGenre(genreId, pageNum, sortBy)
      .then((data) => {
        setMovies((prev) => (replace ? data.results : [...prev, ...data.results]))
        setTotalPages(data.total_pages || 1)
        setPage(pageNum)
      })
      .catch((err) => setError(err.message || 'Failed to load movies.'))
      .finally(() => setBusy(false))
  }

  useEffect(() => {
    fetchPage(1, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genreId, sortBy])

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-10 sm:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">Genre</p>
          <h1 className="font-display text-3xl tracking-wide text-ink sm:text-4xl">{genreName}</h1>
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-lg border border-white/10 bg-surface-2 px-3 py-2.5 text-sm text-ink focus:border-gold/50 focus:outline-none"
        >
          {SORT_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>Sort: {s.label}</option>
          ))}
        </select>
      </div>

      {loading && <SkeletonGrid count={18} />}

      {!loading && error && <ErrorState description={error} onRetry={() => fetchPage(1, true)} />}

      {!loading && !error && movies.length === 0 && (
        <EmptyState title="No movies found" description="Try a different genre or sort order." />
      )}

      {!loading && !error && movies.length > 0 && (
        <>
          <MovieGrid movies={movies} />
          {page < totalPages && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => fetchPage(page + 1, false)}
                disabled={loadingMore}
                className="rounded-lg border border-white/10 bg-surface-2 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-gold/40 hover:text-gold disabled:opacity-50"
              >
                {loadingMore ? 'Loading…' : 'Load More'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
