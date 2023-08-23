import { ChatRepository } from '../repositories';
import { ContractRepository } from '../repositories';

class ChatService {
  _chatRepository = new ChatRepository();
  _contractRepository = new ContractRepository();

  findUser = async data => {
    try {
      const result = await this._contractRepository.getContract(data.user);
      if (result) {
        console.log('````````````````````유저 찾음```````````````');
      }
    } catch (err) {
      return { status: 500, message: 'Server Error' };
    }
  };

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
