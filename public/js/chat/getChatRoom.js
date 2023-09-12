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

axios.get(`api/chat/${roomId}`).then(function (response) {
  const result = response.data;
  console.log('result', result);
  $('#chatList').empty();
  for (let i = result.length - 1; i >= 0; i--) {
    const name = result[i]['name'];
    const content = result[i]['content'];
    const date = formatDate(result[i]['date']);
    const image = result[i]['imageUrl'];

    let imageHtml = ''; // 이미지 HTML 초기화
    if (image !== null) {
      imageHtml = `<div><img class='chatImg' src="${image}"/></div>`;
    }
    const temp_html = `
      <div id="chatContent">
      ${imageHtml}
        <div>보낸시간: ${date}</div>
        <div>${name}: ${content}</div>
      </div>
    `;
    $('#chatList').append(temp_html);
  }
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
      console.log(error);
      alert(error.data.message);
      location.href = `/companyMain`;
    });
});

// 권한 없음 alert
socket.on('noPermission', function () {
  alert('현재 채팅방 접근 권한이 없습니다.');
  location.href = '../chatRommList.html';
});

// 이미지 업로드를 포함한 메세지 전송 함수
const sendMessage = async () => {
  const messageInput = document.getElementById('messageInput');
  const messageText = messageInput.value;
  messageInput.value = '';

  const imageInput = document.getElementById('image');
  const imageFile = imageInput.files[0];
  imageInput.value = '';

  const date = formatDate(new Date());

  const formData = new FormData();
  formData.append('message', messageText);
  // formData.append('userName', userName);
  formData.append('roomId', roomId);
  formData.append('date', date);

  if (imageFile) {
    formData.append('image', imageFile);
  }

  const imgResponse = await axios
    .post('/api/chat', formData)
    .then(function (response) {
      socket.emit('message', { data: response.data });
      console.log(response.data);
    })
    .catch(function (error) {
      alert(error.data.message);
      location.href = `/companyMain`;
    });
};

try {
  // 소켓으로부터 메시지를 받았을 때 화면에 표시
  socket.on('message', data => {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chatList');
    let imageHtml = '';
    if (data.data.imageUrl !== null) {
      imageHtml = `<div><img class='chatImg' src="${data.data.imageUrl}"/></div>`;
    }
    messageDiv.innerHTML = '';

    messageDiv.innerHTML = `
        <div id="chatContent">
          <div>보낸시간 : ${data.data.date}</div>
         ${imageHtml}
          <div>${data.data.name} : ${data.data.message}</div>
        </div>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  });
} catch (err) {
  console.log(err);
  console.log('실시간 채팅 안되는 중이지롱~');
}

// // 실시간 채팅
// socket.on('message', function (data) {
//   const messageDiv = document.createElement('div');
//   messageDiv.classList.add('chatList');
//   messageDiv.innerHTML = `
//             <div id="chatContent">
//                <div>이미지:${data.image}</div>
//                <div>보낸시간 : ${data.data.date}</div>
//                <div>${data.data.name} : ${data.data.message}</div>
//             </div>`;
//   chatMessages.appendChild(messageDiv);
//   chatMessages.scrollTop = chatMessages.scrollHeight;
// });

// // 메시지 전송 함수
// const sendMessage = () => {
//   const message = document.getElementById('messageInput').value;
//   document.getElementById('messageInput').value = '';

//   // data 생성
//   const data = {};
//   data.date = formatDate(new Date());
//   data.roomId = roomId;
//   data.message = message;

//   // chatLog mongodb에 저장 and 보낸 유저 name 찾기
//   axios
//     .post('/api/chat', { data: data })
//     .then(function (response) {
//       data.name = response.data;
//       socket.emit('message', { data: data });
//     })
//     .catch(function (error) {
//       const messageDiv = document.createElement('div');
//       messageDiv.classList.add('chatList');
//       messageDiv.innerHTML = `
//                 <div id="chatContent">
//                   <div>보낸시간 : ${data.date}</div>
//                   <div>해당 메세지는 전송 실패되었습니다.</div>
//                 </div>
//                 `;
//       chatMessages.appendChild(messageDiv);
//       chatMessages.scrollTop = chatMessages.scrollHeight;
//     });
// };
