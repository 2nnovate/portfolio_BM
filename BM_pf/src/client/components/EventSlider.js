import React, { Component } from 'react';
import PropTypes from 'prop-types';
import eBanner1 from './images/eBanner1.png';
import eBanner2 from './images/eBanner2.png';
import eBanner3 from './images/eBanner3.png';
import { Link } from 'react-router-dom';

const propTypes = {
};
const defaultProps = {
};

class EventSlider extends Component {
    state = {

    }
    // 한 페이지 안에서 계속 렌더링 되는 것을 방지
    // *props 를 통해 정보 받아올 것(DB 에서 프론트엔드로-리덕스)
    shouldComponentUpdate(nextProps, nextState) {
      // 리턴값이  true 이면 render 메소드 실행
      let update = JSON.stringify(this.props) !== JSON.stringify(nextProps);
      return update;
    }
    render() {
        // console.log("Redered EventSlider component");
        const ESlider = (
          <div className="carousel carousel-slider event-slider">
            <Link className="carousel-item" to="/event"><img src={eBanner1} alt="event_slider_item1" /></Link>
            <Link className="carousel-item" to="/event"><img src={eBanner2} alt="event_slider_item2" /></Link>
            <Link className="carousel-item" to="/event"><img src={eBanner3} alt="event_slider_item2" /></Link>
          </div>
        );
        return(
          <div>
            {ESlider}
          </div>
        );
    }
}

EventSlider.propTypes = propTypes;
EventSlider.defaultProps = defaultProps;

export default EventSlider;
