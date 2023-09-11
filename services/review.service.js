import { ReviewRepository, CompanyRepository, TrainerRepository } from '../repositories';
class ReviewService {
  _reviewRepository = new ReviewRepository();
  _companyRepository = new CompanyRepository();
  _trainerRepository = new TrainerRepository();

  getUserReview = async userId => {
    if (!userId) {
      return {
        status: 401,
        data: '로그인 후 이용 가능합니다.',
      };
    }

    const getUserReview = await this._reviewRepository.getUserReview(userId);

    const allReviewData = getUserReview.map(review => {
      return {
        type: review.type,
        content: review.content,
        createdAt: review.createdAt,
        updatedAt: review.updatedAt,
      };
    });
    return {
      status: 200,
      data: allReviewData,
    };
  };

  getReviewByType = async (targetId, type) => {
    if (!type) {
      return {
        status: 400,
        message: 'TYPE 미입력',
      };
    }

    const getTargetReview = await this._reviewRepository.getTargetReview(targetId, type);
    return {
      status: 200,
      message: getTargetReview,
    };
  };

  createReview = async (userId, targetId, content, grade, type) => {
    if (!content) {
      return { status: 400, message: '내용이 입력되지 않았습니다.' };
    }
    if (!grade) {
      return { status: 400, message: '평점이 입력되지 않았습니다.' };
    }
    if (!type) {
      return { status: 400, message: '타입이 입력되지 않았습니다.' };
    }

    const findAuth = await this._reviewRepository.findAuth(userId);
    if (!findAuth) {
      return {
        status: 400,
        message: '존재하지 않는 유저 ID',
      };
    }

    if (findAuth.type !== 'user') {
      return {
        status: 401,
        message: '리뷰는 유저만 생성 가능합니다.',
      };
    }

    if (type === 'company') {
      const getCompany = await this._reviewRepository.findCompany(targetId);
      if (!getCompany) {
        return {
          status: 400,
          message: '존재하지 않는 업체 ID',
        };
      }
    }

    if (type === 'trainer') {
      const getTrainer = await this._trainerRepository.detailRead(targetId);
      if (!getTrainer) {
        return {
          status: 400,
          message: '존재하지 않는 트레이너 ID',
        };
      }
    }

    const createReview = await this._reviewRepository.createReview(userId, targetId, content, grade, type);
    return { status: 200, message: createReview };
  };

  deleteReview = async (userId, reviewId) => {
    const findReview = await this._reviewRepository.findReview(reviewId);
    if (!findReview) {
      return { status: 400, message: '존재하지 않는 리뷰입니다.' };
    }

    const findAuth = await this._reviewRepository.findAuth(userId);
    if (findAuth.type == 'owner' || findAuth.type == 'trainer') {
      return {
        status: 401,
        message: '유저 또는 관리자만 리뷰삭제를 삭제할 수 있습니다..',
      };
    }

    if (findReview.userId !== userId) {
      return {
        status: 401,
        message: '삭제 권한 없음',
      };
    }

    await this._reviewRepository.deleteReview(reviewId);

    return { status: 200, message: '리뷰가 삭제되었습니다.' };
  };
}

export default ReviewService;
