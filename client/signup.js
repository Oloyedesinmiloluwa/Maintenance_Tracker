let button = document.getElementById('submitButton');
let messageText = document.getElementById('messageText');
button.addEventListener('click', (event) => {
  let firstNameInput = document.getElementById('first-name');
  let lastNameInput = document.getElementById('last-name');
  let emailInput = document.getElementById('email');
  let passwordInput = document.getElementById('password');
  const inputData = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    email: emailInput.value,
    password: passwordInput.value
  };
  event.preventDefault();
  fetch('https://m-tracker.herokuapp.com/api/v1/auth/signup', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(inputData)
  })
    .then((response) => { return response.json(); })
    .then((data) => {
      if (data.message === 'Successfully created an account') {
        window.location.href = 'index.html';
        localStorage.setItem('token', data.token);
        console.log(localStorage.getItem('token'));
      }
      else
        messageText.textContent = data.message;
    });
});
