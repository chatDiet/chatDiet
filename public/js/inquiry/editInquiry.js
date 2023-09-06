import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

const urlParams = new URLSearchParams(window.location.search);
const inquiryId = urlParams.get('inquiryId');

// 수정 버튼
const editInquiryForm = document.getElementById('editInquiry-form');

editInquiryForm.addEventListener('submit', async event => {
  event.preventDefault();

  const title = document.getElementById('title').value;

  console.log(title);
  const content = document.getElementById('content').value;

  axios
    .put(`http://localhost:3000/api/inquirys/${inquiryId}`, { title: title, content: content })
    .then(response => {
      console.log(`문의 ${inquiryId} 수정 성공:`, response.data);
      alert(`문의 ${inquiryId} 수정 성공:`);

      window.location.href = `http://localhost:3000/inquirys`;
    })
    .catch(error => {
      console.error(`문의 ${inquiryId} 수정 실패:`, error);
    });
});
