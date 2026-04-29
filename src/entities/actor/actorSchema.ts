import {z} from 'zod'

export const ActorSchema = z.object({
    id: z.number(),
    name: z.string(),
    biography: z.string(),
    birthday: z.string().nullable(),
    place_of_birth: z.string().nullable(),
    profile_path: z.string().nullable(),
    known_for_department: z.string(),
})

export const ActorMovieSchema = z.object({
    id: z.number(),
    title: z.string(),
    poster_path: z.string().nullable(),
    vote_average: z.number(),
    character: z.string(),
    release_date: z.string(),
})

export const ActorMovieCreditsSchema = z.object({
    id: z.number(),
    cast: z.array(ActorMovieSchema),
})

export type Actor = z.infer<typeof ActorSchema>
export type ActorMovie = z.infer<typeof ActorMovieSchema>
export type ActorMovieCredits = z.infer<typeof ActorMovieCreditsSchema>
