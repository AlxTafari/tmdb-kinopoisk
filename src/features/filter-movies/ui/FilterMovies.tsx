import {
    SORT_BY, SORT_BY_LABELS,
    useGetFilterMoviesQuery,
} from "@/features/filter-movies/api/discoverApi.ts";
import styles from './FilterMovies.module.css'
import {MovieCard} from "@/entities/movie/ui/MovieCard/MovieCard.tsx";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css'
import {useFilters} from "@/features/filter-movies/hooks/useFilters.ts";

export const FilterMovies = () => {
    // Вся логика лежит в хуке useFilters
    const { apiFilters, rating, setRating, selectedGenres, toggleGenre, resetFilters, setSortBy, genresData } = useFilters()
    // Один запрос — все параметры из URL
    const { data } = useGetFilterMoviesQuery(apiFilters)

    return (
        <div className={styles.wrapper}>
            <div className={styles.controls}>
                <select value={apiFilters.sort_by} onChange={(e) => setSortBy(e.target.value)}>
                {Object.entries(SORT_BY).map(([key, value]) => (
                        <option value={value}
                                key={key}>
                            {SORT_BY_LABELS[value]}
                        </option>
                    ))}
                </select>
                <button className={styles.genreButton}
                        onClick={resetFilters}>Reset
                </button>
            </div>
            <div>
                <Slider
                    range
                    min={0}
                    max={10}
                    step={0.1}
                    value={rating}
                    onChange={(value) => {
                        setRating(value as number[])
                    }}
                />
            </div>
            <div className={styles.genreList}>
                {genresData?.genres.map(genre => (
                    <button
                        key={genre.id}
                        className={`${styles.genreButton}${selectedGenres
                            .includes(String(genre.id))
                            ? ` ${styles.active}`
                            : ''}`}
                        onClick={() => {
                            toggleGenre(genre.id)
                        }}
                    >
                        {genre.name}
                    </button>
                ))}
            </div>
            <div className={styles.grid}>
                {data?.results.slice(0, 20).map(movie => (
                    <MovieCard key={movie.id} movie={movie}/>
                ))}
            </div>
        </div>
    );
};