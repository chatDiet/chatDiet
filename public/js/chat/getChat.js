axios.get(`api/contract`).then(function (response) {
  const result = response.data;
  $('.main-section').empty();
  for (let i = result.length - 1; i >= 0; i--) {
    const userId = result[i].userId;
    const trainerId = result[i].trainerId;
    const ptNumber = result[i].ptNumber;

    let temp_html = `
    <button onclick="joinChatroom(${userId},${trainerId})">${userId}${trainerId}번방입장</button>
        `;
    $('.main-section').append(temp_html);
  }
});
