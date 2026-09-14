import { Search, X } from 'lucide-react'

export default function SearchBar({ value, onChange, onSubmit, autoFocus, placeholder = 'Search movies…' }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit?.(value)
      }}
      role="search"
      className="relative w-full"
    >
      <Search
        size={18}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        aria-label="Search movies"
        className="w-full rounded-xl border border-white/10 bg-surface-2 py-3.5 pl-11 pr-11 text-sm text-ink placeholder:text-ink-muted focus:border-gold/50 focus:outline-none"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-muted transition-colors hover:text-ink"
        >
          <X size={17} />
        </button>
      )}
    </form>
  )
}
