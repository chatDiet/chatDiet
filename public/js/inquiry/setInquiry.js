import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

const inquiryForm = document.getElementById('inquiry-form');

inquiryForm.addEventListener('submit', async event => {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  axios
    .post(`http://localhost:3000/api/inquiry`, { title: title, content: content })
    .then(function (response) {
      alert(response.data.message);
      console.log('문의 생성', response.data);

      const inquiryId = response.data.data.inquiryId;
      window.location.href = `http://localhost:3000/inquiry?inquiryId=${inquiryId}`;
    })
    .catch(function (error) {
      alert(error.response.data.message);
      console.error('문의 작성 실패', error);
    });
});
