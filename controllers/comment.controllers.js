import { CommentService } from '../services';

class CommentController {
  _commentService = new CommentService();

  // 댓글 생성
  createComment = async (req, res) => {
    const userId = res.locals.userId;
    const { postId } = req.params;
    const { content } = req.body;

    const result = await this._commentService.createComment(userId, postId, content);
    return res.status(result.status).json(result.data);
  };

  // 사용자 본인 댓글 전체조회
  getUserComments = async (req, res) => {
    const userId = res.locals.userId;

    const getUserComments = await this._commentService.getUserComments(userId);

    return res.status(getUserComments.status).json(getUserComments.data);
  };

  // 특정 게시글 댓글 전체 조회
  getComment = async (req, res) => {
    const { postId } = req.params;

    const result = await this._commentService.getComment(postId);
    return res.status(result.status).json(result.message);
  };

  // 댓글 수정
  updateComment = async (req, res) => {
    const userId = res.locals.userId;
    const { postId, commentId } = req.params;
    const { content } = req.body;

    const result = await this._commentService.updateComment(userId, postId, commentId, content);
    return res.status(result.status).json(result.message);
  };

  // 댓글 삭제
  deleteComment = async (req, res) => {
    const userId = res.locals.userId;
    const { postId, commentId } = req.params;

    const result = await this._commentService.deleteComment(userId, postId, commentId);
    return res.status(result.status).json(result.message);
  };
}

export default CommentController;
