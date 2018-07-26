import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Slider, MenuTable, EventSlider, SearchBar, HomeFooter } from '../components'

class Home extends Component {
    state = {

    }
    // 브라우저 콘솔에서 하는 것과 높이값이 다르게 나온다?
    // setTimeout 메소드로 비동기 처리하니 브라우저 콘솔에서 하는 값과 같이 나온다
    // jquery 를 이용하여 바로 스타일 변경
    componentDidMount() {
      setTimeout(()=>{
        const headerHeight = $('.header').height();
        const headerHeigthPixel = headerHeight+"px";
        // console.log(headerHeigthPixel);
        $('.section').css('margin-top', headerHeigthPixel);
        $(document).ready(function(){
          const imgHeight = $('.carousel-item img').height();
          $('.carousel').carousel({
            fullWidth:true
          }).height(imgHeight);
        });
      },0);
    }
    // 한 페이지 안에서 계속 렌더링 되는 것을 방지
    // *props 를 통해 정보 받아올 것(DB 에서 프론트엔드로-리덕스)
    shouldComponentUpdate(nextProps, nextState) {
      // 리턴값이  true 이면 render 메소드 실행
      // console.log('shouldUpdate');
      // * 라우트 컴포넌트는 기본적으로 전달받는 프롭스(3객체) 중 로케이션의 key 가 다를 수 도 있다.
      // ** 라우트 기본 프롭스를 제와하고 비교해야할 듯
      // console.log(JSON.stringify(this.props));
      // console.log(JSON.stringify(nextProps));
      let update = JSON.stringify(this.props) !== JSON.stringify(nextProps);
      return false;
      // ** 일단 false 로 막아두기
    }

    render() {
        // console.log("Redered Home contaier");
        return(
            <div className="section">
              <Slider />
              <MenuTable />
              <div className="es-sb-container">
                <EventSlider />
                <SearchBar />
              </div>
              <HomeFooter />
            </div>
        );
    }
}

export default Home;
