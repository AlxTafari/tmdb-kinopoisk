import styles from './Category.module.css'
import {CategoryTabs} from "@/widgets/CategoryTabs/CategoryTabs.tsx";
import {type Category, useGetMoviesByCategoryQuery} from "@/features/movies/api/moviesApi.ts";
import {useNavigate, useParams} from "react-router-dom";
import {MovieCard} from "@/entities/movie/ui/MovieCard/MovieCard.tsx";

export function Category() {

    const { category } = useParams<{ category: Category }>()
    const navigate = useNavigate()

    const { data } = useGetMoviesByCategoryQuery(
        { category: category ?? 'popular' },
        { skip: !category }
    )

    const onCategoryChange = (category: Category) => {
        navigate(`/category/${category}`)
    }
    if (!category) return <div>Категории куда-то пропали..</div>

    return (
        <section>
            <div className={styles.title}>
                <CategoryTabs activeCategory={category} onCategoryChange={onCategoryChange} />
            </div>

            <h2>{category}</h2>

            <div className={styles.grid}>
                {data?.results.slice(0, 6).map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </section>


  )
}
