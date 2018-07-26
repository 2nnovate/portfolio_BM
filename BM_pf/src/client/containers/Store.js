import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StoreDetailView, OrderCartButton } from '../components'
import { Link } from 'react-router-dom';
import {
  halfStar,
  oneStar,
  oneHalfStar,
  twoStar,
  twoHalfStar,
  threeStar,
  threeHalfStar,
  fourStar,
  fourHalfStar,
  fiveStar,
  heart,
  share, fullheart } from '../components/images';
import { connect } from 'react-redux';
import { storeOneRequest, savedStoreRequest } from '../actions/store';


class Store extends Component {
  constructor(props) {
    super(props);

  }
  state = {
    titleChanged: false,
    tabsFixed: false,
    store:{
      _id: "4fc67871349bb7bf6a000002",
      name: "후라이드 참 잘하는 집 수택점",
      region: ["인창동", "토평동", "수택동"],
      thumbNail: "https://ucarecdn.com/536f563a-8d50-4871-81b6-e240ce6524ec/images.jpg",
      categories: "chicken",
      explain: "후라이드치킨, 양념치킨",
      availNow: true,
      inform: {
        availTime: "평일, 토요일 - 오전 11:00 ~ 익일 새벽 3:50 / 일요일 - 오전 11:00 ~ 익일 새벽 1:50",
        offDay: "연중무휴",
        tel: "050-7996-2630",
        owner: "박인호"
      },
      menuCategoreis: ["CHICKEN", "반반메뉴", "주류메뉴"],
      menus: [
        {
          categories: "CHICKEN",
          name: "후라이드치킨",
          price: 14000
        },
        {
          categories: "CHICKEN",
          name: "양념치킨",
          price: 15000
        },
        {
          categories: "반반메뉴",
          name: "후라이드반+간장반",
          price: 15000
        },
        {
          categories: "주류메뉴",
          name: "소주",
          price: 3000
        }
      ],
      reviews: [
        {
          author: "김돌쇠",
          contents: "치킨 겁나게 맛나다요! 리뷰는 길게써야 제맛 아입니꺼? 양념치킨 시켜뭇는데 이기아주 맛이 끝내준다 아입니꺼 대박사건아닙니껴",
          imageUrl: "https://ucarecdn.com/7a74db9b-1583-435a-9157-796de96a62f2/KakaoTalk_20180714_061716678.jpg",
          starRate: 5,
          date: {
              created: 1531516734595, //브라우저에서 Date.now() 한 결과(UTC 기준으로 1970.1.1 00:00 부터 경과된 밀리초)
              edited: 1531516734595
          },
          is_edited: false
        },
        {
          author: "김나나",
          contents: "당신의 노고에 감사를! 리뷰를 길게! 당신의 노고에 감사를! 리뷰를 길게! 당신의 노고에 감사를! 리뷰를 길게! 당신의 노고에 감사를! 리뷰를 길게! 당신의 노고에 감사를! 리뷰를 길게! 당신의 노고에 감사를! 리뷰를 길게!",
          imageUrl: "https://ucarecdn.com/7a74db9b-1583-435a-9157-796de96a62f2/KakaoTalk_20180714_061716678.jpg",
          starRate: 4,
          date: {
              created: 1531516734595, //브라우저에서 Date.now() 한 결과(UTC 기준으로 1970.1.1 00:00 부터 경과된 밀리초)
              edited: 1531516734595
          },
          is_edited: false
        },
        {
          author: "김낑깡",
          contents: "당신의 노고에 감사를! 리뷰를 길게! 당신의 노고에 감사를! 리뷰를 길게! 당신의 노고에 감사를! 리뷰를 길게! 당신의 노고에 감사를! 리뷰를 길게! 당신의 노고에 감사를! 리뷰를 길게! 당신의 노고에 감사를! 리뷰를 길게!",
          imageUrl: "https://ucarecdn.com/7a74db9b-1583-435a-9157-796de96a62f2/KakaoTalk_20180714_061716678.jpg",
          starRate: 4,
          date: {
              created: 1531516734595, //브라우저에서 Date.now() 한 결과(UTC 기준으로 1970.1.1 00:00 부터 경과된 밀리초)
              edited: 1531516734595
          },
          is_edited: false
        }
      ],
      saveStore: ["김돌쇠", "너구리", "석삼이"],
      oderCount: 3,
      starRate:4.6
    }
  }
  //스크롤 이벤트 때문에 계속해서 렌더메소드를 실행 => shouldComponentUpdate이용
    shouldComponentUpdate(nextProps, nextState) {
        let current = {
            props: this.props,
            state: this.state
        };

        let next = {
            props: nextProps,
            state: nextState
        };

        let update = JSON.stringify(current) !== JSON.stringify(next);
        return update;
    }
    componentWillMount() {
      this.getStoreData();
    }
    componentDidMount() {
      const headerHeight = $('.header').height();
      const headerHeigthPixel = headerHeight+"px";
      // console.log(headerHeigthPixel);
      const storeFooterHeight = $('.store-order-cart-btn').height()+"px";
      // console.log(storeFooterHeight)
      $('.section').css('margin-top', '60px');
      $('.section').css('margin-bottom', storeFooterHeight);
      $('.footer').css('display', 'none');
      $('.do-nicescrol').css('display', 'none');
      $('.statebar').css('border-bottom', '0');
      // state 를 사용하여 적용한 style은 컴포넌트가 언마운트 되면서 문제를 일읕킨다
      // (이미 언마운트 된 컴포넌트에서 setState 를 사용할 수 없다)
      // *state를 사용하면 브라우저에 부담이 덜 갈 것임 그러나 오류 발생하면 사용하나마나
      // *store 상세뷰에서 뒤로가기를 눌렀을 때 뒤가 아닌 절대 주소로 이동해버리면 될 듯 - 그래도 안됨 (a태그가 아닌 Link 태그로 하면)
      // **Link와 state를 사용하면서 state를 클리어 할 수 있는 방법이 없을까...? - 스크롤 이벤트를 해제시켜버리면?
      // *스크롤 이벤트를 해제 works!!
      $( document ).ready(() => {
        let tabsOffset = $('.store-tabs').offset().top;
        let storeNameOffset = $('.store-inform-title').offset().top;
        $( window ).scroll(() => {
          // console.log(tabsOffset);
          // console.log(storeNameOffset);
          // console.log($( document ).scrollTop())
          if($( document ).scrollTop() > storeNameOffset){
            if(!this.state.titleChanged){
              // console.log('time to change title');
              $( '.statebar .center .blank-header' ).text(this.state.store.name);
              this.setState({
                titleChanged: true
              });
            }
          }else{
            if(this.state.titleChanged){
              $( '.statebar .center .blank-header' ).text(" ");
              this.setState({
                titleChanged: false
              });
            }
          }
          if($( document ).scrollTop() > tabsOffset){
            if(!this.state.tabsFixed){
              // console.log('time to fix the tabs');
              let willLocation = $('.header').css('height');
              $('.store-tabs').css({
                "position": "fixed",
                "top": willLocation,
                "z-index": "100"
              });
              this.setState({
                tabsFixed: true
              });
            }
          }else{
            $('.store-tabs').css({
              "position": "static",
              "top": "0"
            });
            this.setState({
              tabsFixed: false
            });
          }
        });
      });
    }
    // 윌언마운트에서는 setState 불가능
    componentWillUnmount() {
      $('.footer').css('display', 'block');
      $('.do-nicescrol').css('display', 'block');
      $('.statebar').css('border-bottom', '1px solid #e5e5e5');
      $(window).unbind('scroll');
    }
    getStoreData = () => {
      let storeId = this.props.match.params._id;
      // console.log(storeId);
      return this.props.storeOneRequest(storeId).then(
        ()=>{
          this.setState({
            store: this.props.storeData
          });
        }
      );
    }
    handleSaveStore = () => {
      let storeId = this.props.match.params._id;
      return this.props.savedStoreRequest(storeId).then(
        ()=>{
          if(this.props.savedStore.status==="SUCCESS"){
            if(this.props.savedStore.has_saved){
              M.toast({html: "찜한가게에 등록했습니다!"});
              this.getStoreData();
            }else{
              M.toast({html: "찜한가게에서 제거했습니다!"});
              this.getStoreData();
            }
          }else{
            let $toastContent;
            switch(this.props.savedStore.error) {
                case 1:
                    // IF NOT LOGGED IN, NOTIFY AND REFRESH AFTER
                    $toastContent = $('<span style="color: #FFB4BA">You got wrong id of store</span>');
                    M.toast({html:$toastContent});
                    setTimeout(()=> {location.reload(false);}, 2000);
                    break;
                case 2:
                    $toastContent = $('<span style="color: #FFB4BA">You are not logged in</span>');
                    M.toast({html:$toastContent});
                    break;
                default:
                    $toastContent = $('<span style="color: #FFB4BA">there is no store in db</span>');
                    M.toast({html:$toastContent});
                    break;
              }
          }
        }
      )
    }
    render() {
      $('.header div.center').css('margin', '.4rem 0 .8rem 0');
      //uri 로 들어온 _id 값으로 DB에 쿼리 (findone)
      //현재는 목업
      const storeTitle = (store)=> {
        let storeStarRateImg;
        switch(true){
          case store.starRate<1:
            storeStarRateImg = halfStar
            break;
          case store.starRate==1:
            storeStarRateImg = oneStar
            break;
          case store.starRate>1 && store.starRate<2:
            storeStarRateImg = oneHalfStar
            break;
          case store.starRate==2:
            storeStarRateImg = twoStar
            break;
          case store.starRate>2 && store.starRate<3:
            storeStarRateImg = twoHalfStar
            break;
          case store.starRate==3:
            storeStarRateImg = threeStar
            break;
          case store.starRate>3 && store.starRate<4:
            storeStarRateImg = threeHalfStar
            break;
          case store.starRate==4:
            storeStarRateImg = fourStar
            break;
          case store.starRate>4 && store.starRate<5:
            storeStarRateImg = fourHalfStar
            break;
          case store.starRate==5:
            storeStarRateImg = fiveStar
            break;
        }
        return (
          <div className="store-inform">
            <div className="store-inform-head">
              <div className="nice-store">우수</div>
              <div className="store-inform-title">
                {store.name}
              </div>
              <div className="store-inform-star-rate">
                <img src={storeStarRateImg} alt={store.starRate} />
                {store.starRate}
              </div>
              <div className="store-inform-review">
                최근리뷰 {store.reviews==[]?0:store.reviews.length}
              </div>
            </div>
            <div className="store-inform-below">
              <div>결제방법</div>
              <div>최소주문금액</div>
            </div>
            <div className="store-inform-buttons">
              <div className="store-inform-button right-border-for-button">
                {this.state.store.saveStore.indexOf(this.props.currentUser)!==-1?<img src={fullheart} alt="heart_icon"/>:<img src={heart} alt="heart_icon"/>}
                <div onClick={this.handleSaveStore}>찜 {store.saveStore==[]?0:store.saveStore.length}</div>
              </div>
              <div className="store-inform-button">
                <img src={share} alt="share_icon"/>
                <div>공유</div>
              </div>
            </div>
          </div>
        );
      }
      //tabs 파람이 1 이면 메뉴, 2면 정보, 3이면 리뷰
      const storeMenuSelectedStyle = {
        borderBottom: "0",
        borderLeft: "0",
        borderRight: "0"
      }
      const pathUri = "/menu/"+this.state.store.categories+"/"+this.state.store._id;
      const storeMenu = (
        <div className="store-tabs">
          <Link to={pathUri+"/1"} style={this.props.match.params.tabs==1?storeMenuSelectedStyle:undefined}>메뉴</Link>
          <Link to={pathUri+"/2"} style={this.props.match.params.tabs==2?storeMenuSelectedStyle:undefined}>정보</Link>
          <Link to={pathUri+"/3"} style={this.props.match.params.tabs==3?storeMenuSelectedStyle:undefined}>리뷰</Link>
        </div>
      )

      // console.log(this.props.storeData);
      const storeDataRenderable = () => {
        if(this.props.storeData==={}){
          return this.state.store
        }
        return this.props.storeData
      }
      // console.log(this.props.storeData);
      // console.log(this.state.store.saveStore.indexOf(this.props.currentUser))
      // console.log(this.props.currentUser)
      // console.log(this.state.store.saveStore)
      // console.log(this.props.location.pathname)
        return(
            <div className="section gray-background">
              {storeTitle(this.state.store)}
              {storeMenu}
              <StoreDetailView tabs={this.props.match.params.tabs}
                                menuCategoreis={this.state.store.menuCategories}
                                menus={this.state.store.menus}
                                inform={this.state.store.inform}
                                reviews={this.state.store.reviews}
                                reviewUri={pathUri+"/review"}
                                storeData={this.state.store}
                                nowPath={this.props.location.pathname}
                                currentUser={this.props.currentUser}/>
              <OrderCartButton mode="A"/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.authentication.status.currentUser,
        storeData: state.store.oneStore.data,
        storeOneRequestStatus: state.store.oneStore.status,
        savedStore: state.store.savedStore
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        storeOneRequest: (store_id) => {
            return dispatch(storeOneRequest(store_id));
        },
        savedStoreRequest: (store_id) => {
            return dispatch(savedStoreRequest(store_id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Store);
