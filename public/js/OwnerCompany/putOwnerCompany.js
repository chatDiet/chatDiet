const urlParams = new URLSearchParams(window.location.search);
const companyId = urlParams.get('companyId');

document.getElementById('registration-form').addEventListener('submit', async function (event) {
  event.preventDefault();

  const companyName = $('#companyName').val();
  const map = $('#map').val();
  const time = $('#time').val();
  const additional = $('#additional').val();
  const service = $('#service').val();
  const phoneNumber = $('#phoneNumber').val();
  const link = $('#link').val();
  // const image = document.getElementById('image').files[0];
  //<!-- 혜민님 이미지 4번입니다.-->

  axios
    .put(`/api/company/${companyId}`, {
      companyName: companyName,
      map: map,
      time: time,
      additional: additional,
      service: service,
      phoneNumber: phoneNumber,
      link: link,
    })
    .then(function (response) {
      alert('수정이 완료되었습니다.');
      window.location.href = `/getOwnerCompany`;
    })
    .catch(function (error) {});
});
