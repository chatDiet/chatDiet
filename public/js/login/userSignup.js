import axios from 'https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm';

const signupForm = document.getElementById('signup-form');

signupForm.addEventListener('submit', async event => {
  event.preventDefault();

  const userName = document.getElementById('userName').value;
  const type = document.getElementById('type').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  const height = document.getElementById('height').value;
  const weight = document.getElementById('weight').value;
  const phone = document.getElementById('phone').value;

  axios
    .post(`/api/signup`, {
      userName: userName,
      type: type,
      email: email,
      password: password,
      passwordConfirm: confirmPassword,
      height: height,
      weight: weight,
      phone: phone,
    })
    .then(function (response) {
      alert(response.data);

      window.location.href = '/';
    })
    .catch(function (error) {
      alert(error.response.data);
    });
});
