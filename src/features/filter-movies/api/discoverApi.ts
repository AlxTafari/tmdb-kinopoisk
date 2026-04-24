import {baseApi} from "@/app/baseApi.ts";
import {type MoviesList, MoviesListSchema} from "@/entities/movie/movieSchema.ts";
import {type GenresList, GenresListSchema} from "@/features/filter-movies/api/genreSchema.ts";

export const SORT_BY = {
    PopularityDesc: 'popularity.desc',
    PopularityAsc: 'popularity.asc',
    VoteDesc: 'vote_average.desc',
    VoteAsc: 'vote_average.asc',
    ReleaseDateDesc: 'release_date.desc',
    ReleaseDateAsc: 'release_date.asc',
    TitleAsc: 'original_title.asc',
    TitleDesc: 'original_title.desc',
} as const

export type SortBy = typeof SORT_BY[keyof typeof SORT_BY]

type DiscoverParams = {
    sort_by: SortBy
    with_genres?: string
    'vote_average.gte'?: number
    'vote_average.lte'?: number
    page: number
}

export const SORT_BY_LABELS: Record<SortBy, string> = {
    'popularity.desc': 'Popularity ↓',
    'popularity.asc': 'Popularity ↑',
    'vote_average.desc': 'Rating ↓',
    'vote_average.asc': 'Rating ↑',
    'release_date.desc': 'Release Date ↓',
    'release_date.asc': 'Release Date ↑',
    'original_title.asc': 'Title A → Z',
    'original_title.desc': 'Title Z → A',
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
