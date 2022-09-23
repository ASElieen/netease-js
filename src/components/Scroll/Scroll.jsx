import React,{useState,useRef,useEffect,useImperativeHandle} from 'react'
import PropTypes from 'prop-types'
import BScroll from 'better-scroll'
import { forwardRef } from 'react'
import { ScrollContainer } from './ScrollStyle'

//forwardRef使得函数组件可以被上层组件调用ref
const Scroll = forwardRef((props,ref) => {
  const {
    direction,
    click,
    refresh,
    pullUpLoading,
    pullDownLoading,
    bounceTop,
    bounceBottom,
  } = props;
  const { pullUp, pullDown, onScroll } = props;

  //better-scroll实例
  const [bScroll, setBScroll] = useState();

  //初始化bs实例需要的DOM
  const scrollContainerRef = useRef();

  useEffect(() => {
    const scroll = new BScroll(scrollContainerRef.current, {
      scrollX: direction === "horizental",
      scrollY: direction === "vertical",
      probeType: 3, //决定是否派发 scroll 事件 0123可选 3为任意时候都派发
      click: click,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom,
      },
    });

    setBScroll(scroll);

    return () => {
      setBScroll(null);
    };
  }, []);

  //渲染后刷新实例防止无法滑动
  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh();
    }
  });

  //绑定scroll到实例上
  useEffect(() => {
    if (!bScroll || !onScroll) return;
    //on(type, fn, context) context默认this
    bScroll.on("scroll", (scroll) => {
      onScroll(scroll);
    });
    return () => {
      bScroll.off("scroll");
    };
  }, [onScroll, bScroll]);

  //手势上拉动作判断
  useEffect(() => {
    if (!bScroll || !pullUp) return;
    //scrollEnd滚动结束，或者让一个正在滚动的 content 强制停止
    bScroll.on("scrollEnd", () => {
      //滑动到底部判断
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUp();
      }
    });

    return () => {
      bScroll.off("scrollEnd");
    };
  }, [pullUp, bScroll]);

  //手势下滑动作判断
  useEffect(() => {
    if (!bScroll || !pullDown) return;
    //touchEnd用户手指离开滚动区域
    bScroll.on("touchEnd", (pos) => {
      //下拉动作判断
      if (pos.y > 50) {
        pullDown();
      }
    });
    return () => {
      bScroll.off("touchEnd");
    };
  }, [pullDown, bScroll]);

  //向外界暴露组件方法 和forwardRef一起使用 ref已在forwardRef中默认传入
  useImperativeHandle(ref, () => ({
    //暴露refresh
    refresh() {
      if (bScroll) {
        bScroll.refresh();
        bScroll.scrollTo(0, 0);
      }
    },

    //暴露getBscroll
    getBscroll() {
      if (bScroll) {
        return bScroll;
      }
    },
  }));

  return (
    <ScrollContainer ref={scrollContainerRef}>{props.children}</ScrollContainer>
  );
});

Scroll.defaultProps = {
  direction: "vertical",
  click: true,
  refresh: true,
  onScroll: null,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true,
};

Scroll.propTypes = {
  direction: PropTypes.oneOf(["vertical", "horizental"]), // 滚动的方向
  click: PropTypes.bool, // 是否支持点击
  refresh: PropTypes.bool, // 是否刷新
  onScroll: PropTypes.func, // 滑动触发的回调函数
  pullUp: PropTypes.func, // 上拉加载逻辑
  pullDown: PropTypes.func, // 下拉加载逻辑
  pullUpLoading: PropTypes.bool, // 是否显示上拉 loading 动画
  pullDownLoading: PropTypes.bool, // 是否显示下拉 loading 动画
  bounceTop: PropTypes.bool, // 是否支持向上吸顶
  bounceBottom: PropTypes.bool, // 是否支持向下吸底
};

export default Scroll