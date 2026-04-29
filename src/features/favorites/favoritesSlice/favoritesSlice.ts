import {createSlice} from "@reduxjs/toolkit"
import type {CardMovie} from "@/entities/movie/movieSchema"

export const favoriteSlice = createSlice({
    name: "favorite",
    initialState: {
        movies: (JSON.parse(localStorage.getItem('favorites') || '[]') as unknown[])
            .filter((m): m is CardMovie => typeof m === 'object' && m !== null && 'id' in m),
    },
    reducers: (create) => ({
        addFavorite: create.reducer<CardMovie>((state, action) => {
            state.movies.push(action.payload)
        }),
        removeFavorite: create.reducer<number>((state, action) => {
            state.movies = state.movies.filter(m => m.id !== action.payload)
        }),
    }),
})

export const {addFavorite, removeFavorite} = favoriteSlice.actions
export const favoritesReducer = favoriteSlice.reducer
