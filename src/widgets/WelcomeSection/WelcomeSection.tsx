import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetMoviesByCategoryQuery } from '@/features/movies/api/moviesApi'
import { TMDB_BACKDROP_BASE_URL } from '@/shared/constants/tmdb'
import { Path } from '@/shared/constants/paths'
import styles from './WelcomeSection.module.css'

export function WelcomeSection() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const { data } = useGetMoviesByCategoryQuery({ category: 'popular' })

  // фиксируем случайный backdrop при монтировании, не меняем при ре-рендерах
  const backdropUrl = useMemo(() => {
    const movies = data?.results.filter(m => m.backdrop_path) ?? []
    if (!movies.length) return undefined
    const random = movies[Math.floor(Math.random() * movies.length)]
    return `${TMDB_BACKDROP_BASE_URL}${random.backdrop_path}`
  }, [data])

  const handleSearch = () => {
    if (!query.trim()) return
    navigate(`${Path.Search}?query=${encodeURIComponent(query.trim())}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <section
      className={styles.section}
      style={backdropUrl ? { backgroundImage: `url(${backdropUrl})` } : undefined}
    >
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1>Welcome.</h1>
        <p>Millions of movies to discover. Explore now.</p>
        <div className={styles.form}>
          <input
            className={styles.input}
            type="text"
            placeholder="Search for a movie..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className={styles.button}
            disabled={!query.trim()}
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    </section>
  )
}
