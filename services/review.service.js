import { ReviewRepository, CompanyRepository, TrainerRepository } from '../repositories';
class ReviewService {
  _reviewRepository = new ReviewRepository();
  _companyRepository = new CompanyRepository();
  _trainerRepository = new TrainerRepository();

  getReviewByType = async (companyId, type) => {
    const getReviewByType = await this._reviewRepository.getReviewByType(companyId, type);
    if (!getReviewByType) {
      return { status: 400, message: '리뷰가 존재하지 않습니다.' };
    }
    return { status: 200, message: getReviewByType };
  };

  createReview = async (userId, companyId, content, grade, type) => {
    const findCompany = await this._reviewRepository.findCompany(companyId);
    if (!findCompany) {
      return { status: 404, message: '존재하지 않는 업체입니다.' };
    }
    const findAuth = await this._reviewRepository.findAuth(userId);
    if (findAuth.type !== 'user') {
      return {
        status: 401,
        message: '리뷰는 유저만 생성 가능합니다.',
      };
    }
    if (!content) {
      return { status: 400, message: '내용이 입력되지 않았습니다.' };
    }
    if (!grade) {
      return { status: 400, message: '평점이 입력되지 않았습니다.' };
    }
    if (!type) {
      return { status: 400, message: '타입이 입력되지 않았습니다.' };
    }
    const createReview = await this._reviewRepository.createReview(userId, companyId, content, grade, type);
    return { status: 200, message: createReview };
  };

  deleteReview = async (userId, reviewId) => {
    const findReview = await this._reviewRepository.findReview(reviewId);
    const findAuth = await this._reviewRepository.findAuth(userId);
    if (findAuth.type == 'owner' || findAuth.type == 'trainer') {
      return {
        status: 401,
        message: '유저 또는 관리자만 리뷰삭제를 삭제할 수 있습니다..',
      };
    }
    if (!findReview) {
      return { status: 400, message: '존재하지 않는 리뷰입니다.' };
    }
    await this._reviewRepository.deleteReview(reviewId);
    return { status: 200, message: '리뷰가 삭제되었습니다.' };
  };
}

export default ReviewService;
