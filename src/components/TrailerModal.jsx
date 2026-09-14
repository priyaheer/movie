import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

export default function TrailerModal({ trailerKey, onClose }) {
  const closeBtnRef = useRef(null)

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    closeBtnRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[90] flex animate-fadeIn items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Movie trailer"
    >
      <div
        className="relative w-full max-w-3xl animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          aria-label="Close trailer"
          className="absolute -top-11 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-surface-2 text-ink transition-colors hover:bg-gold hover:text-base"
        >
          <X size={18} />
        </button>

        {trailerKey ? (
          <div className="aspect-video w-full overflow-hidden rounded-xl bg-black shadow-2xl">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title="Movie trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-xl bg-surface-2 text-ink-muted">
            <p className="text-lg font-medium text-ink">Trailer unavailable</p>
            <p className="text-sm">We couldn't find a trailer for this title.</p>
          </div>
        )}
      </div>
    </div>
  )
}
