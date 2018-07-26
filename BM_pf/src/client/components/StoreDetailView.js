import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import manProfile from '../components/images/manProfile.png';
import writeReview from '../components/images/writeReview.png';
import r1star from '../components/images/r1star.png';
import r2star from '../components/images/r2star.png';
import r3star from '../components/images/r3star.png';
import r4star from '../components/images/r4star.png';
import r5star from '../components/images/r5star.png';


const propTypes = {
  tabs: PropTypes.string,
  menuCategoreis: PropTypes.array,
  menus: PropTypes.array,
  inform: PropTypes.object,
  reviews: PropTypes.array,
  reviewUri: PropTypes.string,
  storeData: PropTypes.object,
  nowPath: PropTypes.string,
  currentUser: PropTypes.string
};
const defaultProps = {
  tabs: "1",
  menuCategoreis: [],
  menus: [],
  inform: {},
  reviews: [],
  reviewUri: "no uri path to use",
  storeData: {},
  nowPath: '',
  currentUser: ''
};

class StoreDetailView extends Component {
    state = {

    }
    render() {
      //* 개선필요 (임시방편) - 매핑할 때 매핑되는 배열의 index가 보존되면서 카테고라이징 되야 함
      //메뉴배열의 아이템들을 categories가 같은 아이템끼리 묶는다.
      //따로 묶인 배열을 가지고 mapping 한다
      // console.log(this.props.menus);
      // console.log(this.props.menus.filter((e)=>e.categories==="CHICKEN"));
      const mapToMenus = (arr) => {
        return arr.map((item, i)=>{
          return (
            <div className="store-menu-item" key={i}>
              <Link to={this.props.nowPath+'/detail/'+item._id}>{item.name}</Link>
              <Link to={this.props.nowPath+'/detail/'+item._id}>{item.price+" 원"}</Link>
            </div>
          )
        })
      }
      const cates = (mc,ms) => {
        // 본 함수에서 카테고리별로 묶인 배열들이 리턴되어야함.
        let arraies = [];
        for(var i = 0; i<mc.length; i++){
          let category = mc[i];
          let filtered = ms.filter((item)=>item.categories===category);
          arraies.push(filtered);
          // console.log(arraies);
          if(mc.length-1==i){
            return arraies;
          }
        }
      };
      const menusPerCateArr = cates(this.props.menuCategoreis, this.props.menus);
      const storesMenuList = () => {
        // console.log(this.props.menus)
        // console.log(menusPerCateArr)
        if(menusPerCateArr===undefined){
          return (
            <div>등록된 메뉴가 없습니다.</div>
          )
        }else{
          let excuteNum = menusPerCateArr.length;
          const storeMenusFold = (e) => {
            const state = $(e.target).next().css('display');
            if(state==='none'){
              $(e.target).next().css('display', 'block');
              $(e.target).text('∧');
              // console.log("열림");
            }else{
              $(e.target).next().css('display', 'none');
              $(e.target).text('∨');
              // console.log("닫힘");
            }
          }
          switch(excuteNum){
            case 1:
              return (
                <div>
                  <div className="store-menu-container white-background">
                    <div className="store-menu-title">{this.props.menuCategoreis[0]}</div>
                    <div className="store-menu-fold" onClick={storeMenusFold}>∧</div>
                    <div className="store-menu-item-lists">
                      {mapToMenus(menusPerCateArr[0])}
                    </div>
                  </div>
                </div>
              );
            case 2:
              return (
                <div>
                  <div className="store-menu-container white-background">
                    <div className="store-menu-title">{this.props.menuCategoreis[0]}</div>
                    <div className="store-menu-fold" onClick={storeMenusFold}>∧</div>
                    <div className="store-menu-item-lists">
                      {mapToMenus(menusPerCateArr[0])}
                    </div>
                  </div>
                  <div className="store-menu-container white-background">
                    <div className="store-menu-title">{this.props.menuCategoreis[1]}</div>
                    <div className="store-menu-fold" onClick={storeMenusFold}>∧</div>
                    <div className="store-menu-item-lists">
                      {mapToMenus(menusPerCateArr[1])}
                    </div>
                  </div>
                </div>
              );
            case 3:
              return (
                <div>
                  <div className="store-menu-container white-background">
                    <div className="store-menu-title">{this.props.menuCategoreis[0]}</div>
                    <div className="store-menu-fold" onClick={storeMenusFold}>∧</div>
                    <div className="store-menu-item-lists">
                      {mapToMenus(menusPerCateArr[0])}
                    </div>
                  </div>
                  <div className="store-menu-container white-background">
                    <div className="store-menu-title">{this.props.menuCategoreis[1]}</div>
                    <div className="store-menu-fold" onClick={storeMenusFold}>∧</div>
                    <div className="store-menu-item-lists">
                      {mapToMenus(menusPerCateArr[1])}
                    </div>
                  </div>
                  <div className="store-menu-container white-background">
                    <div className="store-menu-title">{this.props.menuCategoreis[2]}</div>
                    <div className="store-menu-fold" onClick={storeMenusFold}>∧</div>
                    <div className="store-menu-item-lists">
                      {mapToMenus(menusPerCateArr[2])}
                    </div>
                  </div>
                </div>
              );
          }
        }
      }
      const menuInform = (inform="현재 Store 의 안내사항을 표시합니다.") => {
        return (
          <div className="store-menu-inform white-background">
            {inform}
          </div>
        )
      }

      const storesInform = (
        <div className="store-d-inform white-background">
          <div>
            <div className="store-d-inform-title">업소통계</div>
            주문수 : {this.props.storeData.orderCount}
          </div>
          <div>
            <div className="store-d-inform-title">배달시간</div>
            {this.props.inform.availTime}
          </div>
          <div>
            <div className="store-d-inform-title">휴무일</div>
            {this.props.inform.offDay}
          </div>
          <div>
            <div className="store-d-inform-title">전화번호</div>
            {this.props.inform.tel}
          </div>
          <div>
            <div className="store-d-inform-title">대표자명</div>
            {this.props.inform.owner}
          </div>
        </div>
      )
      // **리뷰남길때 별점 정수로 0~5 **모델수정
      const mapToReviews = (arr) => {
        return arr.map((item, i) => {
          let reviewStarRateImg;
          switch(item.starRate){
            case 1:
              reviewStarRateImg = r1star;
              break;
            case 2:
              reviewStarRateImg = r2star;
              break;
            case 3:
              reviewStarRateImg = r3star;
              break;
            case 4:
              reviewStarRateImg = r4star;
              break;
            case 5:
              reviewStarRateImg = r5star;
              break;
          }
          return (
            <div className="review-item" key={i}>
              {item.author===this.props.currentUser?
                <Link className="review-edit-button" to={this.props.reviewUri+'/edit/'+i}>
                  <i className="small material-icons">edit</i>
                </Link>:undefined}
              <img src={manProfile} alt="profile" className="review-profile"/>
              <div className="review-author">{item.author}</div>
              <div className="review-created"><img src={reviewStarRateImg} className="review-star-rate"/>{item.date.created}</div>
              <img src={item.imageUrl} alt="review-post-pic" className="review-post-pic"/>
              <div>{item.contents}</div>
            </div>
          );
        })
      }
      const storesReviews = (
        <div className="store-review">
          <div className="store-review-first white-background">
            <div className="review-write">
              <Link to={this.props.reviewUri}>
                <img src={writeReview} alt="write_review_button" />
                리뷰를 남겨주세요
              </Link>
            </div>
            <div>사장님의 공지사항</div>
          </div>
          <div className="review-header white-background">
            총 <div className="review-count">{this.props.reviews.length}</div>개의 리뷰가 있어요
          </div>
          <div className="review-container white-background">
            {mapToReviews(this.props.reviews)}
          </div>
        </div>
      )
      const belowInforms = (
        <div className="gray-background most-below-informs">
          <div>・메뉴이미지는 상품의 종류에 따라 제공되는 이미지로 실제 음식과 다를 수 있습니다.</div>
          <div>・상단 메뉴 및 가격은 업소에서 제공한 정보를 기준으로 작성되었으며 변동될 수 있습니다.</div>
          <div>・(주)우아한형제들은 상품거래에 대한 통신판매중개자이며, 통신판매의 당사자가 아닙니다. 따라서, (주)우아한형제들은 상품・거래정보 및 거래에 대하여 책임을 지지 않습니다.</div>
          <div>・배달의민족 콜센터 : 1644-0025</div>
        </div>
      )
      // console.log(this.props.inform)
      // console.log(this.props.nowPath+"/detailed")
      // console.log(this.props.storeData.menus.findIndex(i=>i._id==="5b539c829c6cc4360461afd7"))
        return(
            <div className="gray-background">
              {this.props.tabs==1?menuInform(this.props.storeData.explain):undefined}
              {this.props.tabs==1?storesMenuList():undefined}
              {this.props.tabs==1?belowInforms:undefined}
              {this.props.tabs==2?storesInform:undefined}
              {this.props.tabs==3?storesReviews:undefined}
            </div>
        );
    }
}

StoreDetailView.propTypes = propTypes;
StoreDetailView.defaultProps = defaultProps;

export default StoreDetailView;
