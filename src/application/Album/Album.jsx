import React, { useState, useRef, useCallback } from "react";
import { Container, TopDesc, Menu, SongList, SongItem } from "./AlbumStyle";
import Scroll from "../../components/Scroll/Scroll";
import Header from "../../components/Header/Header";
import { CSSTransition } from "react-transition-group";
import { useNavigate } from "react-router-dom";
import { BsFillPlayFill } from "react-icons/bs";
import { BiComment, BiLike } from "react-icons/bi";
import { MdCollections } from "react-icons/md";
import { IoIosMore } from "react-icons/io";
import { getCount, getName } from "../../api/utils";
import commonStyle from "../../assets/commonStyle";
//mock
import { currentAlbum } from "../../api/mock";

const Album = (props) => {
  const navigate = useNavigate();
  const [showStatus, setShowStatus] = useState(true);
  const [title, setTitle] = useState("歌单");
  const [isMarquee, setIsMarquee] = useState(false);

  const headerEl = useRef();

  const handleBack = () => {
    setShowStatus(false);
  };

  //滑动处理
  const HEADER_HEIGHT = 45;

  const handleScroll = (pos) => {
    let minScrollY = -HEADER_HEIGHT;
    let percent = Math.abs(pos.y / minScrollY);
    let headerDOM = headerEl.current;

    //顶部高度开始变化
    if (pos.y < minScrollY) {
      headerDOM.style.backgroundColor = commonStyle["theme-color"];
      headerDOM.style.opacity = Math.min(1, (percent - 1) / 2);
      setTitle(currentAlbum.name);
      setIsMarquee(true);
    } else {
      headerDOM.style.backgroundColor = "";
      headerDOM.style.opacity = 1;
      setTitle("歌单");
      setIsMarquee(false);
    }
  };

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={() => navigate(-1)}
    >
      <Container>
        <Header
          title={title}
          handleClick={handleBack}
          ref={headerEl}
          isMarquee={isMarquee}
        />
        <Scroll bounceTop={false} onScroll={handleScroll}>
          <div>
            <TopDesc background={currentAlbum.coverImgUrl}>
              <div className="background">
                <div className="filter"></div>
              </div>

              <div className="img_wrapper">
                <div className="decorate"></div>
                <img src={currentAlbum.coverImgUrl} alt="" />
                <div className="play_count">
                  <span className="count">
                    <BsFillPlayFill className="iconfont play" />
                    {Math.floor(currentAlbum.subscribedCount / 1000) /
                      10} 万{" "}
                  </span>
                </div>
              </div>

              <div className="desc_wrapper">
                <div className="title">{currentAlbum.name}</div>
                <div className="person">
                  <div className="avatar">
                    <img src={currentAlbum.creator.avatarUrl} alt="" />
                  </div>
                  <div className="name">{currentAlbum.creator.name}</div>
                </div>
              </div>
            </TopDesc>

            <Menu>
              <div>
                <BiComment className="iconfont" />
                评论
              </div>
              <div>
                <BiLike className="iconfont" />
                点赞
              </div>
              <div>
                <MdCollections className="iconfont" />
                收藏
              </div>
              <div>
                <IoIosMore className="iconfont" />
                更多
              </div>
            </Menu>

            <SongList>
              <div className="first_line">
                <div className="play_all">
                  <BsFillPlayFill className="iconfont" />
                  <span>
                    播放全部
                    <span className="sum">
                      (共 {currentAlbum.tracks.length} 首)
                    </span>
                  </span>
                </div>

                <div className="add_list">
                  <MdCollections className="iconfont" />
                  <span> 收藏 ({getCount(currentAlbum.subscribedCount)})</span>
                </div>
              </div>

              <SongItem>
                {currentAlbum.tracks.map((item, index) => {
                  return (
                    <li key={index}>
                      <span className="index">{index + 1}</span>
                      <div className="info">
                        <span>{item.name}</span>
                        <span>
                          {getName(item.ar)} - {item.al.name}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </SongItem>
            </SongList>
          </div>
        </Scroll>
      </Container>
    </CSSTransition>
  );
};

export default React.memo(Album);
