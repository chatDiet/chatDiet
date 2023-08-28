import Company from '../models/company';
import Review from '../models/review';
import User from '../models/user';
import Trainer from '../models/user';
export default () => {
  Review.belongsTo(User, {
    sourceKey: 'userId',
    foreignKey: 'userId',
  });
};
