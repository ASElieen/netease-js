import { getRecommendListRequest } from "../../api/request";
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {
    lists:[],
    isLoading:true
}

export const getLists = createAsyncThunk('list/getLists',async ()=>{
    try {
        const resp = await getRecommendListRequest()
        return resp.result
    } catch (error) {
        console.log('推荐页列表发生错误'+error)
    }
})

const listSlice = createSlice({
    name:'list',
    initialState,
    extraReducers:{
        [getLists.pending]:(state)=>{
            state.isLoading = true
        },
        [getLists.fulfilled]:(state,action)=>{
            state.isLoading = false
            state.lists = action.payload
        },
        [getLists.rejected]:(state)=>{
            state.isLoading = true
        }
    }
})

export default listSlice.reducer