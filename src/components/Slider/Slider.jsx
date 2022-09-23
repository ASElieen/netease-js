import React,{useState,useEffect} from 'react'
import { SliderContainer } from './SliderStyle';
import {Swiper} from 'antd-mobile'

const Slider = (props) => {
    const {bannerList} = props

    const items = bannerList.map((item, index) => (
      <Swiper.Item key={index}>
        <img
          src={item.imageUrl}
          alt=""
          style={{ width: "100%", height: "100%" }}
        />
      </Swiper.Item>
    ));

  return (
    <SliderContainer>
        <div className="before"></div>
      <div className="slider-container">
        <Swiper
        autoplay loop className='slider-nav' indicatorProps={{color:'white'}}>
            {items}
        </Swiper>
      </div>
    </SliderContainer>
  );
}

export default React.memo(Slider)