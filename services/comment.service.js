import { CommentRepository } from '../repositories';

class CommentService {
  _commentRepository = new CommentRepository();

  // 댓글 생성
  createComment = async (userId, postId, content) => {
    try {
      if (!userId) {
        return {
          status: 401,
          message: '로그인 후 이용할 수 있습니다.',
        };
      }
      const findPost = await this._commentRepository.getPostId(postId);
      if (!findPost) {
        return {
          status: 404,
          message: '게시글이 존재하지 않습니다.',
        };
      }
      if (!content) {
        return {
          status: 400,
          message: '댓글 내용을 입력해주세요.',
        };
      }
      const result = await this._commentRepository.createComment(userId, postId, content);
      if (!result) {
        return {
          status: 400,
          message: '댓글 생성 실패',
        };
      }
      return {
        status: 201,
        message: '댓글 생성 성공',
      };
    } catch (error) {
      console.log(error);
      return { status: 500, message: 'Server Error' };
    }
  };

  // 사용자 댓글 전체 조회
  getUserComments = async userId => {
    const getUserComments = await this._commentRepository.getUserComments(userId);

    const allCommentsData = getUserComments.map(comment => {
      return {
        title: comment.title,
        content: comment.content,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
      };
    });
    return {
      status: 200,
      data: allCommentsData,
    };
  };

  // 특정 게시글 댓글 전체 조회
  getComment = async postId => {
    const post = await this._commentRepository.getPostId(postId);
    try {
      if (!post) {
        return {
          status: 404,
          message: '게시글이 존재하지 않습니다.',
        };
      }
      const result = await this._commentRepository.getComment(postId);
      if (!result) {
        return {
          status: 400,
          message: '댓글 조회 실패',
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
  // 댓글 수정
  updateComment = async (userId, postId, commentId, content) => {
    const comment = await this._commentRepository.getcommentId(commentId);
    try {
      const findPost = await this._commentRepository.getPostId(postId);
      if (!findPost) {
        return {
          status: 404,
          message: '게시글이 존재하지 않습니다.',
        };
      }
      if (!comment) {
        return {
          status: 404,
          message: '댓글이 존재하지 않습니다.',
        };
      }
      if (userId !== comment.userId) {
        return {
          status: 401,
          message: '수정 권한이 존재하지 않습니다.',
        };
      }
      if (!content) {
        return {
          status: 400,
          message: '댓글 내용을 입력해주세요.',
        };
      }
      const result = await this._commentRepository.updateComment(userId, postId, commentId, content);
      if (!result) {
        return {
          status: 400,
          message: '댓글 수정 실패',
        };
      }
      return {
        status: 200,
        message: '댓글 수정 성공',
      };
    } catch (error) {
      console.log(error);
      return { status: 500, message: 'Server Error' };
    }
  };
  // 댓글 삭제
  deleteComment = async (userId, postId, commentId) => {
    const comment = await this._commentRepository.getcommentId(commentId);
    try {
      if (!comment) {
        return {
          status: 404,
          message: '댓글이 존재하지 않습니다.',
        };
      }
      if (userId !== comment.userId) {
        return {
          status: 401,
          message: '삭제 권한이 존재하지 않습니다.',
        };
      }
      const result = await this._commentRepository.deleteComment(userId, postId, commentId);
      if (!result) {
        return {
          status: 400,
          message: '댓글 삭제 실패',
        };
      }
      return {
        status: 200,
        message: '댓글 삭제 성공',
      };
    } catch (error) {
      console.log(error);
      return { status: 500, message: 'Server Error' };
    }
  };
}

export default CommentService;
