deleteContractBtn = contractId => {
  axios
    .delete(`/api/contract/${contractId}`)
    .then(function (res) {
      alert('삭제 성공');
      location.reload();
    })
    .catch(function (error) {
      alert(error.response.data.message);
      location.reload();
    });
};
