const button = document.getElementById('update-btn');
const passwordInputs = document.getElementsByTagName('input');
const messageText = document.querySelector('#messageText');
const baseUrl = window.location.origin;
const token = window.location.search.replace('?token=','');

button.addEventListener('click', (event) => {
  event.preventDefault();
  if (passwordInputs[0].value !== passwordInputs[1].value) {
    messageText.textContent = 'Password confirmed different!';
    return;
  }
  const inputData = {
    password: passwordInputs[0].value
  };
  
  fetch(`${baseUrl}/api/v1/users/password/reset`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json', 'x-access-token': token },
    body: JSON.stringify(inputData)
  })
    .then(response => response.json())
    .then((response) => {
      messageText.textContent = response.message;
      if (response.message === 'Authentication failed') {
        window.location.href = 'signin.html';
      } 
    });
});
