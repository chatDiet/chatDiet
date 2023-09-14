document.addEventListener('DOMContentLoaded', function () {
  axios.get('/api/company').then(function (response) {
    const result = response.data;

    function currentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          // Geolocation 접속 위치 불러오기

          let lat = position.coords.latitude; //위도
          let lon = position.coords.longitude; //경도

          let mapContainer = document.getElementById('map'), // 지도를 표시할 div
            mapOption = {
              center: new kakao.maps.LatLng(lat, lon), // 지도의 중심좌표
              level: 5, // 지도의 확대 레벨
            };

          const map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
          const geocoder = new kakao.maps.services.Geocoder(); // 주소 좌표 변환 객체 생성

          let positions = [{ content: `<div">내 위치</div>`, lating: new kakao.maps.LatLng(lat, lon) }];

          for (const company of result) {
            geocoder.addressSearch(company.map, function (address, status) {
              if (status === kakao.maps.services.Status.OK) {
                positions.push({
                  content: `<div style="text-align:center;">${company.companyName}</div>`,
                  lating: new kakao.maps.LatLng(address[0].y, address[0].x),
                });
              }
              for (let i = 1; i <= positions.length; i++) {
                let marker = new kakao.maps.Marker({
                  map: map, // 마커를 표시할 지도
                  position: positions[i - 1].lating, // 마커의 위치
                });

                let infowindow = new kakao.maps.InfoWindow({
                  content: positions[i - 1].content, // 인포윈도우에 표시할 내용
                });

                kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
                kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
              }
            });
          }

          function makeOverListener(map, marker, infowindow) {
            return function () {
              infowindow.open(map, marker);
            };
          }

          // 인포윈도우를 닫는 클로저를 만드는 함수입니다
          function makeOutListener(infowindow) {
            return function () {
              infowindow.close();
            };
          }
        });
      }
      return true;
    }
    currentLocation(); // 지도 불러오기
  });
});
