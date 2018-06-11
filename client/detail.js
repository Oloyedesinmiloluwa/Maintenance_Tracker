const titleText = document.getElementById('title-label');
const descriptionText = document.getElementById('description-label');
const categoryText = document.getElementById('category-label');
const dateText = document.getElementById('date-label');
const editButton = document.getElementById('edit-btn');
const requestImage = document.querySelector('.display-card img');
const setStatus = (status) => {
  if (status === 'approved') return 'fa fa-thumbs-up';
  else if (status === 'disapproved') return 'fa fa-thumbs-down';
  else if (status === 'resolved') return 'fa fa-check';
  else if (status === 'pending') return 'fa fa-pause';
};
window.addEventListener('load', (event) => {
  event.preventDefault();
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
        document.body.innerHTML = 'Please wait...';
        window.location.href = 'signin.html';
      }
    });
});
editButton.addEventListener('click', (event) => {
event.preventDefault();
localStorage.setItem('editRequest', 'started');
window.location.href = 'addrequest.html';
});
