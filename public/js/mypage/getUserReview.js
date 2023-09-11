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
      contentElement.textContent = `Content: ${item.content}`;
      listItem.appendChild(contentElement);

      // createdAt 표시
      const createdAtElement = document.createElement('p');
      createdAtElement.textContent = `Created At: ${item.createdAt}`;
      listItem.appendChild(createdAtElement);

      // updatedAt 표시
      const updatedAtElement = document.createElement('p');
      updatedAtElement.textContent = `Updated At: ${item.updatedAt}`;
      listItem.appendChild(updatedAtElement);

      // 리스트 아이템을 목록에 추가
      listElement.appendChild(listItem);
    });
  })
  .catch(function (error) {
    alert(error.data);
    // 데이터를 가져오지 못한 경우 오류 처리
    console.error('데이터를 가져오는 동안 오류 발생:', error);
  });
