import React, { Component } from 'react';
import PropTypes from 'prop-types';
import search from './images/search.png';
import { Link } from 'react-router-dom';

const propTypes = {
};
const defaultProps = {
};

class SearchBar extends Component {
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
        // console.log("Redered SearchBar component");
        return(
          <div className="searchBar-container">
            <div className="searchBar">
              <Link to="/search" className="searchBar-child">
               <img src={search}  alt="search_icon"/>
               <div>찾으시는게 없다면 검색해보세요</div>
              </Link>
            </div>
          </div>
        );
    }
}

SearchBar.propTypes = propTypes;
SearchBar.defaultProps = defaultProps;

export default SearchBar;
