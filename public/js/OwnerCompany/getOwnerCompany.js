document.addEventListener('DOMContentLoaded', async () => {
  const editButton = document.getElementById('edit-button');
  const deleteButton = document.getElementById('delete-button');
  const companyId = 6; // 가져올 업체의 ID

  try {
    const response = await axios.get(`/api/company/${companyId}`);
    const company = response.data;

    //document.getElementById('company-image').src = company.imageUrl;
    document.getElementById('company-name').textContent = company.companyName;
    document.getElementById('company-address').textContent = company.map;

    const infoBox = document.getElementById('info-box');
    infoBox.innerHTML = `
        <div class="info-item">
          <h3>운영시간</h3>
          <p>${company.time}</p>
        </div>
        <div class="info-item">
          <h3>운영 프로그램</h3>
          <p>${company.additional}</p>
        </div>
        <div class="info-item">
          <h3>부가 서비스</h3>
          <p>${company.service}</p>
        </div>
        <div class="info-item">
          <h3>전화번호</h3>
          <p>+82 ${company.phoneNumber}</p>
        </div>
        <div class="info-item">
          <h3>바로가기</h3>
          <p><a href="${company.link}">업체 홈페이지</a></p>
        </div>
      `;
    deleteButton.addEventListener('click', async () => {
      // 확인 메시지 창 띄우기
      const confirmDelete = confirm('정말 삭제하시겠습니까?');
      if (confirmDelete) {
        try {
          const deleteResponse = await axios.delete(`/api/company/${companyId}`);
          if (deleteResponse.status === 200) {
            // 업체 정보 삭제 후 리다이렉트 등 필요한 동작 수행
            alert('업체 정보가 삭제되었습니다.');
            window.location.href = 'http://localhost:3000/userMain'; // 삭제 후 이동할 페이지 URL로 변경
          } else {
            alert('업체 정보 삭제에 실패했습니다.');
          }
        } catch (error) {
          alert(error.response.data);
        }
      } else {
        alert('삭제가 취소되었습니다.');
      }
    });
  } catch (error) {
    alert(error.response.data);
  }
  editButton.addEventListener('click', () => {
    // 버튼을 눌렀을 때 다른 페이지로 이동하게 하려면 window.location.href를 사용
    window.location.href = `http://localhost:3000/putOwnerCompany`;
  });
});
