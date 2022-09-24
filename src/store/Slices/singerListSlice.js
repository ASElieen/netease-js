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
    const resp = await getHotSingerListRequest();
    return resp.artists;
  } catch (error) {
    console.log("获取热门歌手失败" + error);
  }
})

//下拉加载热门歌手列表
export const requestMoreHotSingers = createAsyncThunk('list/requestMoreSingers',async (_,thunkAPI)=>{
  thunkAPI.dispatch(addPageCount(20))
  const state = thunkAPI.getState()
  try {
    const resp = await getHotSingerListRequest(state.hotSinger.pageCount)
    return resp.artists
  } catch (error) {
    console.log('获取更多热门歌手失败'+error)
  }
})


//分类歌手列表
export const getSingerListWithCategory = createAsyncThunk('list/getSingerListWithCategory',async (data)=>{
    const {categoryName,alpha,area} = data
    try {
        const resp = await getSingerListRequest(categoryName,alpha,area)
        return resp.artists
    } catch (error) {
        console.log('获取歌手列表(分类)失败'+error)
    }
})

//下拉加载分类歌手列表
export const requestMoreSingersWithCategory = createAsyncThunk('list/requestMoreSingerListWithCategory',async (data,thunkAPI)=>{
  const { categoryName, alpha, area } = data;
  thunkAPI.dispatch(addPageCount(20))
  const state = thunkAPI.getState()
  try {
    const resp = await getSingerListRequest(
      categoryName,
      alpha,
      state.hotSinger.pageCount,
      area
    );
    return resp.artists;
  } catch (error) {
    console.log("获取更多歌手列表(分类)失败" + error);
  }
})



const hotSingerSlice = createSlice({
  name: "hotSinger",
  initialState,
  reducers: {
    addPageCount: (state, action) => {
      state.pageCount = action.payload;
    },
    clearPageCount: (state) => {
      state.pageCount = 0;
    },
    changePullUpLoading: (state, action) => {
      state.pullUpLoading = action.payload;
    }
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

    //下拉刷新部分
    [requestMoreHotSingers.pending]: (state) => {
      state.pullDownLoading = true;
    },
    [requestMoreHotSingers.fulfilled]: (state, action) => {
      state.pullDownLoading = false;
      state.singerList = action.payload;
    },
    [requestMoreHotSingers.rejected]: (state) => {
      state.pullDownLoading = true;
    },

    [requestMoreSingersWithCategory.pending]: (state) => {
      state.pullDownLoading = true;
    },
    [requestMoreSingersWithCategory.fulfilled]: (state, action) => {
      state.pullDownLoading = false;
      state.singerList = action.payload;
    },
    [requestMoreSingersWithCategory.rejected]: (state) => {
      state.pullDownLoading = true;
    },
  },
});
export const {
  addPageCount,
  clearPageCount,
  changePullUpLoading,
} = hotSingerSlice.actions;
export default hotSingerSlice.reducer