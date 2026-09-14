import { Drama } from 'lucide-react'
import GenreCard from '../components/GenreCard.jsx'
import { GENRES } from '../utils/constants.js'

export default function Genres() {
  return (
    <div className="mx-auto max-w-[1600px] px-4 py-10 sm:px-8">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/15 text-gold">
          <Drama size={22} />
        </div>
        <div>
          <h1 className="font-display text-3xl tracking-wide text-ink sm:text-4xl">Genres</h1>
          <p className="text-sm text-ink-muted">Browse movies by category.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {GENRES.map((genre) => (
          <GenreCard key={genre.id} genre={genre} />
        ))}
      </div>
    </div>
  )
}
