import * as types from '../actions/ActionTypes';

const initialState = {
    status: 'INIT',
    stores: []
};

export default function search(state = initialState, action) {

    switch(action.type) {
        case types.SEARCH:
            return {
              ...state,
              status: 'WAITING'
            }
        case types.SEARCH_SUCCESS:
            return {
              ...state,
              status: 'SUCCESS',
              stores: action.stores
            }
        case types.SEARCH_FAILURE:
            return {
              ...state,
              status: 'FAILURE',
              stores: []
            }
        default:
            return state;
    }
}
