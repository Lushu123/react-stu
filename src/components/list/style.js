import styled from 'styled-components';
import style from '../../assets/global-style';

export const ListWrapper = styled.div`
  max-width: 100%;
  .title {
    font-weight: 700;
    padding-left: 6px;
    font-size: 14px;
    line-height: 60px;
  }
`;
export const List = styled.div`
  width:100%;
  display:flex;
  flex-direction:row;
  flex-wrap:wrap;
  justify-content:space-around;
`;

export const ListItem = styled.div`
  width:32%;
  position:relative;
  .img_wrapper{
    
  }
`;