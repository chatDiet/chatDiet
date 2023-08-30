document.addEventListener('DOMContentLoaded', async function () {
  try {
    const response = await axios.get('/api/userInfo');
    const userInfo = response.data;

    const userNameInput = document.getElementById('userNameInput');
    const heightInput = document.getElementById('heightInput');
    const weightInput = document.getElementById('weightInput');
    const phoneInput = document.getElementById('phoneInput');
    const submitButton = document.getElementById('submitButton');

    // 기존 데이터를 input 박스에 표시
    userNameInput.value = userInfo.userName;
    heightInput.value = userInfo.height;
    weightInput.value = userInfo.weight;
    phoneInput.value = userInfo.phone;

    // 수정 완료 버튼 클릭 시 백엔드로 수정된 정보 전송
    submitButton.addEventListener('click', async function () {
      const updatedUserInfo = {
        userName: userNameInput.value,
        height: heightInput.value,
        weight: weightInput.value,
        phone: phoneInput.value,
      };

      try {
        const response = await axios.put(`/api/userInfos/${userInfo.userInfoId}`, updatedUserInfo);
        console.log('정보 수정 완료:', response.data);

        // 페이지 이동
        window.location.href = '/userInfo'; // 여기에 돌아갈 페이지 URL을 넣어주세요
      } catch (error) {
        console.error('정보 수정 실패:', error);
      }
    });
  } catch (error) {
    console.error('사용자 정보 로드 실패:', error);
  }
});
