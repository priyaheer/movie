import MovieCard from './MovieCard.jsx'
import SectionHeader from './SectionHeader.jsx'
import { SkeletonRail } from './SkeletonCard.jsx'
import ErrorState from './ErrorState.jsx'

// Horizontally-scrolling rail of movies used across the homepage.
export default function MovieSection({
  title,
  movies,
  loading,
  error,
  onRetry,
  viewAllTo,
}) {
  return (
    <section className="mb-12 px-4 sm:px-8">
      <SectionHeader title={title} viewAllTo={viewAllTo} />
      {loading && <SkeletonRail />}
      {!loading && error && (
        <ErrorState description={error} onRetry={onRetry} />
      )}
      {!loading && !error && movies?.length > 0 && (
        <div className="rail">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
      {!loading && !error && movies?.length === 0 && (
        <p className="py-8 text-center text-sm text-ink-muted">No movies found.</p>
      )}
    </section>
  )
}
