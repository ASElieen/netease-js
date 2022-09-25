import React,{useEffect} from 'react'
import Scroll from '../../components/Scroll/Scroll'
import { getRankList } from '../../store/Slices/rankSlice'
import {useDispatch,useSelector} from 'react-redux'
import { filterIndex } from '../../api/utils'
import { Container,List,ListItem,SongList } from './RankStyle'
import { LoadingContainer } from '../Singer/SingerStyle'
import UserLoading from '../../components/Loading/UserLoading'

const Rank = () => {
  const dispatch = useDispatch();
  const { rankList, isLoading } = useSelector((store) => store.rankList);

  let globalStartIndex = filterIndex(rankList);
  let officialList = rankList.slice(0, globalStartIndex);
  let globalList = rankList.slice(globalStartIndex);

  const enterDetail = (name) => {
    const idx = filterIndex(name);
    if (idx === null) {
      alert("暂无相关数据");
      return;
    }
  };

  useEffect(() => {
    dispatch(getRankList());
  }, []);

  const renderRankList = (list, global) => {
    return (
      <List globalRank={global}>
        {list.map((item,index) => (
          <ListItem
            key={item.coverImgId+''+index}
            tracks={item.tracks}
            onClick={() => enterDetail(item.name)}
          >
            <div className="img_wrapper">
              <img src={item.coverImgUrl} alt="" />
              <div className="decorate"></div>
              <span className="update_frequecy">{item.updateFrequency}</span>
            </div>
            {renderSongList(item.tracks)}
          </ListItem>
        ))}
      </List>
    );
  };

  const renderSongList = (list) => {
    return list.length ? (
      <SongList>
        {list.map((item, index) => {
          return (
            <li key={index}>
              {index + 1}. {item.first} - {item.second}
            </li>
          );
        })}
      </SongList>
    ) : null;
  };

  // 榜单数据未加载出来之前都给隐藏
  let displayStyle = !isLoading ? { display: "none" } : { display: "" };

  return (
    <Container>
      <Scroll>
        <div>
          <h1 className="offical" style={displayStyle}>
            {" "}
            官方榜{" "}
          </h1>
          {renderRankList(officialList)}
          <h1 className="global" style={displayStyle}>
            {" "}
            全球榜{" "}
          </h1>
          {renderRankList(globalList, true)}
          {!isLoading ? (
            <LoadingContainer>
              <UserLoading></UserLoading>
            </LoadingContainer>
          ) : null}
        </div>
      </Scroll>
    </Container>
  );
}

export default React.memo(Rank)