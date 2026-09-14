import { useEffect, useState } from 'react'
import { Compass } from 'lucide-react'
import FilterPanel from '../components/FilterPanel.jsx'
import MovieGrid from '../components/MovieGrid.jsx'
import { SkeletonGrid } from '../components/SkeletonCard.jsx'
import ErrorState from '../components/ErrorState.jsx'
import EmptyState from '../components/EmptyState.jsx'
import * as tmdb from '../services/tmdbApi.js'
import { SORT_OPTIONS } from '../utils/constants.js'

const DEFAULT_FILTERS = { genre: '', year: '', minRating: 0, language: '', type: '', sortBy: 'popularity.desc' }

export default function Discover() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState(null)

  const fetchPage = (pageNum, replace) => {
    const setBusy = replace ? setLoading : setLoadingMore
    setBusy(true)
    setError(null)
    tmdb
      .discoverMovies(filters, pageNum)
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
  }, [filters])

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-10 sm:px-8">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/15 text-gold">
          <Compass size={22} />
        </div>
        <div>
          <h1 className="font-display text-3xl tracking-wide text-ink sm:text-4xl">Discover</h1>
          <p className="text-sm text-ink-muted">Filter and sort through thousands of movies.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <FilterPanel
            filters={filters}
            onChange={setFilters}
            sortOptions={SORT_OPTIONS}
            fields={['genre', 'year', 'rating', 'language', 'type', 'sortBy']}
            onClear={() => setFilters(DEFAULT_FILTERS)}
          />
        </aside>

        <div>
          {loading && <SkeletonGrid count={18} />}

          {!loading && error && (
            <ErrorState description={error} onRetry={() => fetchPage(1, true)} />
          )}

          {!loading && !error && movies.length === 0 && (
            <EmptyState
              title="No movies match these filters"
              description="Try loosening a filter, like lowering the minimum rating or clearing the genre."
            />
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
      </div>
    </div>
  )
}
