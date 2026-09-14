import { SlidersHorizontal, X } from 'lucide-react'
import { GENRES, LANGUAGES, YEARS } from '../utils/constants.js'

const selectClass =
  'w-full rounded-lg border border-white/10 bg-surface-2 px-3 py-2.5 text-sm text-ink focus:border-gold/50 focus:outline-none'
const labelClass = 'mb-1.5 block text-xs font-medium uppercase tracking-wide text-ink-muted'

// Generic filter panel. `fields` controls which controls render so Discover
// and Search can reuse this one component with different needs.
export default function FilterPanel({
  filters,
  onChange,
  sortOptions,
  fields = ['genre', 'year', 'rating', 'language', 'sortBy'],
  onClear,
}) {
  const set = (key, value) => onChange({ ...filters, [key]: value })

  return (
    <div className="rounded-2xl border border-white/5 bg-surface/70 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-ink">
          <SlidersHorizontal size={16} className="text-gold" />
          Filters
        </h3>
        {onClear && (
          <button
            type="button"
            onClick={onClear}
            className="flex items-center gap-1 text-xs font-medium text-ink-muted hover:text-marquee"
          >
            <X size={13} /> Clear
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-1">
        {fields.includes('genre') && (
          <div>
            <label className={labelClass} htmlFor="filter-genre">Genre</label>
            <select
              id="filter-genre"
              className={selectClass}
              value={filters.genre || ''}
              onChange={(e) => set('genre', e.target.value)}
            >
              <option value="">All Genres</option>
              {GENRES.map((g) => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </select>
          </div>
        )}

        {fields.includes('year') && (
          <div>
            <label className={labelClass} htmlFor="filter-year">Release Year</label>
            <select
              id="filter-year"
              className={selectClass}
              value={filters.year || ''}
              onChange={(e) => set('year', e.target.value)}
            >
              <option value="">Any Year</option>
              {YEARS.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        )}

        {fields.includes('rating') && (
          <div>
            <label className={labelClass} htmlFor="filter-rating">
              Minimum Rating {filters.minRating ? `(${filters.minRating}+)` : ''}
            </label>
            <input
              id="filter-rating"
              type="range"
              min="0"
              max="9"
              step="1"
              value={filters.minRating || 0}
              onChange={(e) => set('minRating', Number(e.target.value))}
              className="w-full accent-gold"
            />
          </div>
        )}

        {fields.includes('language') && (
          <div>
            <label className={labelClass} htmlFor="filter-language">Language</label>
            <select
              id="filter-language"
              className={selectClass}
              value={filters.language || ''}
              onChange={(e) => set('language', e.target.value)}
            >
              <option value="">Any Language</option>
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>{l.label}</option>
              ))}
            </select>
          </div>
        )}

        {fields.includes('type') && (
          <div>
            <label className={labelClass} htmlFor="filter-type">Movie Type</label>
            <select
              id="filter-type"
              className={selectClass}
              value={filters.type || ''}
              onChange={(e) => set('type', e.target.value)}
            >
              <option value="">All Types</option>
              <option value="3">Theatrical</option>
              <option value="4">Digital</option>
              <option value="6">TV</option>
            </select>
          </div>
        )}

        {fields.includes('sortBy') && sortOptions && (
          <div>
            <label className={labelClass} htmlFor="filter-sort">Sort By</label>
            <select
              id="filter-sort"
              className={selectClass}
              value={filters.sortBy || sortOptions[0].value}
              onChange={(e) => set('sortBy', e.target.value)}
            >
              {sortOptions.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  )
}
