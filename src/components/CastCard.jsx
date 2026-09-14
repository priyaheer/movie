import { IMG } from '../services/tmdbApi.js'
import { UserRound } from 'lucide-react'

export default function CastCard({ person }) {
  const photo = IMG.profile(person.profile_path)
  return (
    <div className="w-[110px] shrink-0 text-center">
      <div className="mx-auto h-[110px] w-[110px] overflow-hidden rounded-full bg-surface-2 ring-1 ring-white/10">
        {photo ? (
          <img
            src={photo}
            alt={person.name}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-ink-muted">
            <UserRound size={34} />
          </div>
        )}
      </div>
      <p className="mt-2 line-clamp-1 text-sm font-medium text-ink">{person.name}</p>
      <p className="line-clamp-1 text-xs text-ink-muted">{person.character || person.job}</p>
    </div>
  )
}
