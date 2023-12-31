document.addEventListener('DOMContentLoaded', () => {
  const registrationForm = document.getElementById('registration-form');

  registrationForm.addEventListener('submit', async event => {
    event.preventDefault();

    const formData = new FormData(registrationForm);

    try {
      const images = [];
      const length = document.getElementById('company-photo').files.length;
      if (length > 6) {
        alert('헬스장의 사진은 6장까지만 업로드 할 수 있습니다.');
        return (window.location.href = `/setOwnerCompany`);
      }
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
