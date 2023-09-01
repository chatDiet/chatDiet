// const schduleList = document.querySelector('.scheduleList');

// schduleList.addEventListener('click', async event => {
//   if (event.target.classList.contains('delete-schedule-button')) {
//     const schduleId = event.target.getAttribute('delete-schedule-id');
//     const deleted = await deleteContract(schduleId);
//     if (deleted) {
//       // 삭제 성공 시 화면에서 해당 계약 삭제
//       event.target.parentElement.remove();
//     }
//   }
// });
// async function deleteContract(schduleId) {
//   // 서버로 삭제 요청 보내기
//   console.log('@@@@@@@@@@@@@@@@@@@?');
//   const deleteschduleId = await axios.delete(`http://localhost:3000/api/schedules/${scheduleId}`);
//   if (deleteschduleId) {
//     alert('스케줄이 취소되었습니다.');
//     location.reload();
//   }
// }
