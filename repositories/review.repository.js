import Review from '../db/models/review';
import { User, Company } from '../db';

class ReviewRepository {
  findAuth = async userId => {
    return await User.findOne({ where: { userId } });
  };

  findCompany = async companyId => {
    return await Company.findOne({ where: { companyId } });
  };

  getUserReview = async userId => {
    return await Review.findAll({
      where: { userId: userId },
      order: [['createdAt', 'DESC']],
    });
  };

  getTargetReview = async (targetId, type) => {
    return await Review.findAll({ where: { targetId, type } });
  };

  findReview = async reviewId => {
    return await Review.findOne({ where: { reviewId } });
  };

  createReview = async (userId, targetId, content, grade, type) => {
    return await Review.create({ userId, targetId, content, grade, type });
  };

  deleteReview = async reviewId => {
    return Review.destroy({ where: { reviewId } });
  };
}

export default ReviewRepository;
