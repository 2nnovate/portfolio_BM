import React, { Component } from 'react';
import PropTypes from 'prop-types';
import naverLogo from '../components/images/naver.png';
import facebookLogo from '../components/images/facebook.png';
import { Link } from 'react-router-dom';
import { Auth } from '../components';
import { connect } from 'react-redux';
import { loginRequest } from '../actions/authentication';

const propTypes = {
};
const defaultProps = {
};

class Login extends Component {
    state = {

    }
    componentDidMount() {
      setTimeout(()=>{
        const headerHeight = $('.header').height();
        const headerHeigthPixel = headerHeight+"px";
        const footerHeight = $('.footer').height();
        const documentHeight = $(document).height();
        const sectionShouldHeigth = documentHeight-headerHeight+"px";
        $('.section').css('margin-top', headerHeigthPixel);
        $('.section').css('height', sectionShouldHeigth);
        $('.footer').css('display', 'none');
        $('.statebar').css('border-bottom', '0');
      },0);
    }
    componentWillUnmount() {
      $('.footer').css('display', 'block');
      $('.statebar').css('border-bottom', '1px solid #e5e5e5');
    }
    //로그인 실행 함수 정의
    //(thunk 를 이용해 로그인요청을 하고, loginState 를 확인해 성공하면 홈으로 이동 / 실패하면 틀렸다고 알려줌)
    handleLogin = (id, pw) => {
        return this.props.loginRequest(id, pw).then(
            () => {
                if(this.props.loginStatus === "SUCCESS") {
                    // create session data
                    let loginData = {
                        isLoggedIn: true,
                        username: id
                    };

                    document.cookie = 'key=' + btoa(JSON.stringify(loginData));

                    M.toast({html:'Welcome, ' + id + '!'});
                    this.props.history.push('/mypage/'+this.props.currentUser.currentUser_id);
                    // 리턴 값에 따라 인풋창 비우기(auth 컴포넌트의 state 초기화)
                    return true;
                } else {
                    let $toastContent = $('<span style="color: #FFB4BA">Incorrect username or password</span>');
                    M.toast({html:$toastContent});
                    // 리턴 값에 따라 인풋창 비우기(auth 컴포넌트의 state 초기화)
                    return false;
                }
            }
        );
    }

    render() {
      const authByOthersArr = [{name:"네이버", img:naverLogo, alt:"login through naver"},
                                {name:"페이스북", img:facebookLogo, alt:"login through facebook"}];
      const mapToComponent = (arr) => {
        return arr.map((item, i) => {
          return (
            <div className="auth-box" key={i}>
              <img src={item.img} alt={item.alt} />
              <div>{item.name+" 아이디로 로그인"}</div>
            </div>
          );
        });
      };
      const authByOthers = (
        <div className="auth-by-others">
          {mapToComponent(authByOthersArr)}
          <div className="is-your-first-time">
            혹시, 배달의민족이 처음이신가요?
            <Link to="/register" className="go-register-button">
              회원가입
            </Link>
          </div>
        </div>
      );
        return(
            <div className="section">
              <Auth mode="login"
                    onLogin={this.handleLogin}/>
              {authByOthers}
            </div>
        );
    }
}

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;

const mapStateToProps = (state) => {
    return {
      loginStatus: state.authentication.login.status, //waiting, success, failure 중에 하나로 로그인 상태를 알려줌.
      currentUser: state.authentication.status
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginRequest: (id, pw) => {
            return dispatch(loginRequest(id,pw)); //실제 로그인을 실행하는 thunk (백엔드와 통신) - 실행함수
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);
