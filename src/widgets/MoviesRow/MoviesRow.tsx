import { Link } from 'react-router-dom'
import { MovieCard } from '@/entities/movie/ui/MovieCard/MovieCard'
import { useGetMoviesByCategoryQuery } from '@/features/movies/api/moviesApi'
import type { Category } from '@/features/movies/api/moviesApi'
import styles from './MoviesRow.module.css'

type MoviesRowProps = {
  title: string
  category: Category
}

export function MoviesRow({ title, category }: MoviesRowProps) {
  const { data, isLoading } = useGetMoviesByCategoryQuery({ category })

  if (isLoading) return <p>Loading...</p>

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2>{title}</h2>
        <Link to={`/category/${category}`} className={styles.viewMore}>View More</Link>
      </div>
      <div className={styles.grid}>
        {data?.results.slice(0, 6).map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  )
}
