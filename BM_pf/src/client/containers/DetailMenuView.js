import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { OrderCartButton } from '../components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { storeOneRequest, orderStoreRequest } from '../actions/store';
import { orderRequest } from '../actions/authentication';

const propTypes = {
};
const defaultProps = {
};

class DetailMenuView extends Component {
    state = {
      store: {
        menus:[{image:"", name:"", price:""}, {image:"", name:"", price:""}, {image:"", name:"", price:""}, {image:"", name:"", price:""}, {image:"", name:"", price:""}, {image:"", name:"", price:""}, {image:"", name:"", price:""}, {image:"", name:"", price:""}],
        options:[{name:"", price:""}]
      },
      nowMenuInform: {},
      multipleCount: 1,
      totalPrice: 0,
      addedOptions: []
    }
    componentDidMount(){
      const headerHeight = $('.header').height();
      const headerHeigthPixel = headerHeight+"px";
      // console.log(headerHeigthPixel);
      const storeFooterHeight = $('.store-order-cart-btn').height()+"px";
      // console.log(storeFooterHeight)
      $('.section').css('margin-top', '60px');
      $('.section').css('margin-bottom', storeFooterHeight);
      $('.footer').css('display', 'none');
      $('.do-nicescrol').css('display', 'none');
      $('.statebar').css('border-bottom', '0');
    }
    componentWillUnmount() {
      $('.footer').css('display', 'block');
      $('.do-nicescrol').css('display', 'block');
      $('.statebar').css('border-bottom', '1px solid #e5e5e5');
    }
    componentWillMount() {
      this.getStoreData();
    }
    getStoreData = () => {
      let storeId = this.props.match.params._id;
      // console.log(storeId);
      return this.props.storeOneRequest(storeId).then(
        ()=>{
          let menuId = this.props.match.params.menu_index;
          let nowMenuIndex = this.props.storeData.menus.findIndex(i=>i._id===menuId)
          this.setState({
            store: this.props.storeData,
            multipleCount: 1,
            totalPrice: this.props.storeData.menus[nowMenuIndex].price,
            nowMenuInform: this.props.storeData.menus[nowMenuIndex]
          });
          $( '.statebar .center .blank' ).text(this.state.store.name);
          // console.log(this.state.store.menus[this.props.match.params.menu_index])
          // console.log(this.state.multipleCount);
          // console.log(this.state.totalPrice)
        }
      );
    }
    handleMultiplier = (e) => {
      this.setState({
        multipleCount: e.target.value
      }).then(
        ()=>{
          this.state.totalPrice=this.state.totalPrice*this.state.multipleCount;
          this.forceUpdate();
        }
      );
    }
    subMultiple = () => {
      this.setState({
        multipleCount: this.state.multipleCount-1
      });
    }
    addMultiple = () => {
      this.setState({
        multipleCount: this.state.multipleCount+1
      });
    }
    handleCheck = (e) => {
      if($(e.target).attr("checked")===undefined){
        $(e.target).attr("checked", true);
        this.setState({
          totalPrice: this.state.totalPrice+Number(e.target.value),
          addedOptions: [...this.state.addedOptions, $(e.target).attr('name')]
        });
      }else if($(e.target).attr("checked")==="checked"){
        $(e.target).attr("checked", false);
        let nowAddedOptions = this.state.addedOptions
        let whatIndex = nowAddedOptions.indexOf($(e.target).attr('name'));
        nowAddedOptions.splice(whatIndex, 1);
        this.setState({
          totalPrice: this.state.totalPrice-Number(e.target.value),
          addedOptions: nowAddedOptions
        });
      }
    }

    handleOrder = (user_id, obj) => {
      return this.props.orderRequest(user_id, obj).then(
        ()=>{
          if(user_id===undefined||user_id===''){
            let $toastContent = $('<span style="color: #FFB4BA">You have to login first!</span>');
            M.toast({html: $toastContent});
            this.props.history.push('/login');
          }
          if(this.props.orderState.status==='SUCCESS'){
            M.toast({html:`주문에 성공했습니다. 배달 소요시간은 약 ${this.props.storeData.deliveryTime}분 입니다.`});
            this.props.history.push('/');
          }else{
            let $toastContent;
            switch(this.props.orderState.error) {
                case 1:
                    $toastContent = $('<span style="color: #FFB4BA">You are not logged in</span>');
                    M.toast({html:$toastContent});
                    setTimeout(()=> {location.reload(false);}, 2000);
                    break;
                case 2:
                    $toastContent = $('<span style="color: #FFB4BA">You have got wrong id value</span>');
                    M.toast({html:$toastContent});
                    break;
                case 3:
                    $toastContent = $('<span style="color: #FFB4BA">There is no user on database</span>');
                    M.toast({html:$toastContent});
                    break;
                default:
                    $toastContent = $('<span style="color: #FFB4BA">Somethig broke</span>');
                    M.toast({html:$toastContent});
                    break;
              }
          }
        }
      )
    }
    handleOrderStore = (store_id) => {
      // ***어째서인지 리덕스 스테이트가 wait에서 변하지 않는다
      // thunk 에서 디스패치를 못넘겨주거나 리덕스에서 처리를 못하는 중....
      return this.props.orderStoreRequest(store_id).then(
        ()=>{
          // console.log(this.props.orderStoreState.error)
          // console.log(this.props.orderStoreState)
          if(this.props.orderStoreState.status==='SUCCESS'){
            M.toast({html:"주문수 1 올라감"});
          }else{
            let $toastContent;
            switch(this.props.orderStoreState.error) {
                case 1:
                    $toastContent = $('<span style="color: #FFB4BA">You have got wrong id value</span>');
                    M.toast({html:$toastContent});
                    break;
                case 2:
                    $toastContent = $('<span style="color: #FFB4BA">You are not logged in</span>');
                    M.toast({html:$toastContent});
                    break;
                case 3:
                    $toastContent = $('<span style="color: #FFB4BA">There is no store on database</span>');
                    M.toast({html:$toastContent});
                    break;
                default:
                    $toastContent = $('<span style="color: #FFB4BA">Somethig broke</span>');
                    M.toast({html:$toastContent});
                    break;
              }
          }
        }
      )
    }
    render() {
      // 다 불러온 뒤에
      // let nthIndex = this.state.store.menus.findIndex(i=>i._id===this.props.match.params.menu_index)
      // if(nthIndex===-1){
      //   nthIndex = 0
      // }else{
      //   nthIndex = this.state.store.menus.findIndex(i=>i._id===this.props.match.params.menu_index)
      // }
      const detailData = this.state.nowMenuInform;
      // console.log(detailData)
      const menuImage = (
        <div className="menu-detail-image" >
          <img src={detailData.image} alt="this-menu's-image" />
        </div>
      )
      const header = (
        <div className="detail-menu-view-header">
          {detailData.image===""||detailData.image===undefined?undefined:menuImage}
          <div className="detail-menu-view-b detail-menu-view-name">{detailData.name}</div>
          <div className="detail-menu-view-price">
            <div className="detail-menu-view-b">가격</div>
            <label>
              <input className="with-gap"type="radio" defaultChecked="checked" value={detailData.price}/>
              <span>{detailData.name}</span>
            </label>
            <div className="price">{detailData.price} 원</div>
          </div>
        </div>
      )
      const mapToOptions = (arr) => {
        return arr.map((item, i) => {
          return (
            <div className="option-itmes"key={i}>
              <label>
                <input type="checkbox" value={item.price}
                  onChange={this.handleCheck} name={item.name}/>
                <span>{item.name}</span>
              </label>
              <div className="price">+{item.price} 원</div>
            </div>
          )
        })
      }
      const multiplier = (
        <div className="multiplier-container">
          <div className="detail-menu-view-b">
            수량
            <div className="sub" onClick={this.subMultiple}>-</div>
            <input className="browser-default multiplier" type="number"
              value={this.state.multipleCount} onChange={this.handleMultiplier}/>
            <div className="add" onClick={this.addMultiple}>+</div>
        </div>
        </div>
      )
      const totalPriceView = (
        <div className="detail-menu-total-price">
          총 주문 금액
          <div className="total-price-now">{this.state.multipleCount*this.state.totalPrice}원</div>
          <div className="min-price">최소 주문 금액 : {this.state.store.minPriceToOrder}</div>
        </div>
      )
      // console.log(this.props.currentUserId)
      // console.log(this.state.store.menus)
        return(
            <div className="section gray-background">
              <div className="detail-menu-view">
                {header}
                <div className="detail-menu-view-options">
                  <div className="detail-menu-view-b">추가선택</div>
                  <div className="detail-menu-view-price">
                    {mapToOptions(this.state.store.options)}
                  </div>
                </div>
                {multiplier}
              </div>
              {totalPriceView}
              <OrderCartButton mode="B"
                               storeName={this.state.store.name}
                               payPrice={this.state.totalPrice}
                               selectedOptions={this.state.addedOptions}
                               multiple={this.state.multipleCount}
                               menu={this.state.nowMenu}
                               minPrice={this.state.store.minPriceToOrder}
                               onOrder={this.handleOrder}
                               currentUserId={this.props.currentUserId}
                               store={this.state.store}
                               onOrderStore={this.handleOrderStore}/>
            </div>
        );
    }
}

DetailMenuView.propTypes = propTypes;
DetailMenuView.defaultProps = defaultProps;

const mapStateToProps = (state) => {
    return {
        currentUser: state.authentication.status.currentUser,
        currentUserId: state.authentication.status.currentUser_id,
        storeData: state.store.oneStore.data,
        storeOneRequestStatus: state.store.oneStore.status,
        orderState: state.authentication.order,
        orderStoreState: state.store.order
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        storeOneRequest: (store_id) => {
            return dispatch(storeOneRequest(store_id));
        },
        orderRequest: (user_id, obj) => {
            return dispatch(orderRequest(user_id, obj));
        },
        orderStoreRequest: (store_id) => {
            return dispatch(orderStoreRequest(store_id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailMenuView);
