import {
    SORT_BY, SORT_BY_LABELS,
    useGetFilterMoviesQuery,
} from "@/features/filter-movies/api/discoverApi.ts";
import styles from './FilterMovies.module.scss'
import {MovieCard} from "@/entities/movie/ui/MovieCard/MovieCard.tsx";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css'
import {useFilters} from "@/features/filter-movies/hooks/useFilters.ts";
import {Pagination} from "@/shared/components/Pagination/Pagination.tsx";
import {useState} from "react";

export const FilterMovies = () => {
    const { apiFilters, rating, setRating, selectedGenres, toggleGenre, resetFilters, setSortBy, genresData, page, setPage } = useFilters()
    const { data } = useGetFilterMoviesQuery(apiFilters)

    const [pageSize, setPageSize] = useState(20);
    const [filtersOpen, setFiltersOpen] = useState(false);

    const changePageSizeHandler = (size: number) => {
        setPageSize(size)
        setPage(1)
    }

    const totalPages = data?.total_pages

    return (
        <div className={styles.wrapper}>
            <button
                className={styles.filterToggle}
                onClick={() => setFiltersOpen(v => !v)}
            >
                <span>Фильтры</span>
                <span>{filtersOpen ? '▲' : '▼'}</span>
            </button>

            <div className={`${styles.sidebar} ${filtersOpen ? styles.sidebarOpen : ''}`}>
                <div className={styles.controlsCard}>
                    <select value={apiFilters.sort_by} onChange={(e) => setSortBy(e.target.value)}>
                        {Object.entries(SORT_BY).map(([key, value]) => (
                            <option value={value} key={key}>
                                {SORT_BY_LABELS[value]}
                            </option>
                        ))}
                    </select>
                    <button className={styles.resetButton} onClick={resetFilters}>
                        Сбросить
                    </button>
                </div>

                <div className={styles.sliderCard}>
                    <Slider
                        range
                        min={0}
                        max={10}
                        step={0.1}
                        value={rating}
                        onChange={(value) => setRating(value as number[])}
                    />
                </div>

                <div className={styles.genreList}>
                    {genresData?.genres.map(genre => (
                        <button
                            key={genre.id}
                            className={`${styles.genreButton}${selectedGenres.includes(String(genre.id)) ? ` ${styles.active}` : ''}`}
                            onClick={() => toggleGenre(genre.id)}
                        >
                            {genre.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.main}>
                <div className={styles.grid}>
                    {data?.results.slice(0, pageSize).map(movie => (
                        <MovieCard key={movie.id} movie={movie}/>
                    ))}
                </div>
                <Pagination
                    currentPage={page}
                    setCurrentPage={setPage}
                    pagesCount={totalPages ?? 1}
                    pageSize={pageSize}
                    changePageSize={changePageSizeHandler}
                />
            </div>
        </div>
    );
};
