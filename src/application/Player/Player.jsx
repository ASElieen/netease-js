import React,{useState,useRef,useEffect} from "react";
import {
  getSongUrl,
  isEmptyObject,
  getRandomInt,
  shuffle,
findIndex} from "../../api/utils";
import { playList } from "../../api/mock";
import {
  changeFullScreen,
  togglePlayingState,
  changeCurrentIndex,
  changeCurrentSong,
  changePlayList,
  changeMode,
} from "../../store/Slices/playerSlice";
import { playMode } from "../../api/config";
import MiniPlayer from "./MiniPlayer/MiniPlayer";
import NormalPlayer from "./NormalPlayer/NormalPlayer";
import { useDispatch, useSelector } from "react-redux";
const Player = () => {
  const dispatch = useDispatch();
  const audioRef = useRef();

  //先用mock的playList
  const { fullScreen, playing, currentIndex, mode, sequencePlayList } =
    useSelector((store) => store.player);

  //目前播放时间
  const [currentTime, setCurrentTime] = useState(0);
  //歌曲总时长
  const [duration, setDuration] = useState(0);
  //记录当前歌曲 下次渲染时确认是否为一首歌
  const [preSong, setPreSong] = useState({});
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
    if (!playList.length || currentIndex === -1 || !playList[currentIndex] || playList[currentIndex].id === preSong.id) return;
    // if (!currentSong) return;
    let current = playList[currentIndex];
    dispatch(changeCurrentSong(current));
    setPreSong(current)
    audioRef.current.src = getSongUrl(current.id);
    setTimeout(() => {
      audioRef.current.play();
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

  //显示的mock数据(CD)
  const currentSong = {
    al: {
      picUrl:
        "https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg",
    },
    name: "木偶人",
    ar: [{ name: "薛之谦" }],
  };

  //----------------------------切换部分逻辑-------------------
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
        ></NormalPlayer>
      )}
      <audio ref={audioRef} onTimeUpdate={updateCurrentTime} onEnded={handleEnd}></audio>
    </>
  );
};

export default Player;
