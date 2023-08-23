import { ChatRepository } from '../repositories';

class ChatService {
  _chatRepository = new ChatRepository();

  postChat = async data => {
    try {
      const result = await this._chatRepository.postChat(data);
      if (result) {
        console.log('`````````````생성 성공````````````````');
      }
    } catch (err) {
      return { status: 500, message: 'Server Error' };
    }
  };
}
export default ChatService;
