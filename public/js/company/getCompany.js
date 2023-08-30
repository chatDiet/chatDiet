// 업체 전체 조회
axios.get('/api/company').then(function (response) {
  const result = response.data;
  $('.main-section').empty();
  for (let i = result.length - 1; i >= 0; i--) {
    const companyName = result[i].companyName;
    const imageUrl = result[i].imageUrl;
    const link = result[i].link;
    const map = result[i].map;
    const phoneNumber = result[i].phoneNumber;
    const time = result[i].time;
    const service = result[i].service;
    const additional = result[i].additional;
    const companyId = result[i].companyId;
    const userId = result[i].userId;

    let temp_html = `
    <button id="companyList" onclick="getDetailCompanyBtn(${companyId})">
      <div>companyId : ${companyId}</div>
      <div>userId : ${userId}</div>
      <div>companyName : ${companyName}</div>
      <div>imageUrl : ${imageUrl}</div>
      <div>link : ${link}</div>
      <div>map : ${map}</div>
      <div>phoneNumber : ${phoneNumber}</div>
      <div>time : ${time}</div>
      <div>service : ${service}</div>
      <div>additional : ${additional}</div>
    </button>
    `;
    $('.main-section').append(temp_html);
  }
});
