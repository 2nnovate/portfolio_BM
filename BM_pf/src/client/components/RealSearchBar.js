import React, { Component } from 'react';
import PropTypes from 'prop-types';
import blankThumbnail from './images/blankThumbnail.png'
import { Link } from 'react-router-dom';

const propTypes = {
  onSearch: PropTypes.func,
  searchStatus: PropTypes.string,
  searchResults: PropTypes.array,
  userRegion: PropTypes.string
};
const defaultProps = {
  onSearch: ()=>{console.log('search function is undefined')},
  searchStatus: '',
  searchResults: [],
  userRegion: ''
};

class RealSearchBar extends Component {
    state = {
      method: "storeName",
      keywords: ""
    }
    componentDidMount(){
      $('.dropdown-trigger').dropdown();
    }
    handleChangeStoreName = (e) => {
      this.setState({
        keywords: e.target.value
      });
      let region;
      if(this.props.userRegion===undefined||this.props.userRegion===''){
        region = "토평동";
      }else{
        region = this.props.userRegion;
      }
      this.props.onSearch("store", region, e.target.value)
    }
    handleChangeMenuName = (e) => {
      this.setState({
        keywords: e.target.value
      });
      let region;
      if(this.props.userRegion===undefined||this.props.userRegion===''){
        region = "토평동";
      }else{
        region = this.props.userRegion;
      }
      this.props.onSearch("menu", region, e.target.value)
    }
    showChangeMenu = () => {
      this.setState({
        method: "menuName"
      })
    }
    showChangeStore = () => {
      this.setState({
        method: "storeName"
      })
    }
    render() {
      // console.log(this.props.userRegion)
      const dropDownMenu = (
        <div className="dropdown-container">
          <a className='dropdown-trigger btn' data-target='dropdown1'>search by</a>
          <ul id='dropdown1' className='dropdown-content'>
            <li><div onClick={this.showChangeStore}>매장 이름으로</div></li>
            <li><div onClick={this.showChangeMenu}>메뉴 이름으로</div></li>
          </ul>
        </div>
      )
      const mapToStoreList = (arr) => {
        return arr.map((item, i) => {
          let linkPath = "/menu/"+item.categories+"/"+item._id+"/1";
          let availNowStyle = {color : "black"};
          return (
            <Link to={linkPath} className="store-list-item" key={i} style={item.availNow?availNowStyle:undefined}>
              {item.thumbNail===''?<img src={blankThumbnail} alt={"thumbnail for '"+item.name+"'"} className="circle responsive-img"/>:<img src={item.thumbNail} alt={"thumbnail for '"+item.name+"'"} className="circle responsive-img"/>}
              {item.availNow?undefined:<div className="prepare-container">준비중</div>}
              <div className="store-list-texts">
                <div className="store-list-name">{item.name}</div>
                <div>★ {item.starRate} 최근리뷰 {item.reviews.length}</div>
                <div className="list-inform-overflow">{item.explain}</div>
                <div>배달 소요시간: 약 {item.deliveryTime===''||item.deliveryTime===undefined?"-":item.deliveryTime}분</div>
              </div>
              <div className="store-list-arrow hanna">></div>
            </Link>
          );
        })
      }
      const searchStoreInput = (
        <div className="row search-input-container">
          <form className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">search</i>
                <input name="keywords"
                        className="real-input"
                        type="text"
                        placeholder="매장 이름으로 검색"
                        onChange={this.handleChangeStoreName}
                        value={this.state.keywords}/>
              </div>
            </div>
          </form>
        </div>
      );
      const searchMenuInput = (
        <div className="row search-input-container">
          <form className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">search</i>
                <input name="keywords"
                        className="real-input"
                        type="text"
                        placeholder="메뉴 이름으로 검색"
                        onChange={this.handleChangeMenuName}
                        value={this.state.keywords}/>
              </div>
            </div>
          </form>
        </div>
      );
      const menuNameInform = (
        <div className="menu-name-inform">메뉴명에 &quot;{this.state.keywords}&quot; 를 가진 가게 목록입니다.</div>
      )
      // 인풋창 onChange 이벤트때마다 검색해서 아래에 결과를 표현해주기
      return(
        <div className="search-container">
          {dropDownMenu}
          {this.state.method==="storeName"?searchStoreInput:searchMenuInput}
          <div className="store-list-container">
            {this.state.method==="menuName"?menuNameInform:undefined}
            {mapToStoreList(this.props.searchResults)}
          </div>
        </div>

      );
    }
}

RealSearchBar.propTypes = propTypes;
RealSearchBar.defaultProps = defaultProps;

export default RealSearchBar;
