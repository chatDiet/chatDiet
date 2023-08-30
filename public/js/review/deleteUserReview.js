deleteReviewBtn = reviewId => {
  axios
    .delete(`/api/review/${reviewId}`)
    .then(function (res) {
      alert('삭제 성공');
      location.reload();
    })
    .catch(function (error) {
      alert(error.response.data.message);
      location.href = `/companyMain`;
    });
};
