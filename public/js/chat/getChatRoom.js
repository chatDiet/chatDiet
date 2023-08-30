const urlParams = new URLSearchParams(window.location.search);
const roomId = urlParams.get('roomId');
const userId = urlParams.get('userId');
const trainerId = urlParams.get('trainerId');
const socket = io();

// 현재 시간 생성
const formatDate = date => {
  const options = { hour: '2-digit', minute: '2-digit' };
  return new Date(date).toLocaleTimeString('en-US', options);
};

// 대화 내용 조회
axios.get(`api/chat/${roomId}`).then(function (response) {
  const result = response.data;
  $('#chatList').empty();
  for (let i = result.length - 1; i >= 0; i--) {
    const name = result[i]['name'];
    const content = result[i]['content'];
    const date = formatDate(result[i]['date']);
    const temp_html = `
        <div id="chatContent">
          <div>보낸시간 : ${date}</div>
          <div>${name} : ${content}</div>
        </div>
        `;
    $('#chatList').append(temp_html);
  }
});

const chatMessages = document.querySelector('#chatList');

// 채팅방 연결
socket.on('connect', async function () {
  const user = userId;
  const trainer = trainerId;

  const data = { user, trainer, roomId };

  // 채팅방 권한 확인
  await axios
    .patch(`api/authContract`, { data: data })
    .then(function (response) {
      socket.emit('newUser', data);
    })
    .catch(function (error) {
      alert(error.response.data.message);
      location.href = `/companyMain`;
    });
});

// 실시간 채팅
socket.on('message', function (data) {
  data.date = formatDate(new Date());
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('chatList');
  messageDiv.innerHTML = `
  <div id="chatContent">
    <div>보낸시간 : ${data.date}</div>
    <div>${data.name} : ${data.message}</div>
  </div>
  `;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// 권한 없음 alert
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
