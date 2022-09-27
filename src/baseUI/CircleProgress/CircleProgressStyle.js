import styled from "styled-components";
import commonStyle from "../../assets/commonStyle";

//SVG实现环形
export const CircleWrapper = styled.div`
  position: relative;
  circle {
    //当前对象轮廓宽度
    stroke-width: 8px;
    transform-origin: center;
    &.progress-background {
      transform: scale(0.9);
      stroke: rgba(212, 68, 57, 0.5);
    }
    &.progress-bar {
      transform: scale(0.9) rotate(-90deg);
      stroke: ${commonStyle["theme-color"]};
    }
  }
`;