import actionType from '../actions/constants';

const requestReducer = (state = [], action) => {
  switch (action.type) {
    case actionType.LOAD_REQUESTS:
      return action.requests;
    default:
      return state;
  }
};

export default requestReducer;
