import React, { useState,useEffect } from "react";
import {useDispatch,useSelector} from 'react-redux'
import {
  getHotSingerList,
  getSingerListWithCategory,
} from "../../store/Slices/singerListSlice";
import { NavContainer,ListContainer,List,ListItem } from "./SingerStyle";
import HorizenItem from "../../baseUI/Horizen-item/HorizenItem";
import { categoryTypes, alphaTypes } from "../../api/mock";
import Scroll from "../../components/Scroll/Scroll";
import CircleLoading from "../../components/Loading/CircleLoading";



const Singer = () => {
  const [categoryName, setCategoryName] = useState("");
  const [alpha, setAlpha] = useState("");
  const dispatch = useDispatch()
  const { singerList, isLoading } = useSelector((store) => store.hotSinger);

  useEffect(()=>{
    if(!singerList.length){
      dispatch(getHotSingerList())
    }
  },[])

  let handleAlpha = (val) => {
    setAlpha(val);
    sessionStorage.setItem("alpha", val);
    dispatch(getSingerListWithCategory({
      categoryName:categoryName,
      alpha:val
    }))
  };

  let handleCategoryName = (val) => {
    setCategoryName(val);
    sessionStorage.setItem("category", val);
    dispatch(
      getSingerListWithCategory({
        categoryName: val,
        alpha: alpha,
      })
    );
  };

  const renderList = ()=>{
    return (!isLoading && 
      <List>
        {
          singerList.map((item,index)=>(
            <ListItem key={item.accountId+''+index}>
              <div className="img_wrapper">
                <img src={`${item.picUrl}?param=300x300`} width='100%' height='100%' alt="music" />
              </div>
              <span className="name">{item.name}</span>
            </ListItem>
          ))
        }
      </List>
    )
  }

  return (!isLoading && 
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
      <ListContainer>
        {}
        <Scroll>{renderList()}</Scroll>
      </ListContainer>
    </>
  );
};

export default React.memo(Singer);
