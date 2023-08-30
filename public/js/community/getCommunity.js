// 게시글 전체 조회
axios.get('/api/posts').then(function (response) {
  const result = response.data;
  $('.main-section').empty();
  for (let i = result.length - 1; i >= 0; i--) {
    const postId = result[i].postId;
    const userId = result[i].userId;
    const title = result[i].title;
    const content = result[i].content;

    let temp_html = `
    <button id="communityList" onclick="getDetailCommunityBtn(${postId})">
      <div>userId : ${userId}</div>
      <div>title : ${title}</div>
      <div>content : ${content}</div>
    </button>
    `;
    $('.main-section').append(temp_html);
  }
});
