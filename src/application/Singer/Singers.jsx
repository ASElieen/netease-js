import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate,Outlet} from 'react-router-dom'
import {
  getHotSingerList,
  getSingerListWithCategory,
  requestMoreHotSingers,
  requestMoreSingersWithCategory,
  clearPageCount,
} from "../../store/Slices/singerListSlice";
import { handleCategory } from "../../api/utils";
import LazyLoad, { forceCheck } from "react-lazyload";
import {
  NavContainer,
  ListContainer,
  List,
  ListItem,
  LoadingContainer,
} from "./SingerStyle";
import HorizenItem from "../../baseUI/Horizen-item/HorizenItem";
import { categoryTypes, alphaTypes, mapCategory } from "../../api/mock";
import Scroll from "../../components/Scroll/Scroll";
import CircleLoading from "../../components/Loading/CircleLoading";

const Singer = () => {
  const [categoryName, setCategoryName] = useState("");
  const [alpha, setAlpha] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { singerList, isLoading, pullDownLoading } = useSelector(
    (store) => store.hotSinger
  );

  //页面跳转 =>listItem onClick
  const enterDetail = (detail)=>{
    navigate(`/singers/${detail.id}`)
  }

  useEffect(() => {
    if (!singerList.length) {
      dispatch(getHotSingerList());
    }
  }, []);

  //处理字母分类
  let handleAlpha = (val) => {
    setAlpha(val);
    sessionStorage.setItem("alpha", val);
    const category = handleCategory(
      sessionStorage.getItem("category"),
      mapCategory
    );
    dispatch(
      getSingerListWithCategory({
        categoryName: category.type,
        alpha: val,
        area: category.area,
      })
    );
  };

  //处理歌手分类
  let handleCategoryName = (val) => {
    setCategoryName(val);
    sessionStorage.setItem("category", val);
    const category = handleCategory(val, mapCategory);
    dispatch(
      getSingerListWithCategory({
        categoryName: category.type,
        alpha: alpha,
        area: category.area,
      })
    );
  };

  //Scroll组件的手势下拉刷新(顶部 相当于重新加载)
  const handlePullDown = () => {
    dispatch(clearPageCount());

    if (sessionStorage.getItem("alpha") || sessionStorage.getItem("category")) {
      console.log("data");
      const category = handleCategory(
        sessionStorage.getItem("category"),
        mapCategory
      );
      dispatch(
        getSingerListWithCategory({
          categoryName: category.type,
          alpha: sessionStorage.getItem("alpha"),
          area: category.area,
        })
      );
    } else {
      dispatch(getHotSingerList());
    }
  };

  //Scroll组件的手势上滑刷新(底部 添加分页获取更多数据)
  const handlePullUp = () => {
    if (sessionStorage.getItem("alpha") || sessionStorage.getItem("category")) {
      const category = handleCategory(
        sessionStorage.getItem("category"),
        mapCategory
      );
      dispatch(
        requestMoreSingersWithCategory({
          categoryName: category.type,
          alpha: sessionStorage.getItem("alpha"),
          area: category.area,
        })
      );
    } else {
      dispatch(requestMoreHotSingers());
    }
  };

  const renderList = () => {
    return (
      <List>
        {singerList.map((item, index) => (
          <ListItem key={item.accountId + "" + index} onClick={()=>enterDetail(item)}>
            <div className="img_wrapper">
              <LazyLoad
                placeholder={
                  <img
                    width="100%"
                    height="100%"
                    src={require("./singer.png")}
                    alt="music"
                  />
                }
              >
                <img
                  src={`${item.picUrl}?param=300x300`}
                  width="100%"
                  height="100%"
                  alt="music"
                />
              </LazyLoad>
            </div>
            <span className="name">{item.name}</span>
          </ListItem>
        ))}
      </List>
    );
  };

  return (
    <>
      <NavContainer>
        <HorizenItem
          list={categoryTypes}
          title={"分类(默认热门)"}
          oldVal={sessionStorage.getItem("category") || categoryName}
          handleClick={(val) => handleCategoryName(val)}
        />
        <HorizenItem
          list={alphaTypes}
          oldVal={sessionStorage.getItem("alpha") || alpha}
          handleClick={(val) => handleAlpha(val)}
        />
      </NavContainer>
      {!isLoading ? (
        <ListContainer>
          <Scroll
            onScroll={forceCheck}
            pullDown={handlePullDown}
            pullUp={handlePullUp}
            pullDownLoading={pullDownLoading}
          >
            {renderList()}
          </Scroll>
        </ListContainer>
      ) : (
        <LoadingContainer>
          <CircleLoading />
        </LoadingContainer>
      )}
      <Outlet/>
    </>
  );
};

export default React.memo(Singer);
