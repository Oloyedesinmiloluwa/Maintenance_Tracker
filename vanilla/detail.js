const titleText = document.getElementById('title-label');
const descriptionText = document.getElementById('description-label');
const categoryText = document.getElementById('category-label');
const dateText = document.getElementById('date-label');
const editButton = document.getElementById('edit-btn');
const deleteButton = document.getElementById('delete-btn');
const requestImage = document.querySelector('.display-card img');
const statusMenu = document.querySelector('select');
const messageText = document.querySelector('#messageText');
const userWelcomeText = document.querySelector('#userWelcomeText');
const navLinks = document.querySelectorAll('ul a');

const baseUrl = window.location.origin;
const setStatus = (status) => {
  if (status === 'approved') return 'fa fa-thumbs-up';
  else if (status === 'disapproved') return 'fa fa-thumbs-down';
  else if (status === 'resolved') return 'fa fa-check';
  else if (status === 'pending') return 'fa fa-pause';
};
navLinks[3].addEventListener('click', (event) => {
  localStorage.clear();
});
window.addEventListener('load', (event) => {
  event.preventDefault();
  navLinks[3].textContent = 'Sign Out';
  navLinks[3].href = 'index.html';
  userWelcomeText.innerHTML += ` ${localStorage.getItem('userName')}`;
  if (localStorage.getItem('userRole') === 'admin') {
    editButton.textContent = 'Update Status';
    deleteButton.style.display = 'none';
  } else {
    statusMenu.style.display = 'none';
  }
  fetch(`${baseUrl}/api/v1/users/requests/${localStorage.getItem('requestId')}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'x-access-token': localStorage.getItem('token')
    },
  })
    .then(response => response.json())
    .then((response) => {
      if (response.data) {
        const date = new Date(response.data.dated);
        titleText.innerHTML = `${response.data.title}&nbsp;&nbsp;<i class="${setStatus(response.data.status)}"></i>`;
        descriptionText.textContent = response.data.description;
        categoryText.textContent = response.data.category;
        dateText.textContent = date.toLocaleDateString();
        requestImage.src = response.data.image || 'assets/image/repair2.png';
        localStorage.setItem('requestBufferTitle', response.data.title);
        localStorage.setItem('requestBufferDescription', response.data.description);
        localStorage.setItem('requestBufferCategory', response.data.category);
        localStorage.setItem('requestBufferImage', response.data.image);
      } else {
        document.body.innerHTML = 'You are not logged in....';
        window.location.href = 'signin.html';
      }
    });
});
editButton.addEventListener('click', (event) => {
  event.preventDefault();
  if (localStorage.getItem('userRole') === 'admin') {
    fetch(`${baseUrl}/api/v1/requests/${localStorage.getItem('requestId')}/${statusMenu.value}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
    })
      .then(response => response.json())
      .then((response) => {
        messageText.textContent = response.message;
        messageText.style.color = 'green';
        if (response.data) window.location.href = 'list.html';
      });
  } else {
    localStorage.setItem('editRequest', 'started');
    window.location.href = 'addrequest.html';
  }
});
deleteButton.addEventListener('click', (event) => {
  event.preventDefault();
  fetch(`${baseUrl}/api/v1/users/requests/${localStorage.getItem('requestId')}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      'x-access-token': localStorage.getItem('token')
    },
  })
    .then(response => response.json())
    .then((response) => {
      messageText.textContent = response.message;
      if (response.message === 'Request successfully deleted') window.location.href = 'list.html';
    });
});
