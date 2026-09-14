import { useEffect, useState } from 'react'
import HeroSection from '../components/HeroSection.jsx'
import { SkeletonHero } from '../components/SkeletonCard.jsx'
import MovieSection from '../components/MovieSection.jsx'
import ErrorState from '../components/ErrorState.jsx'
import * as tmdb from '../services/tmdbApi.js'

// Small reusable hook: fetches one homepage rail and tracks its own
// loading/error/retry state, independently of every other rail.
function useMovieSection(fetcher) {
  const [state, setState] = useState({ movies: null, loading: true, error: null })

  const load = () => {
    setState({ movies: null, loading: true, error: null })
    fetcher()
      .then((data) => setState({ movies: data.results || [], loading: false, error: null }))
      .catch((err) =>
        setState({
          movies: null,
          loading: false,
          error: err.message || 'Failed to load movies.',
        })
      )
  }

  useEffect(load, []) // eslint-disable-line react-hooks/exhaustive-deps

  return { ...state, retry: load }
}

export default function Home() {
  const [hero, setHero] = useState(null)
  const [heroTrailer, setHeroTrailer] = useState(null)
  const [heroError, setHeroError] = useState(null)

  // One hook call per rail — explicit and easy to follow, and it keeps the
  // number/order of hook calls constant across renders.
  const trending = useMovieSection(() => tmdb.getTrending('day'))
  const popular = useMovieSection(tmdb.getPopular)
  const topRated = useMovieSection(tmdb.getTopRated)
  const nowPlaying = useMovieSection(tmdb.getNowPlaying)
  const upcoming = useMovieSection(tmdb.getUpcoming)
  const recommended = useMovieSection(() => tmdb.getPopular(2))

  const sections = [
    {
      key: 'trending',
      eyebrow: 'Trending',
      title: 'Movies everyone is talking about',
      state: trending,
    },
    {
      key: 'popular',
      eyebrow: 'Popular',
      title: 'Crowd favorites right now',
      state: popular,
    },
    {
      key: 'topRated',
      eyebrow: 'Top Rated',
      title: 'The best of the best',
      state: topRated,
    },
    {
      key: 'nowPlaying',
      eyebrow: 'In Theaters',
      title: 'Now playing',
      state: nowPlaying,
    },
    {
      key: 'upcoming',
      eyebrow: 'Coming Soon',
      title: 'Upcoming releases',
      state: upcoming,
    },
    {
      key: 'recommended',
      eyebrow: 'For You',
      title: 'Recommended picks',
      state: recommended,
    },
  ]

  useEffect(() => {
    let cancelled = false
    async function loadHero() {
      try {
        const trendingData = await tmdb.getTrending('day')
        const pick = trendingData.results?.[0]
        if (!pick || cancelled) return
        const details = await tmdb.getMovieDetails(pick.id)
        if (cancelled) return
        setHero(details)
        const trailer = details.videos?.results?.find(
          (v) => v.type === 'Trailer' && v.site === 'YouTube'
        )
        setHeroTrailer(trailer?.key || null)
      } catch (err) {
        if (!cancelled) setHeroError(err.message || 'Failed to load featured movie.')
      }
    }
    loadHero()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div>
      {!hero && !heroError && <SkeletonHero />}
      {heroError && (
        <div className="px-4 pt-10 sm:px-8">
          <ErrorState description={heroError} onRetry={() => window.location.reload()} />
        </div>
      )}
      {hero && <HeroSection movie={hero} trailerKey={heroTrailer} />}

      <div className="pt-10">
        {sections.map((s) => (
          <MovieSection
            key={s.key}
            title={s.title}
            movies={s.state.movies}
            loading={s.state.loading}
            error={s.state.error}
            onRetry={s.state.retry}
            viewAllTo="/discover"
          />
        ))}
      </div>
    </div>
  )
}