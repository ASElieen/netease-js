import React, { useEffect } from "react";
import Slider from "../../components/Slider/Slider";
import RecommendList from "../../components/List/RecommendList";
import { Content } from "./RecommendStyle";
import Scroll from "../../components/Scroll/Scroll";
import CircleLoading from "../../components/Loading/CircleLoading";
import { useDispatch, useSelector } from "react-redux";
import { getLists } from "../../store/Slices/listSlice";
//滚动的时候显示对应视口图片
import { forceCheck } from "react-lazyload";
import { Outlet } from "react-router-dom";

const Recommend = () => {
  const dispatch = useDispatch();
  const { lists, isLoading } = useSelector((store) => store.list);

  useEffect(() => {
    if (!lists.length) {
      dispatch(getLists());
    }
  }, []);

  if (isLoading) {
    return (
      <Content>
        <CircleLoading />
      </Content>
    );
  }

  return (
    !isLoading && (
      <Content>
        <Scroll onScroll={forceCheck}>
          <div>
            <Slider />
            <RecommendList lists={lists} />
          </div>
        </Scroll>
        <Outlet/>
      </Content>
    )
  );
};

export default React.memo(Recommend);
