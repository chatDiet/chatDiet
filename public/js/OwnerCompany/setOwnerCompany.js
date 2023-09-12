document.addEventListener('DOMContentLoaded', () => {
  const registrationForm = document.getElementById('registration-form');

  registrationForm.addEventListener('submit', async event => {
    event.preventDefault();

    const formData = new FormData(registrationForm);

    try {
      // const imageInput = document.getElementById('company-photo');
      // const imageFiles = Array.from(imageInput.files); // Convert FileList to an array
      const images = [];
      const length = document.getElementById('company-photo').files.length;
      for (let i = 0; i < length; i++) {
        const imageFile = document.getElementById('company-photo').files[i];
        images.push(imageFile);
      }

      const data = {
        companyName: formData.get('companyName'),
        time: formData.get('time'),
        additional: formData.get('additional'),
        service: formData.get('service'),
        phoneNumber: formData.get('phoneNumber'),
        link: formData.get('link'),
        map: formData.get('map'),
        image: images,
      };
      // const response = await axios.post('/api/company', data);
      const response = await axios({
        method: 'post',
        url: '/api/company',
        data,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('등록이 완료되었습니다.' + response.data);
      window.location.href = `/getOwnerCompany`;
    } catch (error) {
      alert(error.response.data);
    }
  });
});
