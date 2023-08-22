import { Router } from 'express';
import { CommentController } from '../controllers';
const isAuth = require("../middlewares/auth.middleware");

const router = Router();

const commentController = new CommentController();

// 댓글 생성
router.post('/posts/:postId/comment',isAuth, commentController.createComment);
// 특정 게시글 댓글 전체 조회
router.get('/posts/:postId/comment', commentController.getComment);
// 댓글 수정
router.put('/posts/:postId/comments/:commentId',isAuth, commentController.updateComment);
// 댓글 삭제
router.delete('/posts/:postId/comments/:commentId',isAuth, commentController.deleteComment);

export default router;
