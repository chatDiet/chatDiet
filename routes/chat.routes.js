import { Router } from 'express';
import { ChatController } from '../controllers';
import isAuth from '../middlewares/auth.middleware';

const router = Router();
const chatController = new ChatController();

router.get('/chat/:roomId', isAuth, chatController.findChat);
router.post('/chat', isAuth, chatController.postChat);

export default router;
