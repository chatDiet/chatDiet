import { ReviewRepository } from '../repositories';
class ReviewService {
  _reviewRepository = new ReviewRepository();

  getReviewByType = async (companyId, type) => {
    const getReviewByType = await this._reviewRepository.getReviewByType(companyId, type);
    if (getReviewByType) {
      return { status: 400, message: '리뷰가 존재하지 않습니다.' };
    }
    return { status: 200, message: getReviewByType };
  };

  createReview = async (companyId, content, grade, type) => {
    if (!companyId) {
      return { status: 400, message: '업체가 입력되지 않았습니다.' };
    }
    if (content) {
      return { status: 400, message: '내용이 입력되지 않았습니다.' };
    }
    if (grade) {
      return { status: 400, message: '평점이 입력되지 않았습니다.' };
    }
    if (type) {
      return { status: 400, message: '타입이 입력되지 않았습니다.' };
    }
    const createReview = await this._reviewRepository.createReview(content, grade, type);
    return { status: 200, message: createReview };
  };

  deleteReview = async reviewId => {
    const findReview = await this._reviewRepository.findReview(reviewId);
    if (!findReview) {
      return { status: 400, message: '존재하지 않는 리뷰입니다.' };
    }
    await this._reviewRepository.deleteReview(reviewId);
    return { status: 200, message: '리뷰가 삭제되었습니다.' };
  };
}

export default ReviewService;
