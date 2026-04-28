import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {baseApi} from "@/app/baseApi.ts";
import {favoritesReducer} from "@/features/favorites/favoritesSlice/favoritesSlice.ts";
import {themeReducer} from "@/features/theme/themeSlice.ts";

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        favorites: favoritesReducer,
        theme: themeReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
})

store.subscribe(() => {
    const { favorites, theme } = store.getState()
    localStorage.setItem('favorites', JSON.stringify(favorites.movies))
    localStorage.setItem('theme', theme.theme)
    document.documentElement.setAttribute('data-theme', theme.theme)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


setupListeners(store.dispatch)
