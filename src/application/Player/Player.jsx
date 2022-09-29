import React,{useState,useRef,useEffect} from "react";
import {
  getSongUrl,
  isEmptyObject,
  shuffle,
findIndex} from "../../api/utils";
import {
  changeFullScreen,
  togglePlayingState,
  changeCurrentIndex,
  changeCurrentSong,
  changePlayList,
  changeMode,
  changeShowPlayList
} from "../../store/Slices/playerSlice";
import { playMode } from "../../api/config";
import MiniPlayer from "./MiniPlayer/MiniPlayer";
import NormalPlayer from "./NormalPlayer/NormalPlayer";
import PlayList from "./PlayList/PlayList";
import { useDispatch, useSelector } from "react-redux";
const Player = () => {
  const dispatch = useDispatch();
  const audioRef = useRef();

  //先用mock的playList
  const { fullScreen, playing, currentIndex, mode, sequencePlayList,currentSong,playList } =
    useSelector((store) => store.player);

  //目前播放时间
  const [currentTime, setCurrentTime] = useState(0);
  //歌曲总时长
  const [duration, setDuration] = useState(0);
  //记录当前歌曲 下次渲染时确认是否为一首歌
  const [preSong, setPreSong] = useState({});

  const songReady = useRef(true)
  //歌曲播放进度
  let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;

  //点击切换播放状态
  const clickPlaying = (e, state) => {
    //阻止事件传播
    e.stopPropagation();
    dispatch(togglePlayingState(state));
  };

  //mock index
  useEffect(() => {
    dispatch(changeCurrentIndex(0));
  }, []);

  useEffect(() => {
    if (
      !playList.length ||
      currentIndex === -1 ||
      !playList[currentIndex] ||
      playList[currentIndex].id === preSong.id ||
      !songReady.current
    )
      return;
    let current = playList[currentIndex];
    dispatch(changeCurrentSong(current));
    setPreSong(current);
    songReady.current = false; // 把标志位置为 false, 表示现在新的资源没有缓冲完成，不能切歌
    audioRef.current.src = getSongUrl(current.id);

    setTimeout(() => {
      audioRef.current.play().then(() => {
        songReady.current = true;
      });
    });
    dispatch(togglePlayingState(true));
    setCurrentTime(0); //从头播放
    setDuration((current.dt / 1000) | 0); //时长
  }, [playList,currentIndex]);

  //监听playing变量实现播放暂停切换
  useEffect(() => {
    playing ? audioRef.current.play() : audioRef.current.pause();
  }, [playing]);

  const updateCurrentTime = (e) => {
    //e.target是整个audio标签
    setCurrentTime(e.target.currentTime);
  };

  //改变percent
  const onProgressChange = (currentPercent) => {
    const newTime = currentPercent * duration;
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
    if (!playing) {
      dispatch(togglePlayingState(true));
    }
  };


  //----------------------------歌曲切换部分逻辑-------------------------
  const handleLoop = () => {
    audioRef.current.currentTime = 0;
    dispatch(togglePlayingState(true));
    audioRef.current.play();
  };

  const handlePrev = () => {
    //只有一首歌单曲循环
    if (playList.length === 1) {
      handleLoop();
      return;
    }
    let index = currentIndex - 1;
    if (index < 0) index = playList.length - 1;
    if (!playing) dispatch(togglePlayingState(true));
    dispatch(changeCurrentIndex(index));
  };

  const handleNext = () => {
    //只有一首歌单曲循环
    if (playList.length === 1) {
      handleLoop();
      return;
    }
    let index = currentIndex + 1;
    if (index === playList.length) index = 0;
    if (!playing) dispatch(togglePlayingState(true));
    dispatch(changeCurrentIndex(index));
  };

  const handleError = ()=>{
    songReady.current = true
    console.log('播放出错')
  }

  //-------------------播放模式切换-----------------------
  const changePlayMode = ()=>{
    let newMode = (mode+1)%3
    if(newMode===0){
      //顺序模式
      dispatch(changePlayList(sequencePlayList))
      let index = findIndex(currentSong,sequencePlayList)
      dispatch(changeCurrentIndex(index))
    }else if(newMode === 1){
      //单曲循环
      dispatch(changePlayList(sequencePlayList))
    }else if(newMode === 2){
      //随机播放
      let newList = shuffle(sequencePlayList)
      let index = findIndex(currentSong,newList)
      dispatch(changePlayList(newList))
      dispatch(changeCurrentIndex(index))
    }
    dispatch(changeMode(newMode))
  }

  //歌曲播放完之后的处理
  const handleEnd = ()=>{
    if (mode === playMode.loop) {
      handleLoop();
    } else {
      handleNext();
    }
  }

  return (
    <>
      {isEmptyObject(currentSong) ? null : (
        <MiniPlayer
          song={currentSong}
          fullScreen={fullScreen}
          playing={playing}
          duration={duration} //总时长
          currentTime={currentTime} //播放时间
          percent={percent} //进度
          changeFullScreen={changeFullScreen}
          clickPlaying={clickPlaying}
          changeShowPlayList={changeShowPlayList}
        ></MiniPlayer>
      )}
      {isEmptyObject(currentSong) ? null : (
        <NormalPlayer
          song={currentSong}
          fullScreen={fullScreen}
          changeFullScreen={changeFullScreen}
          playing={playing}
          duration={duration} //总时长
          percent={percent} //进度
          clickPlaying={clickPlaying}
          currentTime={currentTime} //当前播放时间
          onProgressChange={onProgressChange} //进度条改变逻辑
          handlePrev={handlePrev}
          handleNext={handleNext}
          changePlayMode={changePlayMode} //播放模式切换
          mode={mode}
          changeShowPlayList={changeShowPlayList}
        ></NormalPlayer>
      )}
      <audio
        ref={audioRef}
        onTimeUpdate={updateCurrentTime}
        onEnded={handleEnd}
        onError={handleError}
      ></audio>
      <PlayList changePlayMode={changePlayMode}/>
    </>
  );
};

export default Player;
