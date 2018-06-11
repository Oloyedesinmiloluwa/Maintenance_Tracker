const setStatus = (status) => {
  if (status === 'approved') return 'fa fa-thumbs-up';
  else if (status === 'disapproved') return 'fa fa-thumbs-down';
  else if (status === 'resolved') return 'fa fa-check';
  else if (status === 'pending') return 'fa fa-pause';
};
const navLinks = document.querySelectorAll('ul a');
const table = document.querySelector('table');
navLinks[3].addEventListener('click', (event) => {
  event.target.href = 'index.html';
});
window.addEventListener('load', (event) => {
  event.preventDefault();

  if (!localStorage.token) {
    window.location.href = 'signin.html';
    return;
  }
  navLinks[3].textContent = 'Sign Out';
  fetch('http://localhost:8000/api/v1/users/requests', {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'x-access-token': localStorage.getItem('token')
    },
  })
    .then(response => response.json())
    .then((response) => {
      if (response[0]) {
        response.forEach((request) => {
          table.innerHTML += `<tr><td><a id=${request.id} href="#">${request.title}</a></td><td>${request.description}</td><td>${request.category}</td><td>${request.dated}</td><td><i class="${setStatus(request.status)}"></i></td></tr>`;
        });
      } else {
        table.innerHTML += '<p class="card-no-result">No result found. Please find the add request button up there to add a new request</p>';
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
