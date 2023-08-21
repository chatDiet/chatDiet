import { Router } from 'express';
import { CommentController } from '../controllers';

const router = Router();

const commentController = new CommentController();

// 댓글 생성
router.post('/post/:postId/comment', commentController.createComment);
// 특정 게시글 댓글 전체 조회
router.get('/post/:postId/comment', commentController.getComment);
// 댓글 수정
router.put('/post/:postId/comment/:commentId', commentController.updateComment);
// 댓글 삭제
router.delete('/post/:postId/comment/:commentId', commentController.deleteComment);

export default router;
