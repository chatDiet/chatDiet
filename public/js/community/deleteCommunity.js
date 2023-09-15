deletePostBtn = postId => {
  axios
    .delete(`/api/posts/${postId}`)
    .then(function (res) {
      alert('삭제 성공');
      location.href = `/companyMain`;
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

deleteCommentBtn = (postId, commentId) => {
  axios
    .delete(`/api/posts/${postId}/comments/${commentId}`)
    .then(function (res) {
      alert('삭제 성공');
      location.reload();
    })
    .catch(function (error) {
      if (error.response.data.message === '토큰이 제공되지 않았습니다.') {
        alert('로그인이 필요한 서비스입니다.');
        location.href = '/login';
      } else {
        alert('삭제 권한이 없습니다');
        location.reload();
      }
    });
};
