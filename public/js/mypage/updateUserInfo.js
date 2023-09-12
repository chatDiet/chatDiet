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

    // 숫자만 입력 가능하도록 제한하는 함수
    function restrictToNumbers(event) {
      const input = event.target;
      const sanitizedValue = input.value.replace(/[^0-9]/g, ''); // 숫자 이외의 문자 제거
      input.value = sanitizedValue;
    }

    // height, weight, phone input에 숫자 입력 제한 적용
    heightInput.addEventListener('input', restrictToNumbers);
    weightInput.addEventListener('input', restrictToNumbers);
    phoneInput.addEventListener('input', restrictToNumbers);

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
        alert('정보 수정 완료:', response.data);

        // 페이지 이동
        window.location.href = '/userInfo';
      } catch (error) {
        alert('정보 수정 실패:', error);
      }
    });
  } catch (error) {}
});
