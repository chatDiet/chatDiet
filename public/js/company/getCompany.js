// 업체 전체 조회
axios.get('/api/company').then(function (response) {
  const result = response.data;
  $('#companyZone').empty();
  for (let i = result.length - 1; i >= 0; i--) {
    const companyName = result[i].companyName;
    const imageUrlString = result[i].imageUrl; // imageUrl 문자열 가져오기
    const imageUrlArray = imageUrlString.split(','); // 쉼표로 분할하여 배열 생성
    const firstImageUrl = imageUrlArray[0]; // 첫 번째 URL 가져오기
    const map = result[i].map;
    const phoneNumber = result[i].phoneNumber;
    const time = result[i].time;
    const companyId = result[i].companyId;

    let temp_html = `
    <div id="getDetailCompanyBtn" onclick="getDetailCompanyBtn(${companyId})">
      <div class='imgArea'><img src ="${firstImageUrl}" id="img1"/></div>
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
