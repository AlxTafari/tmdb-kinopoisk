import {useNavigate, useParams} from 'react-router-dom'
import styles from './ActorDetail.module.scss'
import {useGetActorDetailsQuery, useGetActorMovieCreditsQuery} from '@/features/actor-detail/api/actorApi'
import {TMDB_IMAGE_BASE_URL} from '@/shared/constants/tmdb'
import {MovieCard} from '@/entities/movie/ui/MovieCard/MovieCard'
import {ActorDetailSkeleton} from './ActorDetailSkeleton'

const PHOTO_PLACEHOLDER = 'https://placehold.co/240x360?text=No+Photo'

export function ActorDetail() {
    const {id} = useParams()
    const navigate = useNavigate()
    const actorId = Number(id)

    const {data: actor, isLoading} = useGetActorDetailsQuery(actorId)
    const {data: credits} = useGetActorMovieCreditsQuery(actorId)

    if (isLoading) return <ActorDetailSkeleton />
    if (!actor) return null

    const photoUrl = actor.profile_path
        ? `${TMDB_IMAGE_BASE_URL}${actor.profile_path}`
        : PHOTO_PLACEHOLDER

    const filmography = credits?.cast
        .filter(m => m.poster_path && m.release_date)
        .sort((a, b) => b.release_date.localeCompare(a.release_date))
        .slice(0, 18) ?? []

    return (
        <div className={styles.wrapper}>
            <button className={styles.back} onClick={() => navigate(-1)}>← Назад</button>

            <div className={styles.profile}>
                <img src={photoUrl} alt={actor.name} className={styles.photo}/>
                <div className={styles.info}>
                    <h1 className={styles.name}>{actor.name}</h1>
                    <p className={styles.department}>{actor.known_for_department}</p>
                    <div className={styles.meta}>
                        {actor.birthday && (
                            <span><b>Дата рождения:</b> {actor.birthday}</span>
                        )}
                        {actor.place_of_birth && (
                            <span><b>Место рождения:</b> {actor.place_of_birth}</span>
                        )}
                    </div>
                    {actor.biography && (
                        <p className={styles.biography}>{actor.biography}</p>
                    )}
                </div>
            </div>

            {filmography.length > 0 && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Фильмография</h2>
                    <div className={styles.grid}>
                        {filmography.map(m => <MovieCard key={m.id} movie={m}/>)}
                    </div>
                </section>
            )}
        </div>
    )
}
