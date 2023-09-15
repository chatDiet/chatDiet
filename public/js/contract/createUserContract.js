createContractBtn = trainerId => {
  $('#createPtModal').css('display', 'block');

  $('#ptModalClose').click(function () {
    $('#createPtModal').css('display', 'none');
  });

  $('#savePtModal').click(function () {
    const ptNumber = $('#ptNumber').val();
    saveReport(trainerId, ptNumber);
    $('#createPtModal').css('display', 'none');
  });

  saveReport = (trainerId, ptNumber) => {
    axios
      .post('api/contract', { trainerId, ptNumber })
      .then(function (response) {
        alert('계약 성공');
        location.reload();
      })
      .catch(function (error) {
        if (error.response.data.message === '토큰이 제공되지 않았습니다.') {
          alert('로그인이 필요한 서비스입니다.');
          location.href = '/login';
        } else {
          alert(error.response.data);
          location.reload();
        }
      });
  };
};
