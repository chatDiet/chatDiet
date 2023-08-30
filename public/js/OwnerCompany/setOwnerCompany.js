document.addEventListener('DOMContentLoaded', () => {
  const registrationForm = document.getElementById('registration-form');

  registrationForm.addEventListener('submit', async event => {
    event.preventDefault();

    const formData = new FormData(registrationForm);
    const data = Object.fromEntries(formData);

    try {
      const response = await axios({
        method: 'post',
        url: '/api/company',
        data,
      });
      alert('등록이 완료되었습니다.' + response.data);
      window.location.href = `http://localhost:3000/getOwnerCompany`;
    } catch (error) {
      alert('등록 중 오류가 발생했습니다. ' + error.response.data);
    }
  });
});
