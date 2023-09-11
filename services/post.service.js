import { PostRepository } from '../repositories';
class PostService {
  _postRepository = new PostRepository();

  // # 게시글 작성
  createPost = async (userId, title, content) => {
    try {
      if (!userId) {
        return {
          status: 401,
          message: '로그인 후 이용할 수 있습니다.',
        };
      }
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
      const result = await this._postRepository.createPost(userId, title, content);
      if (!result) {
        return {
          status: 400,
          message: '게시글 생성 실패',
          data: result,
        };
      }
      return {
        status: 201,
        message: result,
      };
    } catch (error) {
      return { status: 500, message: 'Server Error' };
    }
  };

  // # 사용자 게시글 전체 조회
  getUserPosts = async userId => {
    if (!userId) {
      return {
        status: 401,
        data: '로그인 후 이용 가능합니다.',
      };
    }

    const getUserPosts = await this._postRepository.getUserPosts(userId);

    const allPostsData = getUserPosts.map(post => {
      return {
        title: post.title,
        content: post.content,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      };
    });
    return {
      status: 200,
      data: allPostsData,
    };
  };

  //# 게시글 전체 조회
  getPosts = async () => {
    try {
      const result = await this._postRepository.getPosts();
      return {
        status: 200,
        message: result,
      };
    } catch (error) {
      console.log(error);
      return { status: 500, message: 'Server Error' };
    }
  };

  //# 특정 게시글 조회
  getPost = async postId => {
    const result = await this._postRepository.getPostId(postId);
    try {
      if (!result) {
        return {
          status: 404,
          message: '게시글이 존재하지 않습니다.',
        };
      }
      return {
        status: 200,
        message: result,
      };
    } catch (error) {
      console.log(error);
      return { status: 500, message: 'Server Error' };
    }
  };

  //# 게시글 수정
  updatePost = async (userId, postId, title, content) => {
    const post = await this._postRepository.getPostId(postId);
    try {
      if (!post) {
        return {
          status: 404,
          message: '게시글이 존재하지 않습니다.',
        };
      }
      if (userId !== post.userId) {
        return {
          status: 401,
          message: '수정 권한이 존재하지 않습니다.',
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
      const result = await this._postRepository.updatePost(userId, postId, title, content);
      if (!result) {
        return {
          status: 400,
          message: '게시글 수정 실패',
        };
      }
      return {
        status: 201,
        message: '게시글 수정 성공',
      };
    } catch (error) {
      console.log(error);
      return { status: 500, message: 'Server Error' };
    }
  };

  //# 게시글 삭제
  deletePost = async (userId, postId) => {
    const post = await this._postRepository.getPostId(postId);
    try {
      if (!post) {
        return {
          status: 404,
          message: '게시글이 존재하지 않습니다.',
        };
      }
      if (userId != post.userId) {
        return {
          status: 401,
          message: '삭제 권한이 존재하지 않습니다.',
        };
      }
      const result = await this._postRepository.deletePost(postId);
      if (!result) {
        return {
          status: 400,
          message: '게시글 삭제 실패',
        };
      }
      return {
        status: 200,
        message: '게시글 삭제 성공',
      };
    } catch (error) {
      console.log(error);
      return { status: 500, message: 'Server Error' };
    }
  };
}

export default PostService;
