import { ChatService } from '../services';

class ChatController {
  _chatService = new ChatService();

  findChat = async (req, res) => {
    const { roomId } = req.params;

    const result = await this._chatService.findChat(roomId);

    return res.status(result.status).json(result.message);
  };

  postChat = async (req, res) => {
    const { data } = req.body;

    const userId = res.locals.userId;

    const result = await this._chatService.postChat(data, userId);

    return res.status(result.status).json(result.message);
  };
}

export default ChatController;
