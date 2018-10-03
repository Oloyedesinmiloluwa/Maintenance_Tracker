import actionType from '../actions/constants';

const baseUrl = window.location.origin;
export const createRequestSuccess = request => ({
  type: actionType.CREATE_REQUEST,
  request
});
export const setCurrentRequest = request => ({
  type: actionType.CURRENT_REQUEST,
  request

});
export const loadRequestSuccess = requests => ({
  type: actionType.LOAD_REQUESTS,
  requests
});

export const createRequest = request => (dispatch) => {
  return fetch(`${baseUrl}/api/v1/users/requests`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-access-token': localStorage.getItem('token') },
    body: JSON.stringify(request)
  })
    .then((response) => { return response.json(); })
    .then((response) => {
      if (response.message === 'Request Added Successfully') {
        dispatch(createRequestSuccess(request));
      }
      return response;
    });
};
export const loadRequests = (isAdmin) => (dispatch) => {
  const url = isAdmin ? `${baseUrl}/api/v1/requests/`: `${baseUrl}/api/v1/users/requests/`;
  return fetch(url, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'x-access-token': localStorage.getItem('token')
    },
  })
    .then(response => response.json())
    .then((response) => {
      if (response.data) dispatch(loadRequestSuccess(response.data));
      return response;
    })
    .catch((err) => { throw err; });
};

export const getSingleRequest = requestId => (dispatch) => {
  return fetch(`${baseUrl}/api/v1/users/requests/${requestId}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'x-access-token': localStorage.getItem('token')
    },
  })
    .then(response => response.json())
    .then((response) => {
      if (response.data) {
        dispatch(setCurrentRequest(response.data));
      }
      return response;
    });
}
export const actOnRequest = (id, value) => (dispatch) => {
  return fetch(`${baseUrl}/api/v1/requests/${id}/${value}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      'x-access-token': localStorage.getItem('token')
    },
  })
    .then(response => response.json())
    .then((response) => {
      return response;
    });
}
export const deleteRequest = id => (dispatch) => {
  return fetch(`${baseUrl}/api/v1/users/requests/${id}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      'x-access-token': localStorage.getItem('token')
    },
  })
    .then(response => response.json())
    .then((response) => {
      return response;
    });
};

export const editRequest = (id, inputData) => (dispatch) => {
  return fetch(`${baseUrl}/api/v1/users/requests/${id}`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json', 'x-access-token': localStorage.getItem('token') },
    body: JSON.stringify(inputData)
  })
    .then((response) => { return response.json(); });
}

export const uploadImage = file => (dispatch) => {
  const formData = new FormData();
  formData.append('request', file);
  return fetch(`${baseUrl}/api/v1/upload`, {
    method: 'POST',
    body: formData,
    headers: { 'x-access-token': localStorage.getItem('token') }
  })
    .then(response => response.json())
    .then(response => response);
};
