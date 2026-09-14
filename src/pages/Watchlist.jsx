import { Bookmark } from 'lucide-react'
import { useWatchlist } from '../context/WatchlistContext.jsx'
import MovieGrid from '../components/MovieGrid.jsx'
import EmptyState from '../components/EmptyState.jsx'

export default function Watchlist() {
  const { watchlist } = useWatchlist()

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-10 sm:px-8">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/15 text-gold">
          <Bookmark size={22} />
        </div>
        <div>
          <h1 className="font-display text-3xl tracking-wide text-ink sm:text-4xl">Watchlist</h1>
          <p className="text-sm text-ink-muted">
            {watchlist.length} {watchlist.length === 1 ? 'movie' : 'movies'} saved to watch later.
          </p>
        </div>
      </div>

      {watchlist.length === 0 ? (
        <EmptyState
          icon={Bookmark}
          title="Your watchlist is empty."
          description="Discover movies and save the ones you want to watch later."
          actionLabel="Explore Movies"
          actionTo="/discover"
        />
      ) : (
        <MovieGrid movies={watchlist} />
      )}
    </div>
  )
}
