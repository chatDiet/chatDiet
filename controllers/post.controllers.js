import { PostService } from '../services';

class PostController {
  _postService = new PostService();

  // # 게시글 생성
  createPost = async (req, res) => {
    const userId = res.locals.userId;
    const { title, content } = req.body;
    const result = await this._postService.createPost(userId, title, content);
    return res.status(result.status).json(result.message);
  };

  // # 사용자 본인 게시글 전체 조회
  getUserPosts = async (req, res) => {
    const userId = res.locals.userId;

    const getUserPosts = await this._postService.getUserPosts(userId);

    return res.status(getUserPosts.status).json(getUserPosts.data);
  };

  // # 게시글 전체 조회
  getPosts = async (req, res) => {
    const result = await this._postService.getPosts();
    return res.status(result.status).json(result.message);
  };

  // # 특정 게시글 조회
  getPost = async (req, res) => {
    const { postId } = req.params;
    // const {userId} = res.locals.user; if 게시글 조회에 로그인이 필요한 경우 불러올 것
    const result = await this._postService.getPost(postId);
    return res.status(result.status).json(result.message);
  };

  // # 게시글 수정
  updatePost = async (req, res) => {
    const userId = res.locals.userId;
    const { postId } = req.params;
    const { title, content } = req.body;

    const result = await this._postService.updatePost(userId, postId, title, content);
    return res.status(result.status).json(result.message);
  };

  // # 게시글 삭제
  deletePost = async (req, res) => {
    const userId = res.locals.userId;
    const { postId } = req.params;

    const result = await this._postService.deletePost(userId, postId);
    return res.status(result.status).json(result.message);
  };
}

export default PostController;
