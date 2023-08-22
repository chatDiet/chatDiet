import {Comment} from '../db';

class CommentRepository {
  // 댓글 생성
  createComment = async (userId, postId, content) => {
    try {
      const result = await Comment.create({ userId, postId, content });
      return result;
    } catch (error) {
      console.log(error);
    }
  };
  // 특정 게시글 댓글 전체 조회
  getPostId = async postId => {
    try {
      const result = await Post.findByPk(postId);
      return result;
    } catch (error) {
      console.log(error);
    }
  };
  getComment = async postId => {
    try {
      const result = await Comment.findAll({
        where: { postId },
        order: [['createdAt', 'DESC']],
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  };
  // 댓글 수정
  getcommentId = async commentId => {
    try {
      const result = await Comment.findByPk(commentId);
      return result;
    } catch (error) {
      console.log(error);
    }
  };
  updateComment = async (userId, postId, commentId, content) => {
    try {
      const result = await Comment.update(content, { where: { postId, userId, commentId } });
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  // 댓글 삭제
  deleteComment = async (userId, postId, commentId) => {
    try {
      const result = await Comment.destroy({ where: { userId, postId, commentId } });
      return result;
    } catch (error) {
      console.log(error);
    }
  };
}

export default CommentRepository;
