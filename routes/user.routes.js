import { Router } from 'express';
import { UserController } from '../controllers';
import isAuth from '../middlewares/auth.middleware';

const router = Router();

const userController = new UserController();

router.post('/signup', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logoutUser);
router.delete('/:userId', isAuth, userController.deleteUser);

//카카오 로그인
router.post('/kakao', userController.kakao);

export default router;
