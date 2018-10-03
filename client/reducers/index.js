import { combineReducers } from 'redux';
import currentUser from './userReducer';
import requests from './requestReducer';

const rootReducer = combineReducers({
  currentUser,
  requests,
});

export default rootReducer;
