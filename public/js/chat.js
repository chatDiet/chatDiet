// import isAuth from '../../middlewares/auth.middleware';
const urlParams = new URLSearchParams(window.location.search);
const roomName = urlParams.get('roomname');

const socket = io();
socket.on('connect', function () {
  const name = prompt('반갑습니다', '');

  if (!name) {
    console.log('로그인 필요');
  }
  const data = { name, roomName };
  socket.emit('newUser', data);
});

// 서버에 새로운 유저가 왔다고 알림
socket.on('update', function (data) {
  console.log(`${data.name}:${data.message}`);
});

// 접속 종료
socket.on('disconnect', function (roomName) {
  console.log(roomName);
  socket.leave(roomName);
  console.log(socket.name + '님이 나가셨습니다.');
  // 퇴장한 사람을 제외한 나머지 유저에게 메시지 전송
  socket.to(roomName).emit('update', { type: 'discoonnect', name: 'SERVER', message: socket.name + '님이 나가셨습니다.' });
});

// 메시지 전송 함수
function test() {
  const message = document.getElementById('messageInput').value;
  document.getElementById('messageInput').value = '';

  socket.emit('message', { type: 'message', message: message });
}
