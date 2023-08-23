const urlParams = new URLSearchParams(window.location.search);
const roomId = urlParams.get('roomId');
const userId = urlParams.get('userId');
const trainerId = urlParams.get('trainerId');
const socket = io();

socket.on('connect', function () {
  const user = userId;
  const trainer = trainerId;

  const data = { user, trainer, roomId };

  socket.emit('newUser', data);
});

// 서버에 새로운 유저가 왔다고 알림
socket.on('update', function (data) {
  console.log(`${data.user} : ${data.message}`);
});

// 메시지 전송 함수
function test() {
  const message = document.getElementById('messageInput').value;
  document.getElementById('messageInput').value = '';

  socket.emit('message', { type: 'message', message: message });
}
