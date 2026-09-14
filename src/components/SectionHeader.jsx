import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export default function SectionHeader({ title, viewAllTo }) {
  return (
    <div className="mb-4 flex items-end justify-between">
      <h2 className="font-display text-2xl tracking-wide text-ink sm:text-[28px]">
        {title}
      </h2>
      {viewAllTo && (
        <Link
          to={viewAllTo}
          className="flex items-center gap-0.5 text-sm font-medium text-ink-muted transition-colors hover:text-gold"
        >
          View All <ChevronRight size={16} />
        </Link>
      )}
    </div>
  )
}
