import React,{useState,useRef,useEffect} from "react";
import { getSongUrl,isEmptyObject } from "../../api/utils";
import { playList } from "../../api/mock";
import {
  changeFullScreen,
  togglePlayingState,
  changeCurrentIndex,
  changeCurrentSong,
  changePlayList,
  changeMode,
} from "../../store/Slices/playerSlice";
import MiniPlayer from "./MiniPlayer/MiniPlayer";
import NormalPlayer from "./NormalPlayer/NormalPlayer";
import { useDispatch, useSelector } from "react-redux";
const Player = () => {
  const dispatch = useDispatch();
  const audioRef = useRef()
  
  //先用mock的playList
  const {
    fullScreen,
    playing,
    currentIndex,
    mode,
    sequencePlayList,
  } = useSelector((store) => store.player);

  //目前播放时间
  const [currentTime,setCurrentTime] = useState(0)
  //歌曲总时长
  const [duration,setDuration] = useState(0)
  //歌曲播放进度
  let percent = isNaN(currentTime/duration) ?0:currentTime/duration

  //点击切换播放状态
  const clickPlaying = (e,state)=>{
    //阻止事件传播
       e.stopPropagation();
       dispatch(togglePlayingState(state));
  }

  useEffect(()=>{
    if(!currentSong) return
    dispatch(changeCurrentIndex(0))
    let current = playList[0]
    dispatch(changeCurrentSong(current))
    audioRef.current.src = getSongUrl(current.id)
    setTimeout(()=>{
      audioRef.current.play()
    })
    dispatch(togglePlayingState(true))
    setCurrentTime(0)
    setDuration(current.dt/1000 | 0) //时长
  },[])


  //监听playing变量实现播放暂停切换
  useEffect(()=>{
    playing? audioRef.current.play():audioRef.current.pause()
  },[playing])

  const updateCurrentTime = (e)=>{
    //e.target是整个audio标签
    setCurrentTime(e.target.currentTime)
  }

  //改变percent
  const onProgressChange = (currentPercent)=>{
    const newTime = currentPercent * duration
    setCurrentTime(newTime)
    audioRef.current.currentTime = newTime
    if(!playing){
      dispatch(togglePlayingState(true))
    }
  }

  //显示的mock数据(CD)
  const currentSong = {
    al: {
      picUrl:
        "https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg",
    },
    name: "木偶人",
    ar: [{ name: "薛之谦" }],
  };
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
        ></NormalPlayer>
      )}
      <audio ref={audioRef} onTimeUpdate={updateCurrentTime}></audio>
    </>
  );
};

export default Player;
