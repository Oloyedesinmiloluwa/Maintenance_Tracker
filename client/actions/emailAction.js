const baseUrl = window.location.origin;

export default email => () => {
  return fetch(`${baseUrl}/api/v1/users/password/reset`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email })
  })
    .then(response => response.json())
    .then((response) => {
      return response;
    });
};
