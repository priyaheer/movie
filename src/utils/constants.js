export const GENRES = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 27, name: 'Horror' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
]

// Small hand-picked backdrop tint per genre so genre cards feel distinct
// without needing extra API calls.
export const GENRE_ACCENTS = {
  28: 'from-red-900/60',
  12: 'from-amber-800/60',
  16: 'from-sky-800/60',
  35: 'from-yellow-700/60',
  80: 'from-zinc-800/60',
  99: 'from-emerald-900/60',
  18: 'from-indigo-900/60',
  10751: 'from-rose-800/60',
  14: 'from-violet-800/60',
  27: 'from-red-950/70',
  9648: 'from-purple-900/60',
  10749: 'from-pink-800/60',
  878: 'from-cyan-900/60',
  53: 'from-orange-950/70',
  10752: 'from-stone-800/60',
  37: 'from-yellow-900/60',
}

export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Spanish' },
  { code: 'fr', label: 'French' },
  { code: 'de', label: 'German' },
  { code: 'hi', label: 'Hindi' },
  { code: 'ja', label: 'Japanese' },
  { code: 'ko', label: 'Korean' },
  { code: 'zh', label: 'Chinese' },
  { code: 'it', label: 'Italian' },
]

export const SORT_OPTIONS = [
  { value: 'popularity.desc', label: 'Popularity' },
  { value: 'vote_average.desc', label: 'Rating' },
  { value: 'revenue.desc', label: 'Revenue' },
  { value: 'primary_release_date.desc', label: 'Release Date' },
  { value: 'original_title.asc', label: 'Title (A–Z)' },
]

export const SEARCH_SORT_OPTIONS = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'rating', label: 'Rating' },
  { value: 'release_date', label: 'Release Date' },
]

export const CURRENT_YEAR = new Date().getFullYear()

export const YEARS = Array.from({ length: 60 }, (_, i) => CURRENT_YEAR - i)
