// import Chat from '../db/schema/chatDiet.schema';
import mongoose from 'mongoose';

class ChatRepository {
  constructor() {
    this.connection = mongoose.connection;
  }

  //몽고db 저장로직
  postChat = async data => {
    try {
      // 컬렉션 이름을 동적으로 설정

      const collection = this.connection.collection(data.roomName);

      // 데이터를 컬렉션에 직접 삽입
      const result = await collection.insertOne({ userId: data.name, content: data.message });
      console.log(`데이터가 ${data.roomName} 컬렉션에 성공적으로 저장되었습니다.`);
      return result;
    } catch {
      console.error('메시지 저장 중 오류 발생:', err);
    }
  };
}

export default ChatRepository;
