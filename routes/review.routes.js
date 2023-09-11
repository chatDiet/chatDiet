import { Router } from 'express';
import { ReviewController } from '../controllers';
import isAuth from '../middlewares/auth.middleware';

const router = Router();

const reviewController = new ReviewController();

router.get('/reviews', isAuth, reviewController.getUserReview);
router.get('/review/:targetId/:type', reviewController.getReviewByType);
router.post('/review/:targetId', isAuth, reviewController.createReview);
router.delete('/review/:reviewId', isAuth, reviewController.deleteReview);

export default router;
