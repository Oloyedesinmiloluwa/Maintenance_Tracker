const button = document.getElementById('submitButton');
const messageText = document.getElementById('messageText');
const baseUrl = window.location.origin;

button.addEventListener('click', (event) => {
  const firstNameInput = document.getElementById('first-name');
  const lastNameInput = document.getElementById('last-name');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const inputData = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    email: emailInput.value,
    password: passwordInput.value
  };
  event.preventDefault();
  fetch(`${baseUrl}/api/v1/auth/signup`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(inputData)
  })
    .then((response) => { return response.json(); })
    .then((response) => {
      if (response.message === 'Successfully created an account') {
        localStorage.setItem('token', response.token);
        localStorage.setItem('userRole', response.data.role);
        localStorage.setItem('userName', response.data.firstname);
        if (response.data.role === 'admin') localStorage.setItem('userName', 'Admin');
        window.location.href = 'list.html';
      }
      else messageText.textContent = response.message;
    });
});
