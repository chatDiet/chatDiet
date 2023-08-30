import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

async function fetchInquiries() {
  return await axios
    .get('http://localhost:3000/api/inquirys')
    .then(function (response) {
      console.log(response.data);
      return response.data.data;
    })
    .catch(function (error) {
      alert(error.response.data.message);
      console.error('문의 목록 조회 실패', error);
      return [];
    });
}

// 문의 목록을 HTML에 표시하는 함수
async function displayInquiries() {
  const inquiryListElement = document.getElementById('inquiry-list');

  // 문의 목록 가져오기
  const inquiries = await fetchInquiries();

  // 각 문의 항목을 HTML에 추가
  inquiries.forEach(inquiry => {
    const row = document.createElement('tr');
    const titleCell = document.createElement('td');
    titleCell.textContent = inquiry.title;
    const contentCell = document.createElement('td');
    contentCell.textContent = inquiry.content;
    const dateCell = document.createElement('td');
    dateCell.textContent = inquiry.createdAt; // 예시로 가져온 데이터 구조에 따라서 필드명 수정 필요

    row.appendChild(titleCell);
    row.appendChild(contentCell);
    row.appendChild(dateCell);

    inquiryListElement.appendChild(row);
  });
}

// 페이지 로딩 시 문의 목록 표시
document.addEventListener('DOMContentLoaded', () => {
  displayInquiries();
});
