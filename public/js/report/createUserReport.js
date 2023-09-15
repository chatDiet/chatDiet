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
        if (error.response.data.message === '토큰이 제공되지 않았습니다.') {
          alert('로그인이 필요한 서비스입니다.');
          location.href = '/login';
        }
      });
  };
};
