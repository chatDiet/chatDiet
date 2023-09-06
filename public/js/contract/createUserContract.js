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
        alert(error.response.data);
        location.reload();
      });
  };
};
