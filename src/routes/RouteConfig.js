import {Routes,Route,Navigate} from 'react-router-dom'
import { lazy } from 'react'

//组件
const Home = lazy(() => import("../application/Home/Home.jsx"));
const Singers = lazy(()=>import('../application/Singer/Singers.jsx'))
const Recommend = lazy(()=>import('../application/Recommend/Recommend.jsx'))
const Rank = lazy(()=>import('../application/Rank/Rank.jsx'))
const Album = lazy(()=>import('../application/Album/Album'))
const SingerInfo = lazy(()=>import('../application/SingerInfo/SingerInfo'))
const Search = lazy(()=>import('../components/Search/Search'))

export const RouteConfig = ()=>{
    return (
        <Routes>
            <Route path='/' element={<Home/>}>
                <Route path='/' element={<Navigate to='/recommend'/>}/>
                <Route path='/rank' element={<Rank/>}>
                    <Route path='/rank/:id' element={<Album/>}/>
                </Route>
                <Route path='/recommend' element={<Recommend/>}>
                    <Route path='/recommend/:id' element={<Album/>}/>
                </Route>
                <Route path='/singers' element={<Singers/>}>
                    <Route path='/singers/:id' element={<SingerInfo/>}/>
                </Route>
                <Route path='/search' element={<Search/>}></Route>
            </Route>
        </Routes>
    )
}
