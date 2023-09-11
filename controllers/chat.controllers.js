import { ChatService } from '../services';

class ChatController {
  _chatService = new ChatService();

  findChat = async (req, res) => {
    const { roomId } = req.params;

    const result = await this._chatService.findChat(roomId);

    return res.status(result.status).json(result.message);
  };

  // findChat = async (req, res) => {
  //   const { roomId } = req.params;

  //   const results = await this._chatService.findChat(roomId);
  //   console.log(results, 'results');

  //   const chatWithImages = [];

  //   // for (const result of results) {
  //   //   let chatItem = {
  //   //     date: result.date,
  //   //     name: result.name,
  //   //     message: result.content,
  //   //     image: result.image, // 이미지 경로를 가져오기 위한 필드 추가
  //   //   };

  //   //   chatWithImages.push(chatItem);
  //   // }

  //   const responseData = {
  //     data: results.data, // 메시지와 이미지 정보를 담은 배열
  //     message: results.message, // 다른 데이터 필드를 추가하여 함께 내보낼 수 있음
  //   };
  //   console.log(responseData, 'responseData');
  //   return res.status(results.status).json(responseData);
  // };

  uploadImg = async (req, res) => {
    if (!req.file) {
      // 이미지 파일이 업로드되지 않았을 경우 null 반환
      return null;
    }

    // 업로드된 파일은 req.file로 접근 가능
    // 이미지 경로
    const imageUrl = req.file.location;

    // 이미지 경로 반환
    console.log(imageUrl, 'imagePath@@@@@@@@@@@@@@2');
    res.status(200).json({ imageUrl });
    return imageUrl;
  };

  postChat = async (req, res) => {
    const { data } = req.body;
    const userId = res.locals.userId;

    const response = await this.uploadImg(req);
    console.log(response, 'response@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
    const imageUrl = response ? response.imageUrl : null;
    console.log(imageUrl, 'imageUrl@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');

    // 채팅 메시지를 생성 및 저장
    const result = await this._chatService.postChat(data, userId, imageUrl);

    return res.status(result.status).json(result.message);
  };
}

export default ChatController;
