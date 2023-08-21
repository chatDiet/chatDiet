import { CommentService } from '../services';

class CommentController {
  _commentService = new CommentService();

  // 댓글 생성
  createComment = async (req, res) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;
    const { content } = req.body;
    try {
      await this._commentService.createComment(userId, postId, content);
      return res.status(201).json({ message: '댓글이 작성되었습니다.' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ errorMessage: 'Server Error' });
    }
  };
  // 특정 게시글 댓글 전체 조회
  getComment = async (res, req) => {
    const { postId } = req.params;
    try {
      const comments = await this._commentService.getComment(postId);
      return res.status(200).json({ data: comments });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ errorMessage: 'Server Error' });
    }
  };
  // 댓글 수정
  updateComment = async (res, req) => {
    const { userId } = res.locals.user;
    const { postId, commentId } = req.params;
    const { content } = req.body;
    try {
      await this._commentService.updateComment(userId, postId, commentId, content);
      return res.status(201).json({ message: '댓글을 수정하였습니다.' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ errorMessage: 'Server Error' });
    }
  };
  // 댓글 삭제
  deleteComment = async (req, res) => {
    const { userId } = res.locals.user;
    const { postId, commentId } = req.params;
    try {
      await this._commentService.deleteComment(userId, postId, commentId);
      return res.status(200).json({ message: '댓글이 삭제되었습니다.' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ errorMessage: 'Server Error' });
    }
  };
}

export default CommentController;
