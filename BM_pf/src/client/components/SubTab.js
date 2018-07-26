import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const propTypes = {
  mode: PropTypes.string,
  saveCount: PropTypes.number,
  instanceCount: PropTypes.number,
  callCount: PropTypes.number
};
const defaultProps = {
  mode: "savedstore",
  saveCount: 0,
  instanceCount: 0,
  callCount: 0
};

class SubTab extends Component {
    state = {

    }
    render() {
      const selectedStyle = {
        borderBottom: '5px solid black',
        fontWeight: '800',
        color: 'black',
        paddingBottom: '0.6rem'
      }
      const savedStoreTabs = (
        <div className="ss-nav-container">
          <div className="ss-nav-item">
            <Link to="/paied/savedstore" style={this.props.mode==="savedstore"?selectedStyle:undefined}>
              찜한가게({this.props.saveCount})
            </Link>
          </div>
          <div className="ss-nav-item">
            <Link to="/paied/instancepay" style={this.props.mode==="instancepay"?selectedStyle:undefined}>
              바로결제({this.props.instanceCount})
            </Link>
          </div>
          <div className="ss-nav-item">
            <Link to="/paied/call" style={this.props.mode==="call"?selectedStyle:undefined}>
              전화주문({this.props.callCount})
            </Link>
          </div>
        </div>
      )
        return(
            <div className="ss-nav-container-box">
              {savedStoreTabs}
            </div>
        );
    }
}

SubTab.propTypes = propTypes;
SubTab.defaultProps = defaultProps;

export default SubTab;
