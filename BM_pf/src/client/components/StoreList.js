import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import blankThumbnail from './images/blankThumbnail.png'

const propTypes = {
  storeLists: PropTypes.array
};
const defaultProps = {
  storeLists: []
};

// **pathname /menu 이후에 나오는 것에 따라 DB에 다르게 요청
class StoreList extends Component {
    state = {

    }
    componentDidMount(){
      setTimeout(()=>{
        const headerHeight = $('.header').height();
        const headerHeigthPixel = headerHeight+"px";
        // console.log(headerHeigthPixel);
        $('.section').css('margin-top', headerHeigthPixel)
      },0);
    }
    render() {
      // **item.availNow 에 따라 준비중 표시 (스타일)
      // **백앤드에서 별점계산하는 로직필요
      // **key 값 _id 로 변경하기
      const mapToStoreList = (arr) => {
        return arr.map((item, i) => {
          let linkPath = "/menu/"+item.categories+"/"+item._id+"/1";
          let availNowStyle = {color : "black"};
          return (
            <Link to={linkPath} className="store-list-item" key={i} style={item.availNow?availNowStyle:undefined}>
              {item.thumbNail===''?<img src={blankThumbnail} alt={"thumbnail for '"+item.name+"'"} className="circle responsive-img"/>:<img src={item.thumbNail} alt={"thumbnail for '"+item.name+"'"} className="circle responsive-img"/>}
              {item.availNow?undefined:<div className="prepare-container">준비중</div>}
              <div className="store-list-texts">
                <div className="store-list-name">{item.name}</div>
                <div>★ {item.starRate} 최근리뷰 {item.reviews.length}</div>
                <div className="list-inform-overflow">{item.explain}</div>
                <div>배달 소요시간: 약 {item.deliveryTime===''||item.deliveryTime===undefined?"-":item.deliveryTime}분</div>
              </div>
              <div className="store-list-arrow hanna">></div>
            </Link>
          );
        })
      }
        return(
            <div className="store-list-container">
              {mapToStoreList(this.props.storeLists)}
            </div>
        );
    }
}

StoreList.propTypes = propTypes;
StoreList.defaultProps = defaultProps;

export default StoreList;
