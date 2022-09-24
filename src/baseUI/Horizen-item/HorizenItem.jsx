import React,{useRef,useEffect} from 'react'
import Scroll from '../../components/Scroll/Scroll'
import { List,ListItem } from './horizenItemStyle'
import {PropTypes} from 'prop-types'

const HorizenItem = (props) => {
    const {list,oldVal,title} = props
    const {handleClick} = props
    const category = useRef()

    //初始化内容宽度
    useEffect(()=>{
        let categoryDOM = category.current
        let tagElements = categoryDOM.querySelectorAll('span')
        let totalWidth = 0
        Array.from(tagElements).forEach(eles=>{
            totalWidth += eles.offsetWidth
        })
        categoryDOM.style.width = `${totalWidth}px`
    },[])

  return (
    <Scroll direction={'horizental'}>
        <div ref={category}>
            <List>
                <span>{title}</span>
                {list.map(item=>(
                    <ListItem key={item.key} className={`${oldVal === item.key?'selected':''}`} onClick={()=>handleClick(item.key)}>
                        {item.name}
                    </ListItem>
                ))}
            </List>
        </div>
    </Scroll>
  )
}

HorizenItem.defaultProps = {
    list:[], //列表数据
    oldVal:'', //当前选中的值
    title:'', //列表左边标题
    handleClick:null //点击函数
}

HorizenItem.propTypes = {
    list:PropTypes.array,
    oldVal:PropTypes.string,
    title:PropTypes.string,
    handleClick:PropTypes.func
}


export default React.memo(HorizenItem);