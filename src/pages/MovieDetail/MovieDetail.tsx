import {Link, useNavigate, useParams} from 'react-router-dom'
import styles from './MovieDetail.module.scss'
import {useGetMovieCreditsQuery, useGetMovieDetailsQuery, useGetSimilarMoviesQuery} from '@/features/movies/api/movieDetailApi'
import {TMDB_BACKDROP_BASE_URL, TMDB_IMAGE_BASE_URL} from '@/shared/constants/tmdb'
import {MovieCard} from '@/entities/movie/ui/MovieCard/MovieCard'

const POSTER_PLACEHOLDER = 'https://placehold.co/260x390?text=No+Image'
const PHOTO_PLACEHOLDER = 'https://placehold.co/200x300?text=No+Photo'

const getRatingClass = (rating: number) => {
    if (rating >= 7) return styles.ratingGreen
    if (rating >= 5) return styles.ratingYellow
    return styles.ratingRed
}

const formatRuntime = (minutes: number) => {
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    return h > 0 ? `${h}ч ${m}м` : `${m}м`
}

export function MovieDetail() {
    const {id} = useParams()
    const navigate = useNavigate()
    const movieId = Number(id)

    const {data: movie} = useGetMovieDetailsQuery(movieId)
    const {data: credits} = useGetMovieCreditsQuery(movieId)
    const {data: similar} = useGetSimilarMoviesQuery(movieId)

    if (!movie) return null

    const posterUrl = movie.poster_path
        ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`
        : POSTER_PLACEHOLDER

    const backdropUrl = movie.backdrop_path
        ? `${TMDB_BACKDROP_BASE_URL}${movie.backdrop_path}`
        : undefined

    const releaseYear = movie.release_date?.slice(0, 4)
    const topCast = credits?.cast.slice(0, 6) ?? []
    const similarMovies = similar?.results.slice(0, 6) ?? []

    return (
        <div className={styles.wrapper}>
            <button className={styles.back} onClick={() => navigate(-1)}>← Назад</button>

            <section
                className={styles.hero}
                style={backdropUrl ? {backgroundImage: `url(${backdropUrl})`} : undefined}
            >
                <div className={styles.overlay}/>
                <div className={styles.info}>
                    <img src={posterUrl} alt={movie.title} className={styles.poster}/>
                    <div className={styles.details}>
                        <h1 className={styles.title}>{movie.title}</h1>
                        {movie.tagline && <p className={styles.tagline}>{movie.tagline}</p>}
                        <div className={styles.meta}>
                            {releaseYear && <span>{releaseYear}</span>}
                            {movie.runtime && <span>{formatRuntime(movie.runtime)}</span>}
                            <span className={`${styles.rating} ${getRatingClass(movie.vote_average)}`}>
                                ★ {movie.vote_average.toFixed(1)}
                            </span>
                        </div>
                        {movie.genres.length > 0 && (
                            <div className={styles.genres}>
                                {movie.genres.map(g => (
                                    <span key={g.id} className={styles.genreTag}>{g.name}</span>
                                ))}
                            </div>
                        )}
                        {movie.overview && <p className={styles.overview}>{movie.overview}</p>}
                    </div>
                </div>
            </section>

            {topCast.length > 0 && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Актёры</h2>
                    <div className={styles.castGrid}>
                        {topCast.map(actor => (
                            <Link key={actor.id} to={`/actor/${actor.id}`} className={styles.castCard}>
                                <img
                                    src={actor.profile_path
                                        ? `${TMDB_IMAGE_BASE_URL}${actor.profile_path}`
                                        : PHOTO_PLACEHOLDER}
                                    alt={actor.name}
                                    className={styles.castPhoto}
                                />
                                <p className={styles.castName}>{actor.name}</p>
                                <p className={styles.castCharacter}>{actor.character}</p>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {similarMovies.length > 0 && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Похожие фильмы</h2>
                    <div className={styles.similarGrid}>
                        {similarMovies.map(m => <MovieCard key={m.id} movie={m}/>)}
                    </div>
                </section>
            )}
        </div>
    )
}
