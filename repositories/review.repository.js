import Review from '../db/models/review';
import { User, Company } from '../db';

class ReviewRepository {
  findAuth = async userId => {
    const findAuth = await User.findOne({ where: { userId } });
    return findAuth;
  };
  findCompany = async companyId => {
    const findCompany = await Company.findOne({ where: { companyId } });
    return findCompany;
  };
  getReviewByType = async (companyId, type) => {
    const getReviewByType = await Review.findAll({ where: { companyId, type } });
    return getReviewByType;
  };
  findReview = async reviewId => {
    const findReview = await Review.findOne({ where: { reviewId } });
    return findReview;
  };
  createReview = async (userId, companyId, content, grade, type) => {
    const createReveiw = await Review.create({ userId, companyId, content, grade, type });
    return createReveiw;
  };

  deleteReview = async reviewId => {
    await Review.destroy({ where: { reviewId } });
  };
}

export default ReviewRepository;
