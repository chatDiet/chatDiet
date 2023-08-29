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
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  });
});
