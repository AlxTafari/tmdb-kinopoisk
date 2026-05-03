import styles from './Filtered.module.scss'
import {FilterMovies} from "@/features/filter-movies/ui/FilterMovies.tsx";

export function Filtered() {
    return (
        <div className={styles.page}>
            <h2 className={styles.title}>Filtered</h2>
            <FilterMovies/>
        </div>
    )
}
