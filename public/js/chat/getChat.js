axios.get(`api/contract`).then(function (response) {
  const result = response.data;
  $('.main-section').empty();
  for (let i = result.length - 1; i >= 0; i--) {
    const userId = result[i].userId;
    const trainerId = result[i].trainerId;
    const contractId = result[i].contractId;

    let temp_html = `
    <div id="chatRoom">
      <div>${contractId}번 계약</div>
      <button onclick="deleteContractBtn(${contractId})">계약 취소</button>
      <button onclick="joinChatroom(${userId},${trainerId})">${userId}${trainerId}번 채팅방</button>
    </div>
        `;
    $('.main-section').append(temp_html);
  }
});
