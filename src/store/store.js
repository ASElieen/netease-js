import {configureStore} from '@reduxjs/toolkit'
import bannerReducer from './Slices/bannerSlice'
import listReducer from './Slices/listSlice'
import hotSingerReducer from './Slices/singerListSlice'
import rankListReducer from './Slices/rankSlice'
import albumListReducer from './Slices/albumSlice'
import singerInfoReducer from './Slices/singerInfoSlice'
import playerReducer from './Slices/playerSlice'

export const store = configureStore({
    reducer:{
        banner:bannerReducer,
        list:listReducer,
        hotSinger:hotSingerReducer,
        rankList:rankListReducer,
        albumList:albumListReducer,
        singerInfo:singerInfoReducer,
        player:playerReducer
    }
})