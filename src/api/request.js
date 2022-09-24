import { axiosInstance } from "./config";

export const getBannerRequest = ()=>{
    return axiosInstance.get('/banner')
}

export const getRecommendListRequest = ()=>{
    return axiosInstance.get("/personalized");
}

export const getHotSingerListRequest = (count)=>{
    return axiosInstance.get(`/top/artists?offset=${count}`);
}

//count为几在底部添加几个
export const getSingerListRequest = (categoryName, alpha, count,area=-1) => {
  return axiosInstance.get(
    `/artist/list?type=${categoryName}&initial=${alpha.toLowerCase()}&offset=${count}&area=${area}`
  );
};