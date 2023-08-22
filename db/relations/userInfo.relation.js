import UserInfo from '../models/userInfo';
import User from '../models/user';

export default () => {
  UserInfo.belongsTo(User, {
    sourceKey: 'userId',
    foreignKey: 'userId',
  });
};
