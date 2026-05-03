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

// store.subscribe fires on every dispatch, including RTK Query internals.
// Compare references to avoid redundant localStorage writes.
const prev = { favorites: store.getState().favorites, theme: store.getState().theme }
store.subscribe(() => {
    const state = store.getState()
    if (state.favorites !== prev.favorites) {
        localStorage.setItem('favorites', JSON.stringify(state.favorites.movies))
        prev.favorites = state.favorites
    }
    if (state.theme !== prev.theme) {
        localStorage.setItem('theme', state.theme.theme)
        document.documentElement.setAttribute('data-theme', state.theme.theme)
        prev.theme = state.theme
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


setupListeners(store.dispatch)
