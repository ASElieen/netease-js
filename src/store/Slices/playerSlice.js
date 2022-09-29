import {createSlice} from '@reduxjs/toolkit'
import { playMode } from '../../api/config';

const initialState = {
  fullScreen: false, //是否全屏
  playing: false, //当前歌曲是否播放
  sequencePlayList: [], // 顺序列表 (因为之后会有随机模式，列表会乱序，因从拿这个保存顺序列表)
  playList: [],
  mode: playMode.sequence, // 播放模式 顺序0 循环1 随机2
  currentIndex: -1, // 当前歌曲在播放列表的索引位置
  showPlayList: false, // 是否展示播放列表
  currentSong: {},
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    changeFullScreen: (state, action) => {
      const fullScreenState = action.payload;
      state.fullScreen = fullScreenState;
    },
    togglePlayingState: (state, action) => {
      const playingState = action.payload;
      state.playing = playingState;
    },
    changeCurrentIndex: (state, action) => {
      state.currentIndex = action.payload;
    },
    changeCurrentSong: (state, action) => {
      state.currentSong = action.payload;
    },
    changePlayList: (state, action) => {
      state.playList = action.payload;
    },
    changeMode: (state, action) => {
      state.mode = action.payload;
    },
    changeSequencePlaylist: (state, action) => {
      state.sequencePlayList = action.payload;
    },
    changeShowPlayList:(state,action)=>{
      state.showPlayList = action.payload
    },
  },
});

export const {
  changeFullScreen,
  togglePlayingState,
  changeCurrentIndex,
  changeCurrentSong,
  changePlayList,
  changeMode,
  changeSequencePlaylist,
  changeShowPlayList
} = playerSlice.actions;
export default playerSlice.reducer;