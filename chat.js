import { Socket } from 'socket.io';
import { Server } from './init';

const server = new Server();

const io = Socket(server.httpServer);

io.on('connection', socket => {
  console.log('소켓 연결');

  socket.on('message', data => {
    console.log(data);
  });
});
