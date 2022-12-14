import React, { useState, useRef, useEffect,useCallback } from "react";
import {useDispatch,useSelector} from 'react-redux'
import { getSingerInfo } from "../../store/Slices/singerInfoSlice";
import { useNavigate,useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import {
  Container,
  ImgWrapper,
  CollectButton,
  SongListWrapper,
  BgLayer,
} from "./SingerInfoStyle";
import { getUrlId } from "../../api/utils";
import SongList from "../SongList/SongList";
import Header from "../../components/Header/Header";
import Scroll from "../../components/Scroll/Scroll";
import { BiCollection } from "react-icons/bi";
import CircleLoading from "../../components/Loading/CircleLoading";

const SingerInfo = (props) => {
  const [showStatus, setShowStatus] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const location = useLocation()
  const urlId = getUrlId(location.pathname)

  const {artist,isLoading} = useSelector(store=>store.singerInfo)

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
  const HEADER_HEIGHT = 45

  useEffect(()=>{
    if(imageWrapper.current){
      let h = imageWrapper.current.offsetHeight;
      songScrollWrapper.current.style.top = `${h - OFFSET}px`;
      initialHeight.current = h;

      //遮罩裹住歌曲列表
      layer.current.style.top = `${h - OFFSET}px`;
      songScroll.current.refresh();
    }
  })

  //数据
  useEffect(()=>{
    dispatch(getSingerInfo(urlId))
  },[])

  const setShowStatusFalse = useCallback(()=>{
    setShowStatus(false)
  },[])


  //滚动效果的处理
  const handleScroll = (pos) => {
    let height = initialHeight.current;
    const newY = pos.y;
    const imageDOM = imageWrapper.current;
    const buttonDOM = collectButton.current;
    const headerDOM = header.current;
    const layerDOM = layer.current;
    const minScrollY = -(height - OFFSET) + HEADER_HEIGHT;

    //滑动距离占图片高度的百分比
    const percent = Math.abs(newY / height);

    //单纯下拉
    if (newY > 0) {
      imageDOM.style["transform"] = `scale (${1 + percent})`;
      buttonDOM.style["transform"] = `translate3d (0, ${newY}px, 0)`;
      layerDOM.style.top = `${height - OFFSET + newY}px`;
    } else if (newY >= minScrollY) {
      //往上滑动，但是遮罩还没超过 Header 部分
      layerDOM.style.top = `${height - OFFSET - Math.abs(newY)}px`;
      // 这时候保证遮罩的层叠优先级比图片高，不至于被图片挡住
      layerDOM.style.zIndex = 1;
      imageDOM.style.paddingTop = "75%";
      imageDOM.style.height = 0;
      imageDOM.style.zIndex = -1;
      // 按钮跟着移动且渐渐变透明
      buttonDOM.style["transform"] = `translate3d (0, ${newY}px, 0)`;
      buttonDOM.style["opacity"] = `${1 - percent * 2}`;
    } else if (newY < minScrollY) {
      //往上滑动，但是遮罩超过 Header 部分
      layerDOM.style.top = `${HEADER_HEIGHT - OFFSET}px`;
      layerDOM.style.zIndex = 1;
      // 防止溢出的歌单内容遮住 Header
      headerDOM.style.zIndex = 100;
      // 此时图片高度与 Header 一致
      imageDOM.style.height = `${HEADER_HEIGHT}px`;
      imageDOM.style.paddingTop = 0;
      imageDOM.style.zIndex = 99;
    }
  };

  if(isLoading) return (<CircleLoading/>)

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
        <Header title="头部" ref={header} handleClick={setShowStatusFalse} />
        <ImgWrapper ref={imageWrapper} bgUrl={artist.artist.picUrl}>
          <div className="filter"></div>
        </ImgWrapper>

        <CollectButton ref={collectButton}>
          <BiCollection className="iconfont" />
          <span className="text">收藏</span>
        </CollectButton>
        <BgLayer ref={layer}></BgLayer>

        <SongListWrapper ref={songScrollWrapper}>
          <Scroll ref={songScroll} onScroll={handleScroll}>
            <SongList songs={artist.hotSongs} showCollect={false}></SongList>
          </Scroll>
        </SongListWrapper>
      </Container>
    </CSSTransition>
  );
};

export default React.memo(SingerInfo);
