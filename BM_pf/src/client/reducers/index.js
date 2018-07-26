import authentication from './authentication';
import store from './store';
import search from './search';

import { combineReducers } from 'redux';

export default combineReducers({
    authentication,
    store,
    search
});
