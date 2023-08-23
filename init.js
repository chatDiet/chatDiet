import dotenv from 'dotenv';
import Http from 'node:http';
import { ExpressApp } from './app';
import connector from './db/db.js';
import socket from 'socket.io';
import { mongoDB } from './db/mongdb';
import { ChatService } from './services';

const a = new mongoDB();
const chatService = new ChatService();

dotenv.config();

export class Server {
  expressApp = new ExpressApp();
  httpServer;

  constructor() {
    // HTTP 서버를 생성하고, expressApp을 사용하여 요청을 처리하도록 설정
    this.httpServer = new Http.Server(this.expressApp.app);
    this.io = socket(this.httpServer);
  }

  // 서버를 실행하는 메서드입니다.
  runServer = async () => {
    try {
      // 서버를 실행하고 클라이언트의 요청을 수신 대기
      return this.serverListen();
    } catch (e) {
      // 에러가 발생하면 에러 핸들러를 호출
      return this.serverErrorHandler(e);
    }
  };

  // socket 연결
  runSocket = async () => {
    // 접속
    this.io.sockets.on('connection', function (socket) {
      socket.on('newUser', function (data) {
        chatService.findUser(data);

        socket.join(data.roomId);
        socket.user = data.user;
        socket.trainer = data.trainer;
        socket.roomId = data.roomId;

        console.log(socket.roomId + '번방에 ' + socket.user + '님이 접속하였습니다.');

        socket.to(socket.roomId).emit('update', { type: 'connect', name: 'SERVER', message: socket.user + '님이 접속함' });
      });

      // 전송한 메세지 받기
      socket.on('message', function (data) {
        // 받은 데이터에 user,trainer,roomId 추가
        data.user = socket.user;
        data.trainer = socket.trainer;
        data.roomId = socket.roomId;

        //mongDb 로직으로 보냄
        chatService.postChat(data);

        // 해당 방에 보내기
        socket.to(socket.roomId).emit('update', data);
      });

      // 접속 종료
      socket.on('disconnect', function () {
        socket.leave(socket.roomId);
        console.log(socket.roomId + '번방에서 ' + socket.user + '님이 나가셨습니다.');
        // 퇴장한 사람을 제외한 나머지 유저에게 메시지 전송
        socket.to(socket.roomId).emit('update', { type: 'discoonnect', name: 'SERVER', message: socket.user + '님이 나가셨습니다.' });
      });
    });
  };

  // HTTP 서버를 시작하는 메서드
  serverListen = () => {
    // .env 파일에서 PORT와 HOST 환경변수 값을 가져옴
    const { PORT: port, HOST: host } = process.env;
    // HTTP 서버 시작
    return this.httpServer.listen(port, () => {
      console.log(`Server is running on: http://${host}:${port}`);
    });
  };

  // 서버 실행 에러 처리
  serverErrorHandler = error => {
    console.log('Server run error: ', error.message);
  };
}

// Server 클래스의 인스턴스를 생성
// 위에서 만들어놓은걸 여기서 생성
const server = new Server();

// 여기서 실행
server.runSocket();
connector.testConnectDB();
connector.connectDB();
a.mongoDBconnect();
server.runServer();
