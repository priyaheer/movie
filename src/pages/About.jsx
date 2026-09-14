import { Clapperboard } from 'lucide-react'

export default function About() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-8">
      <Clapperboard size={36} className="mx-auto text-gold" />
      <h1 className="mt-4 font-display text-4xl tracking-wide text-ink">About CineVerse</h1>
      <p className="mt-4 text-sm leading-relaxed text-ink-muted sm:text-base">
        CineVerse is a movie discovery app built to help you find your next favorite film —
        browse what's trending, dig into details, and keep a personal watchlist and favorites
        collection, all powered by The Movie Database (TMDB).
      </p>
    </div>
  )
}
