import {
    SEARCH,
    SEARCH_SUCCESS,
    SEARCH_FAILURE
} from './ActionTypes';
import axios from 'axios';

export function searchRequest(search_type, region, keyword) {
    return (dispatch) => {
        dispatch({
          type: SEARCH
        });
        let url = '/api/store'
        if(search_type==="store"){
          url = url + `/search_store/${region}/${keyword}`
        }else if(search_type==="menu"){
          url = url + `/search_menu/${region}/${keyword}`
        }
        return axios.get(url)
        .then((response) => {
            dispatch({
              type: SEARCH_SUCCESS,
              stores: response.data
            });
        }).catch((error) => {
            dispatch({
              type: SEARCH_FAILURE,
              error: error.response.data.code
            });
        });
    };
}
