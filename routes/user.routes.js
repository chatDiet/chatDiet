import { Router } from 'express';
import { UserController } from '../controllers';
import isAuth from '../middlewares/auth.middleware';

const router = Router();

const userController = new UserController();

// 유저 정보 조회
router.get('/userInfo', isAuth, userController.getOneUserInfo);

router.get('/userInfo/:userId', userController.findOneUserInfo);

// 유저 정보 수정
router.put('/userInfos/:userInfoId', isAuth, userController.updateUserInfo);

// 회원가입
router.post('/signup', userController.register);

// 로그인
router.post('/login', userController.login);

// 로그아웃
router.post('/logout', userController.logoutUser);

// 회원 탈퇴
router.delete('/deleteUser', isAuth, userController.deleteUser);

//카카오 로그인
router.post('/kakao', userController.kakao);

export default router;
