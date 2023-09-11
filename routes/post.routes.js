import { Router } from 'express';
import { PostController } from '../controllers';
import isAuth from '../middlewares/auth.middleware';

const router = Router();

const postController = new PostController();

// 게시글 작성
router.post('/post', isAuth, postController.createPost);
// 사용자 게시글 전체 조회
router.get('/userPosts', isAuth, postController.getUserPosts);
// 게시글 전체 조회
router.get('/posts', postController.getPosts);
// 특정 게시글 조회
router.get('/posts/:postId', postController.getPost);
// 게시글 수정
router.put('/posts/:postId', isAuth, postController.updatePost);
// 게시글 삭제
router.delete('/posts/:postId', isAuth, postController.deletePost);

export default router;
