import MovieCard from './MovieCard.jsx'

export default function MovieGrid({ movies }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} className="w-full" />
      ))}
    </div>
  )
}
