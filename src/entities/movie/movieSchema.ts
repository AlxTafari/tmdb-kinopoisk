import { z } from 'zod'

export const MovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  overview: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  vote_average: z.number(),
  vote_count: z.number(),
  release_date: z.string(),
  genre_ids: z.array(z.number()),
})

export const MoviesListSchema = z.object({
  page: z.number(),
  results: z.array(MovieSchema),
  total_pages: z.number(),
  total_results: z.number(),
})

export type Movie = z.infer<typeof MovieSchema>
export type MoviesList = z.infer<typeof MoviesListSchema>
export type CardMovie = Pick<Movie, 'id' | 'title' | 'poster_path' | 'vote_average'>

// Movie Details

export const GenreSchema = z.object({
  id: z.number(),
  name: z.string(),
})

export const MovieDetailsSchema = z.object({
  id: z.number(),
  title: z.string(),
  overview: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  vote_average: z.number(),
  vote_count: z.number(),
  release_date: z.string(),
  genres: z.array(GenreSchema),
  runtime: z.number().nullable(),
  tagline: z.string().nullable(),
})

export type Genre = z.infer<typeof GenreSchema>
export type MovieDetails = z.infer<typeof MovieDetailsSchema>

// Credits

export const CastMemberSchema = z.object({
  id: z.number(),
  name: z.string(),
  character: z.string(),
  profile_path: z.string().nullable(),
  order: z.number(),
})

export const CreditsSchema = z.object({
  id: z.number(),
  cast: z.array(CastMemberSchema),
})

export type CastMember = z.infer<typeof CastMemberSchema>
export type Credits = z.infer<typeof CreditsSchema>
