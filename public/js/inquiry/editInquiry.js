import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

const urlParams = new URLSearchParams(window.location.search);
const inquiryId = urlParams.get('inquiryId');

// 수정 버튼
const editInquiryForm = document.getElementById('editInquiry-form');

editInquiryForm.addEventListener('submit', async event => {
  event.preventDefault();

  const title = document.getElementById('title').value;

  const content = document.getElementById('content').value;

  axios
    .put(`/api/inquirys/${inquiryId}`, { title: title, content: content })
    .then(response => {
      alert(`문의 ${inquiryId} 수정 성공:`);

      window.location.href = `/inquirys`;
    })
    .catch(error => {
      alert('수정 실패');
    });
});
