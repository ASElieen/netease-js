import styled from "styled-components";
import commonStyle from "../../assets/commonStyle";

export const SearchBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0 6px;
  padding-right: 20px;
  height: 40px;
  background: ${commonStyle["theme-color"]};
  .icon-back {
    font-size: 24px;
    color: ${commonStyle["font-color-light"]};
  }
  .box {
    flex: 1;
    margin: 0 5px;
    line-height: 18px;
    background: ${commonStyle["theme-color"]};
    color: ${commonStyle["highlight-background-color"]};
    font-size: ${commonStyle["font-size-m"]};
    outline: none;
    border: none;
    border-bottom: 1px solid ${commonStyle["border-color"]};
    &::placeholder {
      color: ${commonStyle["font-color-light"]};
    }
  }
  .icon-delete {
    font-size: 16px;
    color: ${commonStyle["background-color"]};
  }
`;