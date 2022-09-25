import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import { getRankListRequest } from '../../api/request'

const initialState = {
    rankList:[],
    isLoading:true
}

export const getRankList = createAsyncThunk('list/getRankList',async ()=>{
    try {
        const resp = await getRankListRequest();
        return resp.list
    } catch (error) {
        console.log('获取排行榜单失败'+error)
    }
})

const rankSlice = createSlice({
    name:'rank',
    initialState,
    extraReducers:{
        [getRankList.pending]:(state)=>{
            state.isLoading = true
        },
        [getRankList.fulfilled]:(state,action)=>{
            state.isLoading = false;
            state.rankList = action.payload
        },
        [getRankList.rejected]:(state)=>{
            state.isLoading = true
        }
    }
})

export default rankSlice.reducer