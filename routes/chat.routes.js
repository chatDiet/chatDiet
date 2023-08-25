import { Router } from 'express';
import { ChatController } from '../controllers';
import isAuth from '../middlewares/auth.middleware';

const router = Router();
const chatController = new ChatController();

router.get('/chat/:roomId', isAuth, chatController.findChat);

export default router;
