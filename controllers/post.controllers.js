import { PostService } from '../services';

class PostController {
  _postService = new PostService();

  // # 게시글 생성
  createPost = async (req, res) => {
    const { userId } = res.locals.user;
    const { title, content } = req.body;
    try {
      await this._postService.createPost(userId, title, content);
      return res.status(201).json({ message: '게시글이 작성되었습니다.' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ errorMessage: 'Server Error' });
    }
  };

  // # 게시글 전체 조회
  getPosts = async (req, res) => {
    try {
      const posts = await this._postService.getPosts();
      return res.status(200).json({ data: posts });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ errorMessage: 'Server Error' });
    }
  };

  // # 특정 게시글 조회
  getPost = async (req, res) => {
    const { postId } = req.params;
    // const {userId} = res.locals.user; if 게시글 조회에 로그인이 필요한 경우 불러올 것
    try {
      const post = await this._postService.getPost(postId); //if 게시글 조회에 로그인이 필요한 경우 userId 추가할 것
      return res.status(200).json({ data: post });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ errorMessage: 'Server Error' });
    }
  };

  // # 게시글 수정
  updatePost = async (req, res) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;
    const { title, content } = req.body;
    try {
      await this._postService.updatePost(userId, postId, title, content);
      return res.status(201).json({ message: '게시글을 수정하였습니다.' });
    } catch (error) {
      return res.status(500).json({ errorMessage: 'Server Error' });
    }
  };
  // # 게시글 삭제
  deletePost = async (req, res) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;
    try {
      await this._postService.deletePost(userId, postId);
      return res.status(200).json({ message: '게시글이 삭제되었습니다.' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ errorMessage: 'Server Error' });
    }
  };
}

export default PostController;
