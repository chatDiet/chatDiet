import Payment from '../models/payment';
import User from '../models/user';

export default () => {
  Payment.belongsTo(User, {
    sourceKey: 'userId',
    foreignKey: 'userId',
  });
};
