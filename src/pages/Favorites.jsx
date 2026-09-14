import { Heart } from 'lucide-react'
import { useFavorites } from '../context/FavoritesContext.jsx'
import MovieGrid from '../components/MovieGrid.jsx'
import EmptyState from '../components/EmptyState.jsx'

export default function Favorites() {
  const { favorites } = useFavorites()

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-10 sm:px-8">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/15 text-gold">
          <Heart size={22} />
        </div>
        <div>
          <h1 className="font-display text-3xl tracking-wide text-ink sm:text-4xl">Favorites</h1>
          <p className="text-sm text-ink-muted">
            {favorites.length} {favorites.length === 1 ? 'movie' : 'movies'} you love.
          </p>
        </div>
      </div>

      {favorites.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="No favorites yet."
          description="Mark movies as favorites to build your personal collection."
          actionLabel="Explore Movies"
          actionTo="/discover"
        />
      ) : (
        <MovieGrid movies={favorites} />
      )}
    </div>
  )
}
