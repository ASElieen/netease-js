import commonStyle from "../../assets/commonStyle";
import styled from "styled-components";

export const List = styled.div`
display: flex;
flex-direction: row;
align-items: center;
height: 30px;
overflow: hidden;
>span:first-of-type{
    display: block;
    flex: 0 0 auto;
    padding: 5px 0;
    margin-right: 5px;
    color: gray;
    font-size: ${commonStyle['font-size-m']};
}
`

export const ListItem = styled.span`
flex: 0 0 auto;
font-size: ${commonStyle['font-size-m']};
padding: 5px 8px;
border-radius: 10px;
&.selected{
    color: ${commonStyle['theme-color']};
    border: 1px solid ${commonStyle['theme-color']};
    opacity: 0.8;
}
`