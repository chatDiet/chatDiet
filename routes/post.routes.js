import { Router } from 'express';
import { PostController } from '../controllers';

const router = Router();

const postController = new PostController();

export default router;