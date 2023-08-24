import { Router } from 'express';
import { ReviewController } from '../controllers';
import isAuth from '../middlewares/auth.middleware';

const router = Router();

const reviewController = new ReviewController();

router.get('/company/:companyId/review', reviewController.getReviewByType);
router.post('/company/:companyId/review', reviewController.createReview);
router.delete('/review/:reviewId', reviewController.deleteReview);

export default router;
