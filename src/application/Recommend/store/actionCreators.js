import * as actionTypes from './constants';
import { fromJS } from 'immutable';
import { getBannerRequest, getRecommendListRequest } from '../../../api/request'


export const changeBannerList = (data) => ({
  type: actionTypes.CHANGE_BANNER,
  data: fromJS(data),
});

export const changeRecommendList = data => ({
  type: actionTypes.CHANGE_RECOMMEND_LIST,
  data: fromJS(data),
});

export const getBannerList = () => {
  return dispatch => {
    getBannerRequest().then(data => {
      console.log(data);
      dispatch(changeBannerList(data.banners))
    }).catch(err => {
      console.log('轮播图传输错误！');
    })
  }
}

export const getRecommendList = () => {
  return (dispatch) => {
    getRecommendListRequest().then(data => {
      console.log(data);
      dispatch(changeRecommendList(data.result));
    }).catch(() => {
      console.log("推荐歌单数据传输错误");
    });
  }
};