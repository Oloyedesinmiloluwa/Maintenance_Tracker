import axios from 'axios';
const baseUrl = window.location.origin;
export const setCurrentUser = (user) => {
  return {
    type: 'SET_CURRENT_USER',
    user
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
      // console.log(response.message);
    //   messageText.textContent = response.message;
      if (response.message === 'Login successful') {
        dispatch(setCurrentUser(response.data));
        localStorage.setItem('token', response.token);
      }
      return response;
    });
  // return axios.post(`${baseUrl}/api/v1/auth/login`, userData)
  //         .then(res => res.data);
};
