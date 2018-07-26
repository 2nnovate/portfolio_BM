import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const propTypes = {
  storeName: PropTypes.string,
  payPrice: PropTypes.number,
  selectedOptions: PropTypes.array,
  menu: PropTypes.object,
  multiple: PropTypes.number,
  minPrice: PropTypes.number,
  onClose: PropTypes.func,
  onOrder: PropTypes.func,
  currentUserId: PropTypes.string,
  store: PropTypes.object,
  onOrderStore: PropTypes.func,
  mode: PropTypes.string,
  orderData: PropTypes.object,
  onCloseB: PropTypes.func
};
const defaultProps = {
  storeName: "",
  payPrice: 0,
  selectedOptions: [],
  menu: {},
  multiple: 0,
  minPrice: 0,
  onClose: ()=>{console.log("close function is undefined")},
  onOrder: ()=>{console.log('order function is undefined')},
  currentUserId: '',
  store: {},
  onOrderStore: ()=>{console.log('order store function is undefined')},
  mode: "A",
  orderData: {},
  onCloseB: ()=>{console.log("close function is undefined")}
};

class OrderConfirmPage extends Component {
    state = {

    }
    handleClose = () => {
      this.props.onClose()
    }
    stringToSelectedOptions = (arr) => {
      let toBeString;
      for(var i=0; i < arr.length; i++){
        if(i==0){
          toBeString = "("+arr[i];
        }else{
          toBeString = toBeString+", "+arr[i];
        }
        if(i===arr.length-1){
          toBeString = toBeString+")";
          return toBeString
        }
      }
    }
    handleOrder = () => {
      const arrToString = this.stringToSelectedOptions(this.props.selectedOptions);
      const obj = {
        storeId: this.props.store._id,
        storeImage: this.props.store.thumbNail,
        storeCategories: this.props.store.categories,
        storeName: this.props.storeName,
        menuPrice: this.props.menu.price,
        menuName: this.props.menu.name,
        selectedOptions: arrToString,
        optionPrice: this.props.payPrice-this.props.menu.price,
        payPrice: this.props.payPrice
      }
      // console.log(obj)
      this.props.onOrder(this.props.currentUserId, obj);
      this.props.onOrderStore(this.props.store._id);
    }
    render() {
      const ordered = this.props.orderData;
      const menuImage = (
        <img src={this.props.menu.image} alt="this-menu's-image" />
      )
      const orderConfirmHeader = (
        <div className="order-comfirm-header">
          <div className="order-comfirm-title">주문확인</div>
          <div onClick={this.handleClose}>X</div>
          <div className="order-comfirm-store-name">{this.props.storeName}</div>
        </div>
      )
      const orderedHeader = (
        <div className="order-comfirm-header">
          <div className="order-comfirm-title">주문내역 상세</div>
          <div onClick={this.props.onCloseB}>X</div>
          <Link to={"/menu/"+ordered.storeCategories+"/"+ordered.storeId} className="ordered-store-name">
            {ordered.storeName} >
          </Link>
          <Link to={"/menu/"+ordered.storeCategories+"/"+ordered.storeId}
                  className="order-again">
            다시 주문하기
          </Link>
        </div>
      )
      const stringToSelectedOptions = (arr) => {
        let toBeString;
        for(var i=0; i < arr.length; i++){
          if(i==0){
            toBeString = "("+arr[i];
          }else{
            toBeString = toBeString+", "+arr[i];
          }
          if(i===arr.length-1){
            toBeString = toBeString+")";
            return toBeString
          }
        }
      }
      const orderConfirmState = (
        <div className="order-comfirm-section">
          {this.props.menu.image==""||this.props.menu.image==undefined?undefined:menuImage}
          <div className="order-menu-title">{this.props.menu.name}</div>
          <div className="order-menu-informs">
            <div>
              <div className="title-bold-font">가격</div>
              <div className="value-right-align">{this.props.menu.price}원</div>
            </div>
            <div>
              <div className="title-bold-font">추가선택</div>
              <div className="value-right-align">+{this.props.payPrice-this.props.menu.price}원</div>
              <div className="value-right-align-small">{stringToSelectedOptions(this.props.selectedOptions)}</div>
            </div>
            <div className="more-bottom">
              <div className="title-bold-font">수량</div>
              <div className="value-right-align">{this.props.multiple}</div>
            </div>
          </div>
          <div className="order-menu-result">
            <div className="title-bold-font">소계</div>
            <div className="value-right-align">{this.props.payPrice}원</div>
          </div>
        </div>
      )
      const orderedState = (
        <div className="order-comfirm-section">
          <div className="order-menu-title">주문정보</div>
          <div className="order-menu-informs">
            <div>
              <div className="title-bold-font">주문번호</div>
              <div className="value-right-align">{ordered._id}</div>
            </div>
            <div>
              <div className="title-bold-font">주문시간</div>
              <div className="value-right-align">{ordered.date===undefined?undefined:ordered.date.created}</div>
            </div>
            <div>
              <div className="title-bold-font">주문내용</div>
              <div className="value-right-align">{ordered.menuName}</div>
              <div className="value-right-align-small">{ordered.selectedOptions}</div>
            </div>
            <div className="more-bottom">
              <div className="title-bold-font">주문금액</div>
              <div className="value-right-align">{ordered.payPrice}원</div>
            </div>
          </div>
        </div>
      )
      const resultView = (
        <div className="order-comfirm-footer">
          <div className="order-comfirm-footer-title">총 주문 금액</div>
          <div className="order-comfirm-footer-price">{this.props.payPrice}원</div>
          <div>최소 주문 금액 : {this.props.minPrice}원</div>
        </div>
      )
      const orderedResult =(
        <div className="okay-to-order" onClick={this.props.onCloseB}>
          확인완료
        </div>
      )
      const okayButton = (
        <div className="okay-to-order" onClick={this.handleOrder}>
          주문하기
        </div>
      )
      // console.log(this.props.selectedOptions)
      // console.log(this.props.onClose)
      // console.log(this.props.currentUserId==='')
      // console.log(this.props.onOrderStore)
      console.log(this.props.store.thumbNail)
        return(
            <div className="order-comfirm">
              <div className="order-comfirm-box">
                <div>
                  {this.props.mode==="A"?orderConfirmHeader:undefined}
                  {this.props.mode==="A"?orderConfirmState:undefined}
                  {this.props.mode==="A"?resultView:undefined}
                  {this.props.mode==="A"?okayButton:undefined}
                  {this.props.mode==="B"?orderedHeader:undefined}
                  {this.props.mode==="B"?orderedState:undefined}
                  {this.props.mode==="B"?orderedResult:undefined}
                </div>
              </div>
            </div>
        );
    }
}

OrderConfirmPage.propTypes = propTypes;
OrderConfirmPage.defaultProps = defaultProps;

export default OrderConfirmPage;
