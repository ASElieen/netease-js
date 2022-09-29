import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { Container } from './SearchStyle'
import {CSSTransition} from 'react-transition-group'

const Search = () => {
    const [show,setShow] = useState(false)
    const navigate = useNavigate()
    useEffect(()=>{
        setShow(true)
    },[])
  return (
    <CSSTransition
    in={show}
    timeout={300}
    appear={true}
    classNames='fly'
    unmountOnExit
    onExited={()=>navigate(-1)}>
        <Container>
            <div onClick={()=>setShow(false)}>返回</div>
        </Container>
    </CSSTransition>
  )
}

export default Search