import commonStyle from "../../assets/commonStyle";
import styled from "styled-components";

export const SliderContainer = styled.div`
position: relative;
box-sizing: border-box;
width: 100%;
height: 100%;
margin: auto;
background: white;
//红色过渡背景
.before{
    position: absolute;
    top: 0;
    height: 60%;
    width: 100%;
    background: ${commonStyle["theme-color"]};
}

.slider-container{
    position: relative;
    width: 98%;
    height: 160px;
    overflow: hidden;
    margin: auto;
    border-radius: 6px;
    //图片容器
    .slider-nav{
        position: absolute;
        display: block;
        width: 100%;
        height: 100%;
    }
}
`;