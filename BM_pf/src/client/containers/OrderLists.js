import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BlankView, SubTab } from '../components';
import { connect } from 'react-redux';
import { getStatusRequest } from '../actions/authentication';

const propTypes = {
};
const defaultProps = {
};

class OrderLists extends Component {
    state = {
      orderList: []
    }
    componentDidMount(){
      setTimeout(()=>{
        const headerHeight = $('.header').height();
        const headerHeigthPixel = headerHeight+"px";
        const footerHeight = $('.footer').height();
        const documentHeight = $(document).height();
        const sectionShouldHeigth = documentHeight-headerHeight-footerHeight+"px";
        $('.section').css('margin-top', headerHeigthPixel);
        $('.header div.statebar').css('border-bottom', 'none');
        // **리덕스 state 로 전달받은 값이 없을 경우에만 실행되도록 설정
        // **아래 조건문 더 수정할 필요 있음...
        if(this.props.records === undefined || this.props.records.length === 0){
          $('.section').css('height', sectionShouldHeigth);
        };
      },0);
    }
    componentWillUnmount(){
      $('.header div.statebar').css('border-bottom', '1px solid #e5e5e5');
    }
    componentWillMount(){
      this.props.getStatusRequest().then(
        ()=>{
          this.setState({
            orderList: this.props.accountInform.order
          })
        }
      )
    }
    render() {
      const blankView = (
        <BlankView blankNum="2"
          image="https://ucarecdn.com/507ead1a-cec1-44e5-b1c2-2e8b1a1c4a48/defaultBlank.png"/>
      )
      const mapToOrderList = (arr) => {
        return arr.map((item, i) => {
          return (
            <div className="order-list-item" key={i}>
              <div>{item.storeName}</div>
              <div>주문 메뉴</div>
              <div>{item.menuName}</div>
              <div>추가 선택</div>
              <div>{item.selectedOptions}</div>
              <div>계</div>
              <div>{item.payPrice}</div>
            </div>
          )
        })
      }
      // console.log(this.props.accountInform)
      // console.log(this.state.orderList)
        return(
            <div className="section">
              <SubTab mode="instancePay"
                      instanceCount={this.state.orderList.length}/>
              <div className="order-list-container">
                {this.state.orderList===undefined||this.state.orderList.length===0?
                blankView : mapToOrderList(this.state.orderList)}
              </div>
            </div>
        );
    }
}

OrderLists.propTypes = propTypes;
OrderLists.defaultProps = defaultProps;

const mapStateToProps = (state) => {
    return {
        currentUser: state.authentication.status.currentUser,
        accountInform: state.authentication.status.account
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
      getStatusRequest: () => {
          return dispatch(getStatusRequest());
      }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderLists);
