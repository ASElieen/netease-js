import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import { getHotSingerListRequest,getSingerListRequest } from '../../api/request'

const initialState = {
    singerList:{},
    isLoading:true,
    pullDownLoading:false,
    pullUpLoading:false,
    pageCount:0
}
//上拉加载相当于重新获取一遍 下拉加载通过pageCount添加分页数

//初次加载热门歌手列表
export const getHotSingerList = createAsyncThunk('list/getHotSingerList',async ()=>{
    try {
        const resp = await getHotSingerListRequest(initialState.pageCount)
        return resp.artists;
    } catch (error) {
        console.log('获取热门歌手失败'+error)
    }
})



export const getSingerListWithCategory = createAsyncThunk('list/getSingerListWithCategory',async (data)=>{
    const {categoryName,alpha,area} = data
    try {
        const resp = await getSingerListRequest(categoryName,alpha,initialState.pageCount,area)
        return resp.artists
    } catch (error) {
        console.log('获取歌手列表(分类)失败'+error)
    }
})



const hotSingerSlice = createSlice({
  name: "hotSinger",
  initialState,
  reducers: {
    addPageCount: (state) => {
      state.pageCount += 20;
    },
    clearPageCount: (state) => {
      state.pageCount = 0;
    },
    changePullUpLoading: (state) => {
      state.pullUpLoading = !state.pullUpLoading;
    },
    changePullDownLoading: (state) => {
      state.pullDownLoading = !state.pullDownLoading;
    },
  },
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
export const {
  addPageCount,
  clearPageCount,
  changePullUpLoading,
  changePullDownLoading,
} = hotSingerSlice.actions;
export default hotSingerSlice.reducer