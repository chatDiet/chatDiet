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
axios
  .get(`api/chat/${roomId}`)
  .then(function (response) {
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
  })
  .catch(function (error) {
    alert('로그인이 필요한 서비스 입니다.');
    location.href = '/login';
  });

const chatMessages = document.querySelector('#chatList');

// 채팅방 연결
socket.on('connect', function () {
  const user = userId;
  const trainer = trainerId;

  const data = { user, trainer, roomId };

  // 채팅방 권한 확인
  axios
    .patch(`api/authContract`, { data: data })
    .then(function (response) {
      socket.emit('newUser', data);
    })
    .catch(function (error) {
      alert(error.data.message);
      location.href = `/companyMain`;
    });
});

// 실시간 채팅
socket.on('message', function (data) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('chatList');
  messageDiv.innerHTML = `
            <div id="chatContent">
              <div>보낸시간 : ${data.data.date}</div>
              <div>${data.data.name} : ${data.data.message}</div>
            </div>`;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// 권한 없음 alert
socket.on('noPermission', function () {
  alert('현재 채팅방 접근 권한이 없습니다.');
  location.href = '../chatRommList.html';
});

// 메시지 입력란에서 엔터 키를 눌렀을 때 이벤트 처리
messageInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    sendMessage();
  }
});
// 메시지 전송 함수
const sendMessage = () => {
  const message = document.getElementById('messageInput').value;
  document.getElementById('messageInput').value = '';

  // data 생성
  const data = {};
  data.date = formatDate(new Date());
  data.roomId = roomId;
  data.message = message;
  // chatLog mongodb에 저장 and 보낸 유저 name 찾기

  axios
    .post('/api/chat', { data: data })
    .then(function (response) {
      data.name = response.data;
      socket.emit('message', { data: data });
    })
    .catch(function (error) {
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('chatList');
      messageDiv.innerHTML = `
                <div id="chatContent">
                  <div>보낸시간 : ${data.date}</div>
                  <div>해당 메세지는 전송 실패되었습니다.</div>
                </div>
                `;
      chatMessages.appendChild(messageDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    });
};
