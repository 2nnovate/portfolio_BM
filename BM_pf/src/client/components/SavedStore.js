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

class SavedStore extends Component {
    state = {

    }
    render() {
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
      const existRender = (arr) => {
        return (
            <div className="store-list-container">
            {mapToStoreList(arr)}
          </div>
        )
      }
        return(
            <div>
              {existRender(this.props.storeLists)}
            </div>
        );
    }
}

SavedStore.propTypes = propTypes;
SavedStore.defaultProps = defaultProps;

export default SavedStore;
