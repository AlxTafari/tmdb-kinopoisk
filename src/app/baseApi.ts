import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// initialize an empty api service that we'll inject endpoints into later as needed
export const baseApi = createApi({
    reducerPath: 'tmdbApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_TMDB_BASE_URL,
        headers: {
            'API-KEY': import.meta.env.VITE_TMDB_API_KEY,
        },
        prepareHeaders: headers => {
            headers.set('Authorization', `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`)
            return headers
        },
    }),
    tagTypes: [],


    endpoints: () => ({}),
})