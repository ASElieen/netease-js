import React, { forwardRef } from "react";
import {SongLists,SongItem} from './SongListStyle'
import { useDispatch } from "react-redux";
import { changePlayList,changeCurrentIndex,changeSequencePlaylist  } from "../../store/Slices/playerSlice";
import { getName } from '../../api/utils'
import {BsFillPlayFill} from 'react-icons/bs'

const SongList = forwardRef((props,refs) => {
    const {collectCount,showCollect,songs} = props
    const totalCount = songs.length
    const dispatch = useDispatch()
    
    const selectItem = (e,index)=>{
      dispatch(changePlayList(songs))
      dispatch(changeSequencePlaylist(songs))
      dispatch(changeCurrentIndex(index))
    }
    
     let songList = (list) => {
       let res = [];
       list.forEach((item,index)=>{
        res.push(
          <li key={item.id} onClick={(e) => selectItem(e, index)}>
            <span className="index">{index + 1}</span>
            <div className="info">
              <span>{item.name}</span>
              <span>
                {item.ar ? getName(item.ar) : getName(item.artists)} -{" "}
                {item.al ? item.al.name : item.album.name}
              </span>
            </div>
          </li>
        );
       })
       return res;
     };

      const collect = (count) => {
        return (
          <div className="add_list">
            <i className="iconfont">&#xe62d;</i>
            <span> 收藏 ({Math.floor(count / 1000) / 10} 万)</span>
          </div>
        );
      };

  return (
    <SongLists ref={refs} showBackground={props.showBackground}>
      <div className="first_line">
        <div className="play_all" onClick={(e) => selectItem(e, 0)}>
          <BsFillPlayFill className="iconfont" />
          <span>
            {" "}
            播放全部 <span className="sum">(共 {totalCount} 首)</span>
          </span>
        </div>
        {showCollect ? collect(collectCount) : null}
      </div>
      <SongItem>{songList(songs)}</SongItem>
    </SongLists>
  );
});

export default React.memo(SongList);