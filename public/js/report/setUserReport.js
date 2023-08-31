import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

const reportForm = document.getElementById('report-form');

reportForm.addEventListener('submit', async event => {
  event.preventDefault();

  const targetId = document.getElementById('targetId').value;
  const type = document.getElementById('type').value;
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  axios
    .post(`http://localhost:3000/api/report`, { targetId: targetId, type: type, title: title, content: content })
    .then(function (response) {
      alert(response.data.message);
      console.log('신고 작성', response.data);
    })
    .catch(function (error) {
      alert(error.response.data.message);
      console.error('신고 작성 실패', error);
    });
});
