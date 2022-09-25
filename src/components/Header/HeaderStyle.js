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
  color: ${commonStyle["font-color-light"]};
  .svg_container {
    width: 10%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    .back {
      font-size: 20px;
      width: 20px;
    }
  }
  .marquee {
    width: 80%;
    height: 35px;
    overflow: hidden;
    position: relative;
    animation: marquee 10s linear infinite;
    > span {
      width: 100%;
      font-size: 15px;
    }
    @keyframes marquee {
      from {
        left: 100%;
      }
      to {
        left: -100%;
      }
    }
  }
  > h1 {
    font-size: ${commonStyle["font-size-l"]};
    font-weight: 700;
  }
`;