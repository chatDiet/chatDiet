createContractBtn = trainerId => {
  axios
    .post('api/contract', { trainerId: trainerId })
    .then(function (response) {
      alert('계약 성공');
      location.reload();
    })
    .catch(function (error) {
      alert(error.response.data);
      location.reload();
    });
};
