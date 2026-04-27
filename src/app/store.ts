import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {baseApi} from "@/app/baseApi.ts";
import {favoritesReducer} from "@/features/favorites/favoritesSlice/favoritesSlice.ts";

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        favorites: favoritesReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
})

store.subscribe(() => {
    const movies = store.getState().favorites.movies
    localStorage.setItem('favorites', JSON.stringify(movies))
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


setupListeners(store.dispatch)
