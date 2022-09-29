import React,{useRef} from 'react'
import {CSSTransition} from 'react-transition-group'
import {AiOutlinePause} from 'react-icons/ai'
import { BsFillPlayFill, BsMusicNoteList } from "react-icons/bs";
import { getName } from '../../../api/utils';
import { MiniPlayerContainer } from './miniPlayerStyle';
import { CircleProgress } from '../../../baseUI/CircleProgress/CircleProgress';
import {useDispatch} from 'react-redux'

const MiniPlayer = (props) => {
    const { song, fullScreen, playing,percent } = props;
    const { changeFullScreen, clickPlaying,changeShowPlayList} = props;
    const miniPlayerRef = useRef()
    const dispatch = useDispatch()

    const handleChangeShowPlayList =(e)=>{
      dispatch(changeShowPlayList(true))
      e.stopPropagation()
    }

  return (
    <CSSTransition
      in={!fullScreen}
      timeout={400}
      classNames="mini"
      onEnter={() => {
        miniPlayerRef.current.style.display = "flex";
      }}
      onExited={() => {
        miniPlayerRef.current.style.display = "none";
      }}
    >
      <MiniPlayerContainer
        ref={miniPlayerRef}
        onClick={() => {
          dispatch(changeFullScreen(true));
        }}
      >
        <div className="icon">
          <div className="imgWrapper">
            <img
              className={`play ${playing ? "" : "pause"}`}
              src={song.al.picUrl}
              width="40"
              height="40"
              alt="img"
            />
          </div>
        </div>

        <div className="text">
          <h2 className="name">{song.name}</h2>
          <p className="desc">{getName(song.ar)}</p>
        </div>

        <div className="control">
          <CircleProgress radius={32} percent={percent}>
            {playing ? (
              <AiOutlinePause
                className="iconfont icon-mini"
                onClick={(e) => clickPlaying(e, false)}
              />
            ) : (
              <BsFillPlayFill
                className="iconfont icon-mini"
                onClick={(e) => clickPlaying(e, true)}
              />
            )}
          </CircleProgress>
        </div>

        <div className="control">
          <BsMusicNoteList className="iconfont" onClick={handleChangeShowPlayList} />
        </div>
      </MiniPlayerContainer>
    </CSSTransition>
  );
}

export default React.memo(MiniPlayer);