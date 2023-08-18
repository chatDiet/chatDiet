import { Router } from 'express';
import { UserController } from '../controllers';

const router = Router();

const userController = new UserController();

router.post("/signup", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logoutUser);

export default router;
