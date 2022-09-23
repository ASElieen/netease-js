import styled from 'styled-components'
import commonStyle from '../../assets/commonStyle'

export const Top = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: ${commonStyle["theme-color"]};
  & > span {
    line-height: 40px;
    color: #f1f1f1;
    font-size: 20px;
    //同级
    &.iconfont {
      font-size: 25px;
    }
  }
`;

export const Tab = styled.div`
height: 44px;
display: flex;
flex-direction: row;
justify-content: space-around;
background: ${commonStyle['theme-color']};
a{
    flex: 1;
    padding: 2px 0;
    font-size: 14px;
    color: #e4e4e4;
    &.selected{
        span{
            padding: 3px 0;
            font-weight: 700;
            color: #f1f1f1;
            border-bottom: 2px solid #f1f1f1;
        }
    }
}
`

export const TabItem = styled.div`
height: 100%;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
`