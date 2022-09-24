import React, { useState } from "react";
import { NavContainer } from "./SingerStyle";
import HorizenItem from "../../baseUI/Horizen-item/HorizenItem";
import { categoryTypes, alphaTypes } from "../../api/mock";

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
  return (
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
  );
};

export default React.memo(Singer);
