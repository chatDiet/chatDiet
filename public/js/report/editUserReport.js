import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

const urlParams = new URLSearchParams(window.location.search);
const reportId = urlParams.get('reportId');

// 수정 버튼
const editReportForm = document.getElementById('editReport-form');

editReportForm.addEventListener('submit', async event => {
  event.preventDefault();

  const targetId = document.getElementById('targetId').value;
  const type = document.getElementById('type').value;
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  axios
    .put(`/api/reports/${reportId}`, { targetId: targetId, type: type, title: title, content: content })
    .then(response => {
      alert(`문의 ${reportId} 수정 성공:`);

      location.href = '/reports';
    })
    .catch(error => {});
});
