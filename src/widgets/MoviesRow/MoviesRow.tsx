import {Link} from 'react-router-dom'
import {MovieCard} from '@/entities/movie/ui/MovieCard/MovieCard'
import {MovieCardSkeleton} from '@/entities/movie/ui/MovieCardSkeleton/MovieCardSkeleton'
import type {Category} from '@/features/movies/api/moviesApi'
import {useGetMoviesByCategoryQuery} from '@/features/movies/api/moviesApi'
import styles from './MoviesRow.module.scss'

type MoviesRowProps = {
  title: string
  category: Category
}

export function MoviesRow({ title, category }: MoviesRowProps) {
  const { data, isLoading } = useGetMoviesByCategoryQuery({ category })

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2>{title}</h2>
        <Link to={`/category/${category}`} className={styles.viewMore}>View More</Link>
      </div>
      <div className={styles.grid}>
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <MovieCardSkeleton key={i} />)
          : data?.results.slice(0, 6).map(movie => <MovieCard key={movie.id} movie={movie} />)
        }
      </div>
    </section>
  )
}
