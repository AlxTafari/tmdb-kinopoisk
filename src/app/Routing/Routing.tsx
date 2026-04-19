import {Routes, Route, Navigate} from 'react-router-dom'
import {Path} from '@/shared/constants/paths'
import {Layout} from '@/widgets/Layout/Layout'
import {Home} from '@/pages/Home/Home'
import {Category} from '@/pages/Category/Category'
import {Filtered} from '@/pages/Filtered/Filtered'
import {Search} from '@/pages/Search/Search'
import {Favorites} from '@/pages/Favorites/Favorites'
import {MovieDetail} from '@/pages/MovieDetail/MovieDetail'
import {NotFound} from '@/pages/NotFound/NotFound'

export function Routing() {
    return (
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
                <Route path="*" element={<NotFound/>}/>
            </Route>
        </Routes>
    )
}
