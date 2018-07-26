import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OrderConfirmPage from './OrderConfirmPage'

const propTypes = {
  mode: PropTypes.string,
  storeName: PropTypes.string,
  payPrice: PropTypes.number,
  selectedOptions: PropTypes.array,
  menu: PropTypes.object,
  multiple: PropTypes.number,
  minPrice: PropTypes.number,
  onOrder: PropTypes.func,
  currentUserId: PropTypes.string,
  store: PropTypes.object,
  onOrderStore: PropTypes.func
};
const defaultProps = {
  mode: "A",
  storeName: "",
  payPrice: 0,
  selectedOptions: [],
  menu: {},
  multiple: 0,
  minPrice: 0,
  onOrder: ()=>{console.log('order function is undefined')},
  currentUserId: '',
  store: {},
  onOrderStore: ()=>{console.log('order store function is undefined')}
};

class OrderCartButton extends Component {
    state = {
      orderConfirm: false
    }
    handleOderViewToggle = () => {
      this.state.orderConfirm = !this.state.orderConfirm
      this.forceUpdate();
    }
    render() {
      const callOrderCart = (
        <div className="store-order-cart-btn">
          <div className="store-order-btn-call">전화주문</div>
          <div className="store-cart-btn">장바구니</div>
        </div>
      )
      const cartOrder = (
        <div className="store-order-cart-btn">
          <div className="store-cart-btn-cart">장바구니 담기</div>
          <div className="store-order-btn"
            onClick={this.handleOderViewToggle}>
            주문하기
          </div>
        </div>
      )
      // console.log(this.props.menu)
        return(
          <div>
            {this.props.mode==="B"?cartOrder:callOrderCart}
            {this.state.orderConfirm?<OrderConfirmPage
                                      storeName={this.props.storeName}
                                      payPrice={this.props.payPrice}
                                      selectedOptions={this.props.selectedOptions}
                                      menu={this.props.menu}
                                      multiple={this.props.multiple}
                                      minPrice={this.props.minPrice}
                                      onClose={this.handleOderViewToggle}
                                      onOrder={this.props.onOrder}
                                      currentUserId={this.props.currentUserId}
                                      store={this.props.store}
                                      onOrderStore={this.props.onOrderStore}/>:undefined}
          </div>
        );
    }
}

OrderCartButton.propTypes = propTypes;
OrderCartButton.defaultProps = defaultProps;

export default OrderCartButton;
