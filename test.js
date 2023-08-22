import { Server } from './init';
import socket from 'socket.io';

const server = new Server();
console.log(server);
const io = socket(server.httpServer);

test = () => {
  // 접속
  io.socket.on('connection', function (socket) {
    // 접속 메세지
    socket.on('newUser', function (data) {
      socket.join(data.roomName);
      console.log(data.name + '님이 접속하였습니다.');

      socket.name = data.name;

      this.io.sockets.emit('update', { type: 'connect', name: 'SERVER', message: data.name + '님이 접속함' });
    });
    // 클라이언트로 부터 데이터 받음
    socket.on('message', function (data) {
      // 받은 데이터의 발신자
      data.name = socket.name;

      console.log(data);
      // 클라이언트로 데이터 전송
      io.to(roomName).emit('update', data);
    });

    // 접속 종료
    socket.on('disconnect', function () {
      console.log(socket.name + '님이 나가셨습니다.');
      // 퇴장한 사람을 제외한 나머지 유저에게 메시지 전송
      socket.broadcast.emit('update', { type: 'discoonnect', name: 'SERVER', message: socket.name + '님이 나가셨습니다.' });
    });
  });
};

export default test;
