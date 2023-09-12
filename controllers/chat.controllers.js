import { ChatService } from '../services';

class ChatController {
  _chatService = new ChatService();

  findChat = async (req, res) => {
    const { roomId } = req.params;

    const result = await this._chatService.findChat(roomId);
    console.log(result, '백에서');
    return res.status(result.status).json(result.message);
  };

  postChat = async (req, res) => {
    const data = req.body;
    let imageUrl = null;

    const userId = res.locals.userId;
    if (req.file) {
      imageUrl = req.file.location;
    }

    // 채팅 메시지를 생성 및 저장
    const result = await this._chatService.postChat(data, userId, imageUrl);
    console.log(result, 'resultresultresult');
    return res.status(result.status).json(result.message);
  };
}

export default ChatController;
