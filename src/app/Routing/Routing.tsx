import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Path } from '@/shared/constants/paths'
import { Layout } from '@/widgets/Layout/Layout'

const Home       = lazy(() => import('@/pages/Home/Home').then(m => ({ default: m.Home })))
const Category   = lazy(() => import('@/pages/Category/Category').then(m => ({ default: m.Category })))
const Filtered   = lazy(() => import('@/pages/Filtered/Filtered').then(m => ({ default: m.Filtered })))
const Search     = lazy(() => import('@/pages/Search/Search').then(m => ({ default: m.Search })))
const Favorites  = lazy(() => import('@/pages/Favorites/Favorites').then(m => ({ default: m.Favorites })))
const MovieDetail = lazy(() => import('@/pages/MovieDetail/MovieDetail').then(m => ({ default: m.MovieDetail })))
const ActorDetail = lazy(() => import('@/pages/ActorDetail/ActorDetail').then(m => ({ default: m.ActorDetail })))
const NotFound   = lazy(() => import('@/pages/NotFound/NotFound').then(m => ({ default: m.NotFound })))

export function Routing() {
    return (
        <Suspense fallback={null}>
            <Routes>
                <Route element={<Layout/>}>
                    <Route path={Path.Main} element={<Home/>}/>
                    {/*редирект на дефолтную категорию*/}
                    <Route path="/category" element={<Navigate to={Path.CategoryDefault} replace/>}/>
                    <Route path={Path.Category} element={<Category/>}/>
                    <Route path={Path.Filtered} element={<Filtered/>}/>
                    <Route path={Path.Search} element={<Search/>}/>
                    <Route path={Path.Favorites} element={<Favorites/>}/>
                    <Route path={Path.MovieDetail} element={<MovieDetail/>}/>
                    <Route path={Path.ActorDetail} element={<ActorDetail/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Route>
            </Routes>
        </Suspense>
    )
}
