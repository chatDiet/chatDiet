axios.get('/api/company').then(function (response) {
  const result = response.data;
  $('#companyNames').empty();
  for (let i = result.length - 1; i >= 0; i--) {
    const companyName = result[i].companyName;
    const companyId = result[i].companyId;

    const temp_html = `
    <option value="${companyId}">${companyName}</option>
    `;
    $('#companyNames').append(temp_html);
  }
});
$('#createTrinaerInfo').click(function () {
  const trainerName = $('#trainerName').val();
  const career = $('#career').val();
  const ptContent = $('#ptContent').val();
  const ptAmount = $('#ptAmount').val();
  const companyId = $('#companyNames option:selected').val();
  // const image = $('#image').files();
  const image = document.getElementById('image').files[0];

  const data = {
    trainerName,
    career,
    ptContent,
    ptAmount,
    companyId,
    image,
  };

  axios
    .post(`/api/trainer`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then(function (response) {
      alert('등록 완료');
      location.href = '/trainerInfo';
    })
    .catch(function (error) {
      console.log(error);
      alert('트레이너 등록 중 에러 발생');
      location.reload();
      
    });
});
