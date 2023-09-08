import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

const logoutButton = document.getElementById('logout-button');

// 로그아웃 폼 제출 이벤트 리스너 등록
logoutButton.addEventListener('click', async event => {
  event.preventDefault();

  axios
    .post(`http://localhost:3000/api/logout`)
    .then(function (response) {
      alert(response.data);
      console.log(response.data);

      localStorage.removeItem('token');

      window.location.href = '/login';
    })
    .catch(function (error) {
      alert('로그아웃 실패');
      console.error('로그아웃 실패', error);
    });
});
