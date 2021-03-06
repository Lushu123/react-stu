import { axiosInstance } from './config';

export const getBannerRequest = () => {
  return axiosInstance.get('/banner');
};

export const getRecommendListRequest = () => {
  return axiosInstance.get('/personalized');
};

export const getHotSingerListRequest = (count) => {
  return axiosInstance.get(`/top/artists?offset=${count}`);
};

export const getSingerListRequest = (type, area, initial, count) => {
  return axiosInstance.get(
    `/artist/list?type=${type}&area=${area.toLowerCase()}&offset=${count}&initial=${initial}`
  );
};
