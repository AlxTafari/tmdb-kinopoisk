import styles from './Favorites.module.scss'
import {FavoritesList} from "@/features/favorites/ui/FavoriteList.tsx";

export function Favorites() {

    return (
        <div>
            <h2 className={styles.title}>Favorites</h2>
            <FavoritesList />
        </div>
    )
}
