import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

axios
  .get('/api/userPosts')
  .then(function (response) {
    // 서버에서 데이터를 성공적으로 가져온 경우

    // 데이터 배열 가져오기
    const postDataArray = response.data;

    // 게시글을 표시할 요소 선택
    const postsElement = document.querySelector('.posts');

    // 각 게시글을 반복하여 표시
    postDataArray.forEach(function (postData) {
      // 게시글 컨테이너 생성
      const postContainer = document.createElement('div');
      postContainer.classList.add('post');

      // 제목 표시
      const postTitle = document.createElement('h1');
      postTitle.textContent = postData.title;
      postContainer.appendChild(postTitle);

      // 내용 표시
      const postContent = document.createElement('p');
      postContent.textContent = postData.content;
      postContainer.appendChild(postContent);

      // 생성일 및 수정일 표시
      const postDates = document.createElement('p');
      postDates.innerHTML = `Created At: <span>${postData.createdAt}</span><br>Updated At: <span>${postData.updatedAt}</span>`;
      postContainer.appendChild(postDates);

      // 게시글을 게시글 목록에 추가
      postsElement.appendChild(postContainer);
    });
  })
  .catch(function (error) {
    alert(error.data);
    // 데이터를 가져오지 못한 경우 오류 처리
    console.error('데이터를 가져오는 동안 오류 발생:', error);
  });
