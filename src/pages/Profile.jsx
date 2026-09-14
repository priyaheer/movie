import { Bookmark, Heart, Star, UserRound } from 'lucide-react'
import { useWatchlist } from '../context/WatchlistContext.jsx'
import { useFavorites } from '../context/FavoritesContext.jsx'
import { IMG } from '../services/tmdbApi.js'
import { Link } from 'react-router-dom'

// "Rated" has no backend yet, so we derive a stable placeholder from what's
// already in localStorage rather than inventing fake numbers — it's the
// count of favorited movies with a vote_average TMDB itself rated highly.
export default function Profile() {
  const { watchlist } = useWatchlist()
  const { favorites } = useFavorites()
  const rated = favorites.filter((m) => (m.vote_average || 0) >= 7).length

  const stats = [
    { label: 'Watchlist', value: watchlist.length, icon: Bookmark, to: '/watchlist' },
    { label: 'Favorites', value: favorites.length, icon: Heart, to: '/favorites' },
    { label: 'Rated', value: rated, icon: Star, to: '/favorites' },
  ]

  const recentPosters = [...favorites, ...watchlist].slice(0, 6)

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-8">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-2 text-gold ring-1 ring-white/10">
          <UserRound size={30} />
        </div>
        <div>
          <h1 className="font-display text-3xl tracking-wide text-ink">Welcome back 👋</h1>
          <p className="text-sm text-ink-muted">Here's a snapshot of your CineVerse activity.</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Link
            key={s.label}
            to={s.to}
            className="group flex items-center justify-between rounded-2xl border border-white/5 bg-surface/60 p-5 transition-colors hover:border-gold/30"
          >
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-ink-muted">{s.label}</p>
              <p className="mt-1 font-display text-3xl tracking-wide text-ink group-hover:text-gold">
                {s.value}
              </p>
            </div>
            <s.icon size={26} className="text-gold/70" />
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="mb-4 font-display text-xl tracking-wide text-ink">Recently Saved</h2>
        {recentPosters.length === 0 ? (
          <p className="rounded-xl border border-white/5 bg-surface/40 p-6 text-sm text-ink-muted">
            Movies you favorite or add to your watchlist will show up here.
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {recentPosters.map((m) => (
              <Link
                key={m.id}
                to={`/movie/${m.id}`}
                className="overflow-hidden rounded-lg ring-1 ring-white/5 transition-transform hover:scale-105"
              >
                {IMG.poster(m.poster_path) ? (
                  <img
                    src={IMG.poster(m.poster_path)}
                    alt={m.title}
                    className="aspect-[2/3] w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-[2/3] items-center justify-center bg-surface-2 p-2 text-center text-[10px] text-ink-muted">
                    {m.title}
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
