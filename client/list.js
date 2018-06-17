const setStatus = (status) => {
  if (status === 'approved') return 'fa fa-thumbs-up';
  else if (status === 'disapproved') return 'fa fa-thumbs-down';
  else if (status === 'resolved') return 'fa fa-check';
  else if (status === 'pending') return 'fa fa-pause';
};
const navLinks = document.querySelectorAll('ul a');
const table = document.querySelector('table');
const userWelcomeText = document.querySelector('#userWelcomeText');
const filterButton = document.querySelector('.status-container button');
const dateButton = document.querySelector('#sort-date button');
const dateInput = document.querySelector('[type="date"]');
const statusDropDown = document.getElementsByName('status-dropdown')[0];
const categoryDropDown = document.getElementsByName('category-dropdown')[0];
const loader = document.querySelector('.loader');
dateButton.addEventListener('click', (event) => {
  table.innerHTML = '';
  loader.style.display = 'block';
  event.preventDefault();
  fetchFilteredRequest(`https://m-tracker.herokuapp.com/api/v1/users/requests?dated=${dateInput.value}`);
});
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
  let url = 'https://m-tracker.herokuapp.com/api/v1/users/requests';
  if (localStorage.getItem('userRole') === 'admin') url =  'https://m-tracker.herokuapp.com/api/v1/requests';
  fetch(url, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'x-access-token': localStorage.getItem('token')
    },
  })
    .then(response => response.json())
    .then((response) => {
      loader.style.display = 'none';      
      if (response.data) {
        table.innerHTML = '<tr><th>Title</th><th>Description</th><th>Category</th><th>Date</th><th>Status</th></tr>';
        response.data.forEach((request) => {
          const date = new Date(request.dated);
          if (request.description.length > 80) request.description = `${request.description.slice(0, 79)}...`;
          table.innerHTML += `<tr><td><a id=${request.id} href="#">${request.title}</a></td><td>${request.description}</td><td>${request.category}</td><td>${date.toLocaleDateString()}</td><td><i class="${setStatus(request.status)}"></i></td></tr>`;
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
const fetchFilteredRequest = (url) => {
  fetch(url, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'x-access-token': localStorage.getItem('token')
    },
  })
    .then(response => response.json())
    .then((response) => {
      loader.style.display = 'none';
      if (response.data) {
        table.innerHTML = '<tr><th>Title</th><th>Description</th><th>Category</th><th>Date</th><th>Status</th></tr>';
        response.data.forEach((request) => {
          const date = new Date(request.dated);
          if (request.description.length > 80) request.description = `${request.description.slice(0, 79)}...`;
          table.innerHTML += `<tr><td><a id=${request.id} href="#">${request.title}</a></td><td>${request.description}</td><td>${request.category}</td><td>${date.toLocaleDateString()}</td><td><i class="${setStatus(request.status)}"></i></td></tr>`;
        });
      } else if (response.message === 'Authentication failed') {
        document.body.innerHTML = 'You are not logged in....';
        window.location.href = 'signin.html';
      }
      else {
        table.innerHTML = '<p class="card-no-result text-center">No result found. Please find the add request button up there to add a new request</p>';
      }
    });
}
filterButton.addEventListener('click', (event) => {
  table.innerHTML = '';
  loader.style.display = 'block';
  fetchFilteredRequest(`https://m-tracker.herokuapp.com/api/v1/users/requests?status=${statusDropDown.value}&category=${categoryDropDown.value}`);
});
table.addEventListener('click', (event) => {
  event.preventDefault();
  if (event.target.matches('a')) {
    localStorage.setItem('requestId', event.target.id);
    window.location.href = 'detail.html';
  }
});
