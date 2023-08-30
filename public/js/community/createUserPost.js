// 게시글 생성
$('#savePost').click(function () {
  const title = $('#postTitle').val();
  const content = $('#postContent').val();
  axios
    .post('/api/post', { title: title, content: content })
    .then(function (response) {
      const postId = response.data.data.postId;
      alert('게시글 작성 완료');
      location.href = `/detailCommunity?postId=${postId}`;
    })
    .catch(function (error) {
      alert(error.response.data.message);
      location.href = `/communityMain`;
    });
});
