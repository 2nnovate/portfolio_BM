import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BlankView } from '../components';

const propTypes = {
};
const defaultProps = {
};

class CallOrderLists extends Component {
    state = {

    }
    componentDidMount(){
      setTimeout(()=>{
        const headerHeight = $('.header').height();
        const headerHeigthPixel = headerHeight+"px";
        const footerHeight = $('.footer').height();
        const documentHeight = $(document).height();
        const sectionShouldHeigth = documentHeight-headerHeight-footerHeight+"px";
        $('.section').css('margin-top', headerHeigthPixel);
        // **리덕스 state 로 전달받은 값이 없을 경우에만 실행되도록 설정
        // **아래 조건문 더 수정할 필요 있음...
        if(this.props.records === undefined || this.props.records.length === 0){
          $('.section').css('height', sectionShouldHeigth);
        };
      },0);
    }
    render() {
      const blankView = (
        <BlankView blankNum="3"
          image="https://ucarecdn.com/507ead1a-cec1-44e5-b1c2-2e8b1a1c4a48/defaultBlank.png"/>
      )
        return(
            <div className="section">
              {this.props.callOrderList===undefined||this.props.callOrderList.length===0?
              blankView: "전화주문내역렌더링"}
            </div>
        );
    }
}

CallOrderLists.propTypes = propTypes;
CallOrderLists.defaultProps = defaultProps;

export default CallOrderLists;
