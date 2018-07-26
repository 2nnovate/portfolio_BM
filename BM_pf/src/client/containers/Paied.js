import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BlankView, SubTab, SavedStore, InstancePay, Call } from '../components';
import { connect } from 'react-redux';
import { getsavedStoreRequest } from '../actions/store';
import { getStatusRequest } from '../actions/authentication';
import { Link } from 'react-router-dom';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const propTypes = {
};
const defaultProps = {
};
class Paied extends Component {
    state = {
      savedStoreLists: [],
      orderLists: [],
      callPayLists: []
    }
    componentDidMount() {
      setTimeout(()=>{
        const headerHeight = $('.header').height();
        const subTabHeigth = $('.ss-nav-container-box').height();
        const headerHeigthPixel = (headerHeight+subTabHeigth)+"px";
        const footerHeight = $('.footer').height();
        const documentHeight = $(document).height();
        const sectionShouldHeigth = documentHeight-headerHeight-footerHeight+"px";
        $('.section').css('margin-top', headerHeigthPixel);
        $('.header div.statebar').css('border-bottom', 'none');
        $('.ss-nav-container-box').css('top', (headerHeight-1)+'px');
      },0);
    }
    componentWillUnmount(){
      $('.header div.statebar').css('border-bottom', '1px solid #e5e5e5');
    }
    componentWillMount(){
      this.getAccountInform();
      this.getSavedStoreLists();
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
    getSavedStoreLists = () => {
      return this.props.getsavedStoreRequest(this.props.currentUser).then(
        ()=>{
          this.setState({
            savedStoreLists: this.props.savedStoreLists
          });
        }
      )
    }
    getAccountInform = () => {
      this.props.getStatusRequest().then(
        ()=>{
          this.setState({
            orderLists: this.props.accountInform.order
          })
        }
      )
    }
    render() {
      const listType = this.props.match.params.list_type;
      // console.log(this.state.orderLists)
      return(
          <div>
            <SubTab mode={listType}
                    saveCount={this.props.currentUser!==undefined?this.state.savedStoreLists.length:0}
                    instanceCount={this.state.orderLists.length}/>
            <div className="section">
            {listType==="savedstore"?
              (this.props.currentUser!==undefined&&this.props.savedStoreLists.length>0?
                <SavedStore storeLists={this.state.savedStoreLists}/>:<BlankView
                                                                        blankNum="1"
                                                                        image="https://ucarecdn.com/dae27b1f-6182-430a-b470-ae19646c6d32/savedBlank.png"/>)
            :(undefined)}
            {listType==="instancepay"?
              (this.props.currentUser!==undefined&&this.state.orderLists.length>0?
                <InstancePay orderLists={this.state.orderLists}/>:<BlankView
                                                                    blankNum="1"
                                                                    image="https://ucarecdn.com/507ead1a-cec1-44e5-b1c2-2e8b1a1c4a48/defaultBlank.png"/>)
              :(undefined)}
            {listType==="call"?
              (this.props.currentUser!==undefined&&this.props.callPay!==undefined?
                <Call />:<BlankView
                                blankNum="1"
                                image="https://ucarecdn.com/507ead1a-cec1-44e5-b1c2-2e8b1a1c4a48/defaultBlank.png"/>)
              :(undefined)}
            </div>
          </div>
      );
    }
}

Paied.propTypes = propTypes;
Paied.defaultProps = defaultProps;

const mapStateToProps = (state) => {
    return {
        currentUser: state.authentication.status.currentUser,
        savedStoreLists: state.store.list.data,
        savedStoreStatus: state.store.list.status,
        accountInform: state.authentication.status.account
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getsavedStoreRequest: (username) => {
            return dispatch(getsavedStoreRequest(username));
        },
        getStatusRequest: () => {
            return dispatch(getStatusRequest());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Paied);
