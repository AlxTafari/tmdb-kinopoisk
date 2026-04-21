import {baseApi} from "@/app/baseApi.ts";
import {type MoviesList, MoviesListSchema} from "@/entities/movie/movieSchema.ts";
import {type GenresList, GenresListSchema} from "@/features/filter-movies/api/genreSchema.ts";

export type SortBy = 'popularity.desc' | 'popularity.asc' | 'vote_average.desc' | 'vote_average.asc' | 'release_date.desc' | 'release_date.asc'

type DiscoverParams = {
    sort_by: SortBy
    with_genres?: string
    'vote_average.gte'?: number
    'vote_average.lte'?: number
    page: number
}

export const discoverApi = baseApi.injectEndpoints({
    endpoints: build => ({
        getFilterMovies: build.query<MoviesList, DiscoverParams>({
            query: (params) => ({
                url: '/discover/movie',
                params,
            }),
            extraOptions: { dataSchema: MoviesListSchema },
        }),
        getGenresMovies: build.query<GenresList, void>({
            query: () => ({
                url: '/genre/movie/list',
            }),
            extraOptions: { dataSchema: GenresListSchema },
        }),
    }),
})

export const { useGetFilterMoviesQuery, useGetGenresMoviesQuery } = discoverApi
