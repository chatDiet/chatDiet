// 게시글 전체 조회
axios.get('/api/posts').then(function (response) {
  const result = response.data;
  $('#postList').empty();
  for (let i = result.length - 1; i >= 0; i--) {
    const postId = result[i].postId;
    const userId = result[i].userId;
    const title = result[i].title;

    let temp_html = `
    <button id="communityList" onclick="getDetailCommunityBtn(${postId})">
      <div id="title"> ${title}</div>
    </button>
    `;
    $('#postList').append(temp_html);
  }
});
