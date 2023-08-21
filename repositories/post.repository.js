import Post from '../db/models/post';

class PostRepository {
  // # 게시글 생성
  createPost = async (title, content) => {
    //userId 추가할 것
    await Post.create({ title, content }); //userId 추가할 것
  };

  // # 게시글 전체 조회
  getPosts = async () => {
    return await Post.findAll({});
  };
  // # 특정 게시글 Id 조회
  getPostId = async postId => {
    return await Post.findByPk(postId);
  };
  // # 게시글 수정
  updatePost = async (postId, title, content) => {
    const values = {};
    if (title) values.title = title;
    if (content) values.content = content;
    await Post.update(values, { where: { postId } }); // where : userId 추가할 것
  };
  // # 게시글 삭제
  deletePost = async postId => {
    await Post.destroy({ where: { postId } });
  };
}

export default PostRepository;
