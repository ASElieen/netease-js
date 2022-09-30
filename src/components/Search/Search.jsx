import React,{useState,useEffect,useCallback} from 'react'
import {useNavigate} from 'react-router-dom'
import { Container } from './SearchStyle'
import {CSSTransition} from 'react-transition-group'
import SearchBox from '../../baseUI/SearchBox/SearchBox'

const Search = () => {
    const [show,setShow] = useState(false)
    const [query,setQuery] = useState('')
    const navigate = useNavigate()
    useEffect(()=>{
        setShow(true)
    },[])

    const searchBack = useCallback(()=>{
      setShow(false)
    },[])

    const handleQuery = (q) => {
      setQuery(q);
    };
  return (
    <CSSTransition
    in={show}
    timeout={300}
    appear={true}
    classNames='fly'
    unmountOnExit
    onExited={()=>navigate(-1)}>
        <Container>
            <div className='search_box_wrapper'>
              <SearchBox back={searchBack} newQuery={query} handleQuery={handleQuery}></SearchBox>
            </div>
        </Container>
    </CSSTransition>
  )
}

export default Search