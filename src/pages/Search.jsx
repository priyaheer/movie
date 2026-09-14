import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SearchX } from 'lucide-react'
import SearchBar from '../components/SearchBar.jsx'
import FilterPanel from '../components/FilterPanel.jsx'
import MovieGrid from '../components/MovieGrid.jsx'
import { SkeletonGrid } from '../components/SkeletonCard.jsx'
import ErrorState from '../components/ErrorState.jsx'
import EmptyState from '../components/EmptyState.jsx'
import useDebounce from '../hooks/useDebounce.js'
import * as tmdb from '../services/tmdbApi.js'
import { SEARCH_SORT_OPTIONS } from '../utils/constants.js'

const DEFAULT_FILTERS = { genre: '', year: '', minRating: 0, language: '', sortBy: 'popularity' }

export default function Search() {
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') || '')
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const debouncedQuery = useDebounce(query, 450)

  useEffect(() => {
    if (debouncedQuery.trim()) {
      setParams({ q: debouncedQuery }, { replace: true })
    } else {
      setParams({}, { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery])

  useEffect(() => {
    const q = debouncedQuery.trim()
    if (!q) {
      setResults(null)
      setError(null)
      return
    }
    setLoading(true)
    setError(null)
    tmdb
      .searchMovies(q)
      .then((data) => setResults(data.results || []))
      .catch((err) => setError(err.message || 'Search failed.'))
      .finally(() => setLoading(false))
  }, [debouncedQuery])

  const filteredResults = useMemo(() => {
    if (!results) return null
    let list = [...results]

    if (filters.genre) {
      list = list.filter((m) => m.genre_ids?.includes(Number(filters.genre)))
    }
    if (filters.year) {
      list = list.filter((m) => m.release_date?.startsWith(String(filters.year)))
    }
    if (filters.minRating) {
      list = list.filter((m) => (m.vote_average || 0) >= filters.minRating)
    }
    if (filters.language) {
      list = list.filter((m) => m.original_language === filters.language)
    }

    switch (filters.sortBy) {
      case 'rating':
        list.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0))
        break
      case 'release_date':
        list.sort((a, b) => (b.release_date || '').localeCompare(a.release_date || ''))
        break
      default:
        list.sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
    }

    return list
  }, [results, filters])

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-10 sm:px-8">
      <h1 className="mb-6 font-display text-3xl tracking-wide text-ink sm:text-4xl">Search</h1>

      <div className="mx-auto mb-8 max-w-2xl">
        <SearchBar value={query} onChange={setQuery} autoFocus placeholder="Search for a movie title…" />
      </div>

      {debouncedQuery.trim() && (
        <p className="mb-6 text-sm text-ink-muted">
          Search results for <span className="font-semibold text-ink">"{debouncedQuery}"</span>
        </p>
      )}

      {debouncedQuery.trim() && (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <FilterPanel
              filters={filters}
              onChange={setFilters}
              sortOptions={SEARCH_SORT_OPTIONS}
              fields={['genre', 'year', 'rating', 'language', 'sortBy']}
              onClear={() => setFilters(DEFAULT_FILTERS)}
            />
          </aside>

          <div>
            {loading && <SkeletonGrid count={12} />}

            {!loading && error && (
              <ErrorState description={error} onRetry={() => setQuery((q) => `${q}`)} />
            )}

            {!loading && !error && filteredResults?.length === 0 && (
              <EmptyState
                icon={SearchX}
                title="No results found"
                description={`We couldn't find any movies matching "${debouncedQuery}". Try a different title or adjust your filters.`}
              />
            )}

            {!loading && !error && filteredResults?.length > 0 && (
              <MovieGrid movies={filteredResults} />
            )}
          </div>
        </div>
      )}

      {!debouncedQuery.trim() && (
        <EmptyState
          icon={SearchX}
          title="Start typing to search"
          description="Look up any movie by title — results appear as you type."
        />
      )}
    </div>
  )
}
