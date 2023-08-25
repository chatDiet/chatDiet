const formatDate = date => {
  const options = { hour: '2-digit', minute: '2-digit' };
  return new Date(date).toLocaleTimeString('en-US', options);
};

const findChat = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get('roomId');

  await fetch(`api/chat/${roomId}`, {
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
      $('#chatList').empty();
      for (let i = result.length - 1; i >= 0; i--) {
        let name = result[i]['name'];
        let content = result[i]['content'];
        let date = formatDate(result[i]['date']);
        let temp_html = `
        <div>보낸시간 : ${date}</div>
        <div>${name} : ${content}</div>
      `;
        $('#chatList').append(temp_html);
      }
    });
};

findChat();
