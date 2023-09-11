document.getElementById('write-schedule-form').addEventListener('submit', async function (event) {
  event.preventDefault();

  const date = $('#date').val(); // 날짜를 가져옴
  const startTime = $('#startTime').val(); // 시작 시간을 가져옴
  const endTime = $('#endTime').val(); // 종료 시간을 가져옴
  const title = $('#title').val();

  const formData = new FormData();
  formData.append('date', date); // 날짜를 formData에 추가
  formData.append('startTime', startTime); // 시작 시간을 formData에 추가
  formData.append('endTime', endTime); // 종료 시간을 formData에 추가
  formData.append('title', title);

  axios
    .post(`/api/schedule`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(function (response) {
      alert('스케줄이 저장되었습니다.');
      // location.reload();
      location.href = '/trainer';
    })
    .catch(function (error) {
      alert('회원과의 계약을 우선적으로 진행해주세요 !', error);
    });
});
