import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditStoreTwo } from '../components';
import { connect } from 'react-redux';
import { storeOneRequest, editStoreRequest } from '../actions/store';

const propTypes = {
};
const defaultProps = {
};

class OwnerEditTwo extends Component {
    state = {

    }
    componentDidMount() {
      setTimeout(()=>{
        const headerHeight = $('.header').height();
        const headerHeigthPixel = headerHeight+"px";
        $('.section').css('margin-top', headerHeigthPixel);
        $('.statebar').css('border-bottom', '0');
        $('.footer').css('display', 'none');
      },0);
    }
    componentWillUnmount() {
      $('.statebar').css('border-bottom', '1px solid #e5e5e5');
      $('.footer').css('display', 'block');
    }
    getOneStore = (store_id) => {
      return this.props.storeOneRequest(store_id);
    }
    editStoreRequest = (level, store_id, contents) => {
      return this.props.editStoreRequest(level, store_id, contents).then(
        ()=>{
          if(this.props.editStatus.status==="SUCCESS"){
            M.toast({html:'가게 정보 수정을 성공했습니다!'});
            this.props.history.push('/ownerpage');
            return true
          }else{
            let $toastContent;
            switch(this.props.editStatus.error) {
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
                    $toastContent = $('<span style="color: #FFB4BA">You can not access to eidt this store</span>');
                    M.toast({html:$toastContent});
                    break;
                default:
                    $toastContent = $('<span style="color: #FFB4BA">Somethig broke</span>');
                    M.toast({html:$toastContent});
                    break;
              }
              return false;
          }
        }
      )
    }
    render() {
      // 수정할 가게의 _id
      // console.log(this.props.match.params.store_id);
        return(
            <div className="section">
              <EditStoreTwo oneStoreId={this.props.match.params.store_id}
                            oneStore={this.props.storeData}
                            onOneStoreRequest={this.getOneStore}
                            onEdit={this.editStoreRequest}/>
            </div>
        );
    }
}

OwnerEditTwo.propTypes = propTypes;
OwnerEditTwo.defaultProps = defaultProps;

const mapStateToProps = (state) => {
    return {
        registerStoreState: state.store.post,
        storeData: state.store.oneStore.data,
        storeOneRequestStatus: state.store.oneStore.status,
        editStatus: state.store.edit
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        storeOneRequest: (store_id) => {
            return dispatch(storeOneRequest(store_id));
        },
        editStoreRequest: (level, store_id, contents) => {
            return dispatch(editStoreRequest(level, store_id, contents));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OwnerEditTwo);
