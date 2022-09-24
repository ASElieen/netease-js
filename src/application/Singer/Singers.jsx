import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getHotSingerList,
  getSingerListWithCategory,
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
  const { singerList, isLoading } = useSelector((store) => store.hotSinger);

  useEffect(() => {
    if (!singerList.length) {
      dispatch(getHotSingerList());
    }
  }, []);

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

  //Scroll组件的上拉刷新(相当于重新加载)
 

  //Scroll组件的下拉刷新(添加分页获取更多数据)
 

  const renderList = () => {
    return (
      <List>
        {singerList.map((item, index) => (
          <ListItem key={item.accountId + "" + index}>
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
          <Scroll onScroll={forceCheck}>
            {renderList()}
          </Scroll>
        </ListContainer>
      ) : (
        <LoadingContainer>
          <CircleLoading />
        </LoadingContainer>
      )}
    </>
  );
};

export default React.memo(Singer);
