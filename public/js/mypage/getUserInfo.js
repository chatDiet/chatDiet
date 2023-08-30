document.addEventListener('DOMContentLoaded', async function () {
  try {
    const response = await axios.get('/api/userInfo');
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
  } catch (error) {
    console.error('사용자 정보 로드 실패:', error);
  }
});
