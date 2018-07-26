import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const propTypes = {
  blankNum: PropTypes.string,
  image: PropTypes.string
};
const defaultProps = {
  blankNum: "0",
  image: ""
};
// uri 가 바뀌면서 못읽어 온다.... 주소를 어떻게 해야할까? 절대경로?
class BlankView extends Component {
    componentDidMount(){
      const headerHeight = $('.header').height();
      const subTabHeigth = $('.ss-nav-container-box').height();
      const footerHeight = $('.footer').height();
      const documentHeight = $(document).height();
      const sectionShouldHeigth = documentHeight-headerHeight-subTabHeigth-footerHeight+"px";
      // $('.blank').css('height', '580px')
    }
    render() {
      const cartBlankView = (
        <div className="blank">
          <div className="blank-item">
            <img src={this.props.image} alt="saved store is blank" />
            <p className="fistLine">장바구니가 텅 비었있어요</p>
            <p>&nbsp;</p>
          </div>
        </div>
      );
      const defultBlankView = (
        <div className="blank">
          <div className="blank-item">
            <img src={this.props.image} alt="saved store is blank" />
            <p className="fistLine">최근 주문내역이 없어요</p>
            <p>&nbsp;</p>
          </div>
        </div>
      );
      const savedStoreBlankView = (
        <div className="blank">
          <div className="blank-item">
            <img src={this.props.image} alt="saved store is blank" />
            <p className="fistLine">자주찾는 가게를</p>
            <p>찜 해보세요</p>
          </div>
        </div>
      );
      const blankViewRender = (type) => {
        switch(type) {
          case "1":
            return savedStoreBlankView
            break;
          case "2":
            return defultBlankView
            break;
          case "3":
            return defultBlankView
            break;
          case "4":
            return cartBlankView
            break;
        }
      }
      return(
          <div>
            {blankViewRender(this.props.blankNum)}
          </div>
      );
    }
}

BlankView.propTypes = propTypes;
BlankView.defaultProps = defaultProps;

export default BlankView;
