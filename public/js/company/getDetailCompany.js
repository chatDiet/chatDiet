const urlParams = new URLSearchParams(window.location.search);
const companyId = urlParams.get('companyId');

// 업체 상세 조회
axios.get(`/api/company/${companyId}`).then(function (response) {
  const result = response.data;

  $('#formdata').empty();

  const imageUrls = result.imageUrl.split(',');

  const smallImagesContainer = document.getElementById('companyImage');
  for (const imageUrl of imageUrls) {
    const imgElement = document.createElement('img');
    imgElement.src = imageUrl;
    imgElement.classList.add('small-image');
    smallImagesContainer.appendChild(imgElement);
  }

  const companyName = result.companyName;
  const link = result.link;
  const address = result.map;
  const phoneNumber = result.phoneNumber;
  const time = result.time;
  const service = result.service;
  const additional = result.additional;
  const companyId = result.companyId;
  const type = 'company';

  let temp_html = `
      <div id="companyList">
        <div id="companyName">업체 이름 : ${companyName}</div>
        <div id="phoneNumber">연락처 : ${phoneNumber}</div>
        <div id="map">map : ${address}</div>
        <div id="time">운영시간 : ${time}</div>
        <div id="additional">추가 운영 프로그램 : ${additional}</div>
        <div id="service">부가 서비스 : ${service}</div>
        <div id="link">link : ${link}</div>
      </div>
      <div id="trainerInfo">트레이너 목록
        <div id="trainerList"></div>
      </div>
      <button id="createReviewBtn" onclick="createReviewBtn(${companyId}, '${type}')">리뷰 작성</button>
      <div id="reviews"></div>
      <div id="companyMap" style="width: 100%; height: 400px;"></div>
      `;
  $('#formdata').append(temp_html);

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
      <div><img id="image" src="${imageUrl}" /></div>
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
