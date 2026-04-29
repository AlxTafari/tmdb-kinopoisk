import styles from './FavoritesList.module.scss'
import {MovieCard} from "@/entities/movie/ui/MovieCard/MovieCard.tsx";
import {useAppSelector} from "@/shared/hooks";

export function FavoritesList() {

    const movies = useAppSelector(state => state.favorites.movies)

    return (
        <div className={styles.grid}>
            {movies.length === 0
                ? <p className={styles.empty}>Вы ещё не добавили фильмы в избранное</p>
                : movies.map(movie => <MovieCard key={movie.id} movie={movie}/>)
            }
        </div>
    )
}