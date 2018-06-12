const setStatus = (status) => {
  if (status === 'approved') return 'fa fa-thumbs-up';
  else if (status === 'disapproved') return 'fa fa-thumbs-down';
  else if (status === 'resolved') return 'fa fa-check';
  else if (status === 'pending') return 'fa fa-pause';
};
const navLinks = document.querySelectorAll('ul a');
const table = document.querySelector('table');
const userWelcomeText = document.querySelector('#userWelcomeText');
navLinks[3].addEventListener('click', (event) => {
  event.target.href = 'index.html';
  localStorage.setItem('token', null);
  localStorage.setItem('userName', ' ');
});
window.addEventListener('load', (event) => {
  event.preventDefault();
  if (!localStorage.token) {
    window.location.href = 'signin.html';
    return;
  }
  userWelcomeText.innerHTML += ` ${localStorage.getItem('userName')}`;
  navLinks[3].textContent = 'Sign Out';
  fetch('https://m-tracker.herokuapp.com/api/v1/users/requests', {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'x-access-token': localStorage.getItem('token')
    },
  })
    .then(response => response.json())
    .then((response) => {
      if (response.data) {
        response.data.forEach((request) => {
          table.innerHTML += `<tr><td><a id=${request.id} href="#">${request.title}</a></td><td>${request.description}</td><td>${request.category}</td><td>${request.dated}</td><td><i class="${setStatus(request.status)}"></i></td></tr>`;
        });
      } else if(response.message === 'Authentication failed') {
        document.body.innerHTML = 'You are not logged in....';
        window.location.href = 'signin.html';
      }
      else {
        table.innerHTML = '<p class="card-no-result text-center">No result found. Please find the add request button up there to add a new request</p>';
      }
    });
});

table.addEventListener('click', (event) => {
  event.preventDefault();
  if ( event.target.matches('a')) {
    localStorage.setItem('requestId', event.target.id);
    window.location.href = 'detail.html';
  }
});
