import React from 'react'
//图标
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { Outlet,NavLink } from 'react-router-dom';

import { Top,Tab,TabItem } from './HomeStyle'

const Home = () => {
  return (
    <>
      <Top>
        <span className="iconfont">
          <AiOutlineMenu />
        </span>
        <span>网抑云音乐</span>
        <span className="iconfont">
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
    </>
  );
}

export default React.memo(Home);