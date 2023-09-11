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
        alert(error.response.data);
        // location.reload();
      });
  };
};
