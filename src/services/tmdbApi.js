// Centralized TMDB API service.
// All network calls to TMDB live here so the rest of the app never talks
// to the API directly. Swap the base URL or auth strategy in one place
// if TMDB's API ever changes.
import axios from 'axios'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'
export const IMAGE_BASE = 'https://image.tmdb.org/t/p'

export const IMG = {
  poster: (path, size = 'w500') =>
    path ? `${IMAGE_BASE}/${size}${path}` : null,
  backdrop: (path, size = 'w1280') =>
    path ? `${IMAGE_BASE}/${size}${path}` : null,
  profile: (path, size = 'w300') =>
    path ? `${IMAGE_BASE}/${size}${path}` : null,
}

const client = axios.create({
  baseURL: BASE_URL,
  params: { api_key: API_KEY },
})

client.interceptors.request.use((config) => {
  if (!API_KEY) {
    return Promise.reject(
      new Error(
        'Missing TMDB API key. Add VITE_TMDB_API_KEY to your .env file.'
      )
    )
  }
  return config
})

async function get(path, params = {}) {
  const { data } = await client.get(path, { params })
  return data
}

// ---- Lists ----
export const getTrending = (window = 'day', page = 1) =>
  get(`/trending/movie/${window}`, { page })

export const getPopular = (page = 1) => get('/movie/popular', { page })

export const getTopRated = (page = 1) => get('/movie/top_rated', { page })

export const getNowPlaying = (page = 1) => get('/movie/now_playing', { page })

export const getUpcoming = (page = 1) => get('/movie/upcoming', { page })

// ---- Details ----
export const getMovieDetails = (id) =>
  get(`/movie/${id}`, { append_to_response: 'videos,credits' })

export const getMovieCredits = (id) => get(`/movie/${id}/credits`)

export const getMovieVideos = (id) => get(`/movie/${id}/videos`)

export const getSimilarMovies = (id, page = 1) =>
  get(`/movie/${id}/similar`, { page })

export const getRecommendations = (id, page = 1) =>
  get(`/movie/${id}/recommendations`, { page })

// ---- Search ----
export const searchMovies = (query, page = 1) =>
  get('/search/movie', { query, page, include_adult: false })

// ---- Genres ----
export const getGenres = () => get('/genre/movie/list')

export const getMoviesByGenre = (genreId, page = 1, sortBy = 'popularity.desc') =>
  get('/discover/movie', { with_genres: genreId, page, sort_by: sortBy })

// ---- Discover ----
export const discoverMovies = (filters = {}, page = 1) => {
  const {
    genre,
    year,
    minRating,
    language,
    sortBy = 'popularity.desc',
    type,
  } = filters
  return get('/discover/movie', {
    page,
    sort_by: sortBy,
    with_genres: genre || undefined,
    primary_release_year: year || undefined,
    'vote_average.gte': minRating || undefined,
    with_original_language: language || undefined,
    with_release_type: type || undefined,
  })
}

export default {
  getTrending,
  getPopular,
  getTopRated,
  getNowPlaying,
  getUpcoming,
  getMovieDetails,
  getMovieCredits,
  getMovieVideos,
  getSimilarMovies,
  getRecommendations,
  searchMovies,
  getGenres,
  getMoviesByGenre,
  discoverMovies,
  IMG,
}
