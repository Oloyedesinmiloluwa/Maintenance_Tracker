import actionType from './constants';

const baseUrl = window.location.origin;
export const setCurrentUser = (user) => {
  return {
    type: actionType.SET_CURRENT_USER,
    user
  };
};
export const signOutUser = (event) => {
  if (event.target.textContent !== 'Sign out') return;
  localStorage.clear();
  return {
    type: actionType.UNSET_CURRENT_USER,
    user: {}
  };
};

export default userData => (dispatch) => {
  return fetch(`${baseUrl}/api/v1/auth/login`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(userData)
  })
    .then(response => response.json())
    .then((response) => {
      if (response.message === 'Login successful') {
        dispatch(setCurrentUser(response.data));
        localStorage.setItem('token', response.token);
      }
      return response;
    });
};
