import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cr1 from './images/cr1.png';
import cr2 from './images/cr2.png';
import myBanner from './images/myBanner.png';
import { Link } from 'react-router-dom';

class Slider extends Component {
    // Materializecss 초기화는 컴포넌트렌더링이 완료된 이후에 한 번만 하면 됨
    // carousel init
    componentDidMount(){
      $(document).ready(function(){
        const imgHeight = $('.carousel-item img').height();
        $('.carousel').carousel({
          fullWidth:true
        }).height(imgHeight);
      });
    }
    // 한 페이지 안에서 계속 렌더링 되는 것을 방지
    // *props 를 통해 정보 받아올 것(DB 에서 프론트엔드로-리덕스)
    shouldComponentUpdate(nextProps, nextState) {
      // 리턴값이  true 이면 render 메소드 실행
      let update = JSON.stringify(this.props) !== JSON.stringify(nextProps);
      return update;
    }
    render() {
        // console.log("Redered Slider component");
        return(
          <div>
            <div className="carousel carousel-slider">
              <Link className="carousel-item" to="/event"><img src={cr1} alt="slider_item1" /></Link>
              <Link className="carousel-item" to="/event"><img src={cr2} alt="slider_item2" /></Link>
              <Link className="carousel-item" to="/event"><img src={myBanner} alt="slider_item2" /></Link>
            </div>
          </div>
        );
    }
}

export default Slider;
