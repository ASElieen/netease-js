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

export const getSingerListRequest = (categoryName, alpha, count=30,area=-1) => {
  return axiosInstance.get(
    `/artist/list?cat=${categoryName}&initial=${alpha.toLowerCase()}&offset=${count}&area=${area}`
  );
};