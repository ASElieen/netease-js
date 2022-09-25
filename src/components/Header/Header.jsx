import React,{ forwardRef } from 'react'
import { HeaderContainer } from './HeaderStyle'
import {MdArrowBackIosNew} from 'react-icons/md'
import PropTypes from "prop-types";

const Header = forwardRef((props,ref) => {
    const {handleClick,title} = props
  return (
    <HeaderContainer ref={ref}>
        <MdArrowBackIosNew className='iconfont back' onClick={handleClick}/>
        <h1>{title}</h1>
    </HeaderContainer>
  )
});

Header.defaultProps={
    handleClick:()=>{},
    title:'标题'
}

Header.propTypes = {
    handleClick:PropTypes.func,
    title:PropTypes.string
}

export default React.memo(Header);