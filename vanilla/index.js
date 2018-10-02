const getStartedButton = document.querySelector('#get-started a');
const navLinks = document.querySelectorAll('ul a');

window.addEventListener('load', (event) => {
  event.preventDefault();
  if (localStorage.getItem('token')) {
    navLinks[1].innerHTML = `<i class="fa fa-user-circle"></i> Welcome ${localStorage.getItem('userName')}`;
    navLinks[1].href = 'list.html';
    navLinks[2].textContent = 'Sign Out';
    navLinks[2].href = 'signin.html';
    getStartedButton.textContent = 'View Requests';
    getStartedButton.href = 'list.html';
  }
});
navLinks[2].addEventListener('click', (event) => {
  localStorage.clear();
});
