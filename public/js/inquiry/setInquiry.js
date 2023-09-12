import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

const inquiryForm = document.getElementById('inquiry-form');

inquiryForm.addEventListener('submit', async event => {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  axios
    .post(`/api/inquiry`, { title: title, content: content })
    .then(function (response) {
      alert(response.data.message);

      window.location.href = `/`;
    })
    .catch(function (error) {
      alert(error.response.data.message);
    });
});
