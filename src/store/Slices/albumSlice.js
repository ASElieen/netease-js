import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import { getAlbumDetailRequest } from '../../api/request'

const initialState = {
    currentAlbum:{},
    isLoading:true
}

export const getAlbumDetail = createAsyncThunk('album/getAlbumDetail',async (id)=>{
    try {
        const resp = await getAlbumDetailRequest(id);
        console.log(resp.playlist)
        return resp.playlist
    } catch (error) {
        console.log("错误:加载歌单详情失败" + error);
    }
})

const albumSlice = createSlice({
  name: "albumList",
  initialState,
  extraReducers: {
    [getAlbumDetail.pending]: (state) => {
      state.isLoading = true;
    },
    [getAlbumDetail.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.currentAlbum = action.payload;
    },
    [getAlbumDetail.rejected]: (state) => {
      state.isLoading = true;
    },
  },
});

export default albumSlice.reducer;