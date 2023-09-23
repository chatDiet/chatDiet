import { Post, Comment, User, UserInfo } from '../db';

class PostRepository {
  // # 게시글 생성
  createPost = async (userId, title, content) => {
    return await Post.create({ userId, title, content });
  };

  // # 사용자 게시글 전체 조회
  getUserPosts = async userId => {
    return await Post.findAll({
      where: { userId: userId },
      order: [['createdAt', 'DESC']],
    });
  };

  // # 게시글 전체 조회
  getPosts = async () => {
    return await Post.findAll({});
  };

  // # 특정 게시글 Id 조회
  getPostId = async postId => {
    return await Post.findOne({
      where: { postId },
      include: [
        {
          model: Comment,
          attributes: ['userId', 'content'],
          include: [
            {
              model: User,
              attributes: ['userId'],
              include: [
                {
                  model: UserInfo,
                  attributes: ['userName'],
                },
              ],
            },
          ],
        },
      ],
    });
  };

  // # 게시글 수정
  updatePost = async (userId, postId, title, content) => {
    return await Post.update(
      {
        title,
        content,
      },
      { where: { userId, postId } }
    );
  };

  // # 게시글 삭제
  deletePost = async postId => {
    return await Post.destroy({ where: { postId } });
  };
}

export default PostRepository;
