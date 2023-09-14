const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('postId');

// 게시글 상세 조회
axios.get(`/api/posts/${postId}`).then(function (response) {
  const result = response.data;
  $('#postZone').empty();
  const postId = result.postId;
  const title = result.title;
  const content = result.content;
  const type = 'post';

  let temp_html = `
      <div id="communityList">
        <div>제목 : ${title}</div>
        <div>내용 : ${content}</div>
      </div>
      <div id="buttonList">
        <button onclick="postComment()">댓글 작성</button>
        <button onclick="deletePostBtn(${postId})">게시글 삭제</button>
        <button onclick="reportBtn(${postId}, '${type}')">신고 버튼</button>
      </div>
      `;
  $('#postZone').append(temp_html);
});

// 댓글 조회
axios.get(`/api/posts/${postId}/comments`).then(async function (response) {
  const comment = response.data;

  // 댓글 HTML을 저장할 빈 배열 초기화
  let commentListHTML = '';

  // 각 댓글에 대해 순회
  for (const commentItem of comment) {
    const username = await getUserInfo(commentItem.userId);
    const content = commentItem.content;
    const commentId = commentItem.commentId;
    const type = 'comment';

    // 댓글 HTML을 배열에 추가
    commentListHTML += `
        <div id="comment">
          <div>이름 : ${username}</div>
          <div>내용 : ${content}</div>
          <button onclick="deleteCommentBtn(${postId}, ${commentId})">댓글 삭제</button>
          <button onclick="reportBtn(${commentId}, '${type}')">신고 버튼</button>
        </div>
      `;

    // 배열을 문자열로 변환하여 HTML에 할당
    const commentListContainer = document.getElementById('commentZone');
    commentListContainer.innerHTML = commentListHTML;
  }
});

async function getUserInfo(userId) {
  try {
    const userInfoResponse = await axios.get(`/api/userInfo/${userId}`);
    const username = userInfoResponse.data.userName;
    return username;
  } catch (error) {
    return null;
  }
}

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
      .then(function (response) {
        alert('댓글 작성 성공');
        location.reload();
      })
      .catch(function (error) {
        alert(error.response.data.message);
        location.href = `/detailCommunity?postId=${postId}`;
      });
  };
};
