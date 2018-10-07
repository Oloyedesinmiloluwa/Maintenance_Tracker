import actionType from '../actions/constants';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case actionType.SET_CURRENT_USER:
      return {
        isAuthenticated: action.isAuthenticated || true,
        detail: action.user
      };
    case actionType.UNSET_CURRENT_USER:
      return {
        isAuthenticated: false,
        detail: {}
      };
    default:
      return state;
  }
};
export default userReducer;
