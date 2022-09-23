import React,{useEffect} from "react";
import Slider from "../../components/Slider/Slider";
import RecommendList from "../../components/List/RecommendList";
import { Content } from "./RecommendStyle";
import Scroll from "../../components/Scroll/Scroll";
import { useDispatch, useSelector } from "react-redux";
import { getLists } from "../../store/Slices/listSlice";

const Recommend = () => {
  const dispatch = useDispatch();
  const { lists, isLoading } = useSelector((store) => store.list);

  useEffect(()=>{
    if(!lists.length){
      dispatch(getLists())
    }
  },[])

  return (
    <Content>
      <Scroll>
        <div>
          <Slider />
          <RecommendList lists={lists} />
        </div>
      </Scroll>
    </Content>
  );
};

export default React.memo(Recommend);
