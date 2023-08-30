import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

const loginForm = document.getElementById('login-form');

// 로그인 폼 제출 이벤트 리스너 등록
loginForm.addEventListener('submit', async event => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  axios
    .post(`http://localhost:3000/api/login`, { email: email, password: password })
    .then(function (response) {
      alert(response.data);
      console.log(response.data);

      window.location.href = 'http://localhost:3000/userMain';
    })
    .catch(function (error) {
      alert(error.response.data);
      console.error('로그인 실패', error);
    });
});
