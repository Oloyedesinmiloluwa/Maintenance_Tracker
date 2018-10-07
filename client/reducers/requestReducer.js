import actionType from '../actions/constants';

const requestReducer = (state = [], action) => {
  switch (action.type) {
    case actionType.CREATE_REQUEST:
      return [...state, action.request];
    case actionType.LOAD_REQUESTS:
      return action.requests;
    case actionType.DELETE_REQUEST:
      return [...state.filter(request => request.id !== action.requestId)];
    default:
      return state;
  }
};

export const currentRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case actionType.CURRENT_REQUEST:
      return action.request;
    default:
      return state;
  }
};

export default requestReducer;
