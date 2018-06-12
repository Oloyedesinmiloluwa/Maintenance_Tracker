const titleText = document.getElementById('title-label');
const descriptionText = document.getElementById('description-label');
const categoryText = document.getElementById('category-label');
const dateText = document.getElementById('date-label');
const editButton = document.getElementById('edit-btn');
const requestImage = document.querySelector('.display-card img');
const statusMenu = document.querySelector('select');
const messageText = document.querySelector('#messageText');
const userWelcomeText = document.querySelector('#userWelcomeText');
const navLinks = document.querySelectorAll('ul a');
const setStatus = (status) => {
  if (status === 'approved') return 'fa fa-thumbs-up';
  else if (status === 'disapproved') return 'fa fa-thumbs-down';
  else if (status === 'resolved') return 'fa fa-check';
  else if (status === 'pending') return 'fa fa-pause';
};
navLinks[3].addEventListener('click', (event) => {
  localStorage.setItem('token', null);
  localStorage.setItem('userName', ' ');
});
window.addEventListener('load', (event) => {
  event.preventDefault();
  navLinks[3].textContent = 'Sign Out';
  navLinks[3].href = 'index.html';
  userWelcomeText.innerHTML += ` ${localStorage.getItem('userName')}`;
  if (localStorage.getItem('userRole') === 'admin') {
    editButton.textContent = 'Update Status';
  } else {
    statusMenu.style.display = 'none';
  }
  fetch(`https://m-tracker.herokuapp.com/api/v1/users/requests/${localStorage.getItem('requestId')}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'x-access-token': localStorage.getItem('token')
    },
  })
    .then(response => response.json())
    .then((response) => {
      if (response.data) {
        titleText.innerHTML = `${response.data.title}&nbsp;&nbsp;<i class="${setStatus(response.data.status)}"></i>`;
        descriptionText.textContent = response.data.description;
        categoryText.textContent = response.data.category;
        dateText.textContent = response.data.dated;
        requestImage.src = `assets/image/${response.data.image}`;
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
    fetch(`https://m-tracker.herokuapp.com/api/v1/requests/${localStorage.getItem('requestId')}/${statusMenu.value}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
    })
      .then(response => response.json())
      .then((response) => {
        messageText.textContent = response.message;
      });
  } else {
    localStorage.setItem('editRequest', 'started');
    window.location.href = 'addrequest.html';
  }
});