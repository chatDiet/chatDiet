import { ReviewService } from '../services';

class ReviewController {
  reviewService = new ReviewService();

  getUserReview = async (req, res) => {
    const userId = res.locals.userId;

    const getUserReview = await this.reviewService.getUserReview(userId);

    return res.status(getUserReview.status).json(getUserReview.data);
  };

  getReviewByType = async (req, res) => {
    const { targetId, type } = req.params;

    const getReviewByType = await this.reviewService.getReviewByType(targetId, type);
    return res.status(getReviewByType.status).json(getReviewByType.message);
  };

  createReview = async (req, res) => {
    const { targetId } = req.params;
    const userId = res.locals.userId;
    const { content, grade, type } = req.body;
    const createReveiw = await this.reviewService.createReview(userId, targetId, content, grade, type);
    return res.status(createReveiw.status).json(createReveiw.message);
  };

  deleteReview = async (req, res) => {
    const userId = res.locals.userId;
    const { reviewId } = req.params;

    const deleteReveiw = await this.reviewService.deleteReview(userId, reviewId);
    return res.status(deleteReveiw.status).json(deleteReveiw.message);
  };
}
export default ReviewController;
