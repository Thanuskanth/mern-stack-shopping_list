import { combineReducers } from 'redux';
import itemReducers from './itemreducer'
import errorReducers from './errorreducer'
import authReducers from './authreducer'

export default combineReducers({
    item: itemReducers,
    error:errorReducers,
    auth:authReducers
});