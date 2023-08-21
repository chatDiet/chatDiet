import { Router } from 'express';
import  isAuth  from '../middlewares/auth.middleware';
import { PostController } from '../controllers';

const router = Router();

const postController = new PostController();

// 게시글 작성
router.post('/post', isAuth, postController.createPost);
// 게시글 전체 조회
router.get('/post', postController.getPosts);
// 특정 게시글 조회
router.get('/post/:postId', postController.getPost);
// 게시글 수정
router.put('/post/:postId', isAuth, postController.updatePost);
// 게시글 삭제
router.delete('/post/:postId', isAuth, postController.deletePost);

export default router;
