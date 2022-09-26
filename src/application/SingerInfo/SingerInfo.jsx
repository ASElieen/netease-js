import React, { useState, useRef, useEffect,useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import {
  Container,
  ImgWrapper,
  CollectButton,
  SongListWrapper,
  BgLayer,
} from "./SingerInfoStyle";
import SongList from "../SongList/SongList";
import Header from "../../components/Header/Header";
import Scroll from "../../components/Scroll/Scroll";
import { BiCollection } from "react-icons/bi";
import { artist } from "../../api/mock";

const SingerInfo = (props) => {
  const [showStatus, setShowStatus] = useState(true);
  const navigate = useNavigate();

  //Ref
  const collectButton = useRef();
  const imageWrapper = useRef();
  const songScrollWrapper = useRef();
  const songScroll = useRef();
  const header = useRef();
  const layer = useRef();
  // 图片初始高度
  const initialHeight = useRef(0);

  //往上偏移 露出圆角
  const OFFSET =5

  useEffect(()=>{
    let h = imageWrapper.current.offsetHeight
    songScrollWrapper.current.style.top = `${h-OFFSET}px`
    initialHeight.current = h

    //遮罩裹住歌曲列表
    layer.current.style.top = `${h-OFFSET}px`
    songScroll.current.refresh()
  },[])

  const setShowStatusFalse = useCallback(()=>{
    setShowStatus(false)
  },[])

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExit={() => navigate(-1)}
    >
      <Container>
        <Header title="头部" ref={header} />
        <ImgWrapper ref={imageWrapper} bgUrl={artist.picUrl}>
          <div className="filter"></div>
        </ImgWrapper>

        <CollectButton ref={collectButton}>
          <BiCollection className="iconfont" />
          <span className="text">收藏</span>
        </CollectButton>
        <BgLayer ref={layer}></BgLayer>

        <SongListWrapper ref={songScrollWrapper}>
          <Scroll ref={songScroll}>
            <SongList songs={artist.hotSongs} showCollect={false}></SongList>
          </Scroll>
        </SongListWrapper>
      </Container>
    </CSSTransition>
  );
};

export default React.memo(SingerInfo);
