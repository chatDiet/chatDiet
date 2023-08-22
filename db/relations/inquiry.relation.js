import Inquiry from '../models/inquiry';
import User from '../models/user';

export default () => {
  Inquiry.belongsTo(User, {
    sourceKey: 'userId',
    foreignKey: 'userId',
  });
};
