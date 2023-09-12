import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

async function fetchReports() {
  return await axios
    .get('/api/reports')
    .then(function (response) {
      return response.data.data;
    })
    .catch(function (error) {
      alert(error.response.data.message);
      return [];
    });
}

// 페이지 로딩 시 문의 목록 표시
document.addEventListener('DOMContentLoaded', async () => {
  const reportListElement = document.getElementById('report-list');

  // 문의 목록 가져오기
  const reports = await fetchReports();

  // 각 문의 항목을 HTML에 추가
  reports.forEach(report => {
    const row = document.createElement('tr');
    const titleCell = document.createElement('td');
    titleCell.textContent = report.title;
    const contentCell = document.createElement('td');
    contentCell.textContent = report.content;
    const dateCell = document.createElement('td');
    dateCell.textContent = report.createdAt; // 예시로 가져온 데이터 구조에 따라서 필드명 수정 필요

    // 수정 버튼 추가
    const editCell = document.createElement('td');
    const editButton = document.createElement('button');
    editButton.textContent = '수정';
    editButton.className = 'edit-button';
    editButton.setAttribute('data-report-id', report.reportId); // inquiryId 추가
    editCell.appendChild(editButton);

    // 삭제 버튼 추가
    const deleteCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '삭제';
    deleteButton.className = 'delete-button';
    deleteButton.setAttribute('data-report-id', report.reportId); // inquiryId 추가
    deleteCell.appendChild(deleteButton);

    row.appendChild(titleCell);
    row.appendChild(contentCell);
    row.appendChild(dateCell);
    row.appendChild(editCell);
    row.appendChild(deleteCell);

    reportListElement.appendChild(row);
  });

  // 삭제 버튼
  const deleteButtons = document.querySelectorAll('.delete-button');

  deleteButtons.forEach(deleteButton => {
    deleteButton.addEventListener('click', event => {
      const reportId = deleteButton.getAttribute('data-report-id');

      axios
        .delete(`/api/reports/${reportId}`)
        .then(response => {
          alert(`문의 ${reportId} 삭제 성공:`);
          const row = deleteButton.closest('tr');
          row.remove();
        })
        .catch(error => {});
    });
  });

  const editButtons = document.querySelectorAll('.edit-button');

  editButtons.forEach(editButton => {
    editButton.addEventListener('click', async event => {
      event.preventDefault();
      const reportId = editButton.getAttribute('data-report-id');

      window.location.href = `/editReport?reportId=${reportId}`;
    });
  });
});
