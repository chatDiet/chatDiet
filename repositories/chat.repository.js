import mongoose from 'mongoose';

class ChatRepository {
  constructor() {
    this.connection = mongoose.connection;
  }

  //몽고db 저장로직
  postChat = async data => {
    // 컬렉션 이름을 동적으로 설정
    const collection = this.connection.collection(data.roomId);

    // 데이터를 컬렉션에 직접 삽입
    return await collection.insertOne({ userId: data.user, name: data.name, content: data.message, date: new Date() });
  };

  // 몽고디비 "roomId" 컬렉션 조회
  findChat = async roomId => {
    const collection = this.connection.collection(roomId);

    return await collection.find({}).sort({ date: -1 }).toArray();
  };
}

export default ChatRepository;
