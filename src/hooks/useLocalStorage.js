import { useEffect, useState } from 'react'

// Generic localStorage-backed state hook. Reads once on mount, writes on
// every change, and never throws if localStorage is unavailable (e.g.
// private browsing) — it just falls back to in-memory state.
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Storage full or unavailable — fail silently, state still works.
    }
  }, [key, value])

  return [value, setValue]
}
