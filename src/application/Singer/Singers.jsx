import React from 'react'
import { NavContainer } from './SingerStyle'
import HorizenItem from '../../baseUI/Horizen-item/HorizenItem'
import { categoryTypes,alphaTypes } from '../../api/mock'

const Singer = () => {
  return (
    <NavContainer>
      <HorizenItem list={categoryTypes} title={"分类(默认热门)"} />
      <HorizenItem list={alphaTypes} />
    </NavContainer>
  );
}

export default React.memo(Singer);