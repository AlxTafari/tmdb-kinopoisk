import {baseApi} from '@/app/baseApi'
import {type MoviesList, MoviesListSchema} from '@/entities/movie/movieSchema'

export type Category = 'popular' | 'top_rated' | 'upcoming' | 'now_playing'

type GetMoviesByCategoryArgs = {
  category: Category
  page?: number
}

type SearchParams = {
    query: string
    page: number
}

export const moviesApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getMoviesByCategory: build.query<MoviesList, GetMoviesByCategoryArgs>({
      query: ({ category, page = 1 }) => ({
        url: `/movie/${category}`,
        params: { page },
      }),
      extraOptions: { dataSchema: MoviesListSchema },
    }),
      searchMovie: build.query<MoviesList, SearchParams>({
          query: (params) => ({
              url: `/search/movie`,
              params
          }),
          extraOptions: { dataSchema: MoviesListSchema }
      })

  }),
})

export const { useGetMoviesByCategoryQuery, useSearchMovieQuery } = moviesApi
