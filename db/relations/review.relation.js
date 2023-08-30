import Review from '../models/review';
import User from '../models/user';

export default () => {
  Review.belongsTo(User, {
    sourceKey: 'userId',
    foreignKey: 'userId',
  });
};
