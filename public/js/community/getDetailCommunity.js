const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('postId');

// 게시글 상세 조회
axios.get(`/api/posts/${postId}`).then(function (response) {
  const result = response.data;
  $('.main-section').empty();
  const postId = result.postId;
  const userId = result.userId;
  const title = result.title;
  const content = result.content;
  const type = 'post';

  let temp_html = `
      <div id="communityList">
        <div>postId : ${postId}</div>
        <div>userId : ${userId}</div>
        <div>title : ${title}</div>
        <div>content : ${content}</div>
      </div>
      <button onclick="reportBtn(${postId}, '${type}')">신고 버튼</button>
      <div id="commentList"></div>
      <button onclick="postComment()">댓글 작성</button>
      `;
  $('.main-section').append(temp_html);
});

// 댓글 조회
axios
  .get(`/api/posts/${postId}/comments`)
  .then(function (response) {
    const result = response.data;
    $('#commentList').empty();
    for (let i = result.length - 1; i >= 0; i--) {
      const commentId = result[i].commentId;
      const userId = result[i].userId;
      const content = result[i].content;
      const type = 'comment';

      let temp_html = `
      <div id="comment">
        <div>commentId : ${commentId}</div>
        <div>userId : ${userId}</div>
        <div>content : ${content}</div>
        <button onclick="reportBtn(${commentId}, '${type}')">신고 버튼</button>
      </div>
      `;
      $('#commentList').append(temp_html);
    }
  })
  .catch(function (error) {
    $('#commentList').empty();
    `<div id="comment">댓글이 없습니다.</div>`;
    $('#commentList').append(temp_html);
  });

// 댓글 작성
postComment = () => {
  $('#createCommentModal').css('display', 'block');

  $('#commentModalClose').click(function () {
    $('#createCommentModal').css('display', 'none');
  });

  $('#saveCommentModal').click(function () {
    const content = $('#content').val();
    saveComment(content);
    $('#createCommentModal').css('display', 'none');
  });

  saveComment = content => {
    axios
      .post(`/api/posts/${postId}/comment`, { content: content })
      .then(function (response) {})
      .catch(function (error) {
        alert(error.response.data.message);
        location.href = `/detailCommunity?postId=${postId}`;
      });
  };
};
