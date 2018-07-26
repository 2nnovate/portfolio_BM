import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BlankView } from '../components';

const propTypes = {
};
const defaultProps = {
};

class Cart extends Component {
    state = {

    }
    componentDidMount() {
      setTimeout(()=>{
        const headerHeight = $('.header').height();
        const headerHeigthPixel = headerHeight+"px";
        // console.log(headerHeigthPixel);
        $('.section').css('margin-top', headerHeigthPixel)
      },0);
    }
    render() {
      const view = (path) => {
        switch(path){
          case "/cart":
            if(this.props.savedStore === undefined || this.props.savedStore.length === 0){
              return <BlankView blankNum="4" image="https://ucarecdn.com/32939456-9f46-4d44-bfb5-39265b8a1719/cartBlank.png"/>
            }
            break;
        }
      };
      return(
          <div className="section">
            {view(this.props.location.pathname)}
          </div>
      );
    }
}

Cart.propTypes = propTypes;
Cart.defaultProps = defaultProps;

export default Cart;
