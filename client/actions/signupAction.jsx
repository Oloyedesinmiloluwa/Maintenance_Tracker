import { setCurrentUser } from './loginAction';

const baseUrl = window.location.origin;
export default userData => (dispatch) => {
  return fetch(`${baseUrl}/api/v1/auth/signup`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(userData)
  })
    .then((response) => { return response.json(); })
    .then((response) => {
      if (response.message === 'Successfully created an account') {
        dispatch(setCurrentUser(response.data));
        localStorage.setItem('token', response.token);
      }
      return response;
    });
};
