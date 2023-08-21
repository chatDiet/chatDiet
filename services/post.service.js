import { PostRepository } from '../repositories';
class PostService {
  _postRepository = new PostRepository();

  // # 게시글 작성
  createPost = async (title, content) => {
    //userId 추가할 것
    //throw new Error('내용을 입력해주세요.');
    try {
      // if(!userId){
      //   return{
      //   status:401,
      //   message:'로그인 후 이용할 수 있습니다.',
      // };
      // }
      if (!title) {
        return {
          status: 400,
          message: '제목을 입력해주세요',
        };
      }
      if (!content) {
        return {
          status: 400,
          message: '내용을 입력해주세요.',
        };
      }
      await this._postRepository.createPost(title, content); //userId 추가할 것
    } catch (error) {
      throw error;
    }
  };

  //# 게시글 전체 조회
  getPosts = async () => {
    try {
      return await this._postRepository.getPosts();
    } catch (error) {
      throw error;
    }
  };

  //# 특정 게시글 조회
  getPost = async postId => {
    const post = await this._postRepository.getPostId(postId);
    try {
      if (!post) {
        return {
          status: 404,
          message: '게시글이 존재하지 않습니다.',
        };
      }
      return {
        title: post.title,
        content: post.content,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      };
    } catch (error) {
      throw error;
    }
  };
  //# 게시글 수정
  updatePost = async (postId, title, content) => { // userId 추가할 것
    // userId 추가할 것
    const post = await this._postRepository.getPostId(postId);
    try {
      // if (userId !== updatedPost.userId) {
      //   return {
      //     status: 401,
      //     message: '수정 권한이 존재하지 않습니다.',
      //   };
      // }
      if (!post) {
        return {
          status: 404,
          message: '게시글이 존재하지 않습니다.',
        };
      }
      if (!title) {
        return {
          status: 400,
          message: '제목을 입력해주세요.',
        };
      }
      if (!content) {
        return {
          status: 400,
          message: '내용을 입력해주세요.',
        };
      }
      await this._postRepository.updatePost(postId, title, content); // userId 추가할 것
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  //# 게시글 삭제
  deletePost = async(postId) => { // userId 추가할 것
    const post = await this._postRepository.getPostId(postId);
    try{
      if(!post){
        return {
          status: 404,
          message: '게시글이 존재하지 않습니다.',
        };
      }
      // if(userId != this.deletePost.userId){
      //   return {
      //     status: 401,
      //     message: '삭제 권한이 존재하지 않습니다.',
      //   };
      // }
      await this._postRepository.deletePost(postId);
    }catch(error){
      console.log(error);
      throw error;
    }
  }
}

export default PostService;
