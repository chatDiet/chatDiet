import { ChatService } from '../services';

class ChatController {
  _chatService = new ChatService();

  findChat = async (req, res) => {
    const { roomId } = req.params;

    const result = await this._chatService.findChat(roomId);

    return res.status(result.status).json(result.message);
  };
}

export default ChatController;
