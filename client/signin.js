const button = document.getElementById('signin-btn');
const forgotPassword = document.getElementById('forgot-pswd');
const modal = document.getElementsByClassName('modal')[0];
const modalBtn = document.getElementById('modal-btn');
const modalEmailInput = document.getElementById('modal-email');
const modalMessageText = document.querySelector('#modal-messageText');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const messageText = document.querySelector('#messageText');
const closeBtn = document.querySelector('.close');
const baseUrl = window.location.origin;

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  modalMessageText.textContent = '';
});
modalEmailInput.addEventListener('input', () => {
  modalMessageText.textContent = '';
});
window.addEventListener('click', (event) => {
  if (event.target.className === 'modal') modal.style.display = 'none';
});
modalBtn.addEventListener('click', (event) => {
  event.preventDefault();
  modalMessageText.style.color = 'yellow' ;
  modalMessageText.textContent = 'Processing..';
  const inputData = {
    email: modalEmailInput.value,
    baseUrl
  };
  fetch(`${baseUrl}/api/v1/users/password/reset`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(inputData)
  })
    .then(response => response.json())
    .then((response) => {
      modalMessageText.style.color = 'green' ;
      if (response.message === 'Email was sent successfully') {
        modalMessageText.textContent = response.message;
      } else {
        modalMessageText.textContent = response.message;
      }
    });
});
forgotPassword.addEventListener('click', (event) => {
  event.preventDefault();
  modal.style.display = 'block';
});
button.addEventListener('click', (event) => {
  const inputData = {
    email: emailInput.value,
    password: passwordInput.value
  };
  
  event.preventDefault();
  fetch(`${baseUrl}/api/v1/auth/login`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(inputData)
  })
    .then(response => response.json())
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
