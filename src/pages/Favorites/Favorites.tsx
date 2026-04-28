import styles from './Favorites.module.scss'
import {FavoritesList} from "@/features/favorites/ui/FavoriteList.tsx";

export function Favorites() {

    return (
        <div>
            <h2 className={styles.title}>Избранное</h2>
            <FavoritesList />
        </div>
    )
}
