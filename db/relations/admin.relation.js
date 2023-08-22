import Admin from '../models/admin';
import User from '../models/user';

export default () => {
  Admin.belongsTo(User, {
    sourceKey: 'userId',
    foreignKey: 'userId',
  });
};
