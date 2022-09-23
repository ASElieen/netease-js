import React, { useEffect } from "react";
import { SliderContainer } from "./SliderStyle";
import { Swiper } from "antd-mobile";
import { getBannerImgs } from "../../store/Slices/bannerSlice";
import { useDispatch, useSelector } from "react-redux";

const Slider = () => {
  const dispatch = useDispatch();
  const { bannerImg, isLoading } = useSelector((store) => store.banner);

  useEffect(() => {
    if (!bannerImg.length) {
      dispatch(getBannerImgs());
    }
  });

  const items =
    !isLoading &&
    bannerImg.map((item, index) => (
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
          autoplay
          loop
          className="slider-nav"
          indicatorProps={{ color: "white" }}
        >
          {items}
        </Swiper>
      </div>
    </SliderContainer>
  );
};

export default React.memo(Slider);
