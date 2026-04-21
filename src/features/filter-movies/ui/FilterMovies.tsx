import {useSearchParams} from "react-router-dom";
import {
    SORT_BY,
    type SortBy,
    useGetFilterMoviesQuery,
    useGetGenresMoviesQuery
} from "@/features/filter-movies/api/discoverApi.ts";
import styles from './FilterMovies.module.css'
import {MovieCard} from "@/entities/movie/ui/MovieCard/MovieCard.tsx";

export const FilterMovies = () => {

    const [searchParams, setSearchParams] = useSearchParams()

    const {data: genresData} = useGetGenresMoviesQuery()

    const sortBy = searchParams.get('sort_by') ?? 'popularity.desc'
    const genres = searchParams.get('with_genres') ?? undefined
    const page = Number(searchParams.get('page')) || 1
    const selectedGenres = genres ? genres.split(',') : []


    const {data} = useGetFilterMoviesQuery({
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

    const SORT_BY_LABELS: Record<SortBy, string> = {
        'popularity.desc': 'Popularity ↓',
        'popularity.asc': 'Popularity ↑',
        'vote_average.desc': 'Rating ↓',
        'vote_average.asc': 'Rating ↑',
        'release_date.desc': 'Release Date ↓',
        'release_date.asc': 'Release Date ↑',
        'original_title.asc': 'Title A → Z',
        'original_title.desc': 'Title Z → A',
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.controls}>
                <select className={styles.sortSelect} value={sortBy} onChange={(e) => setSearchParams(prev => {
                    prev.set('sort_by', e.target.value)
                    return prev
                })}>
                    {Object.entries(SORT_BY).map(([key, value]) => (
                        <option value={value} key={key}>{SORT_BY_LABELS[value]}</option>
                    ))}
                </select>

            </div>
            <div className={styles.genreList}>
                {genresData?.genres.map(genre => (
                    <button
                        key={genre.id}
                        className={`${styles.genreButton}${selectedGenres.includes(String(genre.id)) ? ` ${styles.active}` : ''}`}
                        onClick={() => {
                            toggleGenre(genre.id)
                        }}
                    >
                        {genre.name}
                    </button>
                ))}
            </div>
            <div className={styles.grid}>
                {data?.results.slice(0, 5).map(movie => (
                    <MovieCard key={movie.id} movie={movie}/>
                ))}
            </div>
        </div>
    );
};