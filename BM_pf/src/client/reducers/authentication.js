import * as types from '../actions/ActionTypes';

const initialState = {
    login: {
        status: 'INIT'
    },
    register: {
        status: 'INIT',
        error: -1
    },
    editRegion: {
        status: 'INIT',
        error: -1
    },
    order: {
        status: 'INIT',
        error: -1
    },
    status: {
        valid: false, //세션이 유효한지 체크, 유효하면 true, 만료/비정상 false
        isLoggedIn: false,
        currentUser: '',
        currentUser_id: '',
        region: '',
        account: {}
    }
};

export default function authentication(state = initialState, action) {
  switch(action.type) {
      /* LOGIN */
      case types.AUTH_LOGIN:
          return {
            ...state,
            login : {
              status: 'WAITING'
            }
          }
      case types.AUTH_LOGIN_SUCCESS:
          return {
            ...state,
            login: {
                status: 'SUCCESS'
            },
            status: {
              ...state.status,
              isLoggedIn: true,
              currentUser: action.username,
              currentUser_id: action.user_id,
              region: action.region,
              account: action.account
            }
          }
      case types.AUTH_LOGIN_FAILURE:
          return {
            ...state,
            login:{
              status: 'FAILURE'
            }
          }
      case types.AUTH_REGISTER:
            return {
              ...state,
              register: {
                status: 'WAITING',
                error: -1
              }
            }
        case types.AUTH_REGISTER_SUCCESS:
            return {
              ...state,
              register: {
                ...state.register,
                status: 'SUCCESS'
              }
            }
        case types.AUTH_REGISTER_FAILURE:
            return {
              ...state,
              register:{
                status: 'FAILURE',
                error: action.error
              }
            }
        case types.AUTH_GET_STATUS:
            return {
              ...state,
              status: {
                ...state.staus,
                isLoggedIn: true
              }
            }
        case types.AUTH_GET_STATUS_SUCCESS:
            return {
              ...state,
              status: {
                ...state.status,
                valid: true,
                currentUser: action.username,
                currentUser_id: action.user_id,
                region: action.region,
                account: action.account
              }
            }
        case types.AUTH_GET_STATUS_FAILURE:
            return {
              ...state,
              status: {
                ...state.status,
                valid: false,
                isLoggedIn: false
              }
            }
            /* LOGOUT */
        case types.AUTH_LOGOUT:
            return {
              ...state,
              status: {
                ...state.status,
                isLoggedIn: false,
                currentUser: '',
                currentUser_id: '',
                region: ''
              }
            }
        case types.AUTH_EDIT_REGION:
          return {
            ...state,
            editRegion: {
              ...state.editRegion,
              status: 'WAITING',
              error: -1
            }
          }
        case types.AUTH_EDIT_REGION_SUCCESS:
          return {
            ...state,
            editRegion: {
              ...state.editRegion,
              status: 'SUCCESS'
            },
            status: {
              ...state.status,
              region: action.region
            }
          }
        case types.AUTH_EDIT_REGION_FAILURE:
          return {
            ...state,
            editRegion: {
              ...state.editRegion,
              status: 'FAILURE',
              error: action.error
            }
          }
        case types.AUTH_ORDER:
          return {
            ...state,
            order: {
              ...state.order,
              status: 'WAITING',
              error: -1
            }
          }
        case types.AUTH_ORDER_SUCCESS:
          return {
            ...state,
            order: {
              ...state.order,
              status: 'SUCCESS'
            }
          }
        case types.AUTH_ORDER_FAILURE:
          return {
            ...state,
            order: {
              ...state.order,
              status: 'FAILURE',
              error: action.error
            }
          }
        default:
            return state;
  }
}
