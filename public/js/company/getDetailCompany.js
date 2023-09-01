const urlParams = new URLSearchParams(window.location.search);
const companyId = urlParams.get('companyId');

// 업체 상세 조회
axios.get(`/api/company/${companyId}`).then(function (response) {
  const result = response.data;
  $('.main-section').empty();
  const companyName = result.companyName;
  const imageUrl = result.imageUrl;
  const link = result.link;
  const map = result.map;
  const phoneNumber = result.phoneNumber;
  const time = result.time;
  const service = result.service;
  const additional = result.additional;
  const companyId = result.companyId;
  const type = 'company';

  let temp_html = `
      <div id="companyList">
        <div id="imageUrl">imageUrl : ${imageUrl}</div>
        <div id="companyName">업체 이름 : ${companyName}</div>
        <div id="phoneNumber">연락처 : ${phoneNumber}</div>
        <div id="map">map : ${map}</div>
        <div id="time">운영시간 : ${time}</div>
        <div id="additional">추가 운영 프로그램 : ${additional}</div>
        <div id="service">부가 서비스 : ${service}</div>
        <div id="link">link : ${link}</div>
      </div>
      <div id="trainerInfo">트레이너 목록
        <div id="trainerList"></div>
      </div>
      <button id="createReviewBtn" onclick="createReviewBtn(${companyId}, '${type}')">리뷰 작성</button>
      <div id="reviews"></div>`;
  $('.main-section').append(temp_html);
});

// 업체 트레이너 전체 조회
axios.get(`/api/companys/${companyId}/trainer`).then(function (response) {
  const result = response.data.data;

  $('#trainerList').empty();
  for (let i = 0; result.length > i; i++) {
    const trainerId = result[i].trainerId;
    const userId = result[i].userId;
    const imageUrl = result[i].imageUrl;
    const trainerName = result[i].trainerName;
    const career = result[i].career;
    const ptContent = result[i].ptContent;

    let temp_html = `
    <button id="trainer" onclick="getDetailTrainerBtn(${companyId}, ${trainerId})">
      <div>imageUrl : ${imageUrl}</div>
      <div>트레이너 이름 : ${trainerName}</div>
      <div>경력 : ${career}</div>
      <div>PT 내용 : ${ptContent}</div>
    </button>`;
    $('#trainerList').append(temp_html);
  }
});

// 업체 리뷰
axios
  .get(`/api/review/${companyId}/company`)
  .then(function (response) {
    const result = response.data;

    if (result.length <= 0) {
      $('#reviews').empty();
      let temp_html = `<div>리뷰가 없습니다.</div>`;
      $('#reviews').append(temp_html);
    } else {
      $('#reviews').empty();
      for (let i = 0; result.length > i; i++) {
        const reviewId = result[i].reviewId;
        const content = result[i].content;
        const grade = result[i].grade;
        const type = 'review';

        let temp_html = `
      <div id="review">
        <div>내용 : ${content}</div>
        <div>평점 : ${grade}</div>
        <button onclick="reportBtn(${reviewId}, '${type}')">신고 버튼</button>
        <button onclick="deleteReviewBtn(${reviewId})">삭제 버튼</button>
      </div>`;
        $('#reviews').append(temp_html);
      }
    }
  })
  .catch(function (error) {});
