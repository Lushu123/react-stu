import React, { useState } from 'react'
import Horizen from '../../baseUI/horizen-item';
import Scroll from '../../baseUI/scroll'
import { categoryTypes, alphaTypes } from '../../api/config';
import { NavContainer, List, ListItem, ListContainer } from "./style";

//mock 数据
const singerList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(item => {
  return {
    picUrl: "https://p2.music.126.net/uTwOm8AEFFX_BYHvfvFcmQ==/109951164232057952.jpg",
    name: "隔壁老樊",
    accountId: 277313426,
  }
});

const Singers = () => {
  const [category, setCategory] = useState('');
  const [alpha, setAlpha] = useState('');

  const handleUpdateAlpha = (val) => {
    setAlpha(val);
  }

  const handleUpdateCatetory = (val) => {
    setCategory(val);
  }
  const renderSingerList = () => {
    return (
      <List>
        {
          singerList.map((item, index) => (
            <ListItem key={item.accountId + '' + index}>
              <div className="img_wrapper">
                <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music" />
              </div>
              <span className="name">{item.name}</span>
            </ListItem>
          ))
        }
      </List>
    )
  }
  return (
    <NavContainer>
      <Horizen list={categoryTypes}
        title={"分类 (默认热门):"}
        handleClick={handleUpdateCatetory}
        oldVal={category}></Horizen>
      <Horizen list={alphaTypes}
        title={"首字母:"}
        handleClick={val => handleUpdateAlpha(val)}
        oldVal={alpha}></Horizen>
      <ListContainer>
        <Scroll>
          {renderSingerList()}
        </Scroll>
      </ListContainer>
    </NavContainer>
  )

}

export default React.memo(Singers)
