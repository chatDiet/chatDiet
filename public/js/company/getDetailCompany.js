const urlParams = new URLSearchParams(window.location.search);
const companyId = urlParams.get('companyId');

// 업체 상세 조회
axios.get(`/api/company/${companyId}`).then(function (response) {
  const result = response.data;
  $('.main-section').empty();
  const companyName = result.companyName;
  const imageUrl = result.imageUrl;
  const link = result.link;
  const address = result.map;
  const phoneNumber = result.phoneNumber;
  const time = result.time;
  const service = result.service;
  const additional = result.additional;
  const companyId = result.companyId;
  const userId = result.userId;
  const type = 'post';

  let temp_html = `
      <div id="companyList" onclick="getDetailCompanyBtn(${companyId})">
        <div>companyId : ${companyId}</div>
        <div>userId : ${userId}</div>
        <div>companyName : ${companyName}</div>
        <div>imageUrl : ${imageUrl}</div>
        <div>link : ${link}</div>
        <div>map : ${address}</div>
        <div>phoneNumber : ${phoneNumber}</div>
        <div>time : ${time}</div>
        <div>service : ${service}</div>
        <div>additional : ${additional}</div>
      </div>
      <div id="trainerList"></div>
      <button id="createReviewBtn" onclick="createReviewBtn(${companyId}, '${type}')">리뷰 작성</button>
      <div id="reviews"></div>
      <div id="companyMap" style="width: 100%; height: 400px;"></div>
      `;
  $('.main-section').append(temp_html);

  // Kakao 지도 기능
  const mapAddress = address;
  const mapContainer = document.getElementById('companyMap');
  const mapOptions = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 3,
  };
  const map = new kakao.maps.Map(mapContainer, mapOptions);
  const geocoder = new kakao.maps.services.Geocoder();

  geocoder.addressSearch(mapAddress, function (result, status) {
    if (status === kakao.maps.services.Status.OK) {
      const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

      const marker = new kakao.maps.Marker({
        map: map,
        position: coords,
      });

      const infowindow = new kakao.maps.InfoWindow({
        content: `<div style="width:150px;text-align:center;padding:6px 0;">${companyName}</div>`,
      });
      infowindow.open(map, marker);

      map.setCenter(coords);
    }
  });
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
      <div>trainerId : ${trainerId}</div>
      <div>userId : ${userId}</div>
      <div>imageUrl : ${imageUrl}</div>
      <div>trainerName : ${trainerName}</div>
      <div>career : ${career}</div>
      <div>ptContent : ${ptContent}</div>
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
        const userId = result[i].userId;
        const content = result[i].content;
        const grade = result[i].grade;
        const type = 'review';

        let temp_html = `
      <div id="review">
        <div>reviewId : ${reviewId}</div>
        <div>userId : ${userId}</div>
        <div>content : ${content}</div>
        <div>grade : ${grade}</div>
        <button onclick="reportBtn(${reviewId}, '${type}')">신고 버튼</button>
        <button onclick="deleteReviewBtn(${reviewId})">삭제 버튼</button>
      </div>`;
        $('#reviews').append(temp_html);
      }
    }
  })
  .catch(function (error) {});
