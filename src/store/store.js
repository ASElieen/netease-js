import {configureStore} from '@reduxjs/toolkit'
import bannerReducer from './Slices/bannerSlice'
import listReducer from './Slices/listSlice'

export const store = configureStore({
    reducer:{
        banner:bannerReducer,
        list:listReducer
    }
})