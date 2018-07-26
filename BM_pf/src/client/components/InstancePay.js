import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import blankThumbnail from './images/blankThumbnail.png';
import OrderConfirmPage from './OrderConfirmPage';

const propTypes = {
  orderLists: PropTypes.array
};
const defaultProps = {
  orderLists: []
};

class InstancePay extends Component {
    state = {
      showOrderView: false,
      indexNumber: -1
    }
    toggleView = () => {
      this.setState({
        showOrderView: !this.state.showOrderView
      })
    }
    nthArrayFinder = (e) => {
      // this.props.orderLists 의 몇 번째 원소를 보여 줘야 할지
      let targetId;
      let targetId1 = $(e.target).attr('id');
      let targetId2 = $(e.target).parents().attr('id');
      let targetId3 = $(e.target).parents().parents().attr('id');
      switch(true){
        case targetId1 !== undefined:
        targetId = targetId1;
        break;
        case targetId2 !== undefined:
        targetId = targetId2;
        break;
        case targetId3 !== undefined:
        targetId = targetId3;
        break;
      }
      let nth = targetId.slice(0,1);
      this.setState({
        indexNumber: nth
      });
      this.toggleView();
    }
    render() {
      const mapToStoreList = (arr) => {
        return arr.map((item, i) => {
          let linkPath = "/menu/"+item.categories+"/"+item._id+"/1";
          let availNowStyle = {color : "black"};
          return (
            <div className="store-list-item" onClick={this.nthArrayFinder} id={i+'th_item'}
              key={i} style={availNowStyle}>
              {item.storeImage===''||item.storeImage===undefined?<img src={blankThumbnail} alt={"thumbnail for '"+item.name+"'"} className="circle responsive-img"/>:<img src={item.storeImage} alt={"thumbnail for '"+item.name+"'"} className="circle responsive-img"/>}
              <div className="store-list-texts">
                <div className="store-list-name">{item.storeName}</div>
                <div>주문번호 : {item._id}</div>
                <div>주문시간 : {item.date.created}</div>
              </div>
              <div className="store-list-arrow hanna">></div>
            </div>
          );
        })
      }
      // console.log(this.props.orderLists)
        return(
            <div className="store-list-container">
              {mapToStoreList(this.props.orderLists)}
              {this.state.showOrderView?<OrderConfirmPage
                                        orderData={this.props.orderLists[this.state.indexNumber]}
                                        mode="B"
                                        onCloseB={this.toggleView} />:undefined}
            </div>
        );
    }
}

InstancePay.propTypes = propTypes;
InstancePay.defaultProps = defaultProps;

export default InstancePay;
