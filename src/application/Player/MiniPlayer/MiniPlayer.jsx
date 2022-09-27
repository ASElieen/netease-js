import React,{useRef} from 'react'
import {CSSTransition} from 'react-transition-group'
import {AiOutlinePause} from 'react-icons/ai'
import { BsFillPlayFill, BsMusicNoteList } from "react-icons/bs";
import { getName } from '../../../api/utils';
import { MiniPlayerContainer } from './miniPlayerStyle';
import { CircleProgress } from '../../../baseUI/CircleProgress/CircleProgress';
import {useDispatch} from 'react-redux'

const MiniPlayer = (props) => {
    const { song,fullScreen,changeFullScreen } = props;
    const miniPlayerRef = useRef()
    const dispatch = useDispatch()
    const percent = 0.2
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
              className="play"
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
            <AiOutlinePause className="iconfont icon-mini" />
          </CircleProgress>
        </div>

        <div className="control">
          <BsMusicNoteList className="iconfont" />
        </div>
      </MiniPlayerContainer>
    </CSSTransition>
  );
}

export default React.memo(MiniPlayer);