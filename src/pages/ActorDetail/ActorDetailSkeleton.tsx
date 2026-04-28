import Skeleton from 'react-loading-skeleton'
import { MovieCardSkeleton } from '@/entities/movie/ui/MovieCardSkeleton/MovieCardSkeleton'
import styles from './ActorDetail.module.scss'

export function ActorDetailSkeleton() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.profile}>
                <div style={{ width: 240, aspectRatio: '2/3', flexShrink: 0, alignSelf: 'flex-start', borderRadius: 8, overflow: 'hidden' }}>
                    <Skeleton height="100%" />
                </div>
                <div className={styles.info}>
                    <Skeleton width={300} height={38} />
                    <Skeleton width={160} height={20} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <Skeleton width={240} />
                        <Skeleton width={280} />
                    </div>
                    <Skeleton count={5} style={{ marginBottom: 6 }} />
                </div>
            </div>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Фильмография</h2>
                <div className={styles.grid}>
                    {Array.from({ length: 12 }).map((_, i) => (
                        <MovieCardSkeleton key={i} />
                    ))}
                </div>
            </section>
        </div>
    )
}
