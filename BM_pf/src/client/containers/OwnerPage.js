import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { storeListRequest, editStoreRequest } from '../actions/store';

const propTypes = {
};
const defaultProps = {
};

class OwnerPage extends Component {
    state = {
      storeList:[]
    }
    componentDidMount() {
      setTimeout(()=>{
        const headerHeight = $('.header').height();
        const headerHeigthPixel = headerHeight+"px";
        const footerHeight = $('.footer').height();
        const documentHeight = $(document).height();
        const sectionShouldHeigth = documentHeight-headerHeight-footerHeight+"px";
        $('.section').css('margin-top', headerHeigthPixel);
        $('.section').css('height', sectionShouldHeigth);
      },0);
      this.getOwnersStoreList();
    }
    getOwnersStoreList = () => {
      let user_id = this.props.loginStatus.currentUser_id;
      this.props.storeListRequest(undefined, undefined, undefined, "owner", user_id).then(
        ()=>{
          if(this.props.storeLists.status==="SUCCESS"){
            // console.log(this.props.storeLists.data);
            this.setState({
              storeList: this.props.storeLists.data
            })
          };
        }
      )
    }
    handleAvailNow = (e) => {
      let idValue = $(e.target).parents().parents().parents().attr('id');
      let nth = idValue.slice(0,1);
      this.state.storeList[nth].availNow = !this.state.storeList[nth].availNow;
      this.forceUpdate();
      if(this.state.storeList[nth].availNow===false){
        this.state.storeList[nth].deliveryTime = "";
      }
      this.forceUpdate();
      // console.log(this.state.storeList[nth].availNow);
      this.props.editStoreRequest("three", this.state.storeList[nth]._id, {availNow:this.state.storeList[nth].availNow, deliveryTime:this.state.storeList[nth].deliveryTime});
    }
    handleDeliveryTime = (e) => {
      let idValue = $(e.target).parents().parents().attr('id');
      let nth = idValue.slice(0,1);
      // console.log(e.target.value)
      this.state.storeList[nth].deliveryTime = e.target.value;
      this.forceUpdate();
      // console.log(this.state.storeList)
      this.props.editStoreRequest("three", this.state.storeList[nth]._id, {availNow:this.state.storeList[nth].availNow, deliveryTime:this.state.storeList[nth].deliveryTime});
    }
    render() {
      const notLoggedIn = (
        <div>
          로그인 상태가 아닙니다
          <Link to="/login">
            로그인 하러가기
          </Link>
        </div>
      );
      const mapToStore = (arr) => {
        return arr.map((item, i)=>{
          let linkPath = "/ownerpage/"+item._id+"/1";
          let availNowStyle = {color : "black"};
          return (
            <div className="store-list-item" key={i} style={item.availNow?availNowStyle:undefined}>
              <img src={item.thumbNail} alt={"thumbnail for '"+item.name+"'"} className="circle responsive-img"/>
              <div className="store-list-texts">
                <div className="store-list-name">{item.name}</div>
                <div>★ {item.starRate} 최근리뷰 {item.reviews.length}</div>
                <div className="edit_instance_inform" id={i+"th_array"}>
                  <div className="switch button-float">
                    <label>
                      준비중
                      <input type="checkbox" onChange={this.handleAvailNow} checked={item.availNow?true:false} />
                      <span className="lever"></span>
                      영업중
                    </label>
                  </div>
                  <div className="delivery-time">
                    배달 소요시간 :
                    <input type="number" className="browser-default delivery-time-input"
                      onChange={this.handleDeliveryTime} value={item.deliveryTime}/>
                    분
                </div>
                </div>
              </div>
              <Link to={linkPath}>
                <div className="store-list-arrow hanna">edit<i className="material-icons">edit</i></div>
              </Link>
            </div>
          );
        });
      };
      const loggedIn = (
        <div>
          환영합니다, <strong>{this.props.loginStatus.currentUser}</strong> 사장님
          <div>가게 목록</div>
          <div className="store-list-container">
            {this.state.storeList===[]?undefined:mapToStore(this.state.storeList)}
          </div>
          <Link to="/ownerpage/registerstore">가게 추가하기</Link>
        </div>
      );
      // console.log(this.state.storeList);
      console.log(this.props.storeLists)
        return(
            <div className="section">
              <div>
                <div>{this.props.loginStatus.currentUser==""? notLoggedIn:loggedIn}</div>
              </div>
            </div>
        );
    }
}

OwnerPage.propTypes = propTypes;
OwnerPage.defaultProps = defaultProps;

//?? 왜 state를 사용할 수 없지?
const mapStateToProps = (state) => {
    return {
      storeLists: state.store.list,
      loginStatus: state.authentication.status
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
      storeListRequest: (region, categories, sort, owner, user_id) => {
          return dispatch(storeListRequest(region, categories, sort, owner, user_id));
      },
      editStoreRequest: (level, store_id, contents) => {
          return dispatch(editStoreRequest(level, store_id, contents));
      }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OwnerPage);
