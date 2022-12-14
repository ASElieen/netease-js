import styled from "styled-components";
import commonStyle from "../../assets/commonStyle";

export const NavContainer = styled.div`
box-sizing: border-box;
position: fixed;
top: 95px;
width: 100%;
padding: 5px;
overflow: hidden;
`

export const ListContainer = styled.div`
position: fixed;
top: 160px;
left: 0;
bottom: 0;
overflow: hidden;
width: 100%;
`
export const List = styled.div`
display: flex;
margin: auto;
flex-direction: column;
overflow: hidden;
.title{
    margin: 10px 0 10px 0;
    color: ${commonStyle['font-color-desc']};
    font-size: ${commonStyle['font-size-s']};
}
`

export const ListItem = styled.div`
box-sizing: border-box;
display: flex;
flex-direction: row;
margin: 0 50px;
padding: 5px 0;
align-items: center;
border-bottom: 1px solid ${commonStyle['border-color']};
.img_wrapper{
    margin-right: 20px;
    img{
        border-radius: 3px;
        width: 50px;
        height: 50px;
    }
}
.name{
    font-size: ${commonStyle['font-size-m']};
    color: ${commonStyle['font-color-desc']};
    font-weight: 500;
}
`

export const LoadingContainer = styled.div`
display: flex;
width: 100%;
height: 100%;
justify-content: center;
align-items: center;
`