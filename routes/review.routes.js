import { Router } from 'express';
import { ReviewController } from '../controllers';

const router = Router();

const reviewController = new ReviewController();

export default router;
