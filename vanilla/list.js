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
const dateButton = document.querySelector('#filter-date button');
const dateInput = document.querySelector('[type="date"]');
const statusDropDown = document.getElementsByName('status-dropdown')[0];
const categoryDropDown = document.getElementsByName('category-dropdown')[0];
const loader = document.querySelector('.loader');
const prevButton = document.querySelectorAll('.pagination button')[0];
const nextButton = document.querySelectorAll('.pagination button')[1];
const filterMessage = document.getElementById('filter-message');
const pageNumber = document.getElementById('page-num');

const baseUrl = window.location.origin;
let totalRequest;
let pageCounter = 1;
const limit = 20;
let isAdmin = false;
if (localStorage.getItem('userRole') === 'admin') isAdmin = true;
const refreshPagination = () => {
  pageCounter = 1;
  pageNumber.textContent = 'Page 1';
  nextButton.style.visibility = 'visible';
  prevButton.style.visibility = 'visible';
  nextButton.disabled = false;
  nextButton.style.backgroundColor = '#15437F';
  prevButton.disabled = true;
  prevButton.style.backgroundColor = 'grey';
}
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
        table.innerHTML = '<p class="text-center">No result found</p>';
      }
    });
}
nextButton.addEventListener('click', () => {
  pageCounter += 1;
  prevButton.disabled = false;
  prevButton.style.backgroundColor = '#15437F';
  if ((pageCounter) * limit >= totalRequest) {
    nextButton.disabled = true;
    nextButton.style.backgroundColor = 'grey';
  }
  pageNumber.textContent = `Page ${pageCounter}`;
  if (isAdmin) fetchFilteredRequest(`${baseUrl}/api/v1/requests?page=${pageCounter}&limit=${limit}`);
  else fetchFilteredRequest(`${baseUrl}/api/v1/users/requests?page=${pageCounter}&limit=${limit}`);
});
prevButton.addEventListener('click', () => {
  nextButton.disabled = false;
  nextButton.style.backgroundColor = '#15437F';
  pageCounter -= 1;
  if ((pageCounter - 1) < 1) {
    prevButton.disabled = true;
    prevButton.style.backgroundColor = 'grey';
  }
  pageNumber.textContent = `Page ${pageCounter}`;
  if (isAdmin) fetchFilteredRequest(`${baseUrl}/api/v1/requests?page=${pageCounter}&limit=${limit}`);
  else fetchFilteredRequest(`${baseUrl}/api/v1/users/requests?page=${pageCounter}&limit=${limit}`);
});
dateButton.addEventListener('click', (event) => {
  table.innerHTML = '';
  filterMessage.textContent = '';
  loader.style.display = 'block';
  nextButton.style.visibility = 'hidden';
  prevButton.style.visibility = 'hidden';
  pageNumber.textContent = '';
  if (dateInput.value) {
    const date = new Date(dateInput.value).toDateString();
    filterMessage.textContent = `Displaying requests from ${date}`;
  }
  event.preventDefault();
  if (isAdmin) fetchFilteredRequest(`${baseUrl}/api/v1/requests?dated=${dateInput.value}`);
  else fetchFilteredRequest(`${baseUrl}/api/v1/users/requests?dated=${dateInput.value}`);
});
navLinks[3].addEventListener('click', (event) => {
  event.target.href = 'index.html';
  localStorage.clear();
});
window.addEventListener('load', (event) => {
  event.preventDefault();
  userWelcomeText.innerHTML += ` ${localStorage.getItem('userName')}`;
  navLinks[3].textContent = 'Sign Out';
  let url = `${baseUrl}/api/v1/users/requests`;
  if (isAdmin) url = `${baseUrl}/api/v1/requests`;
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
        totalRequest = response.data.length;
        if (totalRequest <= limit) {
          nextButton.style.display = 'none';
          prevButton.style.display = 'none';
          pageNumber.style.display = 'none';
        } else {
          refreshPagination();
        }
        response.data = response.data.slice(0, limit);
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
});

filterButton.addEventListener('click', (event) => {
  filterMessage.textContent = '';
  if (statusDropDown.value || categoryDropDown.value) filterMessage.textContent = `Result filtered by ${statusDropDown.value}${categoryDropDown.value}`;
  if (statusDropDown.value && categoryDropDown.value) filterMessage.textContent = `Result filtered by ${statusDropDown.value} & ${categoryDropDown.value}`;
  table.innerHTML = '';
  loader.style.display = 'block';
  nextButton.style.visibility = 'hidden';
  prevButton.style.visibility = 'hidden';
  pageNumber.textContent = '';
  if (!statusDropDown.value && !categoryDropDown.value) {
    refreshPagination();
    if (isAdmin) fetchFilteredRequest(`${baseUrl}/api/v1/requests?page=${pageCounter}&limit=${limit}`);
    else fetchFilteredRequest(`${baseUrl}/api/v1/users/requests?page=${pageCounter}&limit=${limit}`);
    return;
  }
  if (isAdmin) fetchFilteredRequest(`${baseUrl}/api/v1/requests?status=${statusDropDown.value}&category=${categoryDropDown.value}`);
  else fetchFilteredRequest(`${baseUrl}/api/v1/users/requests?status=${statusDropDown.value}&category=${categoryDropDown.value}`);
});
table.addEventListener('click', (event) => {
  event.preventDefault();
  if (event.target.matches('a')) {
    localStorage.setItem('requestId', event.target.id);
    window.location.href = 'detail.html';
  }
});
