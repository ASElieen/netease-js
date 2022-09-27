import React, { useEffect, useRef, useState } from "react";
import { ProgressBarWrapper } from "./ProgressStyle";

const ProgressBar = (props) => {
  const progressBar = useRef();
  const progress = useRef();
  const progressBtn = useRef();
  const [touch, setTouch] = useState({});
  const {percentChange} = props

  const progressBtnWidth = 16;

  //处理父组件传来的数据
  const changePercent = ()=>{
    const barWidth = progressBar.current.clientWidth - progressBtnWidth
    const curPercent = progress.current.clientWidth/barWidth //进度计算
    percentChange(curPercent)

  }

  //处理进度条偏移
  const handleOffset = (offsetWidth) => {
    progress.current.style.width = `${offsetWidth}px`;
    progressBtn.current.style.transform = `translate3d(${offsetWidth}px,0,0)`;
  };

  const progressTouchStart = (e) => {
    const startTouch = {};
    startTouch.initiated = true; //表示滑动动作开始
    //touches当前位于屏幕上的所有手指的一个列表
    startTouch.startX = e.touches[0].pageX;
    startTouch.left = progress.current.clientWidth; //当前progress长度
    console.log(startTouch)
    setTouch(startTouch);
  };

  const progressTouchMove = (e) => {
    if (!touch.initiated) return;
    //滑动距离
    const deltaX = e.touches[0].pageX - touch.startX;
    const barWidth = progressBar.current.clientWidth - progressBtnWidth;
    const offsetWidth = Math.min(Math.max(0, touch.left + deltaX), barWidth);
    handleOffset(offsetWidth);
  };

  const progressTouchEnd = () => {
    const endTouch = JSON.parse(JSON.stringify(touch));
    endTouch.initiated = false;
    setTouch(endTouch);
    changePercent()
  };

  //点击进度条进度也相应变化
  const progressClick = (e) => {
    // 返回DOMRect矩形集合(left,bottom......)
    const rect = progressBar.current.getBoundingClientRect();
    const offsetWidth = e.pageX - rect.left;
    handleOffset(offsetWidth);
    changePercent()
  };

  return (
    <ProgressBarWrapper>
      <div className="bar-inner" ref={progressBar} onClick={progressClick}>
        <div className="progress" ref={progress}></div>
        <div
          className="progress-btn-wrapper"
          ref={progressBtn}
          onTouchStart={progressTouchStart}
          onTouchMove={progressTouchMove}
          onTouchEnd={progressTouchEnd}
        >
          <div className="progress-btn"></div>
        </div>
      </div>
    </ProgressBarWrapper>
  );
};

export default ProgressBar;
