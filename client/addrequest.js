const button = document.getElementById('request-btn');
const titleInput = document.getElementById('title-input');
const descriptionInput = document.getElementById('description-input');
const categoryInput = document.getElementById('category-input');
const messageText = document.querySelector('#messageText');
const navLinks = document.querySelectorAll('ul a');

window.addEventListener('load', (event) => { 
  navLinks[2].textContent = 'Sign Out';
  if (localStorage.getItem('editRequest') === 'started') {
    const request = {
      title: localStorage.getItem('requestBufferTitle'),
      description: localStorage.getItem('requestBufferDescription'),
      category: localStorage.getItem('requestBufferCategory')
    }
    titleInput.value = request.title;
    descriptionInput.value = request.description;
    categoryInput.value = request.category;
  }
});
button.addEventListener('click', (event) => {
  const inputData = {
    title: titleInput.value,
    description: descriptionInput.value,
    category: categoryInput.value || 'unspecified',
    image: 'repair2.png'
  };
  let url = 'https://m-tracker.herokuapp.com/api/v1/users/requests';
  let httpMethod = 'POST';
  if (localStorage.getItem('editRequest') === 'started') {
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
        messageText.textContent = data.message;
      } else if (data.message === 'Request Updated Successfully') {
        window.location.href = 'detail.html';
      }
      else {
        messageText.textContent = data.message;
      }
      localStorage.setItem('editRequest', 'ended');
    });
});
