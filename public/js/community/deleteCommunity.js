deletePostBtn = postId => {
  axios
    .delete(`/api/posts/${postId}`)
    .then(function (res) {
      alert('삭제 성공');
      location.href = `/companyMain`;
    })
    .catch(function (error) {
      alert(error.response.data);
      location.reload();
    });
};

deleteCommentBtn = (postId, commentId) => {
  axios
    .delete(`/api/posts/${postId}/comments/${commentId}`)
    .then(function (res) {
      alert('삭제 성공');
      location.reload();
    })
    .catch(function (error) {
      alert('삭제 권한이 없습니다');
      location.reload();
    });
};
