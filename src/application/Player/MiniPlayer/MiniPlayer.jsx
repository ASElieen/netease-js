import React from 'react'
import {AiOutlinePause} from 'react-icons/ai'
import { BsFillPlayFill, BsMusicNoteList } from "react-icons/bs";
import { getName } from '../../../api/utils';
import { MiniPlayerContainer } from './miniPlayerStyle';

const MiniPlayer = (props) => {
    const { song } = props;
  return (
    <MiniPlayerContainer>
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
        <AiOutlinePause className="iconfont" />
      </div>
      <div className="control">
        <BsMusicNoteList className="iconfont" />
      </div>
    </MiniPlayerContainer>
  );
}

export default React.memo(MiniPlayer);