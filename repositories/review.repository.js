import Review from '../db/models/review';
import { User, Company } from '../db';

class ReviewRepository {
  findAuth = async userId => {
    const findAuth = await User.findAll({ where: { userId } });
    return findAuth;
  };

  findCompany = async companyId => {
    const findCompany = await Company.findOne({ where: { companyId } });

    return findCompany;
  };

  getUserReview = async userId => {
    const getUserReviewData = await Review.findAll({ where: { userId: userId } });

    getUserReviewData.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    return getUserReviewData;
  };

  getTargetReview = async (targetId, type) => {
    const getTargetReview = await Review.findAll({ where: { targetId, type } });
    return getTargetReview;
  };

  findReview = async reviewId => {
    const findReview = await Review.findOne({ where: { reviewId } });
    return findReview;
  };

  createReview = async (userId, targetId, content, grade, type) => {
    const createReveiw = await Review.create({ userId, targetId, content, grade, type });
    return createReveiw;
  };

  deleteReview = async reviewId => {
    await Review.destroy({ where: { reviewId } });
  };
}

export default ReviewRepository;
