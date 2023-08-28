import { ReviewService } from '../services';

class ReviewController {
  reviewService = new ReviewService();

  getReviewByType = async (req, res) => {
    const { companyId } = req.params;
    const { type } = req.body;

    const getReviewByType = await this.reviewService.getReviewByType(companyId, type);
    return res.status(getReviewByType.status).json(getReviewByType.message);
  };
  createReview = async (req, res) => {
    const { companyId } = req.params;
    const userId = res.locals.userId;
    const { content, grade, type } = req.body;
    const createReveiw = await this.reviewService.createReview(userId, companyId, content, grade, type);
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
