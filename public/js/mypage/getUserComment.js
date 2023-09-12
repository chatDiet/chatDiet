import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

axios
  .get('/api/userComments')
  .then(function (response) {
    // 서버에서 데이터를 성공적으로 가져온 경우

    // 데이터 배열 가져오기
    const commentDataArray = response.data;

    // 댓글을 표시할 요소 선택
    const commentsElement = document.querySelector('.comments');

    // 각 댓글을 반복하여 표시
    commentDataArray.forEach(function (commentData) {
      // 댓글 컨테이너 생성
      const commentContainer = document.createElement('div');
      commentContainer.classList.add('comment');

      // 내용 표시
      const commentContent = document.createElement('p');
      commentContent.textContent = commentData.content;
      commentContainer.appendChild(commentContent);

      // 생성일 및 수정일 표시
      const commentDates = document.createElement('p');
      commentDates.innerHTML = `작성일자: <span>${commentData.createdAt}</span><br>수정 일자: <span>${commentData.updatedAt}</span>`;
      commentContainer.appendChild(commentDates);

      // 댓글을 댓글 목록에 추가
      commentsElement.appendChild(commentContainer);
    });
  })
  .catch(function (error) {
    if (error.response.data.message) {
      alert(error.response.data.message);
      location.href = '/login';
    } else {
      alert(error.data);
    }
  });
