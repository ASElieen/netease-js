import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import { getHotSingerListRequest,getSingerListRequest } from '../../api/request'

const initialState = {
    singerList:{},
    isLoading:true
}

export const getHotSingerList = createAsyncThunk('list/getHotSingerList',async ()=>{
    try {
        const resp = await getHotSingerListRequest(30)
        return resp.artists;
    } catch (error) {
        console.log('获取热门歌手失败'+error)
    }
})

export const getSingerListWithCategory = createAsyncThunk('list/getSingerListWithCategory',async (data)=>{
    const {categoryName,alpha,count,area} = data
    try {
        const resp = await getSingerListRequest(categoryName,alpha,count,area)
        return resp.artists
    } catch (error) {
        console.log('获取歌手列表(分类)失败'+error)
    }
})

const hotSingerSlice = createSlice({
  name: "hotSinger",
  initialState,
  extraReducers: {
    [getHotSingerList.pending]: (state) => {
      state.isLoading = true;
    },
    [getHotSingerList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.singerList = action.payload;
    },
    [getHotSingerList.rejected]: (state) => {
      state.isLoading = true;
    },

    //分类列表
    [getSingerListWithCategory.pending]: (state) => {
      state.isLoading = true;
    },
    [getSingerListWithCategory.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.singerList = action.payload;
    },
    [getSingerListWithCategory.rejected]: (state) => {
      state.isLoading = true;
    },
  },
});

export default hotSingerSlice.reducer