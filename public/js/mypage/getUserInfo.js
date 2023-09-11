document.addEventListener('DOMContentLoaded', async function () {
  try {
    const response = await axios.get('/api/userInfo').then(function (response) {
      const userInfo = response.data;

      const userNameElement = document.getElementById('userName');
      const heightElement = document.getElementById('height');
      const weightElement = document.getElementById('weight');
      const phoneElement = document.getElementById('phone');

      // 초기화: 사용자 정보 표시
      userNameElement.textContent = userInfo.userName;
      heightElement.textContent = userInfo.height;
      weightElement.textContent = userInfo.weight;
      phoneElement.textContent = userInfo.phone;
    });
  } catch (error) {
    alert('로그인이 필요한 서비스입니다.');
    location.href = '/login';
  }
});
