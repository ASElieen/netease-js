import { axiosInstance } from "./config";

export const getBannerRequest = ()=>{
    return axiosInstance.get('/banner')
}

export const getRecommendListRequest = ()=>{
    return axiosInstance.get("/personalized");
}

export const getHotSingerListRequest = (count=0)=>{
    return axiosInstance.get(`/top/artists?offset=${count}`);
}

//count为几在底部添加几个
export const getSingerListRequest = (categoryName, alpha, count=0,area=-1) => {
  return axiosInstance.get(
    `/artist/list?type=${categoryName}&initial=${alpha.toLowerCase()}&offset=${count}&area=${area}`
  );
};

export const getRankListRequest = ()=>{
  return axiosInstance.get(`/toplist/detail`);
}

export const getAlbumDetailRequest = (id) => {
  return axiosInstance.get(`/playlist/detail?id=${id}`);
};

export const getSingerInfoRequest = (id) => {
  return axiosInstance.get(`/artists?id=${id}`);
};

export const getLyricRequest = (id) => {
  return axiosInstance.get(`/lyric?id=${id}`);
};