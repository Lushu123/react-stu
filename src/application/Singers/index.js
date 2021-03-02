import React, { useEffect, useState } from 'react';
import { forceCheck } from 'react-lazyload';
import { connect } from 'react-redux';
import { alphaTypes, areaTypes, singerTypes } from '../../api/config';
import Horizen from '../../baseUI/horizen-item';
import Loading from '../../baseUI/loading';
import Scroll from '../../baseUI/scroll';
import {
  changeEnterLoading,
  changePageCount,
  changePullDownLoading,
  changePullUpLoading,
  getHotSingerList,
  getSingerList,
  refreshMoreHotSingerList,
  refreshMoreSingerList,
} from './store/actionCreators';
import { List, ListContainer, ListItem, NavContainer } from './style';

const Singers = (props) => {
  const [type, setType] = useState('');
  const [area, setArea] = useState('');
  const [initial, setInitial] = useState('');

  const {
    singerList,
    pageCount,
    enterLoading,
    pullDownLoading,
    pullUpLoading,
  } = props;
  const {
    getHotSingerDispatch,
    updateDispatch,
    pullUpRefreshDispatch,
    pullDownRefreshDispatch,
  } = props;

  useEffect(() => {
    getHotSingerDispatch();
  }, []);

  useEffect(() => {}, [pageCount]);

  useEffect(() => {
    if (!isHot()) {
      updateDispatch(type, area, initial);
    }
  }, [type, area, initial]);

  // const handleUpdateAlpha = (val) => {
  //   setAlpha(val);
  //   updateDispatch(type, val);
  // };

  // const handleUpdateCategory = (val) => {
  //   setCategory(val);
  //   updateDispatch(val, initial);
  // };

  const handlePullUp = () => {
    pullUpRefreshDispatch(type, area, initial, pageCount + 1, isHot());
  };

  const handlePullDown = () => {
    pullDownRefreshDispatch(type, area, initial, isHot());
  };
  const isHot = () => {
    return !(type || area || initial);
  };
  const renderSingerList = () => {
    return (
      <List>
        {singerList.toJS().map((item, index) => (
          <ListItem key={item.accountId + '' + index}>
            <div className="img_wrapper">
              <img
                src={`${item.picUrl}?param=300x300`}
                width="100%"
                height="100%"
                alt="music"
              />
            </div>
            <span className="name">{item.name}</span>
          </ListItem>
        ))}
      </List>
    );
  };
  return (
    <NavContainer>
      <Horizen
        list={singerTypes}
        title={'分类 (默认热门):'}
        handleClick={(val) => setType(val)}
        oldVal={type}
      />
      <Horizen
        list={areaTypes}
        title={'地区:'}
        handleClick={(val) => setArea(val)}
        oldVal={area}
      />
      <Horizen
        list={alphaTypes}
        title={'首字母:'}
        handleClick={(val) => setInitial(val)}
        oldVal={initial}
      />
      <ListContainer>
        <Scroll
          pullUp={handlePullUp}
          pullDown={handlePullDown}
          pullUpLoading={pullUpLoading}
          pullDownLoading={pullDownLoading}
          onScroll={forceCheck}
        >
          {renderSingerList()}
        </Scroll>
        <Loading show={enterLoading} />
      </ListContainer>
    </NavContainer>
  );
};

const mapStateToProps = (state) => ({
  singerList: state.getIn(['singers', 'singerList']),
  enterLoading: state.getIn(['singers', 'enterLoading']),
  pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
  pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
  pageCount: state.getIn(['singers', 'pageCount']),
});
const mapDispatchToProps = (dispatch) => {
  return {
    getHotSingerDispatch() {
      dispatch(getHotSingerList());
    },
    updateDispatch(type, area, initial) {
      dispatch(changePageCount(0)); //由于改变了分类，所以pageCount清零
      dispatch(changeEnterLoading(true)); //loading，现在实现控制逻辑，效果实现放到下一节，后面的loading同理
      dispatch(getSingerList(type, area, initial));
    },
    // 滑到最底部刷新部分的处理
    pullUpRefreshDispatch(type, area, initial, count, hot) {
      dispatch(changePullUpLoading(true));
      dispatch(changePageCount(count));
      if (hot) {
        dispatch(refreshMoreHotSingerList());
      } else {
        dispatch(refreshMoreSingerList(type, area, initial));
      }
    },
    //顶部下拉刷新
    pullDownRefreshDispatch(type, area, initial, hot) {
      dispatch(changePullDownLoading(true));
      dispatch(changePageCount(0)); //属于重新获取数据
      if (hot) {
        dispatch(getHotSingerList());
      } else {
        dispatch(getSingerList(type, area, initial));
      }
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Singers));
