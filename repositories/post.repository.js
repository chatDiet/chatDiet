import Post from '../db/models/post';

class PostRepository {
  // # 게시글 생성
  createPost = async (userId, title, content) => {
    try {
      const result = await Post.create({ userId, title, content });
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  // # 사용자 게시글 전체 조회
  getUserPosts = async userId => {
    const getUserPostsData = await Post.findAll({ where: { userId: userId } });

    getUserPostsData.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    return getUserPostsData;
  };

  // # 게시글 전체 조회
  getPosts = async () => {
    try {
      const result = await Post.findAll({});
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  // # 특정 게시글 Id 조회
  getPostId = async postId => {
    try {
      const result = await Post.findOne({ where: { postId } });
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  // # 게시글 수정
  updatePost = async (userId, postId, title, content) => {
    try {
      const result = await Post.update(
        {
          title,
          content,
        },
        { where: { userId, postId } }
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  // # 게시글 삭제
  deletePost = async postId => {
    try {
      const result = await Post.destroy({ where: { postId } });
      return result;
    } catch (error) {
      console.log(error);
    }
  };
}

export default PostRepository;
