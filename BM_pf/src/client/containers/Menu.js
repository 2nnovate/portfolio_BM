import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StoreList } from '../components'
import { connect } from 'react-redux';
import { storeListRequest } from '../actions/store';

const propTypes = {
};
const defaultProps = {
};
// 가게 정보 불러오기(리덕스연결)
class Menu extends Component {
    componentDidMount() {
      this.listUpdate(this.props.match.params.categories);
      $(".do-nicescrol").niceScroll();
      // 해당 매뉴에 들어가면 해당 메뉴로 자동 스크롤
      const menuPathNameArr = ["kfood", "snack", "jfood", "chicken", "pizza", "cfood", "jokbo", "night",
                                "soup", "packed", "cafe", "fastfood", "franchise", "ranking"];
      let multipleN = undefined;
      for(var i = 0; i<menuPathNameArr.length; i++){
        // console.log(menuPathNameArr[i]);
        let pattern = new RegExp(menuPathNameArr[i]);
        if(pattern.test(this.props.location.pathname)){
          // console.log(i)
          multipleN = i;
          const offset = 55*multipleN
          $(".do-nicescrol").animate({scrollLeft:offset},500);
          return
          break;
        }
      };
    };
    // 카테고리가 변경됐을 때 컴포넌트를 다시 렌더링 해야한다
    componentWillReceiveProps (nextProps) {
      let oldParam = this.props.match.params.categories;
      let newParam = nextProps.match.params.categories;
      // console.log(oldParam);
      // console.log(newParam);
      if(oldParam!==newParam){
        this.listUpdate(newParam);
        return this.render();
      }
    }

    listUpdate = (inputCate) => {
      let categories = inputCate;
      let region = this.props.region;
      if(region===""||region===undefined){
        region="토평동";
      }
      // console.log(categories);
      // console.log('menu container is rednered!');
      // console.log(region);
      this.props.storeListRequest(region, categories, undefined, undefined, undefined).then(
        ()=>{
          // console.log(this.props.storeLists);
        }
      )
    }

    // StoreList 컴포넌트에 storeLists 프롭스로 전달
    render() {
      // console.log(this.props.match.params.categories)
      // this.listUpdate();
      return(
        <div className="section">
          <StoreList storeLists={this.props.storeLists.data}/>
        </div>
      );
    }
}

Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;

const mapStateToProps = (state) => {
    return {
        storeLists: state.store.list,
        region: state.authentication.status.region
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        storeListRequest: (region, categories, sort, owner, user_id) => {
            return dispatch(storeListRequest(region, categories, sort, owner, user_id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
