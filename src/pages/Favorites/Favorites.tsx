import styles from './Favorites.module.scss'
import {useAppSelector} from "@/shared/hooks"
import {MovieCard} from "@/entities/movie/ui/MovieCard/MovieCard.tsx"

export function Favorites() {
    const movies = useAppSelector(state => state.favorites.movies)

    return (
        <div>
            <h2 className={styles.title}>Избранное</h2>
            {movies.length === 0
                ? <p className={styles.empty}>Вы ещё не добавили фильмы в избранное</p>
                : (
                    <div className={styles.grid}>
                        {movies.map(movie => (
                            <MovieCard key={movie.id} movie={movie}/>
                        ))}
                    </div>
                )
            }
        </div>
    )
}
