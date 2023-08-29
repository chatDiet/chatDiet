document.addEventListener('DOMContentLoaded', async () => {
    const companyId = 1; // 가져올 업체의 ID
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
          <p>${company.phoneNumber}</p>
        </div>
        <div class="info-item">
          <h3>바로가기</h3>
          <p><a href="${company.link}">업체 홈페이지</a></p>
        </div>
      `;
    } catch (error) {
      console.error(error.response.data);
    }
  });
  