import commonStyle from "../../assets/commonStyle";
import styled from "styled-components";

export const ProgressBarWrapper = styled.div`
  height: 30px;

  //进度条的线
  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);
    //红色进度
    .progress {
      position: absolute;
      height: 100%;
      background: ${commonStyle["theme-color"]};
    }
    //进度条按钮部分
    .progress-btn-wrapper {
      position: absolute;
      left: -15px;
      top: -13px;
      width: 30px;
      height: 30px;
      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid ${commonStyle["border-color"]};
        border-radius: 50%;
        background: ${commonStyle["theme-color"]};
      }
    }
  }
`;