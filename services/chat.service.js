import { ChatRepository } from '../repositories';
import { ContractRepository } from '../repositories';
import { UserRepository } from '../repositories';

class ChatService {
  _chatRepository = new ChatRepository();
  _contractRepository = new ContractRepository();
  _userRepository = new UserRepository();

  postChat = async data => {
    try {
      const user = await this._userRepository.getOneUserInfo(data.user);

      data.name = user.name;
      await this._chatRepository.postChat(data);
    } catch (err) {
      return { status: 500, message: 'Server Error' };
    }
  };

  findChat = async roomId => {
    try {
      if (!roomId) {
        return {
          status: 400,
          message: '채팅방 ID 미입력',
        };
      }
      const result = await this._chatRepository.findChat(roomId);
      return {
        status: 200,
        message: result,
      };
    } catch (err) {
      return { status: 500, message: 'Server Error' };
    }
  };
}
export default ChatService;
