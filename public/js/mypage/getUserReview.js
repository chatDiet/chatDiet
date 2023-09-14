import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

// axios를 사용하여 데이터 가져오기
axios
  .get('/api/reviews')
  .then(function (response) {
    // 서버에서 데이터를 성공적으로 가져온 경우

    // 데이터 배열 가져오기
    const dataArray = response.data;

    // 목록을 표시할 요소 선택
    const listElement = document.querySelector('.list');

    // 각 항목을 반복하여 목록에 추가
    dataArray.forEach(function (item) {
      // 각 항목을 리스트 아이템으로 만들기
      const listItem = document.createElement('li');

      // content 표시
      const contentElement = document.createElement('p');
      contentElement.textContent = `내용: ${item.content}`;
      listItem.appendChild(contentElement);

      // createdAt 표시
      const createdAtElement = document.createElement('p');
      createdAtElement.textContent = `작성 일자: ${item.createdAt}`;
      listItem.appendChild(createdAtElement);

      // updatedAt 표시
      const updatedAtElement = document.createElement('p');
      updatedAtElement.textContent = `수정 일자: ${item.updatedAt}`;
      listItem.appendChild(updatedAtElement);

      // 리스트 아이템을 목록에 추가
      listElement.appendChild(listItem);
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
