export function formatYear(dateString) {
  if (!dateString) return 'N/A'
  const year = new Date(dateString).getFullYear()
  return Number.isNaN(year) ? 'N/A' : year
}

export function formatDate(dateString) {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return 'N/A'
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatRuntime(minutes) {
  if (!minutes && minutes !== 0) return 'N/A'
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h === 0) return `${m}m`
  return `${h}h ${m}m`
}

export function formatRating(vote) {
  if (vote === undefined || vote === null) return 'N/A'
  return vote.toFixed(1)
}

export function formatMoney(amount) {
  if (!amount) return 'N/A'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatVoteCount(count) {
  if (!count && count !== 0) return '0'
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
  return `${count}`
}

export function truncate(text, max = 160) {
  if (!text) return ''
  return text.length > max ? `${text.slice(0, max).trim()}…` : text
}

export function classNames(...args) {
  return args.filter(Boolean).join(' ')
}
