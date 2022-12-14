import React, { useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { getName, prefixStyle, formatPlayTime } from "../../../api/utils";
import animations from "create-keyframe-animation";
import { MdReplay } from "react-icons/md";
import { BiRefresh } from "react-icons/bi";
import { FaRandom } from "react-icons/fa";
import { IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";
import { IoMdArrowBack } from "react-icons/io";
import { AiOutlinePauseCircle } from "react-icons/ai";
import { BsMusicNoteList, BsFillPlayFill } from "react-icons/bs";
import {
  NormalPlayerContainer,
  Top,
  Middle,
  CDWrapper,
  Bottom,
  ProgressWrapper,
  Operators,
} from "./NormalPlayerStyle";
import ProgressBar from "../../../baseUI/ProgressBar/ProgressBar";
import { playMode } from "../../../api/config";
import { useDispatch } from "react-redux";

const NormalPlayer = (props) => {
  const { song, fullScreen, playing, percent, duration, currentTime,mode } = props;
  //onProgressChange 进度条滑动或点击时改变percent
  const {
    clickPlaying,
    changeFullScreen,
    onProgressChange,
    handlePrev,
    handleNext,
    changePlayMode,
    changeShowPlayList
  } = props;
  const normalPlayerRef = useRef();
  const cdWrapperRef = useRef();
  const dispatch = useDispatch();
  const transform = prefixStyle("transform");


  // 计算偏移的辅助函数
  const _getPosAndScale = () => {
    const targetWidth = 40; //小图标宽度
    const paddingLeft = 40; // 底部div.icon(小唱片)的1/2宽度
    const paddingBottom = 30; //底部miniplayer的1/2高度
    const paddingTop = 80; //顶部title高度
    const width = window.innerWidth * 0.8; //全屏播放中心CD宽度
    const scale = targetWidth / width;
    // 两个圆心的横坐标距离和纵坐标距离
    //x从中心到左下角为负
    const x = -(window.innerWidth / 2 - paddingLeft);
    const y = window.innerHeight - paddingTop - width / 2 - paddingBottom;
    return {
      x,
      y,
      scale,
    };
  };

  //启用帧动画
  const enter = () => {
    normalPlayerRef.current.style.display = "block";
    const { x, y, scale } = _getPosAndScale(); // 获取 miniPlayer 图片中心相对 normalPlayer 唱片中心的偏移
    let animation = {
      0: {
        transform: `translate3d(${x}px,${y}px,0) scale(${scale})`,
      },
      60: {
        transform: `translate3d(0, 0, 0) scale(1.1)`,
      },
      100: {
        transform: `translate3d(0, 0, 0) scale(1)`,
      },
    };
    animations.registerAnimation({
      name: "move",
      animation,
      presets: {
        duration: 400,
        easing: "linear",
      },
    });
    animations.runAnimation(cdWrapperRef.current, "move");
  };

  const afterEnter = () => {
    // 进入后解绑帧动画
    const cdWrapperDom = cdWrapperRef.current;
    animations.unregisterAnimation("move");
    cdWrapperDom.style.animation = "";
  };

  const leave = () => {
    if (!cdWrapperRef.current) return;
    const cdWrapperDom = cdWrapperRef.current;
    cdWrapperDom.style.transition = "all .4s";
    const { x, y, scale } = _getPosAndScale();
    cdWrapperDom.style[
      transform
    ] = `translate3d(${x}px,${y}px,0) scale(${scale})`;
  };

  const afterLeave = () => {
    if (!cdWrapperRef.current) return;
    const cdWrapperDom = cdWrapperRef.current;
    cdWrapperDom.style.transition = "";
    cdWrapperDom.style[transform] = "";

    normalPlayerRef.current.style.display = "none";
  };

  //判断playmode
  const getPlayMode = () => {
    let content;
    if (mode === playMode.sequence) {
      content = <BiRefresh className="iconfont" onClick={changePlayMode} />;
    } else if (mode === playMode.loop) {
      content = <MdReplay className="iconfont" onClick={changePlayMode} />;
    } else {
      content = <FaRandom className="iconfont" onClick={changePlayMode} />;
    }
    return content;
  };

  return (
    <CSSTransition
      classNames="normal"
      in={fullScreen}
      timeout={400}
      mountOnEnter
      onEnter={enter}
      onEntered={afterEnter}
      onExit={leave}
      onExited={afterLeave}
    >
      <NormalPlayerContainer ref={normalPlayerRef}>
        <div className="background">
          <img
            src={song.al.picUrl + "?param=300x300"}
            width="100%"
            height="
        100%"
            alt="歌曲图片"
          />
        </div>
        <div className="background layer"></div>

        <Top className="top">
          <div
            className="back"
            onClick={() => dispatch(changeFullScreen(false))}
          >
            <IoMdArrowBack className="iconfont" />
          </div>
          <h1 className="title">{song.name}</h1>
          <h1 className="subtitle">{getName(song.ar)}</h1>
        </Top>

        <Middle ref={cdWrapperRef}>
          <CDWrapper>
            <div className="cd">
              <img
                className={`image play ${playing ? "" : "pause"}`}
                src={song.al.picUrl + "?param=400x400"}
                alt=""
              />
            </div>
          </CDWrapper>
        </Middle>

        <Bottom className="bottom">
          {/* 进度条模拟 */}
          <ProgressWrapper>
            <span className="time time-l">{formatPlayTime(currentTime)}</span>
            <div className="progress-bar-wrapper">
              <ProgressBar
                percent={percent}
                percentChange={onProgressChange}
              ></ProgressBar>
            </div>
            <div className="time time-r">{formatPlayTime(duration)}</div>
          </ProgressWrapper>

          <Operators>
            <div className="icon i-left">
              {getPlayMode()}
            </div>
            <div className="icon i-left" onClick={handlePrev}>
              <IoPlaySkipBack className="iconfont" />
            </div>
            <div className="icon i-center">
              {playing ? (
                <AiOutlinePauseCircle
                  className="iconfont"
                  onClick={(e) => clickPlaying(e, !playing)}
                />
              ) : (
                <BsFillPlayFill
                  className="iconfont"
                  onClick={(e) => clickPlaying(e, !playing)}
                />
              )}
            </div>
            <div className="icon i-right">
              <IoPlaySkipForward className="iconfont" onClick={handleNext} />
            </div>
            <div className="icon i-right">
              <BsMusicNoteList className="iconfont" onClick={()=>dispatch(changeShowPlayList(true))}/>
            </div>
          </Operators>
        </Bottom>
      </NormalPlayerContainer>
    </CSSTransition>
  );
};

export default React.memo(NormalPlayer);
