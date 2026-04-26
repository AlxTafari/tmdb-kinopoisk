import {useSearchMovieQuery} from "@/features/movies/api/moviesApi.ts";
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {MovieCard} from "@/entities/movie/ui/MovieCard/MovieCard.tsx";
import styles from './Search.module.css'
import {Pagination} from "@/shared/components/Pagination/Pagination.tsx";


export function Search() {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(16);

    const [searchParams, setSearchParams] = useSearchParams()

    // инициализируем из URL — чтобы при переходе с WelcomeSection инпут не был пустым
    const queryFromUrl = searchParams.get('query') || ""
    const [inputValue, setInputValue] = useState(queryFromUrl)
    const isInSync = inputValue.trim() === queryFromUrl


    // debounce: локальный стейт → URL
    useEffect(() => {
        const timer = setTimeout(()=>{
            setSearchParams(inputValue.trim() ? { query: inputValue.trim() } : {})
            setCurrentPage(1)
        }, 700)
        return () => clearTimeout(timer)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputValue])

    // запрос читает из URL, не из useState
    const { data, isLoading, isFetching } = useSearchMovieQuery({ query: queryFromUrl, page: currentPage }, { skip: !queryFromUrl })
    const totalPages = data?.total_pages
    const changePageSizeHandler = (size: number) => {
        setPageSize(size)
        setCurrentPage(1)
    }

    return (
        <div className={styles.wrapper}>
            <input
                className={styles.input}
                type="search"
                placeholder="Search for a movie..."
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
            />

            {inputValue === "" && <h1>Enter a movie title to start searching</h1>}

            {!isInSync && inputValue.trim() && <p>Searching...</p>}

            {isInSync && inputValue.trim() && (isLoading || isFetching) ? (
                <p>Loading...</p>
            ) : isInSync && inputValue.trim() && (
                <div className={styles.grid}>
                    {data?.results.slice(0, pageSize).map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}

            {data && data.results.length === 0 && (
                <p>Nothing found for "{queryFromUrl}"</p>
            )}
            {queryFromUrl && <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pagesCount={totalPages ?? 1}
                pageSize={pageSize}
                changePageSize={changePageSizeHandler}

            />}
        </div>
    )
}
