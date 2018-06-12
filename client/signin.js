const button = document.getElementById('fit-footer');
button.addEventListener('click', (event) => {
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const messageText = document.querySelector('#messageText');
  const inputData = {
    email: emailInput.value,
    password: passwordInput.value
  };
  event.preventDefault();
  fetch('https://m-tracker.herokuapp.com/api/v1/auth/login', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(inputData)
  })
    .then((response) => { return response.json(); })
    .then((response) => {
      if (response.message === 'Login successful') {
        localStorage.setItem('userRole', response.data.role);
        localStorage.setItem('userName', response.data.firstname);
        if (response.data.role === 'admin') localStorage.setItem('userName', 'Admin');
        window.location.href = 'list.html';
        localStorage.setItem('token', response.token);
      } else {
        messageText.textContent = response.message;
      }
    });
});
