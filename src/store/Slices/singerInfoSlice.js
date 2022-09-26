import { getSingerInfoRequest } from "../../api/request";
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {
    artist:{},
    isLoading:true
}

export const getSingerInfo = createAsyncThunk('info/getSingerInfo', async (id)=>{
    try {
        const resp = await getSingerInfoRequest(id)
        return resp
    } catch (error) {
        console.log('获取歌手详情失败'+error)
    }
})

const singerInfoSlice = createSlice({
    name:'singerInfo',
    initialState,
    extraReducers:{
        [getSingerInfo.pending]:(state)=>{
            state.isLoading = true
        },
        [getSingerInfo.fulfilled]:(state,action)=>{
            state.isLoading = false;
            state.artist = action.payload
        },
        [getSingerInfo.rejected]:(state)=>{
            state.isLoading = true
        }
    }
})

export default singerInfoSlice.reducer