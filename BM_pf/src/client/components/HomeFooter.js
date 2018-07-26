import React, { Component } from 'react';
import PropTypes from 'prop-types';
import bookStore from './images/bookStore.png';
import { Link } from 'react-router-dom';

const propTypes = {
  latestEvent: PropTypes.array
};
const defaultProps = {
  latestEvent: [{categories:"공지", title:"[당첨자발표] 6월 L.POINT 결제시 4천원 쿠폰 증정 당첨자 발표", contents:"내용입니다."},
                {categories:"이벤트", title:"7월 또래오래 선착순 2천원 할인", contents:"내용입니다."},
                {categories:"발표", title:"[당첨자공지] 세계축구대회 스웨던전 기면 오늘은 몇대몇 이벤트 당첨자 및 쿠폰 지급 발표", contents:"내용입니다."}]
};

class HomeFooter extends Component {
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
      // console.log("Redered HomeFooter component");
      const mapToList = (arr) => {
        return arr.map((item, i) => {
          return (<div className="el-item" key={i}>
            <Link to="/event" className="el-text">
              <b>{item.categories}</b>{item.title}
            </Link>
          </div>);
        })
      };
      const bookStoreLink = (
        <img src={bookStore} alt="link to bookstore"/>
      );
      const foldFunctions = () => {
        const state = $('.detailed-informs').css('display');
        if(state==='none'){
          $('.detailed-informs').css('display', 'block');
          $('.informs-fold-button').text('닫기 ▲');
          // console.log("열림");
        }else{
          $('.detailed-informs').css('display', 'none');
          $('.informs-fold-button').text('자세히보기 ▼');
          // console.log("닫힘");
        }
      };
      const homeFooterCopys = (
        <div className="hf-container">
          <div className="ffl-container">
            <div className="ffl-item">
              <p className="ffl-border">사업자정보확인</p>
            </div>
            <div className="ffl-item">
              <p className="ffl-border">이용약관</p>
            </div>
            <div className="ffl-item">
              <p className="ffl-border">전자금융거래 이용약관</p>
            </div>
            <div className="ffl-item">
              <p>개인정보 처리방침</p>
            </div>
          </div>
          <div className="sl-container">
            <div className="informs">
              <div className="informs-title">(주)우아한형제들</div>
              <a className="informs-fold-button"
                onClick={foldFunctions}
                href="javascript:void(0)">
                자세히보기 ▼
              </a>
              <div className="detailed-informs">
                <div>대표이사 : 김봉진</div>
                <div>사업자등록번호 : 120-87-65763 | 통신판매업 : 서울 송파-0515</div>
                <div>메일 : CS@woowahan.com</div>
                <div>고객센터 : 1644-0025(24시간 운영, 연중무휴)</div>
                <div>주소 : 서울특별시 송파구 위례성대로 2 장은빌딩</div>
                <div>호스팅서비스제공자 : (주)우아한형제들</div>
                <div>전자금융분쟁처리 Tel : 1644-0025 | Fax : 02-3446-5856</div>
                <div>메일 : help@woowahan.com</div>
              </div>
            </div>
            <div>
              배달의민족은 통신판매중개자이며 통신판매의 당사자가 아닙니다.
            </div>
            <div>
              따라서 배달의민족은 상품거래정보 및 거래에 대한 책임을 지지 않습니다.
            </div>
          </div>
        </div>
      );
        return(
            <div>
              <div className="el-container">
                {mapToList(this.props.latestEvent)}
              </div>
              {bookStoreLink}
              {homeFooterCopys}
            </div>
        );
    }
}

HomeFooter.propTypes = propTypes;
HomeFooter.defaultProps = defaultProps;

export default HomeFooter;
