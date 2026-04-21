import {useSearchParams} from "react-router-dom";
import {
    type SortBy,
    useGetFilterMoviesQuery,
    useGetGenresMoviesQuery
} from "@/features/filter-movies/api/discoverApi.ts";
import styles from './FilterMovies.module.css'
import {MovieCard} from "@/entities/movie/ui/MovieCard/MovieCard.tsx";

export const FilterMovies = () => {

    const [searchParams, setSearchParams] = useSearchParams()

    const { data: genresData } = useGetGenresMoviesQuery()

    const sortBy = searchParams.get('sort_by') ?? 'popularity.desc'
    const genres = searchParams.get('with_genres') ?? undefined
    const page = Number(searchParams.get('page')) || 1
    const selectedGenres = genres ? genres.split(',') : []


    const { data } = useGetFilterMoviesQuery({
        sort_by: sortBy as SortBy,
        with_genres: genres,
        page,
    })

    const toggleGenre = (genreId: number) => {
        const genreIdStr = genreId.toString()
        const updated = selectedGenres.includes(genreIdStr)
        ? selectedGenres.filter(g => g !== genreIdStr)
            : [...selectedGenres, genreIdStr]
        setSearchParams(prev => {
            prev.set('with_genres', updated.join(','))
            return prev
        })
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.genreList}>
                {genresData?.genres.map(genre => (
                    <button
                        key={genre.id}
                        className={`${styles.genreButton}${selectedGenres.includes(String(genre.id)) ? ` ${styles.active}` : ''}`}
                        onClick={() => { toggleGenre(genre.id) }}
                    >
                        {genre.name}
                    </button>
                ))}
            </div>
            <div className={styles.grid}>
                {data?.results.slice(0, 5).map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
};