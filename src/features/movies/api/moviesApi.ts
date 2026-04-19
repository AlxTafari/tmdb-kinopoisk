import { baseApi } from '@/app/baseApi'
import { MoviesListSchema, type MoviesList } from '@/entities/movie/movieSchema'

export type Category = 'popular' | 'top_rated' | 'upcoming' | 'now_playing'

type GetMoviesByCategoryArgs = {
  category: Category
  page?: number
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
  }),
})

export const { useGetMoviesByCategoryQuery } = moviesApi
