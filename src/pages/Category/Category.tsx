import styles from './Category.module.scss'
import {CategoryTabs} from "@/widgets/CategoryTabs/CategoryTabs.tsx";
import {type Category, useGetMoviesByCategoryQuery} from "@/features/movies/api/moviesApi.ts";
import {useNavigate, useParams} from "react-router-dom";
import {MovieCard} from "@/entities/movie/ui/MovieCard/MovieCard.tsx";
import {MovieCardSkeleton} from "@/entities/movie/ui/MovieCardSkeleton/MovieCardSkeleton.tsx";
import {useState} from "react";
import {Pagination} from "@/shared/components/Pagination/Pagination.tsx";
import {CATEGORIES} from "@/shared/constants/categories.ts";

export function Category() {

    const [currentPage, setCurrentPage] = useState(1);

    const {category} = useParams<{ category: Category }>()
    const navigate = useNavigate()
    const {data, isLoading} = useGetMoviesByCategoryQuery(
        {category: category ?? 'popular', page: currentPage},
        {skip: !category}
    )

    const title = CATEGORIES.find(c => c.key === category)?.label ?? category

    const totalPages = data?.total_pages

    const onCategoryChange = (category: Category) => {
        navigate(`/category/${category}`)
        setCurrentPage(1)
    }

    if (!category) return <div>Категории куда-то пропали..</div>

    return (
        <section>
            <div className={styles.tabs}>
                <CategoryTabs activeCategory={category} onCategoryChange={onCategoryChange}/>
            </div>

            <h2 className={styles.title}>{title}</h2>

            <div className={styles.grid}>
                {isLoading
                    ? Array.from({length: 20}).map((_, i) => <MovieCardSkeleton key={i}/>)
                    : data?.results.map(movie => <MovieCard key={movie.id} movie={movie}/>)
                }
            </div>
            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pagesCount={totalPages || 1}
            />
        </section>


    )
}
