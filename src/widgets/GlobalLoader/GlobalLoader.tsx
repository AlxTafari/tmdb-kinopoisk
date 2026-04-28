import { useGlobalLoading } from '@/shared/hooks'
import styles from './GlobalLoader.module.scss'

export function GlobalLoader() {
    const isLoading = useGlobalLoading()

    if (!isLoading) return null

    return (
        <div className={styles.track}>
            <div className={styles.bar} />
        </div>
    )
}
