import React from 'react'
//图标
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { Outlet,NavLink,useNavigate } from 'react-router-dom';

import Player from '../Player/Player';
import Search from '../../components/Search/Search';

import { Top,Tab,TabItem } from './HomeStyle'

const Home = () => {
  const navigate = useNavigate()
  return (
    <>
      <Top>
        <span className="iconfont">
          <AiOutlineMenu />
        </span>
        <span>网抑云音乐</span>
        <span className="iconfont" onClick={()=>navigate('/search')}>
          <AiOutlineSearch />
        </span>
      </Top>
      <Tab>
        <NavLink
          to="/recommend"
          className={({ isActive }) => (isActive ? "selected" : undefined)}
        >
          <TabItem>
            <span>推荐</span>
          </TabItem>
        </NavLink>

        <NavLink
          to="/singers"
          className={({ isActive }) => (isActive ? "selected" : undefined)}
        >
          <TabItem>
            <span>歌手</span>
          </TabItem>
        </NavLink>

        <NavLink
          to="/rank"
          className={({ isActive }) => (isActive ? "selected" : undefined)}
        >
          <TabItem>
            <span>排行榜</span>
          </TabItem>
        </NavLink>
      </Tab>
      <Outlet />
      <Player/>
    </>
  );
}

export default React.memo(Home);