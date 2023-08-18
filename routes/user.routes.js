import { Router } from 'express';
import { UserController } from '../controllers';

const router = Router();

const userController = new UserController();

export default router;
