import Skeleton from 'react-loading-skeleton'
import styles from './MovieCardSkeleton.module.scss'

export function MovieCardSkeleton() {
    return (
        <div className={styles.card}>
            <div className={styles.poster}>
                <Skeleton height="100%" />
            </div>
            <div className={styles.info}>
                <Skeleton width="70%" />
                <Skeleton width={36} height={22} borderRadius={4} />
            </div>
        </div>
    )
}
