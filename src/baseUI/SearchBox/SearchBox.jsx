import React,{useRef,useState,useEffect, useMemo} from 'react'
import { debounce } from '../../api/utils';
import { AiOutlineBackward, AiFillDelete } from "react-icons/ai";
import { SearchBoxWrapper } from './SearchBoxStyle'

const SearchBox = (props) => {
  const queryRef = useRef();
  const [query, setQuery] = useState("");
  // 从父组件热门搜索中拿到的新关键词
  const { newQuery } = props;
  // 父组件针对搜索关键字发请求相关的处理
  const { handleQuery } = props;
  // 根据关键字是否存在决定清空按钮的显示 / 隐藏
  const displayStyle = query ? { display: "block" } : { display: "none" };

  //监听input
  const handleChange = (e) => {
    setQuery(e.currentTarget.value);
  };

  //清空
  const clearQuery = () => {
    setQuery("");
    queryRef.current.focus();
  };

  //进场时出现光标
  useEffect(() => {
    queryRef.current.focus();
  }, []);

  //缓存方法
  let handleQueryDebounce = useMemo(() => {
    return debounce(handleQuery, 500);
  }, [handleQuery]);

  useEffect(() => {
    //防抖
    handleQueryDebounce(query);
  }, [query]);

  //父组件点击了热门搜索的关键字，newQuery 更新
  useEffect(() => {
    if (newQuery !== query) {
      setQuery(newQuery);
    }
  }, [newQuery]);

  return (
    <SearchBoxWrapper>
      <AiOutlineBackward
        className="iconfont icon-back"
        onClick={() => props.back()}
      />
      <input
        type="text"
        ref={queryRef}
        className="box"
        placeholder="搜索歌曲、歌手、专辑"
        value={query}
        onChange={handleChange}
      />
      <AiFillDelete
        className="icon-font icon-delete"
        onClick={clearQuery}
        state={displayStyle}
      />
    </SearchBoxWrapper>
  );
}

export default React.memo(SearchBox);