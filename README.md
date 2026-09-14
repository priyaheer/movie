# 🎬 CineVerse — Movie Discovery Web App

A production-quality, dark cinematic movie discovery platform built with React, Vite, Tailwind CSS, and the TMDB API.

---

## 1. Folder Structure

```
cineverse/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .env.example
├── src/
│   ├── main.jsx                 # App entry, wraps providers + router
│   ├── App.jsx                  # Routes
│   ├── index.css                # Tailwind + design-system utilities
│   ├── components/
│   │   ├── Navbar.jsx           # Sticky responsive nav + mobile drawer
│   │   ├── Footer.jsx
│   │   ├── HeroSection.jsx      # Homepage featured-movie hero
│   │   ├── MovieCard.jsx        # The one reusable movie card
│   │   ├── MovieGrid.jsx        # Responsive grid of MovieCards
│   │   ├── MovieSection.jsx     # Horizontal rail (Trending, Popular…)
│   │   ├── SectionHeader.jsx
│   │   ├── GenreCard.jsx
│   │   ├── CastCard.jsx
│   │   ├── TrailerModal.jsx     # YouTube trailer modal (Esc + backdrop close)
│   │   ├── SearchBar.jsx
│   │   ├── FilterPanel.jsx      # Genre/year/rating/language/sort filters
│   │   ├── StarRating.jsx       # Circular rating badge + inline stars
│   │   ├── SkeletonCard.jsx     # All skeleton loaders
│   │   ├── EmptyState.jsx
│   │   ├── ErrorState.jsx
│   │   └── Toast.jsx
│   ├── pages/
│   │   ├── Home.jsx             # Hero + 6 movie rails
│   │   ├── Discover.jsx         # Filters + sort + infinite "Load More"
│   │   ├── Search.jsx           # Debounced search + client-side filters
│   │   ├── Genres.jsx           # Genre grid
│   │   ├── GenreMovies.jsx      # /genre/:genreId
│   │   ├── MovieDetails.jsx     # /movie/:id — cast, crew, similar, etc.
│   │   ├── Watchlist.jsx
│   │   ├── Favorites.jsx
│   │   ├── Profile.jsx          # Stats derived from localStorage
│   │   ├── About.jsx / Contact.jsx
│   │   └── NotFound.jsx
│   ├── context/
│   │   ├── ThemeContext.jsx     # Dark/light, persisted
│   │   ├── WatchlistContext.jsx
│   │   ├── FavoritesContext.jsx
│   │   └── ToastContext.jsx     # "✓ Added to your watchlist" toasts
│   ├── services/
│   │   └── tmdbApi.js           # ALL TMDB calls live here
│   ├── hooks/
│   │   ├── useLocalStorage.js
│   │   └── useDebounce.js
│   └── utils/
│       ├── constants.js         # Genres, languages, years, sort options
│       └── helpers.js           # Formatters (date, runtime, money…)
```

---

## 2. Setup Commands

```bash
# 1. Unzip / clone the project, then move into it
cd cineverse

# 2. Install dependencies
npm install

# 3. Add your TMDB API key (see section 5)
cp .env.example .env
# then edit .env and paste your key

# 4. Run the dev server
npm run dev
```

The app will be available at **http://localhost:5173**.

---

## 3. Required Dependencies

Already declared in `package.json` — `npm install` handles all of this:

- `react`, `react-dom` — UI library
- `react-router-dom` — routing (`/`, `/discover`, `/movie/:id`, etc.)
- `axios` — HTTP client for TMDB
- `lucide-react` — icon set
- `tailwindcss`, `postcss`, `autoprefixer` — styling
- `vite`, `@vitejs/plugin-react` — dev server & build tool

No unnecessary libraries were added — no state-management library, no UI kit, no animation library. Tailwind's own transition utilities + a handful of keyframes handle every animation in the app.

---

## 4. `.env` Setup

Create a `.env` file in the project root (a `.gitignore`-safe `.env.example` is provided):

```env
VITE_TMDB_API_KEY=your_api_key_here
```

The key is read once in `src/services/tmdbApi.js` and never referenced anywhere else in the codebase — no component ever touches it directly.

---

## 5. How to Get a TMDB API Key

1. Create a free account at [themoviedb.org](https://www.themoviedb.org/signup).
2. Go to **Settings → API** (or visit `https://www.themoviedb.org/settings/api`).
3. Click **Create** under "Request an API Key" and choose **Developer**.
4. Fill in the short application form (you can describe it as a personal/portfolio project).
5. Copy the **API Key (v3 auth)** value — that's what goes in `VITE_TMDB_API_KEY`.

The key is free and has generous rate limits for a project like this.

---

## 6. Running the Project

```bash
npm run dev       # start local dev server (hot reload)
npm run build     # production build into /dist
npm run preview   # preview the production build locally
```

---

## 7. What Each Major Piece Does

- **`tmdbApi.js`** — the single source of truth for every TMDB endpoint used in the app (trending, popular, top rated, now playing, upcoming, details, credits, videos, similar, recommendations, search, discover, genres). Also exports `IMG.poster/backdrop/profile` helpers so no component builds an image URL by hand.
- **`ThemeContext` / `WatchlistContext` / `FavoritesContext`** — small, focused Context providers, each backed by `useLocalStorage` so state survives a refresh. Watchlist/Favorites both fire a toast (via `ToastContext`) whenever something is added or removed.
- **`MovieCard`** — the *only* movie-card implementation in the app. Every page (Home rails, Discover grid, Search results, Genre pages, Watchlist, Favorites) renders this same component, so a design tweak only needs to happen once.
- **`FilterPanel`** — one configurable component that both `Discover` and `Search` reuse via a `fields` prop, instead of two near-duplicate filter UIs.
- **`MovieDetails`** — fetches details, credits, and videos in a single TMDB call (`append_to_response`), then separately fetches similar movies and recommendations so a slow "similar" request never blocks the main content from rendering.
- **`SkeletonCard.jsx`** — shape-matched skeleton loaders for cards, rails, grids, the hero, movie details, and cast rows, so nothing ever shows a bare "Loading…" text.

---

## 8. Implemented Features

- Dark/light theme toggle, persisted, with a smooth transition
- Cinematic hero section with an auto-selected featured movie + trailer modal
- 6 homepage rails: Trending, Popular, Top Rated, Now Playing, Upcoming, Recommended
- Reusable movie card with hover animation, favorite/watchlist quick actions
- Full movie details page: cast, crew, trailer, similar movies, recommendations, budget/revenue
- Discover page with genre/year/rating/language/type filters + 5 sort modes + "Load More" pagination
- Debounced live search with client-side filtering/sorting of results
- Genre browsing grid → per-genre movie listing with sorting
- Watchlist & Favorites, persisted in localStorage, each with a tailored empty state
- Profile page with stats computed from localStorage
- Toast notifications for add/remove actions
- Skeleton loaders, empty states, and error states (with retry) on every data-driven page
- Fully responsive: 2-up mobile grids up to 6-up large-screen grids, hamburger nav on mobile
- Accessibility: semantic HTML, alt text, visible focus rings, Escape-to-close modal, `prefers-reduced-motion` support
- Graceful handling of missing posters/backdrops/trailers/cast and invalid movie IDs

---

## 9. Suggestions for Future Improvements

- Add a real backend + auth so Watchlist/Favorites/Profile sync across devices instead of living only in localStorage
- Add a "Rated" flow where users can actually score a movie (currently the Profile page derives a placeholder from favorites)
- Server-side pagination caching / React Query for smarter refetching and offline support
- TV shows, actor detail pages, and a dedicated "Now in Theaters near me" view using TMDB's `/movie/now_playing` + region param
- Unit/integration tests (Vitest + React Testing Library) for contexts and the API service
- i18n for language/region-aware content
# movie
