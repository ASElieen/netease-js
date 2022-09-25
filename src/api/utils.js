export const getCount = (count) =>{
    if(count<0) return
    if (count < 10000) {
      return count;
    } else if (Math.floor(count / 10000) < 10000) {
      return Math.floor(count / 1000) / 10 + "万";
    } else {
      return Math.floor(count / 10000000) / 10 + "亿";
    }
}

//Singer组件处理map数据
export const handleCategory = (categoryName,category)=>{
  const {type,area} = category.get(categoryName)
  return {type,area}
}

//rank组件处理接口数据
export const filterIndex = (rankList)=>{
  for (let i = 0; i < rankList.length - 1; i++) {
    if (rankList[i].tracks.length && !rankList[i + 1].tracks.length) {
      return i + 1;
    }
  }
}

// 处理歌手列表拼接歌手名字
export const getName = list => {
  let str = "";
  list.map ((item, index) => {
    str += index === 0 ? item.name : "/" + item.name;
    return item;
  });
  return str;
};

//处理useLocation获取到的当前路由地址
export const getUrlId = (url) => {
  const positionArr = url.split("/");
  return positionArr[2];
};