const urlParams = new URLSearchParams(window.location.search);
const roomName = urlParams.get('roomname');
const socket = io();

socket.on('connect', function () {
  const name = prompt('이름 작성하세요', '');

  if (!name) {
    console.log('로그인 필요');
  }
  const data = { name, roomName };

  socket.emit('newUser', data);
});

// 서버에 새로운 유저가 왔다고 알림
socket.on('update', function (data) {
  console.log(`${data.name} : ${data.message}`);
});

// 메시지 전송 함수
function test() {
  const message = document.getElementById('messageInput').value;
  document.getElementById('messageInput').value = '';

  socket.emit('message', { type: 'message', message: message });
}
