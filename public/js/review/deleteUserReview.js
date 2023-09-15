deleteReviewBtn = reviewId => {
  axios
    .delete(`/api/review/${reviewId}`)
    .then(function (res) {
      alert('삭제 성공');
      location.reload();
    })
    .catch(function (error) {
      if (error.response.data.message === '토큰이 제공되지 않았습니다.') {
        alert('로그인이 필요한 서비스입니다.');
        location.href = '/login';
      } else {
        alert(error.response.data.message);
        location.href = `/companyMain`;
      }
    });
};
