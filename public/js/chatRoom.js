const getContract = async () => {
  await fetch(`api/contract`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      let rows = data;
      const result = rows;
      $('#joinChatroom').empty();
      for (let i = result.length - 1; i >= 0; i--) {
        let userId = result[i].userId;
        let trainerId = result[i].trainerId;
        let ptNumber = result[i].ptNumber;

        let temp_html = `
        <button onclick="joinChatroom(${userId},${trainerId})">${userId}${trainerId}번방입장</button>
        `;
        $('#joinChatroom').append(temp_html);
      }
    });
};

getContract();
