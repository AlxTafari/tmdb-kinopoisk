import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { MovieCardSkeleton } from '@/entities/movie/ui/MovieCardSkeleton/MovieCardSkeleton'
import styles from './MovieDetail.module.scss'

export function MovieDetailSkeleton() {
    return (
        <div className={styles.wrapper}>
            <section className={styles.hero}>
                {/* Скелетоны на тёмном фоне — нужны светлее, чем глобальная тема */}
                <SkeletonTheme baseColor="#2a3a4a" highlightColor="#3d5068">
                    <div className={styles.info}>
                        <div style={{ width: 260, aspectRatio: '2/3', flexShrink: 0, alignSelf: 'flex-start', borderRadius: 8, overflow: 'hidden' }}>
                            <Skeleton height="100%" />
                        </div>
                        <div className={styles.details}>
                            <Skeleton width={380} height={38} />
                            <Skeleton width={220} height={18} />
                            <div style={{ display: 'flex', gap: 16 }}>
                                <Skeleton width={60} />
                                <Skeleton width={70} />
                                <Skeleton width={60} height={26} borderRadius={4} />
                            </div>
                            <div style={{ display: 'flex', gap: 8 }}>
                                <Skeleton width={80} height={28} borderRadius={20} />
                                <Skeleton width={90} height={28} borderRadius={20} />
                                <Skeleton width={70} height={28} borderRadius={20} />
                            </div>
                            <Skeleton count={4} style={{ marginBottom: 6 }} />
                        </div>
                    </div>
                </SkeletonTheme>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Актёры</h2>
                <div className={styles.castGrid}>
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className={styles.castCard}>
                            <div style={{ aspectRatio: '2/3', overflow: 'hidden', borderRadius: 8 }}>
                                <Skeleton height="100%" />
                            </div>
                            <Skeleton width="80%" style={{ marginTop: 8 }} />
                            <Skeleton width="60%" />
                        </div>
                    ))}
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Похожие фильмы</h2>
                <div className={styles.similarGrid}>
                    {Array.from({ length: 6 }).map((_, i) => (
                        <MovieCardSkeleton key={i} />
                    ))}
                </div>
            </section>
        </div>
    )
}
