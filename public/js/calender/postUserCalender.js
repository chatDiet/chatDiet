document.getElementById('write-form').addEventListener('submit', async function (event) {
  event.preventDefault();

  const title = $('#title').val();
  const date = $('#date').val();
  const meal = $('#meal').val();
  const content = $('#content').val();
  const image = document.getElementById('image').files[0];

  const formData = new FormData();
  formData.append('date', date);
  formData.append('title', title);
  formData.append('type', meal);
  formData.append('content', content);
  formData.append('image', image);

  console.log('@@@@', formData);
  axios
    .post(`/api/calender`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(function (response) {
      alert('스케줄이 저장되었습니다.');
      location.reload();
      location.href = '/calender';
    })
    .catch(function (error) {
      console.log(error);
    });
});
