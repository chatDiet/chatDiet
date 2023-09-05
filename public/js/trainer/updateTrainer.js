const urlParams = new URLSearchParams(window.location.search);
const companyId = urlParams.get('companyId');
const trainerId = urlParams.get('trainerId');

$('#saveTrinaerInfo').click(function () {
  const trainerName = $('#trainerName').val();
  const career = $('#career').val();
  const ptContent = $('#ptContent').val();
  // const 이미지 = $('#이미지').val();

  axios
    .put(`/api/companys/${companyId}/trainers/${trainerId}`, { trainerName, career, ptContent })
    .then(function (response) {
      alert('수정 완료');
      location.href = '/trainerInfo';
    })
    .catch(function (error) {
      alert('수정 실패');
      location.href = '/trainerInfo';
    });
});
