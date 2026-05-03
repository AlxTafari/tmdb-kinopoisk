import styles from './Filtered.module.scss'
import {FilterMovies} from "@/features/filter-movies/ui/FilterMovies.tsx";

export function Filtered() {
    return (
        <div>
            <h2 className={styles.title}>Filtered</h2>
            <FilterMovies/>
        </div>
    )
}
