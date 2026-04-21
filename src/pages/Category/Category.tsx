import styles from './Category.module.css'
import {CategoryTabs} from "@/widgets/CategoryTabs/CategoryTabs.tsx";
import {type Category, useGetMoviesByCategoryQuery} from "@/features/movies/api/moviesApi.ts";
import {useNavigate, useParams} from "react-router-dom";
import {MovieCard} from "@/entities/movie/ui/MovieCard/MovieCard.tsx";
import {useState} from "react";
import {Pagination} from "@/shared/components/Pagination/Pagination.tsx";

export function Category() {

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(4);

    const { category } = useParams<{ category: Category }>()
    const navigate = useNavigate()
    const { data } = useGetMoviesByCategoryQuery(
        { category: category ?? 'popular', page: currentPage},
        { skip: !category }
    )
    console.log(data)


    const totalPages = data?.total_pages

    const onCategoryChange = (category: Category) => {
        navigate(`/category/${category}`)
        setCurrentPage(1)
    }

    const changePageSizeHandler = (size: number) => {
        setPageSize(size)
        setCurrentPage(1)
    }

    if (!category) return <div>Категории куда-то пропали..</div>

    return (
        <section>
            <div className={styles.title}>
                <CategoryTabs activeCategory={category} onCategoryChange={onCategoryChange} />
            </div>

            <h2>{category}</h2>

            <div className={styles.grid}>
                {data?.results.slice(0, pageSize).map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pagesCount={totalPages || 1}
                pageSize={pageSize}
                changePageSize={changePageSizeHandler}

            />
        </section>


  )
}
