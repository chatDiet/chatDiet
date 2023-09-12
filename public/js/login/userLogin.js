import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

const loginForm = document.getElementById('login-form');

// 로그인 폼 제출 이벤트 리스너 등록
loginForm.addEventListener('submit', async event => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  axios
    .post(`/api/login`, { email: email, password: password })
    .then(function (response) {
      alert('로그인 성공');
      if (response.data === 'user') {
        window.location.href = '/companyMain';
      }

      if (response.data === 'trainer') {
        window.location.href = '/trainer';
      }

      if (response.data === 'owner') {
        window.location.href = '/getOwnerCompany';
      }

      if (response.data === 'admin') {
        window.location.href = '/admin';
      }
    })
    .catch(function (error) {
      alert(error.response.data);
    });
});
