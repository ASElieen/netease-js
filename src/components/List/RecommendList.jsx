import React from 'react'
import { getCount } from '../../api/utils';
import { List,ListWrapper,ListItem } from './RecommendListStyle'
import LazyLoad from 'react-lazyload'
import { BsFillPlayFill } from "react-icons/bs";

const RecommendList = (props) => {
    const {lists} = props
  return (
    <>
      <ListWrapper>
        <h1 className="title">推荐歌单</h1>
        <List>
          {lists.map((item, index) => (
            <ListItem key={item.id + index}>
              <div className="img_wrapper">
                <div className="decorate"></div>
                {/* 加此参数可以减小请求的图片资源大小 */}
                <LazyLoad placeholder={<img width='100%' height='100%' src={require('./music.png')} alt='占位图'/>}>
                  <img
                    src={item.picUrl + "?param=300x300"}
                    width="100%"
                    height="100%"
                    alt="music"
                  />
                </LazyLoad>
                <div className="play_count">
                  <BsFillPlayFill className="iconfont play" />
                  <span className="count">{getCount(item.playCount)}</span>
                </div>
              </div>
              <div className="desc">{item.name}</div>
            </ListItem>
          ))}
        </List>
      </ListWrapper>
    </>
  );
}

export default React.memo(RecommendList);