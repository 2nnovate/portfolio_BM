import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Auth } from '../components';
import { connect } from 'react-redux';
import { registerRequest } from '../actions/authentication';

const propTypes = {
};
const defaultProps = {
};

class Register extends Component {
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
    handleRegister = (id, pw) => {
      return this.props.registerRequest(id, pw).then(
          () => {
              if(this.props.registerStatus === "SUCCESS") {
                  M.toast({html:'Success! Please log in'});
                  this.props.history.push('/login');
                  return true;
              } else {
                  /*
                      ERROR CODES:
                          1: BAD USERNAME
                          2: BAD PASSWORD
                          3: USERNAME EXISTS
                  */
                  let errorMessage = [
                      'Invalid Username',
                      'Password is too short',
                      'Username already exists'
                  ];

                  let $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[this.props.errorCode - 1] + '</span>');
                  M.toast({html:$toastContent});
                  return false;
              }
          }
      );
    }
    render() {
        return(
            <div className="section">
              <Auth mode="register"
                    onRegister={this.handleRegister}/>
            </div>
        );
    }
}

Register.propTypes = propTypes;
Register.defaultProps = defaultProps;

const mapStateToProps = (state) => {
    return {
        registerStatus: state.authentication.register.status,
        errorCode: state.authentication.register.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        registerRequest: (id, pw) => {
            return dispatch(registerRequest(id, pw));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
