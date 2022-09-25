import React,{ forwardRef } from 'react'
import { HeaderContainer } from './HeaderStyle'
import {MdArrowBackIosNew} from 'react-icons/md'
import PropTypes from "prop-types";

const Header = forwardRef((props,ref) => {
    const {handleClick,title,isMarquee} = props
  return (
    <HeaderContainer ref={ref}>
      <div className="svg_container">
        <MdArrowBackIosNew className="iconfont back" onClick={handleClick} />
      </div>
      {isMarquee ? (
        <div className="marquee">
          <h1>{title}</h1>
        </div>
      ) : (
        <h1>{title}</h1>
      )}
    </HeaderContainer>
  );
});

Header.defaultProps={
    handleClick:()=>{},
    title:'标题',
    isMarquee:false
}

Header.propTypes = {
    handleClick:PropTypes.func,
    title:PropTypes.string,
    isMarquee:PropTypes.bool
}

export default React.memo(Header);