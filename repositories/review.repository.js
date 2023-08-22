import Review from '../db/models/review';

class ReviewRepository {
  getReviewByType = async (companyId, type) => {
    const getReviewByType = await Review.findOne({ where: { companyId, type } });
    return getReviewByType;
  };
  findReview = async reviewId => {
    const findReview = await Review.findOne({ where: { reviewId } });
    return findReview;
  };
  createReview = async (content, grade, type) => {
    console.log(grade);
    const createReveiw = await Review.create({ content, grade, type });

    return createReveiw;
  };

  deleteReview = async reviewId => {
    await Review.destroy({ where: { reviewId } });
  };
}

export default ReviewRepository;
