import React from 'react'
import { List, ListWrapper, ListItem } from './style.js'
import { getCount } from "../../api/utils";

import LazyLoad from 'react-lazyload'

const RecommendList = (props) => {
  const { recommendList } = props;

  return (
    <ListWrapper>
      <h1 className="title">推荐歌曲</h1>
      <List>
        {
          recommendList.map((item, index) => (
            <ListItem key={item.picUrl + index}>
              <div className="img_wrapper">
                <div className="decorate"></div>
                <LazyLoad placeholder={<img width="100%" height="100%" src={require('./music.png')} alt="music" />}>
                  <img src={item.picUrl + "?param=300*300"} alt="music" height="100%" width="100%" />
                </LazyLoad>
                <div className="play_count">
                  <i className="iconfont play">&#xe885;</i>
                  <span className="count">{getCount(item.playCount)}</span>
                </div>
              </div>
              <div className="desc">{item.name}</div>
            </ListItem>
          ))
        }
      </List>

    </ListWrapper>
  )
}

export default React.memo(RecommendList)
