import {baseApi} from '@/app/baseApi'
import {
    CreditsSchema,
    MovieDetailsSchema,
    MoviesListSchema,
} from '@/entities/movie/movieSchema'
import type {Credits, MovieDetails, MoviesList} from '@/entities/movie/movieSchema'

export const movieDetailApi = baseApi.injectEndpoints({
    endpoints: build => ({
        getMovieDetails: build.query<MovieDetails, number>({
            query: (id) => ({url: `/movie/${id}`}),
            extraOptions: {dataSchema: MovieDetailsSchema},
        }),
        getMovieCredits: build.query<Credits, number>({
            query: (id) => ({url: `/movie/${id}/credits`}),
            extraOptions: {dataSchema: CreditsSchema},
        }),
        getSimilarMovies: build.query<MoviesList, number>({
            query: (id) => ({url: `/movie/${id}/similar`}),
            extraOptions: {dataSchema: MoviesListSchema},
        }),
    }),
})

export const {
    useGetMovieDetailsQuery,
    useGetMovieCreditsQuery,
    useGetSimilarMoviesQuery,
} = movieDetailApi
