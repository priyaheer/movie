import { Mail } from 'lucide-react'

export default function Contact() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-8">
      <Mail size={36} className="mx-auto text-gold" />
      <h1 className="mt-4 font-display text-4xl tracking-wide text-ink">Get in Touch</h1>
      <p className="mt-4 text-sm leading-relaxed text-ink-muted sm:text-base">
        Questions, feedback, or ideas for CineVerse? Reach out through the GitHub or LinkedIn
        links in the footer — we'd love to hear from you.
      </p>
    </div>
  )
}
