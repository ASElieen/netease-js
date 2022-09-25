import styled from "styled-components";
import commonStyle from "../../assets/commonStyle";

export const HeaderContainer = styled.div`
  position: fixed;
  padding: 5px 10px;
  padding-top: 0;
  height: 40px;
  width: 100%;
  z-index: 100;
  display: flex;
  align-items: center;
  line-height: 40px;
  /* color: ${commonStyle["font-color-light"]}; */
  color:red;
  .back {
    margin-right: 5px;
    font-size: 20px;
    width: 20px;
  }
  > h1 {
    font-size: ${commonStyle["font-size-l"]};
    font-weight: 700;
  }
`;