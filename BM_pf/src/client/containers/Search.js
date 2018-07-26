import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {RealSearchBar} from '../components'
import { connect } from 'react-redux';
import { searchRequest } from '../actions/search';

const propTypes = {
};
const defaultProps = {
};

class Search extends Component {
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
    handleSearch = (search_type, region, keyword) => {
      return this.props.searchRequest(search_type, region, keyword)
    }
    render() {
      const willRegion = () => {
        if(this.props.accountInform.region!==undefined||this.props.accountInform.region!==""){
          return this.props.accountInform.region
        }else{
          return "토평동"
        }
      }
        return(
            <div className="section">
              <RealSearchBar onSearch={this.handleSearch}
                             searchStatus={this.props.search.status}
                             searchResults={this.props.search.stores}
                             userRegion={this.props.accountInform.region}/>
            </div>
        );
    }
}

Search.propTypes = propTypes;
Search.defaultProps = defaultProps;

const mapStateToProps = (state) => {
    return {
        search: state.search,
        accountInform: state.authentication.status.account
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        searchRequest: (search_type, region, keyword) => {
            return dispatch(searchRequest(search_type, region, keyword));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
