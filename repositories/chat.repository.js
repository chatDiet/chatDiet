import mongoose from 'mongoose';

class ChatRepository {
  constructor() {
    this.connection = mongoose.connection;
  }

  //몽고db 저장로직
  postChat = async (data, imageUrl) => {
    try {
      // 컬렉션 이름을 동적으로 설정
      const collection = this.connection.collection(data.roomId);

      // 데이터를 컬렉션에 직접 삽입
      const result = await collection.insertOne({
        userId: data.user,
        name: data.name,
        content: data.message,
        date: new Date(),
        imageUrl: imageUrl,
      });
      console.log(`데이터가 ${data.roomId} 컬렉션에 성공적으로 저장되었습니다.`);
      return result;
    } catch {
      console.error('메시지 저장 중 오류 발생:', err);
    }
  };

  // 몽고디비 "roomId" 컬렉션 조회
  findChat = async roomId => {
    const collection = this.connection.collection(roomId);

    return await collection.find({}).sort({ date: -1 }).toArray();
  };
}

export default ChatRepository;
