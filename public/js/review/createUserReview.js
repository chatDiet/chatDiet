createReviewBtn = (targetId, type) => {
  $('#createReviewModal').css('display', 'block');

  $('#reviewModalClose').click(function () {
    $('#createReviewModal').css('display', 'none');
  });

  $('#saveReviewModal').click(function () {
    const content = $('#content').val();
    const grade = $('#grade').val();
    saveReport(targetId, type, content, grade);
    $('#createReviewModal').css('display', 'none');
  });

  saveReport = (targetId, type, content, grade) => {
    axios
      .post(`/api/review/${targetId}`, { type: type, content: content, grade: grade })
      .then(function (response) {
        alert('리뷰 작성 완료');
        location.reload();
      })
      .catch(function (error) {
        if (error.response.data.message === '토큰이 제공되지 않았습니다.') {
          alert('로그인이 필요한 서비스입니다.');
          location.href = '/login';
        } else {
          alert(error.response.data);
        }
        // location.reload();
      });
  };
};
