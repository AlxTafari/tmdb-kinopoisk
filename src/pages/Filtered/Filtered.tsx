import styles from './Filtered.module.scss'
import {FilterMovies} from "@/features/filter-movies/ui/FilterMovies.tsx";

export function Filtered() {
  return <div className={styles.title}>Filtered
      <FilterMovies />
  </div>
}
