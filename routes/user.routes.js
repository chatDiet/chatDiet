import { Router } from 'express';
import { UserController } from '../controllers';

const router = Router();

const userController = new UserController();
const auth = require('../middlewares/auth.middleware');

router.post('/signup', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logoutUser);
router.delete('/:userId', userController.deleteUser);

export default router;
