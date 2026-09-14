import { createContext, useCallback, useContext, useMemo } from 'react'
import useLocalStorage from '../hooks/useLocalStorage.js'
import { useToast } from './ToastContext.jsx'

const FavoritesContext = createContext(null)

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useLocalStorage('cineverse:favorites', [])
  const { showToast } = useToast()

  const isFavorite = useCallback(
    (id) => favorites.some((m) => m.id === id),
    [favorites]
  )

  const toggleFavorite = useCallback(
    (movie) => {
      setFavorites((prev) => {
        const exists = prev.some((m) => m.id === movie.id)
        if (exists) {
          showToast('Removed from favorites', 'info')
          return prev.filter((m) => m.id !== movie.id)
        }
        showToast('✓ Added to your favorites', 'success')
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
    [setFavorites, showToast]
  )

  const value = useMemo(
    () => ({ favorites, isFavorite, toggleFavorite }),
    [favorites, isFavorite, toggleFavorite]
  )

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider')
  return ctx
}
