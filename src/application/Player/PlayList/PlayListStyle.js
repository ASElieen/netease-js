import styled from "styled-components";
import commonStyle from "../../../assets/commonStyle";

export const PlayListWrapper = styled.div`
  //动画
  &.list-fade-enter {
    opacity: 0;
  }
  &.list-fade-enter-active {
    opacity: 1;
    transition: all 0.3s;
  }
  &.list-fade-exit {
    opacity: 1;
  }
  &.list-fade-exit-active {
    opacity: 0;
    transition: all 0.3s;
  }

  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 1000;
  background-color: ${commonStyle["background-color-shadow"]};
  .list_wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    opacity: 1;
    border-radius: 10px 10px 0 0;
    background-color: ${commonStyle["highlight-background-color"]};
    transform: translate3d(0, 0, 0);
    .list_close {
      text-align: center;
      line-height: 50px;
      background: ${commonStyle["background-color"]};
      font-size: ${commonStyle["font-size-l"]};
      color: ${commonStyle["font-color-desc"]};
    }
  }
`;

export const ScrollWrapper = styled.div`
height: 400px;
overflow: hidden;
`

export const ListHeader = styled.div`
position: relative;
padding: 20px 30px 10px 20px;
.title{
    display: flex;
    align-items: center;
    >div{
        flex: 1;
        .text{
            flex: 1;
            font-size: ${commonStyle['font-size-m']};
            color: ${commonStyle['font-color-desc']}
        }
    }
    .iconfont{
        margin-right: 10px;
        font-size: ${commonStyle['font-size-ll']};
        color: ${commonStyle['theme-color']}
    }
    .clear{
        ${commonStyle.extendClick};
        font-size: ${commonStyle['font-size-l']};
    }
}
`

export const ListContent = styled.div`
  .item {
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 30px 0 20px;
    overflow: hidden;
    .current {
      flex: 0 0 20px;
      width: 20px;
      font-size: ${commonStyle["font-size-s"]};
      color: ${commonStyle["theme-color"]};
    }
    .text {
      flex: 1;
      ${commonStyle.noWarp};
      font-size: ${commonStyle["font-size-m"]};
      color: ${commonStyle["font-color-desc-v2"]};
      .icon-favorite {
        color: ${commonStyle["theme-color"]};
      }
    }
    .like {
      ${commonStyle.extendClick}
      margin-right: 15px;
      font-size: ${commonStyle["font-size-m"]};
      color: ${commonStyle["theme-color"]};
    }
    .delete {
      ${commonStyle.extendClick}
      font-size: ${commonStyle["font-size-s"]};
      color: ${commonStyle["theme-color"]};
    }
  }
`;