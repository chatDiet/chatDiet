import { Router } from 'express';
import { CommentController } from '../controllers';

const router = Router();

const commentController = new CommentController();

export default router;
