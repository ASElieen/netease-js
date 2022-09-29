import React, { useState, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { prefixStyle, getName } from "../../../api/utils";
import { playMode } from "../../../api/config";
import { CSSTransition } from "react-transition-group";
import { AiOutlineClear, AiFillLike, AiFillDelete } from "react-icons/ai";
import {BiRefresh} from 'react-icons/bi'
import {MdReplay} from 'react-icons/md'
import {FaRandom} from 'react-icons/fa'
import {
  changeShowPlayList,
  changeCurrentIndex,
  changePlayList,
} from "../../../store/Slices/playerSlice";
import Scroll from '../../../components/Scroll/Scroll'
import {
  PlayListWrapper,
  ScrollWrapper,
  ListHeader,
  ListContent,
} from "./PlayListStyle";

const PlayList = (props) => {
    const {changePlayMode} = props
  const { showPlayList, playList, mode, currentIndex, currentSong } =
    useSelector((store) => store.player);

  const playListRef = useRef();
  const listWrapperRef = useRef();
  const [isShow, setIsShow] = useState(false);

  const dispatch = useDispatch();

  const transform = prefixStyle("transform");

  const onEnterCB = useCallback(() => {
    //显示列表
    setIsShow(true);
    //开始时隐藏在最下方
    listWrapperRef.current.style[transform] = `translated3d(0,100%,0)`;
  }, [transform]);

  const onEnteringCB = useCallback(() => {
    //展现列表
    listWrapperRef.current.style["transition"] = "all 0.3s";
    listWrapperRef.current.style[transform] = "translate3d(0,0,0)";
  }, [transform]);

  const onExitingCB = useCallback(() => {
    listWrapperRef.current.style["transition"] = "all 0.3s";
    listWrapperRef.current.style[transform] = `translate3d(0px, 100%, 0px)`;
  }, [transform]);

  const onExitedCB = useCallback(() => {
    setIsShow(false);
    listWrapperRef.current.style[transform] = `translate3d(0px,100%,0px)`;
  }, [transform]);

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

  const changeMode = (e) => {
    let newMode = (mode + 1) % 3;
    // 具体逻辑比较复杂 后面来实现
  };

  return (
    <CSSTransition
      in={showPlayList}
      timeout={300}
      classNames="list-fade"
      onEnter={onEnterCB}
      onEntering={onEnteringCB}
      onExiting={onExitingCB}
      onExited={onExitedCB}
    >
      <PlayListWrapper
        ref={playListRef}
        style={isShow === true ? { display: "block" } : { display: "none" }}
        onClick={() => dispatch(changeShowPlayList(false))}
      >
        <div className="list_wrapper" ref={listWrapperRef}>
          <ListHeader>
            <h1 className="title">{getPlayMode()}</h1>
          </ListHeader>
          <ScrollWrapper>
            <Scroll>
              <ListContent>
                {playList.map((item, index) => (
                  <li className="item" key={item.id}>
                    {/* getCurrentIcon(item) */}
                    <span className="text">
                      {item.name}-{getName(item.ar)}
                    </span>
                    <span className="like">
                      <AiFillLike className="iconfont" />
                    </span>
                    <span className="delete">
                      <AiFillDelete className="iconfont" />
                    </span>
                  </li>
                ))}
              </ListContent>
            </Scroll>
          </ScrollWrapper>
        </div>
      </PlayListWrapper>
    </CSSTransition>
  );
};

export default React.memo(PlayList);
