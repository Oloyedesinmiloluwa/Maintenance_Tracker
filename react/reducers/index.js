import { combineReducers } from 'redux';
import currentUser from './userReducer';
import requests, { currentRequestReducer as currentRequest } from './requestReducer';

const rootReducer = combineReducers({
  currentUser,
  requests,
  currentRequest,
});

export default rootReducer;
