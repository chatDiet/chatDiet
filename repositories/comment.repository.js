import Comment from '../db';

class CommentRepository {
  // 댓글 생성
  createComment = async (userId, postId, content) => {
    await Comment.create({ userId, postId, content });
  };
  // 특정 게시글 댓글 전체 조회
  getPostId = async postId => {
    return await Post.findByPk(postId);
  };
  getComment = async postId => {
    return await Comment.findAll({
      where: { postId },
      order: [['createdAt', 'DESC']],
    });
  };
  // 댓글 수정
  getcommentId = async commentId => {
    return await Comment.findByPk(commentId);
  };
  updateComment = async (userId, postId, commentId, content) => {
    const values = {};
    if (content) values.content = content;
    await Comment.update(values, { where: { postId, userId, commentId } });
  };
  // 댓글 삭제
  deleteComment = async (userId, postId, commentId) => {
    await Comment.destroy({ where: { userId, postId, commentId } });
  };
}

export default CommentRepository;
