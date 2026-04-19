import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseQueryWithZodValidation } from '@/shared/utils/baseQueryWithZodValidation'

export const baseApi = createApi({
    reducerPath: 'tmdbApi',
    baseQuery: baseQueryWithZodValidation(
        fetchBaseQuery({
            baseUrl: import.meta.env.VITE_TMDB_BASE_URL,
            prepareHeaders: headers => {
                headers.set('Authorization', `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`)
                return headers
            },
        })
    ),
    tagTypes: [],
    endpoints: () => ({}),
})