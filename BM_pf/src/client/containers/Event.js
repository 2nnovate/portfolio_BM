import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
};
const defaultProps = {
};

class Event extends Component {
    state = {

    }
    componentDidMount() {
      setTimeout(()=>{
        const headerHeight = $('.header').height();
        const headerHeigthPixel = headerHeight+"px";
        $('.section').css('margin-top', headerHeigthPixel);
        $('.footer').css('display', 'none');
      },0);
    }
    componentWillUnmount() {
      $('.footer').css('display', 'block');
    }
    render() {
        return(
            <div className="section event-view">
              이벤트 내용이 들어갈 페이지입니다.
            </div>
        );
    }
}

Event.propTypes = propTypes;
Event.defaultProps = defaultProps;

export default Event;
