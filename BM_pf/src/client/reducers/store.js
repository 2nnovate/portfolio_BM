import * as types from '../actions/ActionTypes';

const initialState = {
    post: {
        status: 'INIT',
        error: -1
    },
    list: {
        status: 'INIT',
        data: []
    },
    oneStore: {
        status: 'INIT',
        data: {}
    },
    edit: {
        status: 'INIT',
        error: -1,
    },
    remove: {
        status: 'INIT',
        error: -1
    },
    order: {
      status: 'INIT',
      error: -1,
      success: false
    },
    savedStore: {
        status: 'INIT',
        error: -1,
        has_saved: false
    },
    review: {
        status: 'INIT',
        error: -1
    },
    reviewEdit: {
        status: 'INIT',
        error: -1
    }
};

export default function store(state = initialState, action) {
  switch(action.type) {
    case types.STORE_REGISTER:
        return {
          ...state,
          post: {
            ...state.post,
            status: 'WAITING',
            error: -1
          }
        };
    case types.STORE_REGISTER_SUCCESS:
        return {
          ...state,
          post: {
            ...state.post,
            status: 'SUCCESS'
          }
        };
    case types.STORE_REGISTER_FAILURE:
        return {
          ...state,
          post: {
            ...state.post,
            status: 'FAILURE',
            error: action.error
          }
        };
    case types.STORE_LIST:
        return {
          ...state,
          list: {
            ...state.list,
            status: 'WAITING'
          }
        };
    case types.STORE_LIST_SUCCESS:
        return {
          ...state,
          list: {
            ...state.list,
            status: 'SUCCESS',
            data: action.data
          }
        }
    case types.STORE_LIST_FAILURE:
        return {
          ...state,
          list: {
            ...state.list,
            status: 'FAILURE'
          }
        };
    case types.STORE_ONE:
        return {
          ...state,
          oneStore: {
            ...state.oneStore,
            status: 'WAITING'
          }
        };
    case types.STORE_ONE_SUCCESS:
        return {
          ...state,
          oneStore: {
            ...state.oneStore,
            status: 'SUCCESS',
            data: action.data
          }
        }
    case types.STORE_ONE_FAILURE:
        return {
          ...state,
          oneStore: {
            ...state.oneStore,
            status: 'FAILURE'
          }
        };
    case types.STORE_EDIT:
        return {
          ...state,
          edit: {
            ...state.edit,
            status: 'WAITING'
          }
        };
    case types.STORE_EDIT_SUCCESS:
        return {
          ...state,
          edit: {
            ...state.edit,
            status: 'SUCCESS'
          }
        }
    case types.STORE_EDIT_FAILURE:
        return {
          ...state,
          edit: {
            ...state.edit,
            status: 'FAILURE',
            error: action.error
          }
        };
    case types.STORE_SAVE:
        return {
          ...state,
          savedStore: {
            ...state.savedStore,
            status: 'WAITING'
          }
        };
    case types.STORE_SAVE_SUCCESS:
        return {
          ...state,
          savedStore: {
            ...state.savedStore,
            status: 'SUCCESS',
            has_saved: action.has_saved
          }
        }
    case types.STORE_SAVE_FAILURE:
        return {
          ...state,
          savedStore: {
            ...state.savedStore,
            status: 'FAILURE',
            error: action.error
          }
        };
    case types.STORE_SAVE_RETRIEVE:
        return {
          ...state,
          list: {
            ...state.list,
            status: 'WAITING'
          }
        };
    case types.STORE_SAVE_RETRIEVE_SUCCESS:
        return {
          ...state,
          list: {
            ...state.list,
            status: 'SUCCESS',
            data: action.data
          }
        }
    case types.STORE_SAVE_RETRIEVE_FAILURE:
        return {
          ...state,
          list: {
            ...state.list,
            status: 'FAILURE'
          }
        };
    case types.STORE_ORDER:
        return {
          ...state,
          order: {
            ...state.order,
            status: 'WAITING'
          }
        };
    case types.STORE_ORDER_SUCCESS:
        return {
          ...state,
          order: {
            ...state.order,
            status: 'SUCCESS',
            success: action.success
          }
        };
    case types.STORE_ORDER_FAILURE:
        return {
          ...state,
          order: {
            ...state.order,
            status: 'FAILURE',
            error: action.error
          }
        };
    case types.STORE_REVIEW:
        return {
          ...state,
          review: {
            ...state.review,
            status: 'WAITING'
          }
        };
    case types.STORE_REVIEW_SUCCESS:
        return {
          ...state,
          review: {
            ...state.review,
            status: 'SUCCESS'
          }
        }
    case types.STORE_REVIEW_FAILURE:
        return {
          ...state,
          review: {
            ...state.review,
            status: 'FAILURE',
            error: action.error
          }
        };
    case types.STORE_EDIT_REVIEW:
        return {
          ...state,
          reviewEdit: {
            ...state.reviewEdit,
            status: 'WAITING'
          }
        };
    case types.STORE_EDIT_REVIEW_SUCCESS:
        return {
          ...state,
          reviewEdit: {
            ...state.reviewEdit,
            status: 'SUCCESS'
          }
        }
    case types.STORE_EDIT_REVIEW_FAILURE:
        return {
          ...state,
          reviewEdit: {
            ...state.reviewEdit,
            status: 'FAILURE',
            error: action.error
          }
        };
    default:
        return state;
  }
}
