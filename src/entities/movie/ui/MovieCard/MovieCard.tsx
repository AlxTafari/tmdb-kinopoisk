import {Link} from 'react-router-dom'
import type {CardMovie} from '@/entities/movie/movieSchema'
import {TMDB_IMAGE_BASE_URL} from '@/shared/constants/tmdb'
import styles from './MovieCard.module.scss'
import {useAppDispatch, useAppSelector} from "@/shared/hooks";
import {addFavorite, removeFavorite} from "@/features/favorites/favoritesSlice/favoritesSlice.ts";

type MovieCardProps = {
    movie: CardMovie
}

const getRatingClass = (rating: number) => {
    if (rating >= 7) return styles.ratingGreen
    if (rating >= 5) return styles.ratingYellow
    return styles.ratingRed
}

export function MovieCard({movie}: MovieCardProps) {
    const posterUrl = movie.poster_path
        ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`
        : 'https://placehold.co/500x750?text=No+Image'

    const isFavorite = useAppSelector(state =>
        state.favorites.movies.some(m => m.id === movie.id))
    const dispatch = useAppDispatch()

    const handleFavorite = () => {
        dispatch(isFavorite ? removeFavorite(movie.id) : addFavorite(movie))
    }

    return (
        <article className={styles.card}>
            <Link to={`/movie/${movie.id}`} className={styles.link}>
                <img src={posterUrl} alt={movie.title} className={styles.poster}/>
                <div className={styles.info}>
                    <span className={styles.title}>{movie.title}</span>
                    <span className={`${styles.rating} ${getRatingClass(movie.vote_average)}`}>
            {movie.vote_average.toFixed(1)}
          </span>
                </div>
            </Link>
            <button
                className={`${styles.favorite} ${isFavorite ? styles.favoriteActive : ''}`}
                aria-label="Add to favorites"
                onClick={handleFavorite}
            >❤</button>
        </article>
    )
}
