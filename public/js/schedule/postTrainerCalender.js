document.getElementById('write-schedule-form').addEventListener('submit', async function (event) {
  event.preventDefault();

  const date = $('#date').val();
  const title = $('#title').val();

  const formData = new FormData();
  formData.append('date', date);
  formData.append('title', title);

  axios
    .post(`/api/schedule`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(function (response) {
      alert('스케줄이 저장되었습니다.');
      // location.reload();
      location.href = '/trainer';
    })
    .catch(function (error) {
      console.log(error);
    });

  for (var value of formData.values()) {
    console.log(value, 'formDatavalue');
  }
});
