const urlParams = new URLSearchParams(window.location.search);
const roomId = urlParams.get('roomId');
const userId = urlParams.get('userId');
const trainerId = urlParams.get('trainerId');
const socket = io();

const formatDate = date => {
  const options = { hour: '2-digit', minute: '2-digit' };
  return new Date(date).toLocaleTimeString('en-US', options);
};

const chatMessages = document.querySelector('#chatList');

socket.on('connect', async function () {
  const user = userId;
  const trainer = trainerId;

  const data = { user, trainer, roomId };

  await fetch(`api/authContract`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: data }),
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      if (data === '토큰이 제공되지 않았습니다.' || data === '접근 권한 없음') {
        alert(data);
        location.href = '../chatRommList.html';
      }
    });

  socket.emit('newUser', data);
});

// 서버에 새로운 유저가 왔다고 알림
socket.on('update', function (data) {
  console.log(`${data.user} : ${data.message}`);
});

socket.on('message', function (data) {
  data.date = formatDate(new Date());
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('chatList');
  messageDiv.innerHTML = `
    <div>보낸시간 : ${data.date}</div>
    <div>${data.name} : ${data.message}</div>
  `;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

socket.on('noPermission', function () {
  alert('현재 채팅방 접근 권한이 없습니다.');
  location.href = '../chatRommList.html';
});

// 메시지 전송 함수
const sendMessage = () => {
  const message = document.getElementById('messageInput').value;
  document.getElementById('messageInput').value = '';

  socket.emit('message', { type: 'message', message: message });
};
