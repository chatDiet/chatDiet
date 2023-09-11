contractList.addEventListener('click', async event => {
  if (event.target.classList.contains('deleteContract')) {
    const contractId = event.target.getAttribute('data-contract-id');
    const deleted = await deleteContract(contractId);
    if (deleted) {
      // 삭제 성공 시 화면에서 해당 계약 삭제
      event.target.parentElement.remove();
    }
  }
});
async function deleteContract(contractId) {
  // 서버로 삭제 요청 보내기
  const deleteContract = await axios.delete(`/api/contract/${contractId}`);
  if (deleteContract) {
    alert('계약이 취소되었습니다.');
    location.reload();
  }
}
