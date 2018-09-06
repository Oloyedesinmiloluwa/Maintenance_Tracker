const userReducer = (state = {}, action) => {
  switch (action.type) {
    // case 'CREATE_USER':
    //   return [...state, Object.assign({}, action.userData)];
    case 'SET_CURRENT_USER':
      return {
        isAuthenticated: action.isAuthenticated || true,
        detail: action.user
      };
    default:
      return state;
  }
};
export default userReducer;
