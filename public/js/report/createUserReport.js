reportBtn = (targetId, type) => {
  $('#createReportModal').css('display', 'block');

  $('#reportModalClose').click(function () {
    $('#createReportModal').css('display', 'none');
  });

  $('#saveReportModal').click(function () {
    const title = $('#titleReport').val();
    const content = $('#contentReport').val();
    saveReport(targetId, type, title, content);
    $('#createReportModal').css('display', 'none');
  });

  saveReport = (targetId, type, title, content) => {
    axios
      .post(`/api/report`, { targetId: targetId, type: type, title: title, content: content })
      .then(function (response) {
        alert('신고 완료');
        location.reload();
      })
      .catch(function (error) {
        alert(error.response.data.message);
        location.reload();
      });
  };
};
