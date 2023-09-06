// 업체 전체 조회
axios.get('/api/company').then(function (response) {
  const result = response.data;
  $('#companyZone').empty();
  for (let i = result.length - 1; i >= 0; i--) {
    const companyName = result[i].companyName;
    const imageUrl = result[i].imageUrl;
    const map = result[i].map;
    const phoneNumber = result[i].phoneNumber;
    const time = result[i].time;
    const companyId = result[i].companyId;

    let temp_html = `
    <div id="getDetailCompanyBtn" onclick="getDetailCompanyBtn(${companyId})">
      <div class='imgArea'>imageUrl : ${imageUrl}</div>
      <div class='companyExplain'>
      <div>업체 이름 : ${companyName}</div>
      <div> 주소 : ${map}</div>
      <div>연락처 : ${phoneNumber}</div>
      <div>운영시간 : ${time}</div>
      </div>
    </div>
    `;
    $('#companyZone').append(temp_html);
  }
});
