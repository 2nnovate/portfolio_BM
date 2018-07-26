import React, { Component } from 'react';
import { Header, MenuLine } from '../components';
import { connect } from 'react-redux';
import { getStatusRequest, editRegionRequest } from '../actions/authentication';


class App extends Component {
    componentDidMount() { //컴포넌트 렌더링이 맨 처음 완료된 이후에 바로 세션확인
        // console.log('App container is mounted');
        // 쿠키를 통해 먼저 로그인 여부를 확인 (로그인을 수행한 적있으면 쿠키에 기록이 있음 - 세션과는 별개)
        function getCookie(name) {
            var value = "; " + document.cookie;
            var parts = value.split("; " + name + "=");
            if (parts.length == 2) return parts.pop().split(";").shift();
        }
        // get loginData from cookie
        let loginData = getCookie('key');
        // if loginData is undefined, do nothing
        if(typeof loginData === "undefined") return;
        // decode base64 & parse json
        loginData = JSON.parse(atob(loginData));
        // if not logged in, do nothing
        if(!loginData.isLoggedIn) return;

        // page refreshed & has a session in cookie,
        // check whether this cookie is valid or not
        this.props.getStatusRequest().then(
            () => {
                // console.log(this.props.status);
                // if session is not valid
                if(!this.props.status.valid) {
                    // logout the session
                    loginData = {
                        isLoggedIn: false,
                        username: ''
                    };

                    document.cookie='key=' + btoa(JSON.stringify(loginData));

                    // and notify
                    let $toastContent = $('<span style="color: #FFB4BA">Your session is expired, please log in again</span>');
                    M.toast({html: $toastContent});
                }
            }
        );
    }

    handleEditRegion = (_id, region) => {
      this.props.editRegionRequest(_id, region).then(
        () => {
          if(this.props.editRegionStatus.status==="SUCCESS"){
            M.toast({html: "SUCESS to edit your region"});
            this.props.history.push('/')
          } else {
            /*
              error 코드
                1: NOT LOGGED IN
                2: INVALID REGION
                3: INVALID ID
                4: NO RESOURCE
            */
            let errorMessage = [
                'You have to login first',
                'Not a service area',
                'Invalid id',
                'Account does not exist'
            ];
            let $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[this.props.editRegionStatus.error - 1] + '</span>');
            M.toast({html: $toastContent});
            // IF NOT LOGGED IN, REFRESH THE PAGE
            if(this.props.editRegionStatus.error === 1) {
                setTimeout(()=> {this.props.history.push('/login')}, 2000);
            }
          }
        }
      )
    }
    render() {
      // console.log(this.props.savedStoreLists)
      // console.log('App is rendered')
      // console.log(this.props.status.currentUser_id);
      $('.eidt-region-view').css('display', 'none');
        return(
            <div>
              <Header location={this.props.location}
                      match={this.props.match}
                      history={this.props.history}
                      region={this.props.status.region}
                      onEidtRegion={this.handleEditRegion}
                      currentUserId={this.props.status.currentUser_id}
                      savedStoreLength={this.props.savedStoreLists.length}/>
              <MenuLine currentUserId={this.props.status.currentUser_id}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.status,
        editRegionStatus: state.authentication.editRegion,
        savedStoreLists: state.store.list.data
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getStatusRequest: () => {
            return dispatch(getStatusRequest());
        },
        editRegionRequest: (_id, region) => {
          return dispatch(editRegionRequest(_id, region));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
