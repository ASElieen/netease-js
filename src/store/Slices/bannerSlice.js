import { getBannerRequest } from "../../api/request";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  bannerImg: [],
  isLoading: true,
};

export const getBannerImgs = createAsyncThunk(
  "banner/getBannerImgs",
  async () => {
    try {
      const resp = await getBannerRequest();
      return resp.banners;
    } catch (error) {
      console.log("轮播图数据传输错误" + error);
    }
  }
);

const bannerSlice = createSlice({
    name:'banner',
    initialState,
    extraReducers:{
        [getBannerImgs.pending]:(state)=>{
            state.isLoading = true
        },
        [getBannerImgs.fulfilled]:(state,action)=>{
            state.isLoading = false;
            state.bannerImg = action.payload
        },
        [getBannerImgs.rejected]:(state)=>{
            state.isLoading = true
        }
    }
})

export default bannerSlice.reducer