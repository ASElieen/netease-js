import React, { useState } from "react";
import { NavContainer,ListContainer,List,ListItem } from "./SingerStyle";
import HorizenItem from "../../baseUI/Horizen-item/HorizenItem";
import { categoryTypes, alphaTypes } from "../../api/mock";
import Scroll from "../../components/Scroll/Scroll";

//mock
const singerList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => {
  return {
    picUrl:
      "https://p2.music.126.net/uTwOm8AEFFX_BYHvfvFcmQ==/109951164232057952.jpg",
    name: "隔壁老樊",
    accountId: 277313426,
  };
}); 

const Singer = () => {
  const [categoryName, setCategoryName] = useState("");
  const [alpha, setAlpha] = useState("");

  let handleAlpha = (val) => {
    setAlpha(val);
    sessionStorage.setItem("alpha", val);
  };

  let handleCategoryName = (val) => {
    setCategoryName(val);
    sessionStorage.setItem("category", val);
  };

  const renderList = ()=>{
    return (
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
      <ListContainer>
        <Scroll>{renderList()}</Scroll>
      </ListContainer>
    </>
  );
};

export default React.memo(Singer);
