document.addEventListener('DOMContentLoaded', () => {
  const registrationForm = document.getElementById('registration-form');
  const updateButton = document.getElementById('update-button');
  const companyId = 6;

  updateButton.addEventListener('submit', async event => {
    event.preventDefault();

    const formData = new FormData(registrationForm);
    const data = Object.fromEntries(formData);

    try {
      const response = await axios({
        method: 'put',
        url: `/api/company/${companyId}`,
        data,
      });
      alert('수정이 완료되었습니다.' + response.data);
      // 수정이 완료되면 다른 페이지로 이동
      window.location.href = `http://localhost:3000/getOwnerCompany`;
    } catch (error) {
      alert('수정 중 오류가 발생했습니다. ' + error.response.data);
    }
  });
});
