import React, { Component } from 'react';
import PropTypes from 'prop-types';
import home from './images/home.png';
import saveStore from './images/saveStore.png';
import cart from './images/cart.png';
import my from './images/my.png';
import { Link } from 'react-router-dom';

const propTypes = {
  currentUserId: PropTypes.string
};
const defaultProps = {
  currentUserId: ''
};

class MenuLine extends Component {
    state = {

    }
    /* 홈으로 이동할 때는 Link가 아닌 a태그를 이용해야 슬라이더 제대로 작동*/
    render() {
      // console.log(this.props.currentUserId)
        return(
            <div className="footer">
              <div className="ml-container">
                <div className="ml-item">
                  <Link to="/">
                    <img src={home} alt="home" className="menu_icon"/>
                    <p>홈</p>
                  </Link>
                </div>
                <div className="ml-item">
                  <Link to="/paied/savedstore">
                    <img src={saveStore} alt="saveStore" className="menu_icon"/>
                    <p>찜한가게</p>
                  </Link>
                </div>
                <div className="ml-item">
                  <Link to="/cart">
                    <img src={cart} alt="cart" className="menu_icon"/>
                    <p>장바구니</p>
                  </Link>
                </div>
                <div className="ml-item">
                  <Link to={this.props.currentUserId==''?"/mypage":"/mypage/"+this.props.currentUserId}>
                    <img src={my} alt="mypage" className="menu_icon"/>
                    <p>My배민</p>
                  </Link>
                </div>
              </div>
            </div>
        );
    }
}

MenuLine.propTypes = propTypes;
MenuLine.defaultProps = defaultProps;

export default MenuLine;
