import { createContext, useCallback, useContext, useMemo } from 'react'
import useLocalStorage from '../hooks/useLocalStorage.js'
import { useToast } from './ToastContext.jsx'

const WatchlistContext = createContext(null)

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useLocalStorage('cineverse:watchlist', [])
  const { showToast } = useToast()

  const isInWatchlist = useCallback(
    (id) => watchlist.some((m) => m.id === id),
    [watchlist]
  )

  const toggleWatchlist = useCallback(
    (movie) => {
      setWatchlist((prev) => {
        const exists = prev.some((m) => m.id === movie.id)
        if (exists) {
          showToast('Movie removed from watchlist', 'info')
          return prev.filter((m) => m.id !== movie.id)
        }
        showToast('✓ Added to your watchlist', 'success')
        return [
          ...prev,
          {
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            vote_average: movie.vote_average,
            release_date: movie.release_date,
            addedAt: Date.now(),
          },
        ]
      })
    },
    [setWatchlist, showToast]
  )

  const value = useMemo(
    () => ({ watchlist, isInWatchlist, toggleWatchlist }),
    [watchlist, isInWatchlist, toggleWatchlist]
  )

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  )
}

export function useWatchlist() {
  const ctx = useContext(WatchlistContext)
  if (!ctx) throw new Error('useWatchlist must be used within WatchlistProvider')
  return ctx
}
