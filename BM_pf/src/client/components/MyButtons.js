import React, { Component } from 'react';
import PropTypes from 'prop-types';
import point from './images/point.png';
import coupon from './images/coupon.png';
import records from './images/records.png';
import reviews from './images/reviews.png';
import CS from './images/CS.png';
import { Link } from 'react-router-dom';

const propTypes = {
  onLogout: PropTypes.func,
  isLoggedIn: PropTypes.bool
};
const defaultProps = {
  onLogout: () => {console.log('logout function is undefined')},
  isLoggedIn: false
};

class MyButtons extends Component {
    state = {

    }
    render() {
      const otherButtonsArray = [{img: point, name:"포인트"}, {img: coupon, name:"쿠폰함"},
                                {img: records, name:"주문내역"}, {img: reviews, name:"리뷰관리"}];
      const CsArray = [{link: "/notice", name: "공지사항"}, {link: "/event", name: "이벤트"},
                      {link: "/requestads", name: "광고문의"}, {link: "/1on1", name: "1:1 문의하기"},
                      {link: "/config", name: "환경설정"}]
        const loginButton = (
          <Link to="/login" className="login-container">
            <div className="login-item">로그인</div>
          </Link>
        );
        const logoutButton = (
          <div to="/login" className="login-container" onClick={this.props.onLogout}>
            <div className="login-item">로그아웃</div>
          </div>
        );
        const mapToButtons = (arr) => {
          return arr.map((item, i) => {
            return (
              <div className="ob-item" key={i}>
                <img src={item.img} alt={item.name} />
                <p>{item.name}</p>
              </div>
            );
          })
        }
        const mapToCS = (arr) => {
          return arr.map((item, i) => {
            return (
              <Link to="/event" className="cs-item" key={i}>
                <p>{item.name}</p>
              </Link>
            );
          })
        }
        // console.log(this.props.isLoggedIn)
        return(
            <div>
              {this.props.isLoggedIn?logoutButton:loginButton}
              <div className="ob-container">
                {mapToButtons(otherButtonsArray)}
              </div>
              <div className="cs-container">
                <div className="cs-item-blank">
                  <div className="brown-line">
                    <img src={CS} alt="CS images" />
                    <div className="arrow hanna">></div>
                    <p>배달의민족 안심하고 이용하세요</p>
                    <h4 className="hanna">고객 안심 센터</h4>
                  </div>
                </div>
                {mapToCS(CsArray)}
              </div>
            </div>
        );
    }
}

MyButtons.propTypes = propTypes;
MyButtons.defaultProps = defaultProps;

export default MyButtons;
