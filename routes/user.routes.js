import { Router } from 'express';
import { UserController } from '../controllers';

const router = Router();

const userController = new UserController();
import auth from "../middlewares/auth.middleware";

// 회원가입
router.post("/signup", userController.register);
// 로그인
router.post("/login", userController.login);
// 로그아웃
router.post("/logout", userController.logoutUser);
// 회원탈퇴
router.delete("/:userId", auth, userController.deleteUser);

export default router;
