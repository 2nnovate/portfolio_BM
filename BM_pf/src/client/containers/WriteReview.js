import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { WriteReviewView } from '../components'
import { connect } from 'react-redux';
import { reviewRequest, storeOneRequest, reviewEditRequest } from '../actions/store';

const propTypes = {
};
const defaultProps = {
};

class WriteReview extends Component {
    state = {
      store: {reviews:[{}]}
    }
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

    componentDidMount(){
      $('.do-nicescrol').css('display', 'none');
      const headerHeight = $('.header').height();
      const headerHeigthPixel = headerHeight+"px";
      $('.section').css('margin-top', headerHeigthPixel);
    }
    componentWillUnmount() {
      $('.do-nicescrol').css('display', 'block');
    }
    getStoreData = (store_id) => {
      // console.log(storeId);
      return this.props.storeOneRequest(store_id)
    }
    handleReview = (store_id, obj) => {
      // 주문을 했는지 확인해야함
      let orderLists = this.props.accountInform.order;
      if(orderLists===undefined){
        M.toast({html:'<span style="color: #FFB4BA">You are not logged in</span>'});
        return setTimeout(()=>{
          this.props.history.push('/login');
        }, 2000)
      }else if(orderLists.length===0){
        M.toast({html:'<span style="color: #FFB4BA">리뷰는 바로결제 이용시에만 가능합니다</span>'});
        return setTimeout(()=>{
          this.props.history.push('/');
        }, 2000)
      }else{
        for(var i=0; i < orderLists.length; i++){
          if(orderLists[i].storeId===this.props.match.params._id){
            // console.log('시켜먹은적 있음')
            return this.props.reviewRequest(store_id, obj).then(
              ()=>{
                if(this.props.reviewStatus.status==='SUCCESS'){
                  M.toast({html:'리뷰등록을 성공했습니다!'});
                  this.props.history.push('/menu/'+this.props.match.params.categories+'/'+this.props.match.params._id+'/3');
                }else{
                  let $toastContent;
                  switch(this.props.reviewStatus.error) {
                      case 1:
                          // IF NOT LOGGED IN, NOTIFY AND REFRESH AFTER
                          $toastContent = $('<span style="color: #FFB4BA">You are not logged in</span>');
                          M.toast({html:$toastContent});
                          setTimeout(()=> {location.reload(false);}, 2000);
                          break;
                      case 2:
                          $toastContent = $('<span style="color: #FFB4BA">You have got wrong id value</span>');
                          M.toast({html:$toastContent});
                          break;
                      case 3:
                          $toastContent = $('<span style="color: #FFB4BA">There is no store</span>');
                          M.toast({html:$toastContent});
                          break;
                      default:
                          $toastContent = $('<span style="color: #FFB4BA">Somethig broke</span>');
                          M.toast({html:$toastContent});
                          break;
                    }
                }
              }
            )
          }
          if(i===orderLists.length-1){
            // console.log('시켜먹은적 없음')
            return M.toast({html:'리뷰는 바로결제 이용시에만 가능합니다'});
          }
        }
      }
    }
    handleEditReview = (store_id, nth_index, obj) => {
      this.props.reviewEditRequest(store_id, nth_index, obj).then(
        ()=>{
          if(this.props.editReviewStatus.status==="SUCCESS"){
            M.toast({html:'리뷰수정을 성공했습니다!'});
            this.props.history.push('/menu/'+this.props.match.params.categories+'/'+this.props.match.params._id+'/3');
          }else{
            let $toastContent;
            switch(this.props.editReviewStatus.error) {
                case 1:
                    // IF NOT LOGGED IN, NOTIFY AND REFRESH AFTER
                    $toastContent = $('<span style="color: #FFB4BA">You are not logged in</span>');
                    M.toast({html:$toastContent});
                    setTimeout(()=> {location.reload(false);}, 2000);
                    break;
                case 2:
                    $toastContent = $('<span style="color: #FFB4BA">You have got wrong id value</span>');
                    M.toast({html:$toastContent});
                    break;
                case 3:
                    $toastContent = $('<span style="color: #FFB4BA">There is no store</span>');
                    M.toast({html:$toastContent});
                    break;
                case 4:
                    $toastContent = $('<span style="color: #FFB4BA">You do not have permissions</span>');
                    M.toast({html:$toastContent});
                    break;
                default:
                    $toastContent = $('<span style="color: #FFB4BA">Somethig broke</span>');
                    M.toast({html:$toastContent});
                    break;
              }
          }
        }
      )
    }
    render() {
      $('.statebar div.center').css('margin-bottom', '.8rem');
      // console.log(this.props.accountInform)
      // console.log(this.props.match.params.nth_review)
      // console.log(this.state.store.reviews[this.props.match.params.nth_review])
        return(
            <div className="section">
              <WriteReviewView currentUser={this.props.currentUser}
                               onReview={this.handleReview}
                               storeId={this.props.match.params._id}
                               mode={this.props.match.params.nth_review===undefined?"write":"edit"}
                               storeId={this.props.match.params._id}
                               onGetStore={this.props.storeOneRequest}
                               nthReviewArray={this.props.match.params.nth_review}
                               storeData={this.props.storeData}
                               onEditReview={this.handleEditReview}/>
            </div>
        );
    }
}

WriteReview.propTypes = propTypes;
WriteReview.defaultProps = defaultProps;

const mapStateToProps = (state) => {
    return {
        currentUser: state.authentication.status.currentUser,
        reviewStatus: state.store.review,
        accountInform: state.authentication.status.account,
        storeData: state.store.oneStore.data,
        storeOneRequestStatus: state.store.oneStore.status,
        editReviewStatus: state.store.reviewEdit
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        reviewRequest: (store_id, obj) => {
            return dispatch(reviewRequest(store_id, obj));
        },
        storeOneRequest: (store_id) => {
            return dispatch(storeOneRequest(store_id));
        },
        reviewEditRequest: (store_id, nth_index, obj) => {
            return dispatch(reviewEditRequest(store_id, nth_index, obj));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WriteReview);
