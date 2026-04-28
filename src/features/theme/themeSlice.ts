import {createSlice} from '@reduxjs/toolkit'

type Theme = 'dark' | 'light'

const getInitialTheme = (): Theme => {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark' || saved === 'light') return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const initialTheme = getInitialTheme()
// применяем тему до первого рендера React
document.documentElement.setAttribute('data-theme', initialTheme)

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {theme: initialTheme},
    reducers: create => ({
        toggleTheme: create.reducer(state => {
            state.theme = state.theme === 'dark' ? 'light' : 'dark'
        }),
    }),
})

export const {toggleTheme} = themeSlice.actions
export const themeReducer = themeSlice.reducer
