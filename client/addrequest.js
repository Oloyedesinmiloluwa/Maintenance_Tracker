const submitButton = document.querySelector('#request-btn button');
const titleInput = document.getElementById('title-input');
const descriptionInput = document.getElementById('description-input');
const categoryInput = document.getElementById('category-input');
const messageText = document.querySelector('#messageText');
const userWelcomeText = document.querySelector('#userWelcomeText');
const fileUpload = document.getElementById('file-upload');
const requestImage = document.querySelector('.show-detail-card img');
const navLinks = document.querySelectorAll('ul a');
let isEditRequest = false;
let imagePath = '';
navLinks[2].addEventListener('click', (event) => {
  localStorage.setItem('token', null);
  localStorage.setItem('userName', ' ');
});
fileUpload.addEventListener('change', (event) => {
  event.preventDefault();
  const formData = new FormData();
  formData.append('request', fileUpload.files[0]);
  fetch('https://m-tracker.herokuapp.com/api/v1/upload', {
    method: 'POST',
    body: formData,
    headers: { 'x-access-token': localStorage.getItem('token') }
  })
    .then((response) => { return response.json(); })
    .then((response) => {
      if (response.message === 'File uploaded!') {
        requestImage.src = 'assets/image/request.jpg';
        imagePath = 'client/assets/image/request.jpg';
      }
      else {
        messageText.textContent = response.message;
      }
    });
});
window.addEventListener('load', (event) => { 
  navLinks[2].textContent = 'Sign Out';
  navLinks[2].href = 'index.html';
  userWelcomeText.innerHTML += ` ${localStorage.getItem('userName')}`;
  if (localStorage.getItem('editRequest') === 'started') {
    isEditRequest = true;
    const request = {
      title: localStorage.getItem('requestBufferTitle'),
      description: localStorage.getItem('requestBufferDescription'),
      category: localStorage.getItem('requestBufferCategory'),
      image: localStorage.getItem('requestBufferImage')
    }
    titleInput.value = request.title;
    descriptionInput.value = request.description;
    categoryInput.value = request.category;
    requestImage.src = request.image;
    localStorage.setItem('editRequest', 'ended');
  }
});
submitButton.addEventListener('click', (event) => {
  messageText.textContent = 'Please wait....';
  messageText.style.color = 'green';
  const inputData = {
    title: titleInput.value,
    description: descriptionInput.value,
    category: categoryInput.value || 'unspecified',
    image: imagePath
  };
  let url = 'https://m-tracker.herokuapp.com/api/v1/users/requests';
  let httpMethod = 'POST';
  if (isEditRequest) {
    url = `https://m-tracker.herokuapp.com/api/v1/users/requests/${localStorage.getItem('requestId')}`;
    httpMethod = 'PUT';
  }
  event.preventDefault();
  fetch(url, {
    method: httpMethod,
    headers: { 'content-type': 'application/json', 'x-access-token': localStorage.getItem('token') },
    body: JSON.stringify(inputData)
  })
    .then((response) => { return response.json(); })
    .then((data) => {
      messageText.textContent = data.message;
      if (data.message === 'Request Added Successfully') {
        window.location.href = 'list.html';
      } else if (data.message === 'Request Updated Successfully') {
        window.location.href = 'detail.html';
      }
      else messageText.style.color = 'red';
      isEditRequest = false;
    });
});
